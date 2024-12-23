import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formatDateTime(date: Date) {
  return format(date, "yyyy-MM-dd HH:mm");
}
