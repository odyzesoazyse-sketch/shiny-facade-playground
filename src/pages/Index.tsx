import { useState, useRef } from "react";
import { TrendingDown, TrendingUp, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts, storeNames } from "@/data/mockProducts";
import StoreLogo from "@/components/StoreLogo";


const Index = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "drops">("deals");
  const sliderRef = useRef<HTMLDivElement>(null);

  const hotDeals = allProducts.filter((p) => p.discountPercent >= 50);
  const topDeals = allProducts
    .slice()
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 10);

  const priceUps = allProducts.filter((p) =>
    p.priceHistory &&
    p.priceHistory.length >= 2 &&
    (() => {
      const first = p.priceHistory[0].prices;
      const last = p.priceHistory[p.priceHistory.length - 1].prices;
      return Object.keys(last).some((store) => first[store] && last[store] > first[store]);
    })()
  );


  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      const amount = sliderRef.current.clientWidth * 0.7;
      sliderRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Hero search + описание */}
        <section className="mb-6 rounded-xl bg-secondary/50 border border-border px-4 py-5 sm:px-6 sm:py-6">
          <h1 className="text-lg sm:text-xl font-bold text-foreground mb-1">
            minprice.kz — сравнение цен на продукты
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Находим самую низкую цену среди популярных магазинов Казахстана
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (heroSearch.trim()) navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
            }}
            className="flex gap-2 mb-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Найти товары среди 5 магазинов..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="w-full pl-10 pr-3 h-10 sm:h-11 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-10 sm:h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Найти
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            {storeNames.map((store) => (
              <span
                key={store}
                className="px-2.5 py-1 rounded-md bg-background border border-border text-xs font-medium text-foreground flex items-center gap-1.5"
              >
                <StoreLogo store={store} size="sm" />
                {store}
              </span>
            ))}
          </div>
        </section>

        {/* 🔥 Выгодные предложения — horizontal slider */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Flame className="w-5 h-5 text-destructive" />
              Выгодные предложения
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{topDeals.length} товаров</span>
              <div className="hidden sm:flex gap-1">
                <button onClick={() => scroll("left")} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => scroll("right")} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={sliderRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0"
          >
            {topDeals.map((product) => (
              <div key={product.id} className="shrink-0 w-[160px] sm:w-[200px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>




        {/* Price changes tabs */}
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
