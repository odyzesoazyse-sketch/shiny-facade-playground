import { Search, ShoppingCart, MapPin, Home, Tag, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

const cities = ["Алматы", "Астана", "Шымкент", "Караганда", "Актобе"];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Алматы");
  const [cityOpen, setCityOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-6 h-12 sm:h-14">
            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center gap-1.5">
              <img src={logo} alt="minprice.kz" className="w-9 h-9 sm:w-11 sm:h-11 object-contain" />
              <span className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                minprice.kz
              </span>
            </Link>

            {/* Search with button */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-1.5">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Найти товары..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-9 pr-3 h-8 sm:h-9 rounded-lg bg-secondary text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="hidden sm:flex h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium items-center hover:bg-primary/90 transition-colors"
              >
                Найти
              </button>
            </form>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* City dropdown */}
              <div className="relative hidden sm:block">
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

              <Link
                to="/cart"
                className="relative flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 -mb-px text-sm">
            <NavLink to="/" label="Главная" />
            <NavLink to="/search" label="Поиск" />
            <NavLink to="/search?sort=discount" label="Скидки" />
            <NavLink to="/cart" label="Корзина" />
          </nav>
        </div>
      </header>

      <MobileBottomNav />
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

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const tabs = [
    { to: "/", icon: Home, label: "Главная" },
    { to: "/search", icon: Search, label: "Поиск" },
    { to: "/search?sort=discount", icon: Tag, label: "Скидки" },
    { to: "/cart", icon: ShoppingCart, label: "Корзина", badge: totalItems },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]">
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
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px]">{tab.label}</span>
              {tab.badge != null && tab.badge > 0 && (
                <span className="absolute -top-0.5 right-0.5 w-4 h-4 rounded-full bg-foreground text-background text-[9px] font-semibold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
