import React from "react";
import { playAudio } from "../util";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songInfo,
  audioRef,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
}) => {
  const playHandler = () => {
    setIsPlaying(() => !isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          type="range"
          onChange={dragHandler}
          value={songInfo.currentTime}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => {
            const newSongs = songs.map((s) => {
              if (s.id === currentSong.id) {
                return { ...s, active: true };
              } else {
                return { ...s, active: false };
              }
            });

            setSongs(newSongs);
            const idx = songs.findIndex((s) => s.id === currentSong.id);

            if (idx === 0) {
              setCurrentSong(songs.at(-1));
            } else {
              setCurrentSong(songs[idx - 1]);
            }

            playAudio(isPlaying, audioRef);
          }}
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => {
            const idx = songs.findIndex((s) => s.id === currentSong.id);
            const newSongs = songs.map((s) => {
              if (s.id === currentSong.id) {
                return { ...s, active: true };
              } else {
                return { ...s, active: false };
              }
            });

            setSongs(newSongs);

            if (idx !== songs.length - 1) {
              setCurrentSong(songs[idx + 1]);
            } else {
              setCurrentSong(songs[0]);
            }
            playAudio(isPlaying, audioRef);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
