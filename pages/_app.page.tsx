import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import { AudioPlayerProvider } from '../src/providers/audio-player';
import PageLayout from '../src/layouts/page-layout';
import { ThemeProvider } from 'next-themes';
import { AppWeb3Provider } from '../src/providers/app-web3';
import { ThirdwebProvider } from '@3rdweb/react';

function MyApp({ Component, pageProps }: AppProps) {
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
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </ThemeProvider>
        </AudioPlayerProvider>
      </AppWeb3Provider>
    </ThirdwebProvider>
  );
}

export default MyApp;
