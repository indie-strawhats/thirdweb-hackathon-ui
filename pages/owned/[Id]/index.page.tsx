import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Button from '../../../src/components/button';
import Header from '../../../src/components/header';
import { useWalletMembershipAccess } from '../../../src/hooks/useMembershipAccess';
import { AppWeb3Context } from '../../../src/providers/app-web3';
import { giftAudiobook } from '../../../src/services/web3';

const OwnedAudiobookPage: NextPage = () => {
  const {
    query: { Id },
  } = useRouter();

  const { dropBundleModule } = useContext(AppWeb3Context);

  const hasAccess = useWalletMembershipAccess(Id as string);

  const handleGiftAudiobook = async () => {
    if (!dropBundleModule) return;

    const response = await giftAudiobook(
      dropBundleModule,
      '0x0585Ab27743a0C0248166Ef169372B12f7C24C45',
      // '0x9ea3F80FC96f67CE06b2f4439625C4257c685aA8',
      Id as string,
      1
    );

    console.log(response);
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Audiobook #{Id}</title>
        <meta
          name="description"
          content={`Awesome Audiobooks - Audiobook #${Id}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h5 style={{ marginBottom: 10 }}>Audiobook #{Id}</h5>
      <br />
      <br />

      {hasAccess ? 'You have access' : 'You dont have access'}

      <Button variant="ghost" onClick={handleGiftAudiobook}>
        Gift Audiobook
      </Button>
    </>
  );
};

export default OwnedAudiobookPage;
