import ListFetchParams from '@/core/types/ListFetchParams';
import DamageTableRow from './DamageTableRow';

type GetDamagesRequest = {
  query: ListFetchParams<DamageTableRow>;
};

export default GetDamagesRequest;
