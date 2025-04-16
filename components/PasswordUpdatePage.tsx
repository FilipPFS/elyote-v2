"use client";

import { PasswordData } from "@/types";
import React, { useActionState, useEffect } from "react";
import PasswordForm from "./PasswordForm";
import { toast } from "react-toastify";
import { updateCredential } from "@/lib/actions/actions.credentials";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  passwordData?: PasswordData;
};

const PasswordUpdatePage = ({ passwordData }: Props) => {
  const [state, action, isPending] = useActionState(updateCredential, {});
  const router = useRouter();
  const t = useTranslations("credentials.form");

  useEffect(() => {
    const { errors } = state;
    if (state.success) {
      router.push("/identifiants/liste");
      toast.success(t("successUpdate"));
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`);
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
