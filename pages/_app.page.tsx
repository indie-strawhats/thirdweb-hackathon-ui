import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import { Config, DAppProvider, Rinkeby } from '@usedapp/core';
import { AudioPlayerProvider } from '../src/providers/audio-player';
import PageLayout from '../src/layouts/page-layout';
import { ThemeProvider } from 'next-themes';
import { AppWeb3Provider } from '../src/providers/app-web3';

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]:
      'https://rinkeby.infura.io/v3/29dfbac4270f4a82bfd647121ca2df13',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <AppWeb3Provider>
        <AudioPlayerProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </ThemeProvider>
        </AudioPlayerProvider>
      </AppWeb3Provider>
    </DAppProvider>
  );
}

export default MyApp;
