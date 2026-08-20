export default function StartScreen({ onStart }) {
  return (
    <div className="flex h-full w-full select-none flex-col items-center justify-center bg-sky-100/80 p-4 text-center">
      {/* Retro Game Boy-style dialog box */}
      <div className="flex w-full max-w-lg flex-col items-center gap-4 rounded-lg border-4 border-slate-950 bg-sky-200 p-7 shadow-[8px_8px_0_#0f172a]">
        {/* Header Text */}
        <div className="w-full rounded border-2 border-sky-950 bg-cyan-300 px-4 py-3">
          <h1 className="font-mono text-xl font-black tracking-widest text-slate-950 uppercase sm:text-3xl">
            FLAPPY BOSS
          </h1>
          <p className="mt-2 font-mono text-[10px] font-bold tracking-wider text-sky-900 sm:text-xs">
            SURVIVAL BUILD DAY
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="mt-2 w-full cursor-pointer rounded border-4 border-slate-950 bg-blue-600 py-4 font-mono text-lg font-extrabold text-white shadow-[5px_5px_0_#0f172a] transition-all hover:bg-blue-700 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          [ START GAME ]
        </button>
      </div>
    </div>
  );
}
