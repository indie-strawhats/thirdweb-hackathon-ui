import Head from 'next/head';
import type { NextPage } from 'next';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PurchaseCard from '../src/components/purchase-card';
import { AppWeb3Context } from '../src/providers/app-web3';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';
import SearchBox from '../src/components/search-box';

const Home: NextPage = () => {
  const [allAudiobooks, setAllAudiobooks] = useState<any[]>([]);

  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      const response = await dropBundleModule?.getAll();

      const claimConditionsPromiseArr = response?.map((item) =>
        dropBundleModule?.getActiveClaimCondition(item.metadata.id)
      ) as Promise<any>[];

      const claimConditions = await Promise.all([...claimConditionsPromiseArr]);

      const balancePromiseArr = response?.map((item) =>
        dropBundleModule?.balance(item.metadata.id)
      ) as Promise<any>[];

      const balances = await Promise.all([...balancePromiseArr]);

      const nfts = response?.map((item, index) => ({
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

      if (nfts) {
        setAllAudiobooks(nfts);
      }
    })();
  }, [dropBundleModule]);

  const handlePurchase = useCallback(
    (tokenId: number, quantity: number = 1) => {
      dropBundleModule?.claim(tokenId, quantity);
    },
    [dropBundleModule]
  );

  const renderAllAudiobooks = () => {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {allAudiobooks.map((ab) => (
          <div key={ab.id}>
            <PurchaseCard data={ab} onPurchase={handlePurchase} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Collection</title>
        <meta name='description' content='Awesome Audiobooks - Collection' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative h-20'>
        <div className='absolute w-full bg-gray-200 h-1/2'></div>
        <SearchBox />
      </div>
      <div className='max-w-6xl pt-8 pb-4 m-auto'>
        <h4 className='pb-4 text-3xl font-semibold text-gray-800 '>
          Collection
        </h4>
        {renderAllAudiobooks()}
      </div>
    </>
  );
};

export default Home;
