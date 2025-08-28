"use client";

import { formUrlQuery } from "@/lib/utils";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, memo, useTransition } from "react";

type Props = {
  page: number | string;
  totalPages: number;
  additionalClassnames?: string;
};

const Pagination = ({ page, totalPages, additionalClassnames }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(page) || 1;

  const [isPending, startTransition] = useTransition();

  // Memoized function to handle page clicks
  const onPageClick = useCallback(
    (pageNumber: number) => {
      if (pageNumber === currentPage) return;
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: pageNumber.toString(),
      });

      startTransition(() => {
        router.push(newUrl, { scroll: false });
      });
    },
    [searchParams, router, currentPage]
  );

  // Generate visible page numbers
  const pageRange = useMemo(() => {
    const delta = 5;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    const pages: (number | string)[] = [];

    if (left > 1) pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (right < totalPages) pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={clsx("flex gap-2 items-center", additionalClassnames)}>
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
            disabled={pageNum === currentPage || isPending}
            className={clsx(
              "w-7 h-7 rounded-sm shadow-sm text-sm flex items-center justify-center",
              pageNum === currentPage
                ? "bg-gray-600 dark:bg-gray-800 text-white cursor-default"
                : "bg-gray-200 dark:bg-gray-600 cursor-pointer hover:bg-gray-300 transition-all duration-300 dark:hover:bg-gray-800",
              isPending && "opacity-50 cursor-wait"
            )}
          >
            {isPending && pageNum !== currentPage ? "…" : pageNum}
          </button>
        )
      )}
    </div>
  );
};

export default memo(Pagination);
