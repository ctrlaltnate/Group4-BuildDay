# การแบ่งหน้าที่ตาม Feature

เอกสารนี้กำหนดหน้าที่ของสมาชิกแต่ละคนตาม Feature ที่ต้องพัฒนา โดยระบุไฟล์หลัก ขอบเขตงาน ลำดับการทำงาน ผลส่งมอบ และเงื่อนไขตรวจรับ เพื่อให้สมาชิกสามารถสร้าง branch และทำงานแยกกันได้โดยไม่ทับซ้อนกัน
## ภาพรวมการแบ่งงาน

| ลำดับ | GitHub username | Feature | ไฟล์หลัก |
|---|---|---|---|
| 1 | @inatbalthazr | Game Rules, Data Contract, Context และ App Structure | `src/App.jsx`, `src/mock-data/`, `src/context/` |
| 2 | @rin | Start Screen และ Character Select | `src/components/StartScreen.jsx`, `src/components/CharacterSelect.jsx` |
| 3 | @ctrlaltnate | Flappy Survival, Coin System และ App Integration | `src/components/FlappyMinigame.jsx`, `src/hooks/`, `src/App.jsx` |
| 4 | @kyden | Weapon Shop, Boss Fight และ Gameplay Assets | `src/components/WeaponShop.jsx`, `src/components/BossFight.jsx`, `src/hooks/useBossPhase.js`, `src/assets/villains/`, `src/assets/weapons/`, `src/assets/obstacles/` |
| 5 | @delta | Result Screen, Shared UI และ Asset Support | `src/components/ResultScreen.jsx`, `src/components/ui/`, `src/App.css`, `src/index.css`, `src/assets/ui/` |

## กติกาการทำงานร่วมกัน

- สมาชิกทำงานเฉพาะ Feature และไฟล์หลักของตัวเองก่อน
- อ่าน `README.md` และ `ProjectPlan.md` ก่อนเริ่มพัฒนา
- ใช้ชื่อ state, props และ data field ตามข้อตกลงกลาง
- หากต้องแก้ไฟล์ของสมาชิกคนอื่น ให้แจ้งเจ้าของ Feature ก่อน
- ห้ามเขียน state ซ้ำในหลาย component หาก state นั้นถูกใช้ข้ามหน้า
- ทุก Feature ต้องส่ง callback กลับไปยัง `App.jsx` แทนการเปลี่ยน phase เอง
- ก่อนเปิด Pull Request ต้องทดสอบ Feature ของตัวเองและตรวจ `npm run lint`
- หลัง merge คนที่ 3 เป็นผู้ตรวจ flow รวมตั้งแต่ Start ถึง Result

## สมาชิกคนที่ 1: Game Rules, Data Contract, Context และ App Structure

**ผู้รับผิดชอบ:** `@inatbalthazr`

**ไฟล์หลัก:**

- `src/mock-data/characters.js`
- `src/mock-data/villian.js`
- `src/mock-data/weapons.js`
- `src/context/MessageContext.jsx`
- `src/context/MessageProvider.jsx`
- `src/App.jsx` (ร่วมกับคนที่ 3)

### หน้าที่หลัก

- จัดทำข้อมูลตัวละครให้ component อื่นเรียกใช้ได้
- จัดทำข้อมูลบอสและรายละเอียด Boss Phase
- จัดทำข้อมูลอาวุธ ราคา และ damage ให้ตรงกับกติกา
- กำหนดชื่อ field และรูปแบบข้อมูลกลางให้ทุก Feature ใช้เหมือนกัน
- ตรวจสอบค่า HP, damage, price, interval และช่วง phase ไม่ให้ขัดกับ README
- ตัดสินใจว่า Message Context จำเป็นต่อเกมหรือไม่
- หากใช้ context ให้กำหนดรูปแบบข้อความ เช่น hit, purchase error, game over และ success
- ตรวจสอบ path ของ asset ที่อยู่ใน mock-data

### หน้าที่ร่วมกับคนที่ 3 ใน `src/App.jsx`

- กำหนด state contract และชื่อ state กลางของเกม
- กำหนดโครงสร้าง phase และข้อมูลที่แต่ละ Feature ต้องรับหรือส่ง
- ตรวจสอบ initial state, reset state และค่าคงที่ให้ตรงกับกติกา
- ร่วม review การเปลี่ยน phase และ callback ก่อนรวม branch
- ให้คำแนะนำด้าน data flow โดยไม่สร้าง state ซ้ำใน component ลูก

