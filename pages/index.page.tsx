import { BundleDropMetadata, ThirdwebSDK } from '@3rdweb/sdk';
import { formatEther } from '@ethersproject/units';
import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import { useEthers, useEtherBalance } from '@usedapp/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DropZone from '../src/components/drop-zone';
import Header from '../src/components/header';
import PurchaseCard from '../src/components/purchase-card';

const Home: NextPage = () => {
  const { account, library } = useEthers();

  const [allAudiobooks, setAllAudiobooks] = useState<any[]>([]);
  const [claimed, setClaimed] = useState<any[]>([]);

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
      const response = await dropBundleModule?.getAll();

      const nfts = response?.map((item) => ({
        id: item.metadata.id,
        name: item.metadata.name,
        desc: item.metadata.description,
        properties: item.metadata.properties,
        image: item.metadata.image,
        uri: item.metadata.uri,
      }));

      console.log(response);

      if (nfts) {
        setAllAudiobooks(nfts);
      }
    })();
  }, [dropBundleModule]);

  const handlePurchase = useCallback(
    (tokenId: number, quantity: number = 1) => {
      dropBundleModule?.claim(tokenId, quantity);
    },
    [dropBundleModule]
  );

  const renderAllAudiobooks = () => {
    return (
      <Grid container spacing={2}>
        {allAudiobooks.map((ab) => (
          <Grid item key={ab.id} xs={4}>
            <PurchaseCard data={ab} onPurchase={handlePurchase} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Collection</title>
        <meta name="description" content="Awesome Audiobooks - Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        <Header />
        <br />
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Collection
        </Typography>
        <br />
        <br />

        {renderAllAudiobooks()}
      </Container>
    </>
  );
};

export default Home;
