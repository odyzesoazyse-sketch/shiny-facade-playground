import { getStoreLogo, getStoreInitial } from "@/lib/storeLogos";

interface StoreLogoProps {
  store: string;
  size?: "sm" | "md";
  className?: string;
}

const StoreLogo = ({ store, size = "sm", className = "" }: StoreLogoProps) => {
  const logo = getStoreLogo(store);
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  if (logo) {
    return (
      <img
        src={logo}
        alt={store}
        className={`${sizeClass} rounded-sm object-contain shrink-0 ${className}`}
      />
    );
  }

  return (
    <span
      className={`${sizeClass} rounded-sm shrink-0 flex items-center justify-center bg-muted text-muted-foreground font-bold text-[8px] ${className}`}
    >
      {getStoreInitial(store)}
    </span>
  );
};

export default StoreLogo;
