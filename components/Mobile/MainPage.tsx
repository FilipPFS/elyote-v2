import React, { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

const MainPage = ({ title, children }: Props) => {
  return (
    <div className="p-4 md:p-6 flex flex-col gap-4">
      <h1 className="hidden sm:block text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
};

export default MainPage;
