import HealthBar from './ui/HealthBar.jsx';
import CoinDisplay from './ui/CoinDisplay.jsx';

export default function ResultScreen({
  result,
  character,
  weapon,
  playerHp,
  bossHp,
  coins,
  onRestart,
}) {
  const isWin = result === 'WIN';
  const resultImage = character?.images?.[isWin ? 'win' : 'die'];

  return (
    <div className="flex h-full w-full items-center justify-center p-2 text-white sm:p-4">
      <section className="w-full max-w-xl border-4 border-black bg-indigo-950 p-3 shadow-[7px_7px_0_#000] sm:p-5">
        <header className={`mb-3 border-4 border-black px-3 py-3 text-center shadow-[4px_4px_0_#000] ${isWin ? 'bg-amber-300 text-slate-950' : 'bg-rose-500 text-white'}`}>
          <p className="text-[8px] font-black uppercase tracking-[0.25em]">Battle Result</p>
          <h1 className="mt-2 text-lg font-black uppercase sm:text-2xl">
            {isWin ? '★ You Win! ★' : '× Game Over ×'}
          </h1>
        </header>

        <div className="grid grid-cols-[minmax(100px,0.75fr)_1.25fr] gap-3">
          <div className="flex min-h-40 items-center justify-center border-4 border-black bg-sky-200 p-2 shadow-[3px_3px_0_#000]">
            {resultImage && (
              <img
                src={resultImage}
                alt={character.name}
                className="max-h-44 max-w-full object-contain [image-rendering:pixelated]"
              />
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-2 text-[8px] sm:text-[10px]">
            <div className="border-4 border-black bg-sky-900 p-3 shadow-[3px_3px_0_#000]">
              <p className="mb-2 text-cyan-300">CHARACTER</p>
              <p className="truncate text-xs font-black text-white sm:text-sm">{character?.name || 'None'}</p>
            </div>
            <div className="border-4 border-black bg-sky-900 p-3 shadow-[3px_3px_0_#000]">
              <p className="mb-2 text-cyan-300">WEAPON</p>
              <p className="truncate text-xs font-black text-white sm:text-sm">{weapon?.name || 'None'}</p>
            </div>
            <CoinDisplay coins={coins} />
          </div>
        </div>

        <div className="mt-3 grid gap-3 border-4 border-black bg-slate-900 p-3 shadow-[3px_3px_0_#000] sm:grid-cols-2">
          <HealthBar value={playerHp} max={1000} label="Player HP" />
          <HealthBar value={bossHp} max={2000} label="Boss HP" />
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-3 w-full border-4 border-black bg-blue-500 px-4 py-3 text-xs font-black uppercase text-white shadow-[5px_5px_0_#000] hover:bg-cyan-500 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Start Over
        </button>
      </section>
    </div>
  );
}
