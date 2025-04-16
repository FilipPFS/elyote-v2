"use client";

import PasswordForm from "@/components/PasswordForm";
import { useRouter } from "next/navigation";
import { addNewCredential } from "@/lib/actions/actions.credentials";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const IdentifiantsAjout = () => {
  const [state, action, isPending] = useActionState(addNewCredential, {});
  const router = useRouter();
  const t = useTranslations("credentials.form");

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/identifiants/liste");
      toast.success(t("successAdd"));
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
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
  }, [state, router, t]);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <PasswordForm isPending={isPending} action={action} updatePage={false} />
    </div>
  );
};

export default IdentifiantsAjout;
