import React, { FC } from 'react';
import { IAudiobookData } from '../../models/audiobook';
import { AudioCard } from '../audio-card';

interface PurchaseCardProps {
  data: IAudiobookData;
  onPurchase: (tokenId: string, quantity?: number) => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ data, onPurchase }) => {
  return (
    <AudioCard {...data} buttonName="Purchase" buttonHandle={onPurchase} nameHandle={() => {}} />
  );
};

export default PurchaseCard;
