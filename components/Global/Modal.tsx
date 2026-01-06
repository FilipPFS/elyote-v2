"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal = ({ visible, setVisible, children }: Props) => {
  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out",
        isMounted ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out",
          isMounted ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setVisible(false)}
      />
      {isMounted && (
        <div
          className={clsx(
            "relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-gray-100 dark:border-gray-700 w-[95%] md:w-4/5 transition-all duration-300 ease-in-out transform",
            visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            onClick={() => setVisible(false)}
            aria-label="Fermer"
            className="
            absolute top-3 right-5 cursor-pointer
            flex items-center justify-center
             h-6 w-6 rounded-full
            border border-blue-200 dark:border-blue-800
           text-blue-600 dark:text-blue-400
           bg-blue-50 dark:bg-blue-900/30
           hover:bg-blue-100 dark:hover:bg-blue-900/50
           hover:text-blue-700 dark:hover:text-blue-300
           transition-colors
            "
          >
            ✕
          </button>

          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
