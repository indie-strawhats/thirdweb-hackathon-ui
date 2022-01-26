import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Button from '../../../src/components/button';
import Header from '../../../src/components/header';
import { useWalletMembershipAccess } from '../../../src/hooks/useMembershipAccess';
import { AppWeb3Context } from '../../../src/providers/app-web3';
import { getAudiobook, giftAudiobook } from '../../../src/services/web3';

const OwnedAudiobookPage: NextPage = () => {
  const [audiobookData, setAudiobookData] = useState<any>(null);

  const {
    query: { Id },
  } = useRouter();

  const { account } = useEthers();
  const { dropBundleModule } = useContext(AppWeb3Context);

  const hasAccess = useWalletMembershipAccess(Id as string);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      const audiobookData = await getAudiobook(dropBundleModule, Id as string);

      setAudiobookData(audiobookData);
    })();
  }, [dropBundleModule, Id, account]);

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
      {console.log(audiobookData)}
      {audiobookData && (
        <div className='relative flex flex-col items-center max-h-screen p-20'>
          <div className='bg-white rounded-lg shadow-2xl'>
            <div className='px-20 py-20 bg-orange-200 '></div>
            <div className='flex flex-row justify-between px-4 pt-2 '>
              <div>
                <h1 className='mb-2 font-semibold text-gray-600 hover:cursor-pointer'>
                  #{audiobookData.id}
                </h1>
              </div>
              <div className='mb-2 text-sm text-gray-600'>
                {`owned - ${audiobookData.balance}`}
              </div>
            </div>
            <div className='relative flex flex-col items-center -top-20'>
              <Image
                src={audiobookData.image}
                width={'100%'}
                height={'100%'}
                layout='fixed'
                alt='Laptop on Desk'
                className='object-cover rounded-full'
              />
            </div>
            <div className='flex flex-row justify-between px-4'>
              <div>
                <h1 className='mb-2 font-bold text-gray-600 hover:cursor-pointer'>
                  {audiobookData.name}
                </h1>
                <p className='block mb-2 overflow-hidden text-sm text-gray-600'>
                  {audiobookData.desc}
                </p>
              </div>
              <div className='mb-2 text-sm text-gray-600'>
                {`${audiobookData.currencyUnit} : ${audiobookData.price}`}
              </div>
            </div>
            <div className='flex h-20 border-t rounded-bl-lg rounded-br-lg w-80 hover:border-transparent'>
              <div
                className='grid w-full h-full text-sm border-r rounded-bl-lg hover:border-transparent hover:font-bold place-content-center hover:cursor-pointer hover:text-white hover:bg-yellow-400'
                onClick={handleGiftAudiobook}
              >
                Purchase
              </div>
              <div
                className='grid w-full h-full text-sm hover:font-bold hover:border-transparent place-content-center hover:cursor-pointer hover:text-white hover:bg-yellow-400'
                onClick={handleGiftAudiobook}
              >
                Play
              </div>
              <div
                className='grid w-full h-full text-sm border-l rounded-br-lg hover:border-transparent hover:font-bold place-content-center hover:cursor-pointer hover:text-white hover:bg-yellow-400'
                onClick={handleGiftAudiobook}
              >
                Gift
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnedAudiobookPage;
