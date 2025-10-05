import {useState, useEffect, useRef} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {PLAYLIST} from "./data/playlist.js";

const AudioPlayer = ({PLAYLIST}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const  [currentIndex, setCurrentIndex] = useState(0);
    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        console.log();
        setSongInfo({
            currentTime: current,
            duration,
            animationPercentage: animation,
        });
    };
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const formatTime = (time) => {
        if (!time) {
            return '00:00';
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    const handleSeek = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setSongInfo(prev => ({
            ...prev,
            currentTime: newTime
        }));

    };
    useEffect(() => {
        if (audioRef.current) {
            if(isPlaying) {
                audioRef.current.play();
            }else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentIndex]);

    const increment = () => {
        if (currentIndex < PLAYLIST.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }else {
            setCurrentIndex(0);
        }
    };
    const decrement = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentIndex(0);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            increment();
        };
        if (audio) {
            audio.addEventListener('ended', handleEnded);
        }
        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleEnded);
            }
        };
    }, [currentIndex]);

    return (
        <>
            <audio
                src={PLAYLIST[currentIndex].src}
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}

            />
            <div className="infos">
                <h2>{PLAYLIST[currentIndex].title}</h2>
                <p>{PLAYLIST[currentIndex].artist}</p>
                <img src={PLAYLIST[currentIndex].cover} alt="cover" />
            </div>
            <div className="seek-bar-container">
                <input
                    type="range"
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={handleSeek}
                    className="seek-bar"
                />
            </div>
            <div className="time-display">
                <span>{formatTime(songInfo.currentTime)}</span> / <span>{formatTime(songInfo.duration)}</span>
            </div>
            <div>
                <button className="Button_precedent" onClick={decrement}>Précédent</button>
                <button className="Button_play" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button className="Button_Suivant" onClick={increment}>Suivant</button>
            </div>
        </>
    );
}

function MusicApp() {
    return <AudioPlayer PLAYLIST={PLAYLIST} />

}

function App() {
    useEffect(() => {
        document.title = "Lofi";
    }, []);
  return (
    <>
        <div className="App">
            <header className="Lofi">Lofi</header>
        </div>
        <MusicApp />
    </>
  );
}
export default App
