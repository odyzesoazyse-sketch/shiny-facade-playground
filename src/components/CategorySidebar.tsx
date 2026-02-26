import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { categories, categoryDetails, allProducts } from "@/data/mockProducts";

interface CategorySidebarProps {
  activeCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const CategorySidebar = ({ activeCategory, onCategorySelect }: CategorySidebarProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(activeCategory || null);
  const navigate = useNavigate();

  const categoriesData = categories
    .filter((c) => c !== "Все")
    .map((cat) => ({
      name: cat,
      icon: categoryDetails[cat]?.icon || "📦",
      subcategories: categoryDetails[cat]?.subcategories || [],
      count: allProducts.filter((p) => p.category === cat).length,
    }));

  const handleCategoryClick = (catName: string) => {
    if (onCategorySelect) {
      onCategorySelect(catName);
    } else {
      navigate(`/catalog/${encodeURIComponent(catName)}`);
    }
  };

  return (
    <aside className="hidden lg:block w-56 shrink-0 sticky top-16 self-start max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
      <h2 className="text-sm font-semibold text-foreground mb-2 px-2">Категории</h2>
      <nav className="space-y-0.5">
        {/* All */}
        <button
          onClick={() => onCategorySelect?.("Все")}
          className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors ${
            activeCategory === "Все"
              ? "bg-accent text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          }`}
        >
          <span className="text-sm">📦</span>
          <span>Все товары</span>
        </button>

        {categoriesData.map((cat) => {
          const isActive = activeCategory === cat.name;
          const isExpanded = expandedCategory === cat.name;

          return (
            <div key={cat.name}>
              <div className="flex items-center">
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`flex-1 flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors min-w-0 ${
                    isActive
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <span className="text-sm leading-none">{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                  {cat.count > 0 && (
                    <span className="ml-auto text-[10px] text-muted-foreground shrink-0">{cat.count}</span>
                  )}
                </button>
                {cat.subcategories.length > 0 && (
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.name)}
                    className="p-1 rounded hover:bg-accent/50 text-muted-foreground"
                  >
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {isExpanded && cat.subcategories.length > 0 && (
                <div className="ml-7 space-y-0.5 mt-0.5 mb-1">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      to={`/catalog/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(sub)}`}
                      className="block px-2 py-1.5 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-colors truncate"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
