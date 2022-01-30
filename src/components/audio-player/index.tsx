import React, { useContext, useEffect, useRef, useState } from 'react';
import { AudioPlayerContext } from '../../providers/audio-player';
import { secondsToMinutes } from '../../helpers/utils';
import { BiX, BiPlayCircle, BiPauseCircle } from "react-icons/bi";

export interface Props { }

export default function CustomAudioPlayer({ }: Props) {

    const {
        setIsVisible,
        audiobookData,
    } = useContext<any>(AudioPlayerContext);

    const [audioDuration, setAudioDuration] = useState<Number>(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState(0.00);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [paused, setPaused] = useState(false);

    useEffect(() => {

        console.log("New audio loading !");
        if (audio) audio.pause();

        setPaused(false);
        setAudio(typeof Audio !== "undefined" ? new Audio(audiobookData.fileUrl) : undefined);
        return () => {
            if (!audio) return

            audio.pause();
            setPaused(false);
        }
    }, [audiobookData.fileUrl])

    useEffect(() => {
        if (!audio) return;

        console.log("playig audio");
        audio.load();
        audio.play();
        audio.onloadedmetadata = function () {
            setAudioDuration(audio.duration)
            audio.ontimeupdate = () => {
                setAudioCurrentTime(audio?.currentTime)
            };
        }
    }, [audio])

    return (
        <div className="fixed bottom-0 flex w-full">
            <div className="w-full bg-stone-400 shadow-lg rounded-lg">
                <div className="">
                    <BiX size="3vh"
                        onClick={() => {
                            if (!audio) return

                            audio.pause();
                            setPaused(false);
                            setIsVisible(false)
                        }}
                    />
                </div>
                <div className="w-full inline-flex justify-start">
                    <div className="p-3">
                        <img className="w-1/4 rounded hidden md:block" src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic" />
                    </div>
                    <div className="w-full">
                        <h3 className="text-2xl text-grey-darkest font-medium">{audiobookData.name}</h3>
                        <p className="text-sm text-grey mt-1">{audiobookData.desc}</p>
                    </div>
                </div>
                <div className="w-full inline-flex px-3 gap-3">
                    {
                        paused ?
                            <BiPlayCircle
                                size="3vh"
                                onClick={() => {
                                    audio?.play();
                                    setPaused(false)
                                }} />
                            :
                            <BiPauseCircle
                                size="3vh"
                                onClick={() => {
                                    audio?.pause()
                                    setPaused(true)
                                }} />
                    }
                    <div className="flex justify-between text-lg text-grey-darker">
                        <p>{secondsToMinutes(audioCurrentTime).toFixed(2)}</p>
                    </div>
                    <input type="range"
                        className="form-range w-4/6 h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
                        min="0"
                        max={`${audioDuration}`}
                        onChange={(e) => {
                            if (!audio) return

                            const newCurrentTimeValue = parseFloat(e.target.value);
                            audio.currentTime = newCurrentTimeValue
                            setAudioCurrentTime(newCurrentTimeValue)
                        }}
                        value={audioCurrentTime}
                    />
                    <div className="flex justify-between text-lg text-grey-darker">
                        <p>{secondsToMinutes(audioDuration).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
