import { DashboardLayout } from '@/core/layouts/dashboard';
import DamageEntryForm from '@/modules/damages/components/DamageEntryForm';
import DamageTable from '@/modules/damages/components/DamageTable';
import { Box, Button, Group, Text, Title, Tooltip } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const SuppliersPage: NextPage = () => {
  const modals = useModals();

  const { ref: headingRef, height: headingHeight } = useElementSize();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddNewDamage = () => {
    const id = modals.openModal({
      title: 'Kerusakan Baru',
      closeOnClickOutside: false,
      children: (
        <DamageEntryForm type="add" onClose={() => modals.closeModal(id)} />
      ),
    });
  };

  return (
    <>
      <Head>
        <title>Daftar Kerusakan | ReMana</title>
      </Head>

      <DashboardLayout onAdd={handleAddNewDamage} onSearch={setSearchQuery}>
        <Group ref={headingRef} position="apart" align="end">
          <div>
            <Title order={2} weight={600} mb={4}>
              Daftar Kerusakan
            </Title>
            <Text>Semua kerusakan yang terdaftar dalam toko ini.</Text>
          </div>

          <Tooltip label="A">
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => handleAddNewDamage()}
            >
              Kerusakan Baru
            </Button>
          </Tooltip>
        </Group>

        <Box sx={{ height: `calc(100vh - ${headingHeight || 65}px - 120px)` }}>
          <DamageTable searchQuery={searchQuery} />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SuppliersPage;
