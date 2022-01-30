import React, { useContext, useEffect, useRef, useState } from 'react';
import { AudioPlayerContext } from '../../providers/audio-player';
import { secondsToMinutes } from '../../helpers/utils';
import { BiX, BiPlayCircle, BiPauseCircle } from 'react-icons/bi';
import Image from 'next/image';

export interface Props {}

export default function CustomAudioPlayer({}: Props) {
  const { setIsVisible, audiobookData } = useContext<any>(AudioPlayerContext);

  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0.0);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [paused, setPaused] = useState(false);

  console.log(audiobookData);

  useEffect(() => {
    if (audio) audio.pause();

    setPaused(false);
    setAudio(typeof Audio !== 'undefined' ? new Audio(audiobookData.fileUrl) : undefined);
    return () => {
      if (!audio) return;

      audio.pause();
      setPaused(false);
    };
  }, [audiobookData.fileUrl]);

  useEffect(() => {
    if (!audio) return;

    audio.load();
    audio.play();
    audio.onloadedmetadata = function () {
      setAudioDuration(audio.duration);
      audio.ontimeupdate = () => {
        setAudioCurrentTime(audio?.currentTime);
      };
    };
  }, [audio]);

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
                if (!audio) return;

                audio.pause();
                setPaused(false);
                setIsVisible(false);
              }}
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          {paused ? (
            <BiPlayCircle
              className="text-4xl text-indigo-500 cursor-pointer"
              onClick={() => {
                audio?.play();
                setPaused(false);
              }}
            />
          ) : (
            <BiPauseCircle
              className="text-4xl text-indigo-500 cursor-pointer"
              onClick={() => {
                audio?.pause();
                setPaused(true);
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
                  if (!audio) return;

                  const newCurrentTimeValue = parseFloat(e.target.value);
                  audio.currentTime = newCurrentTimeValue;
                  setAudioCurrentTime(newCurrentTimeValue);
                }}
                value={audioCurrentTime}
              />
            </div>
            <div className="flex justify-between text-lg text-grey-darker">
              <p>{secondsToMinutes(audioDuration).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
