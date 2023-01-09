import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { CONDITIONS_QUERY_KEY } from '../queries/useConditionsQuery';
import AddConditionRequest from '../types/AddConditionRequest';
import AddConditionResponse from '../types/AddConditionResponse';

export const ADD_CONDITION_MUTATION_KEY = 'add-condition';

const useAddConditionMutation = (client: QueryClient) => {
  return useMutation(
    ADD_CONDITION_MUTATION_KEY,
    async (req: AddConditionRequest) => {
      const { data } = await axios.post<AddConditionResponse>(
        '/api/conditions',
        req.body
      );

      return data.result;
    },
    {
      onSettled: () => {
        client.invalidateQueries(CONDITIONS_QUERY_KEY);
      },
      meta: {
        action: 'add',
        object: 'kondisi',
      },
    }
  );
};

export default useAddConditionMutation;
