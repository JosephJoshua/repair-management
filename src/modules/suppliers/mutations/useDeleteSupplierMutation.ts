import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { SUPPLIERS_QUERY_KEY } from '../queries/useSuppliersQuery';
import DeleteSupplierRequest from '../types/DeleteTechnicianRequest';

export const DELETE_SUPPLIER_MUTATION_KEY = 'delete-supplier';

const useDeleteSupplierMutation = (client: QueryClient) => {
  return useMutation(
    DELETE_SUPPLIER_MUTATION_KEY,
    (req: DeleteSupplierRequest) => {
      return axios.delete(`/api/suppliers`, {
        params: req.query,
      });
    },
    {
      onSettled: () => {
        client.invalidateQueries(SUPPLIERS_QUERY_KEY);
      },
      meta: {
        action: 'delete',
        object: 'supplier',
      },
    }
  );
};

export default useDeleteSupplierMutation;
