import { NextApiRequest, NextApiResponse } from 'next';
import { AudiobookData } from './constants';

export default function getAudiobook(req: NextApiRequest, res: NextApiResponse) {
  const { tokenId } = req.body;

  const audiobook = AudiobookData.find((ab) => ab.id === tokenId);

  if (!audiobook) {
    res.status(404).json(null);
  }

  res.status(201).json(audiobook);
}
