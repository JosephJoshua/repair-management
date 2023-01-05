import { DashboardLayout } from '@/core/layouts/dashboard';
import TechnicianEntryForm from '@/modules/technicians/components/TechnicianEntryForm';
import TechnicianTable from '@/modules/technicians/components/TechnicianTable';
import { Box, Button, Group, Text, Title, Tooltip } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const TechniciansPage: NextPage = () => {
  const modals = useModals();

  const { ref: headingRef, height: headingHeight } = useElementSize();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddNewTechnician = () => {
    const id = modals.openModal({
      title: 'Teknisi Baru',
      children: (
        <TechnicianEntryForm type="add" onClose={() => modals.closeModal(id)} />
      ),
    });
  };

  return (
    <>
      <Head>
        <title>Daftar Teknisi | ReMana</title>
      </Head>

      <DashboardLayout onAdd={handleAddNewTechnician} onSearch={setSearchQuery}>
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
          <TechnicianTable searchQuery={searchQuery} />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default TechniciansPage;
