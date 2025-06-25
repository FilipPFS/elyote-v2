"use client";

import { formUrlQuery } from "@/lib/utils";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  page: number | string;
  totalPages: number;
  additionalClassnames?: string;
};

const Pagination = ({ page, totalPages, additionalClassnames }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onPageClick = (pageNumber: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className={clsx("flex gap-2", additionalClassnames)}>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageClick(pageNumber)}
            className={clsx(
              "w-7 h-7 rounded-sm shadow-sm text-sm cursor-pointer",
              pageNumber === Number(page)
                ? "bg-gray-600 text-white"
                : " bg-gray-200"
            )}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
