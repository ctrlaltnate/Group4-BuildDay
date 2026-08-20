import React, { useState } from "react";

export default function CharacterSelect({
  characters = [],
  onSelectCharacter,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedCharacter = characters.find((char) => char.id === selectedId);

  const handleConfirm = () => {
    if (selectedCharacter) {
      onSelectCharacter(selectedCharacter);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-900 text-white rounded-xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-2">
        SELECT YOUR HERO
      </h2>
      <p className="text-slate-400 mb-6 text-sm">
        เลือกตัวละครที่จะพาคุณไปลุยกับบอส
      </p>

      {/* แสดงการ์ดตัวละคร 5 ตัวในแถวเดียว (responsive) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full mb-6">
        {characters.map((char) => {
          const isSelected = char.id === selectedId;
          return (
            <div
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-yellow-400 bg-slate-800 scale-105 shadow-yellow-500/20 shadow-lg"
                  : "border-slate-700 bg-slate-950 hover:border-slate-500"
              }`}
            >
              <div className="w-20 h-20 mb-2 flex items-center justify-center bg-slate-800 rounded-lg overflow-hidden">
                <img
                  src={
                    char.images?.idle ||
                    "/src/assets/characters/placeholder.png"
                  }
                  alt={char.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // หากยังไม่มีไฟล์รูป จะใส่รูปแทนกันพัง
                    e.target.src =
                      "https://via.placeholder.com/80?text=" + char.name;
                  }}
                />
              </div>
              <h3 className="text-base font-bold text-white">{char.name}</h3>
              <p className="text-[10px] text-slate-400 text-center mt-1 line-clamp-2">
                {char.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* ปุ่มยืนยันการเลือก */}
      <button
        onClick={handleConfirm}
        disabled={!selectedId}
        className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
          selectedId
            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-lg active:scale-95"
            : "bg-slate-700 text-slate-500 cursor-not-allowed"
        }`}
      >
        {selectedId
          ? `CONFIRM (${selectedCharacter?.name})`
          : "SELECT A CHARACTER"}
      </button>
    </div>
  );
}
