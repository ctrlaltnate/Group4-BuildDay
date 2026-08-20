import { useState } from 'react';

import { weaponsData } from '../mock-data/weapons';

export default function WeaponShop({ coins, onPurchaseWeapon }) {
const [selectedWeapon, setSelectedWeapon] = useState(null);

return (
    <div className="weapon-shop-container">
      <h2>Weapon Shop</h2>
      {/* แสดง Coinsจาก App */}
      <p> {coins} Coins </p> 

      <div className="weapons-grid">
        {/*ลูปเอาข้อมูลอาวุธ 4 ชิ้นขึ้นจอ */}
        {weaponsData.map((weapon) => {
          // Check Coins
          const canAfford = coins >= weapon.price; 
          // เช็คว่าเลือกอยู่
          const isSelected = selectedWeapon?.id === weapon.id; 

          return (
            <div 
              key={weapon.id} 
              style={{ border: isSelected ? '3px solid green' : '1px solid gray', padding: '10px', margin: '10px' }}
            >
              <h3>{weapon.name}</h3>
              <p>Coins: {weapon.price} </p>
              <p>Damage: {weapon.damage} /Click</p>

              {/* disabledและแจ้งเตือนถ้าเงินไม่พอ */}
              <button 
                disabled={!canAfford} 
                onClick={() => setSelectedWeapon(weapon)}
              >
                {canAfford ? 'Weapon' : 'No Coins'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Boss Fight */}
      <div style={{ marginTop: '20px' }}>
        <button 
          disabled={!selectedWeapon} 
          onClick={() => onPurchaseWeapon(selectedWeapon)}
        >
          Confirm Weapon and Fight!
        </button>
      </div>
    </div>
  );
}
/*export default function WeaponShop () {
    return(
        <h1>hhhhhhaaaaa</h1>
    )
}*/