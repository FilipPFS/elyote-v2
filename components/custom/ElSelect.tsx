import clsx from "clsx";
import React, { JSX, ReactNode } from "react";

type Props = {
  icon: JSX.Element;
  children: ReactNode;
  classNames?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const ElSelect = ({ icon, children, classNames, ...rest }: Props) => {
  return (
    <div className="border-gray-400 border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4">
      <span>{icon}</span>
      <select
        {...rest}
        className={clsx("focus:outline-none w-full", classNames)}
      >
        {children}
      </select>
    </div>
  );
};

export default ElSelect;
