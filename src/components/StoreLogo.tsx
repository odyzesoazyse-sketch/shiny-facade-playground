import { getStoreLogo, getStoreInitial, storeColors } from "@/lib/storeLogos";

interface StoreLogoProps {
  store: string;
  size?: "sm" | "md";
  className?: string;
}

const StoreLogo = ({ store, size = "sm", className = "" }: StoreLogoProps) => {
  const logo = getStoreLogo(store);
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const textSize = size === "sm" ? "text-[8px]" : "text-[10px]";

  if (logo) {
    return (
      <img
        src={logo}
        alt={store}
        className={`${sizeClass} rounded-sm object-contain shrink-0 ${className}`}
      />
    );
  }

  const color = storeColors[store] || "#6b7280";
  return (
    <span
      className={`${sizeClass} rounded-sm shrink-0 flex items-center justify-center text-white font-bold ${textSize} ${className}`}
      style={{ backgroundColor: color }}
    >
      {getStoreInitial(store)}
    </span>
  );
};

export default StoreLogo;
