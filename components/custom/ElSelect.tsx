import clsx from "clsx";
import React, { JSX, ReactNode } from "react";

type Props = {
  icon?: JSX.Element;
  children: ReactNode;
  classNames?: string;
  parentClassnames?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const ElSelect = ({
  icon,
  children,
  classNames,
  parentClassnames,
  ...rest
}: Props) => {
  return (
    <div
      className={clsx(
        "border-gray-400 dark:border-none text-base small:text-sm big:text-lg weight:font-bold bg-white dark:bg-gray-800 border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4",
        parentClassnames
      )}
    >
      <span>{icon}</span>
      <select
        {...rest}
        className={clsx(
          "focus:outline-none w-full bg-white dark:bg-gray-800",
          classNames
        )}
      >
        {children}
      </select>
    </div>
  );
};

export default ElSelect;
