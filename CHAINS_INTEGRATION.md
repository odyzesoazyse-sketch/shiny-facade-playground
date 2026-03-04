# Chains API Integration

## Summary
Successfully integrated the `/api/chains/` endpoint to dynamically display all store chains instead of using hardcoded values.

## Changes Made

### 1. API Types (`src/types/api.ts`)
- Added `ChainsResponse` interface to handle the chains endpoint response

### 2. API Configuration (`src/lib/api.ts`)
- Added `chains: () => '/chains/'` endpoint

### 3. React Query Hook (`src/hooks/useApi.ts`)
- Created `useChains()` hook to fetch store chains data
- Returns list of 5 store chains with their logos and metadata

### 4. Updated Pages

#### Index Page (`src/pages/Index.tsx`)
**Before:**
```typescript
import { storeNames } from "@/data/mockProducts";
```

**After:**
```typescript
import { useChains } from "@/hooks/useApi";
const { data: chainsData } = useChains();
```

**Changes:**
- Removed hardcoded `storeNames` array
- Store count now shows: `{chainsData?.chains.length || 5} магазинах`
- Store logos dynamically rendered from API data
- Displays first 4 chains with "+1" indicator for remaining chains

#### Search Page (`src/pages/SearchPage.tsx`)
**Before:**
```typescript
import { storeNames } from "@/data/mockProducts";
{storeNames.map((s) => (
  <option key={s} value={s}>{s}</option>
))}
```

**After:**
```typescript
import { useChains } from "@/hooks/useApi";
const { data: chainsData } = useChains();
{chainsData?.chains.map((chain) => (
  <option key={chain.id} value={chain.name}>{chain.name}</option>
))}
```

**Changes:**
- Store filter dropdown now populated from API
- Uses chain ID as key for better React performance
- Dynamically updates when new chains are added to the API

## API Response Structure

```json
{
  "chains": [
    {
      "id": 17,
      "name": "Airba Fresh",
      "slug": "airbafresh",
      "source": "airbafresh",
      "logo": "chain_logos/airba_fresh.png"
    },
    {
      "id": 10,
      "name": "Arbuz",
      "slug": "arbuz",
      "source": "arbuz",
      "logo": "chain_logos/Arbuz.png"
    },
    {
      "id": 11,
      "name": "A-Store ADK",
      "slug": "instashop-astore-adk",
      "source": "instashop",
      "logo": "chain_logos/Astore.png"
    },
    {
      "id": 12,
      "name": "MagnumGO",
      "slug": "mgo",
      "source": "mgo",
      "logo": "chain_logos/magnum.png"
    },
    {
      "id": 21,
      "name": "Small",
      "slug": "small",
      "source": "wolt",
      "logo": "chain_logos/Small.png"
    }
  ]
}
```

## Benefits

✅ **Dynamic**: No need to update code when new stores are added
✅ **Consistent**: Store data comes from single source of truth (API)
✅ **Scalable**: Automatically adjusts to any number of chains
✅ **Type-Safe**: Full TypeScript support with proper interfaces
✅ **Cached**: React Query automatically caches the chains list
✅ **Real-time**: Updates reflect immediately when API changes

## Current Store Chains

1. **Airba Fresh** (ID: 17)
2. **Arbuz** (ID: 10)
3. **A-Store ADK** (ID: 11)
4. **MagnumGO** (ID: 12)
5. **Small** (ID: 21)

## Testing

```bash
# Test the chains endpoint
curl -s "https://minprice.xyz/api/chains/"

# Verify it returns 5 chains
curl -s "https://minprice.xyz/api/chains/" | grep -o '"name"' | wc -l
# Output: 5
```

## Usage in Components

```typescript
import { useChains } from '@/hooks/useApi';

function MyComponent() {
  const { data: chainsData, isLoading } = useChains();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {chainsData?.chains.map((chain) => (
        <div key={chain.id}>
          <img src={chain.logo} alt={chain.name} />
          <span>{chain.name}</span>
        </div>
      ))}
    </div>
  );
}
```

## Files Modified

- ✅ `src/types/api.ts` - Added ChainsResponse interface
- ✅ `src/lib/api.ts` - Added chains endpoint
- ✅ `src/hooks/useApi.ts` - Added useChains hook
- ✅ `src/pages/Index.tsx` - Updated to use chains API
- ✅ `src/pages/SearchPage.tsx` - Updated store filter dropdown
- ✅ `API_INTEGRATION.md` - Updated documentation

## Migration Notes

The hardcoded `storeNames` array in `src/data/mockProducts.ts` is still exported but no longer used in Index.tsx or SearchPage.tsx. It can be removed if not used elsewhere in the codebase.
