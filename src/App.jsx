import "./styles/App.scss";

import React, { useRef, useState } from "react";
import Player from "./Components/Player";
import Song from "./Components/Song";
import data from "./data";
import Library from "./Components/Library";
import Nav from "./Components/Nav";
import { playAudio } from "./util";

const App = () => {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    duration: null,
    currentTime: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryIsOpen, setLibraryIsOpen] = useState(false);

  const audioRef = useRef(null);

  const loadedMetadataHandler = (e) => {
    setSongInfo({ ...songInfo, duration: e.target.duration });
  };

  const updateTimeHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.currentTime });
  };

  const endHandler = () => {
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    if (idx !== songs.length - 1) {
      setCurrentSong(songs[idx + 1]);
    } else {
      setCurrentSong(songs[0]);
    }

    playAudio(isPlaying, audioRef, setIsPlaying);
  };

  return (
    <div className="app">
      <Nav libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} />
      <Library
        libraryIsOpen={libraryIsOpen}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
        audioRef={audioRef}
      />
      <div className={`container ${libraryIsOpen ? "moveRight" : ""}`}>
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          audioRef={audioRef}
          setSongInfo={setSongInfo}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setSongs={setSongs}
        />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={loadedMetadataHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={endHandler}
        src={currentSong.audio}
      />
    </div>
  );
};

export default App;
