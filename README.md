# Flappy Boss Survival

## [Play the Live Demo](https://group4-build-day.vercel.app/)

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

## ลำดับการเริ่มแอปและการเชื่อมโยงไฟล์

ส่วนนี้อธิบายเส้นทางตั้งแต่ browser เปิดเว็บจน component แสดงผล เพื่อให้ตาม import และ data flow ได้ทีละขั้น

1. Browser เปิด `index.html` ซึ่งมี `<div id="root">` เป็นจุดวาง React และโหลด `/src/main.jsx` ด้วย `<script type="module">`
2. `src/main.jsx` import `src/index.css` เพื่อโหลด Tailwind, font และ animation ส่วนกลาง แล้วใช้ `createRoot(...).render()` mount `<App />` ลงใน `#root`
3. `<StrictMode>` ช่วยตรวจ side effect ที่ cleanup ไม่ครบใน development จึงอาจเห็น effect mount/cleanup/mount ซ้ำหนึ่งรอบตอนพัฒนา แต่ production ไม่ทำซ้ำแบบนี้
4. `src/App.jsx` วาง `<GameProvider>` ครอบ `<GameScreen>` ทำให้ `GameScreen` และ component ลูกทุกตัวอ่าน state กลางได้ผ่าน `useGame()`
5. `GameScreen` อ่าน `phase` แล้ว `renderPhase()` เลือก render หน้าจอหนึ่งจาก Start, Character Select, Survival, Shop, Boss หรือ Result
6. HUD (`HealthBar`, `CoinDisplay`, `Timer`) อยู่นอก `renderPhase()` จึงคงอยู่ทุกหน้าและรับค่าปัจจุบันจาก Context เสมอ
7. เมื่อ action เปลี่ยน `phase` ใน `GameProvider`, Context value เปลี่ยน → consumer render ใหม่ → `renderPhase()` สลับ component โดยไม่ต้องใช้ URL หรือ React Router

เส้นทาง import หลัก:

```text
index.html
└─ src/main.jsx
   ├─ src/index.css
   └─ src/App.jsx
      ├─ context/GameProvider.jsx ── context/GameContext.jsx
      ├─ hooks/useGame.js ────────── context/GameContext.jsx
      ├─ hooks ด้านเสียง
      ├─ components หน้าจอทั้ง 6 หน้า
      │  ├─ hooks เฉพาะเกม
      │  ├─ components/ui ที่ใช้ซ้ำ
      │  ├─ mock-data ของตัวละคร/อาวุธ
      │  └─ assets รูปและเสียง
      └─ constants/game.js
```

ไฟล์รูป/เสียงที่ `import` จาก `src/assets` จะถูก Vite ตรวจ path และเปลี่ยนเป็น URL ที่มี hash ตอน build ส่วนไฟล์ใน `public/` อ้างด้วย URL จาก root เช่น `/favicon.svg` และไม่ต้อง import ใน JavaScript

## React Context และ `useContext` แบบละเอียด

โปรเจกต์แบ่ง Context เป็นสามชั้นเพื่อไม่ให้ component ผูกกับรายละเอียดมากเกินไป:

1. `GameContext.jsx` สร้างช่องทางข้อมูลด้วย `createContext(null)` ค่า `null` ใช้ตรวจจับกรณีลืมครอบ Provider
2. `GameProvider.jsx` เป็นเจ้าของ state และ action ทั้งหมด แล้วส่ง object `value` ผ่าน `<GameContext value={value}>` ซึ่งเป็นรูปแบบ Provider ของ React 19
3. `useGame.js` เรียก `useContext(GameContext)` และ throw error ที่อ่านง่ายทันทีถ้าถูกใช้ข้างนอก `GameProvider`; component อื่นจึงไม่ต้อง import Context โดยตรง

ตัวอย่างเส้นทางข้อมูลเมื่อชน obstacle:

```text
FlappyMinigame.registerHit()
→ damagePlayer(300) จาก useGame()
→ GameProvider ใช้ setPlayerHp(current => max(0, current - 300))
→ Context value เปลี่ยน
→ HUD และ FlappyMinigame render ด้วย HP ใหม่
→ เมื่อ HP = 0, effect ใน FlappyMinigame เรียก loseGame(...)
→ Provider ตั้ง result และ phase = RESULT
→ App render ResultScreen
```

`useMemo` ใน `GameProvider` ทำให้ object `value` คง reference เดิมเมื่อ dependency ไม่เปลี่ยน ส่วน action ใช้ `useCallback` เพื่อให้ function reference เสถียร ลดการสร้าง effect/interval ใหม่โดยไม่จำเป็น การอัปเดตค่าที่ขึ้นกับค่าเดิม เช่น HP และ Coins ใช้ functional setter (`current => ...`) เพื่อไม่อ่านค่าจาก closure เก่า

