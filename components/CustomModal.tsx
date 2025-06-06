"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { JSX } from "react";

type Props = {
  icon?: JSX.Element;
  title: string;
  customContent: React.ReactNode;
  jsxBtn?: React.ReactNode;
  classNames?: string;
};

const CustomModal = ({
  icon,
  customContent,
  title,
  jsxBtn,
  classNames,
}: Props) => {
  const t = useTranslations("global.globalSearch");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer">
        {icon ? icon : jsxBtn}
      </AlertDialogTrigger>
      <AlertDialogContent className={clsx("font-primary", classNames)}>
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
