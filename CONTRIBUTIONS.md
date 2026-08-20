| ลำดับ | ชื่อผู้ใช้ (GitHub username) | Feature ที่รับผิดชอบ | ไฟล์หลัก | งานที่ต้องพัฒนา |
|---|---|---|---|---|
| 1 | @inatbalthazr | Game Flow และการเชื่อมต่อหน้าจอ | `src/App.jsx`, `src/context/` | พัฒนา state หลักของเกม การเปลี่ยน phase การส่งข้อมูลระหว่าง component และการเชื่อมทุก feature เข้ากับ App |
| 2 | @rin | Start Screen และ Character Select | `src/components/StartScreen.jsx`, `src/components/CharacterSelect.jsx` | พัฒนาหน้าเริ่มเกม หน้าเลือกตัวละคร การเลือกตัวละคร และการแสดงข้อมูลหรือ animation ของตัวละคร |
| 3 | @ctrlaltnate | Flappy Survival และ Coin System | `src/components/FlappyMinigame.jsx`, `src/hooks/useGameTimer.js`, `src/hooks/useCoinSystem.js` | พัฒนาการกระโดด การหลบและชนสิ่งกีดขวาง ระบบจับเวลา 60 วินาที การลด HP และระบบ Passive/Active Coin |
| 4 | @kyden | Weapon Shop และ Boss Fight | `src/components/WeaponShop.jsx`, `src/components/BossFight.jsx`, `src/hooks/useBossPhase.js` | พัฒนารายการอาวุธ การซื้ออาวุธ การโจมตีบอส Boss Phase การโจมตีอัตโนมัติ และเงื่อนไขแพ้ชนะ |
| 5 | @delta | Result Screen และ Shared UI | `src/components/ResultScreen.jsx`, `src/components/ui/` | พัฒนาหน้าสรุปผลชนะหรือแพ้ component กลาง เช่น HealthBar, CoinDisplay และ Timer รวมถึงทำให้ UI ใช้ซ้ำได้ในหลาย feature |
