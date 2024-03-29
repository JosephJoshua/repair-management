import { defaultModalProps } from '@/core/mantine/defaultProps';
import theme from '@/core/mantine/theme';
import MutationMeta, {
  MutationActionMessages,
} from '@/core/types/MutationMeta';
import {
  ColorScheme,
  ColorSchemeProvider,
  Group,
  MantineProvider,
  UnstyledButton,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import {
  hideNotification,
  NotificationsProvider,
  showNotification,
} from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (_, query) => {
            const id = 'react-query-error' + Date.now() + Math.random() * 1000;

            if (query.state.data !== undefined) {
              showNotification({
                title: 'Terjadi kesalahan',
                id,
                message: (
                  <Group spacing={4}>
                    <span>Gagal mendapatkan data!</span>

                    <UnstyledButton
                      sx={(theme) => ({
                        fontSize: theme.fontSizes.sm,
                        color: theme.colors[theme.primaryColor][4],
                        '&:hover': {
                          color: theme.colors[theme.primaryColor][2],
                        },
                      })}
                      onClick={() => {
                        query.fetch();
                        hideNotification(id);
                      }}
                    >
                      Coba Kembali
                    </UnstyledButton>
                  </Group>
                ),
                color: 'red.6',
                autoClose: 10 * 1_000,
              });
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (_1, _2, _3, mutation) => {
            const id =
              'react-mutation-error' + Date.now() + Math.random() * 1000;

            const meta = mutation.meta as MutationMeta;
            const message = `Gagal ${MutationActionMessages[meta.action]} ${
              meta.object
            }.`;

            showNotification({
              title: 'Terjadi Kesalahan',
              id,
              message: (
                <Group spacing={4}>
                  <span>{message}</span>

                  <UnstyledButton
                    sx={(theme) => ({
                      fontSize: theme.fontSizes.sm,
                      color: theme.colors[theme.primaryColor][4],
                      '&:hover': {
                        color: theme.colors[theme.primaryColor][2],
                      },
                    })}
                    onClick={() => {
                      mutation.execute();
                      hideNotification(id);
                    }}
                  >
                    Coba Kembali
                  </UnstyledButton>
                </Group>
              ),
            });
          },
        }),
      })
  );

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (val: ColorScheme | undefined) => {
    setColorScheme(val || (colorScheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                ...theme,
                colorScheme,
              }}
            >
              <ModalsProvider modalProps={defaultModalProps}>
                <NotificationsProvider>
                  <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                  </Hydrate>
                  <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                  />
                </NotificationsProvider>
              </ModalsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
