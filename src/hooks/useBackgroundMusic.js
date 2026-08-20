import { useEffect } from 'react';

export default function useBackgroundMusic(source, { volume = 0.35 } = {}) {
  useEffect(() => {
    const music = new Audio(source);
    music.loop = true;
    music.preload = 'auto';
    music.volume = volume;

    const startMusic = () => {
      music.play().catch(() => {});
    };

    startMusic();
    window.addEventListener('pointerdown', startMusic, { once: true });

    return () => {
      window.removeEventListener('pointerdown', startMusic);
      music.pause();
      music.currentTime = 0;
      music.src = '';
    };
  }, [source, volume]);
}
