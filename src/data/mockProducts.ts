export interface StorePrice {
  store: string;
  price: number;
  oldPrice?: number;
  color: string;
  storeName?: string;
  storeImage?: string;
  storeUrl?: string;
}

export interface PriceHistoryPoint {
  date: string;
  prices: Record<string, number>;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image: string;
  weight: string;
  discountPercent: number;
  savingsAmount: number;
  stores: StorePrice[];
  category?: string;
  brand?: string;
  country?: string;
  breadcrumbs?: string[];
  priceHistory?: PriceHistoryPoint[];
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Вафли Трубочки TWIX хрустящие с кремовой начинкой со вкусом карамели 22.5г",
    description: "Хрустящие вафельные трубочки с нежной кремовой начинкой и карамелью.",
    image: "https://s3-pic.e-magnum.kz/item/387466.jpg",
    weight: "22.5г",
    discountPercent: 71,
    savingsAmount: 196,
    category: "Сладости",
    brand: "TWIX",
    country: "Египет",
    stores: [
      { store: "MGO", price: 79, color: "#22c55e" },
      { store: "Airba Fresh", price: 275, color: "#3b82f6" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "MGO": 275, "Airba Fresh": 275 } },
      { date: "2025-12-15", prices: { "MGO": 200, "Airba Fresh": 275 } },
      { date: "2026-01-01", prices: { "MGO": 150, "Airba Fresh": 275 } },
      { date: "2026-01-15", prices: { "MGO": 120, "Airba Fresh": 270 } },
      { date: "2026-02-01", prices: { "MGO": 85, "Airba Fresh": 275 } },
      { date: "2026-02-15", prices: { "MGO": 79, "Airba Fresh": 275 } },
      { date: "2026-02-25", prices: { "MGO": 79, "Airba Fresh": 275 } },
    ],
  },
  {
    id: "2",
    name: "Нори снеки Master Kan сушеные с солью 4г",
    description: "Лёгкие и хрустящие снеки из водорослей нори с морской солью.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    weight: "4г",
    discountPercent: 70,
    savingsAmount: 855,
    category: "Снеки",
    brand: "Master Kan",
    country: "Китай",
    stores: [
      { store: "Airba Fresh", price: 360, oldPrice: 425, color: "#3b82f6" },
      { store: "A-Store ADK", price: 1215, oldPrice: 1370, color: "#f59e0b" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Airba Fresh": 425, "A-Store ADK": 1370 } },
      { date: "2026-01-01", prices: { "Airba Fresh": 400, "A-Store ADK": 1300 } },
      { date: "2026-02-01", prices: { "Airba Fresh": 370, "A-Store ADK": 1250 } },
      { date: "2026-02-25", prices: { "Airba Fresh": 360, "A-Store ADK": 1215 } },
    ],
  },
  {
    id: "3",
    name: "Крабовые палочки Vici Снежный краб охлажденные 250г",
    description: "Охлаждённые крабовые палочки из сурими.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
    weight: "250г",
    discountPercent: 66,
    savingsAmount: 1937,
    category: "Морепродукты",
    brand: "Vici",
    country: "Литва",
    stores: [
      { store: "Airba Fresh", price: 998, oldPrice: 2690, color: "#3b82f6" },
      { store: "Arbuz", price: 1905, oldPrice: 2719, color: "#ef4444" },
      { store: "MGO", price: 2299, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Airba Fresh": 2690, "Arbuz": 2719, "MGO": 2299 } },
      { date: "2026-01-01", prices: { "Airba Fresh": 1800, "Arbuz": 2100, "MGO": 2299 } },
      { date: "2026-02-01", prices: { "Airba Fresh": 1200, "Arbuz": 1950, "MGO": 2299 } },
      { date: "2026-02-25", prices: { "Airba Fresh": 998, "Arbuz": 1905, "MGO": 2299 } },
    ],
  },
  {
    id: "4",
    name: "Огурцы Globus Дунайский лес маринованные 500мл",
    description: "Маринованные огурцы с можжевеловыми ягодами.",
    image: "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=400&h=400&fit=crop",
    weight: "500мл",
    discountPercent: 62,
    savingsAmount: 865,
    category: "Консервы",
    brand: "Globus",
    country: "Россия",
    stores: [
      { store: "A-Store ADK", price: 540, oldPrice: 1355, color: "#f59e0b" },
      { store: "Airba Fresh", price: 1370, color: "#3b82f6" },
      { store: "MGO", price: 1385, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "A-Store ADK": 1355, "Airba Fresh": 1370, "MGO": 1385 } },
      { date: "2026-01-01", prices: { "A-Store ADK": 1000, "Airba Fresh": 1370, "MGO": 1385 } },
      { date: "2026-02-01", prices: { "A-Store ADK": 700, "Airba Fresh": 1370, "MGO": 1385 } },
      { date: "2026-02-25", prices: { "A-Store ADK": 540, "Airba Fresh": 1370, "MGO": 1385 } },
    ],
  },
  {
    id: "5",
    name: "Токпокки быстрого приготовления Hokang Hot Spicy 120г",
    description: "Острые корейские рисовые палочки токпокки.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    weight: "120г",
    discountPercent: 70,
    savingsAmount: 941,
    category: "Полуфабрикаты",
    brand: "Hokang",
    country: "Южная Корея",
    stores: [
      { store: "Small", price: 409, oldPrice: 1555, color: "#a855f7" },
      { store: "Arbuz", price: 1350, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Small": 1555, "Arbuz": 1350 } },
      { date: "2026-01-01", prices: { "Small": 1000, "Arbuz": 1350 } },
      { date: "2026-02-01", prices: { "Small": 600, "Arbuz": 1350 } },
      { date: "2026-02-25", prices: { "Small": 409, "Arbuz": 1350 } },
    ],
  },
  {
    id: "6",
    name: "Молоко Lactel ультрапастеризованное 3.2% 1л",
    description: "Французское ультрапастеризованное молоко жирностью 3.2%.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    weight: "1л",
    discountPercent: 45,
    savingsAmount: 320,
    category: "Молочные",
    brand: "Lactel",
    country: "Франция",
    stores: [
      { store: "Airba Fresh", price: 390, oldPrice: 710, color: "#3b82f6" },
      { store: "A-Store ADK", price: 550, color: "#f59e0b" },
      { store: "MGO", price: 610, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Airba Fresh": 710, "A-Store ADK": 550, "MGO": 610 } },
      { date: "2026-01-01", prices: { "Airba Fresh": 550, "A-Store ADK": 550, "MGO": 610 } },
      { date: "2026-02-01", prices: { "Airba Fresh": 420, "A-Store ADK": 550, "MGO": 610 } },
      { date: "2026-02-25", prices: { "Airba Fresh": 390, "A-Store ADK": 550, "MGO": 610 } },
    ],
  },
  {
    id: "7",
    name: "Чай Ahmad Tea Earl Grey чёрный 100 пакетиков",
    description: "Классический чёрный чай с бергамотом. 100 пакетиков.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    weight: "200г",
    discountPercent: 38,
    savingsAmount: 580,
    category: "Напитки",
    brand: "Ahmad Tea",
    country: "Великобритания",
    stores: [
      { store: "MGO", price: 950, oldPrice: 1530, color: "#22c55e" },
      { store: "Arbuz", price: 1200, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "MGO": 1530, "Arbuz": 1200 } },
      { date: "2026-01-01", prices: { "MGO": 1300, "Arbuz": 1200 } },
      { date: "2026-02-01", prices: { "MGO": 1050, "Arbuz": 1200 } },
      { date: "2026-02-25", prices: { "MGO": 950, "Arbuz": 1200 } },
    ],
  },
  {
    id: "8",
    name: "Масло подсолнечное рафинированное Олейна 1л",
    description: "Рафинированное подсолнечное масло для жарки и заправки.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    weight: "1л",
    discountPercent: 25,
    savingsAmount: 200,
    category: "Бакалея",
    brand: "Олейна",
    country: "Казахстан",
    stores: [
      { store: "MGO", price: 590, oldPrice: 790, color: "#22c55e" },
      { store: "Airba Fresh", price: 650, color: "#3b82f6" },
      { store: "Arbuz", price: 720, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "MGO": 790, "Airba Fresh": 650, "Arbuz": 720 } },
      { date: "2026-01-01", prices: { "MGO": 700, "Airba Fresh": 650, "Arbuz": 720 } },
      { date: "2026-02-25", prices: { "MGO": 590, "Airba Fresh": 650, "Arbuz": 720 } },
    ],
  },
  {
    id: "9",
    name: "Сахар белый рафинированный 1кг",
    description: "Белый рафинированный сахар высшей категории.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    weight: "1кг",
    discountPercent: 15,
    savingsAmount: 80,
    category: "Бакалея",
    brand: "Казахстан",
    country: "Казахстан",
    stores: [
      { store: "A-Store ADK", price: 440, oldPrice: 520, color: "#f59e0b" },
      { store: "Arbuz", price: 480, color: "#ef4444" },
      { store: "MGO", price: 510, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "A-Store ADK": 520, "Arbuz": 480, "MGO": 510 } },
      { date: "2026-02-25", prices: { "A-Store ADK": 440, "Arbuz": 480, "MGO": 510 } },
    ],
  },
  {
    id: "10",
    name: "Ополаскиватель Lacalut Sensitive 500мл",
    description: "Ополаскиватель с мицеллярной водой для чувствительных зубов.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    weight: "500мл",
    discountPercent: 82,
    savingsAmount: 3050,
    category: "Гигиена",
    brand: "Lacalut",
    country: "Германия",
    stores: [
      { store: "Arbuz", price: 685, oldPrice: 3735, color: "#ef4444" },
      { store: "MGO", price: 1819, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Arbuz": 3735, "MGO": 1819 } },
      { date: "2026-01-01", prices: { "Arbuz": 2500, "MGO": 1819 } },
      { date: "2026-02-01", prices: { "Arbuz": 1200, "MGO": 1819 } },
      { date: "2026-02-25", prices: { "Arbuz": 685, "MGO": 1819 } },
    ],
  },
  // ===== NEW PRODUCTS =====
  {
    id: "11",
    name: "Coca-Cola Original 1.5л",
    description: "Классическая газированная вода Coca-Cola.",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop",
    weight: "1.5л",
    discountPercent: 30,
    savingsAmount: 180,
    category: "Напитки",
    brand: "Coca-Cola",
    country: "Казахстан",
    stores: [
      { store: "MGO", price: 420, oldPrice: 600, color: "#22c55e" },
      { store: "Arbuz", price: 490, color: "#ef4444" },
      { store: "Airba Fresh", price: 530, color: "#3b82f6" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "MGO": 600, "Arbuz": 550, "Airba Fresh": 530 } },
      { date: "2026-01-15", prices: { "MGO": 500, "Arbuz": 510, "Airba Fresh": 530 } },
      { date: "2026-02-25", prices: { "MGO": 420, "Arbuz": 490, "Airba Fresh": 530 } },
    ],
  },
  {
    id: "12",
    name: "Шоколад Ritter Sport Альпийское молоко 100г",
    description: "Нежный молочный шоколад из альпийского молока.",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop",
    weight: "100г",
    discountPercent: 40,
    savingsAmount: 350,
    category: "Сладости",
    brand: "Ritter Sport",
    country: "Германия",
    stores: [
      { store: "A-Store ADK", price: 520, oldPrice: 870, color: "#f59e0b" },
      { store: "MGO", price: 680, color: "#22c55e" },
      { store: "Arbuz", price: 750, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "A-Store ADK": 870, "MGO": 750, "Arbuz": 750 } },
      { date: "2026-01-15", prices: { "A-Store ADK": 700, "MGO": 720, "Arbuz": 750 } },
      { date: "2026-02-25", prices: { "A-Store ADK": 520, "MGO": 680, "Arbuz": 750 } },
    ],
  },
  {
    id: "13",
    name: "Макароны Barilla Спагетти №5 500г",
    description: "Классические итальянские спагетти из твёрдых сортов пшеницы.",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=400&fit=crop",
    weight: "500г",
    discountPercent: 20,
    savingsAmount: 150,
    category: "Бакалея",
    brand: "Barilla",
    country: "Италия",
    stores: [
      { store: "Airba Fresh", price: 590, oldPrice: 740, color: "#3b82f6" },
      { store: "MGO", price: 650, color: "#22c55e" },
      { store: "A-Store ADK", price: 670, color: "#f59e0b" },
      { store: "Arbuz", price: 710, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Airba Fresh": 740, "MGO": 700, "A-Store ADK": 670, "Arbuz": 710 } },
      { date: "2026-01-15", prices: { "Airba Fresh": 660, "MGO": 670, "A-Store ADK": 670, "Arbuz": 710 } },
      { date: "2026-02-25", prices: { "Airba Fresh": 590, "MGO": 650, "A-Store ADK": 670, "Arbuz": 710 } },
    ],
  },
  {
    id: "14",
    name: "Кефир Простоквашино 1% 930мл",
    description: "Лёгкий кефир с натуральной закваской.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    weight: "930мл",
    discountPercent: 35,
    savingsAmount: 250,
    category: "Молочные",
    brand: "Простоквашино",
    country: "Казахстан",
    stores: [
      { store: "MGO", price: 460, oldPrice: 710, color: "#22c55e" },
      { store: "Airba Fresh", price: 520, color: "#3b82f6" },
      { store: "Arbuz", price: 580, color: "#ef4444" },
      { store: "Small", price: 550, color: "#a855f7" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "MGO": 710, "Airba Fresh": 600, "Arbuz": 580, "Small": 620 } },
      { date: "2026-01-15", prices: { "MGO": 580, "Airba Fresh": 560, "Arbuz": 580, "Small": 580 } },
      { date: "2026-02-25", prices: { "MGO": 460, "Airba Fresh": 520, "Arbuz": 580, "Small": 550 } },
    ],
  },
  {
    id: "15",
    name: "Чипсы Lay's Сметана и зелень 150г",
    description: "Хрустящие картофельные чипсы с насыщенным вкусом.",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
    weight: "150г",
    discountPercent: 28,
    savingsAmount: 170,
    category: "Снеки",
    brand: "Lay's",
    country: "Казахстан",
    stores: [
      { store: "Arbuz", price: 430, oldPrice: 600, color: "#ef4444" },
      { store: "MGO", price: 480, color: "#22c55e" },
      { store: "Small", price: 510, color: "#a855f7" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Arbuz": 600, "MGO": 550, "Small": 580 } },
      { date: "2026-01-15", prices: { "Arbuz": 500, "MGO": 510, "Small": 550 } },
      { date: "2026-02-25", prices: { "Arbuz": 430, "MGO": 480, "Small": 510 } },
    ],
  },
  {
    id: "16",
    name: "Сыр Hochland плавленый сливочный 200г",
    description: "Нежный плавленый сыр со сливочным вкусом.",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
    weight: "200г",
    discountPercent: 33,
    savingsAmount: 290,
    category: "Молочные",
    brand: "Hochland",
    country: "Россия",
    stores: [
      { store: "Airba Fresh", price: 590, oldPrice: 880, color: "#3b82f6" },
      { store: "A-Store ADK", price: 640, color: "#f59e0b" },
      { store: "MGO", price: 710, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Airba Fresh": 880, "A-Store ADK": 750, "MGO": 710 } },
      { date: "2026-01-15", prices: { "Airba Fresh": 700, "A-Store ADK": 680, "MGO": 710 } },
      { date: "2026-02-25", prices: { "Airba Fresh": 590, "A-Store ADK": 640, "MGO": 710 } },
    ],
  },
  {
    id: "17",
    name: "Вода Bon Aqua негазированная 1.5л",
    description: "Чистая питьевая вода без газа.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
    weight: "1.5л",
    discountPercent: 18,
    savingsAmount: 50,
    category: "Напитки",
    brand: "Bon Aqua",
    country: "Казахстан",
    stores: [
      { store: "Small", price: 230, oldPrice: 280, color: "#a855f7" },
      { store: "MGO", price: 250, color: "#22c55e" },
      { store: "Arbuz", price: 260, color: "#ef4444" },
      { store: "A-Store ADK", price: 270, color: "#f59e0b" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Small": 280, "MGO": 280, "Arbuz": 270, "A-Store ADK": 270 } },
      { date: "2026-02-25", prices: { "Small": 230, "MGO": 250, "Arbuz": 260, "A-Store ADK": 270 } },
    ],
  },
  {
    id: "18",
    name: "Стиральный порошок Persil Color 3кг",
    description: "Эффективный порошок для цветного белья.",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
    weight: "3кг",
    discountPercent: 42,
    savingsAmount: 2100,
    category: "Гигиена",
    brand: "Persil",
    country: "Германия",
    stores: [
      { store: "MGO", price: 2890, oldPrice: 4990, color: "#22c55e" },
      { store: "Arbuz", price: 3400, color: "#ef4444" },
      { store: "A-Store ADK", price: 3200, color: "#f59e0b" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "MGO": 4990, "Arbuz": 4200, "A-Store ADK": 4000 } },
      { date: "2026-01-15", prices: { "MGO": 3800, "Arbuz": 3800, "A-Store ADK": 3500 } },
      { date: "2026-02-25", prices: { "MGO": 2890, "Arbuz": 3400, "A-Store ADK": 3200 } },
    ],
  },
  {
    id: "19",
    name: "Рис Басмати Gold 900г",
    description: "Длиннозёрный рис басмати премиального качества.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    weight: "900г",
    discountPercent: 22,
    savingsAmount: 280,
    category: "Бакалея",
    brand: "Gold",
    country: "Индия",
    stores: [
      { store: "A-Store ADK", price: 990, oldPrice: 1270, color: "#f59e0b" },
      { store: "Airba Fresh", price: 1050, color: "#3b82f6" },
      { store: "Arbuz", price: 1150, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "A-Store ADK": 1270, "Airba Fresh": 1100, "Arbuz": 1150 } },
      { date: "2026-01-15", prices: { "A-Store ADK": 1100, "Airba Fresh": 1080, "Arbuz": 1150 } },
      { date: "2026-02-25", prices: { "A-Store ADK": 990, "Airba Fresh": 1050, "Arbuz": 1150 } },
    ],
  },
  {
    id: "20",
    name: "Яйца куриные С1 10 штук",
    description: "Свежие куриные яйца первой категории.",
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400&h=400&fit=crop",
    weight: "10шт",
    discountPercent: 19,
    savingsAmount: 120,
    category: "Молочные",
    brand: "Фермерские",
    country: "Казахстан",
    stores: [
      { store: "Airba Fresh", price: 510, oldPrice: 630, color: "#3b82f6" },
      { store: "Arbuz", price: 550, color: "#ef4444" },
      { store: "MGO", price: 570, color: "#22c55e" },
      { store: "Small", price: 530, color: "#a855f7" },
      { store: "A-Store ADK", price: 560, color: "#f59e0b" },
    ],
    priceHistory: [
      { date: "2025-12-01", prices: { "Airba Fresh": 630, "Arbuz": 600, "MGO": 600, "Small": 590, "A-Store ADK": 610 } },
      { date: "2026-01-15", prices: { "Airba Fresh": 570, "Arbuz": 570, "MGO": 580, "Small": 560, "A-Store ADK": 580 } },
      { date: "2026-02-25", prices: { "Airba Fresh": 510, "Arbuz": 550, "MGO": 570, "Small": 530, "A-Store ADK": 560 } },
    ],
  },
];

