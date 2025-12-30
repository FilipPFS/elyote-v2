"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AlphabetFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const handleClick = (letter: string) => {
    router.push(`${pathname}?filterby=${letter}`);
  };

  const handleRemoveLetter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("filterby");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleClick(letter)}
          className="md:px-3 md:py-2 px-1.5 py-1 text-xs md:text-sm rounded-md border border-gray-300 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {letter}
        </button>
      ))}
      <button
        onClick={handleRemoveLetter}
        className="md:px-3 md:py-2 px-1.5 py-1 text-xs md:text-sm rounded-md border border-gray-300 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        x
      </button>
    </div>
  );
};

export default AlphabetFilter;
