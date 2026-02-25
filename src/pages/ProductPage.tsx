import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import Header from "@/components/Header";
import { allProducts } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-muted-foreground">Товар не найден</p>
          <Link to="/" className="text-sm text-foreground underline mt-4 inline-block">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const bestPrice = Math.min(...product.stores.map((s) => s.price));
  const worstPrice = Math.max(...product.stores.map((s) => s.oldPrice || s.price));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Назад
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="flex items-center justify-center bg-secondary/30 rounded-2xl p-10 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-[65%] max-h-[65%] object-contain"
            />
          </div>

          {/* Details */}
          <div className="py-2">
            <div className="mb-1">
              {product.category && (
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
              {product.name}
            </h1>

            <p className="text-sm text-muted-foreground mb-6">{product.weight}</p>

            {/* Price summary */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                от {bestPrice} ₸
              </span>
              {worstPrice > bestPrice && (
                <span className="text-lg line-through text-muted-foreground">
                  {worstPrice} ₸
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-8">
              <span className="discount-badge">-{product.discountPercent}%</span>
              <span className="text-xs text-muted-foreground">
                Экономия до {product.savingsAmount} ₸
              </span>
            </div>

            {/* Store prices */}
            <div className="space-y-0 border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-secondary/50 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Цены в магазинах
              </div>
              {product.stores.map((store, idx) => {
                const isBest = store.price === bestPrice;
                return (
                  <div
                    key={store.store}
                    className={`flex items-center justify-between px-4 py-3 ${
                      idx < product.stores.length - 1 ? "border-b border-border" : ""
                    } ${isBest ? "bg-secondary/30" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-foreground font-medium">
                        {store.store}
                      </span>
                      {isBest && (
                        <span className="savings-badge">Лучшая цена</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        {store.oldPrice && (
                          <span className="text-xs line-through text-muted-foreground mr-2">
                            {store.oldPrice} ₸
                          </span>
                        )}
                        <span className={`text-sm font-semibold ${isBest ? "text-foreground" : "text-muted-foreground"}`}>
                          {store.price} ₸
                        </span>
                      </div>
                      <button
                        onClick={() => addItem(product, store.store, store.price)}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
