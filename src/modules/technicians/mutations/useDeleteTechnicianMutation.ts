import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { TECHNICIANS_QUERY_KEY } from '../queries/useTechniciansQuery';

export const DELETE_TECHNICIAN_MUTATION_KEY = 'delete-technician';

const useDeleteTechnicianMutation = (client: QueryClient) => {
  return useMutation(
    DELETE_TECHNICIAN_MUTATION_KEY,
    (id: string) => {
      return axios.delete(`/api/technicians`, {
        params: {
          technicianId: id,
        },
      });
    },
    {
      onSettled: () => {
        client.invalidateQueries(TECHNICIANS_QUERY_KEY);
      },
    }
  );
};

export default useDeleteTechnicianMutation;
