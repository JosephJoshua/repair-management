import apiClient from '@/core/axios/apiClient';
import { QueryClient, useQuery } from 'react-query';
import GetConditionsRequest from '../types/GetConditionsRequest';
import GetConditionsResponse from '../types/GetConditionsResponse';

export const CONDITIONS_QUERY_KEY = 'conditions';

const fetchConditions = async (
  signal: AbortSignal | undefined,
  req: GetConditionsRequest
): Promise<GetConditionsResponse> => {
  const { data } = await apiClient.get<GetConditionsResponse>(
    '/api/conditions',
    {
      signal,
      params: req.query,
    }
  );

  return data;
};

export const useConditionsQuery = (req: GetConditionsRequest) => {
  return useQuery(
    [CONDITIONS_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchConditions(signal, req),
    { keepPreviousData: true, staleTime: 5 * 1_000 }
  );
};

export const prefetchConditions = (
  client: QueryClient,
  req: GetConditionsRequest
) => {
  return client.prefetchQuery(
    [CONDITIONS_QUERY_KEY, ...Object.values(req.query)],
    ({ signal }) => fetchConditions(signal, req)
  );
};
