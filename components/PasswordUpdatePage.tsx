"use client";

import { PasswordData } from "@/types";
import React, { useActionState, useEffect } from "react";
import PasswordForm from "./PasswordForm";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/lib/actions/actions.password";
import { toast } from "sonner";

type Props = {
  passwordData?: PasswordData;
};

const PasswordUpdatePage = ({ passwordData }: Props) => {
  const [state, action, isPending] = useActionState(updatePassword, {});
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
      Object.entries(errors).forEach(([messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => toast.error(msg));
        }
      });
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
