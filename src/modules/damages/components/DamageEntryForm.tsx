import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconPlus } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useAddDamageMutation from '../mutations/useAddDamageMutation';
import useEditDamageMutation from '../mutations/useEditDamageMutation';

type DamageEntryFormValues = {
  name: string;
};

type DamageAddFormProps = {
  type: 'add';
  initialValues?: DamageEntryFormValues;
  damageId?: undefined;
};

type DamageEditFormProps = {
  type: 'edit';
  initialValues: DamageEntryFormValues;
  damageId: string;
};

export type DamageEntryFormProps = {
  onClose: () => void;
} & (DamageAddFormProps | DamageEditFormProps);

const DamageEntryForm: FC<DamageEntryFormProps> = ({
  onClose,
  initialValues,
  type,
  damageId,
}) => {
  const form = useForm<DamageEntryFormValues>({
    initialValues: initialValues || { name: '' },
    validate: {
      name: (val) => !val && 'Nama kerusakan harus diisi',
    },
  });

  const queryClient = useQueryClient();

  const addMutation = useAddDamageMutation(queryClient);
  const editMutation = useEditDamageMutation(queryClient);

  const handleSubmit = async (values: DamageEntryFormValues) => {
    if (type === 'add') {
      await addMutation.mutateAsync({ body: { name: values.name } });
    } else if (type === 'edit') {
      await editMutation.mutateAsync({
        body: { name: values.name, damageId },
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
        label="Nama Kerusakan"
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

export default DamageEntryForm;
