import { BundleDropModule } from '@3rdweb/sdk';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';

export const getAllAudiobooks = async (dropBundleModule: BundleDropModule) => {
  const response = await dropBundleModule?.getAll();

  const claimConditionsPromiseArr = response?.map((item) =>
    dropBundleModule?.getActiveClaimCondition(item.metadata.id)
  ) as Promise<any>[];

  const claimConditions = await Promise.all([...claimConditionsPromiseArr]);

  const balancePromiseArr = response?.map((item) =>
    dropBundleModule?.balance(item.metadata.id)
  ) as Promise<any>[];

  const balances = await Promise.all([...balancePromiseArr]);

  const allNFTs = response?.map((item, index) => ({
    id: item.metadata.id,
    name: item.metadata.name,
    desc: item.metadata.description,
    properties: item.metadata.properties,
    image: item.metadata.image,
    uri: item.metadata.uri,
    price: claimConditions[index].currencyMetadata.displayValue,
    currencyUnit: 'ETH',
    balance: (balances[index] as BigNumber).toNumber(),
  }));

  return allNFTs;
};

export const getClaimedAudiobooks = async (
  dropBundleModule: BundleDropModule
) => {
  const ownedABResponse = await dropBundleModule?.getOwned();

  const claimConditionsPromiseArr = ownedABResponse?.map((item) =>
    dropBundleModule?.getActiveClaimCondition(item.metadata.id)
  ) as Promise<any>[];

  const claimConditions = await Promise.all([...claimConditionsPromiseArr]);

  const balancePromiseArr = ownedABResponse?.map((item) =>
    dropBundleModule?.balance(item.metadata.id)
  ) as Promise<any>[];

  const balances = await Promise.all([...balancePromiseArr]);

  let claimedNFTs = ownedABResponse?.map((item, index) => ({
    id: item.metadata.id,
    name: item.metadata.name,
    desc: item.metadata.description,
    properties: item.metadata.properties,
    image: item.metadata.image,
    uri: item.metadata.animation_url,
    price: claimConditions[index].currencyMetadata.displayValue,
    currencyUnit: 'ETH',
    balance: (balances[index] as BigNumber).toNumber(),
  }));

  console.log(claimedNFTs);

  const audiobookUrlsResponse = await fetch('/api/get-audiobooks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenIds: claimedNFTs?.map((item) => item.id),
    }),
  });

  const audiobookUrls = await audiobookUrlsResponse.json();

  claimedNFTs = claimedNFTs?.map((item) => ({
    ...item,
    fileUrl: audiobookUrls[item.id],
  }));

  return claimedNFTs;
};

export const giftAudiobook = async (
  dropBundleModule: BundleDropModule,
  toAccountAddress: string,
  tokenId: string,
  amount: number = 1
) => {
  return dropBundleModule?.transfer(toAccountAddress, tokenId, amount);
};
