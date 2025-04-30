import clsx from "clsx";
import React, { JSX } from "react";

type Props = {
  icon?: JSX.Element;
  classNames?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const ElTextarea = ({ icon, classNames, ...rest }: Props) => {
  return (
    <div className="border-gray-400 border-[1.5px] h-fit min-h-22 rounded-sm w-full flex items-center gap-3 px-4">
      <span>{icon}</span>
      <textarea
        {...rest}
        className={clsx("focus:outline-none w-full py-2 pt-8", classNames)}
      />
    </div>
  );
};

export default ElTextarea;
