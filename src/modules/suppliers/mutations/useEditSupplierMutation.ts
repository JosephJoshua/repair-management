import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { SUPPLIERS_QUERY_KEY } from '../queries/useSuppliersQuery';
import EditSupplierRequest from '../types/EditSupplierRequest';

export const EDIT_SUPPLIER_MUTATION_KEY = 'edit-supplier';

const useEditSupplierMutation = (client: QueryClient) => {
  return useMutation(
    EDIT_SUPPLIER_MUTATION_KEY,
    (req: EditSupplierRequest) => {
      return axios.put('/api/suppliers', req.body);
    },
    {
      onSettled: () => {
        client.invalidateQueries(SUPPLIERS_QUERY_KEY);
      },
    }
  );
};

export default useEditSupplierMutation;
