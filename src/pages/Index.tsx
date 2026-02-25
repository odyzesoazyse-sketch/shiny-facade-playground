import { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/mockProducts";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "drops">("deals");

  const hotDeals = allProducts.filter((p) => p.discountPercent >= 50);
  const priceDrops = allProducts.filter((p) => p.discountPercent >= 30 && p.discountPercent < 50);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hot Deals */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Выгодные предложения
            </h1>
            <span className="text-xs text-muted-foreground">
              {allProducts.length} товаров
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {hotDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Price changes */}
        <section>
          <div className="flex items-center gap-1 mb-4">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {(activeTab === "deals" ? priceDrops : allProducts.slice(0, 3)).map(
              (product) => (
                <ProductCard key={product.id} product={product} />
              )
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-muted-foreground">
          © 2025 MinPrice.kz — Сравнение цен на продукты
        </div>
      </footer>
    </div>
  );
};

export default Index;
