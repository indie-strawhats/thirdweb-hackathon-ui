export interface IAudiobookData {
  id: string;
  name: string;
  desc: string;
  properties: any;
  image: string;
  uri: string;
  price: string;
  currencyUnit: string;
  balance: number;
  writtenBy: string;
}

export interface IOwnedAudiobookData extends IAudiobookData {
  fileUrl: string;
}

export interface IEntireAudiobookData extends IOwnedAudiobookData {
  narratedBy: string;
  ratings: number;
  len: string;
  releaseDate: string;
  category: string;
  publisher: string;
  lang: string;
}

export interface IAudiobookAPIData {
  id: string;
  name: string;
  desc: string;
  writtenBy: string;
}
export interface IOwnedAudiobookAPIData extends IAudiobookAPIData {
  fileUrl: string;
}

export interface IEntireAudiobookAPIData extends IOwnedAudiobookAPIData {
  img: string;
  narratedBy: string;
  lang: string;
  ratings: number;
  len: string;
  releaseDate: string;
  publisher: string;
  category: string;
}
