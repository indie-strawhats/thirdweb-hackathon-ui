import { ConnectWallet } from '@3rdweb/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Section from '../src/components/landing/section';

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Audiobooks</title>
        <meta name="description" content="Audiobooks" />
      </Head>

      <div className="w-full h-20 bg-white">
        <div className="flex items-center justify-between w-full h-full px-8 m-auto max-w-7xl">
          <Link href="/" passHref>
            <a
              className="text-5xl font-semibold glowing-text"
              style={{ fontFamily: 'Cookie, cursive' }}
            >
              Audiobooks
            </a>
          </Link>
          <div className="flex items-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
      <div className="w-full px-8 m-auto max-w-7xl">
        <div className="w-full py-24 mb-24">
          <div className="flex flex-col items-start max-w-4xl m-auto">
            <p
              className="flex flex-col items-start mb-16 font-extrabold tracking-tight uppercase text-8xl glowing-text"
              style={{
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span>Experience</span>
              <span>Premium</span>
              <span>Story-telling</span>
            </p>
            <Link href="/explore" passHref>
              <button className="inline-flex items-center justify-center p-0.5 mb-2 bg-white border-pink-500 border rounded-lg hover:scale-105 transition-transform">
                <span
                  className="px-10 py-4 text-xl font-semibold tracking-normal uppercase transition-all duration-75 ease-in group-hover:bg-opacity-0 glowing-text"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Explore
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-32">
          <Section
            image={'/images/happy-music.svg'}
            sectionHeading="Play from massive library."
            textContent="Listen to the stories you love, and discover more from hand-picked collection."
          />
          <Section
            image={'/images/yoga.svg'}
            sectionHeading="Stories that expand perspective."
            textContent="Stories open a door for us. We can travel to places we would never go, live in times we would never know, and feel joys we would have never found."
            imagePosition="right"
          />
          <Section
            image={'/images/gift-to-love.svg'}
            sectionHeading="Sharing is Caring."
            textContent="Gift your favorite storybook to your loved ones."
          />
        </div>
      </div>
      <div className="grid w-full h-32 mt-16 text-xl text-gray-800 place-content-center">
        <p>Powered by ThirdWeb 🚀 </p>
      </div>
    </>
  );
};

export default LandingPage;
