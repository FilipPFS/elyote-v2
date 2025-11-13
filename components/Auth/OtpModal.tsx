"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";
import ElButton from "../custom/ElButton";
import CustomSpinner from "../custom/Spinner";
import { forgotPasswordConfirm } from "@/lib/actions/actions.user";
import { toast } from "react-toastify";
import ElInput from "../custom/ElInput";

type Props = {
  username: string;
};

const OtpModal = ({ username }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  useEffect(() => {
    const newErrors: string[] = [];

    if (firstPassword && secondPassword && firstPassword !== secondPassword) {
      newErrors.push("Les mots de passe ne correspondent pas.");
    }

    if (firstPassword) {
      if (firstPassword.length < 8) {
        newErrors.push("Le mot de passe doit contenir au moins 8 caractères.");
      }
      if (!/[A-Za-z]/.test(firstPassword)) {
        newErrors.push("Le mot de passe doit contenir au moins une lettre.");
      }
      if (!/\d/.test(firstPassword)) {
        newErrors.push("Le mot de passe doit contenir au moins un chiffre.");
      }
      if (!/[@$!%*?&#.^()_\-]/.test(firstPassword)) {
        newErrors.push(
          "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, etc.)."
        );
      }
    }

    setErrors(newErrors);
  }, [firstPassword, secondPassword]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.length > 0) {
      toast.error("Veuillez corriger les erreurs avant de continuer.");
      return;
    }

    setIsPending(true);

    const res = await forgotPasswordConfirm({
      username,
      confirmationCode: password,
      newPassword: secondPassword,
    });

    setIsPending(false);

    if (res.success) {
      toast.success("Mot de passe modifié avec succès !");
      setFirstPassword("");
      setSecondPassword("");
      router.push("/sign-in");
    } else {
      toast.error("Une erreur est survenue.");
    }
  };

  console.log("password", password);

  return (
    <>
      {password.length < 6 ? (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="dark:bg-gray-900 dark:text-white">
            <AlertDialogHeader className="relative flex justify-center">
              <AlertDialogTitle className="h2 text-center">
                Enter your OTP
                <FaXmark
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 cursor-pointer"
                />
              </AlertDialogTitle>
              <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                We've sent an OTP code to{" "}
                {/* <span className="pl-1 text-blue-800">{email}</span> */}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <InputOTP maxLength={6} value={password} onChange={setPassword}>
              <InputOTPGroup className="flex justify-between gap-4 w-full">
                <InputOTPSlot
                  index={0}
                  className="w-1/6 border border-blue-950 border-opacity-30 rounded-md"
                />
                <InputOTPSlot
                  index={1}
                  className="w-1/6 border border-blue-950 border-opacity-30 rounded-md"
                />
                <InputOTPSlot
                  index={2}
                  className="w-1/6 border border-blue-950 border-opacity-30 rounded-md"
                />
                <InputOTPSlot
                  index={3}
                  className="w-1/6 border border-blue-950 border-opacity-30 rounded-md"
                />
                <InputOTPSlot
                  index={4}
                  className="w-1/6 border border-blue-950 border-opacity-30 rounded-md"
                />
                <InputOTPSlot
                  index={5}
                  className="w-1/6 border border-blue-950 border-opacity-30 rounded-md"
                />
              </InputOTPGroup>
            </InputOTP>

            <div></div>

            <AlertDialogFooter>
              <div className="flex w-full flex-col gap-4">
                <AlertDialogAction
                  // onClick={handleSubmit}
                  className="rounded-xl cursor-pointer bg-blue-800 h-12"
                  type="button"
                >
                  Suivant
                </AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSave}>
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <ElInput
                placeholder="Nouveau mot de passe"
                type="password"
                name="firstPassword"
                onChange={(e) => setFirstPassword(e.target.value)}
                value={firstPassword}
              />
            </div>

            <div className="w-full">
              <ElInput
                placeholder="Confirmer le mot de passe"
                type="password"
                name="secondPassword"
                onChange={(e) => setSecondPassword(e.target.value)}
                value={secondPassword}
              />
            </div>

            <ElButton
              type="submit"
              disabled={
                errors.length > 0 ||
                isPending ||
                !firstPassword ||
                !secondPassword
              }
              label="Confirmer"
              icon={isPending ? <CustomSpinner /> : undefined}
            />
          </div>

          <div>
            {errors.length > 0 && (
              <ul className="mt-1 text-red-500 text-sm list-disc list-inside">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default OtpModal;
