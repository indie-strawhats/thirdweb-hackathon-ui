import React, { FC } from 'react';
import { IAudiobookData } from '../../models/audiobook';
import { AudioCard } from '../audio-card';

interface PurchaseCardProps {
  className: string;
  data: IAudiobookData;
  onPurchase: (name: string, tokenId: string, quantity?: number) => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ className, data, onPurchase }) => {
  return (
    <AudioCard
      {...data}
      className={className}
      buttonName="Purchase"
      buttonHandle={onPurchase}
      nameHandle={() => {}}
    />
  );
};

export default PurchaseCard;
