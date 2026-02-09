import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim().slice(0, 10000);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

// Rate limiting disabled — no limits for now
export function checkRateLimit(_key: string, _max: number = 999, _window: number = 1): boolean {
  return true;
}
