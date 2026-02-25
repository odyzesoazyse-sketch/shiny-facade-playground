import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCart();

  // Group items by store
  const groupedByStore = items.reduce<Record<string, typeof items>>(
    (acc, item) => {
      if (!acc[item.store]) acc[item.store] = [];
      acc[item.store].push(item);
      return acc;
    },
    {}
  );

  const storeEntries = Object.entries(groupedByStore);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Продолжить покупки
        </Link>

        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Корзина
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Очистить
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm mb-4">Корзина пуста</p>
            <Link
              to="/"
              className="text-sm text-foreground underline"
            >
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {storeEntries.map(([store, storeItems]) => {
              const storeTotal = storeItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
              );

              return (
                <div
                  key={store}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  {/* Store header */}
                  <div className="px-4 py-2.5 bg-secondary/50 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {store}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {storeTotal.toLocaleString()} ₸
                    </span>
                  </div>

                  {/* Items */}
                  {storeItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.store}`}
                      className={`flex items-center gap-4 px-4 py-3 ${
                        idx < storeItems.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      {/* Image */}
                      <Link to={`/product/${item.product.id}`} className="shrink-0">
                        <div className="w-14 h-14 rounded-lg bg-secondary/50 flex items-center justify-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-w-[80%] max-h-[80%] object-contain"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-sm text-foreground line-clamp-1 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {item.product.weight}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.store,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.store,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold text-foreground">
                          {(item.price * item.quantity).toLocaleString()} ₸
                        </span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id, item.store)}
                        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-sm text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "товар" : "товаров"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground mr-2">Итого</span>
                <span className="text-xl font-semibold tracking-tight text-foreground">
                  {totalPrice.toLocaleString()} ₸
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
