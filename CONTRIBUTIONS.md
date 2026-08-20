# Contributions Summary

สรุป ownership และสถานะปัจจุบันหลัง integration รายละเอียดอยู่ใน `contributor.md`

| # | GitHub | Feature | พื้นที่หลัก | ผลงานปัจจุบัน | สถานะ |
|---:|---|---|---|---|---|
| 1 | `@inatbalthazr` | Rules, Data Contract, Context, App Structure | `constants/`, `context/`, `mock-data/`, `App.jsx` | Phase contract, shared state/actions, reset flow, character/weapon/boss shape | Integrated |
| 2 | `@rin` | Start, Character Select, Character Assets | `StartScreen.jsx`, `CharacterSelect.jsx`, `assets/characters/` | Start UI, single select, responsive character grid, descriptions และ sprites | Integrated |
| 3 | `@ctrlaltnate` | Flappy, Coins, Audio, Integration | `FlappyMinigame.jsx`, `hooks/`, `App.jsx` | Physics/input/collision, timer, coin logic, sounds และ full phase wiring | Integrated |
| 4 | `@kyden` | Shop, Boss, Gameplay Assets | `WeaponShop.jsx`, `BossFight.jsx`, `useBossPhase.js`, villain/weapon/obstacle assets | Selectable shop, projectiles, concurrent boss attack, phases และ gameplay sprites | Integrated |
| 5 | `@delta` | Result, Shared UI, Styling, Asset Support | `ResultScreen.jsx`, `components/ui/`, CSS, `assets/ui/` | 8-bit Result, HealthBar, Coins, Timer, responsive blue visual system | Integrated |

## Shared Work

- สมาชิก 1 + 3: `App.jsx`, Context และ data contract
- สมาชิก 3 + 4 + 5: gameplay integration, sounds และ asset presentation
- สมาชิก 1 + 2 + 3: character data-to-sprite mapping
- ทุกคน: lint, build และ manual full-flow test

## Acceptance Snapshot

- [x] START → SELECT → SURVIVAL → SHOP → BOSS → RESULT
- [x] Context state และ clean restart
- [x] Pointer/touch/keyboard Flappy controls
- [x] Timer 60 วินาที, Coins cap 260
- [x] Single-select Shop + locked state + fists
- [x] Concurrent Boss/player attacks และ 4 attack stages
- [x] Neeti helper, multi-projectile และ dedicated sound
- [x] 8-bit Result พร้อม final Character/Weapon/Coins/HP
- [x] Responsive shared UI
- [x] Lint และ production build เป็นเกณฑ์ก่อน merge
