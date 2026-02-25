import { useState } from "react";
import { TrendingDown, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/mockProducts";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "drops">("deals");

  const hotDeals = allProducts.filter((p) => p.discountPercent >= 50);
  const priceDrops = allProducts.filter((p) => p.discountPercent >= 30 && p.discountPercent < 50);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {/* Hero / описание */}
        <section className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1.5">
            Сравни цены — купи дешевле
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mb-4">
            Находим лучшие цены на продукты среди Arbuz, Kaspi, MGO и других магазинов Казахстана. Экономьте до 70% на каждой покупке.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-secondary text-muted-foreground text-sm hover:bg-secondary/80 transition-colors w-full sm:w-auto"
          >
            <Search className="w-4 h-4" />
            Найти товар...
          </Link>
        </section>

        {/* Скидки */}
        <section className="mb-8">
          <div className="flex items-center gap-1 mb-3">
            <button
              onClick={() => setActiveTab("deals")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "deals"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              Упали в цене
            </button>
            <button
              onClick={() => setActiveTab("drops")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "drops"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Выросли в цене
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {(activeTab === "deals" ? hotDeals : allProducts.slice(0, 4)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Весь каталог */}
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

      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-muted-foreground">
          © 2025 MinPrice.kz — Сравнение цен на продукты
        </div>
      </footer>
    </div>
  );
};

export default Index;