### ข้อมูลที่ต้องเตรียม

**ตัวละคร**

- `id`
- `name`
- `description`
- `ability` หรือข้อมูลเสริมถ้ามี
- path ของ `idle`, `flap`, `hit`, `win` และ `lose`

**บอส**

- `id`
- `name`
- `maxHp: 2000`
- path ของ `idle`, `attack`, `hit` และ `defeat`
- phase 1: damage 5 ทุก 1 วินาที
- phase 2: damage 10 ทุก 1 วินาที
- phase 3: damage 10 ทุก 0.5 วินาที

**อาวุธ**

- `id`
- `name`
- `price`
- `damage`
- `icon` หรือ path ภาพ
- คำอธิบายที่แสดงในร้านค้า

### ผลส่งมอบ

- mock-data ที่มีโครงสร้างเดียวกันและไม่มีค่าซ้ำที่ขัดแย้งกัน
- data contract ที่สมาชิกทุกคนใช้เชื่อม props และ state
- context ที่ใช้งานได้จริง หรือข้อสรุปชัดเจนว่าไม่จำเป็นต้องใช้
- รายการ asset path ที่ component อื่นนำไปใช้ได้

### เงื่อนไขตรวจรับ

- ข้อมูลถูก import ได้โดยไม่มี error
- ราคาและ damage ของอาวุธครบ 4 ชนิด
- Boss Phase มีช่วง HP และ interval ครบ
- ไม่มีการเปลี่ยนชื่อ field หลังสมาชิกคนอื่นเริ่มเชื่อม component โดยไม่แจ้งทีม

## สมาชิกคนที่ 2: Start Screen และ Character Select

**ผู้รับผิดชอบ:** `@rin`

**ไฟล์หลัก:**

- `src/components/StartScreen.jsx`
- `src/components/CharacterSelect.jsx`
- `src/assets/characters/`

### หน้าที่หลัก

- สร้างหน้าเริ่มเกมที่แสดงชื่อเกมและปุ่ม START
- รับ `onStart` จาก App และเรียกใช้เมื่อผู้เล่นเริ่มเกม
- สร้างหน้าเลือกตัวละครจาก `characters.js`
- แสดงรายการตัวละคร ชื่อ คำอธิบาย และภาพประกอบ
- แสดงสถานะตัวละครที่ถูกเลือกอย่างชัดเจน
- ป้องกันการกดเริ่มต่อเมื่อยังไม่ได้เลือกตัวละคร
- ส่งตัวละครที่เลือกกลับไปยัง App ผ่าน callback
- แสดงภาพให้เหมาะกับสถานะเริ่มต้นหรือ animation ที่ data รองรับ
- รองรับการแสดงผลบน desktop และ mobile

### ลำดับการทำงาน

1. ผู้เล่นกด START
2. App เปลี่ยน phase เป็น Character Select
3. Component โหลดข้อมูลตัวละคร
4. ผู้เล่นเลือกตัวละครหนึ่งตัว
5. Component แสดง selected state
6. ผู้เล่นกดยืนยัน
7. ส่งตัวละครที่เลือกและ callback กลับ App
8. App reset ค่ารอบใหม่และเปลี่ยนไป Survival

### ผลส่งมอบ

- Start Screen ที่เรียก `onStart` ได้
- Character Select ที่เลือกตัวละครได้หนึ่งตัว
- callback สำหรับส่ง selected character กลับ App
- character asset หรือ fallback เมื่อยังไม่มีภาพจริง

### เงื่อนไขตรวจรับ

- START ไปหน้าเลือกตัวละครได้
- เลือกตัวละครแล้วเห็นสถานะ selected
- ไม่สามารถยืนยันโดยไม่เลือกตัวละคร
- ข้อมูลที่ส่งกลับมีตัวละครครบตาม data contract
- ไม่มีการสร้าง game state ซ้ำใน component

## สมาชิกคนที่ 3: Flappy Survival, Coin System และ App Integration ร่วมกับคนที่ 1

**ผู้รับผิดชอบ:** `@ctrlaltnate`

**ไฟล์หลัก:**

- `src/components/FlappyMinigame.jsx`
- `src/hooks/useGameTimer.js`
- `src/hooks/useCoinSystem.js`
- `src/App.jsx`

