import React, { useContext, useEffect, useRef, useState } from 'react';
import { AudioPlayerContext } from '../../providers/audio-player';
import { secondsToMinutes } from '../../helpers/utils';
import { BiX, BiPlayCircle, BiPauseCircle, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import Image from 'next/image';

const CustomAudioPlayer = () => {
  const { setIsVisible, audiobookData } = useContext<any>(AudioPlayerContext);

  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setcurrentVolume] = useState<number>(1.0);
  const [beforeMuteVolume, setBeforeMuteVolume] = useState<number>(1.0);

  const audioRef = useRef<HTMLAudioElement>(new Audio(audiobookData.fileUrl));

  useEffect(() => {
    audioRef.current.volume = currentVolume;
  });

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(audiobookData.fileUrl);
    audioRef.current.play();
    audioRef.current.onloadedmetadata = () => {
      setAudioDuration(audioRef.current.duration);
      audioRef.current.ontimeupdate = () => {
        setAudioCurrentTime(audioRef.current.currentTime);
      };
    };

    setIsPlaying(true);
  }, [audiobookData.fileUrl]);

  return (
    <div className="fixed bottom-0 flex w-full">
      <div className="flex flex-col w-full gap-2 p-4 bg-white border-t shadow-lg">
        <div className="flex justify-between">
          <div className="flex text-gray-800">
            <div className="mr-8">
              <Image
                className="rounded-lg"
                src={audiobookData.image}
                alt="Album Pic"
                width="80px"
                height="80px"
                layout="fixed"
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-2xl font-semibold">{audiobookData.name}</h3>
              <p className="mt-1 text-sm">{audiobookData.writtenBy}</p>
              <p className="mt-1 text-sm">{audiobookData.desc}</p>
            </div>
          </div>
          <div className="self-start">
            <BiX
              className="text-5xl text-indigo-500 transition-transform cursor-pointer hover:scale-125"
              onClick={() => {
                setIsPlaying(false);
                setIsVisible(false);
              }}
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          {!isPlaying ? (
            <BiPlayCircle
              className="ml-5 text-4xl text-indigo-500 cursor-pointer"
              onClick={() => {
                setIsPlaying(true);
              }}
            />
          ) : (
            <BiPauseCircle
              className="ml-5 text-4xl text-indigo-500 cursor-pointer"
              onClick={() => {
                setIsPlaying(false);
              }}
            />
          )}
          <div className="flex items-center gap-2 ml-6 grow">
            <div className="flex justify-between text-lg text-grey-darker">
              <p>{secondsToMinutes(audioCurrentTime).toFixed(2)}</p>
            </div>
            <div className="flex items-center grow">
              <input
                type="range"
                className="w-full form-range focus:outline-none focus:ring-0 focus:shadow-none"
                min="0"
                max={`${audioDuration}`}
                onChange={(e) => {
                  const newCurrentTimeValue = parseFloat(e.target.value);
                  audioRef.current.currentTime = newCurrentTimeValue;
                  setAudioCurrentTime(newCurrentTimeValue);
                }}
                value={audioCurrentTime}
              />
            </div>
            <div className="flex justify-between text-lg text-grey-darker">
              <p>{secondsToMinutes(audioDuration).toFixed(2)}</p>
            </div>
          </div>
          {currentVolume ? (
            <BiVolumeFull
              className="ml-5 text-4xl text-indigo-500 cursor-pointer"
              onClick={() => {
                setBeforeMuteVolume(currentVolume);
                setcurrentVolume(0.0);
              }}
            />
          ) : (
            <BiVolumeMute
              className="ml-5 text-4xl text-indigo-500 cursor-pointer"
              onClick={() => {
                setcurrentVolume(beforeMuteVolume);
              }}
            />
          )}
          <input
            type="range"
            value={currentVolume}
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => {
              setcurrentVolume(parseFloat(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
