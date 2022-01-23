import { Button, Container, Drawer, Stack } from '@mui/material';
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

      {isVisible && (
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
      )}
    </Container>
  );
};

export default PageLayout;
