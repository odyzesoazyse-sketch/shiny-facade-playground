import { useState } from "react";
import { Flame, TrendingDown, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { hotDeals, priceDropProducts, priceUpProducts } from "@/data/mockProducts";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"drop" | "up">("drop");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hot Deals Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="flex items-center gap-2 text-2xl font-display font-extrabold text-foreground">
              <Flame className="w-6 h-6 text-destructive" />
              Выгодные предложения
            </h2>
            <span className="text-sm text-muted-foreground font-medium">
              60 товаров
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {hotDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Price Changes Section */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setActiveTab("drop")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === "drop"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Упали в цене
            </button>
            <button
              onClick={() => setActiveTab("up")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === "up"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Выросли в цене
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(activeTab === "drop" ? priceDropProducts : priceUpProducts).map(
              (product) => (
                <ProductCard key={product.id} product={product} />
              )
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 MinPrice.kz — Сравнение цен на продукты в Казахстане
        </div>
      </footer>
    </div>
  );
};

export default Index;
