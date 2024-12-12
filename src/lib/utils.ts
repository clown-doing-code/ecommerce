import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "DOP", // Cambiado a DOP (código de moneda para Pesos Dominicanos)
) {
  return Intl.NumberFormat("es-DO", {
    // Usando locale es-DO para República Dominicana
    style: "currency",
    currency: "DOP",
    currencyDisplay: "symbol", // Muestra el símbolo RD$
  }).format(Number(price));
}
