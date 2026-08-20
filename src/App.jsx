export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 sm:p-4">
      <div
        className="mx-auto flex h-screen w-full max-w-[1000px] flex-col overflow-hidden border-4 border-black bg-sky-300 shadow-[0_0_0_4px_#64748b,8px_8px_0_4px_#000] sm:h-[calc(100vh-2rem)]"
        aria-label="Flappy Boss Survival game frame"
      >
        <header className="flex h-[10%] shrink-0 items-center justify-between gap-4 border-b-4 border-black bg-indigo-900 px-4 font-mono text-white sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase text-rose-300 sm:text-base">
              HP
            </span>
            <span className="border-2 border-black bg-rose-500 px-3 py-1 text-sm font-black shadow-[3px_3px_0_#000] sm:text-base">
              1000
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase text-amber-300 sm:text-base">
              Coin
            </span>
            <span className="border-2 border-black bg-amber-400 px-3 py-1 text-sm font-black text-black shadow-[3px_3px_0_#000] sm:text-base">
              000
            </span>
          </div>
        </header>

        <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-sky-300 p-4">
          <div className="border-4 border-dashed border-slate-700 bg-white/40 px-6 py-8 text-center font-mono text-sm font-bold uppercase text-slate-800 sm:text-base">
            Gameplay Component Area
          </div>
        </main>
      </div>
    </div>
  );
}
