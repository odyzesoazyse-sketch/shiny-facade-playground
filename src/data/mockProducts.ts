import { Product } from "@/components/ProductCard";

export const hotDeals: Product[] = [
  {
    id: "1",
    name: "Вафли Трубочки TWIX хрустящие с кремовой начинкой со вкусом карамели 22.5г",
    image: "https://s3-pic.e-magnum.kz/item/387466.jpg",
    weight: "22.5г",
    discountPercent: 71,
    savingsAmount: 196,
    stores: [
      { store: "MGO", price: 79, color: "#22c55e" },
      { store: "Airba Fresh", price: 275, color: "#3b82f6" },
    ],
  },
  {
    id: "2",
    name: "Нори снеки Master Kan сушеные с солью 4г",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop",
    weight: "4г",
    discountPercent: 70,
    savingsAmount: 855,
    stores: [
      { store: "Airba Fresh", price: 360, oldPrice: 425, color: "#3b82f6" },
      { store: "A-Store ADK", price: 1215, oldPrice: 1370, color: "#f59e0b" },
    ],
  },
  {
    id: "3",
    name: "Крабовые палочки Vici Снежный краб охлажденные 250г",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=300&fit=crop",
    weight: "250г",
    discountPercent: 66,
    savingsAmount: 1937,
    stores: [
      { store: "Airba Fresh", price: 998, oldPrice: 2000, color: "#3b82f6" },
      { store: "Arbuz", price: 1905, oldPrice: 2700, color: "#ef4444" },
      { store: "MGO", price: 2299, color: "#22c55e" },
    ],
  },
  {
    id: "4",
    name: "Огурцы Globus Дунайский лес маринованные 500мл",
    image: "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=300&h=300&fit=crop",
    weight: "500мл",
    discountPercent: 62,
    savingsAmount: 865,
    stores: [
      { store: "A-Store ADK", price: 540, oldPrice: 1888, color: "#f59e0b" },
      { store: "Airba Fresh", price: 1370, color: "#3b82f6" },
      { store: "MGO", price: 1385, color: "#22c55e" },
    ],
  },
  {
    id: "5",
    name: "Токпокки быстрого приготовления Hot Chicken 120г",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
    weight: "120г",
    discountPercent: 70,
    savingsAmount: 941,
    stores: [
      { store: "Small", price: 409, oldPrice: 1888, color: "#a855f7" },
      { store: "Arbuz", price: 1350, color: "#ef4444" },
    ],
  },
];

export const priceDropProducts: Product[] = [
  {
    id: "d1",
    name: "Ополаскиватель для полости рта Lacalut Sensitive 300мл",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop",
    weight: "300мл",
    discountPercent: 82,
    savingsAmount: 3050,
    stores: [
      { store: "Airba Fresh", price: 690, oldPrice: 3740, color: "#3b82f6" },
      { store: "MGO", price: 2890, color: "#22c55e" },
    ],
  },
  {
    id: "d2",
    name: "Свеча для торта цифра 3 Весёлая Затея",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
    weight: "1шт",
    discountPercent: 81,
    savingsAmount: 1300,
    stores: [
      { store: "Small", price: 300, oldPrice: 1600, color: "#a855f7" },
      { store: "Arbuz", price: 990, color: "#ef4444" },
    ],
  },
  {
    id: "d3",
    name: "Молоко Lactel ультрапастеризованное 3.2% 1л",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
    weight: "1л",
    discountPercent: 45,
    savingsAmount: 320,
    stores: [
      { store: "Airba Fresh", price: 390, oldPrice: 710, color: "#3b82f6" },
      { store: "A-Store ADK", price: 550, color: "#f59e0b" },
      { store: "MGO", price: 610, color: "#22c55e" },
    ],
  },
  {
    id: "d4",
    name: "Чай Ahmad Tea Earl Grey чёрный 100 пакетиков",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    weight: "200г",
    discountPercent: 38,
    savingsAmount: 580,
    stores: [
      { store: "MGO", price: 950, oldPrice: 1530, color: "#22c55e" },
      { store: "Arbuz", price: 1200, color: "#ef4444" },
    ],
  },
];

export const priceUpProducts: Product[] = [
  {
    id: "u1",
    name: "Масло подсолнечное рафинированное 1л",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    weight: "1л",
    discountPercent: 5,
    savingsAmount: 50,
    stores: [
      { store: "MGO", price: 890, oldPrice: 840, color: "#22c55e" },
      { store: "Airba Fresh", price: 950, oldPrice: 920, color: "#3b82f6" },
    ],
  },
  {
    id: "u2",
    name: "Сахар белый рафинированный 1кг",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop",
    weight: "1кг",
    discountPercent: 8,
    savingsAmount: 40,
    stores: [
      { store: "A-Store ADK", price: 540, oldPrice: 500, color: "#f59e0b" },
      { store: "Arbuz", price: 580, oldPrice: 550, color: "#ef4444" },
    ],
  },
];
