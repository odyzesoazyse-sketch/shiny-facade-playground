import { useQuery } from '@tanstack/react-query';
import { apiClient, API_ENDPOINTS } from '@/lib/api';
import { useCity } from '@/context/CityContext';
import type {
  BestDealsResponse,
  DiscountsResponse,
  PriceDropsResponse,
  PriceIncreasesResponse,
  SearchResponse,
  Product,
  CitiesResponse,
  PriceHistoryResponse,
  ChainsResponse,
} from '@/types/api';

// Search products
export const useSearch = (query: string) => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['search', query, selectedCityId],
    queryFn: () => apiClient.get<SearchResponse>(API_ENDPOINTS.search(query, selectedCityId)),
    enabled: query.length > 0,
  });
};

// Get best deals
export const useBestDeals = () => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['bestDeals', selectedCityId],
    queryFn: () => apiClient.get<BestDealsResponse>(API_ENDPOINTS.bestDeals(selectedCityId)),
  });
};

// Get discounts
export const useDiscounts = () => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['discounts', selectedCityId],
    queryFn: () => apiClient.get<DiscountsResponse>(API_ENDPOINTS.discounts(selectedCityId)),
  });
};

// Get price drops
export const usePriceDrops = () => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['priceDrops', selectedCityId],
    queryFn: () => apiClient.get<PriceDropsResponse>(API_ENDPOINTS.priceDrops(selectedCityId)),
  });
};

// Get price increases
export const usePriceIncreases = () => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['priceIncreases', selectedCityId],
    queryFn: () => apiClient.get<PriceIncreasesResponse>(API_ENDPOINTS.priceIncreases(selectedCityId)),
  });
};

// Get product by UUID
export const useProduct = (uuid: string) => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['product', uuid, selectedCityId],
    queryFn: () => apiClient.get<Product>(API_ENDPOINTS.product(uuid, selectedCityId)),
    enabled: !!uuid,
  });
};

// Get price history for a product
export const usePriceHistory = (uuid: string) => {
  const { selectedCityId } = useCity();
  return useQuery({
    queryKey: ['priceHistory', uuid, selectedCityId],
    queryFn: () => apiClient.get<PriceHistoryResponse>(API_ENDPOINTS.priceHistory(uuid, selectedCityId)),
    enabled: !!uuid,
  });
};

// Get cities
export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => apiClient.get<CitiesResponse>(API_ENDPOINTS.cities()),
  });
};

// Get chains (store networks)
export const useChains = () => {
  return useQuery({
    queryKey: ['chains'],
    queryFn: () => apiClient.get<ChainsResponse>(API_ENDPOINTS.chains()),
  });
};
