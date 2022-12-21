import { Button } from '@/components/button';
import { DataTable } from '@/components/data-table';
import { SearchBar } from '@/components/search-bar';
import DashboardLayout from '@/layouts/DashboardLayout';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Head from 'next/head';
import { useAsyncList } from 'react-stately';
import getOS, { OS } from 'src/utils/getOS';

type TechnicianPageProps = {
  os: OS;
};

type Technician = {
  technicianId: number;
  name: string;
};

const columns = [
  { name: 'ID', key: 'technicianId' },
  { name: 'Nama', key: 'name' },
  { name: '', key: 'actions', allowsSorting: false },
];

const data: Technician[] = Array.from({ length: 20 }).map((_, idx) => ({
  technicianId: idx,
  name: `Test ${idx}`,
}));

const TechniciansPage: NextPage<TechnicianPageProps> = ({
  os,
}: TechnicianPageProps) => {
  const list = useAsyncList({
    load: async () => {
      return {
        items: data,
      };
    },
    sort: async ({ items, sortDescriptor }) => {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column as keyof Technician];
          const second = b[sortDescriptor.column as keyof Technician];

          let result = first
            .toString()
            .localeCompare(second.toString(), undefined, { numeric: true });

          if (sortDescriptor.direction === 'descending') result *= -1;
          return result;
        }),
      };
    },
  });

  return (
    <>
      <Head>
        <title>Daftar Teknisi | ReMana</title>
      </Head>

      <DashboardLayout>
        <div className="flex justify-end">
          <SearchBar className="mb-4" os={os} />
        </div>

        <div className="card mt-4 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">Daftar Teknisi</h2>
              <h3>Semua teknisi yang terdaftar dalam toko ini.</h3>
            </div>

            <Button>Tambah Teknisi</Button>
          </div>

          <DataTable
            aria-label="Teknisi"
            className="w-full"
            selectionMode="multiple"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            disabledKeys={['actions', '1']}
          >
            <DataTable.Header columns={columns}>
              {(column) => (
                <DataTable.Column allowsSorting={column.allowsSorting ?? true}>
                  {column.name}
                </DataTable.Column>
              )}
            </DataTable.Header>

            <DataTable.Body items={list.items}>
              {(item) => (
                <DataTable.Row key={item.technicianId}>
                  <DataTable.Cell>{item.technicianId}</DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>
                    <div className="flex justify-end pr-4">
                      <Button variant="flat" className="px-4">
                        Edit
                      </Button>
                    </div>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable.Body>
          </DataTable>
        </div>
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  TechnicianPageProps
> = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<TechnicianPageProps>> => {
  const userAgent = ctx.req.headers['user-agent'];
  if (userAgent == undefined) return { props: { os: OS.unknown } };

  return {
    props: {
      os: getOS(userAgent),
    },
  };
};

export default TechniciansPage;
