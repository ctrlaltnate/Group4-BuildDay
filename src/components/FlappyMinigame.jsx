import { useCallback, useEffect, useRef, useState } from 'react';
import flappyGameBackground from '../assets/ui/bg_flappygame.jpeg';
import goldCoin from '../assets/ui/gold_coin_spin_4_angles.gif';
import coinCollectSound from '../assets/soundeffect/coin-collect.wav';
import obstacleHitSound from '../assets/soundeffect/obstacle-hit.wav';
import survivalBgm from '../assets/soundeffect/survival-bgm.ogg';
import useBackgroundMusic from '../hooks/useBackgroundMusic.js';
import useCoinSystem from '../hooks/useCoinSystem.js';
import useGame from '../hooks/useGame.js';
import useGameTimer from '../hooks/useGameTimer.js';
import useSoundEffect from '../hooks/useSoundEffect.js';

const GRAVITY = 88;
const JUMP_FORCE = -38;
const OBSTACLE_SPEED = 24;
const BIRD_X = 18;
const BIRD_WIDTH = 6;
const BIRD_HEIGHT = 7;
const OBSTACLE_WIDTH = 11;
const OBSTACLE_START_X = 105;
const OBSTACLE_END_X = -12;
const OBSTACLE_CYCLE_WIDTH = OBSTACLE_START_X - OBSTACLE_END_X;
const HITBOX_PADDING = 1.25;
const GAP_SIZE = 32;
const COLLISION_DAMAGE = 300;
const HIT_COOLDOWN = 900;

export default function FlappyMinigame() {
  useBackgroundMusic(survivalBgm, { volume: 0.16 });

  const {
    playerHp,
    damagePlayer,
    completeSurvival,
    loseGame,
    setBigCoinVisible,
  } = useGame();
  const [birdY, setBirdY] = useState(45);
  const [obstacleX, setObstacleX] = useState(105);
  const [gapY, setGapY] = useState(50);
  const [coinX, setCoinX] = useState(105);
  const [coinY, setCoinY] = useState(50);
  const [isHit, setIsHit] = useState(false);
  const velocityRef = useRef(0);
  const birdYRef = useRef(45);
  const obstacleXRef = useRef(105);
  const gapYRef = useRef(50);
  const coinXRef = useRef(105);
  const coinYRef = useRef(50);
  const wasCoinVisibleRef = useRef(false);
  const coinUsesNextGapRef = useRef(false);
  const lastFrameRef = useRef(null);
  const lastHitRef = useRef(0);
  const hitTimeoutRef = useRef(null);
  const isRunning = playerHp > 0;

  useGameTimer({ isRunning, onTimeUp: completeSurvival });
  const { bigCoinVisible, collectBigCoin } = useCoinSystem({ isRunning });
  const playHitSound = useSoundEffect(obstacleHitSound, { volume: 0.5 });
  const playCoinSound = useSoundEffect(coinCollectSound, { volume: 0.55 });

  const handleCollectCoin = useCallback(() => {
    const wasCollected = collectBigCoin();
    if (wasCollected) playCoinSound();
    return wasCollected;
  }, [collectBigCoin, playCoinSound]);

  const jump = useCallback(() => {
    if (isRunning) velocityRef.current = JUMP_FORCE;
  }, [isRunning]);

  const registerHit = useCallback(() => {
    const now = performance.now();
    if (now - lastHitRef.current < HIT_COOLDOWN) return;

    lastHitRef.current = now;
    damagePlayer(COLLISION_DAMAGE);
    playHitSound();
    setIsHit(true);
    window.clearTimeout(hitTimeoutRef.current);
    hitTimeoutRef.current = window.setTimeout(() => setIsHit(false), 250);
  }, [damagePlayer, playHitSound]);

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

      if (bigCoinVisible && !wasCoinVisibleRef.current) {
        const obstacleIsAhead =
          obstacleXRef.current > BIRD_X + BIRD_WIDTH + 4;
        coinUsesNextGapRef.current = !obstacleIsAhead;
        coinXRef.current =
          obstacleXRef.current +
          OBSTACLE_WIDTH / 2 +
          (obstacleIsAhead ? 0 : OBSTACLE_CYCLE_WIDTH);
        coinYRef.current = obstacleIsAhead
          ? gapYRef.current
          : 30 + Math.random() * 40;
        setCoinX(coinXRef.current);
        setCoinY(coinYRef.current);
      }

      wasCoinVisibleRef.current = bigCoinVisible;

      if (bigCoinVisible) {
        coinXRef.current -= OBSTACLE_SPEED * delta;

        const coinTouchesBird =
          coinXRef.current <= BIRD_X + 7 &&
          coinXRef.current >= BIRD_X - 7 &&
          Math.abs(coinYRef.current - birdYRef.current) <= 9;

        if (coinTouchesBird) {
          handleCollectCoin();
          coinXRef.current = OBSTACLE_START_X;
        }

        if (coinXRef.current < -12) {
          setBigCoinVisible(false);
          coinXRef.current = OBSTACLE_START_X;
        }

        setCoinX(coinXRef.current);
      }

      if (obstacleXRef.current < OBSTACLE_END_X) {
        obstacleXRef.current = OBSTACLE_START_X;
        gapYRef.current =
          bigCoinVisible && coinUsesNextGapRef.current
            ? coinYRef.current
            : 30 + Math.random() * 40;
        coinUsesNextGapRef.current = false;
      }

      const minBirdY = 0;
      const maxBirdY = 92 - BIRD_HEIGHT;

      if (birdYRef.current < minBirdY) {
        birdYRef.current = minBirdY;
        velocityRef.current = 0;
      } else if (birdYRef.current > maxBirdY) {
        birdYRef.current = maxBirdY;
        velocityRef.current = 0;
      }

      const birdLeft = BIRD_X + HITBOX_PADDING;
      const birdRight = BIRD_X + BIRD_WIDTH - HITBOX_PADDING;
      const obstacleLeft = obstacleXRef.current + HITBOX_PADDING;
      const obstacleRight =
        obstacleXRef.current + OBSTACLE_WIDTH - HITBOX_PADDING;
      const obstacleTouchesBird =
        obstacleLeft < birdRight && obstacleRight > birdLeft;
      const gapTop = gapYRef.current - GAP_SIZE / 2;
      const gapBottom = gapYRef.current + GAP_SIZE / 2;
      const birdTop = birdYRef.current + HITBOX_PADDING;
      const birdBottom =
        birdYRef.current + BIRD_HEIGHT - HITBOX_PADDING;
      const birdOutsideGap =
        birdTop < gapTop || birdBottom > gapBottom;

      if (obstacleTouchesBird && birdOutsideGap) {
        registerHit();
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
  }, [
    bigCoinVisible,
    handleCollectCoin,
    isRunning,
    registerHit,
    setBigCoinVisible,
  ]);

  return (
    <div
      className="relative h-full w-full cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat text-left outline-none"
      style={{ backgroundImage: `url(${flappyGameBackground})` }}
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
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-2"
          style={{ left: `${coinX}%`, top: `${coinY}%` }}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleCollectCoin();
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
