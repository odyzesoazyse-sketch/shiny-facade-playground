import { Plus } from "lucide-react";

export interface StorePrice {
  store: string;
  price: number;
  oldPrice?: number;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  weight: string;
  discountPercent: number;
  savingsAmount: number;
  stores: StorePrice[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const bestPrice = Math.min(...product.stores.map((s) => s.price));
  const worstPrice = Math.max(...product.stores.map((s) => s.oldPrice || s.price));

  return (
    <div className="bg-card rounded-2xl border border-border card-hover overflow-hidden group">
      {/* Image area */}
      <div className="relative p-4 pb-2">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="discount-badge">-{product.discountPercent}%</span>
          <span className="savings-badge">-{product.savingsAmount} ₸</span>
        </div>

        <div className="aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="price-new">{bestPrice} ₸</span>
          {worstPrice > bestPrice && (
            <span className="price-old">{worstPrice} ₸</span>
          )}
        </div>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <span className="text-xs text-muted-foreground">{product.weight}</span>
      </div>

      {/* Store prices */}
      <div className="px-4 py-2 space-y-1.5 border-t border-border">
        {product.stores.slice(0, 3).map((store) => (
          <div key={store.store} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: store.color }}
              />
              <span className="text-muted-foreground truncate max-w-[100px]">
                {store.store}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {store.oldPrice && (
                <span className="line-through text-muted-foreground">
                  {store.oldPrice}
                </span>
              )}
              <span className="font-semibold text-foreground">{store.price} ₸</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="px-4 pb-4 pt-2">
        <button className="w-full h-9 rounded-xl border-2 border-primary text-primary font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors">
          <Plus className="w-4 h-4" />
          Добавить
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
