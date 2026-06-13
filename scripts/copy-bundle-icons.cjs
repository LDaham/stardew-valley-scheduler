const fs = require("fs");
const path = require("path");

const map = {
  parsnip: "Parsnip", greenBean: "Green_Bean", cauliflower: "Cauliflower", potato: "Potato",
  tomato: "Tomato", hotPepper: "Hot_Pepper", blueberry: "Blueberry", melon: "Melon",
  corn: "Corn", eggplant: "Eggplant", pumpkin: "Pumpkin", yam: "Yam", grape: "Grape",
  wildHorseradish: "Wild_Horseradish", daffodil: "Daffodil", leek: "Leek", dandelion: "Dandelion",
  spiceBerry: "Spice_Berry", sweetPea: "Sweet_Pea", commonMushroom: "Common_Mushroom",
  wildPlum: "Wild_Plum", hazelnut: "Hazelnut", blackberry: "Blackberry", winterRoot: "Winter_Root",
  crystalFruit: "Crystal_Fruit", snowYam: "Snow_Yam", crocus: "Crocus",
  wood: "Wood", stone: "Stone", hardwood: "Hardwood", coconut: "Coconut", cactusFruit: "Cactus_Fruit",
  caveCarrot: "Cave_Carrot", redMushroom: "Red_Mushroom", purpleMushroom: "Purple_Mushroom",
  mapleSyrup: "Maple_Syrup", oakResin: "Oak_Resin", pineTar: "Pine_Tar", morel: "Morel",
  sunfish: "Sunfish", catfish: "Catfish", shad: "Shad", tigerTrout: "Tiger_Trout",
  largemouthBass: "Largemouth_Bass", carp: "Carp", bullhead: "Bullhead", sturgeon: "Sturgeon",
  sardine: "Sardine", tuna: "Tuna", redSnapper: "Red_Snapper", tilapia: "Tilapia",
  walleye: "Walleye", bream: "Bream", eel: "Eel", lobster: "Lobster", crab: "Crab", shrimp: "Shrimp",
  crayfish: "Crayfish", snail: "Snail", periwinkle: "Periwinkle", mussel: "Mussel", cockle: "Cockle",
  oyster: "Oyster", clam: "Clam", pufferfish: "Pufferfish", ghostfish: "Ghostfish",
  sandfish: "Sandfish", woodskip: "Woodskip",
  // 크롭 재사용(추가 번들)
  poppy: "Poppy", sunflower: "Sunflower", redCabbage: "Red_Cabbage", wheat: "Wheat",
  // 식료품(동물·장인)
  largeMilk: "Large_Milk", largeEgg: "Large_Egg", largeBrownEgg: "Large_Brown_Egg",
  largeGoatMilk: "Large_Goat_Milk", wool: "Wool", duckEgg: "Duck_Egg",
  truffleOil: "Truffle_Oil", cloth: "Cloth", goatCheese: "Goat_Cheese", cheese: "Cheese",
  honey: "Honey", jelly: "Jelly", apple: "Apple", apricot: "Apricot", orange: "Orange",
  peach: "Peach", pomegranate: "Pomegranate", cherry: "Cherry",
  // 보일러실
  copperBar: "Copper_Bar", ironBar: "Iron_Bar", goldBar: "Gold_Bar", quartz: "Quartz",
  earthCrystal: "Earth_Crystal", frozenTear: "Frozen_Tear", fireQuartz: "Fire_Quartz",
  slime: "Slime", batWing: "Bat_Wing", solarEssence: "Solar_Essence", voidEssence: "Void_Essence",
  // 게시판
  fiddleheadFern: "Fiddlehead_Fern", truffle: "Truffle", makiRoll: "Maki_Roll", friedEgg: "Fried_Egg",
  seaUrchin: "Sea_Urchin", duckFeather: "Duck_Feather", aquamarine: "Aquamarine",
  nautilusShell: "Nautilus_Shell", chub: "Chub", frozenGeode: "Frozen_Geode", hay: "Hay",
  wine: "Wine", rabbitsFoot: "Rabbit's_Foot",
};

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.png$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

const pngs = walk("progress", []);
const baseOf = (p) => path.basename(p);
let ok = 0;
const miss = [];
for (const [id, fname] of Object.entries(map)) {
  const exact = pngs.find((p) => baseOf(p) === fname + ".png");
  const pref = pngs.find((p) => /^\d+px-/.test(baseOf(p)) && baseOf(p).replace(/^\d+px-/, "") === fname + ".png");
  const src = exact || pref;
  if (src) {
    fs.copyFileSync(src, path.join("public/icons/bundleItems", id + ".png"));
    ok++;
  } else miss.push(id);
}
console.log("copied:", ok, "missing:", miss.length, miss.join(","));
