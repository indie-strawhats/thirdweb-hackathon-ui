import Head from 'next/head';
import type { NextPage } from 'next';
import { useCallback, useContext, useEffect, useState } from 'react';
import PurchaseCard from '../src/components/purchase-card';
import { AppWeb3Context } from '../src/providers/app-web3';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';
import { getAllAudiobooks, purchaseAudiobook } from '../src/services/web3';
import SearchBox from '../src/components/search-box';

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
    (tokenId: string, quantity: number = 1) => {
      if (!dropBundleModule) return;

      purchaseAudiobook(dropBundleModule, tokenId, quantity);
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
      <div className="relative h-45">
        <div className="absolute w-full bg-gray-200 h-1/2"></div>
        <SearchBox />
      </div>
      <div className="max-w-6xl pt-8 pb-4 m-auto">
        <h2 className="pb-4 text-3xl font-semibold text-gray-800 ">
          Collection
        </h2>
        {renderAllAudiobooks()}
      </div>
    </>
  );
};

export default Home;
