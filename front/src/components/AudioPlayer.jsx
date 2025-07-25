import React, { useRef, useState, useEffect } from "react";
import "./audioPlayer.css";
import { IoPlay, IoPause } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { RiRepeatOneFill } from "react-icons/ri"; // for repeat icon

const AudioPlayer = ({ src, title, children }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLooping, setIsLooping] = useState(false); // NEW

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleLoop = () => {
        setIsLooping((prev) => !prev);
    };

    const seek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const format = (time) => new Date(time * 1000).toISOString().slice(14, 19);

    return (
        <div className="audio-player">
            <div className="audio-icons" style={{ display: 'flex', gap: '0.4rem' }}>
                <button className="toggle-button" onClick={togglePlay}>
                    {isPlaying ? <IoPause /> : <IoPlay />}
                </button>

                {/* 🔁 Repeat toggle button */}
                <button
                    className={`toggle-button ${isLooping ? "active" : ""}`}
                    onClick={toggleLoop}
                    title="Toggle Repeat"
                >
                    <RiRepeatOneFill style={{ color: isLooping ? "#0abdc6" : "#e0f7fa" }} />
                </button>

                {children}
            </div>

            {/* 🎵 Audio */}
            <audio ref={audioRef} src={src} loop={isLooping} />

            {/* Progress bar */}
            <div className="progress">
                <input type="range" value={currentTime} max={duration} onChange={seek} />
                <span>{format(duration)}</span>
            </div>

            <h3 style={{ margin: '0', padding: '0', fontSize: '0.8rem' }}>{title}</h3>
        </div>
    );
};

export default AudioPlayer;
