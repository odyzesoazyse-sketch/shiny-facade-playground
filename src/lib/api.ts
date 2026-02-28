const API_BASE_URL = 'https://minprice.xyz/api';

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};

export const API_ENDPOINTS = {
  search: (query: string, cityId?: number, chainIds?: number[]) => {
    let url = `/search/?q=${encodeURIComponent(query)}`;
    if (cityId) url += `&city_id=${cityId}`;
    if (chainIds && chainIds.length > 0) url += `&chain_ids=${chainIds.join(',')}`;
    return url;
  },
  bestDeals: (cityId?: number) => `/best-deals/${cityId ? `?city_id=${cityId}` : ''}`,
  discounts: (cityId?: number, chainIds?: number[], page?: number) => {
    const params = new URLSearchParams();
    if (cityId) params.append('city_id', cityId.toString());
    if (chainIds && chainIds.length > 0) params.append('chain_ids', chainIds.join(','));
    if (page) params.append('page', page.toString());
    const qs = params.toString();
    return `/discounts/${qs ? `?${qs}` : ''}`;
  },
  product: (uuid: string, cityId?: number) =>
    `/products/${uuid}/${cityId ? `?city_id=${cityId}` : ''}`,
  priceHistory: (uuid: string, cityId?: number) =>
    `/products/${uuid}/price-history/${cityId ? `?city_id=${cityId}` : ''}`,
  priceDrops: (cityId?: number) => `/price-drops/${cityId ? `?city_id=${cityId}` : ''}`,
  priceIncreases: (cityId?: number) => `/price-increases/${cityId ? `?city_id=${cityId}` : ''}`,
  cities: () => '/cities/',
  chains: () => '/chains/',
  categories: () => '/categories/',
  products: (params?: {
    canonical_category?: number;
    ordering?: string;
    city_id?: number;
    limit?: number;
    page?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.canonical_category) queryParams.append('canonical_category', params.canonical_category.toString());
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    if (params?.city_id) queryParams.append('city_id', params.city_id.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    const query = queryParams.toString();
    return `/products/${query ? `?${query}` : ''}`;
  },
} as const;
