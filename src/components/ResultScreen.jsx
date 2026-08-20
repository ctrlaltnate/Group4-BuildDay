import HealthBar from './ui/HealthBar';
import CoinDisplay from './ui/CoinDisplay';
import Button from './ui/Button';

export default function ResultScreen({ 
  result, 
  character, 
  weapon, 
  playerHp, 
  bossHp, 
  coins, 
  onRestart 
}) {
  const isWin = result === 'WIN';

  return (
    <div className="h-full w-full max-w-md mx-auto p-5 text-center text-white flex flex-col justify-center">
      <h1 className={`text-3xl font-bold mb-6 ${isWin ? 'text-yellow-400' : 'text-red-500'}`}>
        {isWin ? '🏆 YOU WIN! 🏆' : '💀 GAME OVER 💀'}
      </h1>
      
      <div className="bg-slate-800 p-4 rounded-xl mb-5 shadow-lg">
        {character?.images?.[isWin ? 'win' : 'die'] && (
          <img
            src={character.images[isWin ? 'win' : 'die']}
            alt={character.name}
            className={`mx-auto mb-3 object-contain ${
              isWin ? 'h-32 w-32' : 'h-52 w-52 sm:h-64 sm:w-64'
            }`}
          />
        )}
        <p className="mb-2">Character: <span className="font-semibold">{character?.name || 'none'}</span></p>
        <p className="mb-2">Weapons: <span className="font-semibold">{weapon?.name || 'none'}</span></p>
        <CoinDisplay coins={coins} />
      </div>

      <div className="bg-slate-800 p-4 rounded-xl mb-6 shadow-lg">
        <HealthBar value={playerHp} max={1000} label="Player HP" />
        <HealthBar value={bossHp} max={2000} label="Boss HP" />
      </div>

      <div className="flex justify-center">
        <Button onClick={onRestart}>
          START OVER
        </Button>
      </div>
    </div>
  );
}
