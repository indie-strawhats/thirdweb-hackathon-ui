import { BundleDropModule } from '@3rdweb/sdk';
import { BigNumber } from '@ethersproject/bignumber';
import {
  IAudiobookAPIData,
  IAudiobookData,
  IEntireAudiobookAPIData,
  IEntireAudiobookData,
  IOwnedAudiobookAPIData,
  IOwnedAudiobookData,
} from '../models/audiobook';

export const getAllAudiobooks = async (dropBundleModule: BundleDropModule) => {
  const allABResponse = await dropBundleModule?.getAll();

  const claimConditionsPromiseArr = allABResponse?.map((item) =>
    dropBundleModule?.getActiveClaimCondition(item.metadata.id),
  ) as Promise<any>[];

  const claimConditions = await Promise.all([...claimConditionsPromiseArr]);

  const balancePromiseArr = allABResponse?.map((item) =>
    dropBundleModule?.balance(item.metadata.id),
  ) as Promise<any>[];

  const balances = await Promise.all([...balancePromiseArr]);

  const audiobooksDataResponse = await fetch('/api/get-all-audiobooks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenIds: allABResponse?.map((item) => item.metadata.id),
    }),
  });

  const audiobooksData: { [key: string]: IAudiobookAPIData } = await audiobooksDataResponse.json();

  const allNFTs = allABResponse?.map<IAudiobookData>((item, index) => ({
    id: item.metadata.id,
    name: item.metadata.name as string,
    desc: item.metadata.description as string,
    properties: item.metadata.properties,
    image: item.metadata.image as string,
    uri: item.metadata.uri,
    price: claimConditions[index].currencyMetadata.displayValue,
    currencyUnit: 'ETH',
    balance: (balances[index] as BigNumber).toNumber(),
    writtenBy: audiobooksData[item.metadata.id].writtenBy,
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

  const audiobooksDataResponse = await fetch('/api/get-owned-audiobooks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenIds: ownedABResponse?.map((item) => item.metadata.id),
    }),
  });

  const audiobooksData: { [key: string]: IOwnedAudiobookAPIData } =
    await audiobooksDataResponse.json();

  const claimedAudiobooks = ownedABResponse?.map<IOwnedAudiobookData>((item, index) => ({
    id: item.metadata.id,
    name: item.metadata.name as string,
    desc: item.metadata.description as string,
    properties: item.metadata.properties,
    image: item.metadata.image as string,
    uri: item.metadata.uri as string,
    price: claimConditions[index].currencyMetadata.displayValue,
    currencyUnit: 'ETH',
    balance: (balances[index] as BigNumber).toNumber(),
    writtenBy: audiobooksData[item.metadata.id].writtenBy,
    fileUrl: audiobooksData[item.metadata.id].fileUrl,
  }));

  return claimedAudiobooks;
};

export const getAudiobook = async (dropBundleModule: BundleDropModule, tokenId: string) => {
  const response = await dropBundleModule?.get(tokenId);

  const claimConditions = await dropBundleModule?.getActiveClaimCondition(response.metadata.id);

  const balance = await dropBundleModule?.balance(response.metadata.id);

  const audiobookDataResponse = await fetch('/api/get-audiobook', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenId,
    }),
  });

  const audiobookData: IEntireAudiobookAPIData = await audiobookDataResponse.json();

  const formattedAudiobookData: IEntireAudiobookData = {
    id: response.metadata.id,
    name: response.metadata.name as string,
    desc: response.metadata.description as string,
    properties: response.metadata.properties,
    image: response.metadata.image as string,
    uri: response.metadata.uri as string,
    price: claimConditions.currencyMetadata?.displayValue as string,
    currencyUnit: 'ETH',
    balance: (balance as BigNumber).toNumber(),
    writtenBy: audiobookData.writtenBy,
    fileUrl: audiobookData.fileUrl,
    narratedBy: audiobookData.narratedBy,
    ratings: audiobookData.ratings,
    len: audiobookData.len,
    releaseDate: audiobookData.releaseDate,
    category: audiobookData.category,
    publisher: audiobookData.publisher,
    lang: audiobookData.lang,
  };

  return formattedAudiobookData;
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
