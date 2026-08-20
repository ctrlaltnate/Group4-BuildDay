# Flappy Boss Survival

เกม React สไตล์ 8-bit ที่รวมเกมบินหลบสิ่งกีดขวาง การสะสม Coins ร้านค้าอาวุธ และการต่อสู้กับบอสไว้ในรอบเดียว ผู้เล่นต้องเลือกตัวละคร เอาชีวิตรอด 60 วินาที เลือกอาวุธตาม Coins ที่มี และกำจัดบอสก่อน HP หมด

เอกสารนี้อ้างอิงจาก implementation ปัจจุบันใน `src/` ไม่ใช่แผนเริ่มต้นใน `ProjectPlan.md`

## Tech Stack และคำสั่ง

- React 19, React DOM, Vite 8
- Tailwind CSS 4 ผ่าน `@tailwindcss/vite`
- React Context สำหรับ shared state
- `requestAnimationFrame` สำหรับ Flappy physics
- `HTMLAudioElement` และ audio pool สำหรับเพลง/เอฟเฟกต์
- ESLint สำหรับตรวจ JavaScript/JSX

```bash
npm install
npm run dev       # development server
npm run lint      # ตรวจ source
npm run build     # production bundle ใน dist/
npm run preview   # preview production build
```

## Game Flow

```text
START
  ↓ Start Game
CHARACTER_SELECT
  ↓ Confirm character
SURVIVAL
  ├─ Player HP = 0 ─────────────→ RESULT (LOSE)
  └─ รอดครบ 60 วินาที → SHOP
                            ↓ Confirm weapon
                          BOSS
                            ├─ Player HP = 0 → RESULT (LOSE)
                            └─ Boss HP = 0 ─→ RESULT (WIN)
                                                   ↓ Start Over
                                                 START
```

ค่าทั้งหก phase อยู่ใน `src/constants/game.js` และ `App.jsx` ใช้ conditional rendering เลือกหน้าจอ ไม่มี Router ใน game flow

## กติกาของแต่ละ Phase

### Start และ Character Select

- `StartScreen` เรียก `startGame()` เพื่อ reset session และไปหน้าเลือกตัวละคร
- `CharacterSelect` อ่านข้อมูลจาก `mock-data/characters.js`
- เลือกได้ครั้งละหนึ่งตัว ปุ่ม Confirm disabled จนกว่าจะเลือก
- หน้าเลือกใช้ sprite `idle`/`stand`; Flappy ใช้ `fly`; Result ใช้ `win`/`die`
- Description แสดงขนาดเล็กใต้กริด responsive 2/3/5 คอลัมน์
- เมื่อยืนยัน `beginSurvival(character)` จะตั้ง HP 1,000, Coins 0, เวลา 60 และเริ่ม Survival

### Flappy Survival

ไฟล์หลัก: `src/components/FlappyMinigame.jsx`

การควบคุม:

- Mouse/touch ใช้ `pointerdown` เพื่อให้ตอบสนองทันที
- Keyboard ใช้ `Space` หรือ `Arrow Up`
- Jump velocity `-41`, gravity `75`, max falling speed `58`
- ตัวละครเอียงตาม velocity และตำแหน่งอัปเดตด้วย `requestAnimationFrame` + delta time

ค่าการเล่น:

| รายการ | ค่า |
|---|---:|
| เวลา | 60 วินาที |
| Player HP | 1,000 |
| Obstacle speed | 24 หน่วย/วินาที |
| Gap size | 32% |
| Collision damage | 300 HP |
| Hit cooldown | 900ms |
| Player hitbox | 6% × 7% |
| Obstacle width/hitbox | 11% |

- Obstacle ใช้ `assets/obstacles/obstacle.png` ทั้งบนและล่าง
- ตัวบนหมุน 180° และ flip horizontal
- ใช้ `object-contain` เพื่อไม่ crop รูป; collision คำนวณแยกจากภาพด้วย padding
- พื้นหลังอยู่คนละ layer ที่ opacity 70% จึงไม่ทำให้ตัวละคร/เหรียญ/Obstacle จาง
- HP 0 เรียก `loseGame('SURVIVAL_HP_DEPLETED')`; เวลา 0 เรียก `completeSurvival()`

