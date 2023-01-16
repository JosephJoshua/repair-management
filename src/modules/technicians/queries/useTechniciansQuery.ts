import apiClient from '@/core/axios/apiClient';
import { QueryClient, useQuery } from 'react-query';
import GetTechniciansRequest from '../types/GetTechniciansRequest';
import GetTechniciansResponse from '../types/GetTechniciansResponse';

export const TECHNICIANS_QUERY_KEY = 'technicians';

const fetchTechnicians = async (
  signal: AbortSignal | undefined,
  req: GetTechniciansRequest
): Promise<GetTechniciansResponse> => {
  const { data } = await apiClient.get<GetTechniciansResponse>(
    '/api/technicians',
    {
      signal,
      params: req.query,
    }
  );

  return data;
};

export const useTechniciansQuery = (
  req: GetTechniciansRequest,
  enabled = true
) => {
  return useQuery(
    [TECHNICIANS_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchTechnicians(signal, req),
    { keepPreviousData: true, staleTime: 5 * 1_000, enabled }
  );
};

export const prefetchTechnicians = (
  client: QueryClient,
  req: GetTechniciansRequest
) => {
  return client.prefetchQuery(
    [TECHNICIANS_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchTechnicians(signal, req)
  );
};
