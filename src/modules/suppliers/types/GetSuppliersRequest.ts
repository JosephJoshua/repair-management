import ListFetchParams from '@/core/types/ListFetchParams';
import SupplierTableRow from './SupplierTableRow';

type GetSuppliersRequest = {
  query: ListFetchParams<SupplierTableRow>;
};

export default GetSuppliersRequest;
