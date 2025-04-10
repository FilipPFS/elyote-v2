"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChangeEvent } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.replace(newPath);
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
