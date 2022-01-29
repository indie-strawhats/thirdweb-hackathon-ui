import React, { useContext, useEffect, useRef, useState } from 'react';
import { AudioPlayerContext } from '../../providers/audio-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

export interface Props { }

export default function CustomAudioPlayer({ }: Props) {

    const {
        setIsVisible,
        audiobookData,
    } = useContext<any>(AudioPlayerContext);

    const [audio, setAudio] = useState();
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        console.log("new url");
        audio?.pause();
        setPaused(false);
        setAudio(typeof Audio !== "undefined" ? new Audio(audiobookData.fileUrl) : undefined);

    }, [audiobookData.fileUrl])

    useEffect(() => {
        audio?.load();
        audio?.play();
    }, [audio])

    return (
        <div className="fixed bottom-0 flex w-full">
            <div className="w-full bg-stone-400 shadow-lg rounded-lg">
                <div className="">
                    <button type="button"
                        className="inline-block rounded-full bg-stone-400 text-white leading-normal uppercase hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
                        onClick={() => setIsVisible(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="w-full inline-flex justify-start">
                    <div className="p-3">
                        <img className="w-1/4 rounded hidden md:block" src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic" />
                    </div>
                    <div className="w-full">
                        <h3 className="text-2xl text-grey-darkest font-medium">A Sky Full of Stars</h3>
                        <p className="text-sm text-grey mt-1">Ghost Stories</p>
                    </div>
                </div>
                <div className="w-full inline-flex px-3 gap-3">
                    {
                        paused ?
                            <FontAwesomeIcon icon={faPlayCircle}
                                size="lg"
                                onClick={() => {
                                    audio?.play();
                                    setPaused(false)
                                }} />
                            :
                            <FontAwesomeIcon icon={faPauseCircle}
                                size="lg"
                                onClick={() => {
                                    audio?.pause()
                                    setPaused(true)
                                }} />
                    }
                    <div className="flex justify-between text-lg text-grey-darker">
                        <p>0:00</p>
                    </div>
                    <input type="range"
                        className="form-range w-4/6 h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
                        defaultValue={10}
                        onChange={(e) => { console.log("range event : ", e.target.value) }}
                    />
                    <div className="flex justify-between text-lg text-grey-darker">
                        <p>4:20</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
