"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const FilterButton = ({
  label,
  status,
  selectedStatus,
}: {
  label: string;
  status: string;
  selectedStatus: string | string[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "status",
      value: status,
    });
    router.push(newUrl);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative px-4 py-2 text-[10px] transition-all cursor-pointer
      ${
        selectedStatus === status
          ? "text-blue-600 font-semibold"
          : "text-gray-600"
      }
    `}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300
        ${selectedStatus === status ? "bg-blue-600" : "bg-gray-300"}
      `}
      />
    </button>
  );
};

export default FilterButton;
