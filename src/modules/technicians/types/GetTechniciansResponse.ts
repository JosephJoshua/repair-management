import PaginationMetadata from '@/core/types/PaginationMetadata';
import TechnicianTableRow from './TechnicianTableRow';

type GetTechniciansResponse = {
  result: TechnicianTableRow[];
  metadata: PaginationMetadata;
};

export default GetTechniciansResponse;