### State กลางกับ state เฉพาะหน้า

- State กลางเก็บข้อมูลที่ต้องข้าม phase หรือแสดงใน HUD/Result ได้แก่ HP, Boss HP, Coins, Timer, Character, Weapon และ Result
- `CharacterSelect` เก็บ `selectedId` ไว้ภายใน เพราะยังเป็นเพียงการเลือกชั่วคราวจนกด Confirm
- `WeaponShop` เก็บ `selectedWeapon` ภายในด้วยเหตุผลเดียวกัน แล้วค่อยส่ง object เข้า Provider เมื่อยืนยัน
- `FlappyMinigame` เก็บตำแหน่ง/ความเร็ว/สถานะชนไว้ภายใน เพราะหมดความหมายเมื่อออกจาก Survival
- `BossFight` มี HP ภายในเพื่อให้การต่อสู้ตอบสนองทันที และ sync กลับ Provider ผ่าน callback เพื่อให้ HUD และ Result ได้ค่าล่าสุด

โปรเจกต์นี้เป็นเกม session เดียวในหน่วยความจำ: **ยังไม่มีระบบสมัครสมาชิก, เข้าสู่ระบบ, บัญชีผู้ใช้, backend, database, token, cookie หรือ localStorage** การ refresh หน้าเว็บจะล้างความคืบหน้าทั้งหมด หากคำว่า “การจัดการบัญชี” หมายถึง user account จะต้องเพิ่ม authentication และ persistence เป็น feature ใหม่; README นี้จึงไม่กล่าวอ้างว่ามีระบบบัญชีที่โค้ดยังไม่ได้ทำ

## `useEffect` ทุกจุด: trigger, งานที่ทำ และ cleanup

Dependency array คือรายการค่าที่ effect ใช้จากภายนอก เมื่อค่าใดเปลี่ยน React จะ cleanup effect เดิมก่อนแล้วจึงรัน effect ใหม่ การคืน function จาก effect สำคัญมากกับ timer, event listener, animation และ audio เพื่อไม่ให้ของรอบเก่าค้างหลังเปลี่ยน phase

| ตำแหน่ง | Dependency/เวลาเริ่มใหม่ | งานที่ทำ | Cleanup/เหตุผล |
|---|---|---|---|
| `App.jsx` game-over sound | `phase`, function เล่นเสียง, `result.status` | เล่นเสียงเมื่อเข้า Result แบบ LOSE | audio pool ดูแลโดย hook |
| `App.jsx` survival-win sound | `phase`, function เล่นเสียง, `playerHp` | เล่นเสียงเมื่อเข้า Shop โดย HP มากกว่า 0 | audio pool ดูแลโดย hook |
| `useGameTimer` callback ref | `onTimeUp` | เก็บ callback ล่าสุดใน ref โดยไม่ต้องสร้าง interval ใหม่ทุก render | ไม่ต้อง cleanup |
| `useGameTimer` interval | `isRunning`, `setTimeLeft` | ลดเวลาทุก 1 วินาที; ที่ 0 ใช้ `queueMicrotask` เรียก callback หลัง state updater จบ | `clearInterval` เมื่อหยุด/ออกหน้า |
| `useCoinSystem` passive | `addCoins`, `isRunning` | เพิ่ม 1 Coin ทุกวินาที | `clearInterval` |
| `useCoinSystem` big coin | จำนวนที่เก็บ, `isRunning`, setter | ทำ collectible ให้ visible ทุก 5 วินาทีจนเก็บครบ 10 | `clearInterval` |
| `useCoinSystem` hide | `isRunning`, setter | ซ่อน collectible เมื่อเกมหยุด | ไม่ต้อง cleanup |
| `useBackgroundMusic` | `source`, `volume` | สร้าง audio แบบ loop และลองเล่นทันที/หลัง pointerdown แรกเพื่อผ่าน autoplay policy | ถอด listener, pause, reset และปล่อย source |
| `useGlobalClickSound` | `[]` | สร้าง pool 4 เสียงและฟัง left `pointerdown` ทั่ว window | ถอด listener และทำลาย audio pool |
| `useSoundEffect` | `poolSize`, `source`, `volume` | สร้าง audio pool; callback หมุนใช้สมาชิกเพื่อให้เสียงซ้อนกันได้ | pause, ล้าง source และ array |
| `FlappyMinigame` hit timeout | `[]` | มีเฉพาะ cleanup สำหรับ timeout เอฟเฟกต์โดนชน | `clearTimeout` ตอน unmount |
| `FlappyMinigame` HP | `loseGame`, `playerHp` | เปลี่ยนเป็น Result เมื่อ HP เหลือ 0 | ไม่ต้อง cleanup |
| `FlappyMinigame` keyboard | `jump` | ฟัง Space/ArrowUp จาก window | ถอด `keydown` listener |
| `FlappyMinigame` game loop | coin visibility/callback, running, hit callback, setter | คำนวณ physics, obstacle, coin และ collision ทุก animation frame | `cancelAnimationFrame` และ reset timestamp |
| `BossFight` timeout registry | `[]` | effect นี้คืน cleanup อย่างเดียว | clear timeout ของ projectile, hit flash และ BOOM ทั้งหมด |
| `BossFight` sync Boss HP | local Boss HP, callback prop | ส่งค่า Boss HP ล่าสุดกลับ Provider | ไม่ต้อง cleanup |
| `BossFight` sync Player HP | local Player HP, callback prop | ส่งค่า Player HP ล่าสุดกลับ Provider | ไม่ต้อง cleanup |
| `BossFight` phase sound | phase, function เล่นเสียง | เทียบกับ `previousPhaseRef`; เล่นเสียงเฉพาะตอน phase เปลี่ยน | ไม่ต้อง cleanup |
| `BossFight` auto attack | damage, interval, sound, scheduler | สร้าง interval โจมตีตาม phase ปัจจุบัน | clear interval ก่อนเปลี่ยนความเร็ว/ออกหน้า |
| `BossFight` end check | HP ทั้งสอง, callback | Boss 0 และผู้เล่นยังรอด = win; ผู้เล่น 0 = lose | ไม่ต้อง cleanup |

