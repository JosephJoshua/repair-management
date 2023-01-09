import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { CONDITIONS_QUERY_KEY } from '../queries/useConditionsQuery';
import EditConditionRequest from '../types/EditConditionRequest';

export const EDIT_CONDITION_MUTATION_KEY = 'edit-condition';

const useEditConditionMutation = (client: QueryClient) => {
  return useMutation(
    EDIT_CONDITION_MUTATION_KEY,
    (req: EditConditionRequest) => {
      return axios.put('/api/conditions', req.body);
    },
    {
      onSettled: () => {
        client.invalidateQueries(CONDITIONS_QUERY_KEY);
      },
      meta: {
        action: 'edit',
        object: 'kondisi',
      },
    }
  );
};

export default useEditConditionMutation;
