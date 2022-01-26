import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';
import Image from 'next/image';
import { AudioPlayerContext } from '../../providers/audio-player';
import { AudioCard } from '../audio-card';

interface IAudiobookCard {
  id: string;
  name: string;
  desc: string;
  image: string;
  uri: string;
  fileUrl: string;
  properties: any;
}

interface PlayCardProps {
  data: IAudiobookCard;
  onPurchase: (tokenId: number, quantity?: number) => void;
}

const PlayCard: FC<PlayCardProps> = ({ data, onPurchase }) => {
  const { id, name, desc, image } = data;
  const router = useRouter();
  const { setAudiobookData, setIsVisible } =
    useContext<any>(AudioPlayerContext);

  const handlePlay = () => {
    setAudiobookData(data);
    setIsVisible(true);
  };

  const handleName = (id: string) => {
    router.push('/owned/' + id);
  };

  return (
    <AudioCard
      id={id}
      name={name}
      nameHandle={handleName}
      desc={desc}
      image={image}
      buttonName='Play'
      buttonHandle={handlePlay}
    />
  );
};

export default PlayCard;
