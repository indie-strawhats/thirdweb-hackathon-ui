import { ThirdwebSDK } from '@3rdweb/sdk';
import { Container, Grid, Typography } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../src/components/header';
import PurchaseCard from '../../src/components/purchase-card';

const OwnedPage: NextPage = () => {
  const { library } = useEthers();

  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<any[]>([]);

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
      const response = await dropBundleModule?.getOwned();

      const claimed = response?.map((item) => ({
        id: item.metadata.id,
        name: item.metadata.name,
        desc: item.metadata.description,
        properties: item.metadata.properties,
        image: item.metadata.image,
        uri: item.metadata.uri,
      }));

      if (claimed) {
        setPurchasedAudiobooks(claimed);
      }
    })();
  }, [dropBundleModule]);

  const renderPurchasedAudiobooks = () => {
    return (
      <Grid container spacing={2}>
        {purchasedAudiobooks.map((ab) => (
          <Grid item key={ab.id} xs={4}>
            <PurchaseCard data={ab} />
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
      <Container maxWidth="xl">
        <Header />
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Collection
        </Typography>
        <br />
        <br />

        {renderPurchasedAudiobooks()}
      </Container>
    </>
  );
};

export default OwnedPage;
