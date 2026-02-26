import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories, storeNames } from "@/data/mockProducts";
import mascot from "@/assets/logo.png";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "Все";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedStore, setSelectedStore] = useState("Все");
  const [sortBy, setSortBy] = useState<"price" | "discount">(
    searchParams.get("sort") === "discount" ? "discount" : "discount"
  );

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
    <div className="min-h-screen bg-background pb-32 sm:pb-16">
      <Header />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex gap-6">
        {/* Desktop category sidebar */}
        <CategorySidebar activeCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

        <main className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-4">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {query ? `Результаты: «${query}»` : "Каталог"}
            </h1>
            <span className="text-xs text-muted-foreground">
              {filteredProducts.length} товаров
            </span>
          </div>

          {/* Mobile categories (hidden on lg) */}
          <div className="space-y-2 mb-4 sm:mb-6 lg:hidden">
            <div className="overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
              <div className="flex gap-1 sm:flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-foreground text-background font-medium"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort & Store */}
          <div className="flex gap-2 mb-4 sm:mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "price" | "discount")}
              className="flex-1 text-xs bg-secondary rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="discount">По скидке</option>
              <option value="price">По цене</option>
            </select>

            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="flex-1 text-xs bg-secondary rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="Все">Все магазины</option>
              {storeNames.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <img src={mascot} alt="Ничего не найдено" className="w-20 h-20 mx-auto mb-3 object-contain opacity-60" />
              <p className="text-muted-foreground text-sm">
                {query ? `По запросу «${query}» ничего не найдено` : "Товары не найдены"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Попробуйте изменить фильтры</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
