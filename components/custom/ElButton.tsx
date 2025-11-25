import clsx from "clsx";
import Link from "next/link";
import React, { JSX } from "react";

type Props = {
  icon?: JSX.Element;
  label: string;
  classNames?: string;
  link?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ElButton = ({
  icon,
  classNames,
  label,
  disabled,
  onClick,
  link,
}: Props) => {
  return (
    <>
      {link ? (
        <Link
          href={link}
          className={clsx(
            "bg-blue-700 disabled:bg-gray-400 px-4 weight:font-bold text-base small:text-sm big:text-lg disabled:cursor-not-allowed flex items-center gap-2 justify-center cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10",
            classNames
          )}
        >
          {label}
        </Link>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={clsx(
            "bg-blue-700 disabled:bg-gray-400 px-4 weight:font-bold text-base small:text-sm big:text-lg disabled:cursor-not-allowed flex items-center gap-2 justify-center cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10",
            classNames
          )}
        >
          {icon}
          {label}
        </button>
      )}
    </>
  );
};

export default ElButton;
