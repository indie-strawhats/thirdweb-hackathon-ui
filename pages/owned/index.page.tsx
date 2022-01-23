import { ThirdwebSDK } from '@3rdweb/sdk';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../../src/components/header';
import PlayCard from '../../src/components/play-card';
import PurchaseCard from '../../src/components/purchase-card';
import { useWalletMembershipAccess } from '../../src/hooks/useMembershipAccess';
import { AudioPlayerContext } from '../../src/providers/audio-player';

const OwnedPage: NextPage = () => {
  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<any[]>([]);
  const { isVisible, setIsVisible } = useContext<any>(AudioPlayerContext);

  const { library } = useEthers();
  const hasAccess = useWalletMembershipAccess();

  const sdk = useMemo(
    () => (library ? new ThirdwebSDK(library.getSigner()) : undefined),
    [library]
  );

  const dropBundleModule = useMemo(
    () =>
      sdk
        ? sdk.getBundleDropModule('0x9dba0b76852c23176FaAc6082491e2138FfF2EDa')
        : undefined,
    [sdk]
  );

  useEffect(() => {
    (async () => {
      const ownedABResponse = await dropBundleModule?.getOwned();

      let claimed = ownedABResponse?.map((item) => ({
        id: item.metadata.id,
        name: item.metadata.name,
        desc: item.metadata.description,
        properties: item.metadata.properties,
        image: item.metadata.image,
        uri: item.metadata.animation_url,
      }));

      const audiobookUrlsResponse = await fetch('/api/get-audiobooks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          tokenIds: claimed?.map((item) => item.id),
        }),
      });

      const audiobookUrls = await audiobookUrlsResponse.json();

      claimed = claimed?.map((item) => ({
        ...item,
        fileUrl: audiobookUrls[item.id],
      }));

      if (claimed) {
        setPurchasedAudiobooks(claimed);
      }
    })();
  }, [dropBundleModule]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/get-audiobooks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          tokenIds: '0',
        }),
      });
    })();
  }, []);

  const renderPurchasedAudiobooks = () => {
    return (
      <Grid container spacing={2}>
        {purchasedAudiobooks.map((ab) => (
          <Grid item key={ab.id} xs={6}>
            <PlayCard data={ab} onPurchase={(id: number) => {}} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Owned</title>
        <meta name="description" content="Awesome Audiobooks - Owned" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Collection
      </Typography>
      <br />
      <br />

      {purchasedAudiobooks.length > 0 && renderPurchasedAudiobooks()}

      <br />
      <br />
    </>
  );
};

export default OwnedPage;
