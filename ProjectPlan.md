# Flappy Boss Survival Project Plan

เอกสารนี้เป็นแผนการพัฒนาเกม Flappy Boss Survival สำหรับทีม React Build Day โดยรวบรวมรายละเอียดจาก `README.md`, flow chart, โครงสร้าง repository และการแบ่ง Feature ของสมาชิก 5 คน

เอกสารนี้เป็นแผนงานเท่านั้น ไฟล์ที่ระบุว่า "ต้องสร้าง" ยังไม่ถือว่ามี implementation อยู่ในโปรเจกต์

## 1. เป้าหมายของโปรเจกต์

พัฒนาเกม React ที่ให้ผู้เล่นเลือกตัวละคร เอาชีวิตรอดในมินิเกมแบบ Flappy Bird เป็นเวลา 60 วินาที เก็บ Coins ซื้ออาวุธ และนำอาวุธไปต่อสู้กับบอส โดยเกมต้องมีการเปลี่ยนหน้าจอตามลำดับตั้งแต่ Start จนถึง Result

เป้าหมายหลัก:

- มี Game Flow ครบตั้งแต่เริ่มเกมจนจบเกม
- ใช้ State Management จัดการข้อมูลที่เปลี่ยนระหว่างการเล่น
- แยก UI และ logic เป็น Feature ที่สมาชิกพัฒนาได้แยกกัน
- ใช้ mock-data เป็นแหล่งข้อมูลกลางของตัวละคร บอส และอาวุธ
- เชื่อมทุก Feature ผ่าน `src/App.jsx`
- รองรับกรณีเล่นชนะ แพ้ Game Over และเริ่มเกมใหม่
- ตรวจสอบการทำงานด้วย lint, build และการทดสอบ flow แบบ manual

## 2. สถานะ Repository ปัจจุบัน

สถานะนี้อธิบายทั้งสิ่งที่มีอยู่ใน repository และงานที่ต้องทำต่อ โดยไฟล์ที่สร้างไว้เป็นไฟล์เปล่าตามแผน ยังไม่มี implementation เกมอยู่ภายใน

### 2.1 ไฟล์ตั้งค่าและเอกสาร

| ไฟล์ | สถานะ | หน้าที่ปัจจุบัน | สิ่งที่ต้องทำต่อ |
|---|---|---|---|
| `index.html` | มีอยู่แล้ว | เป็น HTML entry point และมี root element สำหรับ mount React | ตรวจ title, meta และความพร้อมสำหรับหน้าเกม |
| `package.json` | มีอยู่แล้ว | เก็บ dependencies และคำสั่ง `dev`, `build`, `lint`, `preview` | ติดตั้ง dependencies ก่อนเริ่มงาน และเพิ่ม package เฉพาะเมื่อจำเป็น |
| `vite.config.js` | มีอยู่แล้ว | ตั้งค่า Vite และ React plugin | ใช้ต่อได้ ตรวจ alias หรือ asset path หากทีมต้องการเพิ่ม |
| `eslint.config.js` | มีอยู่แล้ว | ตรวจคุณภาพ JavaScript และ JSX | รัน lint หลังสมาชิกส่งงานและแก้ warning/error ที่เกี่ยวข้อง |
| `README.md` | มีอยู่แล้ว | อธิบายกติกา flow และโครงสร้างโปรเจกต์ | อัปเดตเมื่อมีการเปลี่ยนกติกา ชื่อไฟล์ หรือ flow |
| `ProjectPlan.md` | มีอยู่แล้ว | เป็นแผนพัฒนา ขั้นตอนทำงาน และ acceptance criteria | ใช้ติดตามงานและอัปเดตสถานะเมื่อแต่ละ Feature เสร็จ |
| `CONTRIBUTIONS.md` | มีอยู่แล้ว | ตาราง Feature และช่อง GitHub username | ใส่ username และปรับสถานะงานของแต่ละคน |
| `contributor.md` | มีอยู่แล้ว | รายละเอียด Feature และไฟล์หลักของสมาชิก 5 คน | ใช้เป็นข้อตกลง ownership และอัปเดตเมื่อมีการเปลี่ยนผู้รับผิดชอบ |

### 2.2 Entry และไฟล์ style

| ไฟล์ | สถานะ | หน้าที่ปัจจุบัน | สิ่งที่ต้องทำต่อ |
|---|---|---|---|
| `src/main.jsx` | มีอยู่แล้ว | mount `App` เข้ากับ `index.html` | คงเป็น entry point และเพิ่ม provider เฉพาะเมื่อทีมจำเป็นต้องใช้ |
| `src/App.jsx` | มีอยู่แล้ว แต่เป็น Vite starter | จุดรวม game state และตัวเชื่อมทุก Feature | คนที่ 1 วาง state contract และโครงสร้าง App ร่วมกับคนที่ 3 ซึ่งทำ App integration, phase transition, shared state และ reset flow |
| `src/App.css` | มีอยู่แล้ว แต่เป็น Vite starter | style เฉพาะของ App template | คนที่ 5 ต้องปรับเป็น style ของเกมและรองรับ component จริง |
| `src/index.css` | มีอยู่แล้ว แต่เป็น Vite starter | global variables, body และ style พื้นฐาน | คนที่ 5 ต้องกำหนด global theme, typography, layout และ responsive rules |

