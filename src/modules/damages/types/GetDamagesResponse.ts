import PaginationMetadata from '@/core/types/PaginationMetadata';
import DamageTableRow from './DamageTableRow';

type GetDamagesResponse = {
  result: DamageTableRow[];
  metadata: PaginationMetadata;
};

export default GetDamagesResponse;
