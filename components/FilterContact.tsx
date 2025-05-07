"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  translationKey?: string;
  filterOptions: {
    label?: string;
    filterKey: string;
  }[];
  keyString: string;
};

const FilterContact = ({ translationKey, filterOptions, keyString }: Props) => {
  const [category, setCategory] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations(translationKey);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "all") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: keyString,
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [keyString],
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
      {filterOptions.map((item) => (
        <option key={item.filterKey} value={item.filterKey}>
          {item.label ? (
            <>{translationKey ? t(item.label) : item.label}</>
          ) : (
            <>{item.filterKey}</>
          )}
        </option>
      ))}
    </select>
  );
};

export default FilterContact;
