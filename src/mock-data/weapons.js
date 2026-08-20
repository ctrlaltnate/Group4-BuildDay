export const weapons = [
  {
    id: 'neeti-oni-san',
    name: 'Neeti-oni-san',
    price: 150,
    damage: 50,
    description: 'Legendary weapon of Sensei Neeti. Maximum power with 50 damage per click!',
    img: '/src/assets/weapons/weapon.png'
  },
  {
    id: 'react-tailwind',
    name: 'React/Tailwind',
    price: 120,
    damage: 40,
    description: 'React + Tailwind magic! 40 damange per click!',
    img: '/src/assets/weapons/weapon.png'
  },
  {
    id: 'mongo-supabase',
    name: 'MongoDB/Supabase',
    price: 90,
    damage: 20,
    description: 'Cloud Database hammer dealing 20 damage per click!',
    img: '/src/assets/weapons/weapon.png'
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    price: 60,
    damage: 10,
    description: 'Fundamental Web Designer weapon dealing 10 damage per click!',
    img: '/src/assets/weapons/weapon.png'
  }
];

export const defaultWeapon = {
    id: 'fists',
    name: 'Fists (Bare Hands)',
    price: 0,
    damage: 5,
    description: 'Punch the boss bare-handed dealing 5 damage per click!',
    img: '/src/assets/weapons/weapon.png'
};

export const getWeaponById = (id) => {
  if (!id) return null;
  if (id === 'fists') return defaultWeapon;
  return weapons.find(w => w.id === id || w.name === id) || null;
};

export const getAllWeapons = () => weapons;

