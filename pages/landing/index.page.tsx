import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react';

const LandingPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Awesome Audiobooks</title>
        <meta name='description' content='Awesome Audiobooks' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      Landing Page
    </div>
  );
};

export default LandingPage;
