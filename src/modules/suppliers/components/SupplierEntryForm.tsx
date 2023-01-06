import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconPlus } from '@tabler/icons';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useAddSupplierMutation from '../mutations/useAddSupplierMutation';
import useEditSupplierMutation from '../mutations/useEditSupplierMutation';

type SupplierEntryFormValues = {
  name: string;
};

type SupplierAddFormProps = {
  type: 'add';
  initialValues?: SupplierEntryFormValues;
  supplierId?: undefined;
};

type SupplierEditFormProps = {
  type: 'edit';
  initialValues: SupplierEntryFormValues;
  supplierId: string;
};

export type SupplierEntryFormProps = {
  onClose: () => void;
} & (SupplierAddFormProps | SupplierEditFormProps);

const SupplierEntryForm: FC<SupplierEntryFormProps> = ({
  onClose,
  initialValues,
  type,
  supplierId,
}) => {
  const form = useForm<SupplierEntryFormValues>({
    initialValues: initialValues || { name: '' },
    validate: {
      name: (val) => !val && 'Nama supplier harus diisi',
    },
  });

  const queryClient = useQueryClient();

  const addMutation = useAddSupplierMutation(queryClient);
  const editMutation = useEditSupplierMutation(queryClient);

  const handleSubmit = async (values: SupplierEntryFormValues) => {
    if (type === 'add') {
      await addMutation.mutateAsync({ body: { name: values.name } });
    } else if (type === 'edit') {
      await editMutation.mutateAsync({
        body: { name: values.name, supplierId },
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
        label="Nama Supplier"
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

export default SupplierEntryForm;
