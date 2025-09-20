import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// AIML: utility helpers for feature flagging/model variant toggles can live here
// BACKEND: add request helpers (e.g., auth header builders) in a separate module