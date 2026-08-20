import { useState } from 'react';

import { defaultWeapon, weapons } from '../mock-data/weapons';

export default function WeaponShop({ coins, onPurchaseWeapon }) {
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  return (
    <div className="h-full w-full overflow-y-auto bg-sky-100/80 p-4 text-center text-slate-950 sm:p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-4 border-slate-950 bg-cyan-300 p-4 shadow-[5px_5px_0_#0f172a] sm:flex-row">
        <div className="text-left">
          <h2 className="text-xl font-black uppercase sm:text-2xl">Weapon Shop</h2>
          <p className="mt-1 text-[9px] font-bold text-sky-900 sm:text-[10px]">
            Choose one weapon, then enter the boss fight.
          </p>
        </div>
        <p className="shrink-0 border-4 border-slate-950 bg-amber-300 px-4 py-3 text-sm font-black shadow-[3px_3px_0_#0f172a]">
          {coins} COINS
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-5 sm:grid-cols-3 lg:grid-cols-5">
        {/* Render the available weapons */}
        {[...weapons, defaultWeapon].map((weapon) => {
          // Check Coins
          const canAfford = coins >= weapon.price; 
          // Check whether this weapon is selected.
          const isSelected = selectedWeapon?.id === weapon.id; 

          return (
            <button
              key={weapon.id}
              type="button"
              disabled={!canAfford}
              onClick={() => setSelectedWeapon(weapon)}
              aria-pressed={isSelected}
              className={`group relative flex min-h-64 flex-col items-center rounded border-4 p-3 transition-[transform,box-shadow,background-color] duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                isSelected
                  ? 'z-10 -translate-y-2 border-slate-950 bg-cyan-300 shadow-[7px_7px_0_#0f172a]'
                  : canAfford
                    ? 'border-sky-900 bg-sky-200 shadow-[3px_3px_0_#0c4a6e] hover:-translate-y-2 hover:bg-cyan-200 hover:shadow-[7px_7px_0_#0f172a]'
                    : 'cursor-not-allowed border-slate-500 bg-slate-200 opacity-55 grayscale'
              }`}
            >
              <span className={`absolute right-2 top-2 border-2 border-slate-950 px-2 py-1 text-[8px] font-black ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-slate-950'}`}>
                {isSelected ? 'SELECTED' : canAfford ? 'SELECT' : 'LOCKED'}
              </span>
              <div className="mt-7 flex h-28 w-full items-center justify-center sm:h-32">
                <img
                  src={weapon.img}
                  alt=""
                  className="h-24 w-24 object-contain drop-shadow-[4px_4px_0_#0c4a6e] transition-transform duration-200 group-hover:scale-110 sm:h-28 sm:w-28"
                />
              </div>
              <h3 className="mt-2 flex min-h-10 items-center text-center text-[10px] font-black uppercase leading-relaxed sm:text-xs">
                {weapon.name}
              </h3>
              <div className="mt-auto grid w-full grid-cols-2 gap-1 border-t-2 border-sky-900 pt-3 text-[8px] font-black sm:text-[9px]">
                <span className="bg-amber-300 px-1 py-2">{weapon.price} COINS</span>
                <span className="bg-rose-300 px-1 py-2">{weapon.damage} DMG</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Boss Fight */}
      <div className="mx-auto max-w-5xl pb-2">
        {selectedWeapon && (
          <p className="mb-3 border-2 border-sky-900 bg-sky-200 p-3 text-[9px] font-bold leading-relaxed text-sky-950 sm:text-[10px]">
            <span className="font-black uppercase">{selectedWeapon.name}:</span>{' '}
            {selectedWeapon.description}
          </p>
        )}
        <button
          type="button"
          disabled={!selectedWeapon} 
          onClick={() => onPurchaseWeapon(selectedWeapon)}
          className="w-full border-4 border-slate-950 bg-blue-600 p-4 text-xs font-black uppercase text-white shadow-[5px_5px_0_#0f172a] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-200 sm:text-sm"
        >
          {selectedWeapon
            ? `Fight with ${selectedWeapon.name}!`
            : 'Select a weapon first'}
        </button>
      </div>
    </div>
  );
}
