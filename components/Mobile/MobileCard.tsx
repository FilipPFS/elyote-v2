import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MobileCard = ({ children }: Props) => {
  return <div className="bg-white p-3 rounded-md shadow-sm">{children}</div>;
};

export default MobileCard;
