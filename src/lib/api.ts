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
    `/search/?q=${encodeURIComponent(query)}${cityId ? `&city_id=${cityId}` : ''}`,
  bestDeals: (cityId?: number) => `/best-deals/${cityId ? `?city_id=${cityId}` : ''}`,
  discounts: (cityId?: number) => `/discounts/${cityId ? `?city_id=${cityId}` : ''}`,
  product: (uuid: string, cityId?: number) =>
    `/products/${uuid}/${cityId ? `?city_id=${cityId}` : ''}`,
  priceHistory: (uuid: string, cityId?: number) =>
    `/products/${uuid}/price-history/${cityId ? `?city_id=${cityId}` : ''}`,
  priceDrops: (cityId?: number) => `/price-drops/${cityId ? `?city_id=${cityId}` : ''}`,
  priceIncreases: (cityId?: number) => `/price-increases/${cityId ? `?city_id=${cityId}` : ''}`,
  cities: () => '/cities/',
  chains: () => '/chains/',
} as const;
