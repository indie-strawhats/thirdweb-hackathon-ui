import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{data.id}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => router.push('/owned/' + data.id)}
        >
          {data.name}
        </Typography>
        <Typography variant="body2">{data.desc}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handlePlay}>
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayCard;
