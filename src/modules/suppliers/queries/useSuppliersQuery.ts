import apiClient from '@/core/axios/apiClient';
import { SortDirection } from '@/core/types/SortDirection';
import { QueryClient, useQuery } from 'react-query';
import GetSuppliersResponse from '../types/GetSuppliersResponse';
import SupplierTableRow from '../types/SupplierTableRow';

export const SUPPLIERS_QUERY_KEY = 'suppliers';

export type FetchSuppliersParams = {
  limit: number;
  offset: number;
  sortBy: keyof SupplierTableRow;
  sortDirection: SortDirection;
  query: string;
};

const fetchSuppliers = async (
  signal: AbortSignal | undefined,
  { limit, offset, sortBy, sortDirection, query }: FetchSuppliersParams
): Promise<GetSuppliersResponse> => {
  const { data } = await apiClient.get<GetSuppliersResponse>('/api/suppliers', {
    signal,
    params: {
      offset,
      limit,
      sortBy,
      sortDirection,
      query,
    },
  });

  return data;
};

export const useSuppliersQuery = ({
  limit,
  offset,
  sortBy,
  sortDirection,
  query,
}: FetchSuppliersParams) => {
  return useQuery(
    [SUPPLIERS_QUERY_KEY, limit, offset, sortBy, sortDirection, query],
    ({ signal }) =>
      fetchSuppliers(signal, { limit, offset, sortBy, sortDirection, query }),
    { keepPreviousData: true, staleTime: 5 * 1_000 }
  );
};

export const prefetchSuppliers = (
  client: QueryClient,
  { limit, offset, sortBy, sortDirection, query }: FetchSuppliersParams
) => {
  return client.prefetchQuery(
    [SUPPLIERS_QUERY_KEY, limit, offset, sortBy, sortDirection, query],
    ({ signal }) =>
      fetchSuppliers(signal, { limit, offset, sortBy, sortDirection, query })
  );
};
