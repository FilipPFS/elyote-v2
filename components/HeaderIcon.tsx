"use client";

import React, { JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  icon: JSX.Element;
  customContent: React.ReactNode;
};

const HeaderIcon = ({ icon, customContent }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {icon}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-4" sideOffset={14}>
        {customContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderIcon;
