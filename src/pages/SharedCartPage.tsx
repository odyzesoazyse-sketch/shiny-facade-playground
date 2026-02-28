import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import { useCart, CartItem } from "@/context/CartContext";
import mascot from "@/assets/logo.png";
import { API_ENDPOINTS, apiClient } from "@/lib/api";

const SharedCartPage = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [cartName, setCartName] = useState("");
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSharedCart = async () => {
            if (!uuid) return;
            setIsLoading(true);
            setError(null);
            try {
                // Fetch cart summary
                const data = await apiClient.get<any>(API_ENDPOINTS.cartSummary(uuid));
                setCartName(data.cart.name);
                setTotalPrice(data.cheapest_total_price || 0);
                if (data.cheapest_per_product) {
                    setItems(data.cheapest_per_product);
                }
            } catch (e: any) {
                console.error("Error fetching shared cart:", e);
                setError(e.message || "Не удалось загрузить корзину.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSharedCart();
    }, [uuid]);

    const groupedByStore = items.reduce<Record<string, CartItem[]>>(
        (acc, item) => {
            if (!acc[item.store_name]) acc[item.store_name] = [];
            acc[item.store_name].push(item);
            return acc;
        },
        {}
    );

    const storeEntries = Object.entries(groupedByStore);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="flex items-center justify-center h-[50vh]">
                    <Clock className="w-8 h-8 text-muted-foreground animate-spin" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="text-center py-16 text-muted-foreground">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-40 sm:pb-8">
            <Header />

            <main className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                <div className="mb-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        На главную
                    </Link>

                    <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                        {cartName}
                    </h1>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded mt-2 inline-block">Просмотр по ссылке</span>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-16">
                        <img src={mascot} alt="Корзина пуста" className="w-20 h-20 mx-auto mb-3 object-contain opacity-50" />
                        <p className="text-muted-foreground text-sm mb-1">Корзина пуста</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Cart Items grouped by store */}
                        {storeEntries.map(([store, storeItems]) => {
                            const storeTotal = storeItems.reduce((sum, i) => sum + i.item_total, 0);

                            return (
                                <div key={store} className="border border-border rounded-xl overflow-hidden">
                                    <div className="px-3 sm:px-4 py-2.5 bg-secondary/50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-foreground">{store}</span>
                                            <span className="text-[11px] text-muted-foreground">
                                                {storeItems.length} {storeItems.length === 1 ? "товар" : "товаров"}
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-foreground">
                                            {storeTotal.toLocaleString()} ₸
                                        </span>
                                    </div>

                                    {storeItems.map((item, idx) => (
                                        <div
                                            key={`${item.product.uuid}-${item.store_name}`}
                                            className={`px-3 sm:px-4 py-3 ${idx < storeItems.length - 1 ? "border-b border-border" : ""}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <Link to={`/product/${item.product.uuid}`} className="shrink-0">
                                                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg bg-secondary/50 overflow-hidden">
                                                        <img src={item.product.image_url || mascot} alt={item.product.title} className="w-full h-full object-cover" />
                                                    </div>
                                                </Link>

                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        to={`/product/${item.product.uuid}`}
                                                        className="text-[13px] sm:text-sm text-foreground line-clamp-2 hover:underline leading-snug"
                                                    >
                                                        {item.product.title}
                                                    </Link>
                                                    {item.product.measure_unit_qty && item.product.measure_unit_kind && (
                                                        <p className="text-[11px] text-muted-foreground mt-0.5">{item.product.measure_unit_qty} {item.product.measure_unit_kind}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2 pl-[3.5rem] sm:pl-[4.25rem]">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-muted-foreground">{item.quantity} шт.</span>
                                                    <span className="text-[11px] text-muted-foreground">{item.price.toLocaleString()} ₸ / шт</span>
                                                </div>

                                                <span className="text-sm font-semibold text-foreground">
                                                    {item.item_total.toLocaleString()} ₸
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}

                        {/* Total */}
                        <div className="border border-border rounded-xl px-3 sm:px-4 py-3 bg-card">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Итого {storeEntries.length} {storeEntries.length === 1 ? "магазин" : "магазина"}
                                </span>
                                <span className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                                    {totalPrice.toLocaleString()} ₸
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
};

export default SharedCartPage;
