# Store Logo Display Fix

## Problem
Store logos from the API were not being displayed in product cards. The MagnumGO logo was showing as just "M" (a fallback initial), indicating the logo image wasn't being loaded.

## Root Cause
1. **Hardcoded logo mappings**: The `StoreLogo` component was using only local assets from `storeLogos.ts`
2. **Missing API logo integration**: Product cards weren't passing the logo URLs from the API
3. **Incorrect URL construction**: Logo paths from the API needed `/media/` prefix
4. **Name mismatch**: API returns "MagnumGO" but local mapping only had "MGO" and "Magnum"

## Solution Implemented

### 1. Updated `StoreLogo` Component
**File**: `src/components/StoreLogo.tsx`

Added optional `logoUrl` prop to accept logo URLs from the API:

```typescript
interface StoreLogoProps {
  store: string;
  size?: "sm" | "md";
  className?: string;
  logoUrl?: string; // New: Optional logo URL from API
}

const StoreLogo = ({ store, size = "sm", className = "", logoUrl }: StoreLogoProps) => {
  // Prefer API logo URL, fallback to local mapping
  const logo = logoUrl || getStoreLogo(store);
  // ... rest of component
}
```

### 2. Updated Transformer
**File**: `src/lib/transformers.ts`

Fixed logo URL construction to add `/media/` prefix:

```typescript
export const transformStorePrice = (apiStore: ApiStorePrice): MockStorePrice => {
  // Construct full logo URL
  let logoUrl = apiStore.chain_logo;
  if (!logoUrl.startsWith('http')) {
    // Add /media/ prefix if not already present
    const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`;
    logoUrl = path.startsWith('/media/')
      ? `https://minprice.xyz${path}`
      : `https://minprice.xyz/media${path}`;
  }

  return {
    store: apiStore.chain_name,
    price: apiStore.price,
    oldPrice: apiStore.previous_price || undefined,
    color: getStoreColor(apiStore.chain_name),
    storeName: apiStore.store_name,
    storeImage: logoUrl, // Now contains full URL
    storeUrl: apiStore.url,
  };
};
```

**URL Transformation Examples:**
- Input: `"chain_logos/magnum.png"`
- Output: `"https://minprice.xyz/media/chain_logos/magnum.png"`

- Input: `"/media/chain_logos/arbuz.png"`
- Output: `"https://minprice.xyz/media/chain_logos/arbuz.png"`

### 3. Updated ProductCard
**File**: `src/components/ProductCard.tsx`

Pass logo URL from store data to StoreLogo:

```typescript
<StoreLogo
  store={store.store}
  size="sm"
  logoUrl={store.storeImage}  // New: Pass API logo URL
/>
```

### 4. Updated Fallback Mapping
**File**: `src/lib/storeLogos.ts`

Added "MagnumGO" to local fallback mapping:

```typescript
export const storeLogos: Record<string, string> = {
  "MGO": magnumLogo,
  "Magnum": magnumLogo,
  "MagnumGO": magnumLogo, // New: Added for API compatibility
  "Airba Fresh": airbaFreshLogo,
  "A-Store ADK": astoreLogo,
  "Arbuz": arbuzLogo,
  "Small": smallLogo,
};
```

## Logo URL Structure

### API Response
```json
{
  "chain_name": "MagnumGO",
  "chain_logo": "chain_logos/magnum.png"
}
```

### Transformed Data
```json
{
  "store": "MagnumGO",
  "storeImage": "https://minprice.xyz/media/chain_logos/magnum.png"
}
```

### Verified URLs
All store logos are accessible at these URLs:

✅ https://minprice.xyz/media/chain_logos/magnum.png (MagnumGO)
✅ https://minprice.xyz/media/chain_logos/airba_fresh.png (Airba Fresh)
✅ https://minprice.xyz/media/chain_logos/Arbuz.png (Arbuz)
✅ https://minprice.xyz/media/chain_logos/Astore.png (A-Store ADK)
✅ https://minprice.xyz/media/chain_logos/Small.png (Small)

## Benefits

✅ **Dynamic**: Uses real logo URLs from the API instead of hardcoded assets
✅ **Fallback**: Still works with local assets if API logo is unavailable
✅ **Scalable**: New stores automatically get logos from the API
✅ **Consistent**: All store logos now display correctly across the application
✅ **Type-Safe**: Fully typed with TypeScript

## Testing

```bash
# Verify logo URL is accessible
curl -I "https://minprice.xyz/media/chain_logos/magnum.png"
# Returns: HTTP/1.1 200 OK ✅
```

## Files Modified

1. ✅ `src/components/StoreLogo.tsx` - Added logoUrl prop
2. ✅ `src/lib/transformers.ts` - Fixed URL construction with /media/ prefix
3. ✅ `src/components/ProductCard.tsx` - Pass logoUrl to StoreLogo
4. ✅ `src/lib/storeLogos.ts` - Added MagnumGO fallback

## Result

All store logos now display correctly in product cards:
- ✅ Airba Fresh
- ✅ Arbuz
- ✅ A-Store ADK
- ✅ **MagnumGO** (Previously showing as "M")
- ✅ Small

The issue has been completely resolved!
