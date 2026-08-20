import { useState } from "react";

export default function CharacterSelect({
  characters = [],
  onSelectCharacter,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedChar = characters.find((c) => c.id === selectedId);

  const handleConfirm = () => {
    if (selectedChar) {
      onSelectCharacter(selectedChar);
    }
  };

  return (
    <div className="flex h-full w-full select-none flex-col items-center gap-5 overflow-y-auto bg-sky-100/80 p-4 font-mono sm:p-7">
      {/* Title Bar */}
      <div className="w-full max-w-5xl rounded border-4 border-slate-950 bg-cyan-300 px-5 py-4 text-center shadow-[6px_6px_0_#0f172a]">
        <h2 className="text-base font-extrabold tracking-wider text-slate-950 uppercase sm:text-2xl">
          SELECT YOUR HERO
        </h2>
      </div>

      {/* Character Grid */}
      <div className="grid w-full max-w-5xl grid-cols-2 gap-4 p-1 sm:grid-cols-3 lg:grid-cols-5">
        {characters.map((char) => {
          const isSelected = char.id === selectedId;
          const charImage = char.images?.idle || char.image;

          return (
            <div
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              className={`cursor-pointer border-2 p-2 rounded flex flex-col items-center justify-between transition-all ${
                isSelected
                  ? "border-slate-950 bg-cyan-300 -translate-y-1 shadow-[5px_5px_0_#0f172a]"
                  : "border-sky-900 bg-sky-200 hover:bg-cyan-200 hover:-translate-y-1"
              }`}
            >
              <div className="mb-3 flex h-28 w-full items-center justify-center rounded border-2 border-sky-950 bg-sky-50 p-2 sm:h-36">
                {charImage ? (
                  <img
                    src={charImage}
                    alt={char.name}
                    className="h-full w-full object-contain [image-rendering:pixelated]"
                    onError={(e) => {
                      // Show the fallback when an asset cannot be loaded.
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <span className="hidden text-xs font-bold text-sky-950">
                  🎮
                </span>
              </div>

              <span className="w-full truncate text-center text-xs font-black text-slate-950 sm:text-sm">
                {char.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Description Display Box */}
      <div className="flex min-h-20 w-full max-w-5xl flex-col justify-center rounded border-4 border-sky-950 bg-sky-200 p-4 shadow-[4px_4px_0_#0c4a6e]">
        {selectedChar ? (
          <>
            <p className="mb-1 text-xl font-extrabold text-sky-950">
              [{selectedChar.name}]
            </p>
            <p className="text-[9px] font-bold leading-relaxed text-sky-800 sm:text-[10px]">
              {selectedChar.description}
            </p>
          </>
        ) : (
          <p className="text-center text-xs font-bold italic text-sky-800">
            Click on a character above to view their details.
          </p>
        )}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={!selectedId}
        className={`w-full max-w-5xl rounded border-4 py-4 font-mono text-xs font-extrabold transition-all sm:text-sm ${
          selectedId
            ? "cursor-pointer border-slate-950 bg-blue-600 text-white shadow-[5px_5px_0_#0f172a] hover:bg-blue-700 active:translate-x-1 active:translate-y-1 active:shadow-none"
            : "bg-gray-400 text-gray-200 border-gray-500 cursor-not-allowed opacity-60"
        }`}
      >
        {selectedId
          ? `CONFIRM AS ${selectedChar?.name.toUpperCase()}`
          : "CHOOSE A CHARACTER"}
      </button>
    </div>
  );
}
