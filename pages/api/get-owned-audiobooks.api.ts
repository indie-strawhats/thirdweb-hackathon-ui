import { NextApiRequest, NextApiResponse } from 'next';
import { IOwnedAudiobookAPIData } from '../../src/models/audiobook';
import { AudiobookData } from './constants';

export default function getOwnedAudiobooks(req: NextApiRequest, res: NextApiResponse) {
  const { tokenIds } = req.body;
  const audiobooks: { [key: string]: IOwnedAudiobookAPIData } = {};

  (tokenIds as string[]).forEach((id: string) => {
    const audioBook = AudiobookData.find((ab) => ab.id === id);

    if (audioBook) {
      audiobooks[id] = {
        id: audioBook.id,
        name: audioBook.name,
        desc: audioBook.desc,
        fileUrl: audioBook.fileUrl,
        writtenBy: audioBook.writtenBy,
      };
    }
  });

  res.status(201).json(audiobooks);
}
