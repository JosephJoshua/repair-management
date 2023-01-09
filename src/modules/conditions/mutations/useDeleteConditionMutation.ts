import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { CONDITIONS_QUERY_KEY } from '../queries/useConditionsQuery';
import DeleteConditionRequest from '../types/DeleteConditionRequest';

export const DELETE_CONDITION_MUTATION_KEY = 'delete-condition';

const useDeleteConditionMutation = (client: QueryClient) => {
  return useMutation(
    DELETE_CONDITION_MUTATION_KEY,
    (req: DeleteConditionRequest) => {
      return axios.delete('/api/conditions', {
        params: req.query,
      });
    },
    {
      onSettled: () => {
        client.invalidateQueries(CONDITIONS_QUERY_KEY);
      },
      meta: {
        action: 'delete',
        object: 'kondisi',
      },
    }
  );
};

export default useDeleteConditionMutation;
