import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppWeb3Context } from '../../../src/providers/app-web3';
import { getAudiobook, giftAudiobook, purchaseAudiobook } from '../../../src/services/web3';
import { AudioPlayerContext } from '../../../src/providers/audio-player';
import { useWeb3 } from '@3rdweb/hooks';
import PageLayout from '../../../src/layouts/page-layout';
import { toast } from 'react-toastify';
import Modal from '../../../src/components/modal';
import { IEntireAudiobookData } from '../../../src/models/audiobook';

const OwnedAudiobookPage = () => {
  const [highlight, triggerHighlight] = useState(false);
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [giftInProgress, setGiftInProgress] = useState(false);
  const [rerender, triggerRerender] = useState(false);
  const [localAudiobookData, setLocalAudiobookData] = useState<IEntireAudiobookData>();

  const {
    query: { Id },
  } = useRouter();

  const { address } = useWeb3();

  const { dropBundleModule } = useContext(AppWeb3Context);
  const { setAudiobookData, setIsVisible } = useContext<any>(AudioPlayerContext);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule || !Id) return;

      const audiobookData = await getAudiobook(dropBundleModule, Id as string);

      setLocalAudiobookData(audiobookData);
    })();
  }, [dropBundleModule, Id, address, rerender]);

  const highlightCard = () => {
    triggerHighlight(true);
    setTimeout(() => {
      triggerHighlight(false);
    }, 3500);
  };

  const handleGiftAudiobook = async () => {
    if (!dropBundleModule) return;

    try {
      setGiftInProgress(true);

      await giftAudiobook(
        dropBundleModule,
        '0x0585Ab27743a0C0248166Ef169372B12f7C24C45',
        // '0x9ea3F80FC96f67CE06b2f4439625C4257c685aA8',
        Id as string,
        1,
      );
      toast.success('Successfully Gifted', {
        position: 'bottom-right',
      });

      triggerRerender(!rerender);
      highlightCard();
    } catch (error) {
      toast.error('Gift failed!', {
        position: 'bottom-right',
      });
    } finally {
      setGiftInProgress(false);
    }
  };

  const handlePurchase = async () => {
    if (!dropBundleModule || !localAudiobookData) return;

    try {
      setPurchaseInProgress(true);

      await purchaseAudiobook(dropBundleModule, localAudiobookData.id, 1);
      toast.success('Successfully Purchased', {
        position: 'bottom-right',
      });

      triggerRerender(!rerender);
      highlightCard();
    } catch (error) {
      toast.error('Purchase failed!', {
        position: 'bottom-right',
      });
    } finally {
      setPurchaseInProgress(false);
    }
  };

  const handlePlay = () => {
    setAudiobookData(localAudiobookData);
    setIsVisible(true);
  };

  const getHighlightClassIfAny = () => {
    return highlight ? 'animate-highlight-once ring ring-indigo-500 ring-offset-1' : '';
  };

  const renderLoadingState = () => (
    <div className="grid max-h-screen p-20 place-content-center animate-pulse">
      <div
        className={`overflow-hidden bg-white rounded-lg shadow-xl w-[600px]  ${getHighlightClassIfAny()}`}
      >
        <div className="h-64 px-4 pt-2 bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="w-24 h-10 bg-gray-200 rounded-lg" />
            <div className="w-24 h-8 bg-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-64 h-64 mb-4 -mt-40 overflow-hidden bg-white rounded-lg"></div>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 py-4">
          <div className="w-56 h-8 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded-lg w-96" />
        </div>
        <div className="flex flex-col items-start gap-4 px-8 py-4 pt-0 text-gray-600">
          <div className="flex items-center justify-between gap-8">
            <div className="w-32 h-6 bg-gray-200 rounded-lg" />
            <div className="w-40 h-6 bg-gray-200 rounded-lg" />
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="w-32 h-6 bg-gray-200 rounded-lg" />
            <div className="w-40 h-6 bg-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-2 mt-4 h-14">
          <div className="w-full h-full bg-gray-100" />
          <div className="w-full h-full bg-gray-100" />
          <div className="w-full h-full bg-gray-100" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Awesome Audiobooks - Audiobook #{Id}</title>
        <meta name="description" content={`Awesome Audiobooks - Audiobook #${Id}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {localAudiobookData ? (
        <div className="grid max-h-screen p-20 place-content-center">
          <div
            className={`overflow-hidden bg-white rounded-lg shadow-2xl w-[600px]  ${getHighlightClassIfAny()}`}
          >
            <div className="h-64 px-4 pt-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
              <div className="flex items-center justify-between text-white">
                <h1 className="text-3xl font-semibold hover:cursor-pointer">
                  #{localAudiobookData.id}
                </h1>

                <p className="px-2 text-white bg-[#fff2] rounded-full">
                  {`Owned - ${localAudiobookData.balance}`}
                </p>
              </div>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-64 h-64 mb-4 -mt-40 overflow-hidden bg-white rounded-lg ring-2 ring-slate-100 ring-offset-2">
                <Image
                  src={localAudiobookData.image}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  alt="Laptop on Desk"
                  className="object-cover "
                />
              </div>
            </div>
            <div className="flex flex-col items-center px-8 py-4">
              <h1 className="mb-2 text-2xl font-bold text-gray-600 hover:cursor-pointer">
                {localAudiobookData.name}
              </h1>
              <p className="text-base text-gray-600 blockoverflow-hidden">
                {localAudiobookData.desc}
              </p>
            </div>
            <div className="flex flex-col items-start px-8 py-4 pt-0 text-gray-600">
              <div className="flex items-start justify-between">
                <p className="w-32 font-semibold text-gray-800">Written By</p>
                <p>{localAudiobookData.writtenBy}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Narrated By</p>
                <p>{localAudiobookData.narratedBy}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Ratings</p>
                <p>{localAudiobookData.ratings}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Category</p>
                <p>{localAudiobookData.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Language</p>
                <p>{localAudiobookData.lang}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Length</p>
                <p>{localAudiobookData.len}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Release Date</p>
                <p>{localAudiobookData.releaseDate}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Publisher</p>
                <p>{localAudiobookData.publisher}</p>
              </div>
            </div>
            <div className="flex border-t h-14">
              <button
                className="grid w-full h-full text-sm border-r hover:border-transparent hover:font-bold place-content-center hover:text-white hover:bg-indigo-500"
                onClick={handlePurchase}
              >
                Purchase @ {`${localAudiobookData.currencyUnit} : ${localAudiobookData.price}`}
              </button>

              {localAudiobookData.balance > 0 && (
                <>
                  <button
                    className="grid w-full h-full text-sm hover:font-bold hover:border-transparent place-content-center hover:text-white hover:bg-indigo-500"
                    onClick={handlePlay}
                    disabled={localAudiobookData.balance === 0}
                  >
                    Play
                  </button>
                  <button
                    className="grid w-full h-full text-sm border-l hover:border-transparent hover:font-bold place-content-center hover:text-white hover:bg-indigo-500"
                    onClick={handleGiftAudiobook}
                  >
                    Gift
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        renderLoadingState()
      )}

      {purchaseInProgress && (
        <Modal
          title="Purchasing Audiobook"
          loading
          description="You will be prompted to authorize 1 transactions."
        />
      )}

      {giftInProgress && (
        <Modal
          title="Gifting Audiobook"
          loading
          description="You will be prompted to authorize 1 transactions."
        />
      )}
    </div>
  );
};

export default OwnedAudiobookPage;

OwnedAudiobookPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
