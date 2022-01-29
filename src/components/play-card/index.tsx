import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';
import Image from 'next/image';
import { AudioPlayerContext } from '../../providers/audio-player';
import { AudioCard } from '../audio-card';
import { IAudiobookData } from '../../models/audiobook';

interface PlayCardProps {
  data: IAudiobookData;
  onPurchase: (tokenId: number, quantity?: number) => void;
}

const PlayCard: FC<PlayCardProps> = ({ data, onPurchase }) => {
  const router = useRouter();
  const { setAudiobookData, setIsVisible } = useContext<any>(AudioPlayerContext);

  const handlePlay = () => {
    setAudiobookData(data);
    setIsVisible(true);
  };

  const handleName = (id: string) => {
    router.push('/owned/' + id);
  };

  return (
    <AudioCard {...data} nameHandle={handleName} buttonName="Play" buttonHandle={handlePlay} />
  );
};

export default PlayCard;
