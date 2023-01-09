import { DeleteButton } from '@/core/components/delete-button';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useDeleteConditionMutation from '../mutations/useDeleteConditionMutation';
import ConditionTableRow from '../types/ConditionTableRow';
import ConditionEntryForm from './ConditionEntryForm';

export type ConditionTableActionsProps = {
  condition: ConditionTableRow;
};

const DamageTableActions: FC<ConditionTableActionsProps> = ({ condition }) => {
  const modals = useModals();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteConditionMutation(queryClient);

  const handleEditCondition = () => {
    const id = modals.openModal({
      title: 'Ubah Kondisi',
      closeOnClickOutside: false,

      children: (
        <ConditionEntryForm
          type="edit"
          conditionId={condition.conditionId.toString()}
          initialValues={condition}
          onClose={() => modals.closeModal(id)}
        />
      ),
    });
  };

  return (
    <Group spacing={4} pr={4} position="center" noWrap>
      <Tooltip label="Ubah">
        <ActionIcon color="blue" onClick={() => handleEditCondition()}>
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>

      <DeleteButton
        message="Yakin ingin menghapus kondisi ini?"
        onDelete={() =>
          deleteMutation.mutate({
            query: { conditionId: condition.conditionId },
          })
        }
        isDeleting={deleteMutation.isLoading}
      />
    </Group>
  );
};

export default DamageTableActions;
