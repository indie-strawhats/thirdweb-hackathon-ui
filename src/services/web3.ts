import { BundleDropModule } from '@3rdweb/sdk';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';
import { IAudiobookData } from '../models/audiobook';

export const getAllAudiobooks = async (dropBundleModule: BundleDropModule) => {
  const response = await dropBundleModule?.getAll();

  const claimConditionsPromiseArr = response?.map((item) =>
    dropBundleModule?.getActiveClaimCondition(item.metadata.id),
  ) as Promise<any>[];

  const claimConditions = await Promise.all([...claimConditionsPromiseArr]);

  const balancePromiseArr = response?.map((item) =>
    dropBundleModule?.balance(item.metadata.id),
  ) as Promise<any>[];

  const balances = await Promise.all([...balancePromiseArr]);

  const allNFTs = response?.map<IAudiobookData>((item, index) => ({
    id: item.metadata.id,
    name: item.metadata.name as string,
    desc: item.metadata.description as string,
    properties: item.metadata.properties,
    image: item.metadata.image as string,
    uri: item.metadata.uri,
    price: claimConditions[index].currencyMetadata.displayValue,
    currencyUnit: 'ETH',
    balance: (balances[index] as BigNumber).toNumber(),
  }));

  return allNFTs;
};

export const getClaimedAudiobooks = async (dropBundleModule: BundleDropModule) => {
  const ownedABResponse = await dropBundleModule?.getOwned();

  const claimConditionsPromiseArr = ownedABResponse?.map((item) =>
    dropBundleModule?.getActiveClaimCondition(item.metadata.id),
  ) as Promise<any>[];

  const claimConditions = await Promise.all([...claimConditionsPromiseArr]);

  const balancePromiseArr = ownedABResponse?.map((item) =>
    dropBundleModule?.balance(item.metadata.id),
  ) as Promise<any>[];

  const balances = await Promise.all([...balancePromiseArr]);

  const audiobookUrlsResponse = await fetch('/api/get-audiobooks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenIds: ownedABResponse?.map((item) => item.metadata.id),
    }),
  });

  const audiobookUrls = await audiobookUrlsResponse.json();

  const claimedNFTs = ownedABResponse?.map<IAudiobookData>((item, index) => ({
    id: item.metadata.id,
    name: item.metadata.name as string,
    desc: item.metadata.description as string,
    properties: item.metadata.properties,
    image: item.metadata.image as string,
    uri: item.metadata.uri as string,
    price: claimConditions[index].currencyMetadata.displayValue,
    currencyUnit: 'ETH',
    balance: (balances[index] as BigNumber).toNumber(),
    fileUrl: audiobookUrls[item.metadata.id],
  }));

  return claimedNFTs;
};

export const getAudiobook = async (dropBundleModule: BundleDropModule, tokenId: string) => {
  const response = await dropBundleModule?.get(tokenId);

  const claimConditions = await dropBundleModule?.getActiveClaimCondition(response.metadata.id);

  const balance = await dropBundleModule?.balance(response.metadata.id);

  const audiobookUrlsResponse = await fetch('/api/get-audiobooks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenIds: [tokenId],
    }),
  });

  const audiobookUrls = await audiobookUrlsResponse.json();

  const audiobookData: IAudiobookData = {
    id: response.metadata.id,
    name: response.metadata.name as string,
    desc: response.metadata.description as string,
    properties: response.metadata.properties,
    image: response.metadata.image as string,
    uri: response.metadata.uri as string,
    price: claimConditions.currencyMetadata?.displayValue as string,
    currencyUnit: 'ETH',
    balance: (balance as BigNumber).toNumber(),
    fileUrl: audiobookUrls[tokenId],
  };

  return audiobookData;
};

export const giftAudiobook = async (
  dropBundleModule: BundleDropModule,
  toAccountAddress: string,
  tokenId: string,
  quantity: number = 1,
) => {
  return dropBundleModule?.transfer(toAccountAddress, tokenId, quantity);
};

export const purchaseAudiobook = async (
  dropBundleModule: BundleDropModule,
  tokenId: string,
  quantity: number = 1,
) => {
  return dropBundleModule?.claim(tokenId, quantity);
};
