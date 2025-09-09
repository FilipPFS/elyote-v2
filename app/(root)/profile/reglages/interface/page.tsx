"use client";

import ElButton from "@/components/custom/ElButton";
import Switch from "@/components/Global/Switch";
import MainPage from "@/components/Mobile/MainPage";
import { navItems } from "@/constants";
import { useUserSettings } from "@/context/UserSettingsContext";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToggleModes from "@/components/Interface/ToggleModes";
import { addUserMenu } from "@/lib/actions/userSettings.actions";
import CustomSpinner from "@/components/custom/Spinner";

const ReglgagesInterface = () => {
  const tGlobal = useTranslations("global");
  const tUi = useTranslations("ui");
  const { allowedIds, setAllowedIds } = useUserSettings();
  const { saveMenuSettings } = useUserSettings();
  const [stateIds, setStateIds] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [resetPending, setResetPending] = useState(false);
  const navigation = navItems.map((item) => item.labelKey);

  useEffect(() => {
    setStateIds(allowedIds);
  }, [allowedIds]);

  const handleToggle = (key: string) => {
    setStateIds((prev) =>
      prev.includes(key)
        ? prev.filter((allowedId) => allowedId !== key)
        : [...prev, key]
    );
  };

  const handleSave = async () => {
    setAllowedIds(stateIds);
    setPending(true);
    const res = await addUserMenu(95, stateIds);

    if (res?.success) {
      saveMenuSettings(stateIds);
      setPending(false);
      toast.success("Mis à jour avec succès.");
    } else {
      toast.error("Une erreur est survenue.");
    }
  };

  const resetMenu = async () => {
    setResetPending(true);
    const res = await addUserMenu(95, navigation);

    if (res?.success) {
      setResetPending(false);
      setAllowedIds(navigation);
      setStateIds(navigation);
      saveMenuSettings(navigation);
      toast.success("Mis à jour avec succès.");
    } else {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <MainPage title={tUi("title")}>
      <div className="flex md:flex-row flex-col gap-10 md:justify-between md:pr-12">
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <h2 className="text-lg font-bold">{tUi("menuTitle")}</h2>
          <div className="flex flex-col gap-3 w-full">
            {navItems.map((item) => {
              const isEnabled = stateIds.includes(item.labelKey);
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
                    onToggle={() => handleToggle(item.labelKey)}
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
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <h2 className="text-lg font-bold">{tUi("uiTitle")}</h2>
          <ToggleModes />
        </div>
      </div>
    </MainPage>
  );
};

export default ReglgagesInterface;
