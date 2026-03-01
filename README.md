# minprice.kz — фронтенд

Веб-приложение для сравнения цен на продукты питания в супермаркетах Казахстана.

Сравниваем цены в Magnum, Arbuz, Airba Fresh, A-Store, Small и других магазинах в режиме реального времени.

## Стек

- **React 18** + **TypeScript**
- **Vite** — сборка
- **TanStack Query** — управление состоянием и кэширование запросов
- **react-router-dom** — маршрутизация
- **recharts** — графики истории цен
- **react-helmet-async** — динамические мета-теги (OG/Twitter)
- **Tailwind CSS** + shadcn/ui — стилизация

## Страницы

| Путь | Описание |
|---|---|
| `/` | Главная — лучшие скидки |
| `/search` | Поиск по товарам |
| `/catalog` | Каталог по категориям |
| `/discounts` | Все товары со скидками |
| `/product/:uuid` | Страница товара с историей цен |
| `/cart` | Корзина |
| `/public-offer` | Публичная оферта |

## API

Бэкенд: `https://backend.minprice.kz/api/`

Основные эндпоинты:
- `GET /search/?q=...&city_id=1&chain_ids=1,2`
- `GET /discounts/?city_id=1&page=1`
- `GET /products/:uuid/`
- `GET /products/:uuid/price-history/`
- `GET /chains/`
- `GET /cities/`

## Запуск локально

```bash
# Установить зависимости
npm install

# Запустить dev-сервер (http://localhost:8080)
npm run dev
```

## Сборка и деплой

```bash
# Собрать production-бандл
npm run build
# Результат в папке dist/

# Запустить preview билда локально
npm run preview
```

На сервере раздаётся через **Nginx** как SPA (`try_files $uri /index.html`).  
Подробная инструкция по деплою — в [DEPLOY.md](./DEPLOY.md) *(если есть)* или в документации команды.

## Структура проекта

```
src/
├── components/      # Переиспользуемые компоненты (Header, ProductCard, StoreLogo, ...)
├── context/         # React Context (корзина, город)
├── hooks/           # TanStack Query хуки (useSearch, useDiscounts, useProduct, ...)
├── lib/             # API-клиент, трансформеры, утилиты
├── pages/           # Страницы приложения
└── types/           # TypeScript типы API
```

## Переменные окружения

Проект не использует `.env` — базовый URL API захардкожен в `src/lib/api.ts`:

```ts
const API_BASE_URL = 'https://backend.minprice.kz/api';
```

Чтобы использовать другой бэкенд — поменяй эту строку.
