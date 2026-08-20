import { useCallback, useMemo, useState } from 'react';
import { GAME_PHASES } from '../constants/game.js';
import { GameContext } from './GameContext.jsx';

const INITIAL_HP = 1000;
const INITIAL_BOSS_HP = 2000;
const INITIAL_TIME = 60;
const MAX_SURVIVAL_COINS = 260;

export default function GameProvider({ children }) {
  const [phase, setPhase] = useState(GAME_PHASES.START);
  const [playerHp, setPlayerHp] = useState(INITIAL_HP);
  const [bossHp, setBossHp] = useState(INITIAL_BOSS_HP);
  const [coins, setCoins] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [result, setResult] = useState(null);
  const [bigCoinVisible, setBigCoinVisible] = useState(false);
  const [bigCoinsCollected, setBigCoinsCollected] = useState(0);

  const resetSession = useCallback(() => {
    setPlayerHp(INITIAL_HP);
    setBossHp(INITIAL_BOSS_HP);
    setCoins(0);
    setTimeLeft(INITIAL_TIME);
    setSelectedCharacter(null);
    setSelectedWeapon(null);
    setResult(null);
    setBigCoinVisible(false);
    setBigCoinsCollected(0);
  }, []);

  const startGame = useCallback(() => {
    resetSession();
    setPhase(GAME_PHASES.CHARACTER_SELECT);
  }, [resetSession]);

  const beginSurvival = useCallback((character = null) => {
    setSelectedCharacter(character);
    setPlayerHp(INITIAL_HP);
    setCoins(0);
    setTimeLeft(INITIAL_TIME);
    setBigCoinVisible(false);
    setBigCoinsCollected(0);
    setPhase(GAME_PHASES.SURVIVAL);
  }, []);

  const damagePlayer = useCallback((damage) => {
    setPlayerHp((currentHp) => Math.max(0, currentHp - Math.max(0, damage)));
  }, []);

  const addCoins = useCallback((amount) => {
    setCoins((currentCoins) =>
      Math.min(MAX_SURVIVAL_COINS, currentCoins + Math.max(0, amount)),
    );
  }, []);

  const completeSurvival = useCallback(() => {
    setBigCoinVisible(false);
    setPhase(GAME_PHASES.SHOP);
  }, []);

  const loseGame = useCallback((reason = 'PLAYER_DEFEATED') => {
    setBigCoinVisible(false);
    setResult({ status: 'LOSE', reason });
    setPhase(GAME_PHASES.RESULT);
  }, []);

  const selectWeapon = useCallback((weapon) => {
    setSelectedWeapon(weapon);
    setBossHp(INITIAL_BOSS_HP);
    setPhase(GAME_PHASES.BOSS);
  }, []);

  const finishBoss = useCallback((bossResult) => {
    setResult(bossResult);
    setPhase(GAME_PHASES.RESULT);
  }, []);

  const restartGame = useCallback(() => {
    resetSession();
    setPhase(GAME_PHASES.START);
  }, [resetSession]);

  const value = useMemo(
    () => ({
      phase,
      playerHp,
      bossHp,
      coins,
      timeLeft,
      selectedCharacter,
      selectedWeapon,
      result,
      bigCoinVisible,
      bigCoinsCollected,
      setPhase,
      setPlayerHp,
      setBossHp,
      setTimeLeft,
      setBigCoinVisible,
      setBigCoinsCollected,
      startGame,
      beginSurvival,
      damagePlayer,
      addCoins,
      completeSurvival,
      loseGame,
      selectWeapon,
      finishBoss,
      restartGame,
    }),
    [
      phase,
      playerHp,
      bossHp,
      coins,
      timeLeft,
      selectedCharacter,
      selectedWeapon,
      result,
      bigCoinVisible,
      bigCoinsCollected,
      startGame,
      beginSurvival,
      damagePlayer,
      addCoins,
      completeSurvival,
      loseGame,
      selectWeapon,
      finishBoss,
      restartGame,
    ],
  );

  return <GameContext value={value}>{children}</GameContext>;
}
