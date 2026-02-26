import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/mockProducts";


export interface CartItem {
  product: Product;
  store: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, store: string, price: number) => void;
  removeItem: (productId: string, store: string) => void;
  updateQuantity: (productId: string, store: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CART_KEY = "minprice_cart";

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, store: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.store === store
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.store === store
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, store, price, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, store: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.store === store))
    );
    toast("Товар удалён из корзины");
  };

  const updateQuantity = (productId: string, store: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, store);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.store === store
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast("Корзина очищена");
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
