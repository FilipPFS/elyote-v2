import clsx from "clsx";
import React, { JSX } from "react";

type Props = {
  icon?: JSX.Element;
  classNames?: string;
  parentClassNames?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ElInput = ({ icon, classNames, parentClassNames, ...rest }: Props) => {
  return (
    <div
      className={clsx(
        "border-gray-400 bg-white border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4",
        parentClassNames
      )}
    >
      {icon && <span>{icon}</span>}
      <input
        {...rest}
        className={clsx(
          "focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed w-full",
          classNames
        )}
      />
    </div>
  );
};

export default ElInput;
