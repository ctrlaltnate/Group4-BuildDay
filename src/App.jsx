import { useEffect } from 'react';
import gameOverSound from './assets/soundeffect/game-over.ogg';
import survivalWinSound from './assets/soundeffect/survival-win.ogg';
import BossFight from './components/BossFight.jsx';
import CharacterSelect from './components/CharacterSelect.jsx';
import FlappyMinigame from './components/FlappyMinigame.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import StartScreen from './components/StartScreen.jsx';
import WeaponShop from './components/WeaponShop.jsx';
import CoinDisplay from './components/ui/CoinDisplay.jsx';
import HealthBar from './components/ui/HealthBar.jsx';
import Timer from './components/ui/Timer.jsx';
import { GAME_PHASES } from './constants/game.js';
import GameProvider from './context/GameProvider.jsx';
import useGame from './hooks/useGame.js';
import useGlobalClickSound from './hooks/useGlobalClickSound.js';
import useSoundEffect from './hooks/useSoundEffect.js';
import { characters } from './mock-data/characters.js';

function GameScreen() {
  useGlobalClickSound();
  const playGameOverSound = useSoundEffect(gameOverSound, {
    volume: 0.4,
    poolSize: 1,
  });
  const playSurvivalWinSound = useSoundEffect(survivalWinSound, {
    volume: 0.45,
    poolSize: 1,
  });

  const {
    phase,
    playerHp,
    bossHp,
    coins,
    timeLeft,
    result,
    selectedCharacter,
    selectedWeapon,
    setPlayerHp,
    setBossHp,
    startGame,
    beginSurvival,
    selectWeapon,
    finishBoss,
    restartGame,
  } = useGame();

  useEffect(() => {
    if (phase === GAME_PHASES.RESULT && result?.status === 'LOSE') {
      playGameOverSound();
    }
  }, [phase, playGameOverSound, result?.status]);

  useEffect(() => {
    if (phase === GAME_PHASES.SHOP && playerHp > 0) {
      playSurvivalWinSound();
    }
  }, [phase, playSurvivalWinSound, playerHp]);

  const renderPhase = () => {
    switch (phase) {
      case GAME_PHASES.START:
        return <StartScreen onStart={startGame} />;
      case GAME_PHASES.CHARACTER_SELECT:
        return (
          <CharacterSelect
            characters={characters}
            onSelectCharacter={beginSurvival}
          />
        );
      case GAME_PHASES.SURVIVAL:
        return <FlappyMinigame />;
      case GAME_PHASES.SHOP:
        return (
          <WeaponShop coins={coins} onPurchaseWeapon={selectWeapon} />
        );
      case GAME_PHASES.BOSS:
        return (
          <BossFight
            initialPlayerHp={playerHp}
            initialBossHp={bossHp}
            character={selectedCharacter}
            weapon={selectedWeapon}
            onPlayerHpChange={setPlayerHp}
            onBossHpChange={setBossHp}
            onGameEnd={(status) =>
              finishBoss({
                status: status.toUpperCase(),
                reason: status === 'win' ? 'BOSS_DEFEATED' : 'PLAYER_DEFEATED',
              })
            }
          />
        );
      case GAME_PHASES.RESULT:
        return (
          <ResultScreen
            result={result?.status}
            character={selectedCharacter}
            weapon={selectedWeapon}
            playerHp={playerHp}
            bossHp={bossHp}
            coins={coins}
            onRestart={restartGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 sm:p-4">
      <div
        className="mx-auto flex h-screen w-full max-w-[1200px] flex-col overflow-hidden border-4 border-black bg-sky-300 shadow-[0_0_0_4px_#64748b,8px_8px_0_4px_#000] sm:h-[calc(100vh-2rem)]"
        aria-label="Flappy Boss Survival game frame"
      >
        {/* 10%: HUD for HP, coins, timer, and other status information */}
        <header className="flex h-[10%] shrink-0 items-center gap-3 border-b-4 border-black bg-indigo-900 px-3 text-white sm:gap-5 sm:px-6">
          <HealthBar value={playerHp} max={1000} label="Player HP" />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <CoinDisplay coins={coins} />
            <Timer seconds={timeLeft} />
          </div>
        </header>

        {/* 90%: Active gameplay phase */}
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
