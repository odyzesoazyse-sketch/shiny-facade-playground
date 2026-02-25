import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Product } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const bestStore = product.stores.reduce((a, b) => (a.price < b.price ? a : b));
  const worstPrice = Math.max(...product.stores.map((s) => s.oldPrice || s.price));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, bestStore.store, bestStore.price);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-xl border border-border hover:border-foreground/10 transition-all duration-200 overflow-hidden"
    >
      {/* Image */}
      <div className="relative p-3 pb-0">
        <div className="absolute top-2 left-2 flex flex-col gap-0.5 z-10">
          <span className="discount-badge">-{product.discountPercent}%</span>
        </div>
        <div className="aspect-square flex items-center justify-center rounded-lg bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[75%] max-h-[75%] object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 pt-2.5 space-y-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="price-new">{bestStore.price} ₸</span>
          {worstPrice > bestStore.price && (
            <span className="price-old">{worstPrice} ₸</span>
          )}
        </div>
        <h3 className="text-[13px] text-foreground leading-snug line-clamp-2 min-h-[2.25rem]">
          {product.name}
        </h3>
        <p className="text-[11px] text-muted-foreground">{product.weight}</p>

        {/* Stores summary */}
        <div className="pt-1 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {product.stores.length} {product.stores.length === 1 ? "магазин" : "магазина"}
          </span>
          <button
            onClick={handleAdd}
            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
