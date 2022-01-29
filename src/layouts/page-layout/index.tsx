import { Transition } from '@headlessui/react';
import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Button from '../../components/button';
import Header from '../../components/header';
import Modal from '../../components/modal';
import { isOnSupportedChain } from '../../helpers/web3';
import { AudioPlayerContext } from '../../providers/audio-player';

import { useWeb3 } from '@3rdweb/hooks';

const PageLayout = ({ children }: any) => {
  const [readyToCheck, setReadyToCheck] = useState(false);
  const { chainId, provider } = useWeb3();

  const {
    isVisible = true,
    setIsVisible,
    audiobookData,
  } = useContext<any>(AudioPlayerContext);

  useEffect(() => {
    setTimeout(() => setReadyToCheck(true), 1000);
  }, []);

  const renderWarning = () => {
    // readyToCheck is being used to wait for metamask provider to load. Before metamask, infura provider loads which does not help.
    if (readyToCheck && !(provider?.connection.url === 'metamask')) {
      return (
        <Modal
          title='Warning!'
          description='Please make sure you have active Metamask connection.'
        />
      );
    }

    if (!isOnSupportedChain(chainId as number)) {
      return (
        <Modal
          title='Warning!'
          description='Change to Rinkeby Testnet to use application.'
        />
      );
    }

    return null;
  };

  return (
    <div className={`w-screen ${isVisible && 'mb-32'}`}>
      <Header />
      {children}

      {/* {isVisible && ( */}
      <Transition
        show={isVisible}
        enter='transition-opacity duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed bottom-0 flex items-center w-full h-24 bg-white border-t'>
          <div className='flex items-center flex-grow px-4'>
            <ReactAudioPlayer
              src={audiobookData.fileUrl}
              controls
              autoPlay
              className='flex-grow mr-4'
            />
            <Button variant='primary' onClick={() => setIsVisible(false)}>
              Close
            </Button>
          </div>
        </div>
      </Transition>

      {provider !== undefined && renderWarning()}
    </div>
  );
};

export default PageLayout;
