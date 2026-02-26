import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronDown, ArrowLeft, Package, Search } from "lucide-react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories, categoryDetails } from "@/data/mockProducts";

/** Mobile/tablet: full category list */
const CatalogList = () => {
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
    <>
      <div className="flex items-baseline justify-between mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Каталог
        </h1>
        <span className="text-xs text-muted-foreground">{totalCount} товаров</span>
      </div>

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

      <div className="space-y-1">
        {categoriesData.map((cat) => (
          <div key={cat.name} className="rounded-xl overflow-hidden">
            <div className="flex items-center">
              <button
                onClick={() => toggleExpand(cat.name)}
                className="flex-1 flex items-center gap-3 px-4 py-3.5 hover:bg-accent/50 transition-colors"
              >
                <span className="text-xl leading-none">{cat.icon}</span>
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground ml-auto mr-2">
                  {cat.count > 0 ? cat.count : ""}
                </span>
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
                onClick={() => navigate(`/catalog/${encodeURIComponent(cat.name)}`)}
                className="px-3 py-3.5 text-xs text-primary font-medium hover:underline shrink-0"
              >
                Все →
              </button>
            </div>

            {expandedCategory === cat.name && cat.subcategories.length > 0 && (
              <div className="pl-12 pr-4 pb-2 space-y-0.5">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() =>
                      navigate(`/catalog/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(sub)}`)
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
    </>
  );
};

/** Category detail: subcategory chips + products */
const CategoryDetail = ({ category }: { category: string }) => {
  const decodedCategory = decodeURIComponent(category);
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const initialSub = params.get("sub") || null;

  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(initialSub);
  const [searchQuery, setSearchQuery] = useState("");

  const detail = categoryDetails[decodedCategory];
  const subcategories = detail?.subcategories || [];

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
    <>
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

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
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
    </>
  );
};

const CatalogPage = () => {
  const { category } = useParams<{ category?: string }>();

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-16">
      <Header />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex gap-6">
        {/* Desktop sidebar */}
        <CategorySidebar activeCategory={category ? decodeURIComponent(category) : undefined} />

        <main className="flex-1 min-w-0">
          {category ? <CategoryDetail category={category} /> : <CatalogList />}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
