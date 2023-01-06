import { DeleteButton } from '@/core/components/delete-button';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useDeleteSupplierMutation from '../mutations/useDeleteSupplierMutation';
import SupplierTableRow from '../types/SupplierTableRow';
import SupplierEntryForm from './SupplierEntryForm';

export type SupplierTableActionsProps = {
  supplier: SupplierTableRow;
};

const SupplierTableActions: FC<SupplierTableActionsProps> = ({ supplier }) => {
  const modals = useModals();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteSupplierMutation(queryClient);

  const handleEditSupplier = () => {
    const id = modals.openModal({
      title: 'Ubah Supplier',
      closeOnClickOutside: false,
      children: (
        <SupplierEntryForm
          type="edit"
          supplierId={supplier.supplierId.toString()}
          initialValues={supplier}
          onClose={() => modals.closeModal(id)}
        />
      ),
    });
  };

  return (
    <Group spacing={4} pr={4} position="center" noWrap>
      <Tooltip label="Ubah">
        <ActionIcon color="blue" onClick={() => handleEditSupplier()}>
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>

      <DeleteButton
        message="Yakin ingin menghapus supplier ini?"
        onDelete={() =>
          deleteMutation.mutate({
            query: { supplierId: supplier.supplierId },
          })
        }
        isDeleting={deleteMutation.isLoading}
      />
    </Group>
  );
};

export default SupplierTableActions;
