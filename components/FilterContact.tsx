"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  translationKey?: string;
  filterOptions?: {
    label?: string;
    filterKey: string;
  }[];
  oneKeyFilters?: string[] | null;
  keyString: string;
};

const FilterContact = ({
  translationKey,
  filterOptions,
  keyString,
  oneKeyFilters,
}: Props) => {
  const [category, setCategory] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations(translationKey);

  const onSelectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (category && category !== "all") {
      params.set(keyString, category);
    } else {
      params.delete(keyString);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // 🚀 useTransition makes route change non-blocking
    startTransition(() => {
      router.push(newUrl, { scroll: false });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className="border-gray-400 dark:border-gray-800 bg-white dark:bg-gray-900 border-[1.5px] rounded-sm py-1 px-4 md:w-fit w-full"
        value={category}
        onChange={(e) => {
          const selectedCategory = e.target.value;
          setCategory(selectedCategory);
          onSelectCategory(selectedCategory);
        }}
      >
        {filterOptions &&
          filterOptions.map((item, index) => (
            <option key={index} value={item.filterKey}>
              {item.label ? (
                <>{translationKey ? t(item.label) : item.label}</>
              ) : (
                <>{item.filterKey}</>
              )}
            </option>
          ))}
        {oneKeyFilters && (
          <>
            <option value="all">Tous</option>
            {oneKeyFilters.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </>
        )}
      </select>

      {isPending && (
        <div className="flex items-center gap-4 fixed top-20 left-1/2 -translate-x-1/2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
          <span className="">Chargement...</span>
        </div>
      )}
    </div>
  );
};

export default FilterContact;
