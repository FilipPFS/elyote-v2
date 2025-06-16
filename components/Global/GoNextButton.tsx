import Link from "next/link";
import React from "react";
import ElButton from "../custom/ElButton";

const GoNextButton = ({ link, label }: { link: string; label: string }) => {
  return (
    <Link href={link}>
      <ElButton
        label={label}
        // icon={<TiArrowLeft size={20} />}
        classNames="px-4 !h-9 !text-[12px] w-full md:w-fit"
      />
    </Link>
  );
};

export default GoNextButton;
