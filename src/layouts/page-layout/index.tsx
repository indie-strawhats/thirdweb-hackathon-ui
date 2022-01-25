import { useEthers } from '@usedapp/core';
import React, { useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../../components/header';
import Modal from '../../components/modal';
import { isOnSupportedChain } from '../../helpers/web3';
import { AudioPlayerContext } from '../../providers/audio-player';

const PageLayout = ({ children }: any) => {
  const { chainId } = useEthers();

  const {
    isVisible = true,
    setIsVisible,
    audiobookData,
  } = useContext<any>(AudioPlayerContext);

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="max-w-6xl m-auto pt-8">{children}</div>

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

      {!isOnSupportedChain(chainId as number) && (
        <Modal
          title="Warning!"
          description="Change to Rinkeby Testnet to use application."
        />
      )}
    </div>
  );
};

export default PageLayout;
