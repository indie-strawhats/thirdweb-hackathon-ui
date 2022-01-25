import { ChainId } from '@usedapp/core';

export const isOnSupportedChain = (chainId: number) => {
  return chainId === ChainId.Rinkeby;
};
