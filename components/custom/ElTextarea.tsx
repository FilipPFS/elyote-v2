import clsx from "clsx";
import React, { forwardRef, TextareaHTMLAttributes } from "react";

interface ElTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
  classNames?: string;
}

const ElTextarea = forwardRef<HTMLTextAreaElement, ElTextareaProps>(
  ({ icon, classNames, ...props }, ref) => {
    return (
      <div className="border-gray-400 dark:border-none bg-white dark:bg-gray-800 border-[1.5px] h-fit min-h-22 rounded-sm w-full flex items-center gap-3 px-4">
        {icon && <span>{icon}</span>}
        <textarea
          ref={ref}
          {...props}
          className={clsx("focus:outline-none w-full py-2 pt-8", classNames)}
        />
      </div>
    );
  }
);

ElTextarea.displayName = "ElTextarea";

export default ElTextarea;
