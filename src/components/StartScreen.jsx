import React from "react";

export default function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center select-none bg-[#0f380f]/10">
      {/* Dialogue Box กรอบสไตล์ Retro GameBoy */}
      <div className="border-4 border-[#0f380f] bg-[#9bbc0f] p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(15,56,15,0.8)] max-w-sm w-full flex flex-col items-center gap-4">
        {/* Header Text */}
        <div className="border-2 border-[#0f380f] bg-[#8bac0f] px-4 py-2 rounded w-full">
          <h1 className="text-xl sm:text-2xl font-black text-[#0f380f] tracking-widest uppercase font-mono">
            FLAPPY BOSS
          </h1>
          <p className="text-[10px] sm:text-xs font-bold text-[#306230] font-mono mt-1 tracking-wider">
            SURVIVAL BUILD DAY
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="mt-2 w-full py-3 bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] font-mono font-extrabold text-lg border-2 border-[#0f380f] rounded shadow-[4px_4px_0px_0px_#0f380f] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          [ START GAME ]
        </button>
      </div>
    </div>
  );
}
