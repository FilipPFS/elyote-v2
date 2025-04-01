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
  notification?: React.ReactNode;
};

const HeaderIcon = ({ icon, customContent, notification }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative cursor-pointer">
        {icon}
        {notification && notification}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white p-4"
        side="bottom"
        sideOffset={14}
      >
        {customContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderIcon;
