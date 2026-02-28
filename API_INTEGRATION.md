# API Integration Guide

## Overview
This project has been successfully integrated with the minprice.xyz API. All pages now fetch real-time data from the backend.

## API Base URL
```
https://minprice.xyz/api
```

## Integrated Endpoints

### 1. Best Deals
- **Endpoint**: `/best-deals/`
- **Usage**: Home page top deals slider
- **Returns**: 60 products with the best discounts

### 2. Price Drops
- **Endpoint**: `/price-drops/`
- **Usage**: Home page "Упали в цене" section
- **Returns**: 20 products with significant price drops

### 3. Price Increases
- **Endpoint**: `/price-increases/`
- **Usage**: Home page "Выросли в цене" section
- **Returns**: Products with recent price increases

### 4. Search
- **Endpoint**: `/search/?q={query}`
- **Usage**: Search page with query parameter
- **Example**: `/search/?q=молоко`
- **Returns**: Search results matching the query

### 5. Product Detail
- **Endpoint**: `/products/{uuid}/`
- **Usage**: Individual product page
- **Returns**: Full product details including stores and prices

### 6. Price History
- **Endpoint**: `/products/{uuid}/price-history/`
- **Usage**: Product page price chart
- **Returns**: Historical price data for all stores

### 7. Cities
- **Endpoint**: `/cities/`
- **Usage**: Available for city selection
- **Returns**: List of supported cities (Алматы, Астана)

### 8. Discounts
- **Endpoint**: `/discounts/`
- **Usage**: Available for discount listings
- **Returns**: Products with active discounts

### 9. Chains
- **Endpoint**: `/chains/`
- **Usage**: Home page and search page to display all available store chains
- **Returns**: List of 5 store chains with logos
  - Airba Fresh
  - Arbuz
  - A-Store ADK
  - MagnumGO
  - Small

## File Structure

```
src/
├── lib/
│   ├── api.ts              # API client and endpoint definitions
│   └── transformers.ts     # Data transformation utilities
├── types/
│   └── api.ts              # TypeScript type definitions
├── hooks/
│   └── useApi.ts           # React Query hooks for API calls
└── pages/
    ├── Index.tsx           # Home page (uses best deals, price drops, price increases)
    ├── SearchPage.tsx      # Search/Catalog page (uses search API)
    └── ProductPage.tsx     # Product detail page (uses product & price history)
```

## Implementation Details

### API Client (`src/lib/api.ts`)
- Wraps native `fetch` API
- Provides typed responses
- Handles error cases

### React Query Hooks (`src/hooks/useApi.ts`)
- `useBestDeals()` - Fetches best deals
- `usePriceDrops()` - Fetches price drops
- `usePriceIncreases()` - Fetches price increases
- `useSearch(query)` - Searches products
- `useProduct(uuid)` - Gets product details
- `usePriceHistory(uuid)` - Gets price history
- `useCities()` - Gets available cities
- `useDiscounts()` - Gets discounted products
- `useChains()` - Gets all store chains

### Data Transformers (`src/lib/transformers.ts`)
Converts API responses to the format expected by UI components:
- Maps API product fields to component props
- Calculates discount percentages
- Transforms store prices
- Generates appropriate metadata

## Features

✅ Real-time product data from API
✅ Search functionality with query parameters
✅ Price history charts
✅ Loading states with skeleton screens
✅ Error handling
✅ React Query caching for performance
✅ Automatic refetching on mount
✅ Type-safe API calls with TypeScript

## Usage Examples

### Searching for products
```typescript
const { data, isLoading } = useSearch('молоко');
// Returns products matching "молоко"
```

### Getting product details
```typescript
const { data, isLoading } = useProduct('uuid-here');
// Returns full product details
```

### Fetching best deals
```typescript
const { data, isLoading } = useBestDeals();
// Returns 60 products with best discounts
```

### Getting all store chains
```typescript
const { data, isLoading } = useChains();
// Returns 5 store chains with names and logos
```

## Testing

All endpoints have been tested and verified:
- ✅ Best Deals: Returns 60 products
- ✅ Price Drops: Returns 20 products
- ✅ Price Increases: Working
- ✅ Search: Returns relevant results
- ✅ Product Detail: Returns full product data
- ✅ Cities: Returns 2 cities
- ✅ Price History: Returns historical data
- ✅ Chains: Returns 5 store chains (Airba Fresh, Arbuz, A-Store ADK, MagnumGO, Small)

## Development Server

The website is running at:
- Local: http://localhost:8080/
- Network: http://192.168.31.73:8080/

Hot Module Replacement (HMR) is enabled for fast development.
