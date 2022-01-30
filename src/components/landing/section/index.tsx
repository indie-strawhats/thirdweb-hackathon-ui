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
        } flex-col items-center px-5 mx-auto gap-20`}
      >
        <div className="w-5/6 h-full md:w-1/3">
          <ColorBlobWrapper>
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
        <div className="flex flex-col items-center p-16 mb-16 text-center lg:flex-grow md:w-1/2 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-4xl font-medium text-indigo-500">{sectionHeading}</h1>
          <p className="mb-8 leading-relaxed">{textContent}</p>
        </div>
      </div>
    </section>
  );
};

export default Section;
