import { EmptyIndicator } from '@/core/components/empty-indicator';
import { FetchErrorIndicator } from '@/core/components/fetch-error-indicator/';
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from 'mantine-datatable';
import { FC, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { prefetchDamages, useDamagesQuery } from '../queries/useDamagesQuery';
import DamageTableRow from '../types/DamageTableRow';
import DamageTableActions from './DamageTableActions';

export type DamageTableProps = {
  searchQuery?: string;
};

const PAGE_SIZE = 15;

const columns: DataTableColumn<DamageTableRow>[] = [
  {
    accessor: 'damageId',
    hidden: true,
  },
  {
    accessor: 'index',
    title: '#',
    width: '8%',
    textAlignment: 'center',
    render: (_, idx) => idx + 1,
  },
  { accessor: 'name', title: 'Nama', width: '100%', sortable: true },
  {
    accessor: 'createdAt',
    title: 'Tanggal Pembuatan',
    sortable: true,
    render: (damage) => damage.createdAt.toLocaleDateString(),
  },
  {
    accessor: 'actions',
    title: 'Aksi',
    textAlignment: 'center',
    cellsSx: { paddingLeft: 16, paddingRight: 16 },
    render: (damage) => <DamageTableActions damage={damage} />,
  },
];

const DamageTable: FC<DamageTableProps> = ({
  searchQuery: searchQueryProp,
}) => {
  const [page, setPage] = useState<number>(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'createdAt',
    direction: 'asc',
  });

  const [searchQuery, setSearchQuery] = useState<string>(searchQueryProp ?? '');

  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, isPreviousData, refetch } =
    useDamagesQuery({
      query: {
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
        sortBy: sortStatus.columnAccessor as keyof DamageTableRow,
        sortDirection: sortStatus.direction,
        query: searchQuery,
      },
    });

  useEffect(() => {
    if (data == null) return;

    const { offset, limit, total_count } = data.metadata;
    const hasMore = offset + limit < total_count;

    if (!isPreviousData && hasMore) {
      prefetchDamages(queryClient, {
        query: {
          offset: PAGE_SIZE * page,
          limit: PAGE_SIZE,
          sortBy: sortStatus.columnAccessor as keyof DamageTableRow,
          sortDirection: sortStatus.direction,
          query: searchQuery,
        },
      });
    }
  }, [
    data,
    isPreviousData,
    page,
    sortStatus.columnAccessor,
    sortStatus.direction,
    queryClient,
    searchQuery,
  ]);

  useEffect(() => {
    setSearchQuery(searchQueryProp ?? '');
    setPage(1);
  }, [searchQueryProp]);

  if (isError)
    return <FetchErrorIndicator onRefetch={refetch} error={error as object} />;

  return (
    <DataTable
      mt="md"
      fetching={isFetching}
      sortStatus={sortStatus}
      page={page}
      recordsPerPage={PAGE_SIZE}
      totalRecords={data?.metadata.total_count}
      onPageChange={setPage}
      onSortStatusChange={setSortStatus}
      columns={columns}
      records={data?.result}
      noRecordsIcon={<EmptyIndicator />}
      noRecordsText="Tidak dapat menemukan data"
      borderRadius="md"
      verticalSpacing="sm"
      horizontalSpacing="md"
      idAccessor="damageId"
      striped
      withBorder
    />
  );
};

export default DamageTable;
