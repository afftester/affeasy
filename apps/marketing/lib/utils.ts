import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Francois_One } from "next/font/google";

export const headerFont = Francois_One({
  weight: "400",
  subsets: ["latin"],
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
