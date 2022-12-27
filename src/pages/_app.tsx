import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
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
    Kbd: {
      styles: {
        root: {
          minWidth: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
        },
      },
    },
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
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
