import { ThirdwebSDK } from '@3rdweb/sdk';
import { Grid, Typography } from '@mui/material';
import { useEthers } from '@usedapp/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PurchaseCard from '../src/components/purchase-card';

const Home: NextPage = () => {
  const { library } = useEthers();

  const [allAudiobooks, setAllAudiobooks] = useState<any[]>([]);

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
          <Grid item key={ab.id} xs={6}>
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
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Collection
      </Typography>
      <br />
      <br />

      {renderAllAudiobooks()}
    </>
  );
};

export default Home;
