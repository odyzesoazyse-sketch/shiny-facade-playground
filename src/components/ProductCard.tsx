import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
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
        {/* Separate badges like original */}
        <div className="absolute top-2 left-2 z-10 flex gap-1">
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

      {/* Store prices with best price label */}
      <div className="px-3 py-1.5 space-y-1 border-t border-border">
        {product.stores.map((store) => {
          const isBest = store.price === bestStore.price;
          return (
            <div key={store.store} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: store.color }}
                />
                <span className="text-muted-foreground truncate">{store.store}</span>
                {isBest && product.stores.length > 1 && (
                  <span className="best-price-label">min</span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {store.oldPrice && (
                  <span className="line-through text-muted-foreground/60">
                    {store.oldPrice}
                  </span>
                )}
                <span className={`font-medium ${isBest ? "text-foreground" : "text-muted-foreground"}`}>
                  {store.price} ₸
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add button — filled style */}
      <div className="px-3 pb-3 pt-1.5">
        <button
          onClick={handleAdd}
          className="w-full h-8 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/90 active:scale-[0.98] transition-all"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          В корзину
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