เหตุผลที่ใช้ `useRef` ใน timer/game loop/audio คือ ref เก็บค่าข้าม render ได้แต่การเปลี่ยน `.current` ไม่บังคับ render เหมาะกับ timestamp, velocity, timeout ID, audio object และ callback ล่าสุด ส่วนค่าที่ต้องปรากฏบนจอใช้ `useState`

## อธิบายแต่ละไฟล์และสัญญาการรับส่งข้อมูล

### ไฟล์ระดับโปรเจกต์

- `index.html` กำหนดภาษา/encoding, viewport, favicon, title, `#root` และ entry module
- `package.json` กำหนด ES modules, scripts และ package; ปัจจุบัน `react-router`/`react-router-dom` ติดตั้งอยู่แต่ game flow ไม่ได้ import มาใช้
- `package-lock.json` ล็อก dependency version เพื่อให้ติดตั้งซ้ำได้ผลใกล้เคียงกัน ไม่ควรแก้ด้วยมือ
- `vite.config.js` เปิด React transform/Fast Refresh และ Tailwind CSS Vite plugin
- `eslint.config.js` ตรวจ JS/JSX, React Hooks และ React Refresh, ใช้ browser globals และไม่ตรวจ `dist`
- `ProjectPlan.md` เป็นแผนย้อนหลัง ไม่ใช่ source of truth ของ implementation
- `CONTRIBUTIONS.md` และ `contributor.md` เป็นเอกสารผลงาน/ผู้ร่วมพัฒนา ไม่ถูก import ตอน runtime
- `desktop.ini` เป็น metadata จาก Windows ไม่เกี่ยวกับ runtime

### Entry, theme และ flow

- `src/main.jsx`: จุด mount เพียงจุดเดียว; import global CSS และ `App`
- `src/index.css`: import Google Font และ Tailwind, ตั้ง CSS variables/light-dark theme, บังคับ pixel font, reset body และนิยาม animation `.boss-projectile`
- `src/App.css`: stylesheet รุ่นก่อน/เฉพาะ App แต่ **ปัจจุบันไม่มีไฟล์ใด import** จึงไม่ส่งผลต่อหน้าเว็บ
- `src/constants/game.js`: `Object.freeze` ป้องกันแก้ object phase โดยไม่ตั้งใจและลด string typo ใน switch/action
- `src/App.jsx`: เป็น composition root, HUD และ phase switch; แปลงผล `'win'/'lose'` จาก Boss เป็น uppercase result object ก่อนส่ง Provider

### Context และ hooks

- `GameContext.jsx`: ประกาศ Context อย่างเดียวเพื่อหลีกเลี่ยง circular dependency
- `GameProvider.jsx`: กำหนดค่าเริ่มต้น, state, validation/clamp และ action เปลี่ยน phase; Coins ถูก cap ที่ 260, HP ไม่ต่ำกว่า 0
- `useGame.js`: facade ของ `useContext` พร้อม guard
- `useGameTimer.js`: timer กลางของ Survival
- `useCoinSystem.js`: orchestration ของ passive coin และ rainbow coin โดย state collectible จริงอยู่ใน Provider
- `useBossPhase.js`: pure mapping จาก HP ไป phase/damage/interval แม้ตั้งชื่อเป็น hook แต่ไม่ได้เรียก React hook ภายใน
- `useBackgroundMusic.js`: เพลง loop หนึ่ง track ต่อ component ที่ mount
- `useSoundEffect.js`: reusable overlapping sound pool
- `useGlobalClickSound.js`: click feedback ระดับ window

