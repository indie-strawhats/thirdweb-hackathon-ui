import Head from 'next/head';
import { ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import PurchaseCard from '../../src/components/purchase-card';
import { AppWeb3Context } from '../../src/providers/app-web3';
import { getAllAudiobooks, purchaseAudiobook } from '../../src/services/web3';
import SearchBox from '../../src/components/search-box';
import { IAudiobookData } from '../../src/models/audiobook';

import PageLayout from '../../src/layouts/page-layout';
import { toast } from 'react-toastify';
import Modal from '../../src/components/modal';
import LoadingAudioCard from '../../src/components/audio-card/loading-state';

const ExplorePage = () => {
  const [highlightedId, setHighlightedId] = useState<string>('');
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [rerender, triggerRerender] = useState(false);
  const [allAudiobooks, setAllAudiobooks] = useState<IAudiobookData[]>([]);
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<IAudiobookData[]>([]);
  const [loading, setLoading] = useState(false);

  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      setLoading(true);
      const allNFTs = await getAllAudiobooks(dropBundleModule);

      if (allNFTs) {
        setAllAudiobooks(allNFTs);
        setFilteredAudiobooks(allNFTs);
      }

      setLoading(false);
    })();
  }, [dropBundleModule, rerender]);

  const handlePurchase = async (name: string, tokenId: string, quantity: number = 1) => {
    if (!dropBundleModule) return;

    try {
      setPurchaseInProgress(true);

      await purchaseAudiobook(dropBundleModule, tokenId, quantity);
      toast.success('Successfully purchased', {
        position: 'bottom-right',
      });

      triggerRerender(!rerender);
      highlightCard(tokenId);
    } catch (error) {
      toast.error('Purchase failed!', {
        position: 'bottom-right',
      });
    } finally {
      setPurchaseInProgress(false);
    }
  };

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

  const highlightCard = (id: string) => {
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(''), 3500);
  };

  const getHighlightClassIfAny = (id: string) => {
    if (!highlightedId) return '';
    return highlightedId === id ? 'animate-highlight-once ring ring-indigo-500 ring-offset-1' : '';
  };

  const renderAllAudiobooks = () => {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-8">
        {loading && filteredAudiobooks.length === 0 ? (
          <>
            <LoadingAudioCard />
            <LoadingAudioCard />
            <LoadingAudioCard />
            <LoadingAudioCard />
          </>
        ) : (
          filteredAudiobooks.map((ab) => (
            <div key={ab.id}>
              <PurchaseCard
                data={ab}
                onPurchase={handlePurchase}
                className={getHighlightClassIfAny(ab.id)}
              />
            </div>
          ))
        )}
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
      <div className="w-full mb-8 bg-gray-100 shadow-inner h-30">
        <div className="relative w-full -bottom-7">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className="px-8 pt-8 pb-4 m-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold text-gray-800 ">All Audiobooks</h2>
        {renderAllAudiobooks()}
      </div>

      {purchaseInProgress && (
        <Modal
          title="Purchasing Audiobook"
          loading
          description="You will be prompted to authorize 1 transactions."
        />
      )}
    </>
  );
};

export default ExplorePage;

ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
