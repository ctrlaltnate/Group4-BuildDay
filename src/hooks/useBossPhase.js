export function useBossPhase(bossHp) {
  if (bossHp < 500) {
    return { currentPhase: 3, attackStage: 4, damage: 25, interval: 250 };
  }

  if (bossHp < 1000) {
    return { currentPhase: 3, attackStage: 3, damage: 20, interval: 400 };
  }

  if (bossHp < 1500) {
    return { currentPhase: 2, attackStage: 2, damage: 15, interval: 500 };
  }

  return { currentPhase: 1, attackStage: 1, damage: 10, interval: 700 };
}
