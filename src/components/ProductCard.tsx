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
        {/* Both badges like original */}
        <div className="absolute top-2 left-2 flex flex-col gap-0.5 z-10">
          <span className="discount-badge">-{product.discountPercent}%</span>
          <span className="savings-badge">-{product.savingsAmount} ₸</span>
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

      {/* Price + Name */}
      <div className="px-3 pt-2.5 pb-1.5">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="price-new">{bestStore.price} ₸</span>
          {worstPrice > bestStore.price && (
            <span className="price-old">{worstPrice} ₸</span>
          )}
        </div>
        <h3 className="text-[13px] text-foreground leading-snug line-clamp-2 min-h-[2.25rem]">
          {product.name}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">{product.weight}</p>
      </div>

      {/* Store prices - like original with colored dots */}
      <div className="px-3 py-1.5 space-y-1 border-t border-border">
        {product.stores.map((store) => (
          <div key={store.store} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: store.color }}
              />
              <span className="text-muted-foreground truncate">{store.store}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {store.oldPrice && (
                <span className="line-through text-muted-foreground/60">
                  {store.oldPrice}
                </span>
              )}
              <span className="font-medium text-foreground">{store.price} ₸</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="px-3 pb-3 pt-1.5">
        <button
          onClick={handleAdd}
          className="w-full h-8 rounded-lg border border-border text-muted-foreground text-xs font-medium flex items-center justify-center gap-1 hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Добавить
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
