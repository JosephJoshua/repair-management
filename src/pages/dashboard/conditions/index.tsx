import { DashboardLayout } from '@/core/layouts/dashboard';
import ConditionEntryForm from '@/modules/conditions/components/ConditionEntryForm';
import ConditionTable from '@/modules/conditions/components/ConditionTable';
import { Box, Button, Group, Text, Title, Tooltip } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const ConditionsPage: NextPage = () => {
  const modals = useModals();

  const { ref: headingRef, height: headingHeight } = useElementSize();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddNewCondition = () => {
    const id = modals.openModal({
      title: 'Kondisi Baru',
      closeOnClickOutside: false,
      children: (
        <ConditionEntryForm type="add" onClose={() => modals.closeModal(id)} />
      ),
    });
  };

  return (
    <>
      <Head>
        <title>Daftar Kondisi | ReMana</title>
      </Head>

      <DashboardLayout onAdd={handleAddNewCondition} onSearch={setSearchQuery}>
        <Group ref={headingRef} position="apart" align="end">
          <div>
            <Title order={2} weight={600} mb={4}>
              Daftar Kondisi
            </Title>
            <Text>Semua kondisi HP yang terdaftar dalam toko ini.</Text>
          </div>

          <Tooltip label="A">
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => handleAddNewCondition()}
            >
              Kondisi Baru
            </Button>
          </Tooltip>
        </Group>

        <Box sx={{ height: `calc(100vh - ${headingHeight || 65}px - 120px)` }}>
          <ConditionTable searchQuery={searchQuery} />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default ConditionsPage;
