// @ts-nocheck

"use client";

import { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      console.log("Play button clicked");
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
      <Button variant="outline" size="icon" onClick={playAudio}>
        <Play className="h-5 w-5" />
      </Button>
    </>
  );
};

export default AudioPlayer;
