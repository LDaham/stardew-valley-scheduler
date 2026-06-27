// =============================================================================
// AVIS DE LICENCE (GPL-3.0)
// Le contenu du guide de ce fichier (MIN_MAX_GUIDE / DAILY_GOALS) est une œuvre
// dérivée de « Stardew Valley Min-Max Routing / Strategy » de BlackSight6 & Zamiel
// (GPL-3.0).
//   Source : https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Licence : GNU GPL-3.0 — texte complet dans LICENSES/GPL-3.0.txt.
// Modifications : condensé et restructuré en un arbre de données par jour (GuideNode),
// les noms propres utilisant les noms officiels français du jeu.
// Ce fichier est donc régi par la GPL-3.0, et non par la licence MIT du projet.
// (Maintenu séparé du contenu du wiki sous CC BY-NC-SA ; distribué comme simple agrégation.)
//
// Copyright (C) BlackSight6 & Zamiel (guide original)
// Adaptation (C) 2026 Lee Daham
// Ce programme est un logiciel libre : vous pouvez le redistribuer et/ou le modifier
// selon les termes de la Licence publique générale GNU publiée par la Free Software
// Foundation, soit la version 3 de la Licence, soit (à votre choix) toute version
// ultérieure. Ce programme est distribué SANS AUCUNE GARANTIE. Consultez la GNU GPL
// pour plus de détails : https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Récupère les graines de panais.",
        {
          t: "Abats immédiatement 9 arbres pour atteindre Cueillette niveau 1.",
          c: [
            { t: "Il te faut 8 arbres 1/3.", k: "tip" },
            {
              t: "Tu as besoin du niveau 1 avant de cueillir pour avoir une chance d'obtenir des oignons nouveaux de qualité argent.",
              k: "reason",
            },
            {
              t: "Concentre-toi uniquement sur l'abattage, en commençant en direction du chemin vers la forêt.",
              k: "tip",
              c: [
                {
                  t: "Cela dégage aussi les mauvaises herbes le long du chemin, ce qui facilite tes déplacements.",
                  k: "reason",
                },
              ],
            },
            {
              t: "N'abats que les érables et les pins, pas les chênes en forme d'œuf.",
              k: "warn",
              c: [
                {
                  t: "Les chênes ne lâchent pas de glands avant le 2 printemps, et les glands sont précieux.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Pour la même raison, ne touche pas les graines au sol avec la hache ou la houe avant le 2 printemps (elles sont détruites).",
              k: "warn",
            },
            {
              t: "N'abats pas les souches ; frappe chaque arbre jusqu'à ce qu'il tombe (jusqu'à 10 coups), puis passe au suivant.",
              k: "tip",
              c: [{ t: "Cela donne plus de bois et d'expérience de Cueillette.", k: "reason" }],
            },
            {
              t: "Quand un arbre commence à tomber, va à l'endroit où le bois va atterrir et mets en pause immédiatement.",
              k: "tip",
            },
            {
              t: "Le temps du jeu s'arrête mais l'animation de chute se termine, et le bois est ramassé automatiquement pendant la pause.",
              k: "reason",
            },
            {
              t: "Utilise toujours cette stratégie en abattant les arbres (pas les souches).",
              k: "tip",
            },
            {
              t: "Si tu perds le compte des arbres, vérifie l'onglet Compétences pour la montée de niveau de Cueillette.",
              k: "tip",
            },
            { t: "C'est aussi utile pour la pêche de demain.", k: "tip" },
          ],
        },
        "Une fois Cueillette 1 atteint, fabrique un coffre et place-le à côté de ta maison, puis vide ton inventaire en ne gardant que la faux, la hache, la pioche et la houe.",
        "Sors vers la forêt au sud. (Il est environ 9h20.)",
        {
          t: "Utilise une capture d'écran/un zoom pour repérer les objets à cueillir dans la Forêt Sève-Cendreuse et planifier ton itinéraire.",
          c: [
            "Ramasse tous les objets à cueillir au passage.",
            {
              t: "Si cela ne gaspille pas de gains d'énergie, tu peux manger les oignons nouveaux en les cueillant pour libérer de la place dans l'inventaire.",
              k: "tip",
            },
            {
              t: "Coupe autant de mauvaises herbes que possible, mais ne fais pas un grand détour pour une seule.",
              k: "tip",
            },
            { t: "Tu dois rencontrer Marnie avant 12h50.", k: "reason" },
          ],
        },
        {
          t: "Rencontre Jas pendant qu'elle va de sa maison à l'endroit de la corde à sauter.",
          time: "11h20",
        },
        {
          t: "Rencontre Haley en route vers l'endroit des photos au sud-ouest. Si tu es en avance, c'est un bon moment pour couper plus de mauvaises herbes.",
          time: "11h40",
        },
        "Va en ville.",
        {
          t: "Vérifie les deux poubelles près des maisons de Jodi et Haley, et dégage les mauvaises herbes entre les deux s'il reste du temps.",
          c: [
            {
              t: "Mettre en pause juste après avoir fouillé une poubelle est optimal.",
              k: "tip",
            },
            {
              t: "Cela évite de perdre du temps quand les objets sautent du côté opposé.",
              k: "reason",
            },
            {
              t: "C'est similaire à la stratégie de pause pour les arbres qui tombent.",
              k: "tip",
            },
            {
              t: "Fouiller les poubelles gaspille beaucoup de temps, donc l'itinéraire ne le fait que les deux premiers jours.",
              k: "tip",
            },
          ],
        },
        {
          t: "Rencontre Marnie pendant qu'elle marche du Magasin général de Pierre vers le ranch (elle passe devant la maison d'Emily).",
          time: "12h50",
        },
        "Va à la plage.",
        {
          t: "Bêche les emplacements d'artéfacts pour viser ton premier artéfact.",
          c: [
            "Laisse les objets à cueillir de la plage au sol.",
            {
              t: "Tu manques de place dans l'inventaire pour l'instant et tu peux les ramasser le 2 printemps.",
              k: "reason",
            },
          ],
        },
        {
          t: "Rencontre Elliott près du feu de camp au sud de sa cabane.",
          time: "12h00",
        },
        "Va en ville.",
        "Si tu as obtenu un artéfact, fais-en don au Musée et réclame la récompense (250g).",
        "Vérifie les poubelles près du Musée et du Forgeron.",
        {
          t: "Rencontre Clint dans le Forgeron.",
          c: [{ t: "Repars vers l'est.", k: "tip" }],
        },
        "Vérifie la poubelle près du Marché Joja.",
        {
          t: "Rencontre Pam, Sam et Shane dans le Marché Joja.",
          c: [
            {
              t: "Sam et Shane comptent comme rencontrés même pendant qu'ils travaillent.",
              k: "reason",
            },
          ],
        },
        "Dégage les mauvaises herbes derrière (au nord) le Marché Joja.",
        "Rencontre Abigail sur le pont.",
        {
          t: "Si Maru marche vers le sud et est à proximité, parle-lui maintenant ; sinon rencontre-la plus tard quand elle est assise sur le banc.",
          time: "15h20",
        },
        "Vérifie la poubelle près de la maison de Lewis.",
        "Rencontre Evelyn (jardin de fleurs), Caroline + Jodi (place centrale) et Vincent + Harvey (au-dessus de la maison de Jodi).",
        "Coupe les mauvaises herbes du côté ouest de la carte près de Harvey.",
        {
          t: "Rencontre Leah + Pierre dans le Magasin général de Pierre.",
          c: [
            {
              t: "Tu dois passer derrière le comptoir pour parler à Pierre.",
              k: "tip",
            },
            {
              t: "N'achète rien chez Pierre aujourd'hui, car tu achèteras les cultures de printemps les 5-6 printemps.",
              k: "tip",
            },
          ],
        },
        {
          t: "Rencontre tous les autres près du Saloon.",
          time: "~16h00",
          c: [
            {
              t: "À 16h00, Alex finit de s'entraîner et quitte sa chambre. Vérifie la poubelle près de la maison et entre pour rencontrer George et Alex.",
              c: [
                {
                  t: "Si tu es en avance, tu devras peut-être attendre qu'Alex quitte sa chambre.",
                  k: "tip",
                },
              ],
            },
            {
              t: "À 16h00, Emily arrive au Saloon. Vérifie la poubelle près du Saloon et entre pour rencontrer Gus et Emily.",
              c: [{ t: "Pour Gus, tu dois passer derrière le comptoir.", k: "tip" }],
            },
            "À 16h20, Penny passe la clôture de Lewis et Alex quitte la maison.",
            "À 16h40, Penny arrive au banc avec Maru. Si tu ne les as pas encore rencontrées, fais-le là.",
            "Vérifie ton journal de quêtes pour confirmer que tu as rencontré 24 personnes sur 27 aujourd'hui.",
          ],
        },
        {
          t: "Retourne à la ferme.",
          c: [
            {
              t: "Laisse pour l'instant les objets à cueillir au sol à l'arrêt de bus.",
              k: "tip",
            },
          ],
        },
        "Vide ton inventaire. Garde tes outils.",
        "Coupe les mauvaises herbes de la ferme jusqu'à environ 18h00.",
        "Sors vers les bois de derrière vers 18h10.",
        "Rencontre Linus devant sa tente.",
        {
          t: "Rencontre Demetrius au sud-est de sa maison.",
          c: [
            {
              t: "Tu as déjà rencontré Robine, donc pas besoin de lui parler.",
              k: "reason",
            },
          ],
        },
        {
          t: "Rencontre Sebastian quand il quitte la maison.",
          c: [
            {
              t: "Si tu arrives avant 19h00, tu devras attendre qu'il sorte de sa chambre à 18h40.",
              k: "tip",
            },
            {
              t: "C'est du temps perdu que tu aurais pu passer à couper plus de mauvaises herbes à la ferme.",
              k: "reason",
            },
          ],
        },
        "Va au sud vers le Centre communautaire.",
        "Coupe les mauvaises herbes à l'ouest du Centre communautaire.",
        "Coupe les mauvaises herbes à l'ouest de la fontaine.",
        {
          t: "Rentre chez toi.",
          c: [
            {
              t: "Ramasse les objets à cueillir de l'arrêt de bus que tu as laissés plus tôt.",
              k: "tip",
            },
          ],
        },
        {
          t: "Bêche, plante et arrose les graines de panais + le mélange de graines.",
          c: [
            {
              t: "Planter des cultures au-delà des 15 graines de panais initiales signifie que les corbeaux peuvent en manger une ou plusieurs chaque jour. Mais planter le mélange de graines vaut la valeur supplémentaire. (Le chou-fleur et la pomme de terre du mélange de graines t'évitent de les acheter pour le lot de cultures de printemps plus tard.)",
              k: "tip",
            },
          ],
        },
        "Abats des arbres jusqu'à ce qu'il te reste 4 à 6 d'énergie.",
        {
          t: "Coupe les mauvaises herbes et l'herbe jusqu'à 1h00-1h30, selon le nombre de mélanges de graines que tu as.",
          c: [
            {
              t: "Tu dois bêcher, planter et arroser tout le mélange de graines avant 2h00.",
              k: "warn",
            },
          ],
        },
        {
          t: "Rentre chez toi et expédie tout sauf :",
          c: ["Amas de pierres", "Bois", "Charbon", "20 de fibre"],
        },
        {
          t: "Remarque :",
          k: "tip",
          c: [
            {
              t: "Vends tous les objets à cueillir sauf les oignons nouveaux. Occupe-toi des lots du Centre communautaire plus tard. Demain, tu as besoin d'autant d'argent que possible.",
              k: "tip",
            },
            {
              t: "Normalement tu manges les poireaux, les pissenlits et la nourriture des poubelles (faible GPE) au lieu de les vendre, mais aujourd'hui l'argent est urgent, c'est donc une exception.",
              k: "tip",
            },
          ],
        },
        {
          t: "Bêche, plante et arrose le mélange de graines restant.",
          c: [
            {
              t: "Même si tu te surmènes sous 0 d'énergie et que tu t'évanouis, tu montes de niveau en Cueillette le 2 printemps, donc aucune pénalité n'est reportée.",
              k: "tip",
            },
            {
              t: "Si l'un des mélanges de graines n'est pas un chou-fleur (vérifie avec un mod ou le wiki), tu devras repousser la première remise de lot et l'expédition d'or supplémentaire pour le coffre-fort — prévue pour le 15 printemps — au 17 printemps.",
              k: "warn",
            },
            {
              t: "Un manque de wagonnets ajoute une légère pression temporelle pour terminer les Mines, mais c'est très rare et ne change pas l'itinéraire.",
              k: "tip",
            },
          ],
        },
        {
          t: "Sois à l'intérieur de ta maison.",
          time: "juste avant 2h00",
          c: [{ t: "Pour éviter la pénalité d'or.", k: "reason" }],
        },
        {
          t: "Détruis le lit.",
          c: [
            {
              t: "Tu apparais juste à côté de la porte chaque matin, ce qui fait gagner du temps.",
              k: "reason",
            },
            {
              t: "Ou retire-le de la maison et garde-le dans un coffre.",
              k: "tip",
            },
          ],
        },
        {
          t: "Déplace la télé à côté de la porte.",
          c: [{ t: "Pour la consulter dès le réveil.", k: "reason" }],
        },
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Cueillette 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Lis tout ton courrier.",
          c: [
            {
              t: "Tu dois lire la lettre de Willy pour obtenir la canne à pêche en bambou.",
              k: "reason",
            },
          ],
        },
        "Arrose tes cultures.",
        {
          t: "Fabrique un coffre et emporte-le.",
          c: [
            {
              t: "Le 1 printemps, tu n'as peut-être obtenu que 0-3 oignons nouveaux (et aucune nourriture de poubelle) et n'as pas abattu 50 de bois. Abats-en 50 maintenant et poursuis l'itinéraire. Note simplement que tout est légèrement retardé.",
              k: "tip",
            },
          ],
        },
        "Vide tout ton inventaire dans le coffre. Prends la houe + le coffre fabriqué + 1 amas de pierres.",
        {
          t: "Vérifie les poubelles près de la maison de George, du Saloon et de la maison de Lewis.",
          c: [
            {
              t: "Ce n'est pas grave si les villageois te surprennent : l'amitié de chaque PNJ est encore à 0.",
              k: "reason",
            },
            {
              t: "C'est la dernière fois que tu fais un détour pour les poubelles. Elles gaspillent beaucoup de temps, donc ensuite ne les vérifie que quand cela ne coûte aucun temps supplémentaire.",
              k: "tip",
            },
          ],
        },
        "Va à la plage et reçois la canne à pêche en bambou.",
        "Donne l'amas de pierres à Willy et réclame la récompense de la quête « Comment se faire des amis » (100g).",
        "Place le coffre dans le coin inférieur droit de la jetée.",
        "Pêche depuis la jetée face à l'est. Lance à distance maximale.",
        {
          t: "À 8h40, détruis la canne à pêche en bambou et vérifie le reste des objets à cueillir de la plage + les emplacements d'artéfacts.",
          c: [
            {
              t: "Si tu obtiens un artéfact maintenant et que tu n'en avais pas le 1 printemps, fais-en don immédiatement pour la récompense (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Va à la boutique de Willy. Vends tous les objets à cueillir de la plage + le poisson. Achète la canne à pêche d'apprenti (25g) à Willy.",
          c: [
            {
              t: "La canne à pêche d'apprenti augmente ta chance de capture parfaite. (Monter Pêche avec des captures parfaites compte plus que le poisson de haute qualité.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Avec la canne à pêche d'apprenti, lance à distance minimale juste au sud de la porte de Willy. Réunis assez de poisson pour atteindre 1,800g.",
          c: [
            {
              t: "Les lancers à distance minimale ont plus de chance de poissons faciles et raccourcissent les animations de lancer/moulinet.",
              k: "reason",
            },
            { t: "Voir aussi la « Stratégie générale de pêche ».", k: "tip" },
          ],
        },
        "Quand les algues (1.54 GPE) et le Joja Cola (1.92 GPE) sont épuisés, mange l'anchois (1.82 GPE) ou le hareng (1.82 GPE) de la plus haute qualité.",
        {
          t: "Une fois que tu as assez de poisson pour 1,800g et que tu atteins Pêche niveau 2, détruis la canne à pêche d'apprenti, vends tout le poisson et achète la canne à pêche en fibre de verre à Willy. Achète aussi autant d'appât que possible (5g chacun) et équipe-le sur la nouvelle canne.",
          c: [
            {
              t: "Les captures parfaites diminuent, mais grâce à l'appât, la canne à pêche en fibre de verre donne de l'expérience plus vite.",
              k: "reason",
            },
          ],
        },
        "Pêche au même endroit avec des lancers à distance maximale.",
        {
          t: "À 16h30, si la canne a moins de 35 d'appât, va en acheter plus à Willy.",
          c: [
            {
              t: "Tu as besoin d'assez d'appât pour le reste d'aujourd'hui plus demain matin.",
              k: "reason",
            },
          ],
        },
        "Pêche jusqu'à 2h00. Mets tout le poisson dans le coffre avant de t'évanouir. (Vends-le à Willy demain.)",
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Pêche 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "Le 3 printemps, il pleut toujours.",
        "Vide tout ton inventaire dans le coffre. Prends la canne à pêche en fibre de verre.",
        "Si tu as 80+ d'appât et que tu as obtenu du minerai de cuivre du coffre de pêche du 2 printemps, fabrique un coffre, emporte-le et va directement à la rivière de la Forêt Sève-Cendreuse pour pêcher. Pense à quitter brièvement le guide pour acheter plus d'appât à Willy avant d'aller au Lac de montagne demain.",
        {
          t: "Sinon :",
          c: [
            "Prends la houe du coffre.",
            "Pêche au sud de la maison de Leah jusqu'à 8h30 ou jusqu'à ce que tu sois à court d'appât (selon ce qui arrive en premier).",
            "Vérifie les poubelles au sud des maisons de Jodi et Emily.",
            "Vérifie les objets à cueillir + les emplacements d'artéfacts à la plage.",
            {
              t: "Vends tout le poisson + les objets à cueillir de plage en trop à la boutique de Willy.",
              c: [
                {
                  t: "Si tu veux, tu peux garder une sardine pour le lot de poissons de mer.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Achète de l'appât jusqu'à ce qu'il ne te reste que 75g.",
              c: [
                {
                  t: "Si tu as déjà trouvé du minerai de cuivre dans le coffre de pêche, tu peux dépenser tout ton argent en appât.",
                  k: "tip",
                },
                {
                  t: "La quantité d'appât que tu peux acheter ici varie (500-700) selon ta partie, mais quoi que tu achètes, tu l'utiliseras entièrement avant la fin du printemps.",
                  k: "tip",
                },
                {
                  t: "Techniquement, tu pourrais repousser la vente d'une partie du poisson jusqu'à obtenir la profession Pêcheur. Mais il y a trois problèmes. D'abord, cela ne vaut le coup que si tu gagnes plus d'environ une heure de pêche au Lac de montagne. Ensuite, le nombre de poissons que tu peux porter en t'évanouissant à la fin du 3 printemps est limité. Enfin, la prochaine occasion pratique d'acheter de l'appât est après avoir déposé la pioche le 5 printemps, un jour avec presque aucun temps libre. Vendre maintenant est donc plus simple dans l'ensemble et bien moins risqué.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Vide le contenu du coffre et ramasse le coffre.",
              c: [
                {
                  t: "Pour le faire sans coût d'énergie, sélectionne un emplacement vide de la barre d'outils et spamme le clic gauche.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Si tu as gardé 75g, va voir Clint et achète du minerai de cuivre (75g) pour déclencher la scène de Clint demain.",
              c: [{ t: "Pas besoin de le poser au sol.", k: "tip" }],
            },
            "Va à la rivière de la Forêt Sève-Cendreuse.",
          ],
        },
        {
          t: "Le meilleur spot de pêche à la rivière de la Forêt Sève-Cendreuse est 6 cases à l'ouest de la porte de Leah, en lançant au sud. Place le coffre une case au nord-est de toi.",
          c: [
            {
              t: "Vise l'eau profonde à l'est de la petite île (voir l'image « zone de pêche en rivière » du wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pêche jusqu'à 2h00. Avant de t'évanouir, remplis ton inventaire avec la canne + les gemmes + le minerai + le charbon + le poisson le plus précieux.",
          c: [
            {
              t: "Tu ne reviendras à ce coffre que le 7 printemps (ou un jour de pluie plus tôt).",
              k: "tip",
            },
          ],
        },
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Pêche 4 → 6 (choisis la profession Pêcheur)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Vérifie la météo de demain à la télé chaque jour et planifie en conséquence.",
          c: [
            {
              t: "Par exemple, si tu pêches au Lac de montagne et qu'il ne pleuvra pas demain, tu peux laisser la canne dans le coffre.",
              k: "tip",
            },
          ],
        },
        "Arrose tes cultures.",
        {
          t: "Si tu as moins de 150 de bois, abats jusqu'à 150.",
          c: [
            { t: "Emporte la faux en abattant pour couper aussi l'herbe.", k: "tip" },
            {
              t: "Tu auras besoin de 2 coffres et d'un épouvantail au cours des deux prochains jours.",
              k: "reason",
            },
          ],
        },
        "Fabrique un coffre et emporte-le.",
        "Vide ton inventaire. Prends la canne à pêche en fibre de verre + le coffre fabriqué.",
        {
          t: "Va au Lac de montagne. Le meilleur spot est près de la longue clôture en bas de l'écran, en lançant à l'est. Place le coffre trois cases derrière toi.",
          c: [
            {
              t: "Vise l'eau profonde près du tronc immergé (voir l'image « zone de pêche en lac » du wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pêche jusqu'à 1h00. Remplis ton inventaire avec des gemmes, du minerai, du charbon et le poisson le plus précieux.",
          c: [
            {
              t: "À moins qu'il ne pleuve demain, tu peux laisser la canne à pêche en fibre de verre dans le coffre.",
              k: "tip",
            },
          ],
        },
        "Rentre chez toi.",
        {
          t: "Expédie tout ce qui est vendable (gemmes, poisson, etc.).",
          c: [
            { t: "Garde des chevesnes à manger.", k: "tip" },
            {
              t: "Garde un de chaque poisson utilisé dans les lots du Centre communautaire.",
              k: "tip",
            },
            {
              t: "Garde le jade, l'émeraude, le rubis et le diamant pour la Caverne du Crâne plus tard.",
              k: "tip",
            },
          ],
        },
        "Il sera 2h00 juste après la vente. Sinon, coupe de l'herbe et évanouis-toi.",
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Pêche 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Vérifie la bonne aventure du jour à la télé chaque jour.",
        "Accepte ou refuse l'animal de compagnie. (Voir « Mécaniques d'animal ».)",
        "Récolte les panais et note combien tu en as récoltés.",
        {
          t: "Note quels mélanges de graines tu as plantés.",
          c: [
            {
              t: "Tu peux le savoir à l'apparence de la graine ou avec un mod.",
              k: "tip",
            },
          ],
        },
        "Réclame la récompense de la quête du panais (100g).",
        "N'arrose pas le mélange de graines restant avant plus tard aujourd'hui.",
        "Fabrique un coffre et emporte-le.",
        "Si tu as du minerai de fer ou du minerai d'or, note combien. (Ils viennent au hasard du coffre de pêche.)",
        {
          t: "Du coffre, prends tout sauf la pioche + les gemmes + l'amas de pierres + le charbon + le cuivre + 3 panais.",
          c: [
            {
              t: "Garde le jade, l'émeraude, le rubis et le diamant pour la Caverne du Crâne.",
              k: "tip",
            },
            {
              t: "Tu as besoin de panais : 1 pour un lot, 1 à expédier (facultatif), 1 pour Pam (facultatif).",
              k: "reason",
            },
            { t: "Tu peux garder un charbon pour l'épouvantail de demain.", k: "tip" },
          ],
        },
        "Va aux Mines.",
        "Place le coffre à gauche de l'ascenseur.",
        "Descends au niveau 10. (Voir « Stratégie générale des mines ».)",
        {
          t: "Dès que tu as 25 de minerai de cuivre et 25 d'amas de pierres, remonte au niveau 0, fabrique une fournaise et fonds des lingots de cuivre.",
          c: [
            {
              t: "N'attends pas le prochain ascenseur sauf s'il est vraiment proche.",
              k: "tip",
            },
          ],
        },
        "Garde la fournaise en marche jusqu'à avoir 5 lingots. Tu dois terminer les 5 au plus tard à 15h00.",
        {
          t: "Une fois au niveau 10, mine du minerai de cuivre en répétant le niveau 11 pendant que les lingots restants fondent.",
          c: [
            {
              t: "Tu ne peux probablement pas atteindre le niveau 15 avant 15h00.",
              k: "reason",
            },
          ],
        },
        {
          t: "Dès que les 5 lingots sont prêts :",
          c: [
            {
              t: "Laisse l'épée + les panais dans le coffre.",
              c: [
                {
                  t: "Tu ne reviendras à ce coffre que le 11 printemps.",
                  k: "tip",
                },
              ],
            },
            "Prends la fournaise + les gemmes + le bazar. Garde 4 emplacements d'inventaire libres.",
            "Si tu n'as pas laissé de charbon à la ferme, prends-en un pour l'épouvantail de demain.",
            "Va au Forgeron.",
          ],
        },
        {
          t: "Si tu es trop en retard pour fondre le 5e lingot, tu peux atteindre le Forgeron pour 16h00, y placer une fournaise, fondre le 5e lingot et attendre 30 minutes. Tant que tu es dans le bâtiment, Clint vend jusqu'à 19h10.",
          k: "tip",
          c: [
            {
              t: "Cependant, c'est considéré comme un bug, donc pour éviter de tricher, achète ce qu'il te faut avant que Clint ne quitte le comptoir.",
              k: "warn",
            },
          ],
        },
        {
          t: "Si tu n'arrives pas à faire les lingots à temps ou à atteindre le Forgeron avant la fermeture, passe le reste du temps à pêcher. L'itinéraire est alors décalé d'un jour.",
          c: [
            {
              t: "Ce n'est pas une erreur aussi grave qu'il n'y paraît, puisque tu pêcheras beaucoup de toute façon pour des fonds supplémentaires.",
              k: "reason",
            },
          ],
        },
        "Les Mines donnent des géodes, des géodes gelées et des géodes de lave. D'après les calculs, payer Clint 25g pour les ouvrir vaut plus en moyenne, mais le coût d'opportunité d'aller au Forgeron en milieu de journée dépasse largement ce gain. Expédie donc toutes les géodes pour de l'argent supplémentaire. (Occupe-toi des minéraux/du Musée en fin de partie.)",
        {
          t: "Au Forgeron :",
          c: [
            "Vends tes gemmes.",
            {
              t: "Garde au moins 3,310g, et avec le reste :",
              c: [
                "Achète jusqu'à 25 de minerai de fer (y compris le minerai de la pêche) (25 × 150g = 3,750g).",
                "Achète jusqu'à 25 de minerai d'or (y compris le minerai de la pêche) (25 × 400g = 10,000g). (À ce stade tu n'auras presque pas d'argent pour le minerai d'or, et ce n'est pas grave.)",
              ],
            },
          ],
        },
        {
          t: "À quoi servent les 3,310g :",
          c: [
            "2,000g pour l'amélioration de la pioche.",
            {
              t: "1,120g pour 16 graines de chou frisé pour Agriculture niveau 2 (380 d'expérience au total). (Tu peux acheter moins de chou frisé si tu tiens compte de l'expérience du mélange de graines et des germes de riz.)",
              c: [
                "8 d'expérience par panais × 15 = 120 d'expérience",
                "380 d'expérience − 120 d'expérience = 260 d'expérience",
                "260 d'expérience / 17 d'expérience par chou frisé = 16 de chou frisé",
                "16 graines de chou frisé × 70g = 1,120g",
              ],
            },
            "60g pour 1 graines d'haricot.",
            "80g pour 1 graines de chou-fleur (pas nécessaire si tu en as obtenu un d'un mélange de graines).",
            "50g pour 1 graines de pomme de terre (pas nécessaire si tu en as obtenu une d'un mélange de graines).",
          ],
        },
        "Améliore vers la pioche de cuivre (2,000g).",
        {
          t: "Va voir Pierre et achète :",
          c: [
            "1 graines d'haricot (60g)",
            "1 graines de chou-fleur (80g) (pas nécessaire si tu en as obtenu un d'un mélange de graines)",
            "1 graines de pomme de terre (50g) (pas nécessaire si tu en as obtenu une d'un mélange de graines)",
            "16 graines de chou frisé (1,120g)",
            "Achète des graines de chou frisé supplémentaires avec l'argent restant.",
          ],
        },
        "Même si tu n'atteins pas Pierre avant la fermeture, l'itinéraire ne change pas vraiment. Achète et plante simplement les graines demain.",
        "Rentre chez toi.",
        "Plante et arrose.",
        "Prends la canne à pêche en fibre de verre + la fournaise + le minerai de fer + le minerai d'or + le charbon + les chevesnes.",
        "Va au Lac de montagne.",
        "Place la fournaise à côté du coffre. Fonds 5 lingots de fer pendant que tu pêches.",
        {
          t: "Pêche jusqu'à 2h00. Avant de t'évanouir, remplis ton inventaire avec les objets les plus précieux.",
          c: [
            {
              t: "Laisse le minerai de fer + le minerai d'or restant dans le coffre du Lac de montagne.",
              c: [
                { t: "Prends la fournaise s'il pleut demain.", k: "tip" },
              ],
            },
            "Note combien de minerai d'or tu as.",
          ],
        },
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Agriculture 0 → 1", "Extraction minière 0 → 1", "Pêche 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Arrose tes cultures.",
          c: [
            {
              t: "Si les corbeaux ont mangé tes cultures de lot de printemps, note-le et rachète des graines à Pierre quand c'est pratique.",
              k: "tip",
            },
          ],
        },
        "Fabrique et place un épouvantail.",
        "Abats des arbres jusqu'à 7h40.",
        "Vide ton inventaire et prends la canne à pêche en fibre de verre.",
        {
          t: "Entre en ville depuis l'arrêt de bus. La scène du Centre communautaire se déclenche. Ne la saute pas.",
          k: "warn",
          c: [
            {
              t: "Si tu la sautes, tu es placé à l'entrée de la ville ; si tu la regardes, tu es placé à côté du Centre communautaire.",
              k: "reason",
            },
          ],
        },
        "Entre dans le Centre communautaire et touche le piédestal du Parchemin doré (démarre la quête).",
        "Va au Lac de montagne et pêche jusqu'à 1h00. Remplis ton inventaire avec 5 lingots de fer + les objets vendables les plus précieux.",
        "Rentre chez toi.",
        {
          t: "Parmi ce qui est vendable, expédie assez pour l'amélioration de la pioche d'acier (5,000g), et expédie aussi assez d'or pour acheter jusqu'à 25 de minerai d'or.",
          c: [
            { t: "Si tu manques, vends des chevesnes. (Vends d'abord la basse qualité.)", k: "tip" },
          ],
        },
        "Il sera 2h00 juste après la vente. Sinon, coupe de l'herbe et évanouis-toi.",
      ],
    },
    7: {
      items: [
        "Vérifie La reine des sauces pour la recette du Sauté.",
        "Vérifie ton courrier jusqu'à recevoir la lettre du Sorcier.",
        "Arrose tes cultures.",
        "Vide ton inventaire. Prends les 5 lingots de fer.",
        {
          t: "Va voir le Sorcier (déclenche une scène).",
          c: [
            {
              t: "Regarder la scène ne compte pas comme rencontrer le Sorcier. Tu dois lui parler après la scène pour que son nom apparaisse dans l'onglet Social. Mais c'est purement esthétique sans réel avantage, alors considère cela comme une perte de temps.",
              k: "tip",
            },
          ],
        },
        "Vide le contenu du coffre de la rivière de la Forêt Sève-Cendreuse (facultatif).",
        {
          t: "Va au Forgeron :",
          c: [
            "Achète jusqu'à 25 de minerai d'or (y compris le minerai de la pêche).",
            "Améliore vers la pioche d'acier (5,000g).",
          ],
        },
        "Pêche au Lac de montagne jusqu'à 2h00, puis évanouis-toi. Fonds des lingots d'or pendant que tu pêches. Fonds-en 2-3, et un de plus sera dans la fournaise quand tu t'évanouiras.",
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Pêche 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Si la scène de la grotte apparaît, choisis les champignons. (Voir « Notes diverses ».)",
        "Arrose tes cultures.",
        {
          t: "Parmi ce qui est vendable, expédie assez pour atteindre 12,000g.",
          c: [
            {
              t: "C'est pour l'amélioration de la pioche d'or (10,000g) + l'amélioration du sac à dos (2,000g).",
              k: "reason",
            },
            {
              t: "Si tu manques, rentre chez toi avant la fin de la journée et expédie le poisson que tu as pêché ce jour-là pour combler la différence.",
              k: "tip",
            },
          ],
        },
        "Pêche au Lac de montagne jusqu'à 2h00, puis évanouis-toi. Fonds des lingots d'or pendant que tu pêches jusqu'à en avoir 5 au total. Tu devrais tenir ces lingots quand tu t'évanouis.",
        {
          t: "C'est le premier jour depuis le début où tu ne montes aucune compétence, alors ne te surmène pas.",
          c: [
            {
              t: "Tu devrais te réveiller à 50% d'énergie, pas à 0%.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Arrose tes cultures.",
        "Abats des arbres jusqu'à environ 8h00.",
        "Vide ton inventaire. Prends la canne à pêche en fibre de verre.",
        "Va au Forgeron et améliore vers la pioche d'or (10,000g).",
        "Va voir Pierre et améliore ton sac à dos (2,000g).",
        "Pêche au Lac de montagne jusqu'à 2h00, puis évanouis-toi.",
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Pêche 9 → 10 (choisis la profession Pêcheur)"],
        },
        "Même si tu n'atteins pas Pêche 10 aujourd'hui, tu l'auras au prochain jour de pêche. L'itinéraire ne change pas vraiment.",
      ],
    },
    10: {
      items: [
        "Arrose tes cultures.",
        "Prends des champignons de la grotte.",
        {
          t: "Calcule le chou frisé supplémentaire nécessaire pour Agriculture niveau 6.",
          c: [
            "8 d'expérience par panais × 15 = 120 d'expérience",
            "17 d'expérience par chou frisé × 16 = 272 d'expérience",
            "3,300 d'expérience au total − 120 − 272 = 2,908 d'expérience nécessaire",
            "2,908 d'expérience / 17 = 172 de chou frisé",
            "172 graines de chou frisé × 70g = 12,040g",
          ],
        },
        {
          t: "Si tu as Pêche niveau 10, expédie assez de poisson pour acheter la moitié des graines de chou frisé dont tu as besoin (6,020g).",
          c: [
            {
              t: "Deux lots est optimal pour ne pas fabriquer plus d'arroseurs que nécessaire. Ainsi tu sécurises autant de lingots de fer que possible pour les arroseurs de qualité le 28 printemps.",
              k: "reason",
            },
          ],
        },
        {
          t: "Si tu n'as pas Pêche niveau 10, n'expédie pas le poisson maintenant. Vends-le directement à Willy demain.",
          c: [{ t: "Tu perdrais 25% de l'or.", k: "reason" }],
        },
        "Vide ton inventaire. Prends la canne à pêche en fibre de verre.",
        "Si la canne a moins de 100 d'appât, prends aussi quelques poissons. Pêche quelques heures au Lac de montagne jusqu'à 9h00, puis vends du poisson à Willy et achète plus d'appât.",
        "Pêche au Lac de montagne jusqu'à 2h00, puis évanouis-toi. N'oublie pas de prendre la fournaise pour les Mines de demain.",
      ],
    },
    11: {
      items: [
        "Récolte le chou frisé. (Tu atteins Agriculture niveau 2.)",
        {
          t: "Commence à bêcher les cases selon un motif d'arroseurs.",
          c: [{ t: "N'arrose aucune case.", k: "warn" }],
        },
        "Quitte la ferme vers 8h00.",
        "Si tu n'as pas expédié de poisson hier, vends-le à Willy.",
        "Va au Forgeron et récupère la pioche d'or.",
        "Va voir Pierre et achète autant de graines de chou frisé que calculé (6,020g).",
        {
          t: "Retourne à la ferme et termine le bêchage + la plantation.",
          c: [
            { t: "N'arrose aucune case.", k: "warn" },
            {
              t: "Optionnellement, fabrique un chemin pavé pour marquer où iront les futurs arroseurs.",
              k: "tip",
            },
            { t: "Le chou frisé n'a pas besoin d'arrosage avant le 14 printemps.", k: "tip" },
          ],
        },
        "Va aux Mines et place une fournaise. Continue à fondre des lingots.",
        {
          t: "Mine jusqu'à 2h00, puis évanouis-toi.",
          c: [
            {
              t: "À mesure que tu réunis plus de cuivre, fabrique 3 fournaises de plus (4 au total).",
              k: "tip",
            },
          ],
        },
        {
          t: "À la fin de la journée, tu obtiens :",
          k: "result",
          c: ["Agriculture 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Prends des champignons de la grotte.",
        "Mine jusqu'à 2h00, puis évanouis-toi. Fonds du cuivre et du fer pendant que tu mines.",
        "Quand tu atteins Extraction minière niveau 5, choisis la profession Mineur.",
      ],
    },
    13: {
      items: [
        "Mine jusqu'à 2h00, puis évanouis-toi.",
        {
          t: "Il n'y a rien dont tu aies besoin à la Fête des Œufs, alors y aller est une perte de temps. L'exception est si tu vises le défi d'expédier chaque objet jusqu'à la fin de l'année 1, auquel cas il te faut une graine de fraise ou deux.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Vérifie La reine des sauces pour la recette de la Salade de chou.",
        "Prends des champignons de la grotte.",
        "Sois aux Mines avant 0h00.",
        "S'il te manque le minerai restant pour les arroseurs, mine du minerai au niveau 21/41 avant de descendre plus bas.",
        {
          t: "Une fois au fond des Mines, retourne miner du minerai.",
          c: [
            {
              t: "Selon la compétence, la chance et si tu fais des pauses pêche les jours de pluie, tu peux atteindre le niveau 120 entre les 14-18 printemps.",
              k: "tip",
            },
            {
              t: "Une fois tous les arroseurs (normaux) fabriqués, le minerai de cuivre n'est nécessaire que pour les améliorations d'outils. Les arroseurs de qualité nécessitent beaucoup de minerai de fer et d'or.",
              k: "tip",
            },
          ],
        },
        {
          t: "À 0h00, rentre chez toi et fabrique + place autant d'arroseurs que possible.",
          c: [{ t: "Ce n'est pas grave s'ils ne couvrent pas toutes les cultures.", k: "tip" }],
        },
        {
          t: "Expédie des objets pour atteindre 42,500g.",
          c: [
            {
              t: "Si tu manques, vise seulement 32,500g et saute le lot de 10,000g de demain. (Tu manqueras probablement dans la plupart des parties.)",
              k: "tip",
            },
          ],
        },
        "Il sera 2h00 juste après. Sinon, coupe de l'herbe et évanouis-toi.",
      ],
    },
    15: {
      items: [
        {
          t: "Les baies de saumon commencent à apparaître aujourd'hui, mais ne fais pas un grand détour pour les récolter.",
          c: [
            { t: "Le temps ne vaut pas le faible gain d'énergie.", k: "reason" },
            {
              t: "Utilise la même stratégie de pause sur les buissons de baies de saumon que sur les poubelles.",
              k: "tip",
            },
          ],
        },
        "Arrose les cultures que les arroseurs ne couvrent pas encore (s'il y en a).",
        "Vide ton inventaire. Prends les objets pour les lots de cueillette de printemps (4), cultures de printemps (4), forgeron (3), géologue (4) et aventurier (2).",
        {
          t: "Va au Centre communautaire et complète les lots avec ces objets.",
          c: [
            {
              t: "Après avoir complété les deux lots de la Chaufferie, n'oublie pas de quitter le Parchemin doré pour ne pas rester bloqué dans la scène boguée.",
              k: "warn",
            },
          ],
        },
        "Si tu as assez d'argent (42,500g), complète aussi le lot du coffre-fort.",
        "Rentre chez toi, place un cristalarium et mets un diamant dedans.",
        "Vide ton inventaire et va aux Mines.",
        "S'il te manque le minerai restant pour les arroseurs, mine du minerai au niveau 21/41 avant de descendre plus bas.",
        "Mine jusqu'à 2h00, puis évanouis-toi. S'il te faut encore plus d'arroseurs, n'oublie pas de garder les lingots fondus dans ton inventaire.",
        "À la fin de la journée, les wagonnets sont débloqués.",
      ],
    },
    16: {
      items: [
        "Prends des champignons de la grotte.",
        "Arrose les cultures que les arroseurs ne couvrent pas encore (s'il y en a).",
        "Fabrique plus d'arroseurs avec les lingots fondus d'hier (si nécessaire).",
        {
          t: "Mine jusqu'à 2h00.",
          c: [
            {
              t: "N'oublie pas d'utiliser le wagonnet pour voyager plus vite.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["Après le 17 printemps, le guide devient moins précis ici."],
      items: [
        "Si tu n'as pas encore atteint le niveau 120 des Mines, termine-le le plus vite possible.",
        {
          t: "De plus, s'il te faut plus d'or pour finir le coffre-fort (42,500g), pêche au Lac de montagne pour le compléter le plus vite possible.",
          c: [
            {
              t: "S'il te reste les deux, synchronise-les pour qu'ils se terminent le même jour.",
              k: "tip",
              c: [
                {
                  t: "Le bus n'est réparé que le lendemain.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Une fois le niveau 120 des Mines atteint, déplace toutes les fournaises des Mines vers la ferme.",
        "Fais la Caverne du Crâne aussi vite et aussi souvent que possible. (Voir « Stratégie générale de la Caverne du Crâne ».)",
        {
          t: "Pendant ton temps libre :",
          c: [
            "Commence à dégager les débris de la ferme là où iront les arroseurs de qualité + la carambole.",
            "Fabrique et pose un revêtement de sol là où iront les arroseurs de qualité.",
            "Fabrique et place des épouvantails.",
            "Fabrique plus de fournaises avec le cuivre en trop.",
            "Démarre une forêt de chênes en plantant des glands dans un coin de la ferme.",
            "Mine plus de minerai dans les Mines (niveaux 20/40/80).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Expédie des objets pour :",
          c: [
            "2,000g pour l'amélioration de la hache de cuivre.",
            "Assez d'or pour acheter le 2e lot de graines de chou frisé (70g chacune).",
          ],
        },
      ],
    },
    19: {
      items: [
        "À 9h00, va voir Clint et améliore vers la hache de cuivre (2,000g).",
        "Va voir Pierre et achète le 2e lot de graines de chou frisé.",
      ],
    },
    20: {
      items: [
        "Récolte le 1er chou frisé et plante la 2e culture.",
        "Expédie des objets pour atteindre 5,000g pour l'amélioration de la hache d'acier.",
      ],
    },
    21: {
      items: [
        "Vérifie La reine des sauces pour la recette de la Salade de radis.",
        "À 9h00, va voir Clint, récupère la hache de cuivre et améliore vers la hache d'acier (5,000g).",
        "Si tu vises le défi d'expédier chaque objet jusqu'à la fin de l'année 1, tu dois acheter et planter aujourd'hui un bulbe de tulipe (20g) et des graines de zinnia (30g) pour qu'ils soient prêts le 28 printemps.",
      ],
    },
    22: {
      items: ["Expédie des objets pour atteindre 2,000g pour l'amélioration de la houe de cuivre."],
    },
    23: {
      items: [
        "À 9h00, va voir Clint, récupère la hache d'acier et améliore vers la houe de cuivre (2,000g).",
        {
          t: "Maintenant que tu as la hache d'acier, quand un jour de malchance arrive, utilise-la pour dégager de l'espace à la ferme et préparer les arroseurs. Même un jour normal, fais-le au plus tard le 27.",
          c: [
            {
              t: "Cependant, tu dois d'abord atteindre Extraction minière niveau 10 avant de faire une pause, puisque tu as besoin de la profession Forgeron avant le 25 printemps.",
              k: "warn",
            },
            {
              t: "Pense à placer aussi des épouvantails et des graines de panais (cultures de remplissage).",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Expédie autant que possible.",
          c: [
            { t: "Réunis autant d'or que possible pour demain.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Planifie combien de graines de carambole (400g chacune) planter le 2 été. Cela varie selon la partie ; tiens compte de tes revenus de la Caverne du Crâne d'ici au 2 été. Il te faut environ deux jours pour dégager et préparer la ferme. (Tu as peut-être déjà dégagé un jour lors d'un jour de malchance après le 23 printemps.) Vise environ 400-500 graines de carambole.",
        "À 9h00, va voir Clint, récupère la houe de cuivre et améliore vers la houe d'acier (5,000g).",
        {
          t: "Va à l'Oasis et achète un engrais de croissance rapide II par graine de carambole que tu vas acheter.",
          c: [
            {
              t: "L'Oasis ne vend l'engrais de croissance rapide II que le jeudi, et il te le faut pour le 2 été.",
              k: "reason",
            },
            {
              t: "Aujourd'hui Pam est à la clinique pour un examen (elle ne conduit donc pas le bus), il te faut donc un Totem de téléportation : Desert pour atteindre le désert. Dans la plupart des parties, tu utilises de toute façon un totem de téléportation chaque jour, ce n'est donc pas un problème.",
              k: "tip",
            },
          ],
        },
        {
          t: "Dépense l'argent restant en graines de carambole pour pouvoir t'évanouir sans pénalité.",
          c: [
            {
              t: "Achète le reste des graines de carambole le 2 été.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Rien de particulier à faire."],
    },
    27: {
      items: [
        "Récolte le 2e chou frisé. (Tu atteins Agriculture niveau 6.)",
        "À 9h00, va voir Clint et récupère la houe d'acier.",
      ],
    },
    28: {
      items: [
        "Vérifie La reine des sauces pour la recette de l'Omelette.",
        {
          t: "Expédie autant que possible.",
          c: [
            { t: "Réunis autant d'or que possible pour demain.", k: "reason" },
          ],
        },
        "Fabrique et place des arroseurs de qualité.",
        {
          t: "Si ce n'est pas déjà fait, plante des graines de panais (culture de remplissage).",
          c: [
            {
              t: "N'utilise pas d'engrais de croissance rapide II sur les graines de panais, car elles ne doivent pas passer au 1 été.",
              k: "warn",
            },
          ],
        },
        "Si tu finis vers midi, tu peux passer le reste du temps dans la Caverne du Crâne.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Rien de particulier. Tu peux faire la Caverne du Crâne, etc. Tu n'as pas besoin de planter les graines de carambole avant demain, alors ne coupe pas les panais.",
          c: [
            {
              t: "La profession Agriculteur affecte la 3e carambole.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Coupe et plante tout l'engrais de croissance rapide II + le 1er lot de graines de carambole que tu as achetés le 25 printemps.",
        "À 9h00, va à l'Oasis pour acheter le reste des graines de carambole, puis rentre chez toi et plante.",
        {
          t: "Cela prend la majeure partie de la journée. S'il te reste du temps :",
          c: [
            "Fabrique et place 10-20 paratonnerres.",
            "Fabrique et place des saigneurs sur les chênes éparpillés dans la ferme que tu n'as pas abattus.",
            "Continue à planter des glands dans un coin de la ferme pour faire grandir la forêt de chênes.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Fais la Caverne du Crâne.",
          c: [
            {
              t: "Tu as besoin de 25,000g pour l'amélioration de la pioche d'iridium.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Fonds des lingots en iridium. S'ils finissent tard (vers 14h30), va voir Clint et améliore vers la pioche d'iridium.",
          c: [
            {
              t: "Si les lingots en iridium seuls ne donnent pas assez d'argent, tu peux vendre des gemmes directement à Clint.",
              k: "tip",
            },
          ],
        },
        "Fabrique et place 10-20 paratonnerres.",
        "Fabrique et place des saigneurs sur les chênes éparpillés dans la ferme que tu n'as pas abattus.",
        "Continue à planter des glands dans un coin de la ferme pour faire grandir la forêt de chênes.",
        "Tu as besoin d'autant de résine de chêne que possible pour les tonneaux. L'engrais pour arbres est très utile pour faire grandir vite la forêt de chênes, mais le fabriquer nécessite Cueillette niveau 7. La meilleure façon de monter Cueillette sans presque gaspiller de temps de jeu (au lieu d'abattre des arbres ou de marcher la longue distance jusqu'à la Forêt secrète) est de fabriquer et récolter des graines d'été.",
        {
          t: "Donc les jours où tu ne vas pas à la Caverne du Crâne (comme aujourd'hui) :",
          c: [
            "Parcours la carte à la recherche d'objets à cueillir d'été et fabrique au moins 10-20 graines d'été. Récolte, refabrique et replante autant que possible jusqu'à Cueillette niveau 7.",
            {
              t: "Abats les 5 souches de la Forêt secrète pour l'expérience de Cueillette et le bois dur.",
              c: [
                { t: "Tu as besoin de 100 de bois dur pour l'Étable.", k: "reason" },
              ],
            },
            {
              t: "Dès que tu as 100 de bois dur, achète l'Étable à Robine pour réduire les futurs allers-retours à la Forêt secrète.",
              c: [
                {
                  t: "La deuxième amélioration de la maison nécessite 150 de bois dur.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Après le 5 été"],
      items: [
        "Fais plus la Caverne du Crâne. Réunis autant d'argent que possible pour le 2e lot de graines de carambole.",
      ],
    },
    9: {
      items: ["Expédie assez pour acheter le 2e lot de graines de carambole."],
    },
    10: {
      items: [
        {
          t: "Achète le 2e lot de graines de carambole.",
          c: [
            {
              t: "L'Oasis ferme demain pour le Luau, alors achète aujourd'hui.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Récolte et replante.",
          c: [
            {
              t: "L'engrais de croissance rapide II reste dans la case, tu n'as donc pas besoin de le réappliquer.",
              k: "reason",
            },
          ],
        },
        {
          t: "Ne vends aucune carambole — même de qualité or —, mets tout dans des tonneaux. À ce stade, saigne autant de chênes et construis autant de tonneaux que possible.",
          c: [
            { t: "Achète du bois à Robine quand tu en manques.", k: "tip" },
            {
              t: "Ne vends pas de vin avant de te reconvertir d'Agriculteur à Artisan via la Statue de l'Incertitude.",
              k: "warn",
            },
          ],
        },
        "Au début, tu peux remplir ta maison de tonneaux. Plus tard, il est pratique d'acheter plusieurs Grands cabanons et de les placer près de la maison. Ou, une fois la Carrière débloquée, couvre-la d'un revêtement de sol et utilise-la pour stocker les tonneaux.",
        {
          t: "À la fin de la journée, tu atteins Agriculture niveau 10. Choisis la profession Agriculteur.",
          c: [
            {
              t: "Malheureusement, l'effet d'Agriculteur ne s'applique pas aux cultures plantées aujourd'hui.",
              k: "tip",
            },
            {
              t: "Reconvertis-toi en Artisan plus tard avant de vendre du vin de carambole.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Après le 13 été"],
      items: [
        "Le 13 été est toujours un jour d'orage.",
        "Le 13 été ou à un moment après, achète et plante d'autres cultures d'été nécessaires aux lots, quêtes, cadeaux, etc.",
        "Les cultures les plus longues sont le melon et la myrtille, qui prennent 10 jours avec la profession Agriculteur. L'engrais de croissance rapide II réduit cela à 7 jours. Tu peux donc repousser la plantation de cultures d'été supplémentaires jusqu'au 21 été au plus tard.",
      ],
    },
    19: {
      items: ["Expédie assez d'objets pour la 3e carambole."],
    },
    20: {
      items: [
        "Récolte la carambole.",
        "À 9h00, va à l'Oasis et achète le 2e lot de graines de carambole.",
        {
          t: "Plante les graines de carambole.",
          c: [
            {
              t: "L'engrais de croissance rapide II reste dans la case, tu n'as donc pas besoin de le réappliquer.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Expédie assez pour acheter plus d'engrais de croissance rapide II.",
          c: [
            {
              t: "Tu couvriras toute la ferme de citrouilles, il te faut donc de l'engrais supplémentaire au-delà de celui qui se reporte des cases de carambole.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Achète plus d'engrais de croissance rapide II à l'Oasis.",
        "À un moment entre maintenant et le 28 été, bêche et place tous les arroseurs de qualité et l'engrais de croissance rapide II supplémentaire. Si tu n'arroses pas la terre le 28 été, le blé ne sera pas prêt le 2 automne.",
      ],
    },
    26: {
      items: ["Le 26 été est toujours un jour d'orage."],
    },
    27: {
      items: [
        "Expédie assez pour acheter des graines de blé (10g chacune) pour couvrir toute la ferme demain.",
      ],
    },
    28: {
      items: [
        "Récolte la carambole.",
        "À 9h00, va voir Pierre et achète des graines de blé pour couvrir toute la ferme.",
        {
          t: "Plante les graines de blé (culture de remplissage — conserve l'engrais de croissance rapide II).",
          c: [
            {
              t: "La plantation du 28 été ne fonctionne que si tu as la profession Agriculteur. Sinon tu ne peux pas obtenir la 3e citrouille avec cette stratégie.",
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
        "Rien de particulier. Tu peux faire la Caverne du Crâne, etc. Tu dois attendre que le blé finisse de pousser.",
        "Pour compléter le Musée, il est très utile d'avoir Cueillette niveau 10 et la profession Traqueur avant le 1 hiver (pour repérer plus facilement les emplacements d'artéfacts). Si tu n'as pas encore Cueillette 10, il vaut mieux planter une grande forêt avec les graines d'érable et les pommes de pin en trop et tout abattre. (C'est plus efficace que de récolter les objets à cueillir d'automne.)",
        "Expédie assez pour acheter des graines de citrouille (100g chacune) pour couvrir la ferme.",
      ],
    },
    2: {
      items: [
        {
          t: "Récolte le blé et replante des graines de citrouille pour couvrir toute la ferme.",
          c: [
            {
              t: "Les citrouilles valent mieux que les canneberges parce que tu n'auras pas assez de tonneaux pour traiter toutes les canneberges.",
              k: "reason",
            },
          ],
        },
        "Comme pour la carambole, répète récolte + replantation pour obtenir 3 récoltes de citrouille en automne.",
      ],
    },
    9: {
      items: [
        "Tu peux maintenant vendre du vin de carambole.",
        "Reconvertis-toi d'Agriculteur à Artisan via la Statue de l'Incertitude.",
        {
          t: "Achète plus de graines pour demain.",
          c: [
            {
              t: "Pierre est fermé le mercredi, alors achète aujourd'hui.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "La 1ère citrouille est prête aujourd'hui.",
        {
          t: "Replante.",
          c: [
            {
              t: "Comme la carambole, la citrouille peut aussi être récoltée 3 fois au total.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Après le 1 hiver"],
      items: [
        {
          t: "C'est maintenant ta chance de compléter les lots restants du Centre communautaire. Pour débloquer l'Île Gingembre et la ferme de l'île, complète le Centre communautaire le plus vite possible.",
          c: [
            {
              t: "Une fois la ferme de l'île atteinte, tu peux à nouveau planter de la carambole en masse, ce qui devient ta principale source de revenus.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Objectifs du jour (résumé) : un objectif principal (en-tête repliable) avec
// méthodes/raisons (c). Séparé de items ; condense les objectifs clés de chaque jour.
// Les étapes triviales sont omises, mais les points importants de boule de neige
// (constituer des matériaux pour le lendemain, etc.) sont conservés.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Économise de l'argent pour acheter la canne à pêche en fibre de verre (1,800g) le plus vite possible demain.",
        c: [
          {
            t: "Rencontre tout le monde en ville.",
            c: [
              {
                t: "Compléter la quête « Présentations » débloque « Comment se faire des amis », qui donne 100g de plus le 2 printemps.",
                k: "reason",
              },
            ],
          },
          "Fais don d'un artéfact au Musée pour la récompense de 250g.",
          "Vends tes objets à cueillir.",
        ],
      },
      {
        t: "Plante des graines.",
        c: [
          "Plante les graines de panais.",
          "Coupe les mauvaises herbes en ville pour obtenir un mélange de graines.",
        ],
      },
    ],
    2: [
      {
        t: "Achète la canne à pêche en fibre de verre (1,800g).",
        c: [
          "Achète la canne à pêche d'apprenti (25g) et pêche.",
          "Donne l'amas de pierres à Willy pour la récompense de « Comment se faire des amis » (100g).",
        ],
      },
      "Achète de l'appât pour le lendemain.",
    ],
    3: [
      {
        t: "Obtiens un minerai de cuivre.",
        c: [
          {
            t: "Pour déclencher la scène de Clint demain.",
            k: "reason",
          },
          {
            t: "Obtiens-le en pêchant.",
            c: [
              {
                t: "Si tu n'en obtiens pas, garde 75g pour acheter du minerai de cuivre à Clint.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Capture autant de poissons-chats que possible.",
        c: ["Vends tout le poisson + les objets à cueillir de plage en trop à la boutique de Willy et achète de l'appât."],
      },
    ],
    4: [
      {
        t: "Obtiens 150 de bois.",
        c: [
          {
            t: "Tu auras besoin de 2 coffres et d'un épouvantail au cours des deux prochains jours.",
            k: "reason",
          },
        ],
      },
      "Pêche au Lac de montagne.",
    ],
    5: [
      {
        t: "Améliore ta pioche vers la pioche de cuivre (2,000g).",
        c: [
          {
            t: "Fabrique 5 lingots de cuivre au niveau 10 des Mines et dépose la pioche chez Clint.",
            c: [
              {
                t: "Dépose-la avant que Clint ferme (termine les 5 lingots au plus tard à 15h00).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Plante des graines et pêche au Lac de montagne.",
        c: [
          "Achète et plante des graines de chou frisé (pour Agriculture 2) plus des graines d'haricot, de chou-fleur et de pomme de terre.",
        ],
      },
      {
        t: "Fais des réserves pour la suite.",
        c: [
          {
            t: "Garde le jade, l'émeraude, le rubis et le diamant pour la Caverne du Crâne.",
            k: "tip",
          },
          { t: "Garde un charbon pour un épouvantail.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Économise pour l'amélioration de la pioche d'acier (5,000g) et du minerai d'or.",
        c: ["Pêche au Lac de montagne pour des lingots de fer + du poisson vendable."],
      },
      {
        t: "Déclenche la scène du Centre communautaire et touche le Parchemin doré (démarre la quête).",
        c: [
          { t: "Elle se déclenche quand tu entres en ville depuis l'arrêt de bus.", k: "tip" },
        ],
      },
      "Fabrique et place un épouvantail.",
    ],
    7: [
      {
        t: "Améliore ta pioche vers la pioche d'acier (5,000g).",
        c: ["Achète du minerai d'or au Forgeron, puis améliore."],
      },
      "Rencontre le Sorcier (déclenche une scène).",
      "Pêche au Lac de montagne et fonds des lingots d'or.",
    ],
    8: [
      {
        t: "Économise 12,000g pour les améliorations de la pioche d'or (10,000g) et du sac à dos (2,000g).",
        c: ["Pêche au Lac de montagne pour des objets vendables."],
      },
      {
        t: "Fonds 5 lingots d'or et dors en les tenant.",
        c: [
          {
            t: "Réveille-toi à 50% d'énergie pour éviter le surmenage (premier jour sans montée de compétence).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Améliore vers la pioche d'or (10,000g) et améliore ton sac à dos (2,000g).",
      "Pêche au Lac de montagne (Pêche 10 → profession Pêcheur).",
    ],
    10: [
      {
        t: "Calcule les graines de chou frisé nécessaires pour Agriculture 6 et économise pour la moitié.",
        c: [
          {
            t: "Plante le chou frisé en deux lots pour ne pas fabriquer plus d'arroseurs que nécessaire.",
            k: "tip",
          },
          {
            t: "Si tu n'as pas Pêche 10, n'expédie pas : vends à Willy directement demain.",
            k: "tip",
          },
        ],
      },
      {
        t: "Prends une fournaise pour les Mines de demain.",
        c: [{ t: "N'oublie pas avant de t'évanouir.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Récolte le chou frisé (Agriculture 2) et achète + plante le 2e lot de graines de chou frisé (6,020g).",
        c: [
          "Bêche les cases selon un motif d'arroseurs (sans arroser).",
          { t: "Le chou frisé n'a pas besoin d'arrosage avant le 14 printemps.", k: "tip" },
        ],
      },
      "Mine et fonds des lingots dans les Mines.",
    ],
    12: [
      {
        t: "Mine et fonds du cuivre et du fer.",
        c: ["Choisis la profession Mineur à Extraction minière niveau 5."],
      },
    ],
    13: [
      {
        t: "Continue à descendre et à miner dans les Mines.",
        c: [
          { t: "Saute la Fête des Œufs sauf si tu as besoin de quelque chose (une perte de temps).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Descends vers le niveau 120 des Mines, en minant du minerai pour les arroseurs.",
        c: ["Si tu manques, mine du minerai de fer/d'or au niveau 21/41."],
      },
      {
        t: "Expédie de l'or pour le lot du coffre-fort (42,500g).",
        c: [
          {
            t: "Si tu manques, vise seulement 32,500g et saute le lot de 10,000g de demain.",
            k: "tip",
          },
        ],
      },
      "Fabrique autant d'arroseurs que possible à la maison.",
    ],
    15: [
      {
        t: "Complète les lots du Centre communautaire.",
        c: [
          "Apporte et remets les objets pour les lots de cueillette de printemps, cultures de printemps, forgeron, géologue et aventurier.",
          { t: "Si tu as assez d'argent (42,500g), complète aussi le lot du coffre-fort.", k: "tip" },
          {
            t: "Quitte le Parchemin doré pour ne pas rester bloqué dans la scène boguée.",
            k: "warn",
          },
        ],
      },
      "Place un cristalarium et mets un diamant dedans.",
      {
        t: "Mine jusqu'à 2h00.",
        c: [{ t: "Les wagonnets se débloquent à la fin de la journée.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Mine et fabrique plus d'arroseurs.",
        c: [{ t: "Voyage plus vite avec le wagonnet.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Termine le niveau 120 des Mines et complète le coffre-fort (42,500g).",
        c: [
          {
            t: "S'il te reste les deux, synchronise-les pour qu'ils se terminent le même jour (le bus est réparé le lendemain).",
            k: "tip",
          },
        ],
      },
      "Fais la Caverne du Crâne aussi souvent que possible.",
      {
        t: "Prépare les prochaines cultures pendant ton temps libre.",
        c: [
          "Dégage les débris de la ferme et pose un revêtement de sol là où iront les arroseurs de qualité.",
          "Fabrique plus d'épouvantails et de fournaises, et plante des glands pour faire grandir une forêt de chênes.",
        ],
      },
    ],
    18: [
      "Expédie de l'or pour l'amélioration de la hache de cuivre (2,000g) et le 2e lot de graines de chou frisé.",
    ],
    19: [
      "Améliore ta hache vers la hache de cuivre (2,000g).",
      "Achète le 2e lot de graines de chou frisé à Pierre.",
    ],
    20: [
      "Récolte le 1er chou frisé et plante la 2e culture.",
      "Expédie de l'or pour l'amélioration de la hache d'acier (5,000g).",
    ],
    21: [
      "Améliore ta hache vers la hache d'acier (5,000g).",
      {
        t: "(Facultatif) Si tu vises le défi d'expédier chaque objet, plante un bulbe de tulipe et des graines de zinnia.",
        c: [{ t: "Ils seront prêts le 28 printemps.", k: "reason" }],
      },
    ],
    22: ["Expédie de l'or pour l'amélioration de la houe de cuivre (2,000g)."],
    23: [
      "Améliore ta houe vers la houe de cuivre (2,000g).",
      {
        t: "Lors d'un jour de malchance, dégage de l'espace à la ferme et prépare les arroseurs (au plus tard le 27).",
        c: [
          {
            t: "Atteins d'abord Extraction minière niveau 10 avant de faire une pause (profession Forgeron nécessaire avant le 25 printemps).",
            k: "warn",
          },
          {
            t: "Place aussi des épouvantails et des graines de panais (remplissage).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Réunis autant d'or que possible pour demain.",
        c: ["Expédie autant que possible."],
      },
    ],
    25: [
      "Planifie combien de graines de carambole planter le 2 été (vise ~400-500).",
      "Améliore ta houe vers la houe d'acier (5,000g).",
      {
        t: "Achète de l'engrais de croissance rapide II à l'Oasis (un par graine de carambole).",
        c: [{ t: "L'Oasis ne le vend que le jeudi.", k: "reason" }],
      },
    ],
    26: ["Rien de particulier. Fais la Caverne du Crâne, etc."],
    27: [
      "Récolte le 2e chou frisé (Agriculture 6).",
      "Récupère la houe d'acier chez Clint.",
    ],
    28: [
      {
        t: "Fabrique des arroseurs de qualité et plante une culture de remplissage (panais).",
        c: [
          {
            t: "N'utilise pas d'engrais de croissance rapide II sur les panais (ils ne doivent pas passer au 1 été).",
            k: "warn",
          },
        ],
      },
      "Expédie autant d'or que possible pour demain.",
    ],
  },
  summer: {
    1: [
      {
        t: "Rien de particulier. Fais la Caverne du Crâne, etc.",
        c: [
          {
            t: "Ne coupe pas les panais (la profession Agriculteur affecte la 3e carambole).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Plante la 1ère carambole avec l'engrais de croissance rapide II.",
        c: ["Achète le reste des graines de carambole à l'Oasis et plante-les."],
      },
      {
        t: "Fais des réserves pendant ton temps libre.",
        c: [
          "Fabrique 10-20 paratonnerres.",
          "Place des saigneurs sur les chênes et plante des glands pour faire grandir la forêt de chênes.",
        ],
      },
    ],
    3: [
      {
        t: "Fais la Caverne du Crâne.",
        c: [
          {
            t: "Tu as besoin de 25,000g pour l'amélioration de la pioche d'iridium.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Fonds des lingots en iridium et améliore vers la pioche d'iridium.",
      {
        t: "Réunis de la résine de chêne et du bois dur tout en visant Cueillette niveau 7.",
        c: [
          "Fabrique et récolte des graines d'été pour gagner de l'expérience de Cueillette.",
          "Abats les souches de la Forêt secrète pour du bois dur.",
          {
            t: "Achète l'Étable avec 100 de bois dur pour réduire les futurs allers-retours.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Fais la Caverne du Crâne, en économisant pour le 2e lot de graines de carambole."],
    9: ["Expédie assez pour acheter le 2e lot de graines de carambole."],
    10: [
      {
        t: "Achète le 2e lot de graines de carambole.",
        c: [{ t: "L'Oasis ferme demain pour le Luau, alors achète aujourd'hui.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Répète récolte/replantation et mets toute la carambole dans des tonneaux.",
        c: [
          "Saigne autant de chênes et construis autant de tonneaux que possible.",
          {
            t: "Ne vends pas de vin avant de te reconvertir en Artisan.",
            k: "warn",
          },
        ],
      },
      "À la fin de la journée, tu atteins Agriculture 10 (profession Agriculteur).",
    ],
    13: [
      "Achète et plante d'autres cultures d'été pour les lots/quêtes (au plus tard le 21 été).",
    ],
    19: ["Expédie assez pour la 3e carambole."],
    20: ["Récolte la carambole et replante (achète le 2e lot de graines à l'Oasis)."],
    24: [
      {
        t: "Expédie assez pour acheter plus d'engrais de croissance rapide II.",
        c: [
          {
            t: "Tu couvriras toute la ferme de citrouilles, il te faut donc de l'engrais supplémentaire.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Place des arroseurs de qualité et de l'engrais de croissance rapide II supplémentaire.",
        c: [
          {
            t: "Arrose le 28 été pour que le blé soit prêt le 2 automne.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Rien de particulier (toujours un jour d'orage)."],
    27: ["Expédie assez pour acheter des graines de blé pour couvrir toute la ferme demain."],
    28: [
      "Récolte la carambole.",
      {
        t: "Plante des graines de blé sur toute la ferme (remplissage).",
        c: [
          {
            t: "Valable seulement avec la profession Agriculteur (pour la 3e citrouille).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Expédie assez pour acheter des graines de citrouille pour couvrir la ferme.",
      {
        t: "(Facultatif) Prépare Cueillette niveau 10 et la profession Traqueur pour le Musée.",
        c: [
          {
            t: "Planter une forêt avec des graines d'érable et des pommes de pin et l'abattre est efficace.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Récolte le blé et plante des graines de citrouille sur toute la ferme.",
        c: [
          {
            t: "Les citrouilles valent mieux que les canneberges, car tu n'auras pas assez de tonneaux.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Reconvertis-toi en Artisan pour commencer à vendre du vin de carambole.",
        c: ["Reconvertis-toi d'Agriculteur → Artisan via la Statue de l'Incertitude."],
      },
      {
        t: "Achète des graines pour demain à l'avance.",
        c: [{ t: "Pierre est fermé le mercredi, alors achète aujourd'hui.", k: "reason" }],
      },
    ],
    10: ["Récolte la 1ère citrouille et replante."],
  },
  winter: {
    1: [
      {
        t: "Complète les lots restants du Centre communautaire.",
        c: [
          {
            t: "Débloquer l'Île Gingembre et la ferme de l'île te permet de replanter de la carambole en masse comme principal revenu.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
