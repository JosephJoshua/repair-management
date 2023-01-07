import { DeleteButton } from '@/core/components/delete-button';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useDeleteDamageMutation from '../mutations/useDeleteDamageMutation';
import DamageTableRow from '../types/DamageTableRow';
import DamageEntryForm from './DamageEntryForm';

export type DamageTableActionsProps = {
  damage: DamageTableRow;
};

const DamageTableActions: FC<DamageTableActionsProps> = ({ damage }) => {
  const modals = useModals();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteDamageMutation(queryClient);

  const handleEditDamage = () => {
    const id = modals.openModal({
      title: 'Ubah Kerusakan',
      closeOnClickOutside: false,

      children: (
        <DamageEntryForm
          type="edit"
          damageId={damage.damageId.toString()}
          initialValues={damage}
          onClose={() => modals.closeModal(id)}
        />
      ),
    });
  };

  return (
    <Group spacing={4} pr={4} position="center" noWrap>
      <Tooltip label="Ubah">
        <ActionIcon color="blue" onClick={() => handleEditDamage()}>
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>

      <DeleteButton
        message="Yakin ingin menghapus kerusakan ini?"
        onDelete={() =>
          deleteMutation.mutate({
            query: { damageId: damage.damageId },
          })
        }
        isDeleting={deleteMutation.isLoading}
      />
    </Group>
  );
};

export default DamageTableActions;
