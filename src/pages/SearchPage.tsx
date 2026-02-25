import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories, storeNames } from "@/data/mockProducts";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedStore, setSelectedStore] = useState("Все");
  const [sortBy, setSortBy] = useState<"price" | "discount">("discount");

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    if (query) {
      const q = query.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedCategory !== "Все") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    if (selectedStore !== "Все") {
      products = products.filter((p) =>
        p.stores.some((s) => s.store === selectedStore)
      );
    }

    if (sortBy === "price") {
      products = [...products].sort(
        (a, b) =>
          Math.min(...a.stores.map((s) => s.price)) -
          Math.min(...b.stores.map((s) => s.price))
      );
    } else {
      products = [...products].sort(
        (a, b) => b.discountPercent - a.discountPercent
      );
    }

    return products;
  }, [query, selectedCategory, selectedStore, sortBy]);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {query ? `Результаты: «${query}»` : "Каталог"}
          </h1>
          <span className="text-xs text-muted-foreground">
            {filteredProducts.length} товаров
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {/* Categories - horizontal scroll on mobile */}
          <div className="w-full overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:w-auto sm:overflow-visible">
            <div className="flex gap-1 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
            </div>
          </div>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "price" | "discount")}
            className="text-xs bg-secondary rounded-lg px-2.5 py-1 text-muted-foreground focus:outline-none"
          >
            <option value="discount">По скидке</option>
            <option value="price">По цене</option>
          </select>

          {/* Store filter */}
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="text-xs bg-secondary rounded-lg px-2.5 py-1 text-muted-foreground focus:outline-none"
          >
            <option value="Все">Все магазины</option>
            {storeNames.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">Товары не найдены</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
