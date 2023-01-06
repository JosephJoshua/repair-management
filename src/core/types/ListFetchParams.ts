import { SortDirection } from './SortDirection';

type ListFetchParams<T> = {
  query?: string;
  offset?: number;
  limit?: number;
  sortBy?: keyof T;
  sortDirection?: SortDirection;
};

export default ListFetchParams;
