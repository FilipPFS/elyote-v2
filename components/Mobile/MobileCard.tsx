import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MobileCard = ({ children }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
      {children}
    </div>
  );
};

export default MobileCard;
