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
  onPurchase: (tokenId: number, quantity?: number) => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ data, onPurchase }) => {
  return (
    <div>
      <div>
        <h3>#{data.id}</h3>
        <h5>{data.name}</h5>
        <p>{data.desc}</p>
      </div>
      <div>
        <button onClick={() => onPurchase(Number(data.id))}>Purchase</button>
      </div>
    </div>
  );
};

export default PurchaseCard;
