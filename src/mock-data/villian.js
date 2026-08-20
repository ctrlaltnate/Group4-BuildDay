export const bossData = {
  id: 'boss',
  name: 'TossaKan',
  maxHp: 2000,
  model: {
    idle: '/src/assets/villains/boss_ok.png',
    die: '/src/assets/villains/boss_xxx.png'
  },
  phases: [
    {
      phase: 1,
      hpMin: 1000,
      hpMax: 2000,
      damage: 5,
    },
    {
      phase: 2,
      hpMin: 500,
      hpMax: 999,
      damage: 10,
    },
    {
      phase: 3,
      hpMin: 0,
      hpMax: 499,
      damage: 10,
    }
  ]
};

export const getBossPhase = (currentHp) => {
  if (currentHp >= 1000) {
    return bossData.phases[0];
  } else if (currentHp >= 500) {
    return bossData.phases[1]; 
  } else {
    return bossData.phases[2];
  }
};

export const getBossData = () => bossData;