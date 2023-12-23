"use client";

import { useRef, useEffect } from "react";

import { Button } from "./ui/button";
import { Play } from "lucide-react";

const AudioPlayer = () => {
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef?.current.play();
    console.log("Play button clicked");
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.onloadeddata = () => {
      console.log("Audio loaded and ready to play");
    };
    audio.onerror = (e) => {
      console.error("Error in loading audio", e);
    };
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
