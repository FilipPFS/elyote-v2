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
  label?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileFooterAction = ({
  setOpen,
  open,
  icon,
  customContent,
  label,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        onClick={setOpen ? () => setOpen(true) : undefined}
        className="flex flex-col gap-1 items-center"
      >
        {icon}
        {label && <small>{label}</small>}
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
