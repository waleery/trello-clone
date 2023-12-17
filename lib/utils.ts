import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
//function to merge css classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
