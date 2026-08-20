import { useCallback, useEffect } from 'react';
import useGame from './useGame.js';

const MAX_BIG_COINS = 10;

export default function useCoinSystem({ isRunning }) {
  const {
    coins,
    addCoins,
    bigCoinVisible,
    setBigCoinVisible,
    bigCoinsCollected,
    setBigCoinsCollected,
  } = useGame();

  useEffect(() => {
    if (!isRunning) return undefined;

    const passiveCoinInterval = window.setInterval(() => addCoins(1), 1000);

    return () => window.clearInterval(passiveCoinInterval);
  }, [addCoins, isRunning]);

  useEffect(() => {
    if (!isRunning || bigCoinsCollected >= MAX_BIG_COINS) return undefined;

    const bigCoinInterval = window.setInterval(() => {
      setBigCoinVisible(true);
    }, 5000);

    return () => window.clearInterval(bigCoinInterval);
  }, [bigCoinsCollected, isRunning, setBigCoinVisible]);

  useEffect(() => {
    if (!isRunning) setBigCoinVisible(false);
  }, [isRunning, setBigCoinVisible]);

  const collectBigCoin = useCallback(() => {
    if (!isRunning || !bigCoinVisible || bigCoinsCollected >= MAX_BIG_COINS) {
      return false;
    }

    setBigCoinVisible(false);
    setBigCoinsCollected((currentCount) => currentCount + 1);
    addCoins(20);
    return true;
  }, [
    addCoins,
    bigCoinVisible,
    bigCoinsCollected,
    isRunning,
    setBigCoinVisible,
    setBigCoinsCollected,
  ]);

  return {
    coins,
    bigCoinVisible,
    bigCoinsCollected,
    collectBigCoin,
  };
}
