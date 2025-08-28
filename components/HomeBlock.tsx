import React from "react";

type Props = {
  title: string;
  jsx?: React.ReactNode;
};

const HomeBlock = ({ title, jsx }: Props) => {
  return (
    <div className="rounded-md h-full flex flex-col min-h-[330px] p-5 sm:p-4 sm:px-6 bg-white dark:bg-gray-800">
      <h1 className="font-semibold text-lg">{title}</h1>
      {jsx}
    </div>
  );
};

export default HomeBlock;
