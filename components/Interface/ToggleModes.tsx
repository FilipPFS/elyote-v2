"use client";
import { useTranslations } from "next-intl";
import Switch from "../Global/Switch";
import { useUserSettings } from "@/context/UserSettingsContext";

type Modes = {
  darkMode: boolean;
  weightMode: boolean;
  sizeMode: "normal" | "small" | "big";
  font: "poppins" | "inter" | "roboto";
};

export default function ToggleSwitches() {
  const { modes, toggleMode, changeFont, changeSize } = useUserSettings();
  const tUi = useTranslations("ui");

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
    </div>
  );
}
