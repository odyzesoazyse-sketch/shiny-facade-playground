import { Search, ShoppingCart, Home, Tag, ArrowUp, ScanBarcode, Moon, Sun, LayoutGrid } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CitySelector from "@/components/CitySelector";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", icon: Home, label: "Главная", matchExact: true },
  { to: "/catalog", icon: LayoutGrid, label: "Каталог" },
  { to: "/search?sort=discount", icon: Tag, label: "Скидки" },
  { to: "/cart", icon: ShoppingCart, label: "Корзина", hasBadge: true },
];

const Header = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const { totalItems } = useCart();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14">
            <Link to="/" className="shrink-0 flex items-center gap-1.5">
              <img src={logo} alt="minprice.kz" className="w-9 h-9 sm:w-11 sm:h-11 object-contain" />
              <span className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                minprice.kz
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <CitySelector />

              <button
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {/* scan barcode */}}
              >
                <ScanBarcode className="w-4.5 h-4.5" />
              </button>

              {/* Cart icon in header */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <BottomBar />
    </>
  );
};

const placeholders = [
  "Найти самые дешёвые товары...",
  "Сравнить цены на молоко, хлеб...",
  "Где дешевле купить продукты?",
];

const useScrollIdle = (idleMs = 400) => {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => {
      setVisible(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(true), idleMs);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timerRef.current);
    };
  }, [idleMs]);

  return visible;
};

const BottomBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchVisible = useScrollIdle(500);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Search bar */}
      <div className={`fixed bottom-[calc(env(safe-area-inset-bottom)+56px)] sm:bottom-6 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ${
        searchVisible || isFocused ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}>
        <div className="pointer-events-auto max-w-3xl mx-auto px-3 sm:px-4">
          <form onSubmit={handleSearch} className="py-2">
            <div
              className={`relative flex items-center gap-2 rounded-3xl bg-card/90 backdrop-blur-xl transition-all duration-200 ${
                isFocused
                  ? "border-2 border-primary shadow-[0_0_20px_4px_hsl(var(--primary)/0.25)] scale-[1.02]"
                  : "border-2 border-primary/30 shadow-[0_4px_24px_0_hsl(var(--primary)/0.10)] hover:border-primary/50 hover:shadow-[0_4px_24px_0_hsl(var(--primary)/0.18)]"
              }`}
            >
              <Search className={`absolute left-4 w-5 h-5 transition-colors ${isFocused ? "text-primary" : "text-primary/60"}`} />
              <input
                type="text"
                placeholder={placeholders[0]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-12 pr-2 h-12 sm:h-14 bg-transparent text-foreground text-[15px] sm:text-base placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button
                type="submit"
                className={`shrink-0 mr-1.5 h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center transition-all ${
                  searchQuery.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-100"
                    : "bg-muted text-muted-foreground scale-95"
                }`}
              >
                <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const active = item.matchExact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to.split("?")[0]);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[11px] font-medium">{item.label}</span>
                {item.hasBadge && totalItems > 0 && (
                  <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
