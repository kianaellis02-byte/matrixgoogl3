import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AudioContextType {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  hasStarted: boolean;
  setHasStarted: (value: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    audioRef.current = new Audio('/audio/songweb1.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Reset when coming back to home
  useEffect(() => {
    if (location.pathname === '/' && previousPath.current !== '/') {
      // Coming back to home - reset everything
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setHasStarted(false);
    }
    previousPath.current = location.pathname;
  }, [location.pathname]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, hasStarted, setHasStarted }}>
      {children}
    </AudioContext.Provider>
  );
};
