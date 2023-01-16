import PaginationMetadata from '@/core/types/PaginationMetadata';
import ConditionTableRow from './ConditionTableRow';

type GetConditionsResponse = {
  result: ConditionTableRow[];
  metadata: PaginationMetadata;
  ok: boolean;
};

export default GetConditionsResponse;
