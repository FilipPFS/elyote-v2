import React, { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  headerElement?: ReactNode;
};

const MainPage = ({ title, children, headerElement }: Props) => {
  return (
    <div className="p-4 md:p-6 flex flex-col overflow-x-hidden gap-4">
      <div className="flex flex-col gap-3 items-start sm:flex-row sm:items-center justify-between">
        <h1 className="block text-lg sm:text-xl font-semibold">{title}</h1>
        {headerElement}
      </div>
      {children}
    </div>
  );
};

export default MainPage;