### Components หน้าจอ

- `StartScreen.jsx` รับ `onStart`; ปุ่มเรียก action เริ่ม session ไม่มี state ภายใน
- `CharacterSelect.jsx` รับ array `characters` และ `onSelectCharacter`; หา object จาก ID, แสดง fallback เมื่อรูปโหลดพลาด และส่ง character object เมื่อ Confirm
- `FlappyMinigame.jsx` อ่าน Context โดยตรง, ประกอบ timer/coin/audio hooks, รับ input, รัน physics และแจ้ง Provider เมื่อจบหรือแพ้
- `WeaponShop.jsx` รับ `coins` และ `onPurchaseWeapon`; รวม `weapons` กับ `defaultWeapon`, disable ของที่ราคาเกิน Coins และส่ง weapon object เมื่อ Confirm คำว่า purchase ใน callback **ไม่ได้หมายถึงหักเงิน**
- `BossFight.jsx` รับ snapshot HP/character/weapon และ callback sync/end; เลือกภาพบอสจาก phase, สร้าง projectile, auto attack และตัดสินผล
- `ResultScreen.jsx` รับข้อมูลสรุปทั้งหมดผ่าน props, เลือกภาพ win/die และเรียก `onRestart`

### Shared UI และ data modules

- `HealthBar.jsx` sanitize ค่า, แปลง HP เป็นสัดส่วนหัวใจเต็ม/บางส่วน และให้ข้อมูล `progressbar` แก่ screen reader
- `CoinDisplay.jsx` กันค่าติดลบ/NaN และ pad ตัวเลขอย่างน้อย 3 หลัก
- `Timer.jsx` แปลงวินาทีเป็น `m:ss`, clamp ที่ 0 และ pulse เมื่อเหลือไม่เกิน `warningAt`
- `Button.jsx` เป็นปุ่ม shared รุ่นทั่วไป แต่ **ปัจจุบันยังไม่มี component ใด import**
- `characters.js` import sprite สี่สถานะของตัวละครแต่ละตัวและ export metadata array ที่ Character Select/Battle/Result ใช้ต่อกัน
- `weapons.js` import icon, export อาวุธแบบซื้อได้, fists เริ่มต้น และ helper ค้นหา; ปัจจุบัน `getWeaponById`/`getAllWeapons` ยังไม่มี consumer
- `villian.js` (สะกดตามไฟล์เดิม) มี boss metadata/helper รุ่นเดิม แต่ **BossFight ปัจจุบันไม่ได้ import** และค่าบางส่วนไม่ตรงกับ `useBossPhase`; อย่าใช้สองแหล่งพร้อมกันโดยไม่ปรับให้ตรง

## Data contract สำคัญ

```js
// Character object
{ id, name, description, skill, images: { idle, fly, win, die } }

// Weapon object
{ id, name, price, damage, description, img }

// Result object ใน Context
{ status: 'WIN' | 'LOSE', reason: string }
```

ถ้าเปลี่ยนชื่อ field ต้องแก้ทั้งผู้สร้างข้อมูลและ consumer เช่นเปลี่ยน `images.die` ต้องแก้ `characters.js` และ `ResultScreen`; เปลี่ยน `weapon.damage` ต้องตรวจ `WeaponShop` และ `BossFight` ด้วย

## การป้องกันค่าผิดพลาดและการจบ session

- HP และ Boss HP ใช้ `Math.max(0, ...)` จึงไม่ติดลบ
- Coins รับเฉพาะจำนวนเพิ่มที่ไม่ติดลบและไม่เกิน 260
- Timer คืน 0 และล้าง interval ก่อนเรียก callback จบเกม
- Collectible ตรวจ `isRunning`, visibility และจำนวนสูงสุดก่อนให้รางวัล จึงกดซ้ำหลังเก็บไม่ได้
- Collision มี cooldown 900ms ป้องกันเสีย HP ทุก animation frame
- ปุ่ม Character/Weapon Confirm disabled จนมีตัวเลือกที่ถูกต้อง
- ทุก interval/listener/animation/audio/timeout ที่สร้างใน hook หรือ gameplay มี cleanup เมื่อ component unmount หรือ dependency เปลี่ยน
- `restartGame()` reset session ทุก field ก่อนกลับ START; ไม่มีข้อมูลผู้เล่นถูกบันทึกข้าม refresh

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
