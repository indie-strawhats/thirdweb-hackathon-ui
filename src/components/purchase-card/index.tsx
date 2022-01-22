import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';

interface IAudiobookCard {
  id: string;
  name: string;
  desc: string;
  image: string;
  uri: string;
  properties: any;
}

interface PurchaseCardProps {
  data: IAudiobookCard;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ data }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{data.id}
        </Typography>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2">{data.desc}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Purchase</Button>
      </CardActions>
    </Card>
  );
};

export default PurchaseCard;
