export function useBossPhase(bossHp) {

  let currentPhase = 1;
  let damage = 5;
  let interval = 1000;

  if (bossHp >= 1000 && bossHp <= 2000) {
    currentPhase = 1;
    damage = 5; 
    interval = 1000; 
  } 
  else if (bossHp >= 500 && bossHp <= 999) {
    currentPhase = 2;
    damage = 10;
    interval = 1000; 
  }

  else if (bossHp < 500) {
    currentPhase = 3;
    damage = 10; 
    interval = 500; 
  }

  return { currentPhase, damage, interval };
}