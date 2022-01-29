import { NextApiRequest, NextApiResponse } from 'next';

export default function getAudiobooks(req: NextApiRequest, res: NextApiResponse) {
  const audiobookMappings: { [key: string]: string } = {
    '0': 'https://tribeofnoisestorage.blob.core.windows.net/music/c9c84bcc00f348f658d608fdae8ba903.mp3',
    '1': 'https://tribeofnoisestorage.blob.core.windows.net/music/13bbe764d8c38dd77a1eb738058e5a3c.mp3',
    '2': 'https://tribeofnoisestorage.blob.core.windows.net/music/fcc168bdb12727023a7a8e67298d0ff2.mp3',
    '3': 'https://tribeofnoisestorage.blob.core.windows.net/music/6c9048255985c999b1233ed71edba617.mp3',
    '4': 'https://tribeofnoisestorage.blob.core.windows.net/music/8b9111de37b62c141fd1cdf2286c50be.mp3',
    '5': 'https://tribeofnoisestorage.blob.core.windows.net/music/f6dc2538a1a480b0fe1cf954c119e1f4.mp3',
    '6': 'https://tribeofnoisestorage.blob.core.windows.net/music/5148dcf6c53777ba4aa2119c4cf0f0e1.mp3',
    '7': 'https://tribeofnoisestorage.blob.core.windows.net/music/0934b62d95e85b9f927135fca72c551a.mp3',
  };
  const { tokenIds } = req.body;
  const audiobooks: { [key: string]: string } = {};

  (tokenIds as string[]).forEach((id: string) => {
    audiobooks[id] = audiobookMappings[id];
  });

  // const audiobooks = {
  //   [tokenId]: audiobookMappings[tokenId],
  // };

  res.status(201).json(audiobooks);
}
