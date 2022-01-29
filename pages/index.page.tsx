import Head from 'next/head';
import type { NextPage } from 'next';
import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PurchaseCard from '../src/components/purchase-card';
import { AppWeb3Context } from '../src/providers/app-web3';
import { getAllAudiobooks, purchaseAudiobook } from '../src/services/web3';
import SearchBox from '../src/components/search-box';
import { IAudiobookData } from '../src/models/audiobook';

import PageLayout from '../src/layouts/page-layout';

const Home = () => {
  const [allAudiobooks, setAllAudiobooks] = useState<IAudiobookData[]>([]);
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<
    IAudiobookData[]
  >([]);

  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      const allNFTs = await getAllAudiobooks(dropBundleModule);

      if (allNFTs) {
        setAllAudiobooks(allNFTs);
        setFilteredAudiobooks(allNFTs);
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

  const handleSearch = (query: string) => {
    const filteredAudiobooks = allAudiobooks.filter((ab) => {
      const lowercaseQuery = query.toLowerCase();

      return (
        (ab.name as string).toLowerCase().includes(lowercaseQuery) ||
        (ab.desc as string).toLowerCase().includes(lowercaseQuery)
      );
    });

    setFilteredAudiobooks(filteredAudiobooks);
  };

  const renderAllAudiobooks = () => {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {filteredAudiobooks.map((ab) => (
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
      <div className='w-full bg-gray-100 shadow-inner h-30'>
        <div className='relative w-full -bottom-7'>
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className='max-w-6xl pt-8 pb-4 m-auto'>
        <h2 className='pb-4 text-3xl font-semibold text-gray-800 '>
          Collection
        </h2>
        {renderAllAudiobooks()}
      </div>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
