import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ArrowLeft, Package, Search } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories, categoryDetails } from "@/data/mockProducts";

/** Grid of all categories */
const CatalogGrid = () => {
  const navigate = useNavigate();

  const cats = categories
    .filter((c) => c !== "Все")
    .map((cat) => ({
      name: cat,
      icon: categoryDetails[cat]?.icon || "📦",
      count: allProducts.filter((p) => p.category === cat).length,
    }));

  const total = allProducts.length;

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <h1 className="text-xl font-semibold tracking-tight text-foreground mb-4">
        Каталог
      </h1>

      {/* All products */}
      <button
        onClick={() => navigate("/search")}
        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors mb-4"
      >
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Все товары</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{total}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </button>

      {/* Category grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
        {cats.map((cat) => (
          <button
            key={cat.name}
            onClick={() => navigate(`/catalog/${encodeURIComponent(cat.name)}`)}
            className="flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors group"
          >
            <span className="text-2xl sm:text-3xl">{cat.icon}</span>
            <span className="text-[11px] sm:text-xs font-medium text-foreground text-center leading-tight line-clamp-2">
              {cat.name}
            </span>
            {cat.count > 0 && (
              <span className="text-[10px] text-muted-foreground">{cat.count}</span>
            )}
          </button>
        ))}
      </div>
    </main>
  );
};

/** Category detail: subcategory chips + products */
const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || "");
  const navigate = useNavigate();
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const detail = categoryDetails[decodedCategory];
  const subcategories = detail?.subcategories || [];

  // Filter products
  let products = allProducts.filter((p) => p.category === decodedCategory);

  if (activeSubcategory) {
    const q = activeSubcategory.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(q));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(q));
  }

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Back + title */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/catalog")}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl">{detail?.icon || "📦"}</span>
          <h1 className="text-lg font-semibold tracking-tight text-foreground truncate">
            {decodedCategory}
          </h1>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">{products.length} товаров</span>
      </div>

      {/* Search within category */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Искать в «${decodedCategory}»...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 h-10 bg-secondary rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Subcategory chips */}
      {subcategories.length > 0 && (
        <div className="overflow-x-auto scrollbar-hide -mx-3 px-3 mb-4">
          <div className="flex gap-1.5 w-max">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSubcategory === null
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Все
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(activeSubcategory === sub ? null : sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeSubcategory === sub
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-4xl mb-3 block">{detail?.icon || "📦"}</span>
          <p className="text-muted-foreground text-sm">
            {activeSubcategory
              ? `Нет товаров в подкатегории «${activeSubcategory}»`
              : `Пока нет товаров в категории «${decodedCategory}»`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Скоро появятся!</p>
        </div>
      )}
    </main>
  );
};

const CatalogPage = () => {
  const { category } = useParams<{ category?: string }>();

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-16">
      <Header />
      {category ? <CategoryDetail /> : <CatalogGrid />}
    </div>
  );
};

export default CatalogPage;
