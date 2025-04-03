import clsx from "clsx";
import React, { JSX } from "react";

type Props = {
  icon: JSX.Element;
  classNames?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ElInput = ({ icon, classNames, ...rest }: Props) => {
  return (
    <div className="border-gray-400 border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4">
      <span>{icon}</span>
      <input
        {...rest}
        className={clsx("focus:outline-none  w-full", classNames)}
      />
    </div>
  );
};

export default ElInput;