### 2.3 Components ที่มีและต้องพัฒนา

| ไฟล์ | สถานะ | หน้าที่ | สิ่งที่ต้องทำต่อ |
|---|---|---|---|
| `src/components/Example.jsx` | มีอยู่แล้วและว่าง | ไฟล์ตัวอย่าง component | ลบหรือแทนที่เมื่อเริ่ม implementation จริง ไม่ใช้เป็นส่วนหนึ่งของ game flow |
| `src/components/StartScreen.jsx` | มีไฟล์เปล่าแล้ว | แสดงชื่อเกมและปุ่ม Start | คนที่ 2 สร้าง UI และส่ง event เริ่มเกมกลับ App |
| `src/components/CharacterSelect.jsx` | มีไฟล์เปล่าแล้ว | แสดงและเลือกตัวละคร | คนที่ 2 เชื่อม characters data, selected state และ callback กลับ App |
| `src/components/FlappyMinigame.jsx` | มีไฟล์เปล่าแล้ว | มินิเกมเอาชีวิตรอด | คนที่ 3 สร้างการกระโดด obstacle collision, HP, timer, coin event และจบด่าน |
| `src/components/WeaponShop.jsx` | มีไฟล์เปล่าแล้ว | แสดงร้านค้าและซื้ออาวุธ | คนที่ 4 เชื่อม weapons data, ตรวจ Coins, จำกัดการซื้อ 1 ชิ้น และส่ง weapon กลับ App |
| `src/components/BossFight.jsx` | มีไฟล์เปล่าแล้ว | ฉากต่อสู้กับบอส | คนที่ 4 สร้าง player attack, boss auto attack, phase และผลแพ้ชนะ |
| `src/components/ResultScreen.jsx` | มีไฟล์เปล่าแล้ว | แสดงผล Win, Lose หรือ Game Over | คนที่ 5 รับ result data จาก App แสดงสรุป และสร้างปุ่มเริ่มเกมใหม่ |
| `src/components/ui/HealthBar.jsx` | มีไฟล์เปล่าแล้ว | แสดง HP ของผู้เล่นหรือบอส | คนที่ 5 ทำให้รับ current HP และ max HP ผ่าน props และใช้ซ้ำได้ |
| `src/components/ui/CoinDisplay.jsx` | มีไฟล์เปล่าแล้ว | แสดง Coins และสถานะการเก็บเหรียญ | คนที่ 5 ทำ component กลางที่ใช้ใน Survival, Shop และ Result |
| `src/components/ui/Timer.jsx` | มีไฟล์เปล่าแล้ว | แสดงเวลาที่เหลือ | คนที่ 5 ทำ component กลางที่รับเวลาและสถานะจาก App |
| `src/components/ui/Button.jsx` | มีไฟล์เปล่าแล้ว | ปุ่มรูปแบบร่วมกัน หากทีมเลือกใช้ | คนที่ 5 กำหนด variant, disabled state และ keyboard focus หรือเอาออกถ้าไม่จำเป็น |

### 2.4 Hooks และ logic ที่ใช้ซ้ำ

| ไฟล์ | สถานะ | หน้าที่ | สิ่งที่ต้องทำต่อ |
|---|---|---|---|
| `src/hooks/useGameTimer.js` | มีไฟล์เปล่าแล้ว | ควบคุม timer 60 วินาทีของ Survival | คนที่ 3 ทำ start, pause, complete และ cleanup เมื่อเปลี่ยน phase |
| `src/hooks/useCoinSystem.js` | มีไฟล์เปล่าแล้ว | ควบคุม Passive Coin และ Big Coin | คนที่ 3 ทำ interval, hard cap 10 ครั้ง, collect และ cleanup |
| `src/hooks/useBossPhase.js` | มีไฟล์เปล่าแล้ว | คำนวณ phase และรอบโจมตีของบอส | คนที่ 4 ทำ phase transition และ interval ตาม Boss HP |

### 2.5 Mock Data และ Context

