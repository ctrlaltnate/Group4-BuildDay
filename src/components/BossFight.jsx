import { useState, useEffect } from 'react';
import { useBossPhase } from '../hooks/useBossPhase';

export default function BossFight({ initialPlayerHp, weaponDamage, onGameEnd }) {
  
 
  const [bossHp, setBossHp] = useState(5000);

  const [playerHp, setPlayerHp] = useState(initialPlayerHp);

 
  const { currentPhase, damage: bossDamage, interval } = useBossPhase(bossHp);

 
  const handleAttackBoss = () => {
    setBossHp((prevHp) => Math.max(0, prevHp - weaponDamage));
  };

  useEffect(() => {
    
    if (bossHp <= 0 || playerHp <= 0) return; 

   
    const attackTimer = setInterval(() => {
      setPlayerHp((prevHp) => Math.max(0, prevHp - bossDamage));
    }, interval); 

    
    return () => clearInterval(attackTimer);
  }, [bossHp, playerHp, bossDamage, interval]); 
  // ระบบตรวจสอบผลแพ้ชนะ
  useEffect(() => {
    if (bossHp <= 0 && playerHp > 0) {
      onGameEnd('win'); // ชนะ
    } else if (playerHp <= 0 && bossHp > 0) {
      onGameEnd('lose'); // แพ้
    } else if (playerHp <= 0 && bossHp <= 0) {
      onGameEnd('lose'); // เลือดหมดพร้อมกัน ถือว่าแพ้
    }
  }, [bossHp, playerHp, onGameEnd]);

  return (
    <div className="boss-fight-container">
      <h2>Last Fight! (Boss Phase {currentPhase})</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* หน้าจอแสดงผล HP */}
        <div style={{ border: '1px solid red', padding: '10px' }}>
          <h3>ToosaDog</h3>
          <p>HP: {bossHp} / 2000</p>
        </div>

        <div style={{ border: '1px solid blue', padding: '10px' }}>
          <h3>Player</h3>
          <p>HP: {playerHp}</p>
        </div>
      </div>

      {/* ปุ่มโจมตี */}
      <button onClick={handleAttackBoss} style={{ padding: '20px', fontSize: '20px' }}>
        Hit! (-{weaponDamage} HP)
      </button>
    </div>
  );
}