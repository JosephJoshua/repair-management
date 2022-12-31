import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconPlus } from '@tabler/icons';
import { FC } from 'react';

type TechnicianEntryFormValues = {
  name: string;
};

type TechnicianAddFormProps = {
  type: 'add';
  initialValues?: TechnicianEntryFormValues;
  technicianId?: undefined;
};

type TechnicianEditFormProps = {
  type: 'edit';
  initialValues: TechnicianEntryFormValues;
  technicianId: string;
};

export type TechnicianEntryFormProps = {
  onClose?: () => void;
} & (TechnicianAddFormProps | TechnicianEditFormProps);

const TechnicianEntryForm: FC<TechnicianEntryFormProps> = ({
  onClose,
  initialValues,
  type,
  technicianId,
}) => {
  const form = useForm<TechnicianEntryFormValues>({
    initialValues: initialValues || { name: '' },
    validate: {
      name: (val) => !val && 'Nama teknisi harus diisi',
    },
  });

  const handleSubmit = (values: TechnicianEntryFormValues) => {
    console.log(type, values, technicianId);
    onClose?.();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        data-autofocus
        aria-required
        withAsterisk
        label="Nama Teknisi"
        {...form.getInputProps('name')}
      />

      <Button
        mt="sm"
        type="submit"
        fullWidth
        leftIcon={
          type === 'add' ? <IconPlus size={16} /> : <IconCheck size={16} />
        }
      >
        {type === 'add' ? 'Tambah' : 'Simpan'}
      </Button>
    </form>
  );
};

export default TechnicianEntryForm;
