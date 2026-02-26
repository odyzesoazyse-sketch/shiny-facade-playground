import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import StoreLogo from "@/components/StoreLogo";

const ProductCard = ({ product }: { product: Product }) => {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const bestStore = product.stores.reduce((a, b) => (a.price < b.price ? a : b));
  const worstPrice = Math.max(...product.stores.map((s) => s.oldPrice || s.price));

  // Find if this product is already in cart (any store)
  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, bestStore.store, bestStore.price);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.product.id, cartItem.store, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity <= 1) {
        removeItem(cartItem.product.id, cartItem.store);
      } else {
        updateQuantity(cartItem.product.id, cartItem.store, cartItem.quantity - 1);
      }
    }
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
        <div className="aspect-[4/3] flex items-center justify-center rounded-lg bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-105 transition-transform duration-300"
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
                <StoreLogo store={store.store} size="sm" />
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

      {/* Add button / quantity control */}
      <div className="px-3 pb-3 pt-1.5">
        {quantity === 0 ? (
          <button
            onClick={handleAdd}
            className="w-full h-8 rounded-lg border border-primary text-primary text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/5 active:scale-[0.98] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Добавить
          </button>
        ) : (
          <div className="flex items-center justify-between h-8">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-semibold text-foreground">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
