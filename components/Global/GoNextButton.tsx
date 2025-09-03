import Link from "next/link";
import React, { JSX } from "react";
import ElButton from "../custom/ElButton";

const GoNextButton = ({
  link,
  label,
  icon,
}: {
  link: string;
  label: string;
  icon?: JSX.Element;
}) => {
  return (
    <Link href={link}>
      <ElButton
        label={label}
        icon={icon}
        classNames="px-4 !h-9 w-full md:w-fit"
      />
    </Link>
  );
};

export default GoNextButton;
