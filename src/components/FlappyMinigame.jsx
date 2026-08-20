import { useCallback, useEffect, useRef, useState } from 'react';
import goldCoin from '../assets/ui/gold_coin_spin_4_angles.gif';
import useCoinSystem from '../hooks/useCoinSystem.js';
import useGame from '../hooks/useGame.js';
import useGameTimer from '../hooks/useGameTimer.js';

const GRAVITY = 88;
const JUMP_FORCE = -38;
const OBSTACLE_SPEED = 24;
const BIRD_X = 18;
const GAP_SIZE = 32;
const COLLISION_DAMAGE = 300;
const HIT_COOLDOWN = 900;

export default function FlappyMinigame() {
  const {
    playerHp,
    damagePlayer,
    completeSurvival,
    loseGame,
  } = useGame();
  const [birdY, setBirdY] = useState(45);
  const [obstacleX, setObstacleX] = useState(105);
  const [gapY, setGapY] = useState(50);
  const [isHit, setIsHit] = useState(false);
  const velocityRef = useRef(0);
  const birdYRef = useRef(45);
  const obstacleXRef = useRef(105);
  const gapYRef = useRef(50);
  const lastFrameRef = useRef(null);
  const lastHitRef = useRef(0);
  const hitTimeoutRef = useRef(null);
  const isRunning = playerHp > 0;

  useGameTimer({ isRunning, onTimeUp: completeSurvival });
  const { bigCoinVisible, collectBigCoin } = useCoinSystem({ isRunning });

  const jump = useCallback(() => {
    if (isRunning) velocityRef.current = JUMP_FORCE;
  }, [isRunning]);

  const registerHit = useCallback(() => {
    const now = performance.now();
    if (now - lastHitRef.current < HIT_COOLDOWN) return;

    lastHitRef.current = now;
    damagePlayer(COLLISION_DAMAGE);
    setIsHit(true);
    window.clearTimeout(hitTimeoutRef.current);
    hitTimeoutRef.current = window.setTimeout(() => setIsHit(false), 250);
  }, [damagePlayer]);

  useEffect(
    () => () => {
      window.clearTimeout(hitTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    if (playerHp <= 0) loseGame('SURVIVAL_HP_DEPLETED');
  }, [loseGame, playerHp]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== 'Space' && event.code !== 'ArrowUp') return;
      event.preventDefault();
      jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    if (!isRunning) return undefined;
    let animationFrameId;

    const animate = (timestamp) => {
      const previousFrame = lastFrameRef.current ?? timestamp;
      const delta = Math.min((timestamp - previousFrame) / 1000, 0.04);
      lastFrameRef.current = timestamp;

      velocityRef.current += GRAVITY * delta;
      birdYRef.current += velocityRef.current * delta;
      obstacleXRef.current -= OBSTACLE_SPEED * delta;

      if (obstacleXRef.current < -12) {
        obstacleXRef.current = 105;
        gapYRef.current = 30 + Math.random() * 40;
      }

      const isOutsideArea = birdYRef.current <= 2 || birdYRef.current >= 92;
      const obstacleTouchesBird =
        obstacleXRef.current <= BIRD_X + 7 &&
        obstacleXRef.current >= BIRD_X - 7;
      const gapTop = gapYRef.current - GAP_SIZE / 2;
      const gapBottom = gapYRef.current + GAP_SIZE / 2;
      const birdOutsideGap =
        birdYRef.current - 4 < gapTop || birdYRef.current + 4 > gapBottom;

      if (isOutsideArea || (obstacleTouchesBird && birdOutsideGap)) {
        registerHit();
        birdYRef.current = Math.min(90, Math.max(4, birdYRef.current));
        velocityRef.current = isOutsideArea ? JUMP_FORCE / 2 : velocityRef.current;
      }

      setBirdY(birdYRef.current);
      setObstacleX(obstacleXRef.current);
      setGapY(gapYRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      lastFrameRef.current = null;
    };
  }, [isRunning, registerHit]);

  return (
    <div
      className="relative h-full w-full cursor-pointer overflow-hidden bg-gradient-to-b from-cyan-300 to-sky-500 text-left outline-none"
      onClick={jump}
      role="application"
      aria-label="พื้นที่เล่น Flappy Survival กดเพื่อกระโดด"
    >
      <div className="absolute inset-x-0 bottom-0 h-[8%] border-t-4 border-black bg-emerald-600" />

      <div
        className={`absolute left-[18%] z-20 grid h-10 w-10 place-items-center border-4 border-black bg-yellow-300 text-xl shadow-[4px_4px_0_#000] transition-colors ${
          isHit ? 'bg-rose-500' : ''
        }`}
        style={{ top: `${birdY}%` }}
        aria-hidden="true"
      >
        ▲
      </div>

      <div
        className="absolute inset-y-0 w-[11%]"
        style={{ left: `${obstacleX}%` }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 top-0 border-4 border-black bg-emerald-700 shadow-[4px_0_0_#000]"
          style={{ height: `${gapY - GAP_SIZE / 2}%` }}
        />
        <div
          className="absolute inset-x-0 bottom-0 border-4 border-black bg-emerald-700 shadow-[4px_0_0_#000]"
          style={{ height: `${100 - (gapY + GAP_SIZE / 2)}%` }}
        />
      </div>

      {bigCoinVisible && (
        <button
          className="absolute left-[62%] top-1/2 z-30 -translate-y-1/2 border-0 bg-transparent p-2"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            collectBigCoin();
          }}
          aria-label="เก็บเหรียญใหญ่ 10 แต้ม"
        >
          <img
            className="h-14 w-14 [image-rendering:pixelated] sm:h-20 sm:w-20"
            src={goldCoin}
            alt=""
          />
        </button>
      )}

      <span className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2 border-2 border-black bg-slate-950/80 px-3 py-2 text-center font-mono text-[10px] font-bold uppercase text-white sm:text-xs">
        Click / Space / ↑ to jump
      </span>
    </div>
  );
}
