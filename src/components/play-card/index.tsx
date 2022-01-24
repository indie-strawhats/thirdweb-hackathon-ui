import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';
import { AudioPlayerContext } from '../../providers/audio-player';

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
  const router = useRouter();
  const { setAudiobookData, setIsVisible } =
    useContext<any>(AudioPlayerContext);

  const handlePlay = () => {
    setAudiobookData(data);
    setIsVisible(true);
  };

  return (
    <div>
      <div>
        <h3>#{data.id}</h3>
        <h5
          style={{
            cursor: 'pointer',
          }}
          onClick={() => router.push('/owned/' + data.id)}
        >
          {data.name}
        </h5>
        <p>{data.desc}</p>
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
};

export default PlayCard;
