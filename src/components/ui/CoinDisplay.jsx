import React from "react";
import rainbow_coin_spin_4_angles_transparent from "./rainbow_coin_spin_4_angles_transparent.png";

export default function CoinDisplay ({ coins }) {
    return (
        <div>
            <img 
            src={rainbow_coin_spin_4_angles_transparent} 
            alt="Coin" 
            className="w-7 h-7 object-contain drop-shadow-md"
            />
        </div>
    );
}