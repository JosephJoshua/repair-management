import '@/styles/globals.css';
import { Poppins } from '@next/font/google';
import type { AppProps } from 'next/app';
import { SSRProvider } from 'react-aria';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'auto',
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SSRProvider>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </SSRProvider>
  );
};

export default App;
