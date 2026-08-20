import { useEffect } from 'react';
import clickSound from '../assets/soundeffect/ui-click.wav';

const AUDIO_POOL_SIZE = 4;
const CLICK_VOLUME = 0.28;

export default function useGlobalClickSound() {
  useEffect(() => {
    const audioPool = Array.from({ length: AUDIO_POOL_SIZE }, () => {
      const audio = new Audio(clickSound);
      audio.preload = 'auto';
      audio.volume = CLICK_VOLUME;
      return audio;
    });
    let nextAudioIndex = 0;

    const playClickSound = (event) => {
      if (event.button !== 0) return;

      const audio = audioPool[nextAudioIndex];
      nextAudioIndex = (nextAudioIndex + 1) % audioPool.length;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Browser อาจปฏิเสธเสียงก่อนมี user interaction ครั้งแรก
      });
    };

    window.addEventListener('pointerdown', playClickSound);

    return () => {
      window.removeEventListener('pointerdown', playClickSound);
      audioPool.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
}
