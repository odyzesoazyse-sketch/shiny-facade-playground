import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Share2, Tag, Globe } from "lucide-react";
import StoreLogo from "@/components/StoreLogo";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [historyPeriod, setHistoryPeriod] = useState<"7" | "30" | "90" | "180">("30");
  const product = allProducts.find((p) => p.id === id);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  if (!product) {
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

  const bestPrice = Math.min(...product.stores.map((s) => s.price));
  const worstPrice = Math.max(...product.stores.map((s) => s.oldPrice || s.price));

  const chartData = (product.priceHistory || []).map((point) => ({
    date: new Date(point.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
    ...point.prices,
  }));

  const handleShare = async () => {
    const url = window.location.href;
    const text = `${product.name} — от ${bestPrice} ₸ на minprice.kz`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Ссылка скопирована");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
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

        {/* Product header with inline store prices (single block, no duplication) */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="flex gap-3 p-3 sm:p-5">
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 shrink-0 rounded-xl bg-secondary/30 flex items-center justify-center">
              <div className="absolute top-1.5 left-1.5">
                <span className="discount-badge text-[10px]">-{product.discountPercent}%</span>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[70%] max-h-[70%] object-contain"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h1 className="text-base sm:text-xl font-semibold tracking-tight text-foreground leading-snug line-clamp-3 mb-1.5">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
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
                  {product.weight && <span>{product.weight}</span>}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-lg sm:text-xl font-bold text-foreground">{bestPrice} ₸</span>
                {worstPrice > bestPrice && (
                  <span className="price-old text-xs">{worstPrice} ₸</span>
                )}
                <span className="savings-badge text-[10px] ml-1">-{product.savingsAmount} ₸</span>
              </div>
            </div>
          </div>

          {/* Store prices — single list with all details */}
          <div className="border-t border-border px-3 sm:px-5 py-2.5 space-y-2">
            {product.stores.map((store) => {
              const isBest = store.price === bestPrice;
              return (
                <div key={store.store} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: store.color }}
                    />
                    <span className={`text-xs ${isBest ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                      {store.store}
                    </span>
                    {isBest && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-foreground font-medium">
                        мин
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {store.oldPrice && (
                      <span className="line-through text-[11px] text-muted-foreground/60">{store.oldPrice} ₸</span>
                    )}
                    <span className={`text-sm font-semibold ${isBest ? "text-foreground" : "text-muted-foreground"}`}>
                      {store.price} ₸
                    </span>
                    <button
                      onClick={() => addItem(product, store.store, store.price)}
                      className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="px-3 sm:px-5 pb-3 pt-1">
            <button
              onClick={() => {
                const best = product.stores.reduce((a, b) => (a.price < b.price ? a : b));
                addItem(product, best.store, best.price);
              }}
              className="w-full h-10 rounded-xl bg-foreground text-background font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              🛒 В корзину за {bestPrice} ₸
            </button>
          </div>
        </div>

        {/* Price History Chart */}
        {product.priceHistory && product.priceHistory.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 mb-4">
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

            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v} ₸`}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(0 0% 92%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value} ₸`]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  {product.stores.map((store) => (
                    <Line
                      key={store.store}
                      type="monotone"
                      dataKey={store.store}
                      stroke={store.color}
                      strokeWidth={2}
                      dot={{ r: 3, fill: store.color }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
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