Coins:

| ประเภท | รางวัล | กติกา |
|---|---:|---|
| Passive | 1 Coin | ทุก 1 วินาที |
| Rainbow collectible | 20 Coins | spawn ทุก 5 วินาที สูงสุด 10 ครั้ง |

- สูงสุด 60 Passive + 200 Collectible = 260 Coins
- `GameProvider` cap ไว้ที่ 260
- เหรียญ collectible ใช้ `components/ui/rainbow_coin_spin_4_angles_transparent.gif`
- HUD และจุดอื่นใช้เหรียญทองเดิม
- เหรียญเก็บได้จากการชนหรือคลิก และรับซ้ำไม่ได้

### Weapon Shop

ไฟล์หลัก: `src/components/WeaponShop.jsx`, ข้อมูล: `src/mock-data/weapons.js`

- การ์ดทั้งใบเป็นปุ่ม เลือกได้ครั้งละหนึ่งอาวุธ
- สถานะ `SELECT`, `SELECTED`, `LOCKED`
- Card และ icon ลอย/ขยายเมื่อ hover
- แสดงราคา Damage และ Description ก่อน Confirm
- Coins ใช้เป็นเกณฑ์ปลดล็อก ปัจจุบัน **ไม่หัก Coins** หลังยืนยัน

| ID | Weapon | ราคา | Damage/คลิก |
|---|---|---:|---:|
| `neeti-oni-san` | Neeti-oni-san | 150 | 50 |
| `react-tailwind` | React/Tailwind | 120 | 40 |
| `mongo-supabase` | MongoDB/Supabase | 90 | 20 |
| `html-css` | HTML/CSS | 60 | 10 |
| `fists` | Fists (Bare Hands) | 0 | 5 |

Fists ทำให้เข้า Boss Fight ได้เสมอแม้ Coins ไม่พอ

### Boss Fight

ไฟล์หลัก: `src/components/BossFight.jsx`, timing: `src/hooks/useBossPhase.js`

- ใช้พื้นหลังเดียวกับ Flappy
- HUD ด้านบนคงสัดส่วน 10% แสดง Player HP, Coins และ Timer; gameplay ใช้ 90%
- ผู้เล่นขนาดเล็กอยู่ซ้าย บอสขนาดใหญ่อยู่ขวา
- Boss HealthBar max 2,000 อยู่เหนือหัวบอส
- กดที่ตัวบอสเพื่อโจมตี หนึ่งคลิกสร้าง projectile หนึ่งชุด
- Projectile ใช้ icon อาวุธที่เลือกและลด HP ตาม weapon damage
- Boss auto attack ทำงานพร้อมการคลิกของผู้เล่น การคลิกไม่ reset timer

| Boss HP | Visual phase | Damage | Interval |
|---:|---:|---:|---:|
| 1,500–2,000 | 1 | 10 | 700ms |
| 1,000–1,499 | 2 | 15 | 500ms |
| 500–999 | 3 | 20 | 400ms |
| ต่ำกว่า 500 | 3 / attack stage 4 | 25 | 250ms |

- ทุก auto attack แสดง `BOOM!` และเล่น `boss_toom.mp3`
- เมื่อ visual phase เปลี่ยน ภาพบอสเปลี่ยนและเล่น transform effect
- Neeti เล่น `neeti-added.mp3`, แสดง `characters/nitihelp.png` และปา icon อาวุธทุกชนิดพร้อมกัน
- Neeti ยังคงทำ 50 damage/คลิก ไม่คูณ damage ตามจำนวน projectile
- Boss HP 0 = WIN; Player HP 0 = LOSE; HP ไม่ติดลบ

### Result Screen

`ResultScreen.jsx` ใช้ pixel panels แบบกะทัดรัดและแสดงข้อมูลเดิมครบ:

- `You Win` / `Game Over`
- sprite `win` หรือ `die`
- Character, Weapon, Coins
- Player HP และ Boss HP สุดท้าย
- `Start Over` เรียก `restartGame()` เพื่อล้าง session และกลับ `START`

