"use client";

import { formUrlQuery } from "@/lib/utils";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, memo } from "react";

type Props = {
  page: number | string;
  totalPages: number;
  additionalClassnames?: string;
};

const Pagination = ({ page, totalPages, additionalClassnames }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(page) || 1;

  // Memoized function to handle page clicks
  const onPageClick = useCallback(
    (pageNumber: number) => {
      if (pageNumber === currentPage) return; // Prevent redundant navigation
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: pageNumber.toString(),
      });
      router.push(newUrl, { scroll: false }); // Shallow routing
    },
    [searchParams, router, currentPage]
  );

  // Generate visible page numbers (e.g., current ± 5, with First/Last)
  const pageRange = useMemo(() => {
    const delta = 5; // Show ±5 pages around current
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    const pages = [];

    if (left > 1) pages.push(1); // First page
    if (left > 2) pages.push("..."); // Ellipsis for gap
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("..."); // Ellipsis for gap
    if (right < totalPages) pages.push(totalPages); // Last page

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={clsx("flex gap-2", additionalClassnames)}>
      {pageRange.map((pageNum, index) =>
        pageNum === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-7 h-7 text-sm text-center"
          >
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageClick(pageNum as number)}
            disabled={pageNum === currentPage}
            className={clsx(
              "w-7 h-7 rounded-sm shadow-sm text-sm",
              pageNum === currentPage
                ? "bg-gray-600 text-white cursor-default"
                : "bg-gray-200 cursor-pointer hover:bg-gray-300"
            )}
          >
            {pageNum}
          </button>
        )
      )}
    </div>
  );
};

export default memo(Pagination);
