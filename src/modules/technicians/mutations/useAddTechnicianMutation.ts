import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
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
        client.invalidateQueries('technicians');
      },
    }
  );
};

export default useAddTechnicianMutation;
