import { DataTable } from '@/components/data-table';
import { SearchBar } from '@/components/search-bar';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ColumnDef } from '@tanstack/react-table';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Head from 'next/head';
import getOS, { OS } from 'src/utils/getOS';

type TechnicianPageProps = {
  os: OS;
};

type Technician = {
  technicianId: number;
  name: string;
};

const data: Technician[] = [
  { technicianId: 1, name: 'Test 1' },
  { technicianId: 1, name: 'Test 1' },
  { technicianId: 1, name: 'Test 1' },
  { technicianId: 1, name: 'Test 1' },
];

const columns: ColumnDef<Technician>[] = [
  {
    header: 'ID',
    accessorKey: 'technicianId',
  },
  { header: 'Nama', accessorKey: 'name' },
  {
    id: 'actions',
    header: () => <span className="text-center block w-full">Aksi</span>,
    cell: () => (
      <div className="flex justify-center">
        <button className="btn btn-ghost normal-case" tabIndex={-1}>
          Edit
        </button>

        <button className="btn btn-ghost normal-case" tabIndex={-1}>
          Hapus
        </button>
      </div>
    ),
  },
];

const TechniciansPage: NextPage<TechnicianPageProps> = ({
  os,
}: TechnicianPageProps) => {
  return (
    <>
      <Head>
        <title>Daftar Teknisi | ReMana</title>
      </Head>

      <DashboardLayout>
        <SearchBar className="mb-4" os={os} />

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Daftar Teknisi</h2>
            <h3 className="mb-4">
              Semua teknisi yang terdaftar dalam toko ini.
            </h3>
          </div>

          <button type="button" className="btn btn-primary normal-case">
            Tambah Teknisi
          </button>
        </div>

        <DataTable
          className="w-full"
          columns={columns}
          data={data}
          enableSelection
          enableMultiSelect
        />
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
