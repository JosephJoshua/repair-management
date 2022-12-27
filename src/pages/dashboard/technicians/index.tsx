import { DashboardLayout } from '@/layouts/dashboard';
import { NextPage } from 'next';
import Head from 'next/head';

// type Technician = {
//   technicianId: number;
//   name: string;
// };

// const data: Technician[] = Array.from({ length: 20 }).map((_, idx) => ({
//   technicianId: idx,
//   name: `Test ${idx}`,
// }));

const TechniciansPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daftar Teknisi | ReMana</title>
      </Head>
      <DashboardLayout>test</DashboardLayout>
    </>
  );
};

export default TechniciansPage;
