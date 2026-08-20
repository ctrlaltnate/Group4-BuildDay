import FlappyMinigame from './components/FlappyMinigame.jsx';
import CoinDisplay from './components/ui/CoinDisplay.jsx';
import HealthBar from './components/ui/HealthBar.jsx';
import Timer from './components/ui/Timer.jsx';
import { GAME_PHASES } from './constants/game.js';
import GameProvider from './context/GameProvider.jsx';
import useGame from './hooks/useGame.js';

function PhasePanel({ title, description, actionLabel, onAction }) {
  return (
    <section className="border-4 border-black bg-slate-900 p-6 text-center font-mono text-white shadow-[8px_8px_0_#000] sm:p-10">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
        Integration placeholder
      </p>
      <h2 className="my-5 text-2xl font-black uppercase sm:text-4xl">{title}</h2>
      <p className="mb-6 text-xs leading-6 text-slate-300 sm:text-sm">
        {description}
      </p>
      <button
        className="border-4 border-black bg-amber-400 px-5 py-3 font-black uppercase text-black shadow-[5px_5px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
        type="button"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </section>
  );
}

function GameScreen() {
  const {
    phase,
    playerHp,
    coins,
    timeLeft,
    result,
    startGame,
    beginSurvival,
    selectWeapon,
    finishBoss,
    restartGame,
  } = useGame();

  const renderPhase = () => {
    switch (phase) {
      case GAME_PHASES.START:
        return (
          <PhasePanel
            title="Flappy Boss Survival"
            description="พื้นที่ชั่วคราวสำหรับ StartScreen ของคนที่ 2"
            actionLabel="Start"
            onAction={startGame}
          />
        );
      case GAME_PHASES.CHARACTER_SELECT:
        return (
          <PhasePanel
            title="Select Character"
            description="พื้นที่ชั่วคราวสำหรับ CharacterSelect ของคนที่ 2"
            actionLabel="Use Test Character"
            onAction={() => beginSurvival({ id: 'test-player', name: 'Player' })}
          />
        );
      case GAME_PHASES.SURVIVAL:
        return <FlappyMinigame />;
      case GAME_PHASES.SHOP:
        return (
          <PhasePanel
            title="Weapon Shop"
            description="Survival สำเร็จแล้ว พื้นที่นี้รอ WeaponShop ของคนที่ 4"
            actionLabel="Use Test Weapon"
            onAction={() =>
              selectWeapon({ id: 'test-weapon', name: 'Test Sword', damage: 10 })
            }
          />
        );
      case GAME_PHASES.BOSS:
        return (
          <PhasePanel
            title="Boss Fight"
            description="พื้นที่ชั่วคราวสำหรับ BossFight ของคนที่ 4"
            actionLabel="Finish Test Fight"
            onAction={() => finishBoss({ status: 'WIN', reason: 'BOSS_DEFEATED' })}
          />
        );
      case GAME_PHASES.RESULT:
        return (
          <PhasePanel
            title={result?.status === 'WIN' ? 'You Win!' : 'Game Over'}
            description="พื้นที่ชั่วคราวสำหรับ ResultScreen ของคนที่ 5"
            actionLabel="Play Again"
            onAction={restartGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 sm:p-4">
      <div
        className="mx-auto flex h-screen w-full max-w-[1000px] flex-col overflow-hidden border-4 border-black bg-sky-300 shadow-[0_0_0_4px_#64748b,8px_8px_0_4px_#000] sm:h-[calc(100vh-2rem)]"
        aria-label="Flappy Boss Survival game frame"
      >
        {/* 10%: HUD สำหรับ HP, Coin, Timer และสถานะอื่น ๆ */}
        <header className="flex h-[10%] shrink-0 items-center gap-3 border-b-4 border-black bg-indigo-900 px-3 text-white sm:gap-5 sm:px-6">
          <HealthBar value={playerHp} max={1000} label="Player HP" />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <CoinDisplay coins={coins} />
            <Timer seconds={timeLeft} />
          </div>
        </header>

        {/* 90%: ใส่ Component ของ Gameplay phase ปัจจุบันตรงนี้ */}
        <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-sky-300 p-4">
          {renderPhase()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}
