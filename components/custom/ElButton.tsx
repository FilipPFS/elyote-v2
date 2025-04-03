import clsx from "clsx";
import React, { JSX } from "react";

type Props = {
  icon?: JSX.Element;
  label: string;
  classNames?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ElButton = ({ classNames, label }: Props) => {
  return (
    <button
      className={clsx(
        "bg-blue-700 text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md py-1",
        classNames
      )}
    >
      {label}
    </button>
  );
};

export default ElButton;
