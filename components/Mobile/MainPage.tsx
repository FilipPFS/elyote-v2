import React, { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  headerElement?: ReactNode;
};

const MainPage = ({ title, children, headerElement }: Props) => {
  return (
    <div className="p-4 md:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden sm:block text-xl font-semibold">{title}</h1>
        {headerElement}
      </div>
      {children}
    </div>
  );
};

export default MainPage;