| ไฟล์ | สถานะ | หน้าที่ | สิ่งที่ต้องทำต่อ |
|---|---|---|---|
| `src/mock-data/characters.js` | มีอยู่แล้วและว่าง | แหล่งข้อมูลตัวละคร | คนที่ 1 ใส่ id, name, description, ability และ path ของแต่ละอิริยาบถ |
| `src/mock-data/villian.js` | มีอยู่แล้วและว่าง | แหล่งข้อมูลวายร้ายและ Boss Phase | คนที่ 1 ใส่ชื่อ HP, states, damage และ interval ของแต่ละ phase; คงชื่อไฟล์เดิมหรือเปลี่ยนพร้อมแก้ import ทั้งหมด |
| `src/mock-data/weapons.js` | มีไฟล์เปล่าแล้ว | แหล่งข้อมูลอาวุธ | คนที่ 1 ใส่ชื่อ ราคา damage icon และคำอธิบายของอาวุธ 4 ชนิด |
| `src/context/MessageContext.jsx` | มีอยู่แล้วและว่าง | จุดรวม context สำหรับข้อความหรือ feedback | คนที่ 1 ตัดสินว่าจำเป็นหรือไม่ และกำหนดข้อมูลที่แชร์ |
| `src/context/MessageProvider.jsx` | มีอยู่แล้วและว่าง | provider ของ message context | คนที่ 1 สร้าง provider เฉพาะเมื่อมี message state ที่ต้องแชร์หลายหน้า |

### 2.6 Pages และ Assets

| ไฟล์หรือโฟลเดอร์ | สถานะ | หน้าที่ | สิ่งที่ต้องทำต่อ |
|---|---|---|---|
| `src/pages/Nav.jsx` | มีอยู่แล้วและว่าง | navigation หรือ layout หากทีมเลือกใช้ | ตรวจว่าจำเป็นหรือไม่ เพราะเกมใช้ game phase ใน App ได้โดยไม่ต้องใช้ router |
| `src/assets/hero.png` | มีอยู่แล้ว | asset ตัวอย่างจาก Vite | ลบหรือแทนที่เมื่อมีภาพเกมจริง |
| `src/assets/react.svg` | มีอยู่แล้ว | logo ตัวอย่างจาก Vite | ลบออกจาก UI เกมจริง |
| `src/assets/vite.svg` | มีอยู่แล้ว | logo ตัวอย่างจาก Vite | ลบออกจาก UI เกมจริง |
| `src/assets/characters/` | มีโฟลเดอร์และ `.gitkeep` | เก็บภาพตัวละคร | คนที่ 2 เพิ่มภาพและตรวจ path ใน characters data |
| `src/assets/villains/` | มีโฟลเดอร์และ `.gitkeep` | เก็บภาพบอสและสถานะการโจมตี | คนที่ 4 เตรียม gameplay asset และคนที่ 5 ช่วยตรวจ visual consistency, fallback และ path |
| `src/assets/weapons/` | มีโฟลเดอร์และ `.gitkeep` | เก็บ icon หรือภาพอาวุธ | คนที่ 4 เตรียม asset สำหรับ Shop/Boss และคนที่ 5 ช่วยตรวจการแสดงผลและ path |
| `src/assets/obstacles/` | มีโฟลเดอร์และ `.gitkeep` | เก็บภาพสิ่งกีดขวาง | คนที่ 4 เตรียมร่วมกับคนที่ 5; คนที่ 3 ตรวจขนาดที่มีผลต่อ collision |
| `src/assets/ui/` | มีโฟลเดอร์และ `.gitkeep` | เก็บภาพเหรียญ พื้นหลัง effect และ UI | คนที่ 5 เป็นเจ้าของและช่วยตรวจ asset gameplay ของคนที่ 4 |
| `public/favicon.svg` | มีอยู่แล้ว | favicon | ใช้ต่อหรือเปลี่ยนให้เข้ากับเกม |
| `public/icons.svg` | มีอยู่แล้ว | static icons จาก template | ใช้เฉพาะเมื่อจำเป็น หรือลบเมื่อไม่ใช้ |

### 2.7 สรุปสิ่งที่ต้องทำจากสถานะปัจจุบัน

ลำดับงานที่ต้องทำจาก repository ปัจจุบัน:

1. คนที่ 1 เติม mock-data วาง App state contract และตัดสินการใช้ context ร่วมกับคนที่ 3
2. คนที่ 2 ทำ Start Screen และ Character Select
3. คนที่ 3 ทำ Flappy Survival, hooks และ App integration ร่วมกับคนที่ 1
4. คนที่ 4 ทำ Weapon Shop, Boss Fight, Boss Phase และ gameplay assets
5. คนที่ 5 ทำ Result Screen, shared UI, style และช่วยคนที่ 4 เตรียม/ตรวจสอบ assets
6. คนที่ 1 และคนที่ 3 รวมทุก Feature เข้า App และตรวจ flow ตั้งแต่ Start ถึง Result
7. สมาชิกทุกคนตรวจ asset path, lint, build และ manual test flow

## 3. โครงสร้างไฟล์เป้าหมาย

