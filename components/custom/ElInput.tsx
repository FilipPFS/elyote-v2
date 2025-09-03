import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface ElInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  classNames?: string;
  parentClassNames?: string;
}

const ElInput = forwardRef<HTMLInputElement, ElInputProps>(
  ({ icon, classNames, parentClassNames, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "border-gray-400 dark:border-none text-base small:text-sm big:text-lg weight:font-bold bg-white dark:bg-gray-800 border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4",
          parentClassNames
        )}
      >
        {icon && <span>{icon}</span>}
        <input
          ref={ref}
          {...props}
          className={clsx(
            "focus:outline-none disabled:bg-gray-200 dark:disabled:bg-gray-900 disabled:cursor-not-allowed w-full",
            classNames
          )}
        />
      </div>
    );
  }
);

ElInput.displayName = "ElInput";

export default ElInput;
