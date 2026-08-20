import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import BossFight from './components/BossFight';
import WeaponShop from './components/WeaponShop';

export default function App() {
  

  const handlePurchase = (weapon) => {
    alert("Bye Weapon: " + weapon.name + " Confrim!");
  }

  const handleGameEnd = (result) => {
    if (result === 'win') {
      alert("Congrats! You Beat ToosaDog!");
    } else {
      alert("Game Over! ToosaDog and his Bug eat you");
    }
  };

  return (
    <><div>

      <WeaponShop coins={455} onPurchaseWeapon={handlePurchase} />
    </div><div style={{ padding: '20px' }}>
        <h1>TEST</h1>
        <hr />

        {/* จำลองว่าผู้เล่นรอดมาด้วยเลือด 1,000 และซื้ออาวุธ Damage 50 มา */}
        <BossFight
          initialPlayerHp={1000}
          weaponDamage={50}
          onGameEnd={handleGameEnd} />

      </div></>
  );
}




