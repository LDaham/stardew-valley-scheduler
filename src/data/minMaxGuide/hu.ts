// =============================================================================
// LICENC TÁJÉKOZTATÓ (GPL-3.0)
// A fájl útmutató-tartalma (MIN_MAX_GUIDE / DAILY_GOALS) a BlackSight6 & Zamiel
// által készített „Stardew Valley Min-Max Routing / Strategy” (GPL-3.0) származékos
// műve.
//   Forrás: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Licenc: GNU GPL-3.0 — teljes szöveg a LICENSES/GPL-3.0.txt fájlban.
// Módosítások: tömörítve és napi adatfává (GuideNode) átszervezve, a tulajdonnevek a
// játék hivatalos magyar elnevezéseivel.
// Ezért ez a fájl a GPL-3.0 hatálya alá tartozik, nem a projekt MIT licence alá.
// (A CC BY-NC-SA alatti wiki-anyagtól elkülönítve tartva; puszta összeállításként terjesztve.)
//
// Copyright (C) BlackSight6 & Zamiel (eredeti útmutató)
// Adaptáció (C) 2026 Lee Daham
// Ez a program szabad szoftver: terjesztheted és/vagy módosíthatod a Free Software
// Foundation által közzétett GNU General Public License feltételei szerint, akár a
// licenc 3. verziója, akár (választásod szerint) bármely későbbi verzió alapján. Ezt a
// programot MINDENNEMŰ GARANCIA NÉLKÜL terjesztjük. További részletekért lásd a GNU
// GPL-t: https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Vedd fel a paszternák magvakat.",
        {
          t: "Azonnal vágj ki 9 fát, hogy elérd a Gyűjtögetés 1. szintet.",
          c: [
            { t: "8 és 1/3 fára van szükséged.", k: "tip" },
            {
              t: "1. szintre van szükséged a gyűjtögetés előtt, hogy esélyed legyen ezüst minőségű újhagymára.",
              k: "reason",
            },
            {
              t: "Csak a vágásra koncentrálj, az erdő felé vezető ösvény irányából kezdve.",
              k: "tip",
              c: [
                {
                  t: "Így az ösvény menti gazt is kitisztítod, ami segít a haladásban.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Csak juharfákat és fenyőket vágj ki, ne a tojás alakú tölgyfákat.",
              k: "warn",
              c: [
                {
                  t: "A tölgyfák csak tavasz 2-án kezdenek makkot ejteni, és a makk értékes.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Ugyanezen okból ne érj a földön lévő magvakhoz baltával vagy kapával tavasz 2. előtt (megsemmisülnek).",
              k: "warn",
            },
            {
              t: "Ne tuskókat vágj; üss minden fát, amíg ki nem dől (legfeljebb 10 ütés), majd lépj a következőre.",
              k: "tip",
              c: [{ t: "Ez több fát és Gyűjtögetés-tapasztalatot ad.", k: "reason" }],
            },
            {
              t: "Amikor egy fa dőlni kezd, menj oda, ahová a fa esni fog, és azonnal szüneteltess.",
              k: "tip",
            },
            {
              t: "A játékidő megáll, de a dőlésanimáció befejeződik, és a fa szünet közben automatikusan begyűlik.",
              k: "reason",
            },
            {
              t: "Mindig ezt a stratégiát használd fák (nem tuskók) vágásakor.",
              k: "tip",
            },
            {
              t: "Ha elveszíted a fák számát, nézd meg a Képességek fülön a Gyűjtögetés szintlépését.",
              k: "tip",
            },
            { t: "A holnapi horgászáshoz is hasznos.", k: "tip" },
          ],
        },
        "Amint elérted a Gyűjtögetés 1-et, készíts egy ládát és tedd a házad mellé, majd ürítsd ki a tárhelyed, csak a kaszát, a baltát, a csákányt és a kapát tartsd meg.",
        "Indulj el délre az erdőbe. (Nagyjából 9:20 van.)",
        {
          t: "Képernyőkép/nagyítás segítségével nézd meg a Tufanedv-erdő gyűjthető tárgyait, és tervezd meg az útvonalad.",
          c: [
            "Útközben vedd fel az összes gyűjthető tárgyat.",
            {
              t: "Ha nem pazarol energianyereséget, ehetsz újhagymát szedés közben, hogy helyet szabadíts fel a tárhelyen.",
              k: "tip",
            },
            {
              t: "Vágj le annyi gazt, amennyit tudsz, de egyetlenért se kerülj nagyot.",
              k: "tip",
            },
            { t: "12:50-ig találkoznod kell Marnie-val.", k: "reason" },
          ],
        },
        {
          t: "Jas a házától az ugrókötelezős helyhez tart — találkozz vele.",
          time: "11:20",
        },
        {
          t: "Haley a délnyugati fotóhelyhez tart — találkozz vele. Ha előrébb jársz a tervnél, jó alkalom több gaz levágására.",
          time: "11:40",
        },
        "Menj a városba.",
        {
          t: "Nézd meg a két kukát Jodi és Haley háza mellett, és ha van idő, tisztítsd ki a köztük lévő gazt.",
          c: [
            {
              t: "A kuka átnézése után azonnal szüneteltetni optimális.",
              k: "tip",
            },
            {
              t: "Megakadályozza az időpazarlást, amikor a tárgyak az ellenkező irányba pattannak ki.",
              k: "reason",
            },
            {
              t: "Hasonló a dőlő fáknál alkalmazott szünet-stratégiához.",
              k: "tip",
            },
            {
              t: "A kukák átnézése sok időt pazarol, ezért az útvonal csak az első két napon teszi.",
              k: "tip",
            },
          ],
        },
        {
          t: "Marnie Pierre vegyesboltjától a tanyához sétál (Emily háza mellett halad el) — találkozz vele.",
          time: "12:50",
        },
        "Menj a strandra.",
        {
          t: "Kapáld meg a leletpontokat az első leleted megszerzéséhez.",
          c: [
            "Hagyd a strand gyűjthető tárgyait a földön.",
            {
              t: "Most kevés a tárhelyed, és tavasz 2-án felveheted őket.",
              k: "reason",
            },
          ],
        },
        {
          t: "Elliott a kunyhójától délre lévő tábortűznél van — találkozz vele.",
          time: "12:00",
        },
        "Menj a városba.",
        "Ha szereztél leletet, ajánld fel a Múzeumnak, és vedd át a jutalmat (250g).",
        "Nézd meg a kukákat a Múzeum és a Kovács mellett.",
        {
          t: "A Kovácsban találkozz Clinttel.",
          c: [{ t: "Kelet felé indulj tovább.", k: "tip" }],
        },
        "Nézd meg a kukát a JojaMart mellett.",
        {
          t: "A JojaMartban van Pam, Sam és Shane — találkozz velük.",
          c: [
            {
              t: "Sam és Shane akkor is megismertnek számít, ha éppen dolgoznak.",
              k: "reason",
            },
          ],
        },
        "Tisztítsd ki a gazt a JojaMart mögött (attól északra).",
        "A hídon találkozz Abigaillel.",
        {
          t: "Ha Maru dél felé sétál és a közelben van, beszélj vele most; különben találkozz vele később, amikor a padon ül.",
          time: "15:20",
        },
        "Nézd meg a kukát Lewis háza mellett.",
        "Találkozz velük: Evelyn (virágoskert), Caroline + Jodi (városközpont), Vincent + Harvey (Jodi háza felett).",
        "Vágd le a gazt a térkép nyugati oldalán Harvey közelében.",
        {
          t: "Pierre vegyesboltjában találkozz velük: Leah + Pierre.",
          c: [
            {
              t: "A pult mögé kell menned, hogy beszélj Pierre-rel.",
              k: "tip",
            },
            {
              t: "Ma ne vásárolj Pierre-től, mert a tavaszi terményeket tavasz 5–6-án veszed meg.",
              k: "tip",
            },
          ],
        },
        {
          t: "A Szalon közelében találkozz a többiekkel.",
          time: "~16:00",
          c: [
            {
              t: "16:00-kor Alex befejezi az edzést, és elhagyja a szobáját. Nézd meg a kukát a ház mellett, és menj be, hogy találkozz George-dzsal és Alexszel.",
              c: [
                {
                  t: "Ha korán érkezel, lehet, hogy meg kell várnod, míg Alex elhagyja a szobáját.",
                  k: "tip",
                },
              ],
            },
            {
              t: "16:00-kor Emily megérkezik a Szalonba. Nézd meg a kukát a Szalon mellett, és menj be, hogy találkozz Gusszal és Emilyvel.",
              c: [{ t: "Gushoz a pult mögé kell menned.", k: "tip" }],
            },
            "16:20-kor Penny elhalad Lewis kerítése mellett, és Alex elhagyja a házat.",
            "16:40-kor Penny megérkezik a padhoz Maruval. Ha még nem találkoztál velük, itt tedd meg.",
            "Nézd meg a küldetésnaplódat, hogy megerősítsd: ma 24 emberrel találkoztál a legfeljebb 27-ből.",
          ],
        },
        {
          t: "Menj vissza a tanyára.",
          c: [
            {
              t: "Egyelőre hagyd a gyűjthető tárgyakat a földön a buszmegállónál.",
              k: "tip",
            },
          ],
        },
        "Ürítsd ki a tárhelyed. A szerszámaidat tartsd meg.",
        "Vágd a tanya gazát körülbelül 18:00-ig.",
        "Indulj a hátsó erdőbe 18:10 körül.",
        "A sátra előtt találkozz Linusszal.",
        {
          t: "A házától délkeletre találkozz Demetriusszal.",
          c: [
            {
              t: "Robinnal már találkoztál, így nem kell beszélned vele.",
              k: "reason",
            },
          ],
        },
        {
          t: "Amikor elhagyja a házat, találkozz Sebastiannal.",
          c: [
            {
              t: "Ha 19:00 előtt érkezel, meg kell várnod, míg 18:40-kor kijön a szobájából.",
              k: "tip",
            },
            {
              t: "Ez elvesztegetett idő, amit a tanya gazának további vágására fordíthattál volna.",
              k: "reason",
            },
          ],
        },
        "Menj délre a Közösségi központhoz.",
        "Vágd le a gazt a Közösségi központtól nyugatra.",
        "Vágd le a gazt a szökőkúttól nyugatra.",
        {
          t: "Menj haza.",
          c: [
            {
              t: "Vedd fel a buszmegállónál korábban hagyott gyűjthető tárgyakat.",
              k: "tip",
            },
          ],
        },
        {
          t: "Kapáld, ültesd és öntözd a paszternák magvakat + a kevert magvakat.",
          c: [
            {
              t: "Ha a kezdeti 15 paszternák magon túl ültetsz, a varjak naponta egyet vagy többet megehetnek. De a kevert magvak elültetése megéri a többletértéket. (A kevert magvakból nyert karfiol és krumpli miatt később nem kell megvenned őket a tavaszi termény csomaghoz.)",
              k: "tip",
            },
          ],
        },
        "Vágj fákat, amíg 4–6 energiád marad.",
        {
          t: "Vágj gazt és füvet 1:00–1:30-ig, attól függően, mennyi kevert magod van.",
          c: [
            {
              t: "Az összes kevert magot 2:00 előtt kapálnod, ültetned és öntöznöd kell.",
              k: "warn",
            },
          ],
        },
        {
          t: "Menj haza, és szállíts el mindent, kivéve:",
          c: ["Kő", "Fa", "Szén", "20 rost"],
        },
        {
          t: "Megjegyzés:",
          k: "tip",
          c: [
            {
              t: "Add el az összes gyűjthető tárgyat, kivéve az újhagymát. A Közösségi központ csomagjaival később foglalkozz. Holnap a lehető legtöbb pénzre van szükséged.",
              k: "tip",
            },
            {
              t: "Normál esetben a póréhagymát, a pitypangot és a kukából szerzett ételt (alacsony GPE) eszed meg eladás helyett, de ma a pénz sürgős, így ez kivétel.",
              k: "tip",
            },
          ],
        },
        {
          t: "Kapáld, ültesd és öntözd a megmaradt kevert magvakat.",
          c: [
            {
              t: "Még ha 0 energia alá is erőlteted magad és elájulsz, tavasz 2-án szintet lépsz Gyűjtögetésben, így semmilyen büntetés nem öröklődik át.",
              k: "tip",
            },
            {
              t: "Ha az egyik kevert mag nem karfiol (ellenőrizd móddal vagy a wikivel), a kezdeti csomagleadást és a Pince számára szánt extra arany­szállítást — amelyet tavasz 15-re terveztünk — tavasz 17-re kell halasztanod.",
              k: "warn",
            },
            {
              t: "A csillék hiánya enyhe időnyomást ad a Bányák kitisztításához, de ez nagyon ritka, és nem változtatja meg az útvonalat.",
              k: "tip",
            },
          ],
        },
        {
          t: "Légy a házadban.",
          time: "kevéssel 2:00 előtt",
          c: [{ t: "Az aranybüntetés elkerülésére.", k: "reason" }],
        },
        {
          t: "Semmisítsd meg az ágyat.",
          c: [
            {
              t: "Minden reggel közvetlenül az ajtó mellett jelensz meg, így időt takarítasz meg.",
              k: "reason",
            },
            {
              t: "Vagy távolítsd el a házból, és tartsd egy ládában.",
              k: "tip",
            },
          ],
        },
        {
          t: "Tedd a TV-t az ajtó mellé.",
          c: [{ t: "Hogy ébredéskor rögtön megnézhesd.", k: "reason" }],
        },
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Gyűjtögetés 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Olvasd el az összes leveledet.",
          c: [
            {
              t: "El kell olvasnod Willy levelét, hogy megkapd a bambusz horgászbotot.",
              k: "reason",
            },
          ],
        },
        "Öntözd meg a terményeidet.",
        {
          t: "Készíts egy ládát és vidd magaddal.",
          c: [
            {
              t: "Tavasz 1-jén lehet, hogy csak 0–3 újhagymát kaptál (és semmi kukából szerzett ételt), és nem vágtál ki 50 fát. Vágj ki most 50-et, és folytasd az útvonalat. Csak vedd figyelembe, hogy minden kicsit eltolódik.",
              k: "tip",
            },
          ],
        },
        "Üríts ki minden tárgyat a ládába. Vidd a kapát + a készített ládát + 1 követ.",
        {
          t: "Nézd meg a kukákat George háza, a Szalon és Lewis háza mellett.",
          c: [
            {
              t: "Nem baj, ha a falusiak rajtakapnak — minden NPC barátsága még 0.",
              k: "reason",
            },
            {
              t: "Ez az utolsó alkalom, hogy kerülőt teszel a kukákért. Sok időt pazarolnak, ezért utána csak akkor nézd meg őket, ha nem kerül extra időbe.",
              k: "tip",
            },
          ],
        },
        "Menj a strandra, és vedd át a bambusz horgászbotot.",
        "Add a követ Willynek, és vedd át a „Hogyan barátkozz” küldetés jutalmát (100g).",
        "Tedd a ládát a móló jobb alsó sarkába.",
        "Horgássz a mólóról kelet felé fordulva. Dobj maximális távolságra.",
        {
          t: "8:40-kor semmisítsd meg a bambusz horgászbotot, és nézd meg a strand többi gyűjthető tárgyát + a leletpontokat.",
          c: [
            {
              t: "Ha most szerzel leletet, és tavasz 1-jén nem szereztél, azonnal ajánld fel a jutalomért (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Menj Willy boltjába. Add el az összes strand-gyűjthetőt + halat. Vedd meg az edző horgászbotot (25g) Willytől.",
          c: [
            {
              t: "Az edző horgászbot növeli a tökéletes fogás esélyét. (A Horgászás tökéletes fogásokkal való szintezése többet számít, mint a magas minőségű hal.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Az edző horgászbottal dobj minimális távolságra közvetlenül Willy ajtajától délre. Gyűjts össze elég halat 1,800g eléréséhez.",
          c: [
            {
              t: "A minimális távolságú dobásoknál nagyobb az esély a könnyű halakra, és rövidebbek a dobás-/visszatekerés-animációk.",
              k: "reason",
            },
            { t: "Lásd még az „Általános horgászstratégiát”.", k: "tip" },
          ],
        },
        "Amikor a hínár (1.54 GPE) és a Joja Cola (1.92 GPE) elfogy, edd a legmagasabb minőségű szardellát (1.82 GPE) vagy heringet (1.82 GPE).",
        {
          t: "Amint elég halad van 1,800g-hez, és eléred a Horgászás 2. szintet, semmisítsd meg az edző horgászbotot, add el az összes halat, és vedd meg az üvegszálas horgászbotot Willytől. Vegyél annyi csalit is, amennyit tudsz (5g darabja), és szereld fel az új botra.",
          c: [
            {
              t: "A tökéletes fogások csökkennek, de a csalinak köszönhetően az üvegszálas horgászbot gyorsabban ad tapasztalatot.",
              k: "reason",
            },
          ],
        },
        "Horgássz ugyanarról a helyről maximális távolságú dobásokkal.",
        {
          t: "16:30-kor, ha a boton 35-nél kevesebb csali van, menj venni többet Willytől.",
          c: [
            {
              t: "Elég csalira van szükséged a mai nap hátralévő részére plusz a holnap reggelre.",
              k: "reason",
            },
          ],
        },
        "Horgássz 2:00-ig. Az összes halat tedd a ládába, mielőtt elájulsz. (Holnap add el Willynek.)",
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Horgászás 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "Tavasz 3-án mindig esik.",
        "Üríts ki minden tárgyat a ládába. Vedd elő az üvegszálas horgászbotot.",
        "Ha 80+ csalid van, és kaptál rézércet a tavasz 2-i horgászládából, készíts egy ládát, vidd magaddal, és menj egyenesen a Tufanedv-erdő folyójához horgászni. Ne feledd röviden elhagyni az útmutatót, hogy több csalit vegyél Willytől, mielőtt holnap a Hegyi tóhoz mész.",
        {
          t: "Különben:",
          c: [
            "Vedd ki a kapát a ládából.",
            "Horgássz Leah házától délre 8:30-ig, vagy amíg el nem fogy a csalid (amelyik előbb bekövetkezik).",
            "Nézd meg a kukákat Jodi és Emily házától délre.",
            "Nézd meg a gyűjthető tárgyakat + a leletpontokat a strandon.",
            {
              t: "Add el az összes halat + a felesleges strand-gyűjthetőt Willy boltjában.",
              c: [
                {
                  t: "Ha akarod, megtarthatsz egy szardíniát a tengeri hal csomaghoz.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Vegyél csalit, amíg csak 75g-d marad.",
              c: [
                {
                  t: "Ha már találtál rézércet a horgászládában, az összes pénzedet csalira költheted.",
                  k: "tip",
                },
                {
                  t: "Az itt vásárolható csali mennyisége (500–700) a futástól függően változik, de bármennyit veszel, mind elhasználod a tavasz vége előtt.",
                  k: "tip",
                },
                {
                  t: "Elvileg elhalaszthatnád néhány hal eladását, amíg meg nem szerzed a Halász hivatást. De három probléma van. Először, csak akkor éri meg, ha többet keresel, mint körülbelül egy óra horgászás a Hegyi tónál. Másodszor, a tavasz 3. végén elájuláskor cipelhető halak száma korlátozott. Harmadszor, a csali vásárlására a következő kényelmes alkalom a csákány leadása után van tavasz 5-én, egy olyan napon, amikor szinte nincs szabadidő. Így most eladni összességében egyszerűbb és sokkal kevésbé kockázatos.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Üríts ki a láda tartalmát, és vedd fel a ládát.",
              c: [
                {
                  t: "Hogy ezt 0 energiaköltséggel tedd, válassz egy üres eszköztár-helyet, és nyomkodd a bal kattintást.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Ha megtartottál 75g-t, menj Clinthez, és vegyél rézércet (75g), hogy holnap kiváltsd Clint átvezető jelenetét.",
              c: [{ t: "Nem kell a földre dobnod.", k: "tip" }],
            },
            "Menj a Tufanedv-erdő folyójához.",
          ],
        },
        {
          t: "A Tufanedv-erdő folyójánál a legjobb horgászhely 6 mezővel Leah ajtajától nyugatra van, dél felé dobva. Tedd a ládát egy mezővel tőled északkeletre.",
          c: [
            {
              t: "Célozz a kis szigettől keletre lévő mély vízre (lásd a wiki „folyami horgászzóna” képét).",
              k: "tip",
            },
          ],
        },
        {
          t: "Horgássz 2:00-ig. Elájulás előtt töltsd fel a tárhelyed a bottal + drágakövekkel + érccel + szénnel + a legértékesebb halakkal.",
          c: [
            {
              t: "Tavasz 7-ig (vagy egy korábbi esős napig) nem térsz vissza ehhez a ládához.",
              k: "tip",
            },
          ],
        },
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Horgászás 4 → 6 (válaszd a Halász hivatást)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Nézd meg a holnapi időjárást a TV-n minden nap, és tervezz aszerint.",
          c: [
            {
              t: "Pl. ha a Hegyi tónál horgászol, és holnap nem esik, a botot a ládában hagyhatod.",
              k: "tip",
            },
          ],
        },
        "Öntözd meg a terményeidet.",
        {
          t: "Ha 150-nél kevesebb fád van, vágj ki 150-ig.",
          c: [
            { t: "Vágás közben vidd a kaszát, hogy a füvet is levágd.", k: "tip" },
            {
              t: "A következő két napban 2 ládára és egy madárijesztőre lesz szükséged.",
              k: "reason",
            },
          ],
        },
        "Készíts egy ládát és vidd magaddal.",
        "Ürítsd ki a tárhelyed. Vidd az üvegszálas horgászbotot + a készített ládát.",
        {
          t: "Menj a Hegyi tóhoz. A legjobb hely a képernyő alján lévő hosszú kerítésnél áll, kelet felé dobva. Tedd a ládát három mezővel mögéd.",
          c: [
            {
              t: "Célozz a víz alá merült rönk közelében lévő mély vízre (lásd a wiki „tavi horgászzóna” képét).",
              k: "tip",
            },
          ],
        },
        {
          t: "Horgássz 1:00-ig. Töltsd fel a tárhelyed drágakövekkel, érccel, szénnel és a legértékesebb halakkal.",
          c: [
            {
              t: "Hacsak holnap nem esik, az üvegszálas horgászbotot a ládában hagyhatod.",
              k: "tip",
            },
          ],
        },
        "Menj haza.",
        {
          t: "Szállíts el mindent, ami eladható (drágakövek, hal stb.).",
          c: [
            { t: "Tarts meg domolykókat enni.", k: "tip" },
            {
              t: "Tarts meg egyet-egyet minden halból, amelyet a Közösségi központ csomagjai használnak.",
              k: "tip",
            },
            {
              t: "Tarts meg jádekövet, smaragdot, rubint és gyémántot a Koponya-barlanghoz későbbre.",
              k: "tip",
            },
          ],
        },
        "Eladás után rögtön 2:00 lesz. Különben vágj füvet, és ájulj el.",
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Horgászás 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Nézd meg a napi szerencsét a TV-n minden nap.",
        "Fogadd el vagy utasítsd vissza a háziállatot. (Lásd „Háziállat-mechanika”.)",
        "Arasd le a paszternákokat, és jegyezd fel, mennyit arattál.",
        {
          t: "Jegyezd fel, melyik kevert magvakat ültetted.",
          c: [
            {
              t: "A mag kinézetéből vagy móddal megtudhatod.",
              k: "tip",
            },
          ],
        },
        "Vedd át a paszternák-küldetés jutalmát (100g).",
        "A megmaradt kevert magvakat ne öntözd, csak később ma.",
        "Készíts egy ládát és vidd magaddal.",
        "Ha van vasérced vagy aranyérced, jegyezd fel, mennyi. (Véletlenszerűen jönnek a horgászládából.)",
        {
          t: "A ládából vegyél ki mindent, kivéve a csákányt + drágaköveket + követ + szenet + rezet + 3 paszternákot.",
          c: [
            {
              t: "Tarts meg jádekövet, smaragdot, rubint és gyémántot a Koponya-barlanghoz.",
              k: "tip",
            },
            {
              t: "Paszternákra van szükséged: 1 egy csomaghoz, 1 elszállításra (opcionális), 1 Pamnek (opcionális).",
              k: "reason",
            },
            { t: "Megtarthatsz egy szenet a holnapi madárijesztőhöz.", k: "tip" },
          ],
        },
        "Menj a Bányákba.",
        "Tedd a ládát a lifttől balra.",
        "Ereszkedj le a 10. szintre. (Lásd „Általános bánya-stratégia”.)",
        {
          t: "Amint van 25 rézérced és 25 köved, térj vissza a 0. szintre, készíts egy kemencét, és olvassz rézrudakat.",
          c: [
            {
              t: "Ne várd meg a következő liftet, hacsak nincs nagyon közel.",
              k: "tip",
            },
          ],
        },
        "Tartsd járatban a kemencét, amíg 5 rudad nincs. Az 5-öt legkésőbb 15:00-ig be kell fejezned.",
        {
          t: "Amint eléred a 10. szintet, bányássz rézércet a 11. szint ismétlésével, miközben a megmaradt rudak olvadnak.",
          c: [
            {
              t: "A 15. szintet valószínűleg nem éred el 15:00 előtt.",
              k: "reason",
            },
          ],
        },
        {
          t: "Amint az 5 rúd kész:",
          c: [
            {
              t: "Hagyd a kardot + a paszternákokat a ládában.",
              c: [
                {
                  t: "Tavasz 11-ig nem térsz vissza ehhez a ládához.",
                  k: "tip",
                },
              ],
            },
            "Vidd a kemencét + drágaköveket + apróságokat. Tarts 4 tárhelyet szabadon.",
            "Ha nem hagytál szenet a tanyán, vigyél egyet a holnapi madárijesztőhöz.",
            "Menj a Kovácshoz.",
          ],
        },
        {
          t: "Ha túl későn érsz oda az 5. rúd olvasztásához, 16:00-ra elérheted a Kovácsot, bent elhelyezhetsz egy kemencét, megolvaszthatod az 5. rudat, és várhatsz 30 percet. Amíg az épületben vagy, Clint 19:10-ig árul.",
          k: "tip",
          c: [
            {
              t: "Ez azonban hibának számít, ezért a csalás elkerülése érdekében vedd meg, amire szükséged van, mielőtt Clint elhagyja a pultot.",
              k: "warn",
            },
          ],
        },
        {
          t: "Ha nem tudod időben elkészíteni a rudakat, vagy zárás előtt elérni a Kovácsot, a hátralévő időt töltsd horgászással. Az útvonal ekkor egy nappal eltolódik.",
          c: [
            {
              t: "Nem akkora hiba, mint amilyennek tűnik, hiszen úgyis sokat fogsz horgászni extra pénzért.",
              k: "reason",
            },
          ],
        },
        "A Bányák geódákat, fagyos geódákat és magma geódákat adnak. A számítás szerint átlagosan többet ér, ha 25g-t fizetsz Clintnek a feltörésükért, de a Kovácshoz nappal odasétálás alternatívaköltsége messze meghaladja ezt a nyereséget. Ezért szállítsd el az összes geódát extra pénzért. (Az ásványokkal/Múzeummal a játék végén foglalkozz.)",
        {
          t: "A Kovácsnál:",
          c: [
            "Add el a drágaköveidet.",
            {
              t: "Tarts meg legalább 3,310g-t, a többivel pedig:",
              c: [
                "Vegyél legfeljebb 25 vasércet (a horgászatból szerzettel együtt) (25 × 150g = 3,750g).",
                "Vegyél legfeljebb 25 aranyércet (a horgászatból szerzettel együtt) (25 × 400g = 10,000g). (Ennél a pontnál szinte semmi pénzed nem lesz aranyércre, és ez rendben van.)",
              ],
            },
          ],
        },
        {
          t: "Mire való a 3,310g:",
          c: [
            "2,000g a csákány fejlesztésére.",
            {
              t: "1,120g 16 vadkáposzta maghoz a Gazdálkodás 2. szinthez (összesen 380 tapasztalat). (Kevesebb vadkáposztát is vehetsz, ha figyelembe veszed a kevert magvak és a rizs hajtás tapasztalatát.)",
              c: [
                "8 tapasztalat paszternákonként × 15 = 120 tapasztalat",
                "380 tapasztalat − 120 tapasztalat = 260 tapasztalat",
                "260 tapasztalat / 17 tapasztalat vadkáposztánként = 16 vadkáposzta",
                "16 vadkáposzta mag × 70g = 1,120g",
              ],
            },
            "60g 1 babültetvényre.",
            "80g 1 karfiol magra (nem szükséges, ha egy kevert magból kaptál egyet).",
            "50g 1 krumpli magra (nem szükséges, ha egy kevert magból kaptál egyet).",
          ],
        },
        "Fejleszd a rézcsákányra (2,000g).",
        {
          t: "Menj Pierre-hez, és vegyél:",
          c: [
            "1 babültetvény (60g)",
            "1 karfiol mag (80g) (nem szükséges, ha egy kevert magból kaptál egyet)",
            "1 krumpli mag (50g) (nem szükséges, ha egy kevert magból kaptál egyet)",
            "16 vadkáposzta mag (1,120g)",
            "Vegyél extra vadkáposzta magot a maradék pénzből.",
          ],
        },
        "Még ha zárás előtt nem is éred el Pierre-t, az útvonal érdemben nem változik. Csak vedd meg és ültesd el a magvakat holnap.",
        "Menj haza.",
        "Ültess és öntözz.",
        "Vidd az üvegszálas horgászbotot + kemencét + vasércet + aranyércet + szenet + domolykókat.",
        "Menj a Hegyi tóhoz.",
        "Tedd a kemencét a láda mellé. Olvassz 5 vasrudat horgászás közben.",
        {
          t: "Horgássz 2:00-ig. Elájulás előtt töltsd fel a tárhelyed a legértékesebb tárgyakkal.",
          c: [
            {
              t: "A megmaradt vasércet + aranyércet hagyd a Hegyi tó ládájában.",
              c: [
                { t: "Vidd a kemencét, ha holnap esik.", k: "tip" },
              ],
            },
            "Jegyezd fel, mennyi aranyérced van.",
          ],
        },
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Gazdálkodás 0 → 1", "Bányászás 0 → 1", "Horgászás 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Öntözd meg a terményeidet.",
          c: [
            {
              t: "Ha a varjak megették a tavaszi csomag terményeit, jegyezd fel, és vegyél újra magot Pierre-től, amikor kényelmes.",
              k: "tip",
            },
          ],
        },
        "Készíts és helyezz el egy madárijesztőt.",
        "Vágj fákat 7:40-ig.",
        "Ürítsd ki a tárhelyed, és vidd az üvegszálas horgászbotot.",
        {
          t: "Lépj be a városba a buszmegállóból. A Közösségi központ átvezető jelenete kiváltódik. Ne hagyd ki.",
          k: "warn",
          c: [
            {
              t: "Ha kihagyod, a város bejáratánál jelensz meg; ha megnézed, a Közösségi központ mellett.",
              k: "reason",
            },
          ],
        },
        "Lépj be a Közösségi központba, és érintsd meg az Aranytekercs talapzatát (elindítja a küldetést).",
        "Menj a Hegyi tóhoz, és horgássz 1:00-ig. Töltsd fel a tárhelyed 5 vasrúddal + a legértékesebb eladható tárgyakkal.",
        "Menj haza.",
        {
          t: "Az eladhatóból szállíts el eleget az acélcsákány-fejlesztéshez (5,000g), és szállíts el elég aranyat is, hogy legfeljebb 25 aranyércet vegyél.",
          c: [
            { t: "Ha kevés, adj el domolykókat. (Először az alacsony minőségűt add el.)", k: "tip" },
          ],
        },
        "Eladás után rögtön 2:00 lesz. Különben vágj füvet, és ájulj el.",
      ],
    },
    7: {
      items: [
        "Nézd meg A szószok királynőjét a Rázva pirított receptjéért.",
        "Nézd a leveleidet, amíg meg nem kapod a Varázsló levelét.",
        "Öntözd meg a terményeidet.",
        "Ürítsd ki a tárhelyed. Vidd az 5 vasrudat.",
        {
          t: "Menj a Varázslóhoz (átvezető jelenetet vált ki).",
          c: [
            {
              t: "Az átvezető megnézése nem számít a Varázslóval való találkozásnak. A jelenet után beszélned kell vele, hogy a neve megjelenjen a Társas fülön. De ez tisztán kozmetikai, valódi haszon nélkül, ezért tekintsd időpazarlásnak.",
              k: "tip",
            },
          ],
        },
        "Üríts ki a Tufanedv-erdő folyójánál lévő láda tartalmát (opcionális).",
        {
          t: "Menj a Kovácshoz:",
          c: [
            "Vegyél legfeljebb 25 aranyércet (a horgászatból szerzettel együtt).",
            "Fejleszd az acélcsákányra (5,000g).",
          ],
        },
        "Horgássz a Hegyi tónál 2:00-ig, majd ájulj el. Horgászás közben olvassz aranyrudakat. Olvassz 2-3-at, és egy további lesz a kemencében, amikor elájulsz.",
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Horgászás 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Ha megjelenik a barlang átvezető jelenete, válaszd a gombát. (Lásd „Egyéb megjegyzések”.)",
        "Öntözd meg a terményeidet.",
        {
          t: "Az eladhatóból szállíts el eleget 12,000g eléréséhez.",
          c: [
            {
              t: "Az aranycsákány-fejlesztéshez (10,000g) + a hátizsák-fejlesztéshez (2,000g) való.",
              k: "reason",
            },
            {
              t: "Ha kevés, térj haza a nap vége előtt, és szállítsd el az aznap fogott halat a különbség pótlására.",
              k: "tip",
            },
          ],
        },
        "Horgássz a Hegyi tónál 2:00-ig, majd ájulj el. Horgászás közben olvassz aranyrudakat, amíg összesen 5 nincs. Ezeket a rudakat tartanod kell, amikor elájulsz.",
        {
          t: "Ez a kezdés óta az első nap, amikor nem lépsz szintet egy képességben sem, ezért ne erőltesd túl magad.",
          c: [
            {
              t: "50% energiával kell ébredned, nem 0%-kal.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Öntözd meg a terményeidet.",
        "Vágj fákat körülbelül 8:00-ig.",
        "Ürítsd ki a tárhelyed. Vidd az üvegszálas horgászbotot.",
        "Menj a Kovácshoz, és fejleszd az aranycsákányra (10,000g).",
        "Menj Pierre-hez, és fejleszd a hátizsákodat (2,000g).",
        "Horgássz a Hegyi tónál 2:00-ig, majd ájulj el.",
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Horgászás 9 → 10 (válaszd a Horgász hivatást)"],
        },
        "Még ha ma nem is éred el a Horgászás 10-et, a következő horgásznapon megszerzed. Az útvonal érdemben nem változik.",
      ],
    },
    10: {
      items: [
        "Öntözd meg a terményeidet.",
        "Szedj gombát a barlangból.",
        {
          t: "Számold ki a Gazdálkodás 6. szinthez szükséges extra vadkáposztát.",
          c: [
            "8 tapasztalat paszternákonként × 15 = 120 tapasztalat",
            "17 tapasztalat vadkáposztánként × 16 = 272 tapasztalat",
            "összesen 3,300 tapasztalat − 120 − 272 = 2,908 tapasztalat szükséges",
            "2,908 tapasztalat / 17 = 172 vadkáposzta",
            "172 vadkáposzta mag × 70g = 12,040g",
          ],
        },
        {
          t: "Ha Horgászás 10. szinted van, szállíts el elég halat, hogy a szükséges vadkáposzta magvak felét megvedd (6,020g).",
          c: [
            {
              t: "Két részlet az optimális, hogy ne készíts a szükségesnél több öntözőt. Így a lehető legtöbb vasrudat biztosítod a minőségi öntözőkhöz tavasz 28-án.",
              k: "reason",
            },
          ],
        },
        {
          t: "Ha nincs Horgászás 10. szinted, most ne szállítsd el a halat. Holnap add el közvetlenül Willynek.",
          c: [{ t: "Az arany 25%-át elveszítenéd.", k: "reason" }],
        },
        "Ürítsd ki a tárhelyed. Vidd az üvegszálas horgászbotot.",
        "Ha a boton 100-nál kevesebb csali van, vigyél néhány halat is. Horgássz néhány órát a Hegyi tónál 9:00-ig, majd add el a halat Willynek, és vegyél több csalit.",
        "Horgássz a Hegyi tónál 2:00-ig, majd ájulj el. Ne feledd elhozni a kemencét a holnapi Bányákhoz.",
      ],
    },
    11: {
      items: [
        "Arasd le a vadkáposztát. (Eléred a Gazdálkodás 2. szintet.)",
        {
          t: "Kezdd el kapálni a mezőket öntöző-mintázatban.",
          c: [{ t: "Egyik mezőt se öntözd.", k: "warn" }],
        },
        "Hagyd el a tanyát körülbelül 8:00-kor.",
        "Ha tegnap nem szállítottad el a halat, add el Willynek.",
        "Menj a Kovácshoz, és vedd át az aranycsákányt.",
        "Menj Pierre-hez, és vegyél annyi vadkáposzta magot, amennyit kiszámoltál (6,020g).",
        {
          t: "Térj vissza a tanyára, és fejezd be a kapálást + ültetést.",
          c: [
            { t: "Egyik mezőt se öntözd.", k: "warn" },
            {
              t: "Opcionálisan készíts burkolatos utat, hogy megjelöld, hová kerülnek a jövőbeli öntözők.",
              k: "tip",
            },
            { t: "A vadkáposztát tavasz 14-ig nem kell öntözni.", k: "tip" },
          ],
        },
        "Menj a Bányákba, és helyezz el egy kemencét. Folytasd a rudak olvasztását.",
        {
          t: "Bányássz 2:00-ig, majd ájulj el.",
          c: [
            {
              t: "Ahogy több rezet gyűjtesz, készíts még 3 kemencét (összesen 4).",
              k: "tip",
            },
          ],
        },
        {
          t: "A nap végén ezt kapod:",
          k: "result",
          c: ["Gazdálkodás 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Szedj gombát a barlangból.",
        "Bányássz 2:00-ig, majd ájulj el. Bányászás közben olvassz rezet és vasat.",
        "Amikor eléred a Bányászás 5. szintet, válaszd a Bányász hivatást.",
      ],
    },
    13: {
      items: [
        "Bányássz 2:00-ig, majd ájulj el.",
        {
          t: "A Tojásfesztiválon nincs semmi, amire szükséged van, így odamenni időpazarlás. Kivétel, ha a minden-tárgy-elszállítása kihívásra mész az 1. év végéig, mert akkor egy-két eper magra van szükséged.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Nézd meg A szószok királynőjét a Káposztasaláta receptjéért.",
        "Szedj gombát a barlangból.",
        "Érj a Bányákba 0:00-ig.",
        "Ha kevés a megmaradt érced az öntözőkhöz, bányássz ércet a 21./41. szinten, mielőtt mélyebbre ereszkedsz.",
        {
          t: "Amint eléred a Bányák alját, térj vissza ércbányászathoz.",
          c: [
            {
              t: "A képességtől, szerencsétől és attól függően, hogy tartasz-e esős napi horgászszüneteket, a 120. szintet tavasz 14–18 között érheted el.",
              k: "tip",
            },
            {
              t: "Amint elkészítetted az összes (normál) öntözőt, a rézércre már csak szerszámfejlesztésekhez van szükség. A minőségi öntözőkhöz sok vasérc és aranyérc kell.",
              k: "tip",
            },
          ],
        },
        {
          t: "0:00-kor menj haza, és készíts + helyezz el annyi öntözőt, amennyit tudsz.",
          c: [{ t: "Nem baj, ha nem fedik le az összes terményt.", k: "tip" }],
        },
        {
          t: "Szállíts el tárgyakat 42,500g eléréséhez.",
          c: [
            {
              t: "Ha kevés, csak 32,500g-ig menj, és hagyd ki a holnapi 10,000g-s csomagot. (A legtöbb futásnál valószínűleg kevés lesz.)",
              k: "tip",
            },
          ],
        },
        "Ezután rögtön 2:00 lesz. Különben vágj füvet, és ájulj el.",
      ],
    },
    15: {
      items: [
        {
          t: "A díszszeder ma kezd megjelenni, de ne kerülj nagyot a leszedéséért.",
          c: [
            { t: "Az idő nem éri meg a kis energianyereséget.", k: "reason" },
            {
              t: "A díszszeder-bokroknál ugyanazt a szünet-stratégiát használd, mint a kukáknál.",
              k: "tip",
            },
          ],
        },
        "Öntözd meg az öntözők által még nem fedett terményeket (ha van ilyen).",
        "Ürítsd ki a tárhelyed. Vidd a tárgyakat a tavaszi gyűjtögetés (4), tavaszi termény (4), kovács (3), geológus (4) és kalandor (2) csomagokhoz.",
        {
          t: "Menj a Közösségi központba, és teljesítsd a csomagokat ezekkel a tárgyakkal.",
          c: [
            {
              t: "A két Kazánház-csomag teljesítése után ne feledj kilépni az Aranytekercsből, hogy ne ragadj be a hibás átvezetőbe.",
              k: "warn",
            },
          ],
        },
        "Ha van elég pénzed (42,500g), teljesítsd a Pince csomagot is.",
        "Menj haza, helyezz el egy kristaláriumot, és tegyél bele egy gyémántot.",
        "Ürítsd ki a tárhelyed, és menj a Bányákba.",
        "Ha kevés a megmaradt érced az öntözőkhöz, bányássz ércet a 21./41. szinten, mielőtt mélyebbre ereszkedsz.",
        "Bányássz 2:00-ig, majd ájulj el. Ha még több öntözőre van szükséged, ne feledd a tárhelyeden tartani a megolvasztott rudakat.",
        "A nap végén feloldódnak a csillék.",
      ],
    },
    16: {
      items: [
        "Szedj gombát a barlangból.",
        "Öntözd meg az öntözők által még nem fedett terményeket (ha van ilyen).",
        "Készíts több öntözőt a tegnapi megolvasztott rudakból (ha szükséges).",
        {
          t: "Bányássz 2:00-ig.",
          c: [
            {
              t: "Ne feledd a csillét használni a gyorsabb utazáshoz.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["Tavasz 17 után — itt az útmutató kevésbé részletes lesz."],
      items: [
        "Ha még nem érted el a Bányák 120. szintjét, fejezd be a lehető leggyorsabban.",
        {
          t: "Ezenkívül, ha több aranyra van szükséged a Pince befejezéséhez (42,500g), horgássz a Hegyi tónál, hogy a lehető leggyorsabban teljesítsd.",
          c: [
            {
              t: "Ha mindkettő hátravan, időzítsd úgy, hogy ugyanazon a napon fejeződjenek be.",
              k: "tip",
              c: [
                {
                  t: "A buszt csak másnap javítják meg.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Amint eléred a Bányák 120. szintjét, vidd át az összes kemencét a Bányákból a tanyára.",
        "Csináld a Koponya-barlangot a lehető leggyorsabban és leggyakrabban. (Lásd „Általános Koponya-barlang stratégia”.)",
        {
          t: "Szabadidődben:",
          c: [
            "Kezdd el kitisztítani a tanya törmelékét ott, ahová a minőségi öntözők + csillaggyümölcs kerülnek.",
            "Készíts és fektess le padlóburkolatot oda, ahová a minőségi öntözők kerülnek.",
            "Készíts és helyezz el madárijesztőket.",
            "Készíts több kemencét a felesleges rézből.",
            "Indíts tölgyfaerdőt makkok ültetésével a tanya egyik sarkában.",
            "Bányássz több ércet a Bányákban (20./40./80. szint).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Szállíts el tárgyakat:",
          c: [
            "2,000g a rézbalta-fejlesztéshez.",
            "Elég arany a 2. adag vadkáposzta mag megvételéhez (70g darabja).",
          ],
        },
      ],
    },
    19: {
      items: [
        "9:00-kor menj Clinthez, és fejleszd a rézbaltára (2,000g).",
        "Menj Pierre-hez, és vedd meg a 2. adag vadkáposzta magot.",
      ],
    },
    20: {
      items: [
        "Arasd le az 1. vadkáposztát, és ültesd a 2. terményt.",
        "Szállíts el tárgyakat 5,000g eléréséhez az acélbalta-fejlesztéshez.",
      ],
    },
    21: {
      items: [
        "Nézd meg A szószok királynőjét a Reteksaláta receptjéért.",
        "9:00-kor menj Clinthez, vedd át a rézbaltát, és fejleszd az acélbaltára (5,000g).",
        "Ha a minden-tárgy-elszállítása kihívásra mész az 1. év végéig, ma meg kell venned és el kell ültetned egy tulipán gumót (20g) és jazz magvakat (30g), hogy tavasz 28-ra készen legyenek.",
      ],
    },
    22: {
      items: ["Szállíts el tárgyakat 2,000g eléréséhez a rézkapa-fejlesztéshez."],
    },
    23: {
      items: [
        "9:00-kor menj Clinthez, vedd át az acélbaltát, és fejleszd a rézkapára (2,000g).",
        {
          t: "Most, hogy van acélbaltád, amikor szerencsétlen nap jön, használd a tanyahely megtisztítására és az öntözők előkészítésére. Még nem szerencsétlen napon is tedd meg legkésőbb a 27-ig.",
          c: [
            {
              t: "Ugyanakkor előbb el kell érned a Bányászás 10. szintet, mielőtt szünetet tartasz, mivel tavasz 25 előtt szükséged van a Kovács hivatásra.",
              k: "warn",
            },
            {
              t: "Ne feledj madárijesztőket és paszternák magvakat (kitöltő terményeket) is elhelyezni.",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Szállíts el, amennyit tudsz.",
          c: [
            { t: "Gyűjts össze annyi aranyat, amennyit tudsz holnapra.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Tervezd meg, hány csillaggyümölcs magot (400g darabja) ültess nyár 2-án. Futásonként változik; vedd figyelembe a Koponya-barlang bevételeidet mostantól nyár 2-ig. Körülbelül két napra van szükséged a tanya megtisztításához és előkészítéséhez. (Lehet, hogy egy napot már megtisztítottál egy szerencsétlen napon tavasz 23 után.) Célozz körülbelül 400–500 csillaggyümölcs magra.",
        "9:00-kor menj Clinthez, vedd át a rézkapát, és fejleszd az acélkapára (5,000g).",
        {
          t: "Menj az Oázisba, és vegyél egy luxus gyorsnövesztőt minden csillaggyümölcs maghoz, amit venni fogsz.",
          c: [
            {
              t: "Az Oázis csak csütörtökön árul luxus gyorsnövesztőt, és nyár 2-ra szükséged van rá.",
              k: "reason",
            },
            {
              t: "Ma Pam a klinikán van vizsgálaton (így nem vezeti a buszt), ezért Teleport-totem: Sivatag kell a sivatag eléréséhez. A legtöbb futásnál úgyis minden nap használsz teleport-totemet, így ez nem probléma.",
              k: "tip",
            },
          ],
        },
        {
          t: "A maradék pénzt költsd csillaggyümölcs magokra, hogy büntetés nélkül ájulhass el.",
          c: [
            {
              t: "A csillaggyümölcs magvak többi részét nyár 2-án vedd meg.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Nincs különösebb tennivaló."],
    },
    27: {
      items: [
        "Arasd le a 2. vadkáposztát. (Eléred a Gazdálkodás 6. szintet.)",
        "9:00-kor menj Clinthez, és vedd át az acélkapát.",
      ],
    },
    28: {
      items: [
        "Nézd meg A szószok királynőjét az Omlett receptjéért.",
        {
          t: "Szállíts el, amennyit tudsz.",
          c: [
            { t: "Gyűjts össze annyi aranyat, amennyit tudsz holnapra.", k: "reason" },
          ],
        },
        "Készíts és helyezz el minőségi öntözőket.",
        {
          t: "Ha még nem tetted, ültess paszternák magvakat (kitöltő termény).",
          c: [
            {
              t: "Ne használj luxus gyorsnövesztőt a paszternák magvakon, mivel nem szabad átkerülniük nyár 1-jére.",
              k: "warn",
            },
          ],
        },
        "Ha dél körül végzel, a hátralévő időt a Koponya-barlangban töltheted.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Semmi különös. Csinálhatod a Koponya-barlangot stb. A csillaggyümölcs magvakat csak holnap kell elültetned, ezért ne vágd le a paszternákokat.",
          c: [
            {
              t: "Az Agronómus hivatás a 3. csillaggyümölcsre van hatással.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Vágd le és ültesd el az összes luxus gyorsnövesztőt + az 1. adag csillaggyümölcs magot, amit tavasz 25-én vettél.",
        "9:00-kor menj az Oázisba a csillaggyümölcs magvak többi részéért, majd térj haza, és ültess.",
        {
          t: "Ez a nap nagy részét igénybe veszi. Ha van szabadidőd:",
          c: [
            "Készíts és helyezz el 10–20 villámhárítót.",
            "Helyezz csapolókat a tanyán szétszórt, ki nem vágott tölgyfákra.",
            "Folytasd a makkok ültetését a tanya egyik sarkában a tölgyfaerdő növesztéséhez.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Csináld a Koponya-barlangot.",
          c: [
            {
              t: "25,000g-re van szükséged az irídiumcsákány-fejlesztéshez.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Olvassz irídiumrudakat. Ha későn készülnek el (14:30 körül), menj Clinthez, és fejleszd az irídiumcsákányra.",
          c: [
            {
              t: "Ha az irídiumrudak önmagukban nem hoznak elég pénzt, drágaköveket adhatsz el közvetlenül Clintnek.",
              k: "tip",
            },
          ],
        },
        "Készíts és helyezz el 10–20 villámhárítót.",
        "Helyezz csapolókat a tanyán szétszórt, ki nem vágott tölgyfákra.",
        "Folytasd a makkok ültetését a tanya egyik sarkában a tölgyfaerdő növesztéséhez.",
        "A lehető legtöbb tölgyfagyantára van szükséged a keghordókhoz. A fatrágya nagyon hasznos a tölgyfaerdő gyors növesztéséhez, de az elkészítéséhez Gyűjtögetés 7. szint kell. A Gyűjtögetés szintezésének legjobb módja szinte semmi játékidő pazarlása nélkül (fák vágása vagy a Titkos erdőhöz vezető hosszú út helyett) a nyári magvak készítése és aratása.",
        {
          t: "Tehát azokon a napokon, amikor nem mész a Koponya-barlangba (mint ma):",
          c: [
            "Járd be a térképet nyári gyűjthető tárgyakért, és készíts legalább 10–20 nyári magot. Arass, készíts újra és ültess vissza annyit, amennyit tudsz, a Gyűjtögetés 7. szintig.",
            {
              t: "Vágd ki az 5 tuskót a Titkos erdőben Gyűjtögetés-tapasztalatért és keményfáért.",
              c: [
                { t: "100 keményfára van szükséged az Istállóhoz.", k: "reason" },
              ],
            },
            {
              t: "Amint van 100 keményfád, vedd meg az Istállót Robintól, hogy csökkentsd a jövőbeli Titkos erdő-oda-vissza utakat.",
              c: [
                {
                  t: "A második ház-fejlesztéshez 150 keményfa kell.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Nyár 5 után"],
      items: [
        "Csináld többet a Koponya-barlangot. Gyűjts össze annyi pénzt, amennyit tudsz, a 2. adag csillaggyümölcs maghoz.",
      ],
    },
    9: {
      items: ["Szállíts el eleget a 2. adag csillaggyümölcs mag megvételéhez."],
    },
    10: {
      items: [
        {
          t: "Vedd meg a 2. adag csillaggyümölcs magot.",
          c: [
            {
              t: "Az Oázis holnap zár a Luau miatt, ezért ma vegyél.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Arass és ültess vissza.",
          c: [
            {
              t: "A luxus gyorsnövesztő a mezőben marad, így nem kell újra felhordanod.",
              k: "reason",
            },
          ],
        },
        {
          t: "Ne adj el semmi csillaggyümölcsöt — még arany minőségűt sem —, tedd mindet keghordókba. Ezen a ponton csapolj annyi tölgyfát, és építs annyi keghordót, amennyit csak tudsz.",
          c: [
            { t: "Vegyél fát Robintól, ha elfogy.", k: "tip" },
            {
              t: "Ne adj el bort, amíg a Bizonytalanság szobránál Agronómusból Kézművessé nem váltasz.",
              k: "warn",
            },
          ],
        },
        "Eleinte megtöltheted a házadat keghordókkal. Később kényelmes több Nagy raktárt venni, és a ház közelébe helyezni. Vagy, amint feloldod a Kőbányát, fedd be padlóburkolattal, és használd keghordó-tárolásra.",
        {
          t: "A nap végén eléred a Gazdálkodás 10. szintet. Válaszd az Agronómus hivatást.",
          c: [
            {
              t: "Sajnos az Agronómus-hatás nem vonatkozik a ma ültetett terményekre.",
              k: "tip",
            },
            {
              t: "Később, a csillaggyümölcsbor eladása előtt válts Kézművesre.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Nyár 13 után"],
      items: [
        "Nyár 13 mindig viharos nap.",
        "Nyár 13-án vagy valamikor utána vegyél és ültess más nyári terményeket, amelyek csomagokhoz, küldetésekhez, ajándékokhoz stb. kellenek.",
        "A leghosszabb termények a dinnye és a kék áfonya, amelyek 10 napot vesznek igénybe az Agronómus hivatással. A luxus gyorsnövesztő ezt 7 napra csökkenti. Így az extra nyári termények ültetését legkésőbb nyár 21-ig halaszthatod.",
      ],
    },
    19: {
      items: ["Szállíts el elég tárgyat a 3. csillaggyümölcshöz."],
    },
    20: {
      items: [
        "Arasd le a csillaggyümölcsöt.",
        "9:00-kor menj az Oázisba, és vedd meg a 2. adag csillaggyümölcs magot.",
        {
          t: "Ültesd el a csillaggyümölcs magvakat.",
          c: [
            {
              t: "A luxus gyorsnövesztő a mezőben marad, így nem kell újra felhordanod.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Szállíts el eleget több luxus gyorsnövesztő megvételéhez.",
          c: [
            {
              t: "Az egész tanyát tökkel feded be, így extra gyorsnövesztőre van szükséged azon felül, ami a csillaggyümölcs-mezőkről átöröklődik.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Vegyél több luxus gyorsnövesztőt az Oázisban.",
        "Valamikor mostantól nyár 28-ig kapáld meg és helyezd el az összes minőségi öntözőt és az extra luxus gyorsnövesztőt. Ha nyár 28-án nem öntözöd meg a talajt, a búza nem lesz kész ősz 2-án.",
      ],
    },
    26: {
      items: ["Nyár 26 mindig viharos nap."],
    },
    27: {
      items: [
        "Szállíts el eleget búza magvak (10g darabja) megvételéhez, hogy holnap az egész tanyát befedd.",
      ],
    },
    28: {
      items: [
        "Arasd le a csillaggyümölcsöt.",
        "9:00-kor menj Pierre-hez, és vegyél búza magvakat az egész tanya befedéséhez.",
        {
          t: "Ültesd el a búza magvakat (kitöltő termény — megőrzi a luxus gyorsnövesztőt).",
          c: [
            {
              t: "A nyár 28-i ültetés csak akkor működik, ha van Agronómus hivatásod. Különben ezzel a stratégiával nem kapod meg a 3. tököt.",
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
        "Semmi különös. Csinálhatod a Koponya-barlangot stb. Meg kell várnod, míg a búza befejezi a növekedést.",
        "A Múzeum teljesítéséhez nagyon hasznos, ha tél 1 előtt Gyűjtögetés 10. szinted és Nyomkövető hivatásod van (hogy könnyebben észrevedd a leletpontokat). Ha még nincs Gyűjtögetés 10-ed, jobb, ha a felesleges juharfa magvakkal és fenyőtobozokkal nagy erdőt ültetsz, és mind kivágod. (Hatékonyabb, mint az őszi gyűjthető tárgyak aratása.)",
        "Szállíts el eleget tök magvak (100g darabja) megvételéhez a tanya befedéséhez.",
      ],
    },
    2: {
      items: [
        {
          t: "Arasd le a búzát, és ültess vissza tök magvakat az egész tanya befedéséhez.",
          c: [
            {
              t: "A tök jobb, mint a vörös áfonya, mert nem lesz elég keghordód az összes vörös áfonya feldolgozásához.",
              k: "reason",
            },
          ],
        },
        "Mint a csillaggyümölcsnél, ismételd az aratást + visszaültetést, hogy ősszel 3 tökaratást érj el.",
      ],
    },
    9: {
      items: [
        "Most már eladhatsz csillaggyümölcsbort.",
        "A Bizonytalanság szobránál válts Agronómusból Kézművessé.",
        {
          t: "Vegyél több magot holnapra.",
          c: [
            {
              t: "Pierre szerdán zárva van, ezért ma vegyél.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "Az 1. tök ma kész.",
        {
          t: "Ültess vissza.",
          c: [
            {
              t: "Mint a csillaggyümölcs, a tök is összesen 3-szor aratható.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Tél 1 után"],
      items: [
        {
          t: "Most van esélyed teljesíteni a Közösségi központ hátralévő csomagjait. A Gyömbér-sziget és a sziget-tanya feloldásához teljesítsd a Közösségi központot a lehető leggyorsabban.",
          c: [
            {
              t: "Amint eléred a sziget-tanyát, újra tömegesen ültethetsz csillaggyümölcsöt, ami a fő bevételi forrásoddá válik.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Mai célok (összefoglaló): egy fő cél (összecsukható fejléc) módszerekkel/okokkal (c).
// Az items-től elkülönítve; minden nap kulcscéljait sűríti. A triviális lépések kimaradnak,
// de a fontos hólabda-pontok (anyagok felhalmozása a következő napra stb.) megmaradnak.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Spórolj pénzt, hogy holnap a lehető leggyorsabban megvedd az üvegszálas horgászbotot (1,800g).",
        c: [
          {
            t: "Találkozz mindenkivel a városban.",
            c: [
              {
                t: "A „Bemutatkozás” küldetés teljesítése feloldja a „Hogyan barátkozz”-t, ami tavasz 2-án extra 100g-t ad.",
                k: "reason",
              },
            ],
          },
          "Ajánlj fel egy leletet a Múzeumnak a 250g jutalomért.",
          "Add el a gyűjthető tárgyaidat.",
        ],
      },
      {
        t: "Ültess magvakat.",
        c: [
          "Ültesd el a paszternák magvakat.",
          "Vágj gazt a városban, hogy kevert magvakat szerezz.",
        ],
      },
    ],
    2: [
      {
        t: "Vedd meg az üvegszálas horgászbotot (1,800g).",
        c: [
          "Vedd meg az edző horgászbotot (25g), és horgássz.",
          "Add a követ Willynek a „Hogyan barátkozz” jutalmáért (100g).",
        ],
      },
      "Vegyél csalit a következő napra.",
    ],
    3: [
      {
        t: "Szerezz egy rézércet.",
        c: [
          {
            t: "Hogy holnap kiváltsd Clint átvezető jelenetét.",
            k: "reason",
          },
          {
            t: "Szerezd horgászással.",
            c: [
              {
                t: "Ha nem szerzel egyet, tarts meg 75g-t, hogy rézércet vegyél Clinttől.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Fogj annyi harcsát, amennyit tudsz.",
        c: ["Add el az összes halat + a felesleges strand-gyűjthetőt Willy boltjában, és vegyél csalit."],
      },
    ],
    4: [
      {
        t: "Szerezz 150 fát.",
        c: [
          {
            t: "A következő két napban 2 ládára és egy madárijesztőre lesz szükséged.",
            k: "reason",
          },
        ],
      },
      "Horgássz a Hegyi tónál.",
    ],
    5: [
      {
        t: "Fejleszd a csákányod a rézcsákányra (2,000g).",
        c: [
          {
            t: "Készíts 5 rézrudat a Bányák 10. szintjén, és add le a csákányt Clintnél.",
            c: [
              {
                t: "Add le, mielőtt Clint zár (az 5 rudat legkésőbb 15:00-ig fejezd be).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Ültess magvakat, és horgássz a Hegyi tónál.",
        c: [
          "Vegyél és ültess vadkáposzta magvakat (a Gazdálkodás 2-höz) plusz bab-, karfiol- és krumpli magvakat.",
        ],
      },
      {
        t: "Halmozz fel a következőkre.",
        c: [
          {
            t: "Tarts meg jádekövet, smaragdot, rubint és gyémántot a Koponya-barlanghoz.",
            k: "tip",
          },
          { t: "Tarts meg egy szenet egy madárijesztőhöz.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Spórolj az acélcsákány-fejlesztésre (5,000g) és aranyércre.",
        c: ["Horgássz a Hegyi tónál vasrudakért + eladható halért."],
      },
      {
        t: "Váltsd ki a Közösségi központ átvezető jelenetét, és érintsd meg az Aranytekercset (elindítja a küldetést).",
        c: [
          { t: "Akkor váltódik ki, amikor a buszmegállóból belépsz a városba.", k: "tip" },
        ],
      },
      "Készíts és helyezz el egy madárijesztőt.",
    ],
    7: [
      {
        t: "Fejleszd a csákányod az acélcsákányra (5,000g).",
        c: ["Vegyél aranyércet a Kovácsnál, majd fejlessz."],
      },
      "Találkozz a Varázslóval (átvezető jelenetet vált ki).",
      "Horgássz a Hegyi tónál, és olvassz aranyrudakat.",
    ],
    8: [
      {
        t: "Spórolj 12,000g-t az aranycsákány (10,000g) és a hátizsák (2,000g) fejlesztésére.",
        c: ["Horgássz a Hegyi tónál eladható tárgyakért."],
      },
      {
        t: "Olvassz 5 aranyrudat, és aludj el úgy, hogy tartod őket.",
        c: [
          {
            t: "Ébredj 50% energiával a túlerőltetés elkerülésére (az első nap szintlépés nélkül).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Fejleszd az aranycsákányra (10,000g), és fejleszd a hátizsákodat (2,000g).",
      "Horgássz a Hegyi tónál (Horgászás 10 → Horgász hivatás).",
    ],
    10: [
      {
        t: "Számold ki a Gazdálkodás 6-hoz szükséges vadkáposzta magvakat, és spórolj a felére.",
        c: [
          {
            t: "Ültesd a vadkáposztát két részletben, hogy ne készíts a szükségesnél több öntözőt.",
            k: "tip",
          },
          {
            t: "Ha nincs Horgászás 10-ed, ne szállítsd el — holnap add el közvetlenül Willynek.",
            k: "tip",
          },
        ],
      },
      {
        t: "Vigyél egy kemencét a holnapi Bányákhoz.",
        c: [{ t: "Ne feledd elájulás előtt.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Arasd le a vadkáposztát (Gazdálkodás 2), és vedd meg + ültesd el a 2. adag vadkáposzta magot (6,020g).",
        c: [
          "Kapáld a mezőket öntöző-mintázatban (öntözés nélkül).",
          { t: "A vadkáposztát tavasz 14-ig nem kell öntözni.", k: "tip" },
        ],
      },
      "Bányássz és olvassz rudakat a Bányákban.",
    ],
    12: [
      {
        t: "Bányássz és olvassz rezet és vasat.",
        c: ["Válaszd a Bányász hivatást a Bányászás 5. szintjén."],
      },
    ],
    13: [
      {
        t: "Folytasd az ereszkedést és a bányászást a Bányákban.",
        c: [
          { t: "Hagyd ki a Tojásfesztivált, hacsak nem kell valami (időpazarlás).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Ereszkedj a Bányák 120. szintje felé, ércet bányászva az öntözőkhöz.",
        c: ["Ha kevés, bányássz vas-/aranyércet a 21./41. szinten."],
      },
      {
        t: "Szállíts el aranyat a Pince csomaghoz (42,500g).",
        c: [
          {
            t: "Ha kevés, csak 32,500g-ig menj, és hagyd ki a holnapi 10,000g-s csomagot.",
            k: "tip",
          },
        ],
      },
      "Készíts annyi öntözőt, amennyit tudsz otthon.",
    ],
    15: [
      {
        t: "Teljesítsd a Közösségi központ csomagjait.",
        c: [
          "Vidd és add le a tárgyakat a tavaszi gyűjtögetés, tavaszi termény, kovács, geológus és kalandor csomagokhoz.",
          { t: "Ha van elég pénzed (42,500g), teljesítsd a Pince csomagot is.", k: "tip" },
          {
            t: "Lépj ki az Aranytekercsből, hogy ne ragadj be a hibás átvezetőbe.",
            k: "warn",
          },
        ],
      },
      "Helyezz el egy kristaláriumot, és tegyél bele egy gyémántot.",
      {
        t: "Bányássz 2:00-ig.",
        c: [{ t: "A csillék a nap végén oldódnak fel.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Bányássz, és készíts több öntözőt.",
        c: [{ t: "Utazz gyorsabban a csillével.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Fejezd be a Bányák 120. szintjét, és teljesítsd a Pincét (42,500g).",
        c: [
          {
            t: "Ha mindkettő hátravan, időzítsd úgy, hogy ugyanazon a napon fejeződjenek be (a buszt másnap javítják meg).",
            k: "tip",
          },
        ],
      },
      "Csináld a Koponya-barlangot, amilyen gyakran csak tudod.",
      {
        t: "Készítsd elő a következő terményeket a szabadidődben.",
        c: [
          "Tisztítsd ki a tanya törmelékét, és fektess le padlóburkolatot oda, ahová a minőségi öntözők kerülnek.",
          "Készíts több madárijesztőt és kemencét, és ültess makkokat egy tölgyfaerdő növesztéséhez.",
        ],
      },
    ],
    18: [
      "Szállíts el aranyat a rézbalta-fejlesztéshez (2,000g) és a 2. adag vadkáposzta maghoz.",
    ],
    19: [
      "Fejleszd a baltádat a rézbaltára (2,000g).",
      "Vedd meg a 2. adag vadkáposzta magot Pierre-től.",
    ],
    20: [
      "Arasd le az 1. vadkáposztát, és ültesd a 2. terményt.",
      "Szállíts el aranyat az acélbalta-fejlesztéshez (5,000g).",
    ],
    21: [
      "Fejleszd a baltádat az acélbaltára (5,000g).",
      {
        t: "(Opcionális) Ha a minden-tárgy-elszállítása kihívásra mész, ültess tulipán gumót és jazz magvakat.",
        c: [{ t: "Tavasz 28-ra készen lesznek.", k: "reason" }],
      },
    ],
    22: ["Szállíts el aranyat a rézkapa-fejlesztéshez (2,000g)."],
    23: [
      "Fejleszd a kapádat a rézkapára (2,000g).",
      {
        t: "Szerencsétlen napon tisztítsd meg a tanyahelyet, és készítsd elő az öntözőket (legkésőbb a 27-ig).",
        c: [
          {
            t: "Előbb érd el a Bányászás 10. szintet, mielőtt szünetet tartasz (tavasz 25 előtt szükséges a Kovács hivatás).",
            k: "warn",
          },
          {
            t: "Helyezz el madárijesztőket és paszternák magvakat is (kitöltő).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Gyűjts össze annyi aranyat, amennyit tudsz holnapra.",
        c: ["Szállíts el, amennyit tudsz."],
      },
    ],
    25: [
      "Tervezd meg, hány csillaggyümölcs magot ültess nyár 2-án (célozz ~400–500-ra).",
      "Fejleszd a kapádat az acélkapára (5,000g).",
      {
        t: "Vegyél luxus gyorsnövesztőt az Oázisban (egyet csillaggyümölcs magonként).",
        c: [{ t: "Az Oázis csak csütörtökön árulja.", k: "reason" }],
      },
    ],
    26: ["Semmi különös. Csináld a Koponya-barlangot stb."],
    27: [
      "Arasd le a 2. vadkáposztát (Gazdálkodás 6).",
      "Vedd át az acélkapát Clinttől.",
    ],
    28: [
      {
        t: "Készíts minőségi öntözőket, és ültess kitöltő terményt (paszternák).",
        c: [
          {
            t: "Ne használj luxus gyorsnövesztőt a paszternákon (nem szabad átkerülniük nyár 1-jére).",
            k: "warn",
          },
        ],
      },
      "Szállíts el annyi aranyat, amennyit tudsz holnapra.",
    ],
  },
  summer: {
    1: [
      {
        t: "Semmi különös. Csináld a Koponya-barlangot stb.",
        c: [
          {
            t: "Ne vágd le a paszternákokat (az Agronómus hivatás a 3. csillaggyümölcsre van hatással).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Ültesd el az 1. csillaggyümölcsöt luxus gyorsnövesztővel.",
        c: ["Vedd meg a csillaggyümölcs magvak többi részét az Oázisban, és ültesd el őket."],
      },
      {
        t: "Halmozz fel a szabadidődben.",
        c: [
          "Készíts 10–20 villámhárítót.",
          "Helyezz csapolókat a tölgyfákra, és ültess makkokat a tölgyfaerdő növesztéséhez.",
        ],
      },
    ],
    3: [
      {
        t: "Csináld a Koponya-barlangot.",
        c: [
          {
            t: "25,000g-re van szükséged az irídiumcsákány-fejlesztéshez.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Olvassz irídiumrudakat, és fejleszd az irídiumcsákányra.",
      {
        t: "Gyűjts tölgyfagyantát és keményfát, miközben a Gyűjtögetés 7. szintre törekszel.",
        c: [
          "Készíts és arass nyári magvakat Gyűjtögetés-tapasztalatért.",
          "Vágd ki a Titkos erdő tuskóit keményfáért.",
          {
            t: "Vedd meg az Istállót 100 keményfával a jövőbeli oda-vissza utak csökkentésére.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Csináld a Koponya-barlangot, spórolva a 2. adag csillaggyümölcs magra."],
    9: ["Szállíts el eleget a 2. adag csillaggyümölcs mag megvételéhez."],
    10: [
      {
        t: "Vedd meg a 2. adag csillaggyümölcs magot.",
        c: [{ t: "Az Oázis holnap zár a Luau miatt, ezért ma vegyél.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Ismételd az aratást/visszaültetést, és tedd az összes csillaggyümölcsöt keghordókba.",
        c: [
          "Csapolj annyi tölgyfát, és építs annyi keghordót, amennyit csak tudsz.",
          {
            t: "Ne adj el bort, amíg Kézművesre nem váltasz.",
            k: "warn",
          },
        ],
      },
      "A nap végén eléred a Gazdálkodás 10-et (Agronómus hivatás).",
    ],
    13: [
      "Vegyél és ültess más nyári terményeket csomagokhoz/küldetésekhez (legkésőbb nyár 21-ig).",
    ],
    19: ["Szállíts el eleget a 3. csillaggyümölcshöz."],
    20: ["Arasd le a csillaggyümölcsöt, és ültess vissza (vedd meg a 2. adag magot az Oázisban)."],
    24: [
      {
        t: "Szállíts el eleget több luxus gyorsnövesztő megvételéhez.",
        c: [
          {
            t: "Az egész tanyát tökkel feded be, így extra gyorsnövesztőre van szükséged.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Helyezz el minőségi öntözőket és extra luxus gyorsnövesztőt.",
        c: [
          {
            t: "Öntözz nyár 28-án, hogy a búza kész legyen ősz 2-án.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Semmi különös (mindig viharos nap)."],
    27: ["Szállíts el eleget búza magvak megvételéhez, hogy holnap az egész tanyát befedd."],
    28: [
      "Arasd le a csillaggyümölcsöt.",
      {
        t: "Ültess búza magvakat az egész tanyán (kitöltő).",
        c: [
          {
            t: "Csak Agronómus hivatással érvényes (a 3. tökhöz).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Szállíts el eleget tök magvak megvételéhez a tanya befedéséhez.",
      {
        t: "(Opcionális) Készítsd elő a Gyűjtögetés 10. szintet és a Nyomkövető hivatást a Múzeumhoz.",
        c: [
          {
            t: "Erdőt ültetni juharfa magvakkal és fenyőtobozokkal, majd kivágni hatékony.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Arasd le a búzát, és ültess tök magvakat az egész tanyán.",
        c: [
          {
            t: "A tök jobb, mint a vörös áfonya, mert nem lesz elég keghordód.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Válts Kézművesre, hogy elkezdhesd a csillaggyümölcsbor eladását.",
        c: ["A Bizonytalanság szobránál válts Agronómus → Kézműves."],
      },
      {
        t: "Vegyél magvakat holnapra előre.",
        c: [{ t: "Pierre szerdán zárva van, ezért ma vegyél.", k: "reason" }],
      },
    ],
    10: ["Arasd le az 1. tököt, és ültess vissza."],
  },
  winter: {
    1: [
      {
        t: "Teljesítsd a Közösségi központ hátralévő csomagjait.",
        c: [
          {
            t: "A Gyömbér-sziget és a sziget-tanya feloldása lehetővé teszi, hogy újra tömegesen ültess csillaggyümölcsöt fő bevételként.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
