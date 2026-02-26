export interface StorePrice {
  store: string;
  price: number;
  oldPrice?: number;
  color: string;
  storeName?: string; // store-specific product name
  storeImage?: string; // store-specific product image
  storeUrl?: string; // link to store page
}

export interface PriceHistoryPoint {
  date: string;
  prices: Record<string, number>; // store -> price
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
    description: "Хрустящие вафельные трубочки с нежной кремовой начинкой и карамелью. Идеальный перекус к чаю или кофе.",
    image: "https://s3-pic.e-magnum.kz/item/387466.jpg",
    weight: "22.5г",
    discountPercent: 71,
    savingsAmount: 196,
    category: "Сладости",
    brand: "TWIX",
    country: "Египет",
    breadcrumbs: ["Продукты", "Сладости", "Печенье и выпечка", "Вафли, пряники"],
    stores: [
      { store: "MGO", price: 79, color: "#22c55e", storeName: "Трубочки Twix Wafer Rolls вафельные 22,5 гр", storeUrl: "https://magnum.kz" },
      { store: "Airba Fresh", price: 275, color: "#3b82f6", storeName: "Трубочки Twix Crispy Rolls вафельные шоколадные с карамелью 22.5 г" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "MGO": 275, "Airba Fresh": 275 } },
      { date: "2025-02-01", prices: { "MGO": 275, "Airba Fresh": 275 } },
      { date: "2025-02-05", prices: { "MGO": 275, "Airba Fresh": 270 } },
      { date: "2025-02-10", prices: { "MGO": 260, "Airba Fresh": 275 } },
      { date: "2025-02-14", prices: { "MGO": 150, "Airba Fresh": 275 } },
      { date: "2025-02-18", prices: { "MGO": 85, "Airba Fresh": 275 } },
      { date: "2025-02-22", prices: { "MGO": 79, "Airba Fresh": 275 } },
      { date: "2025-02-25", prices: { "MGO": 79, "Airba Fresh": 275 } },
    ],
  },
  {
    id: "2",
    name: "Нори снеки Master Kan сушеные с солью 4г",
    description: "Лёгкие и хрустящие снеки из водорослей нори с морской солью. Полезный перекус с натуральным вкусом.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    weight: "4г",
    discountPercent: 70,
    savingsAmount: 855,
    category: "Снеки",
    brand: "Master Kan",
    country: "Китай",
    breadcrumbs: ["Продукты", "Снеки", "Чипсы и сухарики"],
    stores: [
      { store: "Airba Fresh", price: 360, oldPrice: 425, color: "#3b82f6" },
      { store: "A-Store ADK", price: 1215, oldPrice: 1370, color: "#f59e0b" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "Airba Fresh": 425, "A-Store ADK": 1370 } },
      { date: "2025-02-01", prices: { "Airba Fresh": 420, "A-Store ADK": 1370 } },
      { date: "2025-02-10", prices: { "Airba Fresh": 400, "A-Store ADK": 1300 } },
      { date: "2025-02-18", prices: { "Airba Fresh": 370, "A-Store ADK": 1250 } },
      { date: "2025-02-25", prices: { "Airba Fresh": 360, "A-Store ADK": 1215 } },
    ],
  },
  {
    id: "3",
    name: "Крабовые палочки Vici Снежный краб охлажденные 250г",
    description: "Охлаждённые крабовые палочки из сурими. Подходят для салатов, закусок и горячих блюд.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
    weight: "250г",
    discountPercent: 66,
    savingsAmount: 1937,
    category: "Морепродукты",
    brand: "Vici",
    country: "Литва",
    breadcrumbs: ["Продукты", "Рыба и морепродукты", "Крабовые палочки"],
    stores: [
      { store: "Airba Fresh", price: 998, oldPrice: 2690, color: "#3b82f6" },
      { store: "Arbuz", price: 1905, oldPrice: 2719, color: "#ef4444" },
      { store: "MGO", price: 2299, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "Airba Fresh": 2690, "Arbuz": 2719, "MGO": 2299 } },
      { date: "2025-02-01", prices: { "Airba Fresh": 2500, "Arbuz": 2600, "MGO": 2299 } },
      { date: "2025-02-10", prices: { "Airba Fresh": 1800, "Arbuz": 2100, "MGO": 2299 } },
      { date: "2025-02-18", prices: { "Airba Fresh": 1200, "Arbuz": 1950, "MGO": 2299 } },
      { date: "2025-02-25", prices: { "Airba Fresh": 998, "Arbuz": 1905, "MGO": 2299 } },
    ],
  },
  {
    id: "4",
    name: "Огурцы Globus Дунайский лес маринованные с ягодами можжевельника 500мл",
    description: "Маринованные огурцы с можжевеловыми ягодами — пикантный вкус для любых блюд и закусок.",
    image: "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=400&h=400&fit=crop",
    weight: "500мл",
    discountPercent: 62,
    savingsAmount: 865,
    category: "Консервы",
    brand: "Globus",
    country: "Россия",
    breadcrumbs: ["Продукты", "Консервы", "Овощная консервация", "Огурцы"],
    stores: [
      { store: "A-Store ADK", price: 540, oldPrice: 1355, color: "#f59e0b" },
      { store: "Airba Fresh", price: 1370, color: "#3b82f6" },
      { store: "MGO", price: 1385, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "A-Store ADK": 1355, "Airba Fresh": 1370, "MGO": 1385 } },
      { date: "2025-02-05", prices: { "A-Store ADK": 1200, "Airba Fresh": 1370, "MGO": 1385 } },
      { date: "2025-02-15", prices: { "A-Store ADK": 800, "Airba Fresh": 1370, "MGO": 1385 } },
      { date: "2025-02-25", prices: { "A-Store ADK": 540, "Airba Fresh": 1370, "MGO": 1385 } },
    ],
  },
  {
    id: "5",
    name: "Токпокки быстрого приготовления Hokang Wonderpokki Hot Spicy 120г",
    description: "Острые корейские рисовые палочки токпокки — быстрое приготовление за 5 минут. Насыщенный пряный вкус.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    weight: "120г",
    discountPercent: 70,
    savingsAmount: 941,
    category: "Полуфабрикаты",
    brand: "Hokang",
    country: "Южная Корея",
    breadcrumbs: ["Продукты", "Полуфабрикаты", "Лапша и токпокки"],
    stores: [
      { store: "Small", price: 409, oldPrice: 1555, color: "#a855f7" },
      { store: "Arbuz", price: 1350, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "Small": 1555, "Arbuz": 1350 } },
      { date: "2025-02-05", prices: { "Small": 1200, "Arbuz": 1350 } },
      { date: "2025-02-15", prices: { "Small": 700, "Arbuz": 1350 } },
      { date: "2025-02-25", prices: { "Small": 409, "Arbuz": 1350 } },
    ],
  },
  {
    id: "6",
    name: "Молоко Lactel ультрапастеризованное 3.2% 1л",
    description: "Французское ультрапастеризованное молоко жирностью 3.2%. Длительный срок хранения без консервантов.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    weight: "1л",
    discountPercent: 45,
    savingsAmount: 320,
    category: "Молочные",
    brand: "Lactel",
    country: "Франция",
    breadcrumbs: ["Продукты", "Молочные продукты", "Молоко"],
    stores: [
      { store: "Airba Fresh", price: 390, oldPrice: 710, color: "#3b82f6" },
      { store: "A-Store ADK", price: 550, color: "#f59e0b" },
      { store: "MGO", price: 610, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "Airba Fresh": 710, "A-Store ADK": 550, "MGO": 610 } },
      { date: "2025-02-10", prices: { "Airba Fresh": 550, "A-Store ADK": 550, "MGO": 610 } },
      { date: "2025-02-25", prices: { "Airba Fresh": 390, "A-Store ADK": 550, "MGO": 610 } },
    ],
  },
  {
    id: "7",
    name: "Чай Ahmad Tea Earl Grey чёрный 100 пакетиков",
    description: "Классический чёрный чай с бергамотом. 100 пакетиков — идеальный выбор для дома и офиса.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    weight: "200г",
    discountPercent: 38,
    savingsAmount: 580,
    category: "Напитки",
    brand: "Ahmad Tea",
    country: "Великобритания",
    breadcrumbs: ["Продукты", "Напитки", "Чай"],
    stores: [
      { store: "MGO", price: 950, oldPrice: 1530, color: "#22c55e" },
      { store: "Arbuz", price: 1200, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "MGO": 1530, "Arbuz": 1200 } },
      { date: "2025-02-10", prices: { "MGO": 1200, "Arbuz": 1200 } },
      { date: "2025-02-25", prices: { "MGO": 950, "Arbuz": 1200 } },
    ],
  },
  {
    id: "8",
    name: "Масло подсолнечное рафинированное Олейна 1л",
    description: "Рафинированное подсолнечное масло для жарки и заправки. Без запаха и осадка.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    weight: "1л",
    discountPercent: 25,
    savingsAmount: 200,
    category: "Бакалея",
    brand: "Олейна",
    country: "Казахстан",
    breadcrumbs: ["Продукты", "Бакалея", "Масло"],
    stores: [
      { store: "MGO", price: 590, oldPrice: 790, color: "#22c55e" },
      { store: "Airba Fresh", price: 650, color: "#3b82f6" },
      { store: "Arbuz", price: 720, color: "#ef4444" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "MGO": 790, "Airba Fresh": 650, "Arbuz": 720 } },
      { date: "2025-02-10", prices: { "MGO": 700, "Airba Fresh": 650, "Arbuz": 720 } },
      { date: "2025-02-25", prices: { "MGO": 590, "Airba Fresh": 650, "Arbuz": 720 } },
    ],
  },
  {
    id: "9",
    name: "Сахар белый рафинированный 1кг",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    weight: "1кг",
    discountPercent: 15,
    savingsAmount: 80,
    category: "Бакалея",
    brand: "Казахстан",
    country: "Казахстан",
    breadcrumbs: ["Продукты", "Бакалея", "Сахар"],
    stores: [
      { store: "A-Store ADK", price: 440, oldPrice: 520, color: "#f59e0b" },
      { store: "Arbuz", price: 480, color: "#ef4444" },
      { store: "MGO", price: 510, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "A-Store ADK": 520, "Arbuz": 480, "MGO": 510 } },
      { date: "2025-02-10", prices: { "A-Store ADK": 480, "Arbuz": 480, "MGO": 510 } },
      { date: "2025-02-25", prices: { "A-Store ADK": 440, "Arbuz": 480, "MGO": 510 } },
    ],
  },
  {
    id: "10",
    name: "Ополаскиватель Lacalut Sensitive для полости рта с мицеллярной водой 500мл",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    weight: "500мл",
    discountPercent: 82,
    savingsAmount: 3050,
    category: "Гигиена",
    brand: "Lacalut",
    country: "Германия",
    breadcrumbs: ["Товары для дома", "Гигиена", "Уход за полостью рта"],
    stores: [
      { store: "Arbuz", price: 685, oldPrice: 3735, color: "#ef4444" },
      { store: "MGO", price: 1819, color: "#22c55e" },
    ],
    priceHistory: [
      { date: "2025-01-25", prices: { "Arbuz": 3735, "MGO": 1819 } },
      { date: "2025-02-05", prices: { "Arbuz": 3000, "MGO": 1819 } },
      { date: "2025-02-15", prices: { "Arbuz": 1500, "MGO": 1819 } },
      { date: "2025-02-25", prices: { "Arbuz": 685, "MGO": 1819 } },
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

export const storeNames = ["MGO", "Airba Fresh", "A-Store ADK", "Arbuz", "Small"];
