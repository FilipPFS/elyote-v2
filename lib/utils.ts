import { cartData } from "@/constants/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";

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

  if (type === "other") key = "Autre";
  else if (type === "printer") key = "Imprimante";
  else if (type === "phone") key = "Téléphone";
  else if (type === "projector") key = "Projecteur";

  return key;
};
