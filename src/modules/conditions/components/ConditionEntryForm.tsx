import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconPlus } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useAddConditionMutation from '../mutations/useAddConditionMutation';
import useEditConditionMutation from '../mutations/useEditConditionMutation';

type ConditionEntryFormValues = {
  name: string;
};

type ConditionAddFormProps = {
  type: 'add';
  initialValues?: ConditionEntryFormValues;
  conditionId?: undefined;
};

type ConditionEditFormProps = {
  type: 'edit';
  initialValues: ConditionEntryFormValues;
  conditionId: string;
};

export type ConditionEntryFormProps = {
  onClose: () => void;
} & (ConditionAddFormProps | ConditionEditFormProps);

const ConditionEntryForm: FC<ConditionEntryFormProps> = ({
  onClose,
  initialValues,
  type,
  conditionId,
}) => {
  const form = useForm<ConditionEntryFormValues>({
    initialValues: initialValues || { name: '' },
    validate: {
      name: (val) => !val && 'Nama kondisi harus diisi',
    },
  });

  const queryClient = useQueryClient();

  const addMutation = useAddConditionMutation(queryClient);
  const editMutation = useEditConditionMutation(queryClient);

  const handleSubmit = async (values: ConditionEntryFormValues) => {
    if (type === 'add') {
      await addMutation.mutateAsync({ body: { name: values.name } });
    } else if (type === 'edit') {
      await editMutation.mutateAsync({
        body: { name: values.name, conditionId },
      });
    }

    onClose?.();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        data-autofocus
        aria-required
        withAsterisk
        label="Nama Kondisi"
        {...form.getInputProps('name')}
      />

      <Button
        mt="sm"
        type="submit"
        fullWidth
        leftIcon={
          type === 'add' ? <IconPlus size={16} /> : <IconCheck size={16} />
        }
        loading={addMutation.isLoading || editMutation.isLoading}
      >
        {type === 'add' ? 'Tambah' : 'Simpan'}
      </Button>
    </form>
  );
};

export default ConditionEntryForm;
