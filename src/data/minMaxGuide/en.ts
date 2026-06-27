// =============================================================================
// LICENSE NOTICE (GPL-3.0)
// The guide content in this file (MIN_MAX_GUIDE / DAILY_GOALS) is a derivative of
// "Stardew Valley Min-Max Routing / Strategy" by BlackSight6 & Zamiel (GPL-3.0).
//   Source: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   License: GNU GPL-3.0 — full text in LICENSES/GPL-3.0.txt.
// Modifications: condensed and restructured into a per-day data tree (GuideNode),
// with proper nouns using the in-game English names.
// Therefore this file follows GPL-3.0, not the project's MIT license.
// (Kept separate from the wiki CC BY-NC-SA material; distributed as a mere aggregation.)
//
// Copyright (C) BlackSight6 & Zamiel (original guide)
// Adaptation (C) 2026 Lee Daham
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. This program is distributed WITHOUT ANY WARRANTY. See the GNU GPL
// for more details: https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Grab the Parsnip Seeds.",
        {
          t: "Immediately chop down 9 trees to reach Foraging level 1.",
          c: [
            { t: "You need 8 and 1/3 trees.", k: "tip" },
            {
              t: "You need level 1 before foraging so you have a chance at silver-quality Spring Onions.",
              k: "reason",
            },
            {
              t: "Focus only on chopping, starting in the direction of the path toward the forest.",
              k: "tip",
              c: [
                {
                  t: "This also clears the weeds along that path, helping you move.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Only chop Maple Trees and Pine Trees, not the egg-shaped Oak Trees.",
              k: "warn",
              c: [
                {
                  t: "Oak Trees won't drop Acorns until Spring 2, and Acorns are precious.",
                  k: "reason",
                },
              ],
            },
            {
              t: "For the same reason, don't touch seeds on the ground with the Axe or Hoe before Spring 2 (they get destroyed).",
              k: "warn",
            },
            {
              t: "Don't chop stumps; chop each tree until it falls (up to 10 hits), then move to the next.",
              k: "tip",
              c: [{ t: "This gives more Wood and Foraging XP.", k: "reason" }],
            },
            {
              t: "When a tree starts to fall, walk to where the Wood will land and immediately pause.",
              k: "tip",
            },
            {
              t: "Game time stops but the falling animation finishes, and the Wood is auto-collected while paused.",
              k: "reason",
            },
            {
              t: "Always use this strategy when chopping trees (not stumps).",
              k: "tip",
            },
            {
              t: "If you lose count of trees, check the Skills tab for the Foraging level-up.",
              k: "tip",
            },
            { t: "It's also useful for fishing tomorrow.", k: "tip" },
          ],
        },
        "Once at Foraging 1, craft a Chest and place it next to your house, then empty your inventory, keeping only the Scythe, Axe, Pickaxe, and Hoe.",
        "Head out to the forest to the south. (It's around 9:20 AM.)",
        {
          t: "Use a screenshot/zoom to check the forageables in Cindersap Forest and plan your route.",
          c: [
            "Pick up all forageables as you pass.",
            {
              t: "If it doesn't waste energy gains, you can eat Spring Onions as you pick them to free inventory space.",
              k: "tip",
            },
            {
              t: "Cut as many weeds as possible, but don't go far out of your way for a single one.",
              k: "tip",
            },
            { t: "You need to meet Marnie by 12:50 PM.", k: "reason" },
          ],
        },
        {
          t: "Meet Jas as she moves from her house to the jump-rope spot.",
          time: "11:20 AM",
        },
        {
          t: "Meet Haley heading to the photo spot in the southwest. If you're ahead of schedule, it's a good time to cut more weeds.",
          time: "11:40 AM",
        },
        "Head to town.",
        {
          t: "Check the two trash cans by Jodi's and Haley's houses, and clear weeds in between if there's time.",
          c: [
            {
              t: "Pausing immediately after checking a trash can is optimal.",
              k: "tip",
            },
            {
              t: "It prevents wasting time when items pop out the opposite way.",
              k: "reason",
            },
            {
              t: "It's similar to the pause strategy for falling trees.",
              k: "tip",
            },
            {
              t: "Checking trash cans wastes a lot of time, so the route only does it the first two days.",
              k: "tip",
            },
          ],
        },
        {
          t: "Meet Marnie walking from Pierre's General Store to the ranch (she passes Emily's house).",
          time: "12:50 PM",
        },
        "Head to the beach.",
        {
          t: "Hoe the artifact spots to aim for your first artifact.",
          c: [
            "Leave the beach forageables on the ground.",
            {
              t: "You're short on inventory now and can pick them up on Spring 2.",
              k: "reason",
            },
          ],
        },
        {
          t: "Meet Elliott near the campfire south of his cabin.",
          time: "Noon",
        },
        "Head to town.",
        "If you got an artifact, donate it to the Museum and claim the reward (250g).",
        "Check the trash cans by the Museum and the Blacksmith.",
        {
          t: "Meet Clint inside the Blacksmith.",
          c: [{ t: "Leave heading east.", k: "tip" }],
        },
        "Check the trash can by JojaMart.",
        {
          t: "Meet Pam, Sam, and Shane inside JojaMart.",
          c: [
            {
              t: "Sam and Shane count as met even while they're working.",
              k: "reason",
            },
          ],
        },
        "Clear the weeds behind (north of) JojaMart.",
        "Meet Abigail on the bridge.",
        {
          t: "If Maru is walking south and nearby, talk to her now; otherwise meet her later when she's sitting on the bench.",
          time: "3:20 PM",
        },
        "Check the trash can by Lewis's house.",
        "Meet Evelyn (flower garden), Caroline + Jodi (town square), and Vincent + Harvey (above Jodi's house).",
        "Cut weeds on the west side of the map near Harvey.",
        {
          t: "Meet Leah + Pierre inside Pierre's General Store.",
          c: [
            {
              t: "You have to go behind the counter to talk to Pierre.",
              k: "tip",
            },
            {
              t: "Don't buy from Pierre today, since you'll buy spring crops on Spring 5–6.",
              k: "tip",
            },
          ],
        },
        {
          t: "Meet everyone else near the Saloon.",
          time: "around 4:00 PM",
          c: [
            {
              t: "At 4:00 PM Alex finishes exercising and leaves his room. Check the trash can by the house and go in to meet George and Alex.",
              c: [
                {
                  t: "If you're early, you may have to wait for Alex to leave his room.",
                  k: "tip",
                },
              ],
            },
            {
              t: "At 4:00 PM Emily arrives at the Saloon. Check the trash can by the Saloon and go in to meet Gus and Emily.",
              c: [{ t: "You have to go behind the counter for Gus.", k: "tip" }],
            },
            "At 4:20 PM Penny passes Lewis's fence and Alex leaves the house.",
            "At 4:40 PM Penny arrives at the bench with Maru. If you haven't met them yet, do so there.",
            "Check your quest log to confirm you met 24 of up to 27 people today.",
          ],
        },
        {
          t: "Head back to the farm.",
          c: [
            {
              t: "Leave the forageables on the ground at the Bus Stop for now.",
              k: "tip",
            },
          ],
        },
        "Empty your inventory. Keep your tools.",
        "Cut farm weeds until around 6:00 PM.",
        "Head out to the back woods around 6:10 PM.",
        "Meet Linus outside his Tent.",
        {
          t: "Meet Demetrius southeast of his house.",
          c: [
            {
              t: "You already met Robin, so no need to talk to her.",
              k: "reason",
            },
          ],
        },
        {
          t: "Meet Sebastian as he leaves the house.",
          c: [
            {
              t: "If you arrive before 7:00 PM, you'll have to wait for him to come out of his room at 6:40 PM.",
              k: "tip",
            },
            {
              t: "That's wasted time you could have spent cutting more farm weeds.",
              k: "reason",
            },
          ],
        },
        "Head south to the Community Center.",
        "Cut weeds west of the Community Center.",
        "Cut weeds west of the fountain.",
        {
          t: "Head home.",
          c: [
            {
              t: "Pick up the Bus Stop forageables you left earlier.",
              k: "tip",
            },
          ],
        },
        {
          t: "Hoe, plant, and water the Parsnip Seeds + Mixed Seeds.",
          c: [
            {
              t: "Planting crops beyond the initial 15 Parsnip Seeds means crows can eat one or more each day. But planting the Mixed Seeds is worth the extra value. (The Cauliflower and Potato from Mixed Seeds let you skip buying them for the Spring Crops bundle later.)",
              k: "tip",
            },
          ],
        },
        "Chop trees until you have 4–6 energy left.",
        {
          t: "Cut weeds and grass until 1:00–1:30 AM, depending on how many Mixed Seeds you have.",
          c: [
            {
              t: "You must hoe, plant, and water all the Mixed Seeds before 2:00 AM.",
              k: "warn",
            },
          ],
        },
        {
          t: "Head home and ship everything except:",
          c: ["Stone", "Wood", "Coal", "20 Fiber"],
        },
        {
          t: "Note:",
          k: "tip",
          c: [
            {
              t: "Sell all forageables except Spring Onions. Worry about Community Center bundles later. You need as much money as possible tomorrow.",
              k: "tip",
            },
            {
              t: "Normally you eat Leeks, Dandelions, and trash-can food (low GPE) instead of selling, but today money is urgent so it's an exception.",
              k: "tip",
            },
          ],
        },
        {
          t: "Hoe, plant, and water the remaining Mixed Seeds.",
          c: [
            {
              t: "Even if you overexert past 0 energy and pass out, you level up Foraging on Spring 2, so no penalty carries over.",
              k: "tip",
            },
            {
              t: "If one of the Mixed Seeds isn't a Cauliflower (check with a mod or the wiki), you'll need to delay the initial bundle turn-in and the extra gold shipment for the Vault—scheduled for Spring 15—until Spring 17.",
              k: "warn",
            },
            {
              t: "A shortage of minecarts adds slight time pressure to clearing the Mines, but it's very rare and doesn't change the route.",
              k: "tip",
            },
          ],
        },
        {
          t: "Be inside your house.",
          time: "just before 2:00 AM",
          c: [{ t: "To avoid the gold penalty.", k: "reason" }],
        },
        {
          t: "Destroy the bed.",
          c: [
            {
              t: "You spawn right next to the door each morning, saving time.",
              k: "reason",
            },
            {
              t: "Or remove it from the house and keep it in a Chest.",
              k: "tip",
            },
          ],
        },
        {
          t: "Move the TV next to the door.",
          c: [{ t: "To check it right when you wake up.", k: "reason" }],
        },
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Foraging 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Read all your mail.",
          c: [
            {
              t: "You need to read Willy's letter to get the Bamboo Pole.",
              k: "reason",
            },
          ],
        },
        "Water your crops.",
        {
          t: "Craft a Chest and carry it.",
          c: [
            {
              t: "On Spring 1 you may have gotten only 0–3 Spring Onions (and no trash-can food) and not chopped 50 Wood. Chop 50 now and continue the route. Just note everything is slightly delayed.",
              k: "tip",
            },
          ],
        },
        "Empty your whole inventory into the Chest. Take the Hoe + the crafted Chest + 1 Stone.",
        {
          t: "Check the trash cans by George's house, the Saloon, and Lewis's house.",
          c: [
            {
              t: "It's fine if villagers catch you—each NPC's friendship is still 0.",
              k: "reason",
            },
            {
              t: "This is the last time you go out of your way for trash cans. They waste a lot of time, so afterward only check them when it costs no extra time.",
              k: "tip",
            },
          ],
        },
        "Go to the beach and receive the Bamboo Pole.",
        "Give the Stone to Willy and claim the 'How to Win Friends' quest reward (100g).",
        "Place the Chest in the bottom-right corner of the pier.",
        "Fish from the pier facing east. Cast at max distance.",
        {
          t: "At 8:40 AM, destroy the Bamboo Pole and check the rest of the beach forageables + artifact spots.",
          c: [
            {
              t: "If you got an artifact now and didn't on Spring 1, donate it immediately for the reward (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Go to Willy's shop. Sell all beach forageables + fish. Buy the Training Rod (25g) from Willy.",
          c: [
            {
              t: "The Training Rod raises your perfect-catch chance. (Leveling Fishing with perfect catches matters more than high-quality fish.)",
              k: "reason",
            },
          ],
        },
        {
          t: "With the Training Rod, cast at minimum distance due south of Willy's door. Gather enough fish to reach 1,800g.",
          c: [
            {
              t: "Minimum-distance casts have a higher chance of easy fish and shorten the cast/reel animations.",
              k: "reason",
            },
            { t: "See also the 'General Fishing Strategy.'", k: "tip" },
          ],
        },
        "When Seaweed (1.54 GPE) and Joja Cola (1.92 GPE) run out, eat the highest-quality Anchovy (1.82 GPE) or Herring (1.82 GPE).",
        {
          t: "Once you have enough fish for 1,800g and reach Fishing level 2, destroy the Training Rod, sell all the fish, and buy the Fiberglass Rod from Willy. Also buy as much Bait as possible (5g each) and equip it on the new rod.",
          c: [
            {
              t: "Perfect catches drop, but thanks to Bait the Fiberglass Rod gives XP faster.",
              k: "reason",
            },
          ],
        },
        "Fish from the same spot with max-distance casts.",
        {
          t: "At 4:30 PM, if the rod has fewer than 35 Bait, go buy more from Willy.",
          c: [
            {
              t: "You need enough Bait to last the rest of today plus tomorrow morning.",
              k: "reason",
            },
          ],
        },
        "Fish until 2:00 AM. Put all fish in the Chest before passing out. (Sell to Willy tomorrow.)",
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Fishing 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "Spring 3 is always rainy.",
        "Empty your whole inventory into the Chest. Take the Fiberglass Rod.",
        "If you have 80+ Bait and got Copper Ore from the Spring 2 fishing Chest, craft a Chest, carry it, and head straight to the Cindersap Forest river to fish. Remember to briefly leave the guide to buy more Bait from Willy before heading to the Mountain Lake tomorrow.",
        {
          t: "Otherwise:",
          c: [
            "Take the Hoe from the Chest.",
            "Fish south of Leah's house until 8:30 AM or until you run out of Bait (whichever comes first).",
            "Check the trash cans south of Jodi's and Emily's houses.",
            "Check forageables + artifact spots at the beach.",
            {
              t: "Sell all fish + extra beach forageables at Willy's shop.",
              c: [
                {
                  t: "If you want, you can keep one Sardine for the Ocean Fish bundle.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Buy Bait until you have only 75g left.",
              c: [
                {
                  t: "If you already found Copper Ore in the fishing Chest, you can spend all your money on Bait.",
                  k: "tip",
                },
                {
                  t: "The amount of Bait you can buy here varies (500–700) depending on your run, but whatever you buy, you'll use it all before spring ends.",
                  k: "tip",
                },
                {
                  t: "Technically you could delay selling some fish until you get the Fisher profession. But there are three problems. First, it's only worth it if you earn more than about an hour of Mountain Lake fishing. Second, the number of fish you can carry when passing out at the end of Spring 3 is limited. Third, the next convenient time to buy Bait is after dropping off the Pickaxe on Spring 5, a day with almost no spare time. So selling now is simpler overall and far less risky.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Empty the Chest's contents and pick up the Chest.",
              c: [
                {
                  t: "To do this at 0 energy cost, select an empty toolbar slot and spam left-click.",
                  k: "tip",
                },
              ],
            },
            {
              t: "If you kept 75g, go to Clint and buy Copper Ore (75g) to trigger Clint's cutscene tomorrow.",
              c: [{ t: "You don't need to drop it on the ground.", k: "tip" }],
            },
            "Head to the Cindersap Forest river.",
          ],
        },
        {
          t: "The best fishing spot at the Cindersap Forest river is 6 tiles west of Leah's door, casting south. Place the Chest one tile to your northeast.",
          c: [
            {
              t: "Aim for the deep water east of the small island (see the wiki 'river fishing zone' image).",
              k: "tip",
            },
          ],
        },
        {
          t: "Fish until 2:00 AM. Before passing out, fill your inventory with the rod + gems + ore + coal + the most valuable fish.",
          c: [
            {
              t: "You won't return to this Chest until Spring 7 (or an earlier rainy day).",
              k: "tip",
            },
          ],
        },
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Fishing 4 → 6 (choose Fisher profession)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Check tomorrow's weather on the TV each day and plan around it.",
          c: [
            {
              t: "E.g., if you're fishing at the Mountain Lake and it won't rain tomorrow, you can leave the rod in the Chest.",
              k: "tip",
            },
          ],
        },
        "Water your crops.",
        {
          t: "If you have fewer than 150 Wood, chop up to 150.",
          c: [
            { t: "Bring the Scythe while chopping to clear grass too.", k: "tip" },
            {
              t: "You'll need 2 Chests and a Scarecrow over the next two days.",
              k: "reason",
            },
          ],
        },
        "Craft a Chest and carry it.",
        "Empty your inventory. Take the Fiberglass Rod + the crafted Chest.",
        {
          t: "Head to the Mountain Lake. The best spot is standing by the long fence at the bottom of the screen, casting east. Place the Chest three tiles behind you.",
          c: [
            {
              t: "Aim for the deep water near the submerged log (see the wiki 'lake fishing zone' image).",
              k: "tip",
            },
          ],
        },
        {
          t: "Fish until 1:00 AM. Fill your inventory with gems, ore, coal, and the most valuable fish.",
          c: [
            {
              t: "Unless it rains tomorrow, you can leave the Fiberglass Rod in the Chest.",
              k: "tip",
            },
          ],
        },
        "Head home.",
        {
          t: "Ship everything sellable (gems, fish, etc.).",
          c: [
            { t: "Keep Chubs to eat.", k: "tip" },
            {
              t: "Keep one of each fish used in Community Center bundles.",
              k: "tip",
            },
            {
              t: "Keep Jade, Emerald, Ruby, and Diamond for the Skull Cavern later.",
              k: "tip",
            },
          ],
        },
        "It'll be 2:00 AM right after selling. Otherwise cut grass and pass out.",
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Fishing 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Check the day's fortune on the TV each day.",
        "Accept or decline the pet. (See 'Pet Mechanics.')",
        "Harvest the Parsnips and note how many you harvested.",
        {
          t: "Note which Mixed Seeds you planted.",
          c: [
            {
              t: "You can tell by the seed's appearance or with a mod.",
              k: "tip",
            },
          ],
        },
        "Claim the Parsnip quest reward (100g).",
        "Don't water the remaining Mixed Seeds until later today.",
        "Craft a Chest and carry it.",
        "If you have Iron Ore or Gold Ore, note how many. (They come randomly from the fishing Chest.)",
        {
          t: "From the Chest, take everything except the Pickaxe + gems + Stone + Coal + Copper + 3 Parsnips.",
          c: [
            {
              t: "Keep Jade, Emerald, Ruby, and Diamond for the Skull Cavern.",
              k: "tip",
            },
            {
              t: "You need Parsnips: 1 for a bundle, 1 to ship (optional), 1 for Pam (optional).",
              k: "reason",
            },
            { t: "You may keep one Coal for tomorrow's Scarecrow.", k: "tip" },
          ],
        },
        "Head to the Mines.",
        "Place the Chest to the left of the elevator.",
        "Descend to floor 10. (See 'General Mine Strategy.')",
        {
          t: "As soon as you have 25 Copper Ore and 25 Stone, return to floor 0, craft a Furnace, and smelt Copper Bars.",
          c: [
            {
              t: "Don't wait for the next elevator unless it's really close.",
              k: "tip",
            },
          ],
        },
        "Keep the Furnace running until you have 5 bars. You must finish 5 by 3:00 PM at the latest.",
        {
          t: "Once you reach floor 10, mine Copper Ore by repeating floor 11 while the remaining bars smelt.",
          c: [
            {
              t: "You probably can't reach floor 15 before 3:00 PM.",
              k: "reason",
            },
          ],
        },
        {
          t: "As soon as the 5 bars are ready:",
          c: [
            {
              t: "Leave the sword + Parsnips in the Chest.",
              c: [
                {
                  t: "You won't return to this Chest until Spring 11.",
                  k: "tip",
                },
              ],
            },
            "Take the Furnace + gems + odds and ends. Keep 4 inventory slots empty.",
            "If you didn't leave Coal at the farm, take one for tomorrow's Scarecrow.",
            "Head to the Blacksmith.",
          ],
        },
        {
          t: "If you're too late to smelt the 5th bar, you can reach the Blacksmith by 4:00 PM, place a Furnace inside, smelt the 5th bar, and wait 30 minutes. As long as you're in the building, Clint sells until 7:10 PM.",
          k: "tip",
          c: [
            {
              t: "However, this is treated as a bug, so to avoid cheating, buy what you need before Clint leaves the counter.",
              k: "warn",
            },
          ],
        },
        {
          t: "If you can't make the bars in time or reach the Blacksmith before it closes, spend the rest of the time fishing. The route then shifts back by one day.",
          c: [
            {
              t: "It's not as big a mistake as it seems, since you'll be fishing a lot anyway for extra funds.",
              k: "reason",
            },
          ],
        },
        "The Mines give Geodes, Frozen Geodes, and Magma Geodes. By the math, paying Clint 25g to crack them is worth more on average, but the opportunity cost of walking to the Blacksmith midday dwarfs that gain. So ship all Geodes for extra cash. (Worry about minerals/Museum late game.)",
        {
          t: "At the Blacksmith:",
          c: [
            "Sell your gems.",
            {
              t: "Keep at least 3,310g, and with the rest:",
              c: [
                "Buy up to 25 Iron Ore (including ore from fishing) (25 × 150g = 3,750g).",
                "Buy up to 25 Gold Ore (including ore from fishing) (25 × 400g = 10,000g). (You'll have almost no money for Gold Ore at this point, and that's fine.)",
              ],
            },
          ],
        },
        {
          t: "What the 3,310g is for:",
          c: [
            "2,000g for the Pickaxe upgrade.",
            {
              t: "1,120g for 16 Kale Seeds for Farming level 2 (380 XP total). (You can buy fewer Kale if you account for Mixed Seeds & Rice Shoot XP.)",
              c: [
                "8 XP per Parsnip × 15 = 120 XP",
                "380 XP − 120 XP = 260 XP",
                "260 XP / 17 XP per Kale = 16 Kale",
                "16 Kale Seeds × 70g = 1,120g",
              ],
            },
            "60g for 1 Bean Starter.",
            "80g for 1 Cauliflower Seeds (not needed if you got one from a Mixed Seed).",
            "50g for 1 Potato Seeds (not needed if you got one from a Mixed Seed).",
          ],
        },
        "Upgrade to the Copper Pickaxe (2,000g).",
        {
          t: "Go to Pierre and buy:",
          c: [
            "1 Bean Starter (60g)",
            "1 Cauliflower Seeds (80g) (not needed if you got one from a Mixed Seed)",
            "1 Potato Seeds (50g) (not needed if you got one from a Mixed Seed)",
            "16 Kale Seeds (1,120g)",
            "Buy extra Kale Seeds with any leftover money.",
          ],
        },
        "Even if you don't reach Pierre before closing, the route doesn't change meaningfully. Just buy and plant the seeds tomorrow.",
        "Head home.",
        "Plant and water.",
        "Take the Fiberglass Rod + Furnace + Iron Ore + Gold Ore + Coal + Chubs.",
        "Head to the Mountain Lake.",
        "Place the Furnace next to the Chest. Smelt 5 Iron Bars while fishing.",
        {
          t: "Fish until 2:00 AM. Before passing out, fill your inventory with the most valuable items.",
          c: [
            {
              t: "Leave any remaining Iron Ore + Gold Ore in the Mountain Lake Chest.",
              c: [
                { t: "Take the Furnace if it rains tomorrow.", k: "tip" },
              ],
            },
            "Note how much Gold Ore you have.",
          ],
        },
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Farming 0 → 1", "Mining 0 → 1", "Fishing 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Water your crops.",
          c: [
            {
              t: "If crows ate your spring bundle crops, note it and re-buy seeds from Pierre when convenient.",
              k: "tip",
            },
          ],
        },
        "Craft and place a Scarecrow.",
        "Chop trees until 7:40 AM.",
        "Empty your inventory and take the Fiberglass Rod.",
        {
          t: "Enter town from the Bus Stop. The Community Center cutscene triggers. Do not skip it.",
          k: "warn",
          c: [
            {
              t: "If you skip it, you're placed at the town entrance; if you watch it, you're placed next to the Community Center.",
              k: "reason",
            },
          ],
        },
        "Enter the Community Center and touch the Golden Scroll pedestal (starts the quest).",
        "Go to the Mountain Lake and fish until 1:00 AM. Fill your inventory with 5 Iron Bars + the most valuable sellables.",
        "Head home.",
        {
          t: "From what's sellable, ship enough for the 5,000g Steel Pickaxe upgrade, and also ship enough gold to buy up to 25 Gold Ore.",
          c: [
            { t: "If short, sell Chubs. (Sell low-quality first.)", k: "tip" },
          ],
        },
        "It'll be 2:00 AM right after selling. Otherwise cut grass and pass out.",
      ],
    },
    7: {
      items: [
        "Check the Queen of Sauce for the Stir Fry recipe.",
        "Check your mail until you receive the Wizard's letter.",
        "Water your crops.",
        "Empty your inventory. Take the 5 Iron Bars.",
        {
          t: "Go to the Wizard (triggers a cutscene).",
          c: [
            {
              t: "Watching the cutscene doesn't count as meeting the Wizard. You must talk to him after the cutscene to show his name on the Social tab. But it's purely cosmetic with no real benefit, so treat it as a waste of time.",
              k: "tip",
            },
          ],
        },
        "Empty the contents of the Cindersap Forest river Chest (optional).",
        {
          t: "Head to the Blacksmith:",
          c: [
            "Buy up to 25 Gold Ore (including ore from fishing).",
            "Upgrade to the Steel Pickaxe (5,000g).",
          ],
        },
        "Fish at the Mountain Lake until 2:00 AM, then pass out. Smelt Gold Bars while fishing. Smelt 2–3, and one more will be in the Furnace when you pass out.",
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Fishing 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "If the cave cutscene appears, choose mushrooms. (See 'Misc Notes.')",
        "Water your crops.",
        {
          t: "From what's sellable, ship enough to reach 12,000g.",
          c: [
            {
              t: "It's for the Gold Pickaxe upgrade (10,000g) + the Backpack upgrade (2,000g).",
              k: "reason",
            },
            {
              t: "If short, return home before the day ends and ship the fish you caught that day to make up the difference.",
              k: "tip",
            },
          ],
        },
        "Fish at the Mountain Lake until 2:00 AM, then pass out. Smelt Gold Bars while fishing until you have 5 total. You should be holding these bars when you pass out.",
        {
          t: "This is the first day since the start you don't level up a skill, so don't overexert.",
          c: [
            {
              t: "You should wake at 50% energy, not 0%.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Water your crops.",
        "Chop trees until about 8:00 AM.",
        "Empty your inventory. Take the Fiberglass Rod.",
        "Go to the Blacksmith and upgrade to the Gold Pickaxe (10,000g).",
        "Go to Pierre and upgrade your Backpack (2,000g).",
        "Fish at the Mountain Lake until 2:00 AM, then pass out.",
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Fishing 9 → 10 (choose Angler profession)"],
        },
        "Even if you don't hit Fishing 10 today, you'll get it on the next fishing day. The route doesn't change meaningfully.",
      ],
    },
    10: {
      items: [
        "Water your crops.",
        "Grab mushrooms from the cave.",
        {
          t: "Calculate the extra Kale needed for Farming level 6.",
          c: [
            "8 XP per Parsnip × 15 = 120 XP",
            "17 XP per Kale × 16 = 272 XP",
            "3,300 XP total − 120 XP − 272 XP = 2,908 XP needed",
            "2,908 XP / 17 = 172 Kale",
            "172 Kale Seeds × 70g = 12,040g",
          ],
        },
        {
          t: "If you're Fishing level 10, ship enough fish to buy half the Kale Seeds you need (6,020g).",
          c: [
            {
              t: "Two batches is optimal so you don't craft more Sprinklers than necessary. This way you secure as many Iron Bars as possible for Quality Sprinklers on Spring 28.",
              k: "reason",
            },
          ],
        },
        {
          t: "If you're not Fishing level 10, don't ship fish now. Sell them directly to Willy tomorrow.",
          c: [{ t: "You'd lose 25% of the gold.", k: "reason" }],
        },
        "Empty your inventory. Take the Fiberglass Rod.",
        "If the rod has fewer than 100 Bait, take a few fish too. Fish a few hours at the Mountain Lake until 9:00 AM, then sell fish to Willy and buy more Bait.",
        "Fish at the Mountain Lake until 2:00 AM, then pass out. Don't forget to take the Furnace for the Mines tomorrow.",
      ],
    },
    11: {
      items: [
        "Harvest the Kale. (You reach Farming level 2.)",
        {
          t: "Start hoeing tiles in a Sprinkler pattern.",
          c: [{ t: "Don't water any tile.", k: "warn" }],
        },
        "Leave the farm around 8:00 AM.",
        "If you didn't ship fish yesterday, sell them to Willy.",
        "Go to the Blacksmith and grab the Gold Pickaxe.",
        "Go to Pierre and buy as much Kale Seeds as you calculated (6,020g).",
        {
          t: "Head back to the farm and finish hoeing + planting.",
          c: [
            { t: "Don't water any tile.", k: "warn" },
            {
              t: "Optionally craft Cobblestone Path to mark where future Sprinklers go.",
              k: "tip",
            },
            { t: "Kale doesn't need watering until Spring 14.", k: "tip" },
          ],
        },
        "Go to the Mines and place a Furnace. Keep smelting bars.",
        {
          t: "Mine until 2:00 AM, then pass out.",
          c: [
            {
              t: "As you gather more copper, craft 3 more Furnaces (4 total).",
              k: "tip",
            },
          ],
        },
        {
          t: "At the end of the day you gain:",
          k: "result",
          c: ["Farming 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Grab mushrooms from the cave.",
        "Mine until 2:00 AM, then pass out. Smelt Copper and Iron while mining.",
        "When you reach Mining level 5, choose the Miner profession.",
      ],
    },
    13: {
      items: [
        "Mine until 2:00 AM, then pass out.",
        {
          t: "There's nothing you need at the Egg Festival, so going is a waste of time. The exception is if you're going for the ship-every-item challenge through year 1's end, in which case you need a Strawberry Seed or two.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Check the Queen of Sauce for the Coleslaw recipe.",
        "Grab mushrooms from the cave.",
        "Get to the Mines by 12:00 AM.",
        "If you're short on the remaining ore for Sprinklers, mine ore on floor 21/41 before descending further.",
        {
          t: "Once you reach the bottom of the Mines, go back to mining ore.",
          c: [
            {
              t: "Depending on skill, luck, and whether you take rainy-day fishing breaks, you can reach floor 120 between Spring 14–18.",
              k: "tip",
            },
            {
              t: "Once you've crafted all the (normal) Sprinklers, Copper Ore is only needed for tool upgrades. Quality Sprinklers need lots of Iron and Gold Ore.",
              k: "tip",
            },
          ],
        },
        {
          t: "At 12:00 AM, head home and craft + place as many Sprinklers as possible.",
          c: [{ t: "It's fine if they don't cover all crops.", k: "tip" }],
        },
        {
          t: "Ship items to reach 42,500g.",
          c: [
            {
              t: "If short, only go to 32,500g and skip the 10,000g bundle tomorrow. (You'll likely be short in most runs.)",
              k: "tip",
            },
          ],
        },
        "It'll be 2:00 AM right after this. Otherwise cut grass and pass out.",
      ],
    },
    15: {
      items: [
        {
          t: "Salmonberries start appearing today, but don't go far out of your way to harvest them.",
          c: [
            { t: "The time isn't worth the small energy gain.", k: "reason" },
            {
              t: "Use the same pause strategy on Salmonberry bushes as on trash cans.",
              k: "tip",
            },
          ],
        },
        "Water any crops not yet covered by Sprinklers (if any).",
        "Empty your inventory. Take the items for 4 Spring Foraging + 4 Spring Crops + 3 Blacksmith's + 4 Geologist's + 2 Adventurer's bundles.",
        {
          t: "Go to the Community Center and complete the bundles with these items.",
          c: [
            {
              t: "After completing the two Boiler Room bundles, don't forget to exit the Golden Scroll so you don't get stuck in the bug cutscene.",
              k: "warn",
            },
          ],
        },
        "If you have enough money (42,500g), also complete the Vault bundle.",
        "Head home, place a Crystalarium, and put a Diamond in it.",
        "Empty your inventory and head to the Mines.",
        "If you're short on the remaining ore for Sprinklers, mine ore on floor 21/41 before descending further.",
        "Mine until 2:00 AM, then pass out. If you still need more Sprinklers, don't forget to keep the smelted bars in your inventory.",
        "At the end of the day, minecarts are unlocked.",
      ],
    },
    16: {
      items: [
        "Grab mushrooms from the cave.",
        "Water any crops not yet covered by Sprinklers (if any).",
        "Craft more Sprinklers with yesterday's smelted bars (if needed).",
        {
          t: "Mine until 2:00 AM.",
          c: [
            {
              t: "Don't forget to use the minecart to travel faster.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["After Spring 17 — the guide gets less specific here."],
      items: [
        "If you haven't reached Mines floor 120 yet, finish it as fast as possible.",
        {
          t: "Also, if you need more gold to finish the Vault (42,500g), fish at the Mountain Lake to complete it as fast as possible.",
          c: [
            {
              t: "If both are left, time them to finish on the same day.",
              k: "tip",
              c: [
                {
                  t: "The bus isn't repaired until the next day.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Once you reach Mines floor 120, move all Furnaces from the Mines to the farm.",
        "Do the Skull Cavern as fast and as often as possible. (See 'General Skull Cavern Strategy.')",
        {
          t: "In your spare time:",
          c: [
            "Start clearing farm debris where Quality Sprinklers + Starfruit will go.",
            "Craft and lay flooring where the Quality Sprinklers will go.",
            "Craft and place Scarecrows.",
            "Craft more Furnaces with spare copper.",
            "Start an Oak Tree forest by planting Acorns in a corner of the farm.",
            "Mine more ore in the Mines (floors 20/40/80).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Ship items for:",
          c: [
            "2,000g for the Copper Axe upgrade.",
            "Enough gold to buy the 2nd batch of Kale Seeds (70g each).",
          ],
        },
      ],
    },
    19: {
      items: [
        "At 9:00 AM, go to Clint and upgrade to the Copper Axe (2,000g).",
        "Go to Pierre and buy the 2nd batch of Kale Seeds.",
      ],
    },
    20: {
      items: [
        "Harvest the 1st Kale and plant the 2nd crop.",
        "Ship items to reach 5,000g for the Steel Axe upgrade.",
      ],
    },
    21: {
      items: [
        "Check the Queen of Sauce for the Radish Salad recipe.",
        "At 9:00 AM, go to Clint, grab the Copper Axe, and upgrade to the Steel Axe (5,000g).",
        "If you're going for the ship-every-item challenge through year 1's end, you must buy and plant Tulip Bulb (20g) and Jazz Seeds (30g) today so they're ready by Spring 28.",
      ],
    },
    22: {
      items: ["Ship items to reach 2,000g for the Copper Hoe upgrade."],
    },
    23: {
      items: [
        "At 9:00 AM, go to Clint, grab the Steel Axe, and upgrade to the Copper Hoe (2,000g).",
        {
          t: "Now that you have the Steel Axe, when an unlucky day comes, use it to clear farm space and prepare Sprinklers. Even on a non-unlucky day, do it by the 27th at the latest.",
          c: [
            {
              t: "However, you must reach Mining level 10 first before taking a break, since you need the Blacksmith profession before Spring 25.",
              k: "warn",
            },
            {
              t: "Remember to also place Scarecrows and Parsnip Seeds (filler crops).",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Ship as much as possible.",
          c: [
            { t: "Gather as much gold as possible for tomorrow.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Plan how many Starfruit Seeds (400g each) to plant on Summer 2. It varies by run; account for your Skull Cavern income from now until Summer 2. You need about two days to clear and prepare the farm. (You may have already cleared one day on an unlucky day after Spring 23.) Aim for about 400–500 Starfruit Seeds.",
        "At 9:00 AM, go to Clint, grab the Copper Hoe, and upgrade to the Steel Hoe (5,000g).",
        {
          t: "Go to the Oasis and buy one Deluxe Speed-Gro for each Starfruit Seed you'll buy.",
          c: [
            {
              t: "The Oasis only sells Deluxe Speed-Gro on Thursdays, and you need it by Summer 2.",
              k: "reason",
            },
            {
              t: "Today Pam is at the clinic for a checkup (so she doesn't drive the bus), so you need a Warp Totem: Desert to reach the desert. In most runs you use a warp totem every day anyway, so it's not a problem.",
              k: "tip",
            },
          ],
        },
        {
          t: "Spend leftover money on Starfruit Seeds so you can pass out without a penalty.",
          c: [
            {
              t: "Buy the rest of the Starfruit Seeds on Summer 2.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Nothing in particular to do."],
    },
    27: {
      items: [
        "Harvest the 2nd Kale. (You reach Farming level 6.)",
        "At 9:00 AM, go to Clint and grab the Steel Hoe.",
      ],
    },
    28: {
      items: [
        "Check the Queen of Sauce for the Omelet recipe.",
        {
          t: "Ship as much as possible.",
          c: [
            { t: "Gather as much gold as possible for tomorrow.", k: "reason" },
          ],
        },
        "Craft and place Quality Sprinklers.",
        {
          t: "If you haven't already, plant Parsnip Seeds (filler crop).",
          c: [
            {
              t: "Don't use Deluxe Speed-Gro on the Parsnip Seeds, since they shouldn't roll over into Summer 1.",
              k: "warn",
            },
          ],
        },
        "If you finish around noon, you can spend the rest of the time in the Skull Cavern.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Nothing in particular. You can run the Skull Cavern, etc. You don't need to plant Starfruit Seeds until tomorrow, so don't cut the Parsnips.",
          c: [
            {
              t: "The Agriculturist profession affects the 3rd Starfruit.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Cut and plant all the Deluxe Speed-Gro + 1st Starfruit Seeds you bought on Spring 25.",
        "At 9:00 AM, go to the Oasis to buy the rest of the Starfruit Seeds, then return home and plant.",
        {
          t: "This takes most of the day. If you have spare time:",
          c: [
            "Craft and place 10–20 Lightning Rods.",
            "Craft and place Tappers on the Oak Trees scattered around the farm you didn't cut.",
            "Keep planting Acorns in a corner of the farm to grow the Oak Tree forest.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Run the Skull Cavern.",
          c: [
            {
              t: "You need 25,000g for the Iridium Pickaxe upgrade.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Smelt Iridium Bars. If they finish late (around 2:30 PM), go to Clint and upgrade to the Iridium Pickaxe.",
          c: [
            {
              t: "If the Iridium Bars alone aren't enough money, you can sell gems directly to Clint.",
              k: "tip",
            },
          ],
        },
        "Craft and place 10–20 Lightning Rods.",
        "Craft and place Tappers on the Oak Trees scattered around the farm you didn't cut.",
        "Keep planting Acorns in a corner of the farm to grow the Oak Tree forest.",
        "You need as much Oak Resin as possible for Kegs. Tree Fertilizer is very useful for growing the Oak Tree forest quickly, but crafting it requires Foraging level 7. The best way to level Foraging with almost no in-game time wasted (instead of chopping trees or walking the long distance to the Secret Woods) is to craft and harvest Summer Seeds.",
        {
          t: "So on days you don't go to the Skull Cavern (like today):",
          c: [
            "Roam the map for summer forageables and craft at least 10–20 Summer Seeds. Harvest, re-craft, and replant as much as possible until Foraging level 7.",
            {
              t: "Chop the 5 stumps in the Secret Woods for Foraging XP and Hardwood.",
              c: [
                { t: "You need 100 Hardwood for the Stable.", k: "reason" },
              ],
            },
            {
              t: "As soon as you have 100 Hardwood, buy the Stable from Robin to cut down future Secret Woods round trips.",
              c: [
                {
                  t: "The second farmhouse upgrade needs 150 Hardwood.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["After Summer 5"],
      items: [
        "Run the Skull Cavern more. Gather as much money as possible for the 2nd batch of Starfruit Seeds.",
      ],
    },
    9: {
      items: ["Ship enough to buy the 2nd batch of Starfruit Seeds."],
    },
    10: {
      items: [
        {
          t: "Buy the 2nd batch of Starfruit Seeds.",
          c: [
            {
              t: "The Oasis closes for the Luau tomorrow, so buy today.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Harvest and replant.",
          c: [
            {
              t: "The Deluxe Speed-Gro stays in the tile, so you don't need to reapply it.",
              k: "reason",
            },
          ],
        },
        {
          t: "Don't sell any Starfruit—even gold-quality—put it all in Kegs. At this point, tap as many Oak Trees and build as many Kegs as possible.",
          c: [
            { t: "Buy Wood from Robin when you run out.", k: "tip" },
            {
              t: "Don't sell wine until you re-spec from Agriculturist to Artisan via the Statue of Uncertainty.",
              k: "warn",
            },
          ],
        },
        "At first you can fill your house with Kegs. Later it's convenient to buy several Big Sheds and place them near the house. Or, once you unlock the Quarry, cover it with flooring and use it for Keg storage.",
        {
          t: "At the end of the day you reach Farming level 10. Choose the Agriculturist profession.",
          c: [
            {
              t: "Unfortunately the Agriculturist effect doesn't apply to crops planted today.",
              k: "tip",
            },
            {
              t: "Re-spec to Artisan later before selling Starfruit Wine.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["After Summer 13"],
      items: [
        "Summer 13 is always a stormy day.",
        "On Summer 13 or sometime after, buy and plant other summer crops needed for bundles, quests, gifts, etc.",
        "The longest crops are Melon and Blueberry, taking 10 days with the Agriculturist profession. Deluxe Speed-Gro cuts that to 7 days. So you can delay planting extra summer crops until Summer 21 at the latest.",
      ],
    },
    19: {
      items: ["Ship enough items for the 3rd Starfruit."],
    },
    20: {
      items: [
        "Harvest the Starfruit.",
        "At 9:00 AM, go to the Oasis and buy the 2nd batch of Starfruit Seeds.",
        {
          t: "Plant the Starfruit Seeds.",
          c: [
            {
              t: "The Deluxe Speed-Gro stays in the tile, so you don't need to reapply it.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Ship enough to buy more Deluxe Speed-Gro.",
          c: [
            {
              t: "You'll cover the whole farm with Pumpkins, so you need extra Speed-Gro beyond what carries over from the Starfruit tiles.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Buy more Deluxe Speed-Gro at the Oasis.",
        "Sometime between now and Summer 28, hoe and place all the Quality Sprinklers and extra Deluxe Speed-Gro. If you don't water the soil on Summer 28, the Wheat won't be ready on Fall 2.",
      ],
    },
    26: {
      items: ["Summer 26 is always a stormy day."],
    },
    27: {
      items: [
        "Ship enough to buy Wheat Seeds (10g each) to cover the whole farm tomorrow.",
      ],
    },
    28: {
      items: [
        "Harvest the Starfruit.",
        "At 9:00 AM, go to Pierre and buy Wheat Seeds to cover the whole farm.",
        {
          t: "Plant the Wheat Seeds (filler crop — keeps the Deluxe Speed-Gro).",
          c: [
            {
              t: "Summer 28 planting only works if you have the Agriculturist profession. Otherwise you can't get the 3rd Pumpkin with this strategy.",
              k: "warn",
            },
          ],
        },
      ],
    },
  },
  fall: {
    1: {
      items: [
        "Nothing in particular. You can run the Skull Cavern, etc. You have to wait for the Wheat to finish growing.",
        "To complete the Museum, it's very useful to have Foraging level 10 and the Tracker profession before Winter 1 (to spot artifact spots more easily). If you're not Foraging 10 yet, it's better to plant a big forest with spare Maple Seeds and Pine Cones and chop it all. (It's more efficient than harvesting fall forageables.)",
        "Ship enough to buy Pumpkin Seeds (100g each) to cover the farm.",
      ],
    },
    2: {
      items: [
        {
          t: "Harvest the Wheat and replant Pumpkin Seeds to cover the whole farm.",
          c: [
            {
              t: "Pumpkins are better than Cranberries because you won't have enough Kegs to handle all the Cranberries.",
              k: "reason",
            },
          ],
        },
        "Like Starfruit, repeat harvest + replant to get 3 Pumpkin harvests in fall.",
      ],
    },
    9: {
      items: [
        "You can now sell Starfruit Wine.",
        "Re-spec from Agriculturist to Artisan via the Statue of Uncertainty.",
        {
          t: "Buy more seeds for tomorrow.",
          c: [
            {
              t: "Pierre is closed on Wednesday, so buy today.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "The 1st Pumpkin is ready today.",
        {
          t: "Replant.",
          c: [
            {
              t: "Like Starfruit, Pumpkin can also be harvested 3 times total.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["After Winter 1"],
      items: [
        {
          t: "Now is your chance to complete the remaining Community Center bundles. To unlock Ginger Island and the Island farm, complete the Community Center as fast as possible.",
          c: [
            {
              t: "Once you reach the Island farm, you can plant Starfruit in bulk again, which becomes your main income source.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Today's goals (summary): a main goal (collapsible header) with methods/reasons (c).
// Separate from items; condenses each day's key goals. Trivial steps are omitted,
// but important snowball items (stocking materials for the next day, etc.) are kept.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Save up money to buy the Fiberglass Rod (1,800g) as fast as possible tomorrow.",
        c: [
          {
            t: "Meet everyone in town.",
            c: [
              {
                t: "Completing the 'Introductions' quest unlocks 'How to Win Friends,' giving an extra 100g on Spring 2.",
                k: "reason",
              },
            ],
          },
          "Donate an artifact to the Museum for the 250g reward.",
          "Sell your forageables.",
        ],
      },
      {
        t: "Plant seeds.",
        c: [
          "Plant the Parsnip Seeds.",
          "Cut weeds in town to get Mixed Seeds.",
        ],
      },
    ],
    2: [
      {
        t: "Buy the Fiberglass Rod (1,800g).",
        c: [
          "Buy the Training Rod (25g) and fish.",
          "Give the Stone to Willy for the 'How to Win Friends' reward (100g).",
        ],
      },
      "Buy Bait for the next day.",
    ],
    3: [
      {
        t: "Get one Copper Ore.",
        c: [
          {
            t: "To trigger Clint's cutscene tomorrow.",
            k: "reason",
          },
          {
            t: "Get it from fishing.",
            c: [
              {
                t: "If you don't get one, keep 75g to buy Copper Ore from Clint.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Catch as many Catfish as possible.",
        c: ["Sell all fish + extra beach forageables at Willy's shop and buy Bait."],
      },
    ],
    4: [
      {
        t: "Get 150 Wood.",
        c: [
          {
            t: "You'll need 2 Chests and a Scarecrow over the next two days.",
            k: "reason",
          },
        ],
      },
      "Fish at the Mountain Lake.",
    ],
    5: [
      {
        t: "Upgrade your Pickaxe to the Copper Pickaxe (2,000g).",
        c: [
          {
            t: "Make 5 Copper Bars on Mines floor 10 and drop the Pickaxe off with Clint.",
            c: [
              {
                t: "Drop it off before Clint closes (finish 5 bars by 3:00 PM at the latest).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Plant seeds and fish at the Mountain Lake.",
        c: [
          "Buy and plant Kale Seeds (for Farming 2) plus Bean, Cauliflower, and Potato seeds.",
        ],
      },
      {
        t: "Stock up for what's next.",
        c: [
          {
            t: "Keep Jade, Emerald, Ruby, and Diamond for the Skull Cavern.",
            k: "tip",
          },
          { t: "Keep one Coal for a Scarecrow.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Save up for the Steel Pickaxe upgrade (5,000g) and Gold Ore.",
        c: ["Fish at the Mountain Lake for Iron Bars + sellable fish."],
      },
      {
        t: "Trigger the Community Center cutscene and touch the Golden Scroll (starts the quest).",
        c: [
          { t: "It triggers when you enter town from the Bus Stop.", k: "tip" },
        ],
      },
      "Craft and place a Scarecrow.",
    ],
    7: [
      {
        t: "Upgrade your Pickaxe to the Steel Pickaxe (5,000g).",
        c: ["Buy Gold Ore at the Blacksmith, then upgrade."],
      },
      "Meet the Wizard (triggers a cutscene).",
      "Fish at the Mountain Lake and smelt Gold Bars.",
    ],
    8: [
      {
        t: "Save 12,000g for the Gold Pickaxe (10,000g) and Backpack (2,000g) upgrades.",
        c: ["Fish at the Mountain Lake for sellable items."],
      },
      {
        t: "Smelt 5 Gold Bars and sleep holding them.",
        c: [
          {
            t: "Wake at 50% energy to avoid overexertion (first day with no skill-up).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Upgrade to the Gold Pickaxe (10,000g) and upgrade your Backpack (2,000g).",
      "Fish at the Mountain Lake (Fishing 10 → Angler profession).",
    ],
    10: [
      {
        t: "Calculate the Kale Seeds needed for Farming 6 and save up for half.",
        c: [
          {
            t: "Plant Kale in two batches so you don't craft more Sprinklers than needed.",
            k: "tip",
          },
          {
            t: "If you're not Fishing 10, don't ship—sell to Willy directly tomorrow.",
            k: "tip",
          },
        ],
      },
      {
        t: "Take a Furnace for the Mines tomorrow.",
        c: [{ t: "Don't forget before passing out.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Harvest Kale (Farming 2) and buy + plant the 2nd batch of Kale Seeds (6,020g).",
        c: [
          "Hoe tiles in a Sprinkler pattern (no watering).",
          { t: "Kale doesn't need watering until Spring 14.", k: "tip" },
        ],
      },
      "Mine and smelt bars in the Mines.",
    ],
    12: [
      {
        t: "Mine and smelt Copper and Iron.",
        c: ["Choose the Miner profession at Mining level 5."],
      },
    ],
    13: [
      {
        t: "Keep descending and mining in the Mines.",
        c: [
          { t: "Skip the Egg Festival unless you need something (a waste of time).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Descend toward Mines floor 120, mining ore for Sprinklers.",
        c: ["If short, mine Iron/Gold Ore on floor 21/41."],
      },
      {
        t: "Ship gold for the Vault bundle (42,500g).",
        c: [
          {
            t: "If short, only go to 32,500g and skip the 10,000g bundle tomorrow.",
            k: "tip",
          },
        ],
      },
      "Craft as many Sprinklers as possible at home.",
    ],
    15: [
      {
        t: "Complete the Community Center bundles.",
        c: [
          "Bring and turn in items for the Spring Foraging, Spring Crops, Blacksmith's, Geologist's, and Adventurer's bundles.",
          { t: "If you have enough money (42,500g), also complete the Vault bundle.", k: "tip" },
          {
            t: "Exit the Golden Scroll so you don't get stuck in the bug cutscene.",
            k: "warn",
          },
        ],
      },
      "Place a Crystalarium and put a Diamond in it.",
      {
        t: "Mine until 2:00 AM.",
        c: [{ t: "Minecarts unlock at the end of the day.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Mine and craft more Sprinklers.",
        c: [{ t: "Travel faster with the minecart.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Finish Mines floor 120 and complete the Vault (42,500g).",
        c: [
          {
            t: "If both are left, time them to finish the same day (the bus is repaired the next day).",
            k: "tip",
          },
        ],
      },
      "Run the Skull Cavern as often as possible.",
      {
        t: "Prepare for the next crops in your spare time.",
        c: [
          "Clear farm debris and lay flooring where Quality Sprinklers will go.",
          "Craft more Scarecrows and Furnaces, and plant Acorns to grow an Oak Tree forest.",
        ],
      },
    ],
    18: [
      "Ship gold for the Copper Axe upgrade (2,000g) and the 2nd batch of Kale Seeds.",
    ],
    19: [
      "Upgrade your Axe to the Copper Axe (2,000g).",
      "Buy the 2nd batch of Kale Seeds from Pierre.",
    ],
    20: [
      "Harvest the 1st Kale and plant the 2nd crop.",
      "Ship gold for the Steel Axe upgrade (5,000g).",
    ],
    21: [
      "Upgrade your Axe to the Steel Axe (5,000g).",
      {
        t: "(Optional) If going for the ship-every-item challenge, plant Tulip Bulb and Jazz Seeds.",
        c: [{ t: "They'll be ready by Spring 28.", k: "reason" }],
      },
    ],
    22: ["Ship gold for the Copper Hoe upgrade (2,000g)."],
    23: [
      "Upgrade your Hoe to the Copper Hoe (2,000g).",
      {
        t: "On an unlucky day, clear farm space and prepare Sprinklers (by the 27th at the latest).",
        c: [
          {
            t: "Hit Mining level 10 first before taking a break (Blacksmith profession needed before Spring 25).",
            k: "warn",
          },
          {
            t: "Also place Scarecrows and Parsnip Seeds (filler).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Gather as much gold as possible for tomorrow.",
        c: ["Ship as much as possible."],
      },
    ],
    25: [
      "Plan how many Starfruit Seeds to plant on Summer 2 (aim for ~400–500).",
      "Upgrade your Hoe to the Steel Hoe (5,000g).",
      {
        t: "Buy Deluxe Speed-Gro at the Oasis (one per Starfruit Seed).",
        c: [{ t: "The Oasis only sells it on Thursdays.", k: "reason" }],
      },
    ],
    26: ["Nothing in particular. Run the Skull Cavern, etc."],
    27: [
      "Harvest the 2nd Kale (Farming 6).",
      "Grab the Steel Hoe from Clint.",
    ],
    28: [
      {
        t: "Craft Quality Sprinklers and plant a filler crop (Parsnips).",
        c: [
          {
            t: "Don't use Deluxe Speed-Gro on Parsnips (they shouldn't roll into Summer 1).",
            k: "warn",
          },
        ],
      },
      "Ship as much gold as possible for tomorrow.",
    ],
  },
  summer: {
    1: [
      {
        t: "Nothing in particular. Run the Skull Cavern, etc.",
        c: [
          {
            t: "Don't cut the Parsnips (the Agriculturist profession affects the 3rd Starfruit).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Plant the 1st Starfruit with Deluxe Speed-Gro.",
        c: ["Buy the rest of the Starfruit Seeds at the Oasis and plant them."],
      },
      {
        t: "Stock up in your spare time.",
        c: [
          "Craft 10–20 Lightning Rods.",
          "Place Tappers on Oak Trees and plant Acorns to grow the Oak Tree forest.",
        ],
      },
    ],
    3: [
      {
        t: "Run the Skull Cavern.",
        c: [
          {
            t: "You need 25,000g for the Iridium Pickaxe upgrade.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Smelt Iridium Bars and upgrade to the Iridium Pickaxe.",
      {
        t: "Gather Oak Resin and Hardwood while aiming for Foraging level 7.",
        c: [
          "Craft and harvest Summer Seeds to gain Foraging XP.",
          "Chop the Secret Woods stumps for Hardwood.",
          {
            t: "Buy the Stable with 100 Hardwood to cut down future round trips.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Run the Skull Cavern, saving up for the 2nd batch of Starfruit Seeds."],
    9: ["Ship enough to buy the 2nd batch of Starfruit Seeds."],
    10: [
      {
        t: "Buy the 2nd batch of Starfruit Seeds.",
        c: [{ t: "The Oasis closes for the Luau tomorrow, so buy today.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Repeat harvest/replant and put all Starfruit into Kegs.",
        c: [
          "Tap as many Oak Trees and build as many Kegs as possible.",
          {
            t: "Don't sell wine until you re-spec to Artisan.",
            k: "warn",
          },
        ],
      },
      "At the end of the day you reach Farming 10 (Agriculturist profession).",
    ],
    13: [
      "Buy and plant other summer crops for bundles/quests (by Summer 21 at the latest).",
    ],
    19: ["Ship enough for the 3rd Starfruit."],
    20: ["Harvest the Starfruit and replant (buy the 2nd batch of seeds at the Oasis)."],
    24: [
      {
        t: "Ship enough to buy more Deluxe Speed-Gro.",
        c: [
          {
            t: "You'll cover the whole farm with Pumpkins, so you need extra Speed-Gro.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Place Quality Sprinklers and extra Deluxe Speed-Gro.",
        c: [
          {
            t: "Water on Summer 28 so the Wheat is ready on Fall 2.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Nothing in particular (always a stormy day)."],
    27: ["Ship enough to buy Wheat Seeds to cover the whole farm tomorrow."],
    28: [
      "Harvest the Starfruit.",
      {
        t: "Plant Wheat Seeds across the whole farm (filler).",
        c: [
          {
            t: "Only valid with the Agriculturist profession (for the 3rd Pumpkin).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Ship enough to buy Pumpkin Seeds to cover the farm.",
      {
        t: "(Optional) Prepare Foraging level 10 and the Tracker profession for the Museum.",
        c: [
          {
            t: "Planting a forest with Maple Seeds and Pine Cones and chopping it is efficient.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Harvest the Wheat and plant Pumpkin Seeds across the whole farm.",
        c: [
          {
            t: "Pumpkins are better than Cranberries since you won't have enough Kegs.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Re-spec to Artisan to start selling Starfruit Wine.",
        c: ["Re-spec Agriculturist → Artisan via the Statue of Uncertainty."],
      },
      {
        t: "Buy seeds for tomorrow in advance.",
        c: [{ t: "Pierre is closed on Wednesday, so buy today.", k: "reason" }],
      },
    ],
    10: ["Harvest the 1st Pumpkin and replant."],
  },
  winter: {
    1: [
      {
        t: "Complete the remaining Community Center bundles.",
        c: [
          {
            t: "Unlocking Ginger Island and the Island farm lets you plant Starfruit in bulk again as your main income.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
