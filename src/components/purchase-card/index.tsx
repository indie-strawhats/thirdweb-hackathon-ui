import React, { FC } from 'react';
import { AudioCard, AudioCardProps } from '../audio-card';

interface PurchaseCardProps {
  data: AudioCardProps;
  onPurchase: (tokenId: string, quantity?: number) => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ data, onPurchase }) => {
  return (
    <AudioCard
      {...data}
      buttonName="Purchase"
      buttonHandle={onPurchase}
      nameHandle={() => {}}
    />
  );
};

export default PurchaseCard;
