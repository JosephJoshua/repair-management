import {
  ColorScheme,
  ColorSchemeProvider,
  KbdProps,
  MantineProvider,
  MantineTheme,
  MantineThemeOverride,
  TextInputProps,
  TooltipProps,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { ModalSettings } from '@mantine/modals/lib/context';
import { Poppins, Ubuntu_Mono } from '@next/font/google';
import { AppProps } from 'next/app';
import Head from 'next/head';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'auto',
});

const ubuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'auto',
});

const defaultKbdProps: Partial<KbdProps> = {
  styles: {
    root: {
      minWidth: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
  },
};

const defaultTextInputProps: Partial<TextInputProps> = {
  styles: (theme) => ({
    error: {
      fontWeight: 500,
      color: theme.colors.red[7],
    },
  }),
};

const defaultTooltipProps: Partial<TooltipProps> = {
  styles: (theme) => ({ tooltip: { fontSize: theme.fontSizes.xs } }),
};

const defaultModalProps: ModalSettings = {
  styles: (theme: MantineTheme) => ({
    title: { fontWeight: 600 },
    close: { color: theme.colorScheme === 'dark' ? theme.white : theme.black },
  }),
  overflow: 'outside',
  centered: true,
};

const theme: MantineThemeOverride = {
  colors: {
    'lava-pink': [
      '#FAE7E9',
      '#F8BDC5',
      '#FF8E9E',
      '#F07687',
      '#DD6476',
      '#C95868',
      '#B54F5E',
      '#9C4F5A',
      '#854E56',
    ],
  },
  primaryColor: 'lava-pink',
  primaryShade: 3,
  defaultRadius: 'sm',
  fontFamily: poppins.style.fontFamily,
  fontFamilyMonospace: ubuntuMono.style.fontFamily,
  headings: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    Kbd: defaultKbdProps,
    TextInput: defaultTextInputProps,
    Tooltip: defaultTooltipProps,
  },
};

const App = ({ Component, pageProps }: AppProps) => {
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
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
