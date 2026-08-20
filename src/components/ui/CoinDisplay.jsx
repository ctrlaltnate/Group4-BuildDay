import goldCoin from '../../assets/ui/gold_coin_spin_4_angles.gif';

export default function CoinDisplay({ coins = 0, label = 'Coin' }) {
  const safeCoins = Math.max(0, Number(coins) || 0);

  return (

    
    <div
      className="flex shrink-0 items-center gap-2 border-2 border-black bg-amber-400 px-2 py-1 font-mono font-black text-black shadow-[3px_3px_0_#000] sm:px-3"
      aria-label={`${label} ${safeCoins}`}
    >
      <img
        className="h-6 w-6 shrink-0 object-contain [image-rendering:pixelated] sm:h-8 sm:w-8"
        src={goldCoin}
        alt=""
        aria-hidden="true"
      />
      <span className="text-[10px] uppercase sm:text-xs">{label}</span>
      <span className="min-w-8 text-right text-xs tabular-nums sm:text-base">
        {safeCoins.toString().padStart(3, '0')}
      </span>
    </div>
  );
}
