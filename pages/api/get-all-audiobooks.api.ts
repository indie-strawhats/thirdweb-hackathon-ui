import { NextApiRequest, NextApiResponse } from 'next';
import { IAudiobookAPIData } from '../../src/models/audiobook';
import { AudiobookData } from './constants';

export default function getAllAudiobooks(req: NextApiRequest, res: NextApiResponse) {
  const { tokenIds } = req.body;
  const audiobooks: { [key: string]: IAudiobookAPIData } = {};

  (tokenIds as string[]).forEach((id: string) => {
    const audioBook = AudiobookData.find((ab) => ab.id === id);

    if (audioBook) {
      audiobooks[id] = {
        id: audioBook.id,
        name: audioBook.name,
        desc: audioBook.desc,
        writtenBy: audioBook.writtenBy,
      };
    }
  });

  res.status(201).json(audiobooks);
}
