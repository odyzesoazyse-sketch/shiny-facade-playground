import { Search, ShoppingCart, BarChart3, MapPin, Flame, Tag } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [city, setCity] = useState("Алматы");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top row */}
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-extrabold text-foreground tracking-tight">
              MinPrice
            </span>
          </a>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Найти товары..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 h-10 rounded-xl border border-input bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Найти
              </button>
            </div>
          </div>

          {/* City */}
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{city}</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 -mb-px pb-0">
          <NavItem icon={<Flame className="w-4 h-4" />} label="Главная" active />
          <NavItem icon={<Search className="w-4 h-4" />} label="Поиск" />
          <NavItem icon={<Tag className="w-4 h-4" />} label="Скидки" />
          <NavItem icon={<ShoppingCart className="w-4 h-4" />} label="Корзина" badge={3} />
        </nav>
      </div>
    </header>
  );
};

const NavItem = ({
  icon,
  label,
  active,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}) => (
  <button
    className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative ${
      active
        ? "text-primary border-b-2 border-primary bg-accent"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`}
  >
    {icon}
    {label}
    {badge && (
      <span className="ml-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

export default Header;
