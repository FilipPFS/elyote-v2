import Link from "next/link";
import React from "react";
import ElButton from "../custom/ElButton";
import { TiArrowLeft } from "react-icons/ti";

const GoBackButton = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <ElButton
        label="Retour à la liste"
        icon={<TiArrowLeft size={20} />}
        classNames="px-4 mt-4 !h-8 text-[12px]"
      />
    </Link>
  );
};

export default GoBackButton;
