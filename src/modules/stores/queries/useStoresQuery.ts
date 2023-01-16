import apiClient from '@/core/axios/apiClient';
import { QueryClient, useQuery } from 'react-query';
import GetStoresRequest from '../types/GetStoresRequest';
import GetStoresResponse from '../types/GetStoresResponse';

export const STORES_QUERY_KEY = 'store';
const fetchStores = async (
  signal: AbortSignal | undefined,
  req: GetStoresRequest
): Promise<GetStoresResponse> => {
  const { data } = await apiClient.get<GetStoresResponse>('/api/stores', {
    signal,
    params: req.query,
  });

  return data;
};

export const useStoresQuery = (req: GetStoresRequest, enabled = true) => {
  return useQuery(
    [STORES_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchStores(signal, req),
    { staleTime: 5 * 1_000, enabled }
  );
};

export const prefetchStores = (client: QueryClient, req: GetStoresRequest) => {
  return client.prefetchQuery(
    [STORES_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchStores(signal, req)
  );
};
