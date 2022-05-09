import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryIsOpen,
}) => {
  return (
    <div className={`library ${libraryIsOpen ? "libraryIsOpen" : ""}`.trim()}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          setSongs={setSongs}
          isPlaying={isPlaying}
          audioRef={audioRef}
          song={song}
          key={song.id}
          songs={songs}
          setCurrentSong={setCurrentSong}
        />
      ))}
    </div>
  );
};

export default Library;
