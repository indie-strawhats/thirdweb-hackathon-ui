import Head from 'next/head';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import PlayCard from '../../src/components/play-card';
import { AppWeb3Context } from '../../src/providers/app-web3';
import { getClaimedAudiobooks } from '../../src/services/web3';
import SearchBox from '../../src/components/search-box';
import { IAudiobookData, IOwnedAudiobookData } from '../../src/models/audiobook';
import { useWeb3 } from '@3rdweb/hooks';
import PageLayout from '../../src/layouts/page-layout';
import LoadingAudioCard from '../../src/components/audio-card/loading-state';
import Image from 'next/image';

const OwnedPage = () => {
  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<IOwnedAudiobookData[]>([]);
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<IOwnedAudiobookData[]>([]);
  const [loading, setLoading] = useState(false);

  const { address } = useWeb3();
  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      setLoading(true);
      const claimedNFTs = await getClaimedAudiobooks(dropBundleModule);

      if (claimedNFTs) {
        setPurchasedAudiobooks(claimedNFTs);
        setFilteredAudiobooks(claimedNFTs);
      }
      setLoading(false);
    })();
  }, [dropBundleModule, address]);

  const handleSearch = (query: string) => {
    const filteredAudiobooks = purchasedAudiobooks.filter((ab) => {
      const lowercaseQuery = query.toLowerCase();

      return (
        (ab.name as string).toLowerCase().includes(lowercaseQuery) ||
        (ab.desc as string).toLowerCase().includes(lowercaseQuery) ||
        (ab.writtenBy as string).toLowerCase().includes(lowercaseQuery)
      );
    });

    setFilteredAudiobooks(filteredAudiobooks);
  };

  const renderPurchasedAudiobooks = () => {
    if (loading && filteredAudiobooks.length === 0) {
      return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8">
          <LoadingAudioCard />
          <LoadingAudioCard />
          <LoadingAudioCard />
          <LoadingAudioCard />
        </div>
      );
    } else if (purchasedAudiobooks.length !== 0 && filteredAudiobooks.length === 0) {
      return (
        <div className="grid w-full p-8 place-content-center">
          <div className="w-[400px]">
            <Image
              width={'100%'}
              height={'100%'}
              layout="responsive"
              className="object-center"
              alt="hero"
              src={'/images/no-data.svg'}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8">
          {filteredAudiobooks.map((ab) => (
            <PlayCard key={ab.id} data={ab} onPurchase={(_: number) => {}} />
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Owned</title>
        <meta name="description" content="Awesome Audiobooks - Owned" />
      </Head>
      <div className="w-full mb-8 bg-gray-100 shadow-inner h-30">
        <div className="relative w-full -bottom-7">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className="p-8 m-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold text-gray-800 ">My Audiobooks</h2>
        {renderPurchasedAudiobooks()}
      </div>
    </>
  );
};

export default OwnedPage;

OwnedPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
