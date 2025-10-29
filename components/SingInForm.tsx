"use client";

import React, { useActionState, useEffect, useState } from "react";
import ElInput from "./custom/ElInput";
import ElButton from "./custom/ElButton";
import { signIn } from "@/lib/actions/actions.global";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff, IoMdKey } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useUserSettings } from "@/context/UserSettingsContext";
import {
  getUserMenu,
  getUserSettings,
} from "@/lib/actions/userSettings.actions";
import { navItems } from "@/constants";
import CustomSpinner from "./custom/Spinner";

const SingInForm = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [state, action, isPending] = useActionState(signIn, {
    success: false,
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations("global.signInForm");
  const router = useRouter();
  const { initializeSettings } = useUserSettings();

  useEffect(() => {
    const loadSettings = async () => {
      if (state.success) {
        setIsTransitioning(true); // Active le loader

        try {
          if (state.user && state.customerList) {
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem(
              "customers",
              JSON.stringify(state.customerList)
            );
          }

          if (state.id) {
            const [menu, settings] = await Promise.all([
              getUserMenu(state.id),
              getUserSettings(state.id),
            ]);

            console.log("ID", state.id);

            console.log("MENU", menu);

            console.log("SETTINGS", settings);

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
          }
          // Redirection finale
          if (state.customers && state.customers.length > 1) {
            router.push("/stores");
          } else {
            router.push("/");
          }
          toast.success("Connexion réussie.");
        } catch (err) {
          console.error("Failed to load settings:", err);
          toast.error("Erreur lors du chargement des paramètres.");
        } finally {
          setIsTransitioning(false); // Désactive le loader
        }
      }

      // Gestion des erreurs (inchangée)
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
    <>
      {isTransitioning && (
        <div className="flex justify-center items-center h-full py-10">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}
      {!isTransitioning && (
        <form action={action} className="flex flex-col gap-3 w-full">
          <ElInput
            type="text"
            placeholder={t("usernamePlaceholder")}
            name="username"
            icon={<FiUser />}
          />
          <div className="flex relative">
            <ElInput
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              name="password"
              icon={<IoMdKey />}
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              role="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </div>
          </div>
          <ElButton
            label={t("submitBtn")}
            type="submit"
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
          />
        </form>
      )}
    </>
  );
};

export default SingInForm;
