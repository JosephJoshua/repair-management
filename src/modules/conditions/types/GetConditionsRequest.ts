import ListFetchParams from '@/core/types/ListFetchParams';
import ConditionTableRow from './ConditionTableRow';

type GetConditionsRequest = {
  query: ListFetchParams<ConditionTableRow>;
};

export default GetConditionsRequest;