```text
group4buildday/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
├── ProjectPlan.md
├── CONTRIBUTIONS.md
├── contributor.md
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── characters/
    │   ├── villains/
    │   ├── weapons/
    │   ├── obstacles/
    │   └── ui/
    ├── components/
    │   ├── Example.jsx
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
    │       └── Button.jsx
    ├── context/
    │   ├── MessageContext.jsx
    │   └── MessageProvider.jsx
    ├── hooks/
    │   ├── useGameTimer.js
    │   ├── useCoinSystem.js
    │   └── useBossPhase.js
    ├── mock-data/
    │   ├── characters.js
    │   ├── villian.js
    │   └── weapons.js
    └── pages/
        └── Nav.jsx
```

หมายเหตุ:

- ทุก Feature ต้องอยู่ใต้ `src/`
- ห้ามสร้าง `components/`, `mock-data/`, `context/` หรือ `pages/` ซ้ำที่ root
- `src/mock-data/villian.js` ใช้ชื่อเดิมให้ตรงกับไฟล์ที่มีอยู่จริงในปัจจุบัน หากจะเปลี่ยนเป็น `villain.js` ต้องแก้ import ทุกจุดพร้อมกัน
- โฟลเดอร์ asset ที่ยังไม่มีให้สร้างเมื่อเริ่มเตรียมภาพจริง
- `Example.jsx` และ asset ของ Vite เป็นไฟล์เริ่มต้น สามารถลบหรือแทนที่เมื่อเชื่อมเกมจริง

## 4. Game Flow

### Phase 1: Start

1. แสดงชื่อเกมและปุ่ม START
2. เมื่อผู้เล่นกด START ให้เปลี่ยนไปหน้า Select Character
3. ยังไม่เริ่ม timer หรือระบบเก็บ Coins ในหน้า Start

### Phase 2: Select Character

1. แสดงตัวละครทั้งหมดจาก `src/mock-data/characters.js`
2. แสดงชื่อ คำอธิบาย และภาพของตัวละคร
3. ผู้เล่นเลือกตัวละครได้ 1 ตัว
4. เมื่อยืนยันการเลือก ให้เริ่ม session ใหม่
5. ตั้งค่า Player HP เป็น 1,000
6. ตั้งเวลา Survival เป็น 60 วินาที
7. ตั้ง Coins เป็น 0
8. ล้างอาวุธ ผลลัพธ์ และค่าจากรอบก่อนหน้า
9. เปลี่ยนไป Flappy Survival

ข้อมูลตัวละครควรเตรียม path ของสถานะ idle, flap หรือ jump, hit, win และ lose

### Phase 3: Flappy Survival

1. เริ่มมินิเกมหลังเลือกตัวละคร
2. ผู้เล่นกดหรือคลิกเพื่อกระโดด
3. ตัวละครเคลื่อนที่และหลบสิ่งกีดขวาง
4. Timer ลดจาก 60 วินาทีจนถึง 0
5. Passive Coin เพิ่ม 1 แต้มทุก 1 วินาที
6. Big Coin มีโอกาสปรากฏทุก 5 วินาที
7. ผู้เล่นคลิก Big Coin เพื่อรับ 10 แต้ม
8. Big Coin เก็บได้สูงสุด 10 ครั้ง หรือ 100 แต้ม
9. Passive Coin รวมสูงสุด 60 แต้ม
10. Coins รวมสูงสุด 160 แต้ม
11. เมื่อชนสิ่งกีดขวาง ลด Player HP ครั้งละ 300
12. เมื่อ Player HP เท่ากับหรือน้อยกว่า 0 ให้หยุดระบบทั้งหมดและไปหน้าผู้เล่นแพ้
13. เมื่อ Timer ครบ 0 และ Player HP มากกว่า 0 ให้ไป Weapon Shop

Big Coin มี hard cap 10 ครั้ง แม้เวลา 60 วินาทีจะมีรอบเกิดตามเวลาได้มากกว่า 10 ครั้ง

### Phase 4: Weapon Shop

1. รับ Player HP และ Coins ที่เหลือจาก Flappy Survival
2. แสดงอาวุธทั้ง 4 ชนิด
3. ตรวจสอบว่า Coins เพียงพอกับราคา
4. ป้องกันการซื้ออาวุธเมื่อ Coins ไม่พอ
5. ให้เลือกซื้อได้เพียง 1 ชิ้น
6. หักราคาออกจาก Coins เมื่อซื้อสำเร็จ
7. บันทึกอาวุธและ damage ที่เลือก
8. ให้ผู้เล่นยืนยันเพื่อไป Boss Fight

| อาวุธ | ราคา | Damage ต่อคลิก |
|---|---:|---:|
| p Niti | 150 | 50 |
| react/tailwind | 120 | 40 |
| MongoDB/Supabase | 90 | 20 |
| HTML/CSS | 60 | 10 |

### Phase 5: Boss Fight

