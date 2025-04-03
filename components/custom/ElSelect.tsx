import clsx from "clsx";
import React, { JSX } from "react";

type Props = {
  icon: JSX.Element;
  classNames?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const ElSelect = ({ icon, classNames, ...rest }: Props) => {
  return (
    <div className="border-gray-400 border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4">
      <span>{icon}</span>
      <select
        {...rest}
        className={clsx("focus:outline-none w-full", classNames)}
      >
        <option value={"tout_public"}>Tout Public</option>
        <option value={"manager"}>Manager</option>
        <option value="direction">Direction</option>
      </select>
    </div>
  );
};

export default ElSelect;
