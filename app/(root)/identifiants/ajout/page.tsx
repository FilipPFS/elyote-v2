"use client";

import PasswordForm from "@/components/PasswordForm";
import { useRouter } from "next/navigation";
import { addNewCredential } from "@/lib/actions/actions.credentials";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const IdentifiantsAjout = () => {
  const [state, action, isPending] = useActionState(addNewCredential, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/identifiants/liste");
      toast.success("Votre identifiant a été ajouté avec succès.");
    }
    if (state.error) {
      toast.error(`Erreur: ${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
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
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <PasswordForm isPending={isPending} action={action} updatePage={false} />
    </div>
  );
};

export default IdentifiantsAjout;
