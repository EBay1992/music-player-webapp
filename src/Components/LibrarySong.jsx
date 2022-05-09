import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const { name, cover, artist, active } = song;
  return (
    <div
      className={`librarySong ${active ? "selected" : ""}`}
      onClick={() => {
        const selectedSong = songs.filter((s) => s.id === song.id);
        const newSongs = songs.map((s) => {
          if (s.id === song.id) {
            return { ...s, active: true };
          } else {
            return { ...s, active: false };
          }
        });

        setSongs(newSongs);
        setCurrentSong({ ...selectedSong[0], active: true });
        playAudio(isPlaying, audioRef);
      }}
    >
      <img alt={name} className="picture" src={cover} />
      <div className="songDescription">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
