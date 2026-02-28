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
  search: (query: string, cityId?: number) =>
    `/search/?q=${encodeURIComponent(query)}${cityId ? `&city=${cityId}` : ''}`,
  bestDeals: (cityId?: number) => `/best-deals/${cityId ? `?city=${cityId}` : ''}`,
  discounts: (cityId?: number) => `/discounts/${cityId ? `?city=${cityId}` : ''}`,
  product: (uuid: string, cityId?: number) =>
    `/products/${uuid}/${cityId ? `?city=${cityId}` : ''}`,
  priceHistory: (uuid: string, cityId?: number) =>
    `/products/${uuid}/price-history/${cityId ? `?city=${cityId}` : ''}`,
  priceDrops: (cityId?: number) => `/price-drops/${cityId ? `?city=${cityId}` : ''}`,
  priceIncreases: (cityId?: number) => `/price-increases/${cityId ? `?city=${cityId}` : ''}`,
  cities: () => '/cities/',
  chains: () => '/chains/',
} as const;