`src/App.jsx` เป็นไฟล์ที่คนที่ 1 และคนที่ 3 ดูแลร่วมกัน โดยคนที่ 1 รับผิดชอบโครงสร้าง state และ data contract ส่วนคนที่ 3 รับผิดชอบการเชื่อม event, callback และ flow ที่เกิดขึ้นจริงระหว่างหน้าจอ

### หน้าที่หลักของ Flappy Survival

- สร้างพื้นที่เล่นมินิเกมแบบ Flappy Bird
- ทำ event กระโดดจากการคลิกหรือการกดปุ่ม
- จัดการตำแหน่งและการเคลื่อนที่ของตัวละคร
- สร้างหรือแสดงสิ่งกีดขวาง
- ตรวจจับการชนและลด Player HP ครั้งละ 300
- ป้องกันการลด HP ซ้ำจาก collision เดียวกันด้วย cooldown หรือสถานะ collision
- แสดง Player HP และเวลาที่เหลือ
- ส่งสถานะจบด่านกลับ App

### หน้าที่ของ Coin System

- ทำ Passive Coin เพิ่ม 1 แต้มทุก 1 วินาที
- ทำ Big Coin ที่ปรากฏทุก 5 วินาที
- ให้ผู้เล่นคลิก Big Coin เพื่อรับ 10 แต้ม
- จำกัด Big Coin สูงสุด 10 ครั้ง หรือ 100 แต้ม
- จำกัด Coins รวมสูงสุด 160 แต้มในด่าน Survival
- ป้องกันการเก็บ Big Coin ซ้ำ
- หยุด timer และ coin interval เมื่อ phase เปลี่ยนหรือเกมจบ

### หน้าที่ร่วม: Integration Owner ของทั้งโปรเจกต์

คนที่ 1 และคนที่ 3 ดูแล `src/App.jsx` ร่วมกัน โดยคนที่ 1 รับผิดชอบ state contract และโครงสร้าง App ส่วนคนที่ 3 รับผิดชอบการเชื่อม event, callback และ flow จริงระหว่างทุก Feature

- กำหนด phase กลาง: START, CHARACTER_SELECT, SURVIVAL, SHOP, BOSS และ RESULT
- เก็บ state ที่ใช้ข้ามหน้า เช่น HP, Coins, character, weapon และ result
- เชื่อม Start Screen กับ Character Select
- เชื่อม Character Select กับ Flappy Survival
- เชื่อม Flappy Survival กับ Weapon Shop
- เชื่อม Weapon Shop กับ Boss Fight
- เชื่อม Boss Fight กับ Result Screen
- รับ callback จาก component ลูกและเป็นผู้เปลี่ยน phase
- ส่ง props ที่จำเป็นให้ component แต่ละ Feature
- reset state ทั้งหมดเมื่อเริ่มเกมใหม่
- ตรวจสอบลำดับตัดสินเมื่อ HP หมดพร้อมกัน
- ป้องกัน event จาก phase ก่อนหน้าทำงานหลังเปลี่ยนหน้า
- ตรวจสอบ cleanup ของ timer, interval, timeout และ event listener
- เป็นผู้รวม branch ของสมาชิกและทดสอบ integration flow
- ทำงานร่วมกับคนที่ 1 ในการกำหนดและ review state contract ของ `App.jsx`
- ไม่เปลี่ยนชื่อ field หรือ phase ที่คนที่ 1 กำหนดโดยไม่แจ้งทีม

### ผลส่งมอบ

- Flappy Survival ที่เล่นและจบด่านได้
- timer และ coin hooks ที่หยุดทำงานได้ถูก phase
- `App.jsx` ที่เชื่อมเกมครบทุกหน้าจอ
- state flow ที่ส่งข้อมูลจาก Survival ไป Shop ไป Boss และ Result
- reset flow ที่เริ่มเกมใหม่ได้สะอาด

### เงื่อนไขตรวจรับ

- เริ่มเกมแล้ว Survival ทำงานด้วย HP 1,000 และเวลา 60 วินาที
- ชน obstacle แล้วลด HP 300
- HP หมดแล้วไป Result แบบ Lose
- รอดครบเวลาแล้วไป Shop
- ทุก Feature เปลี่ยนผ่าน App ไม่เปลี่ยน phase เอง
- ไม่มี side effect จาก phase เก่าค้างอยู่

## สมาชิกคนที่ 4: Weapon Shop, Boss Fight และ Gameplay Assets

**ผู้รับผิดชอบ:** `@kyden`

**ไฟล์หลัก:**

