import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Zap, Store, ChevronDown, ChevronUp, Check } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { allProducts, Product } from "@/data/mockProducts";
import mascot from "@/assets/logo.png";

type Strategy = "optimal" | string; // "optimal" or store name

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems, addItem } = useCart();
  const [strategy, setStrategy] = useState<Strategy>("optimal");
  const [expandedComparison, setExpandedComparison] = useState(true);

  // Get unique products in cart (by product id)
  const uniqueProducts = useMemo(() => {
    const map = new Map<string, { product: Product; quantity: number; currentStore: string; currentPrice: number }>();
    items.forEach((item) => {
      if (!map.has(item.product.id)) {
        map.set(item.product.id, {
          product: item.product,
          quantity: item.quantity,
          currentStore: item.store,
          currentPrice: item.price,
        });
      }
    });
    return Array.from(map.values());
  }, [items]);

  // All stores that carry at least one cart product
  const availableStores = useMemo(() => {
    const storeSet = new Set<string>();
    uniqueProducts.forEach(({ product }) => {
      product.stores.forEach((s) => storeSet.add(s.store));
    });
    return Array.from(storeSet);
  }, [uniqueProducts]);

  // Calculate total for a given strategy
  const calcTotal = (strat: Strategy) => {
    return uniqueProducts.reduce((sum, { product, quantity }) => {
      if (strat === "optimal") {
        const best = Math.min(...product.stores.map((s) => s.price));
        return sum + best * quantity;
      }
      const storePrice = product.stores.find((s) => s.store === strat);
      if (!storePrice) return sum + 999999; // not available
      return sum + storePrice.price * quantity;
    }, 0);
  };

  // Check if store has all products
  const storeHasAll = (storeName: string) =>
    uniqueProducts.every(({ product }) => product.stores.some((s) => s.store === storeName));

  const optimalTotal = calcTotal("optimal");

  // Apply a strategy: switch all items to the optimal/store choice
  const applyStrategy = (strat: Strategy) => {
    setStrategy(strat);
    uniqueProducts.forEach(({ product, quantity }) => {
      // Remove existing items for this product
      items
        .filter((i) => i.product.id === product.id)
        .forEach((i) => removeItem(i.product.id, i.store));

      let targetStore: { store: string; price: number } | undefined;

      if (strat === "optimal") {
        const best = product.stores.reduce((a, b) => (a.price < b.price ? a : b));
        targetStore = { store: best.store, price: best.price };
      } else {
        const sp = product.stores.find((s) => s.store === strat);
        if (sp) targetStore = { store: sp.store, price: sp.price };
      }

      if (targetStore) {
        // Add with correct quantity - we need to add one then update
        // Using setTimeout to avoid state batching issues
        setTimeout(() => {
          addItem(product, targetStore!.store, targetStore!.price);
          if (quantity > 1) {
            updateQuantity(product.id, targetStore!.store, quantity);
          }
        }, 0);
      }
    });
  };

  // Group current items by store
  const groupedByStore = items.reduce<Record<string, typeof items>>(
    (acc, item) => {
      if (!acc[item.store]) acc[item.store] = [];
      acc[item.store].push(item);
      return acc;
    },
    {}
  );

  const storeEntries = Object.entries(groupedByStore);

  // Per-product store comparison data
  const productComparison = useMemo(() => {
    return uniqueProducts.map(({ product, quantity, currentStore, currentPrice }) => {
      const bestPrice = Math.min(...product.stores.map((s) => s.price));
      const currentIsOptimal = currentPrice === bestPrice;
      return {
        product,
        quantity,
        currentStore,
        currentPrice,
        bestPrice,
        currentIsOptimal,
        stores: product.stores.map((s) => ({
          ...s,
          isBest: s.price === bestPrice,
          isCurrent: s.store === currentStore,
          savings: currentPrice - s.price,
        })),
      };
    });
  }, [uniqueProducts]);

  const totalSavingsIfOptimal = totalPrice - optimalTotal;

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-0">
      <Header />

      <main className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3 sm:mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Продолжить покупки
        </Link>

        <div className="flex items-baseline justify-between mb-4">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
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
          <div className="text-center py-16">
            <ShoppingBag className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm mb-4">Корзина пуста</p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground bg-secondary rounded-lg px-4 py-2 hover:bg-secondary/80 transition-colors"
            >
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* ===== Smart Comparison Panel ===== */}
            <div className="border border-border rounded-xl overflow-hidden bg-card">
              <button
                onClick={() => setExpandedComparison(!expandedComparison)}
                className="w-full px-3 sm:px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-foreground" />
                  <span className="text-sm font-semibold text-foreground">Сравнение магазинов</span>
                  {totalSavingsIfOptimal > 0 && (
                    <span className="savings-badge text-[10px]">
                      можно сэкономить {totalSavingsIfOptimal.toLocaleString()} ₸
                    </span>
                  )}
                </div>
                {expandedComparison ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {expandedComparison && (
                <div className="border-t border-border">
                  {/* Strategy selector */}
                  <div className="px-3 sm:px-4 py-3 space-y-2">
                    {/* Optimal mix */}
                    <StrategyOption
                      label="Оптимальный микс"
                      description="Лучшая цена за каждый товар"
                      total={optimalTotal}
                      isActive={strategy === "optimal"}
                      isBest
                      onClick={() => applyStrategy("optimal")}
                      icon={<Zap className="w-3.5 h-3.5" />}
                    />

                    {/* Single store options */}
                    {availableStores.map((storeName) => {
                      const hasAll = storeHasAll(storeName);
                      const storeTotal = hasAll ? calcTotal(storeName) : null;
                      const storeColor = allProducts
                        .flatMap((p) => p.stores)
                        .find((s) => s.store === storeName)?.color || "#888";

                      return (
                        <StrategyOption
                          key={storeName}
                          label={`Всё в ${storeName}`}
                          description={hasAll ? `${uniqueProducts.length} из ${uniqueProducts.length} товаров` : "Не все товары есть"}
                          total={storeTotal}
                          isActive={strategy === storeName}
                          isBest={false}
                          disabled={!hasAll}
                          onClick={() => hasAll && applyStrategy(storeName)}
                          icon={
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: storeColor }}
                            />
                          }
                        />
                      );
                    })}
                  </div>

                  {/* Per-product comparison table */}
                  <div className="border-t border-border">
                    <div className="px-3 sm:px-4 py-2">
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Цены по товарам
                      </p>
                    </div>
                    {productComparison.map(({ product, quantity, currentStore, currentPrice, bestPrice, stores }) => (
                      <div key={product.id} className="px-3 sm:px-4 py-2.5 border-t border-border">
                        <div className="flex items-start gap-2.5 mb-2">
                          <div className="w-8 h-8 rounded bg-secondary/50 flex items-center justify-center shrink-0">
                            <img
                              src={product.image}
                              alt=""
                              className="max-w-[80%] max-h-[80%] object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-foreground line-clamp-1 leading-snug">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{product.weight} × {quantity}</p>
                          </div>
                        </div>
                        {/* Store price chips */}
                        <div className="flex flex-wrap gap-1 pl-[2.625rem]">
                          {stores.map((s) => (
                            <button
                              key={s.store}
                              onClick={() => {
                                // Switch this product to this store
                                removeItem(product.id, currentStore);
                                setTimeout(() => {
                                  addItem(product, s.store, s.price);
                                  if (quantity > 1) {
                                    updateQuantity(product.id, s.store, quantity);
                                  }
                                }, 0);
                                setStrategy("optimal"); // reset strategy label
                              }}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] transition-colors ${
                                s.isCurrent
                                  ? "bg-foreground text-background font-medium"
                                  : "bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: s.isCurrent ? "hsl(var(--background))" : s.color }}
                              />
                              {s.store}
                              <span className={s.isBest && !s.isCurrent ? "font-semibold text-foreground" : ""}>
                                {s.price} ₸
                              </span>
                              {s.isBest && !s.isCurrent && (
                                <span className="text-[9px] text-green-600">мин</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ===== Cart Items grouped by store ===== */}
            {storeEntries.map(([store, storeItems]) => {
              const storeTotal = storeItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
              );
              const storeColor = storeItems[0]?.product.stores.find((s) => s.store === store)?.color || "#888";

              return (
                <div
                  key={store}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <div className="px-3 sm:px-4 py-2.5 bg-secondary/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: storeColor }}
                      />
                      <span className="text-sm font-medium text-foreground">{store}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {storeItems.length} {storeItems.length === 1 ? "товар" : "товаров"}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {storeTotal.toLocaleString()} ₸
                    </span>
                  </div>

                  {storeItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.store}`}
                      className={`px-3 sm:px-4 py-3 ${
                        idx < storeItems.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Link to={`/product/${item.product.id}`} className="shrink-0">
                          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg bg-secondary/50 flex items-center justify-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-w-[80%] max-h-[80%] object-contain"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-[13px] sm:text-sm text-foreground line-clamp-2 hover:underline leading-snug"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {item.product.weight}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.store)}
                          className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pl-[3.5rem] sm:pl-[4.25rem]">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.store, item.quantity - 1)
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
                              updateQuantity(item.product.id, item.store, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-foreground">
                          {(item.price * item.quantity).toLocaleString()} ₸
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* ===== Total ===== */}
            <div className="border border-border rounded-xl px-3 sm:px-4 py-3 bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"} · {storeEntries.length} {storeEntries.length === 1 ? "магазин" : "магазина"}
                </span>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                    {totalPrice.toLocaleString()} ₸
                  </span>
                </div>
              </div>
              {totalSavingsIfOptimal > 0 && strategy !== "optimal" && (
                <button
                  onClick={() => applyStrategy("optimal")}
                  className="w-full mt-1 text-[12px] text-center py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  💡 Переключить на оптимальный микс и сэкономить {totalSavingsIfOptimal.toLocaleString()} ₸
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Strategy option row
const StrategyOption = ({
  label,
  description,
  total,
  isActive,
  isBest,
  disabled,
  onClick,
  icon,
}: {
  label: string;
  description: string;
  total: number | null;
  isActive: boolean;
  isBest: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
      disabled
        ? "opacity-40 cursor-not-allowed"
        : isActive
        ? "bg-foreground text-background"
        : "bg-secondary/60 hover:bg-secondary text-foreground"
    }`}
  >
    <div className="shrink-0 flex items-center justify-center w-5 h-5">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-[13px] font-medium leading-tight ${isActive ? "" : ""}`}>{label}</p>
      <p className={`text-[11px] ${isActive ? "opacity-70" : "text-muted-foreground"}`}>{description}</p>
    </div>
    <div className="shrink-0 text-right">
      {total !== null ? (
        <>
          <p className="text-sm font-semibold">{total.toLocaleString()} ₸</p>
          {isBest && !isActive && (
            <p className="text-[10px] text-green-600 font-medium">лучшая цена</p>
          )}
        </>
      ) : (
        <p className="text-[11px] text-muted-foreground">—</p>
      )}
    </div>
    {isActive && (
      <Check className="w-4 h-4 shrink-0" />
    )}
  </button>
);

export default CartPage;
