"use client";

import ElButton from "@/components/custom/ElButton";
import Switch from "@/components/Global/Switch";
import MainPage from "@/components/Mobile/MainPage";
import { navItems } from "@/constants";
import { defaultMenu, useUserSettings } from "@/context/UserSettingsContext";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToggleModes from "@/components/Interface/ToggleModes";
import { addUserMenu } from "@/lib/actions/userSettings.actions";
import CustomSpinner from "@/components/custom/Spinner"; // 👈 ensure defaultMenu is exported from types or constants
import { MenuKeys } from "@/types";

const ReglagesInterface = () => {
  const tGlobal = useTranslations("global");
  const tUi = useTranslations("ui");

  const { allowedIds, setAllowedIds, saveMenuSettings } = useUserSettings();

  const [stateIds, setStateIds] =
    useState<Record<MenuKeys, boolean>>(defaultMenu);
  const [pending, setPending] = useState(false);
  const [resetPending, setResetPending] = useState(false);

  useEffect(() => {
    if (allowedIds) setStateIds(allowedIds as Record<MenuKeys, boolean>);
  }, [allowedIds]);

  // ✅ Toggle a single menu item
  const handleToggle = (key: MenuKeys) => {
    setStateIds((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ Save the menu to backend + context + localStorage
  const handleSave = async () => {
    if (!stateIds) return;

    console.log("state ids", stateIds);

    setPending(true);
    setAllowedIds(stateIds);
    const res = await addUserMenu(stateIds);

    if (res?.success) {
      saveMenuSettings(stateIds);
      toast.success("Mis à jour avec succès.");
    } else {
      toast.error("Une erreur est survenue.");
    }

    setPending(false);
  };

  // ✅ Reset everything to default (all true)
  const resetMenu = async () => {
    setResetPending(true);
    setAllowedIds(defaultMenu);
    setStateIds(defaultMenu);
    saveMenuSettings(defaultMenu);

    const res = await addUserMenu(defaultMenu);

    if (res?.success) {
      toast.success("Réinitialisé avec succès.");
    } else {
      toast.error("Une erreur est survenue.");
    }

    setResetPending(false);
  };

  return (
    <MainPage title={tUi("title")}>
      <div className="flex md:flex-row flex-col gap-10 md:justify-between md:pr-12">
        {/* ---- LEFT: Menu switches ---- */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <h2 className="text-lg font-bold">{tUi("menuTitle")}</h2>
          <div className="flex flex-col gap-3 w-full">
            {navItems.map((item) => {
              const isEnabled = stateIds?.[item.labelKey as MenuKeys];
              return (
                <div
                  key={item.labelKey}
                  className="flex items-center justify-between gap-10 mb-2"
                >
                  <h3 className="w-36">
                    {tGlobal(`sidebar.${item.labelKey}`)}
                  </h3>
                  <Switch
                    label="Switch"
                    enabled={isEnabled}
                    onToggle={() => handleToggle(item.labelKey as MenuKeys)}
                  />
                </div>
              );
            })}
            <ElButton
              label="Enregistrer"
              onClick={handleSave}
              disabled={pending}
              icon={pending ? <CustomSpinner /> : undefined}
            />
            <ElButton
              label="Réinitialiser"
              onClick={resetMenu}
              disabled={resetPending}
              icon={resetPending ? <CustomSpinner /> : undefined}
            />
          </div>
        </div>

        {/* ---- RIGHT: UI Settings ---- */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <h2 className="text-lg font-bold">{tUi("uiTitle")}</h2>
          <ToggleModes />
        </div>
      </div>
    </MainPage>
  );
};

export default ReglagesInterface;
