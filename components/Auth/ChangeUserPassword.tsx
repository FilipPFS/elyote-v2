"use client";

import React, { useEffect, useState } from "react";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import CustomSpinner from "../custom/Spinner";
import { changeUserPassword } from "@/lib/actions/actions.user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
};

const ChangeUserPassword = ({ username }: Props) => {
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

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

    const res = await changeUserPassword({
      username,
      password: secondPassword,
    });

    setIsPending(false);

    if (res.success) {
      toast.success("Mot de passe modifié avec succès !");
      setFirstPassword("");
      setSecondPassword("");
      router.push("/profile/manager/utilisateurs");
    } else {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSave}>
      <div className="flex gap-3">
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
            errors.length > 0 || isPending || !firstPassword || !secondPassword
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
  );
};

export default ChangeUserPassword;
