import Head from 'next/head';
import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEthers } from '@usedapp/core';
import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PurchaseCard from '../src/components/purchase-card';

const Home: NextPage = () => {
  const { library, chainId } = useEthers();

  const [allAudiobooks, setAllAudiobooks] = useState<any[]>([]);

  const sdk = useMemo(
    () => (library ? new ThirdwebSDK(library.getSigner()) : undefined),
    [library]
  );

  const dropBundleModule = useMemo(
    () =>
      sdk
        ? sdk.getBundleDropModule('0x9dba0b76852c23176FaAc6082491e2138FfF2EDa')
        : undefined,
    [sdk]
  );

  useEffect(() => {
    (async () => {
      const response = await dropBundleModule?.getAll();

      const promiseArr = response?.map((item) =>
        dropBundleModule?.getActiveClaimCondition(item.metadata.id)
      ) as Promise<any>[];

      const claimConditions = await Promise.all([...promiseArr]);

      const nfts = response?.map((item, index) => ({
        id: item.metadata.id,
        name: item.metadata.name,
        desc: item.metadata.description,
        properties: item.metadata.properties,
        image: item.metadata.image,
        uri: item.metadata.uri,
        price: `${claimConditions[index].currencyMetadata.displayValue} ETH`,
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
      <div className=''>
        <h4 className='text-3xl font-semibold text-gray-800'>Collection</h4>

        {renderAllAudiobooks()}
      </div>
    </>
  );
};

export default Home;
