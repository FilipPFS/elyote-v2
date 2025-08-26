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
          "border-gray-400 bg-white border-[1.5px] rounded-sm w-full flex items-center gap-3 h-10 px-4",
          parentClassNames
        )}
      >
        {icon && <span>{icon}</span>}
        <input
          ref={ref}
          {...props}
          className={clsx(
            "focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed w-full",
            classNames
          )}
        />
      </div>
    );
  }
);

ElInput.displayName = "ElInput";

export default ElInput;
