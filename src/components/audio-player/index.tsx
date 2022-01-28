import React, { useContext, useRef } from 'react';
import { AudioPlayerContext } from '../../providers/audio-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface Props {}

export default function CustomAudioPlayer({ }: Props) {

    const {
        setIsVisible,
        audiobookData,
    } = useContext<any>(AudioPlayerContext);

    const audio = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio(audiobookData.fileUrl) : undefined
    )

    console.log("audio : ", audio.current)

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
                    <div className="rounded-full bg-red-400 shadow-lg">
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /></svg>
                    </div>
                    <div className="flex justify-between text-lg text-grey-darker">
                        <p>0:40</p>
                    </div>
                    {/* <div className="flex w-3/5 bg-gray-200 h-1 mb-6">
        <div className="bg-blue-600 h-1" style={{ width: 20 + "%" }}></div>
      </div> */}
                    <input type="range"
                        className="form-range w-4/6 h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
                        defaultValue={10}
                    />
                    <div className="flex justify-between text-lg text-grey-darker">
                        <p>4:20</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
