import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { DAMAGES_QUERY_KEY } from '../queries/useDamagesQuery';
import EditDamageRequest from '../types/EditDamageRequest';

export const EDIT_DAMAGE_MUTATION_KEY = 'edit-damage';

const useEditDamageMutation = (client: QueryClient) => {
  return useMutation(
    EDIT_DAMAGE_MUTATION_KEY,
    (req: EditDamageRequest) => {
      return axios.put('/api/damages', req.body);
    },
    {
      onSettled: () => {
        client.invalidateQueries(DAMAGES_QUERY_KEY);
      },
      meta: {
        action: 'edit',
        object: 'kerusakan',
      },
    }
  );
};

export default useEditDamageMutation;
