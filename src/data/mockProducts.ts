export interface StorePrice {
  store: string;
  price: number;
  oldPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  weight: string;
  discountPercent: number;
  savingsAmount: number;
  stores: StorePrice[];
  category?: string;
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Вафли Трубочки TWIX хрустящие с кремовой начинкой 22.5г",
    image: "https://s3-pic.e-magnum.kz/item/387466.jpg",
    weight: "22.5г",
    discountPercent: 71,
    savingsAmount: 196,
    category: "Сладости",
    stores: [
      { store: "MGO", price: 79 },
      { store: "Airba Fresh", price: 275 },
    ],
  },
  {
    id: "2",
    name: "Нори снеки Master Kan сушеные с солью 4г",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    weight: "4г",
    discountPercent: 70,
    savingsAmount: 855,
    category: "Снеки",
    stores: [
      { store: "Airba Fresh", price: 360, oldPrice: 425 },
      { store: "A-Store ADK", price: 1215, oldPrice: 1370 },
    ],
  },
  {
    id: "3",
    name: "Крабовые палочки Vici Снежный краб охлажденные 250г",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
    weight: "250г",
    discountPercent: 66,
    savingsAmount: 1937,
    category: "Морепродукты",
    stores: [
      { store: "Airba Fresh", price: 998, oldPrice: 2000 },
      { store: "Arbuz", price: 1905, oldPrice: 2700 },
      { store: "MGO", price: 2299 },
    ],
  },
  {
    id: "4",
    name: "Огурцы Globus маринованные 500мл",
    image: "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=400&h=400&fit=crop",
    weight: "500мл",
    discountPercent: 62,
    savingsAmount: 865,
    category: "Консервы",
    stores: [
      { store: "A-Store ADK", price: 540, oldPrice: 1888 },
      { store: "Airba Fresh", price: 1370 },
      { store: "MGO", price: 1385 },
    ],
  },
  {
    id: "5",
    name: "Токпокки быстрого приготовления Hot Chicken 120г",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    weight: "120г",
    discountPercent: 70,
    savingsAmount: 941,
    category: "Полуфабрикаты",
    stores: [
      { store: "Small", price: 409, oldPrice: 1888 },
      { store: "Arbuz", price: 1350 },
    ],
  },
  {
    id: "6",
    name: "Молоко Lactel ультрапастеризованное 3.2% 1л",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    weight: "1л",
    discountPercent: 45,
    savingsAmount: 320,
    category: "Молочные",
    stores: [
      { store: "Airba Fresh", price: 390, oldPrice: 710 },
      { store: "A-Store ADK", price: 550 },
      { store: "MGO", price: 610 },
    ],
  },
  {
    id: "7",
    name: "Чай Ahmad Tea Earl Grey чёрный 100 пакетиков",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    weight: "200г",
    discountPercent: 38,
    savingsAmount: 580,
    category: "Напитки",
    stores: [
      { store: "MGO", price: 950, oldPrice: 1530 },
      { store: "Arbuz", price: 1200 },
    ],
  },
  {
    id: "8",
    name: "Масло подсолнечное рафинированное Олейна 1л",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    weight: "1л",
    discountPercent: 25,
    savingsAmount: 200,
    category: "Бакалея",
    stores: [
      { store: "MGO", price: 590, oldPrice: 790 },
      { store: "Airba Fresh", price: 650 },
      { store: "Arbuz", price: 720 },
    ],
  },
  {
    id: "9",
    name: "Сахар белый рафинированный Казахстан 1кг",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    weight: "1кг",
    discountPercent: 15,
    savingsAmount: 80,
    category: "Бакалея",
    stores: [
      { store: "A-Store ADK", price: 440, oldPrice: 520 },
      { store: "Arbuz", price: 480 },
      { store: "MGO", price: 510 },
    ],
  },
  {
    id: "10",
    name: "Ополаскиватель Lacalut Sensitive 300мл",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    weight: "300мл",
    discountPercent: 82,
    savingsAmount: 3050,
    category: "Гигиена",
    stores: [
      { store: "Airba Fresh", price: 690, oldPrice: 3740 },
      { store: "MGO", price: 2890 },
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
