import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, Package } from "lucide-react";
import Header from "@/components/Header";
import { allProducts, categories, categoryDetails } from "@/data/mockProducts";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categoriesData = categories
    .filter((c) => c !== "Все")
    .map((cat) => ({
      name: cat,
      icon: categoryDetails[cat]?.icon || "📦",
      subcategories: categoryDetails[cat]?.subcategories || [],
      count: allProducts.filter((p) => p.category === cat).length,
    }));

  const totalCount = allProducts.length;

  const toggleExpand = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-16">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex items-baseline justify-between mb-4">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Каталог
          </h1>
          <span className="text-xs text-muted-foreground">{totalCount} товаров</span>
        </div>

        {/* All products link */}
        <button
          onClick={() => navigate("/search")}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors mb-3"
        >
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Все товары</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{totalCount}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>

        {/* Categories with subcategories */}
        <div className="space-y-1">
          {categoriesData.map((cat) => (
            <div key={cat.name} className="rounded-xl overflow-hidden">
              {/* Category row */}
              <div className="flex items-center">
                <button
                  onClick={() => toggleExpand(cat.name)}
                  className="flex-1 flex items-center gap-3 px-4 py-3.5 hover:bg-accent/50 transition-colors"
                >
                  <span className="text-xl leading-none">{cat.icon}</span>
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto mr-2">{cat.count}</span>
                  {cat.subcategories.length > 0 ? (
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        expandedCategory === cat.name ? "rotate-180" : ""
                      }`}
                    />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
                  className="px-3 py-3.5 text-xs text-primary font-medium hover:underline shrink-0"
                >
                  Все →
                </button>
              </div>

              {/* Subcategories */}
              {expandedCategory === cat.name && cat.subcategories.length > 0 && (
                <div className="pl-12 pr-4 pb-2 space-y-0.5">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() =>
                        navigate(`/search?category=${encodeURIComponent(cat.name)}&q=${encodeURIComponent(sub)}`)
                      }
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-colors"
                    >
                      <span>{sub}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