export const categories = [
  "Все",
  "Сладости",
  "Снеки",
  "Морепродукты",
  "Консервы",
  "Молочные",
  "Напитки",
  "Бакалея",
  "Гигиена",
  "Полуфабрикаты",
];

export interface SubCategory {
  name: string;
  parent: string;
}

export const categoryDetails: Record<string, { icon: string; subcategories: string[] }> = {
  "Сладости": { icon: "🍫", subcategories: ["Шоколад", "Конфеты", "Печенье", "Вафли", "Зефир и мармелад"] },
  "Снеки": { icon: "🍿", subcategories: ["Чипсы", "Сухарики", "Орехи", "Нори", "Попкорн"] },
  "Морепродукты": { icon: "🦐", subcategories: ["Крабовые палочки", "Рыба", "Креветки", "Консервы рыбные"] },
  "Консервы": { icon: "🥫", subcategories: ["Овощные", "Мясные", "Маринованные", "Соусы"] },
  "Молочные": { icon: "🥛", subcategories: ["Молоко", "Кефир", "Сыр", "Йогурт", "Сметана", "Масло"] },
  "Напитки": { icon: "🥤", subcategories: ["Вода", "Газированные", "Соки", "Чай", "Кофе"] },
  "Бакалея": { icon: "🌾", subcategories: ["Масло растительное", "Крупы", "Макароны", "Сахар", "Мука", "Специи"] },
  "Гигиена": { icon: "🧴", subcategories: ["Уход за полостью рта", "Шампуни", "Мыло", "Стиральные средства"] },
  "Полуфабрикаты": { icon: "🥟", subcategories: ["Пельмени", "Котлеты", "Лапша быстрого приготовления", "Токпокки"] },
};

export const storeNames = ["MGO", "Airba Fresh", "A-Store ADK", "Arbuz", "Small"];
