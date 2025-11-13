"use client";

import React, { useEffect, useState } from "react";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import CustomSpinner from "../custom/Spinner";
import { resetMyPassword } from "@/lib/actions/actions.user";
import { toast } from "react-toastify";

type Props = {
  username: string;
};

const ResetMyPassword = ({ username }: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const newErrors: string[] = [];

    // Matching
    if (firstPassword && secondPassword && firstPassword !== secondPassword) {
      newErrors.push("Les mots de passe ne correspondent pas.");
    }

    // Complexity rules on the new password (firstPassword)
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

    if (!oldPassword) {
      toast.error("Veuillez saisir votre ancien mot de passe.");
      return;
    }

    if (errors.length > 0 || !firstPassword || !secondPassword) {
      toast.error("Veuillez corriger les erreurs avant de continuer.");
      return;
    }

    setIsPending(true);

    const res = await resetMyPassword({
      username,
      oldPassword: oldPassword,
      newPassword: secondPassword,
    });

    setIsPending(false);

    if (res.success) {
      toast.success("Modifié avec succès.");
      setOldPassword("");
      setFirstPassword("");
      setSecondPassword("");
      // router.push("/profile/manager/utilisateurs"); // Uncomment if you want a redirect after success
    } else {
      toast.error(res.error || "Une erreur est survenue.");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSave}>
      <div className="flex gap-4">
        <div className="w-full">
          <ElInput
            placeholder="Ancien mot de passe"
            type="password"
            name="oldPassword"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>
      </div>

      <div className="flex gap-4">
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
          {errors.length > 0 && (
            <ul className="mt-1 text-red-500 text-sm list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        <ElButton
          type="submit"
          disabled={
            isPending ||
            !oldPassword ||
            !firstPassword ||
            !secondPassword ||
            errors.length > 0
          }
          label="Confirmer"
          icon={isPending ? <CustomSpinner /> : undefined}
        />
      </div>
    </form>
  );
};

export default ResetMyPassword;
