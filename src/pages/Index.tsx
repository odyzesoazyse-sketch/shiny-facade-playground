import { useState, useRef, useMemo } from "react";
import { TrendingDown, TrendingUp, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/mockProducts";
import StoreLogo from "@/components/StoreLogo";
import { useBestDeals, usePriceDrops, usePriceIncreases, useChains } from "@/hooks/useApi";
import { transformProducts } from "@/lib/transformers";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "drops">("deals");
  const [activeCategory, setActiveCategory] = useState("Все");
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch data from API
  const { data: bestDealsData, isLoading: isLoadingDeals } = useBestDeals();
  const { data: priceDropsData, isLoading: isLoadingDrops } = usePriceDrops();
  const { data: priceUpsData, isLoading: isLoadingUps } = usePriceIncreases();
  const { data: chainsData } = useChains();

  // Transform API data to component format
  const topDeals = useMemo(() => {
    if (!bestDealsData?.deals) return [];
    return transformProducts(bestDealsData.deals).slice(0, 10);
  }, [bestDealsData]);

  const priceDrops = useMemo(() => {
    if (!priceDropsData?.price_drops) return [];
    return transformProducts(priceDropsData.price_drops);
  }, [priceDropsData]);

  const priceUps = useMemo(() => {
    if (!priceUpsData?.price_increases) return [];
    return transformProducts(priceUpsData.price_increases);
  }, [priceUpsData]);

  // Combine all products for catalog
  const allProducts = useMemo(() => {
    return [...topDeals, ...priceDrops, ...priceUps];
  }, [topDeals, priceDrops, priceUps]);

  const catalogProducts = activeCategory === "Все"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      const amount = sliderRef.current.clientWidth * 0.7;
      sliderRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  const isLoading = isLoadingDeals || isLoadingDrops || isLoadingUps;

  return (
    <div className="min-h-screen bg-background pb-40 sm:pb-24">
      <Header />

      {/* 🔥 Top deals slider — full width, above sidebar layout */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 mb-5">
        {/* Compact hero */}
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-secondary/50 border border-border px-4 py-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-foreground">
              Сравнение цен на продукты
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Находим минимальную цену в {chainsData?.chains.length || 5} магазинах
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {chainsData?.chains.slice(0, 4).map((chain) => (
              <span key={chain.id} className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center">
                <StoreLogo store={chain.name} size="sm" />
              </span>
            ))}
            {(chainsData?.chains.length || 0) > 4 && (
              <span className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                +{(chainsData?.chains.length || 0) - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Flame className="w-5 h-5 text-destructive" />
            Лучшие скидки
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
          {isLoadingDeals ? (
            <div className="flex gap-2 sm:gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[160px] sm:w-[200px] h-[400px] rounded-xl bg-secondary/50 animate-pulse" />
              ))}
            </div>
          ) : topDeals.length === 0 ? (
            <div className="w-full py-8 text-center text-sm text-muted-foreground">
              Нет доступных скидок
            </div>
          ) : (
            topDeals.map((product) => (
              <div key={product.id} className="shrink-0 w-[160px] sm:w-[200px]">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Main layout: sidebar + content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex gap-6 pb-6">
        <CategorySidebar activeCategory={activeCategory} onCategorySelect={setActiveCategory} />

        <main className="flex-1 min-w-0">
          {/* Mobile categories (hidden on lg) */}
          <section className="mb-5 -mx-3 px-3 overflow-x-auto scrollbar-hide lg:hidden">
            <div className="flex gap-1.5 w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {(activeTab === "deals" ? priceDrops : priceUps).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {activeTab === "deals" && priceDrops.length === 0 && (
                <p className="col-span-full text-sm text-muted-foreground py-8 text-center">
                  Все лучшие скидки показаны выше
                </p>
              )}
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
                {activeCategory === "Все" ? "Весь каталог" : activeCategory}
              </h2>
              <span className="text-xs text-muted-foreground">
                {catalogProducts.length} товаров
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {catalogProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-border mt-12 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
        © 2026 minprice.kz — Все цены актуальны на момент обновления
      </div>
    </div>
  </footer>
);

export default Index;
