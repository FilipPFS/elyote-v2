"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import clsx from "clsx";

type Props = {
  placeholder: string;
  component?: string;
  classNames?: string;
};

const Search = ({ placeholder, component, classNames }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialisation au montage + sync quand l'URL change de l'extérieur
  useEffect(() => {
    const queryFromUrl = searchParams.get("query") ?? "";
    setSearch(queryFromUrl);
  }, [searchParams]);

  const updateUrl = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim() && value.length > 1) {
      params.set("query", value.trim());
    } else {
      params.delete("query");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear timer précédent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce 800ms
    timeoutRef.current = setTimeout(() => {
      updateUrl(value);
    }, 800);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updateUrl(search);
  };

  // Cleanup timer au unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex items-center gap-2 h-10",
        component === "contact_client" && "w-full",
        classNames
      )}
    >
      <div className="p-3 px-4 h-full w-[calc(100%-40px)] flex items-center gap-3 border-[1px] border-black rounded-lg">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder={placeholder}
          className="focus:outline-none focus:ring-0 w-full bg-transparent"
          value={search} // ← Contrôlé !
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={!search || search.length <= 1}
        className="h-[39px] disabled:bg-gray-500 bg-blue-600 w-10 flex justify-center items-center rounded-lg cursor-pointer transition-all duration-500 hover:bg-blue-800"
      >
        <FaSearch className="text-white" />
      </button>
    </form>
  );
};

export default Search;