## Shared State Contract

`GameProvider.jsx` เป็นเจ้าของ state กลางและส่งผ่าน `GameContext`; component อ่านผ่าน `useGame()`

| State | Initial | หน้าที่ |
|---|---:|---|
| `phase` | `START` | หน้าจอปัจจุบัน |
| `playerHp` | 1000 | ต่อเนื่องจาก Survival ไป Boss/Result |
| `bossHp` | 2000 | HP บอสและค่า Result |
| `coins` | 0 | Coins สะสม (cap 260) |
| `timeLeft` | 60 | เวลา Survival |
| `selectedCharacter` | `null` | Character object ที่เลือก |
| `selectedWeapon` | `null` | Weapon object ที่เลือก |
| `result` | `null` | `{ status, reason }` |
| `bigCoinVisible` | `false` | การมองเห็น collectible |
| `bigCoinsCollected` | 0 | จำนวน collectible ที่เก็บ |

Actions:

| Action | ผล |
|---|---|
| `startGame()` | reset และไป Character Select |
| `beginSurvival(character)` | เก็บ character, reset Survival, ไป SURVIVAL |
| `damagePlayer(damage)` | ลด HP แบบ clamp ที่ 0 |
| `addCoins(amount)` | เพิ่ม Coins ไม่เกิน 260 |
| `completeSurvival()` | ไป SHOP |
| `loseGame(reason)` | บันทึก LOSE และไป RESULT |
| `selectWeapon(weapon)` | เก็บ weapon, reset Boss HP, ไป BOSS |
| `finishBoss(result)` | บันทึกผลและไป RESULT |
| `restartGame()` | reset ทุกค่าและกลับ START |

## Custom Hooks

| Hook | หน้าที่ |
|---|---|
| `useGame` | อ่าน Context และป้องกันการใช้นอก Provider |
| `useGameTimer` | interval 1 วินาที, callback ref, cleanup เมื่อหยุด/unmount |
| `useCoinSystem` | Passive/collectible Coins, cap 10, cleanup intervals |
| `useBossPhase` | map Boss HP → visual phase, attack stage, damage, interval |
| `useSoundEffect` | audio pool สำหรับเสียงที่เล่นถี่/ซ้อนกัน |
| `useBackgroundMusic` | loop BGM, retry หลัง user interaction, cleanup |
| `useGlobalClickSound` | UI click sound ทุก left pointerdown |

## Shared UI

| Component | Props หลัก | หน้าที่ |
|---|---|---|
| `HealthBar` | `value`, `max`, `label`, `hearts` | pixel hearts + ARIA progressbar |
| `CoinDisplay` | `coins`, `label` | gold coin + zero-padded number |
| `Timer` | `seconds`, `warningAt`, `label` | `m:ss`, warning pulse |
| `Button` | `onClick`, `disabled`, `variant` | primary/secondary shared button |

## โครงสร้างและลำดับการวางไฟล์