1. ตั้ง Boss HP เป็น 2,000
2. ใช้ Player HP ที่เหลือจาก Survival
3. ใช้ damage จากอาวุธที่ซื้อ
4. ผู้เล่นคลิกโจมตีเพื่อลด Boss HP
5. บอสโจมตีผู้เล่นอัตโนมัติตาม phase
6. ตรวจสอบ phase หลัง Boss HP เปลี่ยน
7. หยุดการโจมตีทั้งหมดเมื่อมีผลลัพธ์
8. ส่งข้อมูลไป Result Screen

แม้ Boss HP จะเริ่มที่ 2,000 ให้ใช้ attack pattern ของ Phase 1 ตั้งแต่เริ่มการต่อสู้

| Phase | ช่วง Boss HP | Damage | รอบโจมตี |
|---|---:|---:|---:|
| Phase 1 | 1,000 ถึง 2,000 | 5 | ทุก 1 วินาที |
| Phase 2 | 500 ถึง 999 | 10 | ทุก 1 วินาที |
| Phase 3 | 0 ถึง 499 | 10 | ทุก 0.5 วินาที |

### Phase 6: Result

1. แสดง Win หรือ Lose
2. แสดงตัวละครที่เลือก
3. แสดงอาวุธที่ใช้
4. แสดง Player HP ที่เหลือ
5. แสดง Boss HP ที่เหลือ
6. แสดง Coins ที่เก็บได้หรือเหลืออยู่
7. แสดงข้อความสรุปผล
8. มีปุ่มเริ่มเกมใหม่
9. การเริ่มใหม่ต้อง reset session ทั้งหมด

## 5. กติกาเกม

### Player

- Player HP เริ่มต้น 1,000
- Player HP ลดลง 300 เมื่อชน obstacle
- Player HP ลดลงตามการโจมตีของบอส
- Player HP ต้องไม่แสดงค่าติดลบ

### Coin

- Passive Coin: 1 แต้มต่อ 1 วินาที สูงสุด 60 แต้ม
- Big Coin: 10 แต้มต่อครั้ง สูงสุด 10 ครั้ง
- Coins รวมสูงสุด 160 แต้ม
- Big Coin ที่เก็บแล้วห้ามเก็บซ้ำ
- เมื่อจบด่านต้องหยุดการเพิ่ม Coins

### Boss

- Boss HP เริ่มต้น 2,000
- Phase 1: damage 5 ทุก 1 วินาที
- Phase 2: damage 10 ทุก 1 วินาที
- Phase 3: damage 10 ทุก 0.5 วินาที หรือประมาณ 20 HP ต่อวินาที
- Boss HP ต้องไม่แสดงค่าติดลบ

### ผลแพ้ชนะ

| สถานการณ์ | ผลลัพธ์ |
|---|---|
| Boss HP หมด และ Player HP มากกว่า 0 | Player Win |
| Player HP หมด และ Boss HP มากกว่า 0 | Player Lose |
| Player HP และ Boss HP หมดพร้อมกัน | Player Lose |
| Player HP หมดระหว่าง Survival | Game Over และ Player Lose |

## 6. State Contract ของ App.jsx

คนที่ 1 และคนที่ 3 ดูแล `src/App.jsx` ร่วมกัน โดยคนที่ 1 เป็นผู้กำหนด state contract และโครงสร้างข้อมูล ส่วนคนที่ 3 เป็นผู้เชื่อม Feature และควบคุม integration flow

ข้อมูลที่ต้องบริหาร:

- `gamePhase`: หน้าปัจจุบัน เช่น START, CHARACTER_SELECT, SURVIVAL, SHOP, BOSS, RESULT
- `result`: ผลลัพธ์ WIN หรือ LOSE
- `playerHp`: HP ปัจจุบันของผู้เล่น
- `bossHp`: HP ปัจจุบันของบอส
- `timeLeft`: เวลาที่เหลือใน Survival
- `coins`: Coins ปัจจุบัน
- `bigCoinsCollected`: จำนวน Big Coin ที่เก็บแล้ว
- `selectedCharacter`: ตัวละครที่ผู้เล่นเลือก
- `selectedWeapon`: อาวุธที่ผู้เล่นซื้อ
- `weaponDamage`: damage ของอาวุธ
- `bossPhase`: phase ปัจจุบันของบอส

### การส่งข้อมูลระหว่าง Feature

- Start Screen ส่ง event เริ่มเกมไป App
- Character Select ส่งตัวละครที่เลือกไป App
- App ส่งค่าเริ่มต้นไป Flappy Minigame
- Flappy Minigame ส่ง HP และ Coins กลับ App เมื่อจบด่าน
- Weapon Shop รับ Coins และส่งอาวุธที่ซื้อกลับ App
- Boss Fight รับ Player HP, Boss HP และ weapon damage จาก App
- Boss Fight ส่งผลลัพธ์กลับ App
- Result Screen รับข้อมูลสรุปจาก App และส่ง event เริ่มเกมใหม่กลับ App

