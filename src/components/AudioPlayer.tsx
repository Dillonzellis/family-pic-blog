// @ts-nocheck

"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react"; // Import Pause icon as well

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // New state to track playing status

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying); // Toggle the playing state
      console.log(isPlaying ? "Pause button clicked" : "Play button clicked");
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onloadeddata = () => {
        console.log("Audio loaded and ready to play");
      };
      audio.onerror = (e: ErrorEvent) => {
        console.error("Error in loading audio", e);
      };
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/walking.mp3" />
      <Button variant="outline" size="icon" onClick={togglePlay}>
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>
    </>
  );
};

export default AudioPlayer;
