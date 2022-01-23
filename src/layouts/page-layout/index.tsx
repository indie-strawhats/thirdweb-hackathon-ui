import { Container, Drawer } from '@mui/material';
import React, { useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../../components/header';
import { AudioPlayerContext } from '../../providers/audio-player';

const PageLayout = ({ children }: any) => {
  const {
    isVisible = true,
    setIsVisible,
    audiobookData,
  } = useContext<any>(AudioPlayerContext);

  return (
    <Container maxWidth="xl">
      <Header />
      {children}

      <Drawer
        anchor="bottom"
        variant="persistent"
        ModalProps={{ keepMounted: true, hideBackdrop: true }}
        open={isVisible}
      >
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            padding: 24,
          }}
        >
          <ReactAudioPlayer
            src={audiobookData.fileUrl}
            controls
            autoPlay
            style={{ width: '100%' }}
          />
        </div>
      </Drawer>
    </Container>
  );
};

export default PageLayout;
