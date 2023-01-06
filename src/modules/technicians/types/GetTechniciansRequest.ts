import ListFetchParams from '@/core/types/ListFetchParams';
import TechnicianTableRow from './TechnicianTableRow';

type GetTechniciansRequest = {
  query: ListFetchParams<TechnicianTableRow>;
};

export default GetTechniciansRequest;
