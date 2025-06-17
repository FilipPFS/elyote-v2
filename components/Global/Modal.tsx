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
            "relative bg-white p-6 rounded-lg shadow-lg border-2 border-gray-100 w-[95%] md:w-4/5 transition-all duration-300 ease-in-out transform",
            visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
