import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import CharacterSelect from "./components/CharacterSelect";
import { characters } from "./mock-data/characters";

function App() {
  // สร้าง State จัดการหน้าจอ (start -> select -> game)
  const [gameState, setGameState] = useState("start"); // "start" | "select" | "playing"
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // กดปุ่ม START GAME จากหน้าแรก
  const handleStartGame = () => {
    setGameState("select");
  };

  // กดเลือกตัวละครและยืนยัน
  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setGameState("playing"); // หรือพาไปหน้าเล่นเกมต่อไป
    console.log("Selected Hero:", character);
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {/* หน้า Start */}
      {gameState === "start" && <StartScreen onStart={handleStartGame} />}

      {/* หน้า เลือกตัวละคร (ส่ง characters props เข้าไปด้วย) */}
      {gameState === "select" && (
        <CharacterSelect
          characters={characters}
          onSelectCharacter={handleSelectCharacter}
        />
      )}

      {/* หน้า เริ่มเล่นเกม (ใส่ Component เกมของคุณตรงนี้ได้เลย) */}
      {gameState === "playing" && (
        <div className="text-white font-mono text-center">
          <h2>GAME STARTING...</h2>
          <p>Hero: {selectedCharacter?.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
