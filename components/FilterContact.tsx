"use client";

import { filterContactOptions } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterContact = () => {
  const [category, setCategory] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("contacts.filterKeys");

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "all") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <select
      className="border-gray-400 bg-white border-[1.5px] rounded-sm flex items-center gap-3 py-1 px-4 w-fit"
      value={category}
      onChange={(e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        onSelectCategory(selectedCategory);
      }}
    >
      {filterContactOptions.map((item) => (
        <option key={item.filterKey} value={item.filterKey}>
          {t(item.label)}
        </option>
      ))}
    </select>
  );
};

export default FilterContact;
