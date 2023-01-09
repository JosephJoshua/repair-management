import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { DAMAGES_QUERY_KEY } from '../queries/useDamagesQuery';
import AddDamageRequest from '../types/AddDamageRequest';
import AddDamageResponse from '../types/AddDamageResponse';

export const ADD_DAMAGE_MUTATION_KEY = 'add-damage';

const useAddDamageMutation = (client: QueryClient) => {
  return useMutation(
    ADD_DAMAGE_MUTATION_KEY,
    async (req: AddDamageRequest) => {
      const { data } = await axios.post<AddDamageResponse>(
        '/api/damages',
        req.body
      );

      return data.result;
    },
    {
      onSettled: () => {
        client.invalidateQueries(DAMAGES_QUERY_KEY);
      },
      meta: {
        action: 'add',
        object: 'kerusakan',
      },
    }
  );
};

export default useAddDamageMutation;