### กฎของ App Integration

- App เป็นเจ้าของข้อมูลที่ใช้มากกว่าหนึ่ง Feature
- Component ลูกไม่ควรแก้ state กลางโดยตรง
- การเปลี่ยน phase ต้องเกิดจาก event ที่ App ควบคุม
- App ต้องป้องกัน event ของ phase ก่อนหน้าทำงานหลังเปลี่ยนหน้า
- เมื่อจบเกมต้องหยุด timer, interval, timeout และ event listener ทั้งหมด

## 7. ลำดับการพัฒนา

### ขั้นที่ 1: เตรียมข้อมูลกลาง

ผู้รับผิดชอบ: คนที่ 1 ร่วมกับคนที่ 3

- สรุปค่าคงที่ของเกมให้ตรงกับเอกสาร
- เตรียมข้อมูลตัวละครใน `src/mock-data/characters.js`
- เตรียมข้อมูลวายร้ายใน `src/mock-data/villian.js`
- เตรียม `src/mock-data/weapons.js`
- กำหนดชื่อ field ที่ทุก Feature จะใช้ร่วมกัน
- ตรวจสอบ path ของ asset ที่จะนำมาใช้
- วาง state contract และโครงสร้างข้อมูลที่ `src/App.jsx` ต้องใช้ร่วมกับคนที่ 3

### ขั้นที่ 2: วาง App State และ Game Flow

ผู้รับผิดชอบ: คนที่ 1 และคนที่ 3

- เปลี่ยน Vite starter ใน `src/App.jsx` เป็นตัวควบคุมเกม
- กำหนด game phase ทั้งหมด
- คนที่ 1 กำหนด state contract และคนที่ 3 นำไปเชื่อมกับ event/callback จริง
- กำหนด initial state และ reset state
- เชื่อม callback ของทุก component
- ควบคุมการเปลี่ยน phase ตั้งแต่ Start ถึง Result
- ทำให้ event จากหน้าปัจจุบันเท่านั้นที่มีผล

### ขั้นที่ 3: ทำ Start และ Character Select

ผู้รับผิดชอบ: คนที่ 2

- สร้าง `StartScreen.jsx`
- สร้าง `CharacterSelect.jsx`
- แสดงตัวละครจาก mock-data
- ทำ selected state ของตัวละคร
- ส่งตัวละครที่เลือกกลับไป App
- ตรวจสอบว่าเริ่ม Survival ด้วยค่าตั้งต้นถูกต้อง

### ขั้นที่ 4: ทำ Flappy Survival และ Coin System

ผู้รับผิดชอบ: คนที่ 3

- สร้าง `FlappyMinigame.jsx`
- สร้าง `useGameTimer.js`
- สร้าง `useCoinSystem.js`
- ทำระบบกระโดดและการเคลื่อนที่
- ทำ obstacle และ collision state
- ทำ damage cooldown เพื่อป้องกันการหัก HP ซ้ำ
- ทำ Passive Coin และ Big Coin hard cap
- ส่งสถานะจบด่านกลับ App
- เชื่อมผลลัพธ์เข้าร้านค้าและหน้าผู้เล่นแพ้

### ขั้นที่ 5: ทำ Weapon Shop และ Boss Fight

ผู้รับผิดชอบ: คนที่ 4

- สร้าง `WeaponShop.jsx`
- สร้าง `BossFight.jsx`
- สร้าง `useBossPhase.js`
- แสดงอาวุธและสถานะ Coins
- ป้องกันการซื้อซ้ำและ Coins ติดลบ
- ทำการโจมตีของผู้เล่น
- ทำ Boss Phase และ auto attack
- ตรวจสอบ Win, Lose และ both HP zero
- ส่งผลลัพธ์กลับ App

### ขั้นที่ 6: ทำ Result Screen และ Shared UI

ผู้รับผิดชอบ: คนที่ 5

- สร้าง `ResultScreen.jsx`
- สร้าง `HealthBar.jsx`
- สร้าง `CoinDisplay.jsx`
- สร้าง `Timer.jsx`
- ทำ component ให้รับ props และใช้ซ้ำได้
- แสดงข้อมูลสรุปจาก App
- ทำปุ่มเริ่มเกมใหม่
- รองรับ Win, Lose และ Survival Game Over

### ขั้นที่ 7: รวมงานและปรับ UI

ผู้รับผิดชอบหลัก: คนที่ 3 ร่วมกับสมาชิกทุกคน

- รวมทุก component เข้า `src/App.jsx`
- ตรวจ import path
- ตรวจชื่อ field ระหว่าง component
- ตรวจการทำงานของ timer และ side effects
- ปรับ `src/App.css` และ `src/index.css`
- ตรวจ responsive layout
- ลบหรือแทนที่ asset จาก Vite starter เมื่อมี asset เกมจริง

