import TechnicianTableRow from './TechnicianTableRow';

type GetTechniciansResponse = {
  result: TechnicianTableRow[];
  metadata: {
    total_count: number;
    limit: number;
    offset: number;
  };
};

export default GetTechniciansResponse;
