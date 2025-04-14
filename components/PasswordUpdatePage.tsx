"use client";

import { PasswordData } from "@/types";
import React, { useActionState, useEffect } from "react";
import PasswordForm from "./PasswordForm";
import { toast } from "react-toastify";
import { updateCredential } from "@/lib/actions/actions.credentials";
import { useRouter } from "@/i18n/navigation";

type Props = {
  passwordData?: PasswordData;
};

const PasswordUpdatePage = ({ passwordData }: Props) => {
  const [state, action, isPending] = useActionState(updateCredential, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;
    if (state.success) {
      router.push("/identifiants/liste");
      toast.success("Votre identifiant a été modifié avec succès.");
    }
    if (state.error) {
      toast.error(`Erreur: ${state.error.toString()}`);
    }
    if (errors) {
      for (const key in errors) {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) =>
            toast.error(msg, {
              className: "bg-amber-700 text-white",
            })
          );
        }
      }
    }
  }, [state, router]);

  return (
    <PasswordForm
      updatePage={true}
      passwordData={passwordData}
      id={String(passwordData?.id)}
      action={action}
      isPending={isPending}
    />
  );
};

export default PasswordUpdatePage;
