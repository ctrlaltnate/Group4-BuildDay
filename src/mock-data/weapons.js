import cssWeapon from '../assets/weapons/css.png';
import htmlWeapon from '../assets/weapons/html.png';
import mongoWeapon from '../assets/weapons/mongo.png';
import reactWeapon from '../assets/weapons/React.png';
import tailwindWeapon from '../assets/weapons/tailwind.png';

export const weapons = [
  {
    id: 'neeti-oni-san',
    name: 'Neeti-oni-san',
    price: 150,
    damage: 50,
    description: 'Legendary weapon of Sensei Neeti. Maximum power with 50 damage per click!',
    img: reactWeapon
  },
  {
    id: 'react-tailwind',
    name: 'React/Tailwind',
    price: 120,
    damage: 40,
    description: 'React + Tailwind magic! 40 damange per click!',
    img: tailwindWeapon
  },
  {
    id: 'mongo-supabase',
    name: 'MongoDB/Supabase',
    price: 90,
    damage: 20,
    description: 'Cloud Database hammer dealing 20 damage per click!',
    img: mongoWeapon
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    price: 60,
    damage: 10,
    description: 'Fundamental Web Designer weapon dealing 10 damage per click!',
    img: cssWeapon
  }
];

export const defaultWeapon = {
    id: 'fists',
    name: 'Fists (Bare Hands)',
    price: 0,
    damage: 5,
    description: 'Punch the boss bare-handed dealing 5 damage per click!',
    img: htmlWeapon
};

export const getWeaponById = (id) => {
  if (!id) return null;
  if (id === 'fists') return defaultWeapon;
  return weapons.find(w => w.id === id || w.name === id) || null;
};

export const getAllWeapons = () => weapons;
