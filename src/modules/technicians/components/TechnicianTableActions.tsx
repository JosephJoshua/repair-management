import { DeleteButton } from '@/core/components/delete-button';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useDeleteTechnicianMutation from '../mutations/useDeleteTechnicianMutation';
import TechnicianTableRow from '../types/TechnicianTableRow';
import TechnicianEntryForm from './TechnicianEntryForm';

export type TechnicianTableActionsProps = {
  technician: TechnicianTableRow;
};

const TechnicianTableActions: FC<TechnicianTableActionsProps> = ({
  technician,
}) => {
  const modals = useModals();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteTechnicianMutation(queryClient);

  const handleEditTechnician = () => {
    const id = modals.openModal({
      title: 'Ubah Teknisi',
      closeOnClickOutside: false,

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

  return (
    <Group spacing={4} pr={4} position="center" noWrap>
      <Tooltip label="Ubah">
        <ActionIcon color="blue" onClick={() => handleEditTechnician()}>
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>

      <DeleteButton
        message="Yakin ingin menghapus teknisi ini?"
        onDelete={() => deleteMutation.mutate(technician.technicianId)}
        isDeleting={deleteMutation.isLoading}
      />
    </Group>
  );
};

export default TechnicianTableActions;
