import { useEffect, useRef } from 'react';
import useGame from './useGame.js';

export default function useGameTimer({ isRunning, onTimeUp }) {
  const { timeLeft, setTimeLeft } = useGame();
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(intervalId);
          queueMicrotask(() => onTimeUpRef.current?.());
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, setTimeLeft]);

  return timeLeft;
}
