"use client";

import React, { useActionState, useEffect } from "react";
import ElInput from "./custom/ElInput";
import ElButton from "./custom/ElButton";
import { signIn } from "@/lib/actions/actions.global";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { useTranslations } from "next-intl";

const SingInForm = () => {
  const [state, action, isPending] = useActionState(signIn, {
    success: false,
    error: "",
  });

  const t = useTranslations("global.signInForm");

  const router = useRouter();

  useEffect(() => {
    if (state.success && state.customerData) {
      Object.entries(state.customerData).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      if (state.printerOptions) {
        document.cookie = `printer_options=${encodeURIComponent(
          JSON.stringify(state.printerOptions)
        )}; path=/; max-age=${60 * 60 * 24 * 7}`; // expire dans 7 jours
      }
      router.push("/");
      toast.success("Connexion réussi.");
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`);
    }
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-3 w-full">
      <ElInput
        type="text"
        placeholder={t("usernamePlaceholder")}
        name="username"
        icon={<FiUser />}
      />
      <ElInput
        type="text"
        placeholder={t("storeCodePlaceholder")}
        name="user_id"
        icon={<MdStorefront />}
      />
      <ElInput
        type="password"
        placeholder={t("passwordPlaceholder")}
        name="password"
        icon={<IoMdKey />}
      />
      <ElButton label={t("submitBtn")} type="submit" disabled={isPending} />
    </form>
  );
};

export default SingInForm;
