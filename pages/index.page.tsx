import Head from 'next/head';
import type { NextPage } from 'next';
import { useCallback, useContext, useEffect, useState } from 'react';
import PurchaseCard from '../src/components/purchase-card';
import { AppWeb3Context } from '../src/providers/app-web3';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';
import { getAllAudiobooks } from '../src/services/web3';

const Home: NextPage = () => {
  const [allAudiobooks, setAllAudiobooks] = useState<any[]>([]);

  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      const allNFTs = await getAllAudiobooks(dropBundleModule);

      if (allNFTs) {
        setAllAudiobooks(allNFTs);
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <meta name="description" content="Awesome Audiobooks - Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <h4 className="text-3xl font-semibold text-gray-800">Collection</h4>

        {renderAllAudiobooks()}
      </div>
    </>
  );
};

export default Home;
