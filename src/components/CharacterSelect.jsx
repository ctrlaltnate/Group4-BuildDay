import React, { useState } from "react";

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
    <div className="flex flex-col items-center justify-between h-full w-full p-4 select-none font-mono bg-[#0f380f]/10">
      {/* Title Bar */}
      <div className="border-2 border-[#0f380f] bg-[#8bac0f] w-full max-w-sm py-2 px-4 text-center rounded shadow-[4px_4px_0px_0px_#0f380f]">
        <h2 className="text-sm sm:text-base font-extrabold text-[#0f380f] tracking-wider uppercase">
          SELECT YOUR HERO
        </h2>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 w-full max-w-sm overflow-y-auto max-h-[180px] p-1">
        {characters.map((char) => {
          const isSelected = char.id === selectedId;
          const charImage = char.images?.idle || char.image;

          return (
            <div
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              className={`cursor-pointer border-2 p-2 rounded flex flex-col items-center justify-between transition-all ${
                isSelected
                  ? "border-[#0f380f] bg-[#8bac0f] scale-105 shadow-[3px_3px_0px_0px_#0f380f]"
                  : "border-[#306230] bg-[#9bbc0f] hover:bg-[#8bac0f]/50 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#9bbc0f] border border-[#0f380f] rounded p-1 mb-1">
                {charImage ? (
                  <img
                    src={charImage}
                    alt={char.name}
                    className="w-full h-full object-contain pixelated"
                    onError={(e) => {
                      // Fallback เมื่อหาไฟล์รูปใน assets ไม่เจอ
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <span className="text-xs font-bold text-[#0f380f] hidden">
                  🎮
                </span>
              </div>

              <span className="text-[11px] font-black text-[#0f380f] text-center truncate w-full">
                {char.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Description Display Box */}
      <div className="w-full max-w-sm border-2 border-[#0f380f] bg-[#9bbc0f] p-2 rounded min-h-[60px] mb-2 flex flex-col justify-center">
        {selectedChar ? (
          <>
            <p className="text-[11px] font-extrabold text-[#0f380f] mb-0.5">
              [{selectedChar.name}]
            </p>
            <p className="text-[10px] text-[#306230] leading-tight font-bold">
              {selectedChar.description}
            </p>
          </>
        ) : (
          <p className="text-[10px] text-[#306230] text-center italic font-bold">
            Click on a character above to view their details.
          </p>
        )}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={!selectedId}
        className={`w-full max-w-sm py-2.5 font-mono font-extrabold text-xs border-2 rounded transition-all ${
          selectedId
            ? "bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] border-[#0f380f] shadow-[3px_3px_0px_0px_#0f380f] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
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
