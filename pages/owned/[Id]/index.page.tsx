import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AppWeb3Context } from '../../../src/providers/app-web3';
import {
  getAudiobook,
  giftAudiobook,
  purchaseAudiobook,
} from '../../../src/services/web3';
import { AudioPlayerContext } from '../../../src/providers/audio-player';
import { useWeb3 } from '@3rdweb/hooks';
import PageLayout from '../../../src/layouts/page-layout';

const OwnedAudiobookPage = () => {
  const [localAudiobookData, setLocalAudiobookData] = useState<any>(null);

  const {
    query: { Id },
  } = useRouter();

  const { address } = useWeb3();

  const { dropBundleModule } = useContext(AppWeb3Context);
  const { setAudiobookData, setIsVisible } =
    useContext<any>(AudioPlayerContext);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule || !Id) return;

      const audiobookData = await getAudiobook(dropBundleModule, Id as string);

      setLocalAudiobookData(audiobookData);
    })();
  }, [dropBundleModule, Id, address]);

  const handleGiftAudiobook = async () => {
    if (!dropBundleModule) return;

    const response = await giftAudiobook(
      dropBundleModule,
      '0x0585Ab27743a0C0248166Ef169372B12f7C24C45',
      // '0x9ea3F80FC96f67CE06b2f4439625C4257c685aA8',
      Id as string,
      1
    );
  };

  const handlePurchase = async () => {
    if (!dropBundleModule) return;

    const response = await purchaseAudiobook(
      dropBundleModule,
      localAudiobookData.id,
      1
    );
  };

  const handlePlay = () => {
    setAudiobookData(localAudiobookData);
    setIsVisible(true);
  };

  return (
    <div>
      <Head>
        <title>Awesome Audiobooks - Audiobook #{Id}</title>
        <meta
          name='description'
          content={`Awesome Audiobooks - Audiobook #${Id}`}
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {localAudiobookData && (
        <div className='relative flex flex-col items-center max-h-screen p-20'>
          <div className='overflow-hidden bg-white rounded-lg shadow-2xl'>
            <div className='h-40 px-4 pt-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'>
              <div className='flex items-center justify-between text-white'>
                <h1 className='mb-2 text-3xl font-semibold hover:cursor-pointer'>
                  #{localAudiobookData.id}
                </h1>

                <p className='px-2 mb-2 text-white bg-[#fff2] rounded-full'>
                  {`Owned - ${localAudiobookData.balance}`}
                </p>
              </div>
            </div>
            <div className='relative flex flex-col items-center'>
              <div className='mb-4 -mt-20 overflow-hidden bg-white rounded-lg w-36 h-36 ring-2 ring-slate-100 ring-offset-2'>
                <Image
                  src={localAudiobookData.image}
                  width='100%'
                  height='100%'
                  layout='responsive'
                  alt='Laptop on Desk'
                  className='object-cover '
                />
              </div>
            </div>
            <div className='flex flex-row justify-between px-4 py-4'>
              <div>
                <h1 className='mb-2 font-bold text-gray-600 hover:cursor-pointer'>
                  {localAudiobookData.name}
                </h1>
                <p className='block mb-2 overflow-hidden text-sm text-gray-600'>
                  {localAudiobookData.desc}
                </p>
              </div>
              <div className='mb-2 text-sm text-gray-600'>
                {`${localAudiobookData.currencyUnit} : ${localAudiobookData.price}`}
              </div>
            </div>
            <div className='flex border-t h-14 w-80 hover:border-transparent'>
              <button
                className='grid w-full h-full text-sm border-r hover:border-transparent hover:font-bold place-content-center hover:text-white hover:bg-indigo-500'
                onClick={handlePurchase}
              >
                Purchase
              </button>

              {localAudiobookData.balance > 0 && (
                <>
                  <button
                    className='grid w-full h-full text-sm hover:font-bold hover:border-transparent place-content-center hover:text-white hover:bg-indigo-500'
                    onClick={handlePlay}
                    disabled={localAudiobookData.balance === 0}
                  >
                    Play
                  </button>
                  <button
                    className='grid w-full h-full text-sm border-l hover:border-transparent hover:font-bold place-content-center hover:text-white hover:bg-indigo-500'
                    onClick={handleGiftAudiobook}
                  >
                    Gift
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnedAudiobookPage;

OwnedAudiobookPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
