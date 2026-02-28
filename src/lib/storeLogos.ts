import magnumLogo from "@/assets/stores/magnum.png";
import airbaFreshLogo from "@/assets/stores/airba_fresh.png";
import astoreLogo from "@/assets/stores/astore.png";
import arbuzLogo from "@/assets/stores/arbuz.png";
import smallLogo from "@/assets/stores/small.png";

export const storeLogos: Record<string, string> = {
  "MGO": magnumLogo,
  "Magnum": magnumLogo,
  "MagnumGO": magnumLogo,
  "Airba Fresh": airbaFreshLogo,
  "A-Store ADK": astoreLogo,
  "Arbuz": arbuzLogo,
  "Small": smallLogo,
};

export function getStoreLogo(storeName: string): string | null {
  return storeLogos[storeName] || null;
}

export function getStoreInitial(storeName: string): string {
  return storeName.charAt(0).toUpperCase();
}
