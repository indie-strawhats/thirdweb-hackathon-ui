import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import { AudioPlayerProvider } from '../src/providers/audio-player';
import PageLayout from '../src/layouts/page-layout';
import { ThemeProvider } from 'next-themes';
import { AppWeb3Provider } from '../src/providers/app-web3';
import { ThirdwebProvider } from '@3rdweb/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { RinkeByChainID } from '../src/constants';
import '../styles/globals.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <ThirdwebProvider
      supportedChainIds={[RinkeByChainID]}
      connectors={{
        injected: {},
      }}
    >
      <AppWeb3Provider>
        <AudioPlayerProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer />
          </ThemeProvider>
        </AudioPlayerProvider>
      </AppWeb3Provider>
    </ThirdwebProvider>
  );
}

export default MyApp;
