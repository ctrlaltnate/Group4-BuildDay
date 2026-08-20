# Contributor Responsibilities and Current Deliverables

เอกสารนี้บันทึก ownership หลังรวมระบบแล้ว เพื่อช่วย review และหลีกเลี่ยงการแก้ contract ชนกัน สถานะ `Integrated` หมายถึง feature ถูกเชื่อมใน `App.jsx` แล้ว ไม่ได้หมายความว่าห้ามปรับปรุงต่อ

## 1. @inatbalthazr — Rules, Data Contract, Context, App Structure

ไฟล์หลัก:

- `src/constants/game.js`
- `src/context/GameContext.jsx`
- `src/context/GameProvider.jsx`
- `src/mock-data/characters.js`
- `src/mock-data/weapons.js`
- `src/mock-data/villian.js`
- `src/App.jsx` ร่วมกับสมาชิก 3

ผลงาน/หน้าที่ปัจจุบัน:

- กำหนด six-phase flow และ initial values: Player 1000, Boss 2000, Timer 60, Coins 0
- ดูแล shared state, actions, max Coins 260 และ reset semantics
- กำหนด character image states (`idle`, `fly`, `win`, `die`) และ weapon schema
- รักษา contract ระหว่าง App, Survival, Shop, Boss และ Result
- Review การเปลี่ยนชื่อ field, phase, initial values และ result shape

จุดตรวจรับ: restart ต้องล้าง session, HP/Coins ไม่ติดลบหรือเกิน cap, component ต้องใช้ contract เดียวกัน

## 2. @rin — Start Screen, Character Select, Character Assets

ไฟล์หลัก:

- `src/components/StartScreen.jsx`
- `src/components/CharacterSelect.jsx`
- `src/assets/characters/`

ผลงาน/หน้าที่ปัจจุบัน:

- Start UI และ callback เข้าสู่ Character Select
- Responsive grid 2/3/5 คอลัมน์ เลือกได้ครั้งละหนึ่งตัว
- Preview ด้วย stand/idle, description panel และ disabled confirm state
- จัดเตรียม/ตรวจ sprite fly, stand/idle, win, lose ของตัวละคร
- ส่ง character object กลับ App โดยไม่เปลี่ยน phase เอง

จุดตรวจรับ: asset path โหลดผ่าน Vite, keyboard/focus ใช้งานได้, description ไม่ล้น, Confirm ต้องส่ง object ที่ครบ

## 3. @ctrlaltnate — Flappy Survival, Coins, Audio, Integration

ไฟล์หลัก:

- `src/components/FlappyMinigame.jsx`
- `src/hooks/useGameTimer.js`
- `src/hooks/useCoinSystem.js`
- `src/hooks/useGame.js`
- `src/hooks/useSoundEffect.js`
- `src/hooks/useBackgroundMusic.js`
- `src/hooks/useGlobalClickSound.js`
- `src/App.jsx` ร่วมกับสมาชิก 1

ผลงาน/หน้าที่ปัจจุบัน:

- Delta-time physics, pointer/touch/keyboard input และ sprite rotation
- Obstacle movement, random gap, asset orientation, hitbox, -300 damage และ 900ms cooldown
- Timer 60 วินาที, Passive +1/second, collectible +20, cap 10 และ total cap 260
- เชื่อม component ทุก phase และส่ง shared data/callback ผ่าน Context
- Audio pools, background music, UI click, coin, hit, result และ integration sounds
- Cleanup animation frame, interval, timeout, listeners และ Audio เมื่อ phase เปลี่ยน

จุดตรวจรับ: input ตอบสนองทันที, timer/coins ไม่ทำงานหลังออก phase, full flow และ restart ทำงานสะอาด

## 4. @kyden — Weapon Shop, Boss Fight, Gameplay Assets

ไฟล์หลัก:

- `src/components/WeaponShop.jsx`
- `src/components/BossFight.jsx`
- `src/hooks/useBossPhase.js`
- `src/assets/villains/`
- `src/assets/weapons/`
- `src/assets/obstacles/`

ผลงาน/หน้าที่ปัจจุบัน:

- Shop cards แบบ whole-card selection, hover, selected/locked state, affordability และ description
- Weapons 50/40/20/10/5 damage พร้อม fists fallback
- Click-on-boss attack, projectile animation และ Boss HealthBar 2000
- Concurrent auto attack 10@700ms, 15@500ms, 20@400ms, 25@250ms
- Boss visual phases, transform effect, `BOOM!`, boss attack sound
- Neeti helper, all-weapon projectile burst และ dedicated sound
- ดูแล villain, weapon และ obstacle sprites รวมถึง orientation/alpha

จุดตรวจรับ: คลิกรัวต้องไม่หยุด auto attack, phase threshold ถูกต้อง, HP clamp, projectiles/เสียง cleanup และ result ถูกส่งกลับ App

## 5. @delta — Result Screen, Shared UI, Styling, Asset Support

ไฟล์หลัก:

- `src/components/ResultScreen.jsx`
- `src/components/ui/HealthBar.jsx`
- `src/components/ui/CoinDisplay.jsx`
- `src/components/ui/Timer.jsx`
- `src/components/ui/Button.jsx`
- `src/index.css`, `src/App.css`
- `src/assets/ui/`

ผลงาน/หน้าที่ปัจจุบัน:

- Result Screen แบบ compact pixel/8-bit แสดง Win/Lose, sprite, Character, Weapon, Coins และ HP
- Reusable pixel-heart HealthBar พร้อม ARIA progressbar
- CoinDisplay, warning Timer และ shared Button variants
- Blue/cyan responsive visual system, pixel font, hard borders/shadows และ projectile keyframe
- ดูแล background, gold/rainbow coin และตรวจ presentation ของ gameplay assets ร่วมกับสมาชิก 4

จุดตรวจรับ: UI ไม่ล้น frame/mobile, contrast/focus/disabled state ชัด, shared component props ตรง contract และ Result restart ผ่าน App

## Integration Sequence

1. สมาชิก 1 กำหนด/เปลี่ยน contract และแจ้ง consumer
2. สมาชิก 2 ส่ง character object ให้ `beginSurvival`
3. สมาชิก 3 ดูแล Survival และ transition ไป Shop
4. สมาชิก 4 รับ Coins/HP/weapon ทำ Shop และ Boss แล้วส่ง result
5. สมาชิก 5 render final shared data และ restart callback
6. สมาชิก 1 + 3 ตรวจ App/Context integration
7. ทุกคนรัน lint/build และ manual flow ก่อน merge

## Pull Request Checklist

- ระบุ feature และไฟล์ที่แก้
- ระบุ data contract หรือ asset path ที่เปลี่ยน
- อธิบายวิธีทดสอบและ edge cases
- แนบภาพเมื่อแก้ UI/asset
- ตรวจ cleanup ของ timer/interval/timeout/listener/audio
- รัน `npm run lint` และ `npm run build`
- ไม่ commit `dist/` หรือไฟล์ที่ไม่เกี่ยวข้อง