## 8. การแบ่งหน้าที่สมาชิก

| คน | Feature | ไฟล์หลัก | ผลลัพธ์ที่ต้องส่งมอบ |
|---|---|---|---|
| 1 | Game Rules, Data Contract, Context และ App Structure | `src/App.jsx`, `src/mock-data/`, `src/context/` | mock-data, state contract, ค่ากติกากลาง และโครงสร้าง App ที่ทำร่วมกับคนที่ 3 |
| 2 | Start Screen และ Character Select | `src/components/StartScreen.jsx`, `src/components/CharacterSelect.jsx` | หน้าจอเริ่มเกม เลือกตัวละคร และ callback ส่งข้อมูลกลับ App |
| 3 | Flappy Survival, Coin System และ App Integration | `src/components/FlappyMinigame.jsx`, `src/hooks/`, `src/App.jsx` | มินิเกม ระบบเหรียญ timer และการเชื่อมทุก Feature ผ่าน App.jsx ร่วมกับคนที่ 1 |
| 4 | Weapon Shop, Boss Fight และ Gameplay Assets | `src/components/WeaponShop.jsx`, `src/components/BossFight.jsx`, `src/hooks/useBossPhase.js`, `src/assets/villains/`, `src/assets/weapons/`, `src/assets/obstacles/` | ร้านค้า การต่อสู้บอส ผลแพ้ชนะ และ asset ของบอส อาวุธ และ obstacle |
| 5 | Result Screen, Shared UI และ Asset Support | `src/components/ResultScreen.jsx`, `src/components/ui/`, `src/App.css`, `src/index.css`, `src/assets/ui/` | หน้าผลลัพธ์ component กลาง responsive styling และช่วยเตรียม/ตรวจสอบ asset ร่วมกับคนที่ 4 |

### หน้าที่ร่วมของคนที่ 1 และคนที่ 3: App Integration

คนที่ 1 และคนที่ 3 รับผิดชอบ `src/App.jsx` ร่วมกัน โดยแบ่งงานเป็น state/data contract กับการเชื่อม integration จริง

- คนที่ 1 วาง state contract, initial state, reset state และโครงสร้างข้อมูลของ `src/App.jsx`
- คนที่ 3 เชื่อม phase, event, callback และการส่งข้อมูลระหว่างทุก Feature
- กำหนดและดูแล game phase
- รับข้อมูลจากทุก Feature และส่งต่อให้ Feature ถัดไป
- เชื่อม Start Screen กับ Character Select
- เชื่อม Character Select กับ Flappy Survival
- เชื่อม Flappy Survival กับ Weapon Shop
- เชื่อม Weapon Shop กับ Boss Fight
- เชื่อม Boss Fight กับ Result Screen
- รวม state ของผู้เล่น บอส Coins เวลา ตัวละคร และอาวุธ
- ตรวจสอบ reset state เมื่อเริ่มเกมใหม่
- ตรวจสอบ cleanup ของ timer และ side effects
- ตรวจสอบ integration flow ตั้งแต่ Start ถึง Result
- ช่วยแก้ปัญหาที่เกิดจาก props, callback หรือ data contract ระหว่างสมาชิก

## 9. ข้อตกลงการส่งต่องาน

- ทุกคนทำงานตาม Feature และไฟล์หลักที่กำหนด
- ห้ามเปลี่ยนชื่อ state หรือ data field ที่ใช้ร่วมกันโดยไม่แจ้งทีม
- Component ต้องรับข้อมูลผ่าน props หรือวิธี shared state ที่ทีมตกลงกัน
- Component ไม่ควรแก้ state ของ App โดยตรง
- งานของแต่ละคนต้องระบุไฟล์ที่แก้ไขให้ชัดเจน
- ก่อน merge ต้องทดสอบ Feature ของตัวเอง
- หลัง merge คนที่ 3 ต้องทดสอบ flow รวมทั้งเกม
- หากเพิ่มไฟล์ใหม่ ต้องอัปเดต README หรือ ProjectPlan ตามความจำเป็น
- ห้ามใส่ค่ากติกาซ้ำหลายจุด หากเป็นค่าเดียวกันควรอ้างอิงจากข้อมูลกลาง

## 10. Edge Cases ที่ต้องรองรับ

