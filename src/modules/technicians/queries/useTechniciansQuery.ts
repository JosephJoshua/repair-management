import apiClient from '@/core/axios/apiClient';
import { SortDirection } from '@/core/types/SortDirection';
import { QueryClient, useQuery } from 'react-query';
import GetTechniciansResponse from '../types/GetTechniciansResponse';
import TechnicianTableRow from '../types/TechnicianTableRow';

export const TECHNICIANS_QUERY_KEY = 'technicians';

export type FetchTechniciansParams = {
  limit: number;
  offset: number;
  sortBy: keyof TechnicianTableRow;
  sortDirection: SortDirection;
  query: string;
};

const fetchTechnicians = async (
  signal: AbortSignal | undefined,
  { limit, offset, sortBy, sortDirection, query }: FetchTechniciansParams
): Promise<GetTechniciansResponse> => {
  const { data } = await apiClient.get<GetTechniciansResponse>(
    '/api/technicians',
    {
      signal,
      params: {
        offset,
        limit,
        sortBy,
        sortDirection,
        query,
      },
    }
  );

  return data;
};

export const useTechniciansQuery = ({
  limit,
  offset,
  sortBy,
  sortDirection,
  query,
}: FetchTechniciansParams) => {
  return useQuery(
    [TECHNICIANS_QUERY_KEY, limit, offset, sortBy, sortDirection, query],
    ({ signal }) =>
      fetchTechnicians(signal, { limit, offset, sortBy, sortDirection, query }),
    { keepPreviousData: true, staleTime: 5 * 1_000 }
  );
};

export const prefetchTechnicians = (
  client: QueryClient,
  { limit, offset, sortBy, sortDirection, query }: FetchTechniciansParams
) => {
  return client.prefetchQuery(
    [TECHNICIANS_QUERY_KEY, limit, offset, sortBy, sortDirection, query],
    ({ signal }) =>
      fetchTechnicians(signal, { limit, offset, sortBy, sortDirection, query })
  );
};
