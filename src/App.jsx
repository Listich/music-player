import {useState, useEffect, useRef} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {PLAYLIST} from "./data/playlist.js";

const AudioPlayer = ({PLAYLIST}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);


    useEffect(() => {
        if (audioRef.current) {
            if(isPlaying) {
                audioRef.current.play();
            }else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <>
            <audio src={PLAYLIST[0].src} ref={audioRef} />
            <div>
                <button className="Button_play" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
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
