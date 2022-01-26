import { useEthers } from '@usedapp/core';
import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../../components/header';
import Modal from '../../components/modal';
import { isOnSupportedChain } from '../../helpers/web3';
import { AudioPlayerContext } from '../../providers/audio-player';

const PageLayout = ({ children }: any) => {
  const [readyToCheck, setReadyToCheck] = useState(false);
  const { chainId, library } = useEthers();

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
    if (readyToCheck && !library?.provider.isMetaMask) {
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
    <div className='w-screen h-screen'>
      <Header />
      {children}
      {/* {isVisible && (
        <Drawer
          anchor="bottom"
          variant="persistent"
          ModalProps={{ keepMounted: true, hideBackdrop: true }}
          open
        >
          <Stack sx={{ padding: 1 }} direction="row" spacing={2}>
            <ReactAudioPlayer
              src={audiobookData.fileUrl}
              controls
              autoPlay
              style={{ width: '100%' }}
            />
            <Button onClick={() => setIsVisible(false)}>Close</Button>
          </Stack>
        </Drawer>
      )} */}

      {renderWarning()}
    </div>
  );
};

export default PageLayout;
