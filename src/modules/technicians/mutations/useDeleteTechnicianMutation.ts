import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { TECHNICIANS_QUERY_KEY } from '../queries/useTechniciansQuery';
import DeleteTechnicianRequest from '../types/DeleteTechnicianRequest';

export const DELETE_TECHNICIAN_MUTATION_KEY = 'delete-technician';

const useDeleteTechnicianMutation = (client: QueryClient) => {
  return useMutation(
    DELETE_TECHNICIAN_MUTATION_KEY,
    (req: DeleteTechnicianRequest) => {
      return axios.delete(`/api/technicians`, {
        params: req.query,
      });
    },
    {
      onSettled: () => {
        client.invalidateQueries(TECHNICIANS_QUERY_KEY);
      },
      meta: {
        action: 'delete',
        object: 'teknisi',
      },
    }
  );
};

export default useDeleteTechnicianMutation;
