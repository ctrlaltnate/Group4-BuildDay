import { useCallback, useEffect, useRef } from 'react';

export default function useSoundEffect(source, { volume = 0.3, poolSize = 3 } = {}) {
  const audioPoolRef = useRef([]);
  const nextAudioIndexRef = useRef(0);

  useEffect(() => {
    audioPoolRef.current = Array.from({ length: poolSize }, () => {
      const audio = new Audio(source);
      audio.preload = 'auto';
      audio.volume = volume;
      return audio;
    });

    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioPoolRef.current = [];
    };
  }, [poolSize, source, volume]);

  return useCallback(() => {
    const audioPool = audioPoolRef.current;
    if (audioPool.length === 0) return;

    const audio = audioPool[nextAudioIndexRef.current];
    nextAudioIndexRef.current =
      (nextAudioIndexRef.current + 1) % audioPool.length;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);
}
