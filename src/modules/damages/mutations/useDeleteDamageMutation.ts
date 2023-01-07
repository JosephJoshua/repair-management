import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { DAMAGES_QUERY_KEY } from '../queries/useDamagesQuery';
import DeleteDamageRequest from '../types/DeleteDamageRequest';

export const DELETE_MUTATION_MUTATION_KEY = 'delete-damage';

const useDeleteDamageMutation = (client: QueryClient) => {
  return useMutation(
    DELETE_MUTATION_MUTATION_KEY,
    (req: DeleteDamageRequest) => {
      return axios.delete(`/api/damages`, {
        params: req.query,
      });
    },
    {
      onSettled: () => {
        client.invalidateQueries(DAMAGES_QUERY_KEY);
      },
    }
  );
};

export default useDeleteDamageMutation;