- `src/components/WeaponShop.jsx`
- `src/components/BossFight.jsx`
- `src/hooks/useBossPhase.js`
- `src/assets/villains/`
- `src/assets/weapons/`
- `src/assets/obstacles/`
- `src/mock-data/weapons.js` สำหรับการเรียกใช้ข้อมูล ไม่แก้โครงสร้างโดยไม่แจ้งคนที่ 1

### หน้าที่ของ Weapon Shop

- แสดงอาวุธครบ 4 ชนิดจาก mock-data
- แสดงชื่อ ราคา damage และ icon
- แสดง Coins ปัจจุบันจาก App
- ปิดหรือแจ้งเตือนอาวุธที่ Coins ไม่พอ
- ตรวจสอบ Coins ก่อนซื้อทุกครั้ง
- ให้ซื้ออาวุธได้เพียง 1 ชิ้น
- หักราคาเมื่อซื้อสำเร็จ
- ส่ง selected weapon และ damage กลับ App
- ป้องกันการซื้อซ้ำหรือการกดปุ่มหลังซื้อแล้ว

### หน้าที่ของ Boss Fight

- เริ่ม Boss HP ที่ 2,000
- รับ Player HP และ weapon damage จาก App
- ทำปุ่มโจมตีบอส
- ลด Boss HP ตาม damage ของอาวุธ
- แสดง HP bar ของผู้เล่นและบอส
- แสดง Boss Phase ปัจจุบัน
- ทำ auto attack ตาม interval ของ phase
- ตรวจสอบ Win, Lose และ both HP zero
- หยุดการโจมตีเมื่อผลลัพธ์ถูกตัดสิน
- ส่ง result กลับ App

### หน้าที่ด้าน Gameplay Assets

- เตรียมภาพหรือไฟล์ประกอบของบอสใน `src/assets/villains/`
- เตรียม icon หรือภาพอาวุธใน `src/assets/weapons/`
- เตรียมภาพสิ่งกีดขวางใน `src/assets/obstacles/`
- ตั้งชื่อไฟล์ให้ตรงกับ id หรือ path ใน mock-data
- ตรวจขนาด อัตราส่วน และรูปแบบไฟล์ให้เหมาะกับ component
- ทำงานร่วมกับคนที่ 5 เพื่อตรวจ visual consistency, fallback และการเชื่อม asset

### ผลส่งมอบ

- Weapon Shop ที่ซื้ออาวุธได้อย่างถูกต้อง
- Boss Fight ที่มี phase และ auto attack ครบ
- ระบบตัดสินผลแพ้ชนะที่ตรงกับกติกา
- ไม่มี Boss HP หรือ Player HP ติดลบ

### เงื่อนไขตรวจรับ

- Coins ไม่พอซื้อไม่ได้
- ซื้อได้เพียงชิ้นเดียว
- Boss เริ่ม HP 2,000
- Phase 1 ใช้ตั้งแต่ HP 2,000 ถึง 1,000
- Phase 2 ใช้ช่วง HP 999 ถึง 500
- Phase 3 ใช้ช่วง HP ต่ำกว่า 500
- HP หมดพร้อมกันถือว่าผู้เล่นแพ้
- บอสหยุดโจมตีหลังจบเกม

## สมาชิกคนที่ 5: Result Screen, Shared UI และ Asset Support

**ผู้รับผิดชอบ:** `@delta`

**ไฟล์หลัก:**

- `src/components/ResultScreen.jsx`
- `src/components/ui/HealthBar.jsx`
- `src/components/ui/CoinDisplay.jsx`
- `src/components/ui/Timer.jsx`
- `src/components/ui/Button.jsx`
- `src/App.css`
- `src/index.css`
- `src/assets/ui/`

### หน้าที่ของ Result Screen

- รับ result data จาก App
- แสดงสถานะ Player Win, Player Lose หรือ Game Over
- แสดงตัวละครที่เลือก
- แสดงอาวุธที่ใช้
- แสดง Player HP และ Boss HP สุดท้าย
- แสดง Coins ที่สะสมหรือเหลืออยู่
- แสดงข้อความสรุปตามผลลัพธ์
- สร้างปุ่มเริ่มเกมใหม่และเรียก callback กลับ App
- ป้องกันการกด action ของเกมหลังเข้าสู่ Result

### หน้าที่ของ Shared UI

