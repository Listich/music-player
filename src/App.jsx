import {useState, useEffect, useRef} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {PLAYLIST} from "./data/playlist.js";

const AudioPlayer = ({PLAYLIST}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const  [currentIndex, setCurrentIndex] = useState(0)
    let prevIndex = 0;

    useEffect(() => {
        if (audioRef.current) {
            if(isPlaying) {
                audioRef.current.play();
            }else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

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



    return (
        <>
            <audio src={PLAYLIST[currentIndex].src} ref={audioRef} />
            <div>
                <button className="Button_play" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button className="Button_Suivant" onClick={increment}>Suivant</button>
                <button className="Button_precedent" onClick={decrement}>Précédent</button>
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
