import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { TECHNICIANS_QUERY_KEY } from '../queries/useTechniciansQuery';
import EditTechnicianRequest from '../types/EditTechnicianRequest';

export const EDIT_TECHNICIAN_MUTATION_KEY = 'edit-technician';

const useEditTechnicianMutation = (client: QueryClient) => {
  return useMutation(
    EDIT_TECHNICIAN_MUTATION_KEY,
    (req: EditTechnicianRequest) => {
      return axios.put('/api/technicians', req.body);
    },
    {
      onSettled: () => {
        client.invalidateQueries(TECHNICIANS_QUERY_KEY);
      },
    }
  );
};

export default useEditTechnicianMutation;