```text
group4buildday/
├── index.html                  # HTML shell และ #root
├── package.json                # dependencies/scripts
├── vite.config.js              # Vite/React/Tailwind
├── eslint.config.js            # lint rules
├── README.md                   # คู่มือ implementation
├── ProjectPlan.md              # แผนเริ่มต้น (historical plan)
├── CONTRIBUTIONS.md            # ownership/status summary
├── contributor.md              # รายละเอียดผลงานสมาชิก
├── public/                     # static URL assets
└── src/
    ├── main.jsx                # mount App ภายใต้ StrictMode
    ├── App.jsx                 # game frame, HUD, phase renderer
    ├── index.css               # Tailwind/global theme/keyframes
    ├── App.css                 # App-specific/legacy styles
    ├── constants/game.js       # GAME_PHASES
    ├── context/
    │   ├── GameContext.jsx     # createContext
    │   └── GameProvider.jsx    # shared state/actions
    ├── hooks/                  # reusable non-JSX logic
    │   ├── useGame.js
    │   ├── useGameTimer.js
    │   ├── useCoinSystem.js
    │   ├── useBossPhase.js
    │   ├── useSoundEffect.js
    │   ├── useBackgroundMusic.js
    │   └── useGlobalClickSound.js
    ├── mock-data/
    │   ├── characters.js       # metadata + sprite imports
    │   ├── weapons.js          # metadata + icon imports
    │   └── villian.js          # boss metadata/helper (ชื่อเดิม)
    ├── components/
    │   ├── StartScreen.jsx
    │   ├── CharacterSelect.jsx
    │   ├── FlappyMinigame.jsx
    │   ├── WeaponShop.jsx
    │   ├── BossFight.jsx
    │   ├── ResultScreen.jsx
    │   └── ui/
    │       ├── HealthBar.jsx
    │       ├── CoinDisplay.jsx
    │       ├── Timer.jsx
    │       ├── Button.jsx
    │       └── rainbow_coin_spin_4_angles_transparent.gif
    └── assets/
        ├── characters/         # stand/idle, fly, win, lose, Neeti helper
        ├── villains/           # idle/hit/transform/phases/defeat
        ├── weapons/            # React/Tailwind/Mongo/HTML/CSS
        ├── obstacles/          # obstacle.png
        ├── ui/                 # background/gold coin
        └── soundeffect/        # BGM และ effects
```

กฎการเพิ่มไฟล์:

1. Feature UI → `src/components/`
2. UI ใช้ซ้ำ → `src/components/ui/`
3. Logic ไม่มี JSX และใช้ซ้ำ → `src/hooks/`
4. Shared state/action → `GameProvider`; animation state เฉพาะหน้าอยู่ใน component
5. Flow constants → `src/constants/`
6. Character/weapon/boss metadata → `src/mock-data/`
7. รูป/เสียงแยกตามชนิดใน `src/assets/` และ import ผ่าน ES modules เพื่อให้ Vite hash/check path
8. ห้ามสร้าง `components`, `hooks`, `context`, `mock-data` ซ้ำที่ root
9. เปลี่ยน data contract ต้องแก้ producer, consumer และเอกสารพร้อมกัน

## Audio Map

| Event | Asset |
|---|---|
| Global UI click | `ui-click.wav` |
| Survival/Boss BGM | `survival-bgm.ogg` |
| Collect coin / normal projectile | `coin-collect.wav` |
| Hit obstacle | `obstacle-hit.wav` |
| Survival complete / transform | `survival-win.ogg` |
| Lose result | `game-over.ogg` |
| Boss attack | `boss_toom.mp3` |
| Neeti attack | `neeti-added.mp3` |

## Manual Test Checklist

1. เลือก character ทั้งห้าตัวและตรวจ idle/fly/result sprite
2. ทดสอบ pointer, touch, Space, Arrow Up และ gravity
3. ชน obstacle: -300 HP และ cooldown 900ms
4. เก็บ rainbow coin: +20, สูงสุด 10 ครั้ง
5. รอดครบ 60 วินาที: ไป Shop และ Coins ไม่เกิน 260
6. ตรวจ hover, locked, single select และ fists fallback
7. ตรวจ damage/projectile ของอาวุธทุกชิ้น
8. ตรวจ Neeti helper, multi-projectile และเสียงเฉพาะ
9. คลิกรัวใน Boss: auto attack ต้องยังทำงานพร้อมกัน
10. ตรวจ threshold บอสที่ 1500, 1000, 500
11. ตรวจ Win/Lose/final data/Start Over
12. เปลี่ยน phase แล้วต้องไม่มี interval, timeout, listener หรือเพลงเก่าค้าง

## หมายเหตุ

- `villian.js` สะกดตามชื่อไฟล์เดิม หาก rename ต้องแก้ import พร้อมกัน
- Boss Fight ใช้ timing จาก `useBossPhase.js` จริง; metadata ใน `villian.js` ควร sync ก่อนนำไปใช้แทน
- Shop ยังไม่หัก Coins หากเพิ่มระบบซื้อจริงควรเพิ่ม action ใน `GameProvider`
- ไม่ควร commit `dist/` เว้นแต่ deployment workflow ต้องการ
