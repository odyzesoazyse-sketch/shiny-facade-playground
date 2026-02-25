import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, ExternalLink, Tag, Globe, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Header from "@/components/Header";
import { allProducts } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [historyPeriod, setHistoryPeriod] = useState<"7" | "30" | "90" | "180">("30");
  const product = allProducts.find((p) => p.id === id);

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

  // Chart data
  const storeKeys = product.stores.map((s) => s.store);
  const chartData = (product.priceHistory || []).map((point) => ({
    date: new Date(point.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
    ...point.prices,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Назад к поиску
        </Link>

        {/* Main product section */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
          <div className="grid md:grid-cols-[1fr,1.4fr] gap-0">
            {/* Image */}
            <div className="relative flex items-center justify-center bg-secondary/30 p-10 aspect-square md:aspect-auto md:min-h-[400px]">
              {/* Savings badge */}
              <div className="absolute top-4 right-4">
                <div className="savings-badge text-sm px-3 py-1.5">
                  -{product.savingsAmount} ₸
                  <span className="block text-[10px] font-normal opacity-80">экономия</span>
                </div>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[60%] max-h-[60%] object-contain"
              />
            </div>

            {/* Details */}
            <div className="p-6 md:p-8">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-3">
                {product.name}
              </h1>

              {/* Brand & Country */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {product.brand && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" />
                    <span className="font-medium text-foreground">{product.brand}</span>
                  </span>
                )}
                {product.country && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    {product.country}
                  </span>
                )}
              </div>

              {/* Breadcrumbs */}
              {product.breadcrumbs && (
                <div className="flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground mb-5">
                  {product.breadcrumbs.map((crumb, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      {idx > 0 && <ChevronRight className="w-2.5 h-2.5" />}
                      <span className="hover:text-foreground cursor-pointer">{crumb}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Add to cart button */}
              <button
                onClick={() => addItem(product, product.stores[0].store, bestPrice)}
                className="w-full h-12 rounded-xl bg-foreground text-background font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-6"
              >
                🛒 Добавить в корзину
              </button>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        {product.priceHistory && product.priceHistory.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h2 className="text-base font-semibold text-foreground mb-4">История цен</h2>

            {/* Period tabs */}
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
                  {period} дней
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="h-64">
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
                    width={70}
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
                  <Legend
                    wrapperStyle={{ fontSize: "12px" }}
                  />
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

        {/* Store comparison */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">
              Цены в магазинах ({product.stores.length})
            </h2>
          </div>

          {product.stores.map((store, idx) => {
            const isBest = store.price === bestPrice;
            return (
              <div
                key={store.store}
                className={`flex items-start gap-4 px-6 py-4 ${
                  idx < product.stores.length - 1 ? "border-b border-border" : ""
                } ${isBest ? "bg-secondary/30" : ""}`}
              >
                {/* Store product image */}
                <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                  <img
                    src={store.storeImage || product.image}
                    alt=""
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>

                {/* Store info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: store.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{store.store}</span>
                    {isBest && <span className="savings-badge">Лучшая цена</span>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {store.storeName || product.name}
                  </p>
                  {store.storeUrl && (
                    <a
                      href={store.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground mt-1 transition-colors"
                    >
                      Перейти в магазин
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {/* Price + add */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    {store.oldPrice && (
                      <div className="text-xs line-through text-muted-foreground">
                        {store.oldPrice} ₸
                      </div>
                    )}
                    <div className={`text-base font-semibold ${isBest ? "text-foreground" : "text-muted-foreground"}`}>
                      {store.price} ₸
                    </div>
                  </div>
                  <button
                    onClick={() => addItem(product, store.store, store.price)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
