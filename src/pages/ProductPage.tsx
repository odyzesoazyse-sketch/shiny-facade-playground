import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Share2, Tag, Globe } from "lucide-react";
import StoreLogo from "@/components/StoreLogo";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const [historyPeriod, setHistoryPeriod] = useState<"7" | "30" | "90" | "180">("30");
  const product = allProducts.find((p) => p.id === id);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  const bestStore = product ? product.stores.reduce((a, b) => (a.price < b.price ? a : b)) : null;
  const bestPrice = bestStore?.price ?? 0;
  const worstPrice = product ? Math.max(...product.stores.map((s) => s.oldPrice || s.price)) : 0;

  const cartItem = items.find((i) => i.product.id === id);
  const quantity = cartItem?.quantity || 0;

  const chartData = useMemo(() => {
    if (!product?.priceHistory || product.priceHistory.length === 0) return [];
    const now = new Date();
    const daysBack = parseInt(historyPeriod);
    const cutoff = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    return product.priceHistory
      .filter((point) => new Date(point.date) >= cutoff)
      .map((point) => ({
        date: new Date(point.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
        ...point.prices,
      }));
  }, [product?.priceHistory, historyPeriod]);

  if (!product || !bestStore) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-muted-foreground">Товар не найден</p>
          <Link to="/" className="text-sm text-foreground underline mt-4 inline-block">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, bestStore.store, bestStore.price);
  };

  const handleIncrement = () => {
    if (cartItem) updateQuantity(cartItem.product.id, cartItem.store, cartItem.quantity + 1);
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity <= 1) removeItem(cartItem.product.id, cartItem.store);
      else updateQuantity(cartItem.product.id, cartItem.store, cartItem.quantity - 1);
    }
  };
  const handleShare = async () => {
    const url = window.location.href;
    const text = `${product.name} — от ${bestPrice} ₸ на minprice.kz`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-40 sm:pb-16">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb + Share */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Назад
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Поделиться
          </button>
        </div>

        {/* Product header */}
        <div className="rounded-2xl overflow-hidden mb-4">
          <div className="flex gap-3 p-3">
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 shrink-0 rounded-xl overflow-hidden bg-secondary/30">
              <div className="absolute top-1.5 left-1.5 z-10 flex gap-1">
                <span className="discount-badge text-[10px]">-{product.discountPercent}%</span>
                <span className="savings-badge text-[10px]">-{product.savingsAmount} ₸</span>
              </div>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="price-new">{bestPrice} ₸</span>
                  {worstPrice > bestPrice && <span className="price-old">{worstPrice} ₸</span>}
                </div>
                <h1 className="text-[13px] text-foreground leading-snug mb-1">{product.name}</h1>
                <p className="text-[11px] text-muted-foreground">{product.weight}</p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground mt-1">
                  {product.brand && (
                    <span className="inline-flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span className="font-medium text-foreground">{product.brand}</span>
                    </span>
                  )}
                  {product.country && (
                    <span className="inline-flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      {product.country}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {product.description && (
            <p className="text-xs text-muted-foreground leading-relaxed px-3 pb-2">{product.description}</p>
          )}

          {/* Store prices */}
          <div className="px-3 py-1.5 space-y-1 border-t border-border">
            {product.stores.map((store) => {
              const isBest = store.price === bestPrice;
              return (
                <div key={store.store} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <StoreLogo store={store.store} size="sm" />
                    <span className="text-muted-foreground truncate">{store.store}</span>
                    {isBest && product.stores.length > 1 && <span className="best-price-label">min</span>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {store.oldPrice && <span className="line-through text-muted-foreground/60">{store.oldPrice}</span>}
                    <span className={`font-medium ${isBest ? "text-foreground" : "text-muted-foreground"}`}>
                      {store.price} ₸
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add button with quantity counter */}
          <div className="px-3 pb-3 pt-1.5">
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="w-full h-10 rounded-xl border border-primary text-primary text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-primary/5 active:scale-[0.98] transition-all"
              >
                <Plus className="w-4 h-4" />
                В корзину за {bestPrice} ₸
              </button>
            ) : (
              <div className="flex items-center h-10 rounded-xl bg-primary overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="h-full px-4 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 active:scale-90 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-sm font-semibold text-primary-foreground">
                  {quantity} в корзине
                </span>
                <button
                  onClick={handleIncrement}
                  className="h-full px-4 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 active:scale-90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Price History Chart */}
        {product.priceHistory && product.priceHistory.length > 0 && (
          <div className="bg-card rounded-2xl p-4 sm:p-6 mb-4">
            <h2 className="text-base font-semibold text-foreground mb-4">История цен</h2>

            <div className="flex items-center gap-1 mb-5">
              {(["7", "30", "90", "180"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setHistoryPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    historyPeriod === period
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period}д
                </button>
              ))}
            </div>

            {chartData.length > 0 ? (
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} ₸`} width={60} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                      formatter={(value: number) => [`${value} ₸`]}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    {product.stores.map((store) => (
                      <Line key={store.store} type="monotone" dataKey={store.store} stroke={store.color} strokeWidth={2} dot={{ r: 3, fill: store.color }} activeDot={{ r: 5 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-8">Нет данных за выбранный период</p>
            )}
          </div>
        )}

        {/* Similar products */}
        {similarProducts.length > 0 && (
          <section className="mt-6">
            <h2 className="text-base font-semibold text-foreground mb-3">Похожие товары</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
