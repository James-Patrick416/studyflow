// src/utils/useTimer.js
import { useState, useEffect } from 'react';

export default function useTimer(initialMinutes, onComplete) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            onComplete();
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, onComplete]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = (newMinutes = initialMinutes) => {
    setIsActive(false);
    setMinutes(newMinutes);
    setSeconds(0);
  };

  return {
    minutes,
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    setMinutes
  };
}