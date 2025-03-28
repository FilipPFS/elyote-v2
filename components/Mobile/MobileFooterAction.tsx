"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JSX } from "react";

type Props = {
  icon: JSX.Element;
  customContent: React.ReactNode;
  label: string;
};

const MobileFooterAction = ({ icon, customContent, label }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="flex flex-col gap-1 items-center">
        {icon}
        <small>{label}</small>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle hidden>Title</SheetTitle>
        <SheetDescription hidden>Description</SheetDescription>
        {customContent}
      </SheetContent>
    </Sheet>
  );
};

export default MobileFooterAction;
