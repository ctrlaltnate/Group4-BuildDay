# การแบ่งงานตาม Feature

ไฟล์นี้ใช้กำหนด Feature ที่สมาชิกแต่ละคนต้องพัฒนา พร้อมไฟล์หลักที่เกี่ยวข้อง โดยยังเว้นช่อง GitHub username ไว้สำหรับเติมชื่อภายหลัง

| ลำดับ | ชื่อผู้ใช้ (GitHub username) | Feature ที่รับผิดชอบ | ไฟล์หลัก | งานที่ต้องพัฒนา |
|---|---|---|---|---|
| 1 |  | Game Flow และการเชื่อมต่อหน้าจอ | `src/App.jsx`, `src/context/` | พัฒนา state หลักของเกม การเปลี่ยน phase การส่งข้อมูลระหว่าง component และการเชื่อมทุก feature เข้ากับ App |
| 2 |  | Start Screen และ Character Select | `src/components/StartScreen.jsx`, `src/components/CharacterSelect.jsx` | พัฒนาหน้าเริ่มเกม หน้าเลือกตัวละคร การเลือกตัวละคร และการแสดงข้อมูลหรือ animation ของตัวละคร |
| 3 |  | Flappy Survival และ Coin System | `src/components/FlappyMinigame.jsx`, `src/hooks/useGameTimer.js`, `src/hooks/useCoinSystem.js` | พัฒนาการกระโดด การหลบและชนสิ่งกีดขวาง ระบบจับเวลา 60 วินาที การลด HP และระบบ Passive/Active Coin |
| 4 |  | Weapon Shop และ Boss Fight | `src/components/WeaponShop.jsx`, `src/components/BossFight.jsx`, `src/hooks/useBossPhase.js` | พัฒนารายการอาวุธ การซื้ออาวุธ การโจมตีบอส Boss Phase การโจมตีอัตโนมัติ และเงื่อนไขแพ้ชนะ |
| 5 |  | Result Screen และ Shared UI | `src/components/ResultScreen.jsx`, `src/components/ui/` | พัฒนาหน้าสรุปผลชนะหรือแพ้ component กลาง เช่น HealthBar, CoinDisplay และ Timer รวมถึงทำให้ UI ใช้ซ้ำได้ในหลาย feature |

## ไฟล์ที่ต้องเพิ่มตาม Feature

- `src/components/StartScreen.jsx`
- `src/components/CharacterSelect.jsx`
- `src/components/FlappyMinigame.jsx`
- `src/components/WeaponShop.jsx`
- `src/components/BossFight.jsx`
- `src/components/ResultScreen.jsx`
- `src/components/ui/HealthBar.jsx`
- `src/components/ui/CoinDisplay.jsx`
- `src/hooks/useGameTimer.js`
- `src/hooks/useCoinSystem.js`
- `src/hooks/useBossPhase.js`
- `src/mock-data/weapons.js`
