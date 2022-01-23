import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ReactAudioPlayer from 'react-audio-player';

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
        <ReactAudioPlayer src={data.fileUrl} controls />
      </CardActions>
    </Card>
  );
};

export default PlayCard;
