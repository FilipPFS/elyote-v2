import clsx from "clsx";
import React, { JSX } from "react";

type Props = {
  icon?: JSX.Element;
  label: string;
  classNames?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ElButton = ({ icon, classNames, label }: Props) => {
  return (
    <button
      className={clsx(
        "bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 justify-center text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10",
        classNames
      )}
    >
      {icon}
      {label}
    </button>
  );
};

export default ElButton;
