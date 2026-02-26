import { useState, useMemo } from "react";
import { TrendingDown, TrendingUp, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/mockProducts";
import mascot from "@/assets/logo.png";

const categoryEmojis: Record<string, string> = {
  "Сладости": "🍫",
  "Снеки": "🥨",
  "Морепродукты": "🦀",
  "Консервы": "🥫",
  "Молочные": "🥛",
  "Напитки": "☕",
  "Бакалея": "🛒",
  "Гигиена": "🧴",
  "Полуфабрикаты": "🍜",
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "drops">("deals");

  const hotDeals = allProducts.filter((p) => p.discountPercent >= 50);

  const priceUps = allProducts.filter((p) =>
    p.priceHistory &&
    p.priceHistory.length >= 2 &&
    (() => {
      const first = p.priceHistory[0].prices;
      const last = p.priceHistory[p.priceHistory.length - 1].prices;
      return Object.keys(last).some((store) => first[store] && last[store] > first[store]);
    })()
  );

  const totalSavings = useMemo(() => {
    return allProducts.reduce((sum, p) => sum + p.savingsAmount, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Savings banner */}
        <section className="mb-4 sm:mb-5 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Экономия до {totalSavings.toLocaleString("ru-RU")} ₸
            </p>
            <p className="text-xs text-muted-foreground">
              на {allProducts.length} товарах среди 5 магазинов
            </p>
          </div>
        </section>

        {/* Category chips with emojis */}
        <section className="mb-5 sm:mb-6 -mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 sm:flex-wrap">
            {categories.filter((c) => c !== "Все").map((cat) => (
              <Link
                key={cat}
                to={`/search?cat=${encodeURIComponent(cat)}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <span>{categoryEmojis[cat] || "📦"}</span>
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Price changes tabs — improved contrast */}
        <section className="mb-8">
          <div className="flex items-center gap-1 mb-3 p-0.5 bg-muted rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("deals")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === "deals"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              Упали в цене
            </button>
            <button
              onClick={() => setActiveTab("drops")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === "drops"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Выросли в цене
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {(activeTab === "deals" ? hotDeals : priceUps).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {activeTab === "drops" && priceUps.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground py-8 text-center">
                Нет товаров с повышением цен
              </p>
            )}
          </div>
        </section>

        {/* Full catalog */}
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Весь каталог
            </h2>
            <span className="text-xs text-muted-foreground">
              {allProducts.length} товаров
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-border mt-12 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-foreground">minprice.kz</span>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Сравнение цен на продукты среди магазинов Казахстана
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <Link to="/search" className="hover:text-foreground transition-colors">Каталог</Link>
          <Link to="/search?sort=discount" className="hover:text-foreground transition-colors">Скидки</Link>
          <Link to="/cart" className="hover:text-foreground transition-colors">Корзина</Link>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border text-center text-[11px] text-muted-foreground">
        © 2025 minprice.kz — Все цены актуальны на момент обновления
      </div>
    </div>
  </footer>
);

export default Index;