- Player HP ต้องไม่ต่ำกว่า 0 ในการแสดงผล
- Boss HP ต้องไม่ต่ำกว่า 0 ในการแสดงผล
- กดซื้ออาวุธเมื่อ Coins ไม่พอต้องไม่มีผล
- ซื้ออาวุธได้เพียงครั้งเดียว
- กดเก็บ Big Coin ซ้ำต้องไม่ได้ Coins เพิ่ม
- Big Coin ต้องไม่เพิ่มเกิน 10 ครั้ง
- Timer ต้องไม่ลดหลัง Survival จบ
- Passive Coin ต้องไม่เพิ่มหลัง Survival จบ
- บอสต้องไม่โจมตีหลัง Boss Fight จบ
- ผู้เล่นต้องไม่โจมตีบอสหลัง Result แสดงแล้ว
- ถ้า Player HP และ Boss HP หมดจากเหตุการณ์เดียวกัน ผู้เล่นแพ้
- ถ้า timer ครบพร้อมกับการชน ต้องมีลำดับการตัดสินที่ชัดเจนและไม่ทำให้เกมค้าง
- เริ่มเกมใหม่ต้องล้าง selected weapon และผลลัพธ์จากรอบเดิม
- Asset ที่หาไม่พบต้องไม่ทำให้หน้าจอพัง
- หน้าจอแคบต้องไม่ทำให้ปุ่มหรือข้อมูล HP/Coins ล้นออกนอกพื้นที่

## 11. Acceptance Criteria ราย Feature

### Game Flow และ App Integration

- เปลี่ยน phase ได้ครบทุกหน้าจอ
- state จากแต่ละ Feature ส่งต่อไป Feature ถัดไปได้
- reset เกมได้จาก Result
- side effects ของ phase เก่าถูกหยุด

### Start Screen และ Character Select

- กด START แล้วเข้าสู่ Character Select
- แสดงตัวละครจาก mock-data
- เลือกตัวละครได้ 1 ตัว
- เริ่มเกมด้วย Player HP 1,000, Coins 0 และเวลา 60 วินาที

### Flappy Survival และ Coin System

- ควบคุมการกระโดดได้
- ชนแล้วลด HP 300
- Timer ลดตามเวลา
- Passive Coin เพิ่มตามกติกา
- Big Coin กดเก็บได้และไม่เกิน 10 ครั้ง
- HP หมดแล้วจบเกม
- รอดครบเวลาแล้วไป Shop

### Weapon Shop และ Boss Fight

- แสดงอาวุธครบ 4 ชนิด
- ตรวจ Coins ก่อนซื้อ
- ซื้อได้เพียง 1 ชิ้น
- damage ตรงกับอาวุธ
- Boss HP เริ่ม 2,000
- Boss Phase เปลี่ยนถูกช่วง
- Auto attack เปลี่ยน interval ตาม phase
- Win, Lose และ both HP zero ถูกตัดสินถูกต้อง

### Result Screen และ Shared UI

- แสดงผล Win หรือ Lose ชัดเจน
- แสดง Player HP, Boss HP, Coins, ตัวละคร และอาวุธ
- HealthBar ใช้กับผู้เล่นและบอสได้
- CoinDisplay แสดง Coins ได้ถูกต้อง
- Timer แสดงเวลาตามค่าที่รับจาก App
- เริ่มเกมใหม่ได้
- layout รองรับ desktop และ mobile

## 12. การตรวจสอบงาน

คำสั่งที่มีอยู่ใน `package.json`:

- `npm run dev`: เปิด development server
- `npm run lint`: ตรวจ JavaScript และ JSX ด้วย ESLint
- `npm run build`: ตรวจ production build
- `npm run preview`: เปิดดู production build

Manual test flow:

1. เปิดหน้า Start
2. กด START
3. เลือกตัวละคร
4. ตรวจ Player HP 1,000, Coins 0 และเวลา 60 วินาที
5. ทดสอบกระโดดและชน obstacle
6. ทดสอบ Passive Coin และ Big Coin
7. ทดสอบ HP หมดก่อนเวลา
8. เริ่มใหม่และทดสอบรอดครบเวลา
9. ทดสอบซื้ออาวุธเมื่อ Coins พอและไม่พอ
10. ทดสอบซื้อซ้ำ
11. ทดสอบโจมตีบอสและ Boss Phase
12. ทดสอบ Player Win
13. เริ่มใหม่และทดสอบ Player Lose
14. ทดสอบกรณี HP หมดพร้อมกัน
15. ตรวจ Result และปุ่มเริ่มเกมใหม่
16. ตรวจ desktop และ mobile layout

## 13. Definition of Done

โปรเจกต์ถือว่าพร้อมส่งเมื่อ:

- Feature ทั้ง 5 ส่วนถูกพัฒนาและเชื่อมกัน
- Game Flow ทำงานตั้งแต่ Start ถึง Result
- กติกา HP, Timer, Coins, Shop และ Boss ตรงตามเอกสาร
- ไม่มี timer หรือ interval ค้างหลังเปลี่ยน phase
- ไม่มี error จาก `npm run lint`
- `npm run build` สำเร็จ
- ทดสอบ Win, Lose, Game Over และ both HP zero แล้ว
- ตรวจ asset path และ fallback แล้ว
- UI ใช้งานได้บน desktop และ mobile
- README, ProjectPlan และเอกสารแบ่งงานไม่ขัดแย้งกัน
