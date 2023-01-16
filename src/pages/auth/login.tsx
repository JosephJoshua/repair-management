import {
  Button,
  Card,
  Center,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

type LoginFormValues = {
  storeSlug: string;
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const modals = useModals();
  const session = useSession();

  const form = useForm<LoginFormValues>({
    initialValues: {
      storeSlug: '',
      username: '',
      password: '',
    },
    validate: {
      storeSlug: (val) => !val && 'ID toko harus diisi',
      username: (val) => !val && 'Username harus diisi',
      password: (val) => !val && 'Password harus diisi',
    },
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const storeSlugRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session.status === 'authenticated') router.replace('/dashboard/');
  }, [session.status, router]);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    const response = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: String(router.query.callbackUrl || '/dashboard'),
    }).finally(() => setLoading(false));

    if (response?.status === 401) {
      const id = modals.openConfirmModal({
        title: 'Masuk',
        children: (
          <Text size="sm">
            Username atau password yang Anda masukkan salah! Silahkan coba lagi
            dengan data yang benar.
          </Text>
        ),
        cancelProps: { sx: { display: 'none' } },
        labels: { confirm: 'OK', cancel: null },
        onConfirm: () => modals.closeModal(id),
      });

      return;
    } else if (response?.error != null) {
      showNotification({
        title: 'Error',
        message:
          'Oops! Terjadi kesalahan dalam proses sign in. Silahkan coba lagi beberapa detik kemudian.',
        color: 'red',
      });

      return;
    }

    if (response?.url != null && !response.url.includes('login')) {
      router.replace(response.url);
    }
  };

  return (
    <>
      <Head>
        <title>Masuk | ReMana</title>
      </Head>

      <Center pt={108}>
        <Card style={{ width: 400 }} pb={25} withBorder>
          <Title
            order={1}
            size="h2"
            fw={600}
            mb="sm"
            align="center"
            variant="gradient"
            gradient={{ from: 'lava-pink.3', to: 'yellow.5', deg: 45 }}
          >
            Masuk
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="ID Toko"
                type="text"
                aria-required="true"
                withAsterisk
                ref={storeSlugRef}
                {...form.getInputProps('storeSlug')}
              />

              <TextInput
                label="Username"
                type="text"
                aria-required="true"
                withAsterisk
                {...form.getInputProps('username')}
              />

              <TextInput
                label="Password"
                type="password"
                aria-required="true"
                withAsterisk
                {...form.getInputProps('password')}
              />

              <Button type="submit" loading={isLoading}>
                Masuk
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </>
  );
};

export default LoginPage;
