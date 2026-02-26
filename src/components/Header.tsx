import { Search, ShoppingCart, MapPin, Home, Tag, ChevronDown, ArrowUp, ScanBarcode, Moon, Sun } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

const cities = ["Алматы", "Астана", "Шымкент", "Караганда", "Актобе"];

const Header = () => {
  const [selectedCity, setSelectedCity] = useState("Алматы");
  const [cityOpen, setCityOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

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

              <div className="relative">
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {cityOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCityOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[120px]">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors ${
                            city === selectedCity ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {/* scan barcode */}}
              >
                <ScanBarcode className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6 -mb-px text-sm">
            <NavLink to="/" label="Главная" />
            <NavLink to="/search?sort=discount" label="Скидки" />
          </nav>
        </div>
      </header>

      <BottomBar />
    </>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="py-2.5 text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground text-[13px]"
  >
    {label}
  </Link>
);

const placeholders = [
  "Найти самые дешёвые товары...",
  "Сравнить цены на молоко, хлеб...",
  "Где дешевле купить продукты?",
];

const MOBILE_NAV_HEIGHT = 56;

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

  const tabs = [
    { to: "/", icon: Home, label: "Главная" },
    { to: "/search?sort=discount", icon: Tag, label: "Скидки" },
    { to: "/cart", icon: ShoppingCart, label: "Корзина", badge: totalItems },
  ];

  return (
    <>
      {/* Search bar - always visible, positioned above mobile nav */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+56px)] sm:bottom-6 left-0 right-0 z-50 pointer-events-none">
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

      {/* Mobile nav - fixed to absolute bottom */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-14">
          {tabs.map((tab) => {
            const isActive =
              tab.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(tab.to.split("?")[0]);

            return (
              <Link
                key={tab.label}
                to={tab.to}
                className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[11px] font-medium">{tab.label}</span>
                {tab.badge != null && tab.badge > 0 && (
                  <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                    {tab.badge}
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
