# City Selection Implementation

## Overview
Successfully implemented dynamic city selection functionality using the `/api/cities/` endpoint. All product endpoints now include the selected city as a query parameter, with Алматы (Almaty) as the default city.

## Features Implemented

### 1. City Context Management
**File**: `src/context/CityContext.tsx`

- Created React Context for managing selected city across the application
- Stores selected city ID in localStorage with key `minprice_city_id`
- Default city: **ID 1** (Алматы)
- Provides easy access via `useCity()` hook

```typescript
const { selectedCityId, setSelectedCityId, cityData, setCityData } = useCity();
```

### 2. City Selector Component
**File**: `src/components/CitySelector.tsx`

- Dropdown menu to select city
- Fetches cities from `/api/cities/` endpoint
- Shows MapPin icon with city name
- Mobile-responsive (hides city name on small screens)
- Highlights currently selected city

**Available Cities:**
- 🏙️ Алматы (ID: 1) - Default
- 🏙️ Астана (ID: 2)

### 3. Updated API Configuration
**File**: `src/lib/api.ts`

All product endpoints now accept optional `cityId` parameter:

```typescript
// Before
bestDeals: () => '/best-deals/'

// After
bestDeals: (cityId?: number) => `/best-deals/${cityId ? `?city=${cityId}` : ''}`
```

**Updated Endpoints:**
- ✅ `/search/?q={query}&city={cityId}`
- ✅ `/best-deals/?city={cityId}`
- ✅ `/discounts/?city={cityId}`
- ✅ `/products/{uuid}/?city={cityId}`
- ✅ `/products/{uuid}/price-history/?city={cityId}`
- ✅ `/price-drops/?city={cityId}`
- ✅ `/price-increases/?city={cityId}`

**Note**: The API parameter is `city` but it accepts the numeric city ID (e.g., `city=1` for Almaty)

### 4. Updated React Query Hooks
**File**: `src/hooks/useApi.ts`

All hooks now use the city context and include city in query keys:

```typescript
export const useBestDeals = () => {
  const { selectedCity } = useCity();
  return useQuery({
    queryKey: ['bestDeals', selectedCity],
    queryFn: () => apiClient.get<BestDealsResponse>(
      API_ENDPOINTS.bestDeals(selectedCity)
    ),
  });
};
```

**Benefits:**
- ✅ Automatic cache invalidation when city changes
- ✅ Separate cache for each city
- ✅ Efficient data refetching

### 5. Updated App Structure
**File**: `src/App.tsx`

Added `CityProvider` to the component tree:

```typescript
<QueryClientProvider client={queryClient}>
  <TooltipProvider>
    <CityProvider>
      <CartProvider>
        {/* App content */}
      </CartProvider>
    </CityProvider>
  </TooltipProvider>
</QueryClientProvider>
```

### 6. Updated Header
**File**: `src/components/Header.tsx`

- Replaced manual city selector with `CitySelector` component
- Removed hardcoded cities array
- Dynamic city list from API

## User Experience

### Desktop
- City selector appears in header with MapPin icon
- Shows full city name
- Click to open dropdown with available cities
- Selected city is highlighted

### Mobile
- Shows only MapPin icon (saves space)
- Tap to open city selector
- Same functionality as desktop

### Persistence
- Selected city is saved to localStorage
- Persists across page refreshes
- Default to Almaty if no city is saved

## Data Flow

```
User selects city
  ↓
CityContext updates selectedCity
  ↓
localStorage updated
  ↓
React Query hooks detect city change
  ↓
API calls include new city parameter
  ↓
Data refetched for new city
  ↓
UI updates with city-specific data
```

## API Integration

### Request Examples

**Best Deals for Almaty:**
```
GET https://minprice.xyz/api/best-deals/?city=almaty
```

**Search in Astana:**
```
GET https://minprice.xyz/api/search/?q=молоко&city=astana
```

**Product in Almaty:**
```
GET https://minprice.xyz/api/products/{uuid}/?city=almaty
```

### Response
API returns city-specific product data:
- Prices from stores in selected city
- Availability in selected city
- City-specific deals and discounts

## Testing

```bash
# Test cities endpoint
curl "https://minprice.xyz/api/cities/"
# Returns: {"cities":[{"id":1,"name":"Алматы","slug":"almaty"},{"id":2,"name":"Астана","slug":"astana"}]}

# Test best deals with city
curl "https://minprice.xyz/api/best-deals/?city=almaty"
# Returns city-specific deals

# Test search with city
curl "https://minprice.xyz/api/search/?q=молоко&city=almaty"
# Returns city-specific search results
```

## Files Modified/Created

### Created
1. ✅ `src/context/CityContext.tsx` - City context management
2. ✅ `src/components/CitySelector.tsx` - City selector UI component

### Modified
1. ✅ `src/App.tsx` - Added CityProvider
2. ✅ `src/lib/api.ts` - Added city parameter to all endpoints
3. ✅ `src/hooks/useApi.ts` - Updated all hooks to use city context
4. ✅ `src/components/Header.tsx` - Replaced manual selector with CitySelector

## Query Key Strategy

Each API call includes the city in its query key for proper caching:

```typescript
// Search query keys
['search', query, 'almaty']
['search', query, 'astana']

// Best deals query keys
['bestDeals', 'almaty']
['bestDeals', 'astana']
```

This ensures:
- ✅ Separate cache for each city
- ✅ Automatic refetch when city changes
- ✅ No stale data from wrong city

## Default Behavior

1. **First Visit**: Defaults to Almaty
2. **City Selection**: Saved to localStorage
3. **Subsequent Visits**: Uses saved city
4. **All API Calls**: Include selected city parameter

## Benefits

✅ **User-Centric**: Shows products and prices relevant to user's location
✅ **Performance**: React Query caching per city
✅ **Persistence**: Selected city remembered across sessions
✅ **Type-Safe**: Full TypeScript support
✅ **Scalable**: Easy to add more cities when API supports them
✅ **SEO-Friendly**: Can be extended with URL-based city selection

## Future Enhancements

Potential improvements:
- Auto-detect user's city based on IP/location
- Add city to URL for better SEO
- Show store locations on map per city
- City-specific promotions and deals
- Multi-city comparison view
