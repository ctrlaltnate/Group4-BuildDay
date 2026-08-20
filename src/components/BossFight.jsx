import { useCallback, useEffect, useRef, useState } from 'react';
import bossPhaseTwo from '../assets/villains/Final/boss-phase2.png';
import bossPhaseThree from '../assets/villains/Final/boss-phase3.png';
import bossPhaseOne from '../assets/villains/v.idle.png';
import battleBackground from '../assets/ui/bg_flappygame.jpeg';
import bossAttackSound from '../assets/soundeffect/boss_toom.mp3';
import neetiAttackSound from '../assets/soundeffect/neeti-added.mp3';
import playerAttackSound from '../assets/soundeffect/coin-collect.wav';
import battleMusic from '../assets/soundeffect/survival-bgm.ogg';
import transformSound from '../assets/soundeffect/survival-win.ogg';
import useBackgroundMusic from '../hooks/useBackgroundMusic.js';
import { useBossPhase } from '../hooks/useBossPhase.js';
import useSoundEffect from '../hooks/useSoundEffect.js';
import { defaultWeapon, weapons } from '../mock-data/weapons.js';
import HealthBar from './ui/HealthBar.jsx';

export default function BossFight({
  initialPlayerHp,
  initialBossHp = 2000,
  character,
  weapon = defaultWeapon,
  onPlayerHpChange,
  onBossHpChange,
  onGameEnd,
}) {
  useBackgroundMusic(battleMusic, { volume: 0.2 });

  const [bossHp, setBossHp] = useState(initialBossHp);
  const [playerHp, setPlayerHp] = useState(initialPlayerHp);
  const [projectileBursts, setProjectileBursts] = useState([]);
  const [showBoom, setShowBoom] = useState(false);
  const [isBossHit, setIsBossHit] = useState(false);
  const previousPhaseRef = useRef(1);
  const timeoutIdsRef = useRef([]);
  const projectileIdRef = useRef(0);

  const { currentPhase, damage: bossDamage, interval } = useBossPhase(bossHp);
  const playPlayerAttack = useSoundEffect(playerAttackSound, { volume: 0.45, poolSize: 5 });
  const playNeetiAttack = useSoundEffect(neetiAttackSound, { volume: 0.3, poolSize: 5 });
  const playBossAttack = useSoundEffect(bossAttackSound, { volume: 0.5, poolSize: 3 });
  const playTransform = useSoundEffect(transformSound, { volume: 0.5, poolSize: 1 });

  const bossImage = currentPhase === 3
    ? bossPhaseThree
    : currentPhase === 2
      ? bossPhaseTwo
      : bossPhaseOne;
  const projectileImages = weapon.id === 'neeti-oni-san'
    ? [...weapons, defaultWeapon].map((item) => item.img)
    : [weapon.img];

  const scheduleTimeout = useCallback((callback, delay) => {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutIdsRef.current.push(timeoutId);
  }, []);

  useEffect(() => () => {
    timeoutIdsRef.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => onBossHpChange?.(bossHp), [bossHp, onBossHpChange]);
  useEffect(() => onPlayerHpChange?.(playerHp), [playerHp, onPlayerHpChange]);

  useEffect(() => {
    if (currentPhase === previousPhaseRef.current) return;
    previousPhaseRef.current = currentPhase;
    playTransform();
  }, [currentPhase, playTransform]);

  const handleAttackBoss = () => {
    if (bossHp <= 0 || playerHp <= 0) return;

    const burstId = projectileIdRef.current;
    projectileIdRef.current += 1;
    setProjectileBursts((current) => [...current, { id: burstId, images: projectileImages }]);
    setIsBossHit(true);
    if (weapon.id === 'neeti-oni-san') playNeetiAttack();
    else playPlayerAttack();
    setBossHp((currentHp) => Math.max(0, currentHp - weapon.damage));

    scheduleTimeout(() => {
      setProjectileBursts((current) => current.filter((burst) => burst.id !== burstId));
    }, 520);
    scheduleTimeout(() => setIsBossHit(false), 160);
  };

  useEffect(() => {
    const attackTimer = window.setInterval(() => {
      setPlayerHp((currentHp) => Math.max(0, currentHp - bossDamage));
      setShowBoom(true);
      playBossAttack();
      scheduleTimeout(() => setShowBoom(false), 420);
    }, interval);

    return () => window.clearInterval(attackTimer);
  }, [bossDamage, interval, playBossAttack, scheduleTimeout]);

  useEffect(() => {
    if (bossHp <= 0 && playerHp > 0) onGameEnd('win');
    else if (playerHp <= 0) onGameEnd('lose');
  }, [bossHp, onGameEnd, playerHp]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${battleBackground})` }}>
      <div className="absolute inset-x-0 bottom-0 h-[8%] border-t-4 border-black bg-emerald-600" />

      <div className="absolute bottom-[8%] left-[5%] z-20 flex h-[55%] w-[38%] items-end justify-center sm:left-[8%]">
        <img src={character?.images?.idle ?? character?.images?.fly} alt={character?.name ?? 'Player'} className="max-h-[50%] max-w-[50%] object-contain drop-shadow-[6px_6px_0_#0f172a]" />
        {showBoom && (
          <span className="absolute left-1/2 top-1/3 -translate-x-1/2 -rotate-12 border-4 border-black bg-amber-300 px-4 py-3 text-xl font-black text-black shadow-[5px_5px_0_#000] sm:text-3xl">BOOM!</span>
        )}
      </div>

      {projectileBursts.flatMap((burst) => burst.images.map((image, index) => (
        <img
          key={`${burst.id}-${index}`}
          src={image}
          alt=""
          className="boss-projectile pointer-events-none absolute left-[30%] top-1/2 z-30 h-12 w-12 object-contain sm:h-16 sm:w-16"
          style={{ '--projectile-offset': `${(index - (burst.images.length - 1) / 2) * 34}px`, animationDelay: `${index * 30}ms` }}
        />
      )))}

      <div className="absolute bottom-[8%] right-[4%] z-20 flex h-[72%] w-[43%] flex-col items-center justify-end sm:right-[7%]">
        <div className="mb-2 w-full max-w-sm border-4 border-black bg-indigo-950/90 p-3 shadow-[5px_5px_0_#000]">
          <HealthBar value={bossHp} max={2000} label={`Boss · Phase ${currentPhase}`} hearts={10} />
        </div>
        <button type="button" onClick={handleAttackBoss} className={`group relative flex min-h-0 w-full flex-1 cursor-crosshair items-end justify-center border-0 bg-transparent p-0 outline-none ${isBossHit ? 'brightness-150' : ''}`} aria-label={`Attack the boss with ${weapon.name}`}>
          <img src={bossImage} alt="Boss" className="max-h-full max-w-full object-contain drop-shadow-[7px_7px_0_#0f172a] group-active:scale-95" />
        </button>
      </div>

      <span className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 border-2 border-black bg-slate-950/85 px-3 py-2 text-center text-[10px] font-bold uppercase text-white sm:text-xs">
        Click the boss to throw {weapon.name}
      </span>
    </div>
  );
}
