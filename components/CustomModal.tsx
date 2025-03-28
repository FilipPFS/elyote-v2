"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { JSX } from "react";

type Props = {
  icon: JSX.Element;
  title: string;
  customContent: React.ReactNode;
};

const CustomModal = ({ icon, customContent, title }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer">{icon}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        {customContent}
        <AlertDialogFooter className="flex justify-center items-center">
          <AlertDialogAction className="bg-blue-800 hover:bg-blue-900 cursor-pointer">
            Fermer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomModal;
