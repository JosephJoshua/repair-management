import { TechnicianEntryForm } from '@/components/features/technicians/entry-form';
import { DeleteButton } from '@/components/shared/delete-button/';
import { EmptyIndicator } from '@/components/shared/empty-indicator/';
import { DashboardLayout } from '@/layouts/dashboard';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { IconEdit, IconPlus } from '@tabler/icons';
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from 'mantine-datatable';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import sortBy from 'src/utils/sortBy';

type Technician = {
  technicianId: number;
  name: string;
};

const data: Technician[] = Array.from({ length: 20 }).map((_, idx) => ({
  technicianId: idx,
  name: `Test ${idx}`,
}));

const TechniciansPage: NextPage = () => {
  const modals = useModals();

  const { ref: headingRef, height: headingHeight } = useElementSize();
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'technicianId',
    direction: 'asc',
  });

  const [records, setRecords] = useState<Technician[]>(
    sortBy(data, 'technicianId', 'asc')
  );

  const handleSortStatusChange = useCallback((newVal: DataTableSortStatus) => {
    setRecords((r) =>
      sortBy(r, newVal.columnAccessor as keyof Technician, newVal.direction)
    );

    setSortStatus(newVal);
  }, []);

  const handleAddNewTechnician = () => {
    const id = modals.openModal({
      title: 'Teknisi Baru',
      children: (
        <TechnicianEntryForm type="add" onClose={() => modals.closeModal(id)} />
      ),
    });
  };

  const handleEditTechnician = (technician: Technician) => {
    const id = modals.openModal({
      title: 'Ubah Teknisi',
      children: (
        <TechnicianEntryForm
          type="edit"
          technicianId={technician.technicianId.toString()}
          initialValues={technician}
          onClose={() => modals.closeModal(id)}
        />
      ),
    });
  };

  const columns: DataTableColumn<Technician>[] = [
    {
      accessor: 'technicianId',
      title: '#',
      width: '8%',
      textAlignment: 'center',
      sortable: true,
    },
    { accessor: 'name', title: 'Nama', width: '100%', sortable: true },
    {
      accessor: 'actions',
      title: 'Aksi',
      textAlignment: 'center',
      cellsSx: { paddingLeft: 16, paddingRight: 16 },
      render: (technician) => (
        <Group spacing={4} pr={4} position="center" noWrap>
          <Tooltip label="Ubah">
            <ActionIcon
              color="blue"
              onClick={() => handleEditTechnician(technician)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <DeleteButton
            message="Yakin ingin menghapus teknisi ini?"
            onDelete={() => console.log('delete')}
          />
        </Group>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Daftar Teknisi | ReMana</title>
      </Head>

      <DashboardLayout onAdd={handleAddNewTechnician}>
        <Group ref={headingRef} position="apart" align="end">
          <div>
            <Title order={2} weight={600} mb={4}>
              Daftar Teknisi
            </Title>
            <Text>Semua teknisi yang terdaftar dalam toko ini.</Text>
          </div>

          <Tooltip label="A">
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => handleAddNewTechnician()}
            >
              Teknisi Baru
            </Button>
          </Tooltip>
        </Group>

        <Box sx={{ height: `calc(100vh - ${headingHeight || 65}px - 120px)` }}>
          <DataTable
            mt="md"
            sortStatus={sortStatus}
            onSortStatusChange={handleSortStatusChange}
            columns={columns}
            records={records}
            noRecordsIcon={<EmptyIndicator />}
            noRecordsText="Tidak dapat menemukan data"
            borderRadius="md"
            verticalSpacing="sm"
            horizontalSpacing="md"
            idAccessor="technicianId"
            striped
            withBorder
          />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default TechniciansPage;
