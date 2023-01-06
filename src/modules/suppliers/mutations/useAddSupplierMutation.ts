import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { SUPPLIERS_QUERY_KEY } from '../queries/useSuppliersQuery';
import AddSupplierRequest from '../types/AddSupplierRequest';
import AddSupplierResponse from '../types/AddSupplierResponse';

export const ADD_SUPPLIER_MUTATION_KEY = 'add-supplier';

const useAddSupplierMutation = (client: QueryClient) => {
  return useMutation(
    ADD_SUPPLIER_MUTATION_KEY,
    async (req: AddSupplierRequest) => {
      const { data } = await axios.post<AddSupplierResponse>(
        '/api/suppliers',
        req.body
      );

      return data.result;
    },
    {
      onSettled: () => {
        client.invalidateQueries(SUPPLIERS_QUERY_KEY);
      },
    }
  );
};

export default useAddSupplierMutation;
