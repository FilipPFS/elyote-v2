"use client";
import { useTranslations } from "next-intl";
import Switch from "../Global/Switch";
import { defaultModes, useUserSettings } from "@/context/UserSettingsContext";
import ElButton from "../custom/ElButton";
import { addUserSettings } from "@/lib/actions/userSettings.actions";
import { toast } from "react-toastify";
import { useState } from "react";
import CustomSpinner from "../custom/Spinner";
import { IoMdInformationCircleOutline } from "react-icons/io";

export type Modes = {
  darkMode: boolean;
  weightMode: boolean;
  sizeMode: "normal" | "small" | "big";
  font: "poppins" | "inter" | "roboto";
};

export default function ToggleSwitches() {
  const { modes, toggleMode, changeFont, changeSize, saveStyleSettings } =
    useUserSettings();
  const [loading, setLoading] = useState(false);
  const [resetPending, setResetPending] = useState(false);

  console.log("modes now", modes);

  const tUi = useTranslations("ui");

  const handleSave = async () => {
    setLoading(true);
    const res = await addUserSettings(modes);

    if (res?.success) {
      setLoading(false);
      toast.success("Mis à jour avec succès.");
    } else {
      setLoading(false);
      toast.error("Error occured.");
    }
  };

  const resetStyles = async () => {
    setResetPending(true);
    const res = await addUserSettings(defaultModes);

    if (res?.success) {
      setResetPending(false);
      saveStyleSettings(defaultModes);
      toast.success("Réinitialisé avec succès.");
    }
  };

  return (
    <div className="flex flex-col gap-7">
      {/* Mode sombre */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>{tUi("modes.darkMode.title")}</span>
          <Switch
            label="Mode Sombre"
            enabled={modes.darkMode}
            onToggle={() => toggleMode("darkMode")}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tUi("modes.darkMode.desc")}
        </p>
        <hr className="my-1 border-gray-300 dark:border-gray-700" />
      </div>

      {/* Mode gras */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>{tUi("modes.boldMode.title")}</span>
          <Switch
            label="Mode Gras"
            enabled={modes.weightMode}
            onToggle={() => toggleMode("weightMode")}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tUi("modes.boldMode.desc")}
        </p>
        <hr className="my-1 border-gray-300 dark:border-gray-700" />
      </div>

      {/* Taille du texte */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>{tUi("modes.textSize.title")}</span>
          <select
            value={modes.sizeMode}
            onChange={(e) => changeSize(e.target.value as Modes["sizeMode"])}
            className="px-2 py-1 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="small">{tUi("modes.textSize.options.small")}</option>
            <option value="normal">
              {tUi("modes.textSize.options.normal")}
            </option>
            <option value="big">{tUi("modes.textSize.options.big")}</option>
          </select>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tUi("modes.textSize.desc")}
        </p>
        <hr className="my-1 border-gray-300 dark:border-gray-700" />
      </div>

      {/* Police */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>{tUi("modes.font.title")}</span>
          <select
            value={modes.font}
            onChange={(e) => changeFont(e.target.value as Modes["font"])}
            className="px-2 py-1 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option className="font-poppins" value="poppins">
              Poppins
            </option>
            <option className="font-inter" value="inter">
              Inter
            </option>
            <option className="font-roboto" value="roboto">
              Roboto
            </option>
          </select>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tUi("modes.font.desc")}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <ElButton
          disabled={loading}
          icon={loading ? <CustomSpinner /> : undefined}
          onClick={handleSave}
          label="Enregistrer les changements"
        />
        <ElButton
          disabled={resetPending}
          icon={resetPending ? <CustomSpinner /> : undefined}
          onClick={resetStyles}
          label="Réinitialisér les styles"
        />
        <div className="bg-transparent border-2 border-blue-800 dark:border-blue-700 rounded-lg px-6 py-3 flex items-center gap-4">
          <span>
            <IoMdInformationCircleOutline
              className="text-blue-800 dark:text-blue-700"
              size={25}
            />
          </span>
          <p className="text-sm">
            Les styles seront appliqués automatiquement. N'oubliez pas de les
            enregistrer afin de ne pas les perdre lors de votre prochaine
            déconnexion.
          </p>
        </div>
      </div>
    </div>
  );
}
