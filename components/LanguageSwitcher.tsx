"use client";

import { useLocale } from "next-intl";
import { ChangeEvent } from "react";

const LanguageSwitcher = () => {
  const currentLocale = useLocale();

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Set the ELYOTE_LANG cookie
    document.cookie = `ELYOTE_LANG=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`; // 1 year expiration

    // Reload the page to apply the new locale
    window.location.reload();
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="bg-white p-1.5 rounded-md shadow-sm font-semibold"
    >
      <option className="font-semibold" value="en">
        EN
      </option>
      <option className="font-semibold" value="fr">
        FR
      </option>
    </select>
  );
};

export default LanguageSwitcher;
