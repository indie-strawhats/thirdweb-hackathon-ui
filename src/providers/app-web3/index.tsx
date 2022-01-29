import { useWeb3 } from '@3rdweb/hooks';
import { BundleDropModule, ThirdwebSDK } from '@3rdweb/sdk';
import { createContext, useMemo, useState } from 'react';

export interface IAppWeb3Context {
  sdk: ThirdwebSDK | undefined;
  dropBundleModule: BundleDropModule | undefined;
}

export const AppWeb3Context = createContext<IAppWeb3Context>({
  sdk: undefined,
  dropBundleModule: undefined,
});

export const AppWeb3Provider = ({ children }: any) => {
  const { provider } = useWeb3();

  const sdk = useMemo(
    () => (provider ? new ThirdwebSDK(provider?.getSigner()) : undefined),
    [provider]
  );

  const dropBundleModule = useMemo(
    () =>
      sdk
        ? sdk.getBundleDropModule('0x9dba0b76852c23176FaAc6082491e2138FfF2EDa')
        : undefined,
    [sdk]
  );

  const value: IAppWeb3Context = {
    sdk,
    dropBundleModule,
  };

  return (
    <AppWeb3Context.Provider value={value}>{children}</AppWeb3Context.Provider>
  );
};
