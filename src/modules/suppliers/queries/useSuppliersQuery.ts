import apiClient from '@/core/axios/apiClient';
import { QueryClient, useQuery } from 'react-query';
import GetSuppliersRequest from '../types/GetSuppliersRequest';
import GetSuppliersResponse from '../types/GetSuppliersResponse';

export const SUPPLIERS_QUERY_KEY = 'suppliers';
const fetchSuppliers = async (
  signal: AbortSignal | undefined,
  req: GetSuppliersRequest
): Promise<GetSuppliersResponse> => {
  const { data } = await apiClient.get<GetSuppliersResponse>('/api/suppliers', {
    signal,
    params: req.query,
  });

  return data;
};

export const useSuppliersQuery = (req: GetSuppliersRequest) => {
  return useQuery(
    [SUPPLIERS_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchSuppliers(signal, req),
    { keepPreviousData: true, staleTime: 5 * 1_000 }
  );
};

export const prefetchSuppliers = (
  client: QueryClient,
  req: GetSuppliersRequest
) => {
  return client.prefetchQuery(
    [SUPPLIERS_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchSuppliers(signal, req)
  );
};
