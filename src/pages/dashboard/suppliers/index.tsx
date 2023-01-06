import { DashboardLayout } from '@/core/layouts/dashboard';
import SupplierEntryForm from '@/modules/suppliers/components/SupplierEntryForm';
import SupplierTable from '@/modules/suppliers/components/SupplierTable';
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

  const handleAddNewSupplier = () => {
    const id = modals.openModal({
      title: 'Supplier Baru',
      closeOnClickOutside: false,
      children: (
        <SupplierEntryForm type="add" onClose={() => modals.closeModal(id)} />
      ),
    });
  };

  return (
    <>
      <Head>
        <title>Daftar Supplier | ReMana</title>
      </Head>

      <DashboardLayout onAdd={handleAddNewSupplier} onSearch={setSearchQuery}>
        <Group ref={headingRef} position="apart" align="end">
          <div>
            <Title order={2} weight={600} mb={4}>
              Daftar Supplier
            </Title>
            <Text>Semua supplier yang terdaftar dalam toko ini.</Text>
          </div>

          <Tooltip label="A">
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => handleAddNewSupplier()}
            >
              Supplier Baru
            </Button>
          </Tooltip>
        </Group>

        <Box sx={{ height: `calc(100vh - ${headingHeight || 65}px - 120px)` }}>
          <SupplierTable searchQuery={searchQuery} />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SuppliersPage;
