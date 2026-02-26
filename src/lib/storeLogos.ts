import magnumLogo from "@/assets/stores/magnum.ico";
import arbuzLogo from "@/assets/stores/arbuz.ico";
import smallLogo from "@/assets/stores/small.ico";

export const storeLogos: Record<string, string> = {
  "MGO": magnumLogo,
  "Magnum": magnumLogo,
  "Arbuz": arbuzLogo,
  "Small": smallLogo,
};

export const storeColors: Record<string, string> = {
  "MGO": "#22c55e",
  "Airba Fresh": "#3b82f6",
  "A-Store ADK": "#f59e0b",
  "Arbuz": "#ef4444",
  "Small": "#a855f7",
};

export function getStoreLogo(storeName: string): string | null {
  return storeLogos[storeName] || null;
}

export function getStoreInitial(storeName: string): string {
  return storeName.charAt(0).toUpperCase();
}
