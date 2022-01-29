import { createContext, useState } from 'react';

export const AudioPlayerContext = createContext({});

export const AudioPlayerProvider = ({ children }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [audiobookData, setAudiobookData] = useState({});

  return (
    <AudioPlayerContext.Provider
      value={{
        isVisible,
        setIsVisible,
        audiobookData,
        setAudiobookData,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
