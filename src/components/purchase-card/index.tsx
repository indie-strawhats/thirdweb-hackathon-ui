import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IAudiobookData } from '../../models/audiobook';
import { AudioCard } from '../audio-card';

interface PurchaseCardProps {
  className: string;
  data: IAudiobookData;
  onPurchase: (name: string, tokenId: string, quantity?: number) => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ className, data, onPurchase }) => {
  const router = useRouter();

  const handleName = (id: string) => {
    router.push('/owned/' + id);
  };
  return (
    <AudioCard
      {...data}
      className={className}
      buttonName="Purchase"
      buttonHandle={onPurchase}
      nameHandle={handleName}
    />
  );
};

export default PurchaseCard;
