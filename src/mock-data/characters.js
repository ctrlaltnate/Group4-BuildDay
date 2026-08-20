import nateFly from '../assets/characters/nate_fly.png';
import nateIdle from '../assets/characters/nate_stand.png';
import nateWin from '../assets/characters/nate_win.png';
import nateLose from '../assets/characters/nate_lose.png';
import deltaFly from '../assets/characters/DeltaFly.png';
import deltaIdle from '../assets/characters/delta_stand.png';
import deltaWin from '../assets/characters/delta_win.png';
import deltaLose from '../assets/characters/DeltaLose.png';
import rinFly from '../assets/characters/rin_fly.png';
import rinIdle from '../assets/characters/rin_stand.png';
import rinWin from '../assets/characters/rin_win.png';
import rinLose from '../assets/characters/rin_lose.png';
import creamFly from '../assets/characters/cream_fly.png';
import creamIdle from '../assets/characters/cream_stand.png';
import creamWin from '../assets/characters/cream_win.png';
import creamLose from '../assets/characters/cream_lose.png';
import natFly from '../assets/characters/NAT_FLY.png';
import natIdle from '../assets/characters/nat_idle.png';
import natWin from '../assets/characters/nat_win.png';
import natLose from '../assets/characters/nat_defeat.png';

export const characters = [
    {
    id: "01",
    name: "Nate",
    description: "Nate dressed for a beach vacation but somehow arrived at a boss fight. The sunglasses say secret agent; the shirt says he has already asked the villain where the breakfast buffet is.",
    skill: "",
    images: { idle: nateIdle, fly: nateFly, win: nateWin, die: nateLose }
    },

    {
    id: "02",
    name: "Delta",
    description: "Delta in Paris. She loved the Eiffel Tower so much that she bought the pocket-size version from a souvenir shop. Nobody has found the real tower since, but Delta insists that is completely unrelated.",
    skill: "",
    images: { idle: deltaIdle, fly: deltaFly, win: deltaWin, die: deltaLose }
    },

    {
    id: "03",
    name: "Rin",
    description: "Rin entered the battle wearing an apron because she heard the boss was cooked. She has no weapon, only a wooden spoon, one secret recipe, and the confidence of someone who never measures garlic.",
    skill: "",
    images: { idle: rinIdle, fly: rinFly, win: rinWin, die: rinLose }
    },

    {
    id: "04",
    name: "Cream",
    description: "Cream looks like a magical forest fairy, but her only spell is making your snacks disappear when you look away. The wings are real; the apology is not.",
    skill: "",
    images: { idle: creamIdle, fly: creamFly, win: creamWin, die: creamLose }
    },

    {
    id: "05",
    name: "Nat",
    description: "Nat downloaded the entire internet onto a suspicious USB shaped like a chicken. He knows every secret in the universe except his own password, which is written under his keyboard.",
    skill: "",
    images: { idle: natIdle, fly: natFly, win: natWin, die: natLose }
    },


];
