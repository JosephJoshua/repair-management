import apiClient from '@/core/axios/apiClient';
import { QueryClient, useQuery } from 'react-query';
import GetDamagesRequest from '../types/GetDamagesRequest';
import GetDamagesResponse from '../types/GetDamagesResponse';

export const DAMAGES_QUERY_KEY = 'damages';

const fetchDamages = async (
  signal: AbortSignal | undefined,
  req: GetDamagesRequest
): Promise<GetDamagesResponse> => {
  const { data } = await apiClient.get<GetDamagesResponse>('/api/damages', {
    signal,
    params: req.query,
  });

  return data;
};

export const useDamagesQuery = (req: GetDamagesRequest) => {
  return useQuery(
    [DAMAGES_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchDamages(signal, req),
    { keepPreviousData: true, staleTime: 5 * 1_000 }
  );
};

export const prefetchDamages = (
  client: QueryClient,
  req: GetDamagesRequest
) => {
  return client.prefetchQuery(
    [DAMAGES_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchDamages(signal, req)
  );
};
