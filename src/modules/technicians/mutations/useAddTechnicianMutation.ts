import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { TECHNICIANS_QUERY_KEY } from '../queries/useTechniciansQuery';
import AddTechnicianRequest from '../types/AddTechnicianRequest';
import AddTechnicianResponse from '../types/AddTechnicianResponse';

export const ADD_TECHNICIAN_MUTATION_KEY = 'add-technician';

const useAddTechnicianMutation = (client: QueryClient) => {
  return useMutation(
    ADD_TECHNICIAN_MUTATION_KEY,
    async (technician: AddTechnicianRequest) => {
      const { data } = await axios.post<AddTechnicianResponse>(
        '/api/technicians',
        technician
      );

      return data.result;
    },
    {
      onSettled: () => {
        client.invalidateQueries(TECHNICIANS_QUERY_KEY);
      },
    }
  );
};

export default useAddTechnicianMutation;
