import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, Zap, ChevronDown, ChevronUp, Check, ShoppingBag, Store, TrendingDown, Package } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { allProducts, Product } from "@/data/mockProducts";
import StoreLogo from "@/components/StoreLogo";
import mascot from "@/assets/logo.png";

type Strategy = "optimal" | string;

const CartPage = () => {
  const { items, removeItem, updateQuantity, switchStore, clearCart, totalPrice, totalItems } = useCart();
  const [strategy, setStrategy] = useState<Strategy>("optimal");
  const [expandedComparison, setExpandedComparison] = useState(true);

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

  const availableStores = useMemo(() => {
    const storeSet = new Set<string>();
    uniqueProducts.forEach(({ product }) => {
      product.stores.forEach((s) => storeSet.add(s.store));
    });
    return Array.from(storeSet);
  }, [uniqueProducts]);

  const calcTotal = (strat: Strategy) => {
    return uniqueProducts.reduce((sum, { product, quantity }) => {
      if (strat === "optimal") {
        const best = Math.min(...product.stores.map((s) => s.price));
        return sum + best * quantity;
      }
      const storePrice = product.stores.find((s) => s.store === strat);
      if (storePrice) return sum + storePrice.price * quantity;
      // Fallback to best price for missing items
      const best = Math.min(...product.stores.map((s) => s.price));
      return sum + best * quantity;
    }, 0);
  };

  const storeHasAll = (storeName: string) =>
    uniqueProducts.every(({ product }) => product.stores.some((s) => s.store === storeName));

  const getStoreInfo = (storeName: string) => {
    const available = uniqueProducts.filter(({ product }) =>
      product.stores.some((s) => s.store === storeName)
    );
    const missing = uniqueProducts.filter(({ product }) =>
      !product.stores.some((s) => s.store === storeName)
    );
    return { available, missing, hasAll: missing.length === 0 };
  };

  const optimalTotal = calcTotal("optimal");

  const applyStrategy = (strat: Strategy) => {
    setStrategy(strat);
    uniqueProducts.forEach(({ product }) => {
      let targetStore: { store: string; price: number } | undefined;
      if (strat === "optimal") {
        const best = product.stores.reduce((a, b) => (a.price < b.price ? a : b));
        targetStore = { store: best.store, price: best.price };
      } else {
        const sp = product.stores.find((s) => s.store === strat);
        if (sp) targetStore = { store: sp.store, price: sp.price };
      }
      if (targetStore) {
        switchStore(product.id, targetStore.store, targetStore.price);
      }
    });
  };

  const groupedByStore = items.reduce<Record<string, typeof items>>(
    (acc, item) => {
      if (!acc[item.store]) acc[item.store] = [];
      acc[item.store].push(item);
      return acc;
    },
    {}
  );

  const storeEntries = Object.entries(groupedByStore);

  const productComparison = useMemo(() => {
    return uniqueProducts.map(({ product, quantity, currentStore, currentPrice }) => {
      const bestPrice = Math.min(...product.stores.map((s) => s.price));
      return {
        product,
        quantity,
        currentStore,
        currentPrice,
        bestPrice,
        currentIsOptimal: currentPrice === bestPrice,
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

  // Calculate max possible price (worst stores)
  const worstTotal = uniqueProducts.reduce((sum, { product, quantity }) => {
    const worst = Math.max(...product.stores.map((s) => s.price));
    return sum + worst * quantity;
  }, 0);
  const totalSaved = worstTotal - totalPrice;

  return (
    <div className="min-h-screen bg-background pb-44 sm:pb-8">
      <Header />

      <main className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Продолжить покупки
        </Link>

        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                Корзина
              </h1>
              {items.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"} · {storeEntries.length} {storeEntries.length === 1 ? "магазин" : "магазина"}
                </p>
              )}
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded-lg hover:bg-destructive/5"
            >
              Очистить
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-secondary/80 flex items-center justify-center">
              <img src={mascot} alt="Корзина пуста" className="w-16 h-16 object-contain opacity-60" />
            </div>
            <h2 className="text-base font-semibold text-foreground mb-1">Корзина пуста</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Добавьте товары и мы найдём лучшие цены в разных магазинах
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary rounded-xl px-6 py-3 hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          <div className="space-y-4">

            {/* Savings highlight banner */}
            {totalSaved > 0 && (
              <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      Вы экономите {totalSaved.toLocaleString()} ₸
                    </p>
                    <p className="text-xs text-muted-foreground">
                      по сравнению с максимальными ценами
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Smart strategy selector */}
            <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
              <button
                onClick={() => setExpandedComparison(!expandedComparison)}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-foreground block leading-tight">Стратегия покупки</span>
                    <span className="text-[11px] text-muted-foreground">
                      {strategy === "optimal" ? "Оптимальный микс" : `Всё в ${strategy}`}
                    </span>
                  </div>
                  {totalSavingsIfOptimal > 0 && strategy !== "optimal" && (
                    <span className="savings-badge text-[10px] ml-1">
                      можно −{totalSavingsIfOptimal.toLocaleString()} ₸
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
                  {/* Strategy options */}
                  <div className="p-3 space-y-1.5">
                    <StrategyOption
                      label="Оптимальный микс"
                      description="Лучшая цена за каждый товар"
                      total={optimalTotal}
                      isActive={strategy === "optimal"}
                      isBest
                      onClick={() => applyStrategy("optimal")}
                      icon={<Zap className="w-3.5 h-3.5 text-primary" />}
                    />

                    {availableStores.map((storeName) => {
                      const hasAll = storeHasAll(storeName);
                      const storeTotal = hasAll ? calcTotal(storeName) : null;

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
                          icon={<StoreLogo store={storeName} size="sm" />}
                        />
                      );
                    })}
                  </div>

                  {/* Per-product comparison */}
                  <div className="border-t border-border">
                    <div className="px-4 py-2.5 flex items-center gap-2">
                      <Package className="w-3 h-3 text-muted-foreground" />
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Сравнение цен
                      </p>
                    </div>
                    <div className="divide-y divide-border">
                      {productComparison.map(({ product, quantity, stores }) => (
                        <div key={product.id} className="px-4 py-3">
                          <div className="flex items-start gap-3 mb-2.5">
                            <div className="w-10 h-10 rounded-xl bg-secondary/60 shrink-0 overflow-hidden">
                              <img src={product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-foreground line-clamp-1 font-medium leading-snug">{product.name}</p>
                              <p className="text-[11px] text-muted-foreground">{product.weight} × {quantity}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pl-[3.25rem]">
                            {stores.map((s) => (
                              <button
                                key={s.store}
                                onClick={() => {
                                  switchStore(product.id, s.store, s.price);
                                  setStrategy("optimal");
                                }}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] transition-all duration-150 ${
                                  s.isCurrent
                                    ? "bg-primary text-primary-foreground font-medium shadow-sm ring-1 ring-primary/30"
                                    : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
                                }`}
                              >
                                <StoreLogo store={s.store} size="sm" />
                                <span className={s.isBest && !s.isCurrent ? "font-semibold text-foreground" : ""}>
                                  {s.price} ₸
                                </span>
                                {s.isBest && !s.isCurrent && (
                                  <span className="best-price-label">мин</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart items grouped by store */}
            {storeEntries.map(([store, storeItems]) => {
              const storeTotal = storeItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

              return (
                <div key={store} className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
                  {/* Store header */}
                  <div className="px-4 py-3 bg-secondary/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <StoreLogo store={store} size="md" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{store}</span>
                        <span className="text-[11px] text-muted-foreground ml-2">
                          {storeItems.length} {storeItems.length === 1 ? "товар" : "товаров"}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {storeTotal.toLocaleString()} ₸
                    </span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-border">
                    {storeItems.map((item) => (
                      <div key={`${item.product.id}-${item.store}`} className="px-4 py-3.5">
                        <div className="flex items-start gap-3">
                          <Link to={`/product/${item.product.id}`} className="shrink-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-secondary/50 overflow-hidden ring-1 ring-border/50">
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                          </Link>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                to={`/product/${item.product.id}`}
                                className="text-[13px] sm:text-sm text-foreground line-clamp-2 hover:text-primary transition-colors leading-snug font-medium"
                              >
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.product.id, item.store)}
                                className="text-muted-foreground/50 hover:text-destructive transition-colors shrink-0 p-1.5 -mr-1.5 -mt-0.5 rounded-lg hover:bg-destructive/5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{item.product.weight}</p>

                            {/* Price + quantity row */}
                            <div className="flex items-center justify-between mt-2.5">
                              <div className="flex items-center h-8 rounded-xl bg-secondary/80 overflow-hidden ring-1 ring-border/50">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.store, item.quantity - 1)}
                                  className="h-full w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-xs font-bold text-foreground tabular-nums">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.store, item.quantity + 1)}
                                  className="h-full w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="text-sm font-bold text-foreground tabular-nums">
                                  {(item.price * item.quantity).toLocaleString()} ₸
                                </span>
                                {item.quantity > 1 && (
                                  <p className="text-[10px] text-muted-foreground">{item.price.toLocaleString()} ₸/шт</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Desktop total summary */}
            <div className="hidden sm:block rounded-2xl border border-border p-5 bg-card shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Итого</p>
                  <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
                    {totalPrice.toLocaleString()} ₸
                  </p>
                  {totalSaved > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Выгода: <span className="font-semibold" style={{ color: "hsl(var(--savings-bg))" }}>{totalSaved.toLocaleString()} ₸</span>
                    </p>
                  )}
                </div>
                {totalSavingsIfOptimal > 0 && strategy !== "optimal" && (
                  <button
                    onClick={() => applyStrategy("optimal")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      background: "hsl(var(--savings-bg) / 0.1)",
                      color: "hsl(var(--savings-bg))",
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    Сэкономить {totalSavingsIfOptimal.toLocaleString()} ₸
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile sticky bottom bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50">
          <div className="bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3 shadow-[0_-4px_20px_hsl(var(--foreground)/0.08)]">
            {totalSavingsIfOptimal > 0 && strategy !== "optimal" && (
              <button
                onClick={() => applyStrategy("optimal")}
                className="w-full mb-2 text-[12px] text-center py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5"
                style={{
                  background: "hsl(var(--savings-bg) / 0.1)",
                  color: "hsl(var(--savings-bg))",
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Оптимальный микс: −{totalSavingsIfOptimal.toLocaleString()} ₸
              </button>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"}
                </p>
                <p className="text-lg font-bold tracking-tight text-foreground tabular-nums">
                  {totalPrice.toLocaleString()} ₸
                </p>
              </div>
              {totalSaved > 0 && (
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">Выгода</p>
                  <p className="text-sm font-bold" style={{ color: "hsl(var(--savings-bg))" }}>
                    −{totalSaved.toLocaleString()} ₸
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StrategyOption = ({
  label, description, total, isActive, isBest, disabled, onClick, icon,
}: {
  label: string; description: string; total: number | null; isActive: boolean;
  isBest: boolean; disabled?: boolean; onClick: () => void; icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-150 text-left ${
      disabled ? "opacity-35 cursor-not-allowed"
        : isActive ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30"
        : "bg-secondary/50 hover:bg-secondary text-foreground"
    }`}
  >
    <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-lg bg-background/20">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-semibold leading-tight">{label}</p>
      <p className={`text-[11px] mt-0.5 ${isActive ? "opacity-70" : "text-muted-foreground"}`}>{description}</p>
    </div>
    <div className="shrink-0 text-right">
      {total !== null ? (
        <>
          <p className="text-sm font-bold tabular-nums">{total.toLocaleString()} ₸</p>
          {isBest && !isActive && (
            <p className="text-[10px] font-semibold" style={{ color: "hsl(var(--savings-bg))" }}>лучшая цена</p>
          )}
        </>
      ) : (
        <p className="text-[11px] text-muted-foreground">—</p>
      )}
    </div>
    {isActive && <Check className="w-4 h-4 shrink-0" />}
  </button>
);

export default CartPage;
