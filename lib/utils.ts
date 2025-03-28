import { cartData } from "@/constants/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateCartTotal = (cart: typeof cartData) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (total / 100).toFixed(2);
};
