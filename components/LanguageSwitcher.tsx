"use client";

import { useLocale } from "next-intl";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    document.cookie = `ELYOTE_LANG=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`; // 1 year expiration

    router.refresh();
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="bg-white dark:bg-gray-800 p-1.5 rounded-md shadow-sm font-semibold"
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
