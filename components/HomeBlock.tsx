import React from "react";

type Props = {
  title: string;
  jsx?: React.ReactNode;
};

const HomeBlock = ({ title, jsx }: Props) => {
  return (
    <div className="rounded-md p-4 sm:p-8 bg-white">
      <h1 className="font-semibold text-xl">{title}</h1>
      {jsx}
    </div>
  );
};

export default HomeBlock;
