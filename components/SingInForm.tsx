"use client";

import React, { useActionState, useEffect } from "react";
import ElInput from "./custom/ElInput";
import ElButton from "./custom/ElButton";
import { signIn } from "@/lib/actions/actions.global";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { IoMdKey } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useUserSettings } from "@/context/UserSettingsContext";
import {
  getUserMenu,
  getUserSettings,
} from "@/lib/actions/userSettings.actions";
import { navItems } from "@/constants";

const SingInForm = () => {
  const [state, action, isPending] = useActionState(signIn, {
    success: false,
    error: "",
  });

  const t = useTranslations("global.signInForm");
  const router = useRouter();
  const { initializeSettings } = useUserSettings();

  useEffect(() => {
    const loadSettings = async () => {
      if (state.success) {
        try {
          const menu = await getUserMenu(95);
          const settings = await getUserSettings(95);

          console.log("settings", settings);

          initializeSettings(
            settings || {
              darkMode: false,
              weightMode: false,
              sizeMode: "normal",
              font: "poppins",
            },
            menu && menu.length > 0
              ? menu
              : navItems.map((item) => item.labelKey)
          );

          if (state.customers && state.customers.length > 1) {
            router.push("/stores");
          } else {
            router.push("/");
            toast.success("Connexion réussie.");
          }
        } catch (err) {
          console.error("Failed to load settings:", err);
        }
      }

      if (state.error) {
        toast.error(`${state.error.toString()}`);
      }
      if (state.errors) {
        for (const key in state.errors) {
          const messages = state.errors[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) =>
              toast.error(msg, {
                className: "bg-amber-700 text-white",
              })
            );
          }
        }
      }
    };

    loadSettings();
  }, [state, router, initializeSettings]);

  return (
    <form action={action} className="flex flex-col gap-3 w-full">
      <ElInput
        type="text"
        placeholder={t("usernamePlaceholder")}
        name="username"
        icon={<FiUser />}
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
