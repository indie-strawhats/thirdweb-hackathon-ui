import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import { AudioPlayerProvider } from '../src/providers/audio-player';
import PageLayout from '../src/layouts/page-layout';
import { ThemeProvider } from 'next-themes';
import { AppWeb3Provider } from '../src/providers/app-web3';
import { ThirdwebProvider } from '@3rdweb/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThirdwebProvider
      supportedChainIds={[4]}
      connectors={{
        injected: {},
      }}
    >
      <AppWeb3Provider>
        <AudioPlayerProvider>
          <ThemeProvider attribute='class' defaultTheme='light'>
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </AudioPlayerProvider>
      </AppWeb3Provider>
    </ThirdwebProvider>
  );
}

export default MyApp;