- `HealthBar.jsx`: รับ current HP, max HP, label และ variant เพื่อใช้กับผู้เล่นและบอส
- `CoinDisplay.jsx`: รับจำนวน Coins และแสดงใน Survival, Shop และ Result
- `Timer.jsx`: รับเวลาที่เหลือและแสดงรูปแบบที่อ่านง่าย
- `Button.jsx`: ถ้าทีมใช้ ให้รองรับ variant, disabled และ focus state
- ทำ component ให้ไม่มี game state ภายในโดยไม่จำเป็น
- ใช้ props และ callback ให้ component อื่นนำกลับมาใช้ซ้ำได้

### หน้าที่ด้าน Styling

- ปรับ `src/App.css` จาก Vite starter เป็น visual system ของเกม
- ปรับ `src/index.css` สำหรับ global font, color, background และ reset
- ทำ layout ให้ข้อมูลไม่ล้นบน mobile
- กำหนดขนาดที่เสถียรให้ HP bar, timer, coin display และปุ่ม
- ทำ state สำหรับ hover, active, disabled, selected, win และ lose
- ตรวจ contrast และ focus state ของปุ่ม

### หน้าที่ด้าน Asset Support ร่วมกับคนที่ 4

- ช่วยเตรียมและตรวจ asset ของบอส อาวุธ และ obstacle ให้เหมาะกับ UI
- ดูแล asset ฝั่ง presentation เช่น background, coin, effect และภาพประกอบ Result ใน `src/assets/ui/`
- ตรวจสอบ path, ขนาดไฟล์, อัตราส่วน และ fallback ของ asset
- ช่วยจัดชื่อไฟล์และโครงสร้างโฟลเดอร์ให้สอดคล้องกับคนที่ 4
- ตรวจภาพรวม visual consistency ก่อนนำ asset เข้า branch หลัก

### ผลส่งมอบ

- Result Screen ที่แสดงข้อมูลครบทุกกรณี
- Shared UI ที่ใช้ซ้ำได้จริงหลาย Feature
- Styling ที่รองรับ desktop และ mobile
- ไม่มี layout shift หรือข้อมูลทับกัน

### เงื่อนไขตรวจรับ

- Result แสดง Win และ Lose ได้ถูกต้อง
- ปุ่มเริ่มเกมใหม่ reset ผ่าน App ได้
- HealthBar ใช้กับ Player และ Boss ได้
- CoinDisplay แสดงค่าเดียวกับ state กลาง
- Timer แสดงค่าที่ App ส่งมา
- UI อ่านง่ายและไม่ล้นบนหน้าจอแคบ
- asset ฝั่ง UI และ gameplay ที่ทำร่วมกับคนที่ 4 ถูกตรวจสอบและเรียกใช้ได้จริง

## ลำดับการทำงานระหว่างสมาชิก

1. คนที่ 1 กำหนด data contract และ mock-data เบื้องต้น
2. คนที่ 2 และคนที่ 3 เริ่มทำ Character Select และ Survival ตาม contract เดียวกัน
3. คนที่ 4 ทำ Shop, Boss และ gameplay assets โดยใช้ weapon/boss data ของคนที่ 1
4. คนที่ 5 ทำ Result, shared UI และช่วยคนที่ 4 เตรียม/ตรวจสอบ assets
5. คนที่ 3 รวมทุก branch และแก้ integration ใน `src/App.jsx`
6. สมาชิกทุกคนช่วยกันทดสอบ flow รวมและแก้เฉพาะไฟล์ของตัวเองเมื่อทำได้

## สิ่งที่ต้องส่งใน Pull Request

- ระบุ Feature ที่ทำ
- ระบุไฟล์ที่แก้ไข
- อธิบายวิธีทดสอบ
- ระบุ edge case ที่ตรวจแล้ว
- แนบภาพหน้าจอเมื่อแก้ UI
- ตรวจ `npm run lint` ก่อนส่ง
- ห้ามรวมไฟล์ build หรือไฟล์ที่ไม่เกี่ยวข้อง

## Definition of Done รายคน

- งานอยู่ในไฟล์ตาม ownership
- Feature ทำงานตาม acceptance criteria
- ไม่ทำให้ Feature อื่นเสีย
- ใช้ data contract เดียวกับทีม
- ไม่มี timer หรือ event listener ค้าง
- รองรับ error state และ disabled state ที่เกี่ยวข้อง
- ทดสอบบน desktop และ mobile ตามประเภทงาน
- Pull Request มีรายละเอียดครบและพร้อมให้สมาชิกอื่น review
