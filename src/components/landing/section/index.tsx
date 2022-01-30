import React, { FC } from 'react';
import Image from 'next/image';
import ColorBlobWrapper from '../color-blob-wrapper';

type ImagePosition = 'left' | 'right';

interface SectionProps {
  image: string;
  sectionHeading: string;
  textContent: string;
  imagePosition?: ImagePosition;
}

const Section: FC<SectionProps> = ({ image, sectionHeading, textContent, imagePosition }) => {
  return (
    <section className="text-gray-600 body-font">
      <div
        className={`container flex ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
        } flex-col items-center px-5 py-8 mx-auto gap-20`}
      >
        <div className="w-5/6 h-full lg:max-w-xl lg:w-full md:w-1/2">
          <ColorBlobWrapper blobSize="large">
            <div className="rounded">
              <Image
                width={'100%'}
                height={'100%'}
                layout="responsive"
                className="object-center"
                alt="hero"
                src={image}
              />
            </div>
          </ColorBlobWrapper>
        </div>
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
            {sectionHeading}
          </h1>
          <p className="mb-8 leading-relaxed">{textContent}</p>
        </div>
      </div>
    </section>
  );
};

export default Section;
