import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const unitRu: Record<string, string> = {
  g: 'г', ml: 'мл', piece: 'шт', kg: 'кг', l: 'л',
};

export const toRuUnit = (u: string) => unitRu[u?.toLowerCase()] ?? u;
