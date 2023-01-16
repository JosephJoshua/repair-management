import PaginationMetadata from '@/core/types/PaginationMetadata';
import SupplierTableRow from './SupplierTableRow';

type GetSuppliersResponse = {
  result: SupplierTableRow[];
  metadata: PaginationMetadata;
  ok: boolean;
};

export default GetSuppliersResponse;
