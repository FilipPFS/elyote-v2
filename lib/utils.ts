import { cartData } from "@/constants/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateCartTotal = (cart: typeof cartData) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (total / 100).toFixed(2);
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params ?? "");

  if (value === undefined) {
    delete currentUrl[key];
  } else {
    currentUrl[key] = value;
  }

  return qs.stringifyUrl(
    {
      url: typeof window !== "undefined" ? window.location.pathname : "/",
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params ?? "");

  keysToRemove.forEach((key) => delete currentUrl[key]);

  return qs.stringifyUrl(
    {
      url: typeof window !== "undefined" ? window.location.pathname : "/",
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export const accessLevel = (level: number): string => {
  let key = "";

  if (level === 0) key = "public";
  else if (level === 1) key = "manager";
  else if (level === 2) key = "direction";
  else key = "Inconnu";

  return key;
};

export const formatType = (type: string): string => {
  let key = "";

  if (type === "other") key = "other";
  else if (type === "printer") key = "printer";
  else if (type === "phone") key = "phone";
  else if (type === "projector") key = "projector";

  return key;
};

export const getDateDifferenceInDays = (
  startDate: Date,
  endDate: Date
): number => {
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export const formatSavStatus = (status: string) => {
  let object = { key: "", classNames: "" };

  if (status === "0")
    object = {
      key: "SAV à faire",
      classNames: "text-white bg-red-500",
    };
  else if (status === "1")
    object = {
      key: "En attente Fournisseur/Fabricant",
      classNames: "text-white bg-orange-500",
    };
  else if (status === "2")
    object = {
      key: "Colis envoyé en SAV",
      classNames: "text-white bg-blue-800",
    };
  else if (status === "3")
    object = {
      key: "En attente Client",
      classNames: "text-white bg-orange-400",
    };
  else if (status === "4")
    object = {
      key: "Pret à être retiré",
      classNames: "text-white bg-gray-500",
    };
  else if (status === "5")
    object = {
      key: "Traité",
      classNames: "text-white bg-green-600",
    };

  return object;
};

export const customDateFormat = (theDate: string) => {
  const date = new Date(theDate);
  if (!isNaN(date.getTime())) {
    const formattedDate = `${theDate} 00:00:00`;
    return formattedDate;
  } else {
    toast.error("Veuillez entrer une date valide.");
    return;
  }
};
