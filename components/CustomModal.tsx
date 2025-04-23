"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { JSX } from "react";

type Props = {
  icon: JSX.Element;
  title: string;
  customContent: React.ReactNode;
};

const CustomModal = ({ icon, customContent, title }: Props) => {
  const t = useTranslations("global.globalSearch");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer">{icon}</AlertDialogTrigger>
      <AlertDialogContent className="font-primary">
        <AlertDialogTitle>{title}</AlertDialogTitle>
        {customContent}
        <AlertDialogFooter className="flex justify-center items-center">
          <AlertDialogAction className="bg-blue-800 hover:bg-blue-900 cursor-pointer">
            {t("closeBtn")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomModal;
