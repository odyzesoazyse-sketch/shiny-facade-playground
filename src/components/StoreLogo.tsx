import { useState, useMemo } from "react";
import { getStoreLogo, getStoreInitial } from "@/lib/storeLogos";

interface StoreLogoProps {
  store: string;
  size?: "sm" | "md";
  className?: string;
  logoUrl?: string | null;
}

const StoreLogo = ({ store, size = "sm", className = "", logoUrl }: StoreLogoProps) => {
  const [error, setError] = useState(false);
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  const src = useMemo(() => {
    if (!logoUrl || error) return getStoreLogo(store);

    const trimmed = String(logoUrl).trim();
    if (!trimmed) return getStoreLogo(store);

    if (trimmed.toLowerCase().startsWith("http") || trimmed.startsWith("//")) {
      return trimmed;
    }

    const host = "https://backend.minprice.kz";
    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return path.startsWith("/media/") ? `${host}${path}` : `${host}/media${path}`;
  }, [logoUrl, error, store]);

  if (src) {
    return (
      <img
        src={src}
        alt={store}
        className={`${sizeClass} rounded object-cover shrink-0 ${className}`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <span
      className={`${sizeClass} rounded shrink-0 flex items-center justify-center bg-muted text-muted-foreground font-bold text-[8px] ${className}`}
    >
      {getStoreInitial(store)}
    </span>
  );
};

export default StoreLogo;
