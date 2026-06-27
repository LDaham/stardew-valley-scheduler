// =============================================================================
// LIZENZHINWEIS (GPL-3.0)
// Der Anleitungsinhalt in dieser Datei (MIN_MAX_GUIDE / DAILY_GOALS) ist eine
// Bearbeitung von "Stardew Valley Min-Max Routing / Strategy" von BlackSight6 &
// Zamiel (GPL-3.0).
//   Quelle: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Lizenz: GNU GPL-3.0 — vollständiger Text in LICENSES/GPL-3.0.txt.
// Änderungen: gekürzt und in einen tagesweisen Datenbaum (GuideNode) umstrukturiert,
// Eigennamen mit den offiziellen deutschen Spielbezeichnungen.
// Daher unterliegt diese Datei der GPL-3.0, nicht der MIT-Lizenz des Projekts.
// (Getrennt vom Wiki-Material unter CC BY-NC-SA gehalten; als bloße Zusammenstellung verbreitet.)
//
// Copyright (C) BlackSight6 & Zamiel (Originalanleitung)
// Bearbeitung (C) 2026 Lee Daham
// Dieses Programm ist freie Software: Sie können es unter den Bedingungen der GNU
// General Public License, wie von der Free Software Foundation veröffentlicht,
// weitergeben und/oder verändern, entweder gemäß Version 3 der Lizenz oder (nach
// Ihrer Wahl) jeder späteren Version. Dieses Programm wird OHNE JEDE GEWÄHRLEISTUNG
// bereitgestellt. Siehe die GNU GPL für weitere Details:
// https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Schnapp dir die Pastinaken-Saat.",
        {
          t: "Fälle sofort 9 Bäume, um Sammeln-Stufe 1 zu erreichen.",
          c: [
            { t: "Du brauchst 8 1/3 Bäume.", k: "tip" },
            {
              t: "Du brauchst Stufe 1 vor dem Sammeln, damit du eine Chance auf Frühlingszwiebeln in Silberqualität hast.",
              k: "reason",
            },
            {
              t: "Konzentriere dich nur aufs Fällen und beginne in Richtung des Wegs zum Wald.",
              k: "tip",
              c: [
                {
                  t: "So entfernst du gleichzeitig das Unkraut entlang des Wegs, was dein Vorankommen erleichtert.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Fälle nur Ahornbäume und Kiefern, nicht die eiförmigen Eichen.",
              k: "warn",
              c: [
                {
                  t: "Eichen lassen erst ab Frühling 2 Eicheln fallen, und Eicheln sind kostbar.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Aus demselben Grund solltest du Samen am Boden vor Frühling 2 nicht mit Axt oder Hacke berühren (sie werden zerstört).",
              k: "warn",
            },
            {
              t: "Hacke keine Baumstümpfe; schlage jeden Baum, bis er fällt (bis zu 10 Schläge), und geh dann zum nächsten.",
              k: "tip",
              c: [{ t: "Das bringt mehr Holz und Sammeln-EP.", k: "reason" }],
            },
            {
              t: "Wenn ein Baum zu fallen beginnt, geh dorthin, wo das Holz landen wird, und pausiere sofort.",
              k: "tip",
            },
            {
              t: "Die Spielzeit stoppt, aber die Fallanimation läuft weiter, und das Holz wird während der Pause automatisch eingesammelt.",
              k: "reason",
            },
            {
              t: "Nutze diese Strategie immer beim Fällen von Bäumen (nicht bei Stümpfen).",
              k: "tip",
            },
            {
              t: "Wenn du dich verzählst, prüfe im Fähigkeiten-Tab den Sammeln-Stufenaufstieg.",
              k: "tip",
            },
            { t: "Das ist auch fürs Angeln morgen nützlich.", k: "tip" },
          ],
        },
        "Sobald du Sammeln 1 hast, stelle eine Truhe her, platziere sie neben deinem Haus und leere dein Inventar – behalte nur Sense, Axt, Spitzhacke und Hacke.",
        "Geh nach Süden in den Wald. (Es ist etwa 9:20 Uhr.)",
        {
          t: "Nutze einen Screenshot/Zoom, um die Sammelobjekte im Zundersaftwald zu prüfen und deine Route zu planen.",
          c: [
            "Sammle alle Sammelobjekte im Vorbeigehen ein.",
            {
              t: "Wenn dadurch keine Energiegewinne verschwendet werden, kannst du Frühlingszwiebeln direkt beim Pflücken essen, um Inventarplatz zu schaffen.",
              k: "tip",
            },
            {
              t: "Schneide so viel Unkraut wie möglich, aber mach für ein einzelnes keinen großen Umweg.",
              k: "tip",
            },
            { t: "Du musst Marnie bis 12:50 Uhr treffen.", k: "reason" },
          ],
        },
        {
          t: "Triff Jas, während sie von ihrem Haus zum Seilspring-Platz geht.",
          time: "11:20 Uhr",
        },
        {
          t: "Triff Haley auf dem Weg zum Foto-Platz im Südwesten. Wenn du im Zeitplan vorne liegst, ist jetzt eine gute Gelegenheit, mehr Unkraut zu schneiden.",
          time: "11:40 Uhr",
        },
        "Geh in die Stadt.",
        {
          t: "Durchsuche die zwei Mülltonnen bei Jodis und Haleys Häusern und entferne dazwischen Unkraut, wenn Zeit bleibt.",
          c: [
            {
              t: "Direkt nach dem Durchsuchen einer Mülltonne zu pausieren ist optimal.",
              k: "tip",
            },
            {
              t: "Das verhindert Zeitverlust, wenn Gegenstände in die entgegengesetzte Richtung herausspringen.",
              k: "reason",
            },
            {
              t: "Es ähnelt der Pausenstrategie bei fallenden Bäumen.",
              k: "tip",
            },
            {
              t: "Mülltonnen zu durchsuchen kostet viel Zeit, daher tut die Route das nur an den ersten beiden Tagen.",
              k: "tip",
            },
          ],
        },
        {
          t: "Triff Marnie, während sie von Pierres Gemischtwarenladen zur Ranch geht (sie kommt an Emilys Haus vorbei).",
          time: "12:50 Uhr",
        },
        "Geh zum Strand.",
        {
          t: "Hacke die Artefaktstellen um, um dein erstes Artefakt zu ergattern.",
          c: [
            "Lass die Strand-Sammelobjekte am Boden liegen.",
            {
              t: "Du hast jetzt wenig Inventarplatz und kannst sie an Frühling 2 einsammeln.",
              k: "reason",
            },
          ],
        },
        {
          t: "Triff Elliott am Lagerfeuer südlich seiner Hütte.",
          time: "12:00 Uhr",
        },
        "Geh in die Stadt.",
        "Falls du ein Artefakt hast, spende es dem Museum und kassiere die Belohnung (250g).",
        "Durchsuche die Mülltonnen beim Museum und beim Schmied.",
        {
          t: "Triff Clint im Schmied.",
          c: [{ t: "Geh anschließend nach Osten.", k: "tip" }],
        },
        "Durchsuche die Mülltonne beim Joja-Markt.",
        {
          t: "Triff Pam, Sam und Shane im Joja-Markt.",
          c: [
            {
              t: "Sam und Shane gelten als getroffen, auch während sie arbeiten.",
              k: "reason",
            },
          ],
        },
        "Entferne das Unkraut hinter (nördlich von) dem Joja-Markt.",
        "Triff Abigail auf der Brücke.",
        {
          t: "Wenn Maru nach Süden läuft und in der Nähe ist, sprich sie jetzt an; andernfalls triff sie später, wenn sie auf der Bank sitzt.",
          time: "15:20 Uhr",
        },
        "Durchsuche die Mülltonne bei Lewis' Haus.",
        "Triff Evelyn (Blumengarten), Caroline + Jodi (Stadtplatz) und Vincent + Harvey (oberhalb von Jodis Haus).",
        "Schneide Unkraut auf der Westseite der Karte in der Nähe von Harvey.",
        {
          t: "Triff Leah + Pierre in Pierres Gemischtwarenladen.",
          c: [
            {
              t: "Du musst hinter den Tresen gehen, um mit Pierre zu sprechen.",
              k: "tip",
            },
            {
              t: "Kaufe heute nichts bei Pierre, da du Frühlingsfeldfrüchte an Frühling 5–6 kaufst.",
              k: "tip",
            },
          ],
        },
        {
          t: "Triff alle Übrigen in der Nähe der Kneipe.",
          time: "ca. 16:00 Uhr",
          c: [
            {
              t: "Um 16:00 Uhr beendet Alex sein Training und verlässt sein Zimmer. Durchsuche die Mülltonne beim Haus und geh hinein, um George und Alex zu treffen.",
              c: [
                {
                  t: "Wenn du zu früh bist, musst du eventuell warten, bis Alex sein Zimmer verlässt.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Um 16:00 Uhr trifft Emily in der Kneipe ein. Durchsuche die Mülltonne bei der Kneipe und geh hinein, um Gus und Emily zu treffen.",
              c: [{ t: "Für Gus musst du hinter den Tresen gehen.", k: "tip" }],
            },
            "Um 16:20 Uhr geht Penny an Lewis' Zaun vorbei und Alex verlässt das Haus.",
            "Um 16:40 Uhr kommt Penny mit Maru an der Bank an. Falls du sie noch nicht getroffen hast, hol das dort nach.",
            "Prüfe dein Quest-Log, um zu bestätigen, dass du heute 24 von bis zu 27 Personen getroffen hast.",
          ],
        },
        {
          t: "Geh zurück zur Farm.",
          c: [
            {
              t: "Lass die Sammelobjekte an der Bushaltestelle vorerst am Boden liegen.",
              k: "tip",
            },
          ],
        },
        "Leere dein Inventar. Behalte deine Werkzeuge.",
        "Schneide Unkraut auf der Farm bis etwa 18:00 Uhr.",
        "Geh gegen 18:10 Uhr in den hinteren Wald.",
        "Triff Linus vor seinem Zelt.",
        {
          t: "Triff Demetrius südöstlich seines Hauses.",
          c: [
            {
              t: "Robin hast du bereits getroffen, also musst du nicht mit ihr sprechen.",
              k: "reason",
            },
          ],
        },
        {
          t: "Triff Sebastian, wenn er das Haus verlässt.",
          c: [
            {
              t: "Wenn du vor 19:00 Uhr ankommst, musst du warten, bis er um 18:40 Uhr aus seinem Zimmer kommt.",
              k: "tip",
            },
            {
              t: "Das ist verlorene Zeit, die du mit mehr Unkrautschneiden auf der Farm hättest nutzen können.",
              k: "reason",
            },
          ],
        },
        "Geh nach Süden zum Gemeinschaftszentrum.",
        "Schneide Unkraut westlich des Gemeinschaftszentrums.",
        "Schneide Unkraut westlich des Brunnens.",
        {
          t: "Geh nach Hause.",
          c: [
            {
              t: "Sammle die Sammelobjekte an der Bushaltestelle ein, die du zuvor liegen gelassen hast.",
              k: "tip",
            },
          ],
        },
        {
          t: "Hacke, pflanze und gieße die Pastinaken-Saat + Gemischte Saat.",
          c: [
            {
              t: "Wenn du über die anfänglichen 15 Pastinaken-Saaten hinaus pflanzt, können Krähen täglich eine oder mehrere fressen. Aber die Gemischte Saat zu pflanzen lohnt sich für den Mehrwert. (Blumenkohl und Kartoffel aus der Gemischten Saat ersparen dir später den Kauf für das Frühlingsfeldfrüchte-Bündel.)",
              k: "tip",
            },
          ],
        },
        "Fälle Bäume, bis du noch 4–6 Energie hast.",
        {
          t: "Schneide Unkraut und Gras bis 1:00–1:30 Uhr, je nachdem, wie viel Gemischte Saat du hast.",
          c: [
            {
              t: "Du musst die gesamte Gemischte Saat vor 2:00 Uhr hacken, pflanzen und gießen.",
              k: "warn",
            },
          ],
        },
        {
          t: "Geh nach Hause und verschiffe alles außer:",
          c: ["Stein", "Holz", "Kohle", "20 Fasern"],
        },
        {
          t: "Hinweis:",
          k: "tip",
          c: [
            {
              t: "Verkaufe alle Sammelobjekte außer Frühlingszwiebeln. Kümmere dich später um die Gemeinschaftszentrum-Bündel. Morgen brauchst du so viel Geld wie möglich.",
              k: "tip",
            },
            {
              t: "Normalerweise isst du Lauch, Löwenzahn und Mülltonnen-Essen (niedriger GPE) statt sie zu verkaufen, aber heute ist Geld dringend, also eine Ausnahme.",
              k: "tip",
            },
          ],
        },
        {
          t: "Hacke, pflanze und gieße die restliche Gemischte Saat.",
          c: [
            {
              t: "Selbst wenn du dich unter 0 Energie überanstrengst und zusammenbrichst, steigst du an Frühling 2 in Sammeln auf, sodass keine Strafe übernommen wird.",
              k: "tip",
            },
            {
              t: "Falls eine der Gemischten Saaten kein Blumenkohl ist (prüfe mit einer Mod oder dem Wiki), musst du die erste Bündelabgabe und die zusätzliche Goldlieferung für den Tresor – geplant für Frühling 15 – auf Frühling 17 verschieben.",
              k: "warn",
            },
            {
              t: "Ein Mangel an Loren erhöht den Zeitdruck beim Durchqueren der Minen leicht, aber das ist sehr selten und ändert die Route nicht.",
              k: "tip",
            },
          ],
        },
        {
          t: "Sei in deinem Haus.",
          time: "kurz vor 2:00 Uhr",
          c: [{ t: "Um die Goldstrafe zu vermeiden.", k: "reason" }],
        },
        {
          t: "Zerstöre das Bett.",
          c: [
            {
              t: "Du erscheinst jeden Morgen direkt neben der Tür, was Zeit spart.",
              k: "reason",
            },
            {
              t: "Oder entferne es aus dem Haus und bewahre es in einer Truhe auf.",
              k: "tip",
            },
          ],
        },
        {
          t: "Stelle den Fernseher neben die Tür.",
          c: [{ t: "Um ihn direkt nach dem Aufwachen zu prüfen.", k: "reason" }],
        },
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Sammeln 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Lies deine gesamte Post.",
          c: [
            {
              t: "Du musst Willys Brief lesen, um die Bambusstange zu erhalten.",
              k: "reason",
            },
          ],
        },
        "Gieße deine Feldfrüchte.",
        {
          t: "Stelle eine Truhe her und trage sie bei dir.",
          c: [
            {
              t: "An Frühling 1 hast du eventuell nur 0–3 Frühlingszwiebeln (und kein Mülltonnen-Essen) bekommen und keine 50 Holz gefällt. Fälle jetzt 50 und setze die Route fort. Beachte nur, dass sich alles leicht verzögert.",
              k: "tip",
            },
          ],
        },
        "Leere dein gesamtes Inventar in die Truhe. Nimm die Hacke + die hergestellte Truhe + 1 Stein.",
        {
          t: "Durchsuche die Mülltonnen bei Georges Haus, der Kneipe und Lewis' Haus.",
          c: [
            {
              t: "Es ist in Ordnung, wenn Dorfbewohner dich erwischen – die Freundschaft jedes NPCs ist noch 0.",
              k: "reason",
            },
            {
              t: "Das ist das letzte Mal, dass du für Mülltonnen einen Umweg machst. Sie kosten viel Zeit, also durchsuche sie danach nur, wenn es keine zusätzliche Zeit kostet.",
              k: "tip",
            },
          ],
        },
        "Geh zum Strand und erhalte die Bambusstange.",
        "Gib Willy den Stein und kassiere die Belohnung der Quest 'Wie man Freunde gewinnt' (100g).",
        "Platziere die Truhe in der unteren rechten Ecke des Stegs.",
        "Angle vom Steg aus nach Osten. Wirf mit maximaler Weite aus.",
        {
          t: "Zerstöre um 8:40 Uhr die Bambusstange und prüfe die übrigen Strand-Sammelobjekte + Artefaktstellen.",
          c: [
            {
              t: "Falls du jetzt ein Artefakt bekommst und an Frühling 1 keines hattest, spende es sofort für die Belohnung (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Geh zu Willys Laden. Verkaufe alle Strand-Sammelobjekte + Fische. Kaufe die Übungsangel (25g) bei Willy.",
          c: [
            {
              t: "Die Übungsangel erhöht deine Chance auf perfekte Fänge. (Fischen mit perfekten Fängen zu steigern ist wichtiger als hochwertige Fische.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Wirf mit der Übungsangel mit minimaler Weite direkt südlich von Willys Tür aus. Sammle genug Fische, um 1,800g zu erreichen.",
          c: [
            {
              t: "Würfe mit minimaler Weite haben eine höhere Chance auf einfache Fische und verkürzen die Wurf-/Einholanimationen.",
              k: "reason",
            },
            { t: "Siehe auch die 'Allgemeine Angelstrategie'.", k: "tip" },
          ],
        },
        "Wenn Seetang (1.54 GPE) und Joja-Cola (1.92 GPE) aufgebraucht sind, iss die hochwertigste Sardelle (1.82 GPE) oder Hering (1.82 GPE).",
        {
          t: "Sobald du genug Fische für 1,800g hast und Fischen-Stufe 2 erreichst, zerstöre die Übungsangel, verkaufe alle Fische und kaufe die Fiberglasangel bei Willy. Kaufe außerdem so viel Köder wie möglich (je 5g) und rüste ihn an der neuen Angel aus.",
          c: [
            {
              t: "Perfekte Fänge werden seltener, aber dank Köder gibt die Fiberglasangel schneller EP.",
              k: "reason",
            },
          ],
        },
        "Angle an derselben Stelle mit Würfen maximaler Weite.",
        {
          t: "Wenn die Angel um 16:30 Uhr weniger als 35 Köder hat, kaufe mehr bei Willy.",
          c: [
            {
              t: "Du brauchst genug Köder für den Rest des heutigen Tages plus morgen früh.",
              k: "reason",
            },
          ],
        },
        "Angle bis 2:00 Uhr. Lege alle Fische in die Truhe, bevor du zusammenbrichst. (Verkaufe sie morgen an Willy.)",
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Fischen 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "Frühling 3 ist immer regnerisch.",
        "Leere dein gesamtes Inventar in die Truhe. Nimm die Fiberglasangel.",
        "Wenn du 80+ Köder hast und aus der Angel-Truhe von Frühling 2 Kupfererz bekommen hast, stelle eine Truhe her, trage sie bei dir und geh direkt zum Fluss im Zundersaftwald zum Angeln. Denk daran, die Anleitung kurz zu verlassen, um mehr Köder bei Willy zu kaufen, bevor du morgen zum Bergsee gehst.",
        {
          t: "Andernfalls:",
          c: [
            "Nimm die Hacke aus der Truhe.",
            "Angle südlich von Leahs Haus bis 8:30 Uhr oder bis dir der Köder ausgeht (je nachdem, was zuerst eintritt).",
            "Durchsuche die Mülltonnen südlich von Jodis und Emilys Häusern.",
            "Prüfe Sammelobjekte + Artefaktstellen am Strand.",
            {
              t: "Verkaufe alle Fische + überschüssige Strand-Sammelobjekte in Willys Laden.",
              c: [
                {
                  t: "Wenn du willst, kannst du eine Sardine für das Meeresfisch-Bündel behalten.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Kaufe Köder, bis dir nur noch 75g bleiben.",
              c: [
                {
                  t: "Wenn du bereits Kupfererz in der Angel-Truhe gefunden hast, kannst du dein ganzes Geld für Köder ausgeben.",
                  k: "tip",
                },
                {
                  t: "Die Menge an Köder, die du hier kaufen kannst, variiert je nach Durchlauf (500–700), aber was auch immer du kaufst, du wirst alles vor Frühlingsende verbrauchen.",
                  k: "tip",
                },
                {
                  t: "Theoretisch könntest du den Verkauf einiger Fische verschieben, bis du den Beruf Fischer hast. Aber es gibt drei Probleme. Erstens lohnt es sich nur, wenn du mehr als etwa eine Stunde Angeln am Bergsee einbringst. Zweitens ist die Anzahl der Fische, die du beim Zusammenbruch am Ende von Frühling 3 tragen kannst, begrenzt. Drittens ist die nächste günstige Gelegenheit, Köder zu kaufen, nach der Abgabe der Spitzhacke an Frühling 5, einem Tag mit kaum freier Zeit. Jetzt zu verkaufen ist insgesamt einfacher und deutlich risikoärmer.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Leere den Inhalt der Truhe und nimm die Truhe mit.",
              c: [
                {
                  t: "Um das ohne Energieverlust zu tun, wähle einen leeren Werkzeugleisten-Slot und klicke schnell mehrfach mit links.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Wenn du 75g behalten hast, geh zu Clint und kaufe Kupfererz (75g), um morgen Clints Zwischensequenz auszulösen.",
              c: [{ t: "Du musst es nicht auf den Boden legen.", k: "tip" }],
            },
            "Geh zum Fluss im Zundersaftwald.",
          ],
        },
        {
          t: "Die beste Angelstelle am Fluss im Zundersaftwald liegt 6 Felder westlich von Leahs Tür, mit Wurf nach Süden. Platziere die Truhe ein Feld nordöstlich von dir.",
          c: [
            {
              t: "Ziele auf das tiefe Wasser östlich der kleinen Insel (siehe das Wiki-Bild 'Flussangelzone').",
              k: "tip",
            },
          ],
        },
        {
          t: "Angle bis 2:00 Uhr. Fülle dein Inventar vor dem Zusammenbruch mit der Angel + Edelsteinen + Erz + Kohle + den wertvollsten Fischen.",
          c: [
            {
              t: "Du kehrst erst an Frühling 7 (oder einem früheren Regentag) zu dieser Truhe zurück.",
              k: "tip",
            },
          ],
        },
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Fischen 4 → 6 (Beruf Fischer wählen)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Prüfe jeden Tag das Wetter von morgen im Fernseher und plane danach.",
          c: [
            {
              t: "Wenn du z. B. am Bergsee angelst und es morgen nicht regnet, kannst du die Angel in der Truhe lassen.",
              k: "tip",
            },
          ],
        },
        "Gieße deine Feldfrüchte.",
        {
          t: "Wenn du weniger als 150 Holz hast, fälle bis auf 150.",
          c: [
            { t: "Nimm beim Fällen die Sense mit, um auch Gras zu schneiden.", k: "tip" },
            {
              t: "Du brauchst in den nächsten zwei Tagen 2 Truhen und eine Vogelscheuche.",
              k: "reason",
            },
          ],
        },
        "Stelle eine Truhe her und trage sie bei dir.",
        "Leere dein Inventar. Nimm die Fiberglasangel + die hergestellte Truhe.",
        {
          t: "Geh zum Bergsee. Die beste Stelle ist am langen Zaun am unteren Bildschirmrand, mit Wurf nach Osten. Platziere die Truhe drei Felder hinter dir.",
          c: [
            {
              t: "Ziele auf das tiefe Wasser nahe dem versunkenen Baumstamm (siehe das Wiki-Bild 'Seeangelzone').",
              k: "tip",
            },
          ],
        },
        {
          t: "Angle bis 1:00 Uhr. Fülle dein Inventar mit Edelsteinen, Erz, Kohle und den wertvollsten Fischen.",
          c: [
            {
              t: "Sofern es morgen nicht regnet, kannst du die Fiberglasangel in der Truhe lassen.",
              k: "tip",
            },
          ],
        },
        "Geh nach Hause.",
        {
          t: "Verschiffe alles Verkäufliche (Edelsteine, Fische usw.).",
          c: [
            { t: "Behalte Kaulbarsche zum Essen.", k: "tip" },
            {
              t: "Behalte je einen Fisch, der in Gemeinschaftszentrum-Bündeln verwendet wird.",
              k: "tip",
            },
            {
              t: "Behalte Jade, Smaragd, Rubin und Diamant für die spätere Schädelhöhle.",
              k: "tip",
            },
          ],
        },
        "Direkt nach dem Verkauf ist es 2:00 Uhr. Andernfalls schneide Gras und brich zusammen.",
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Fischen 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Prüfe jeden Tag das Tagesglück im Fernseher.",
        "Nimm das Haustier an oder lehne es ab. (Siehe 'Haustier-Mechanik'.)",
        "Ernte die Pastinaken und merke dir, wie viele du geerntet hast.",
        {
          t: "Merke dir, welche Gemischte Saat du gepflanzt hast.",
          c: [
            {
              t: "Du erkennst es am Aussehen der Saat oder mit einer Mod.",
              k: "tip",
            },
          ],
        },
        "Kassiere die Belohnung der Pastinaken-Quest (100g).",
        "Gieße die restliche Gemischte Saat erst später heute.",
        "Stelle eine Truhe her und trage sie bei dir.",
        "Wenn du Eisenerz oder Golderz hast, merke dir die Menge. (Sie kommen zufällig aus der Angel-Truhe.)",
        {
          t: "Nimm aus der Truhe alles außer der Spitzhacke + Edelsteinen + Stein + Kohle + Kupfer + 3 Pastinaken.",
          c: [
            {
              t: "Behalte Jade, Smaragd, Rubin und Diamant für die Schädelhöhle.",
              k: "tip",
            },
            {
              t: "Du brauchst Pastinaken: 1 für ein Bündel, 1 zum Verschiffen (optional), 1 für Pam (optional).",
              k: "reason",
            },
            { t: "Du kannst eine Kohle für die Vogelscheuche von morgen behalten.", k: "tip" },
          ],
        },
        "Geh zu den Minen.",
        "Platziere die Truhe links vom Aufzug.",
        "Steige zu Ebene 10 hinab. (Siehe 'Allgemeine Minenstrategie'.)",
        {
          t: "Sobald du 25 Kupfererz und 25 Stein hast, kehre zu Ebene 0 zurück, stelle einen Schmelzofen her und schmilz Kupferbarren.",
          c: [
            {
              t: "Warte nicht auf den nächsten Aufzug, es sei denn, er ist wirklich nah.",
              k: "tip",
            },
          ],
        },
        "Lass den Schmelzofen laufen, bis du 5 Barren hast. Du musst die 5 spätestens bis 15:00 Uhr fertigstellen.",
        {
          t: "Sobald du Ebene 10 erreichst, baue Kupfererz ab, indem du Ebene 11 wiederholst, während die restlichen Barren schmelzen.",
          c: [
            {
              t: "Du erreichst Ebene 15 wahrscheinlich nicht vor 15:00 Uhr.",
              k: "reason",
            },
          ],
        },
        {
          t: "Sobald die 5 Barren fertig sind:",
          c: [
            {
              t: "Lass das Schwert + die Pastinaken in der Truhe.",
              c: [
                {
                  t: "Du kehrst erst an Frühling 11 zu dieser Truhe zurück.",
                  k: "tip",
                },
              ],
            },
            "Nimm den Schmelzofen + Edelsteine + Kleinkram. Halte 4 Inventarplätze frei.",
            "Wenn du keine Kohle auf der Farm gelassen hast, nimm eine für die Vogelscheuche von morgen.",
            "Geh zum Schmied.",
          ],
        },
        {
          t: "Wenn du zu spät bist, um den 5. Barren zu schmelzen, kannst du den Schmied bis 16:00 Uhr erreichen, drinnen einen Schmelzofen platzieren, den 5. Barren schmelzen und 30 Minuten warten. Solange du im Gebäude bist, verkauft Clint bis 19:10 Uhr.",
          k: "tip",
          c: [
            {
              t: "Das gilt jedoch als Bug, also kaufe, um nicht zu schummeln, was du brauchst, bevor Clint den Tresen verlässt.",
              k: "warn",
            },
          ],
        },
        {
          t: "Wenn du die Barren nicht rechtzeitig schaffst oder den Schmied nicht vor Ladenschluss erreichst, verbringe die restliche Zeit mit Angeln. Die Route verschiebt sich dann um einen Tag nach hinten.",
          c: [
            {
              t: "Es ist kein so großer Fehler, wie es scheint, da du ohnehin viel angeln wirst, um zusätzliches Geld zu verdienen.",
              k: "reason",
            },
          ],
        },
        "Die Minen liefern Geoden, Gefrorene Geoden und Magma-Geoden. Rechnerisch lohnt es sich im Schnitt, Clint 25g fürs Aufschlagen zu zahlen, aber die Opportunitätskosten, mitten am Tag zum Schmied zu laufen, übersteigen diesen Gewinn bei weitem. Verschiffe also alle Geoden für zusätzliches Geld. (Um Mineralien/Museum kümmerst du dich im Spätspiel.)",
        {
          t: "Beim Schmied:",
          c: [
            "Verkaufe deine Edelsteine.",
            {
              t: "Behalte mindestens 3,310g und mit dem Rest:",
              c: [
                "Kaufe bis zu 25 Eisenerz (einschließlich Erz vom Angeln) (25 × 150g = 3,750g).",
                "Kaufe bis zu 25 Golderz (einschließlich Erz vom Angeln) (25 × 400g = 10,000g). (Du wirst zu diesem Zeitpunkt fast kein Geld für Golderz haben, und das ist in Ordnung.)",
              ],
            },
          ],
        },
        {
          t: "Wofür die 3,310g sind:",
          c: [
            "2,000g für das Spitzhacken-Upgrade.",
            {
              t: "1,120g für 16 Grünkohl-Saat für Hofarbeit-Stufe 2 (insgesamt 380 EP). (Du kannst weniger Grünkohl kaufen, wenn du die EP aus Gemischter Saat & Reisspross berücksichtigst.)",
              c: [
                "8 EP pro Pastinake × 15 = 120 EP",
                "380 EP − 120 EP = 260 EP",
                "260 EP / 17 EP pro Grünkohl = 16 Grünkohl",
                "16 Grünkohl-Saat × 70g = 1,120g",
              ],
            },
            "60g für 1 Bohnen-Setzling.",
            "80g für 1 Blumenkohl-Saat (nicht nötig, wenn du eine aus Gemischter Saat bekommen hast).",
            "50g für 1 Kartoffel-Saat (nicht nötig, wenn du eine aus Gemischter Saat bekommen hast).",
          ],
        },
        "Rüste auf die Kupferspitzhacke auf (2,000g).",
        {
          t: "Geh zu Pierre und kaufe:",
          c: [
            "1 Bohnen-Setzling (60g)",
            "1 Blumenkohl-Saat (80g) (nicht nötig, wenn du eine aus Gemischter Saat bekommen hast)",
            "1 Kartoffel-Saat (50g) (nicht nötig, wenn du eine aus Gemischter Saat bekommen hast)",
            "16 Grünkohl-Saat (1,120g)",
            "Kaufe mit übrigem Geld zusätzliche Grünkohl-Saat.",
          ],
        },
        "Selbst wenn du Pierre nicht vor Ladenschluss erreichst, ändert sich die Route nicht wesentlich. Kaufe und pflanze die Saat einfach morgen.",
        "Geh nach Hause.",
        "Pflanze und gieße.",
        "Nimm die Fiberglasangel + Schmelzofen + Eisenerz + Golderz + Kohle + Kaulbarsche.",
        "Geh zum Bergsee.",
        "Platziere den Schmelzofen neben der Truhe. Schmilz beim Angeln 5 Eisenbarren.",
        {
          t: "Angle bis 2:00 Uhr. Fülle dein Inventar vor dem Zusammenbruch mit den wertvollsten Gegenständen.",
          c: [
            {
              t: "Lass übriges Eisenerz + Golderz in der Bergsee-Truhe.",
              c: [
                { t: "Nimm den Schmelzofen mit, wenn es morgen regnet.", k: "tip" },
              ],
            },
            "Merke dir, wie viel Golderz du hast.",
          ],
        },
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Hofarbeit 0 → 1", "Minenarbeit 0 → 1", "Fischen 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Gieße deine Feldfrüchte.",
          c: [
            {
              t: "Wenn Krähen deine Frühlingsbündel-Feldfrüchte gefressen haben, merke es dir und kaufe bei Gelegenheit erneut Saat bei Pierre.",
              k: "tip",
            },
          ],
        },
        "Stelle eine Vogelscheuche her und platziere sie.",
        "Fälle Bäume bis 7:40 Uhr.",
        "Leere dein Inventar und nimm die Fiberglasangel.",
        {
          t: "Betritt die Stadt von der Bushaltestelle aus. Die Zwischensequenz des Gemeinschaftszentrums wird ausgelöst. Überspringe sie nicht.",
          k: "warn",
          c: [
            {
              t: "Wenn du sie überspringst, wirst du am Stadteingang platziert; wenn du sie ansiehst, neben dem Gemeinschaftszentrum.",
              k: "reason",
            },
          ],
        },
        "Betritt das Gemeinschaftszentrum und berühre das Podest der Goldenen Schriftrolle (startet die Quest).",
        "Geh zum Bergsee und angle bis 1:00 Uhr. Fülle dein Inventar mit 5 Eisenbarren + den wertvollsten verkäuflichen Gegenständen.",
        "Geh nach Hause.",
        {
          t: "Verschiffe von den verkäuflichen Gegenständen genug für das Stahlspitzhacken-Upgrade (5,000g) und außerdem genug Gold, um bis zu 25 Golderz zu kaufen.",
          c: [
            { t: "Wenn es knapp ist, verkaufe Kaulbarsche. (Verkaufe zuerst niedrige Qualität.)", k: "tip" },
          ],
        },
        "Direkt nach dem Verkauf ist es 2:00 Uhr. Andernfalls schneide Gras und brich zusammen.",
      ],
    },
    7: {
      items: [
        "Prüfe Die Königin der Soßen auf das Rezept für Gemüsepfanne.",
        "Prüfe deine Post, bis du den Brief des Zauberers erhältst.",
        "Gieße deine Feldfrüchte.",
        "Leere dein Inventar. Nimm die 5 Eisenbarren.",
        {
          t: "Geh zum Zauberer (löst eine Zwischensequenz aus).",
          c: [
            {
              t: "Die Zwischensequenz anzusehen zählt nicht als Treffen mit dem Zauberer. Du musst nach der Zwischensequenz mit ihm sprechen, damit sein Name im Sozial-Tab erscheint. Aber das ist rein kosmetisch ohne echten Nutzen, also betrachte es als Zeitverschwendung.",
              k: "tip",
            },
          ],
        },
        "Leere den Inhalt der Truhe am Fluss im Zundersaftwald (optional).",
        {
          t: "Geh zum Schmied:",
          c: [
            "Kaufe bis zu 25 Golderz (einschließlich Erz vom Angeln).",
            "Rüste auf die Stahlspitzhacke auf (5,000g).",
          ],
        },
        "Angle am Bergsee bis 2:00 Uhr und brich dann zusammen. Schmilz beim Angeln Goldbarren. Schmilz 2–3, und ein weiterer ist im Schmelzofen, wenn du zusammenbrichst.",
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Fischen 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Wenn die Höhlen-Zwischensequenz erscheint, wähle Pilze. (Siehe 'Sonstige Hinweise'.)",
        "Gieße deine Feldfrüchte.",
        {
          t: "Verschiffe von den verkäuflichen Gegenständen genug, um 12,000g zu erreichen.",
          c: [
            {
              t: "Das ist für das Goldspitzhacken-Upgrade (10,000g) + das Rucksack-Upgrade (2,000g).",
              k: "reason",
            },
            {
              t: "Wenn es knapp ist, kehre vor Tagesende nach Hause zurück und verschiffe die an dem Tag gefangenen Fische, um die Differenz auszugleichen.",
              k: "tip",
            },
          ],
        },
        "Angle am Bergsee bis 2:00 Uhr und brich dann zusammen. Schmilz beim Angeln Goldbarren, bis du insgesamt 5 hast. Du solltest diese Barren halten, wenn du zusammenbrichst.",
        {
          t: "Das ist der erste Tag seit Beginn, an dem du keine Fähigkeit aufsteigst, also überanstrenge dich nicht.",
          c: [
            {
              t: "Du solltest mit 50 % Energie aufwachen, nicht mit 0 %.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Gieße deine Feldfrüchte.",
        "Fälle Bäume bis etwa 8:00 Uhr.",
        "Leere dein Inventar. Nimm die Fiberglasangel.",
        "Geh zum Schmied und rüste auf die Goldspitzhacke auf (10,000g).",
        "Geh zu Pierre und rüste deinen Rucksack auf (2,000g).",
        "Angle am Bergsee bis 2:00 Uhr und brich dann zusammen.",
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Fischen 9 → 10 (Beruf Angler wählen)"],
        },
        "Selbst wenn du Fischen 10 heute nicht erreichst, schaffst du es am nächsten Angeltag. Die Route ändert sich nicht wesentlich.",
      ],
    },
    10: {
      items: [
        "Gieße deine Feldfrüchte.",
        "Hol Pilze aus der Höhle.",
        {
          t: "Berechne den zusätzlichen Grünkohl für Hofarbeit-Stufe 6.",
          c: [
            "8 EP pro Pastinake × 15 = 120 EP",
            "17 EP pro Grünkohl × 16 = 272 EP",
            "3,300 EP insgesamt − 120 EP − 272 EP = 2,908 EP benötigt",
            "2,908 EP / 17 = 172 Grünkohl",
            "172 Grünkohl-Saat × 70g = 12,040g",
          ],
        },
        {
          t: "Wenn du Fischen-Stufe 10 hast, verschiffe genug Fische, um die Hälfte der benötigten Grünkohl-Saat zu kaufen (6,020g).",
          c: [
            {
              t: "Zwei Chargen sind optimal, damit du nicht mehr Sprinkler herstellst als nötig. So sicherst du dir so viele Eisenbarren wie möglich für Qualitätssprinkler an Frühling 28.",
              k: "reason",
            },
          ],
        },
        {
          t: "Wenn du nicht Fischen-Stufe 10 hast, verschiffe die Fische jetzt nicht. Verkaufe sie morgen direkt an Willy.",
          c: [{ t: "Du würdest 25 % des Goldes verlieren.", k: "reason" }],
        },
        "Leere dein Inventar. Nimm die Fiberglasangel.",
        "Wenn die Angel weniger als 100 Köder hat, nimm auch ein paar Fische mit. Angle ein paar Stunden am Bergsee bis 9:00 Uhr, verkaufe dann Fische an Willy und kaufe mehr Köder.",
        "Angle am Bergsee bis 2:00 Uhr und brich dann zusammen. Vergiss nicht, den Schmelzofen für die Minen von morgen mitzunehmen.",
      ],
    },
    11: {
      items: [
        "Ernte den Grünkohl. (Du erreichst Hofarbeit-Stufe 2.)",
        {
          t: "Beginne, Felder im Sprinkler-Muster umzuhacken.",
          c: [{ t: "Bewässere kein Feld.", k: "warn" }],
        },
        "Verlasse die Farm gegen 8:00 Uhr.",
        "Wenn du gestern keine Fische verschifft hast, verkaufe sie an Willy.",
        "Geh zum Schmied und hol die Goldspitzhacke ab.",
        "Geh zu Pierre und kaufe so viel Grünkohl-Saat wie berechnet (6,020g).",
        {
          t: "Geh zurück zur Farm und beende das Umhacken + Pflanzen.",
          c: [
            { t: "Bewässere kein Feld.", k: "warn" },
            {
              t: "Stelle optional Pflastersteinpfad her, um zu markieren, wohin künftige Sprinkler kommen.",
              k: "tip",
            },
            { t: "Grünkohl muss bis Frühling 14 nicht gegossen werden.", k: "tip" },
          ],
        },
        "Geh zu den Minen und platziere einen Schmelzofen. Schmilz weiter Barren.",
        {
          t: "Baue bis 2:00 Uhr ab und brich dann zusammen.",
          c: [
            {
              t: "Wenn du mehr Kupfer sammelst, stelle 3 weitere Schmelzöfen her (insgesamt 4).",
              k: "tip",
            },
          ],
        },
        {
          t: "Am Ende des Tages erhältst du:",
          k: "result",
          c: ["Hofarbeit 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Hol Pilze aus der Höhle.",
        "Baue bis 2:00 Uhr ab und brich dann zusammen. Schmilz beim Abbauen Kupfer und Eisen.",
        "Wenn du Minenarbeit-Stufe 5 erreichst, wähle den Beruf Minenarbeiter.",
      ],
    },
    13: {
      items: [
        "Baue bis 2:00 Uhr ab und brich dann zusammen.",
        {
          t: "Auf dem Eierfest brauchst du nichts, hinzugehen ist also Zeitverschwendung. Die Ausnahme ist, wenn du die Herausforderung anstrebst, bis zum Ende von Jahr 1 jeden Gegenstand zu verschiffen – dann brauchst du ein oder zwei Erdbeer-Saat.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Prüfe Die Königin der Soßen auf das Rezept für Kohlsalat.",
        "Hol Pilze aus der Höhle.",
        "Sei bis 0:00 Uhr in den Minen.",
        "Wenn dir das restliche Erz für Sprinkler fehlt, baue auf Ebene 21/41 Erz ab, bevor du weiter hinabsteigst.",
        {
          t: "Sobald du den Grund der Minen erreichst, baue wieder Erz ab.",
          c: [
            {
              t: "Je nach Können, Glück und ob du an Regentagen Angelpausen einlegst, kannst du Ebene 120 zwischen Frühling 14–18 erreichen.",
              k: "tip",
            },
            {
              t: "Sobald du alle (normalen) Sprinkler hergestellt hast, brauchst du Kupfererz nur noch für Werkzeug-Upgrades. Qualitätssprinkler benötigen viel Eisen- und Golderz.",
              k: "tip",
            },
          ],
        },
        {
          t: "Geh um 0:00 Uhr nach Hause und stelle + platziere so viele Sprinkler wie möglich.",
          c: [{ t: "Es ist in Ordnung, wenn sie nicht alle Feldfrüchte abdecken.", k: "tip" }],
        },
        {
          t: "Verschiffe Gegenstände, um 42,500g zu erreichen.",
          c: [
            {
              t: "Wenn es knapp ist, geh nur bis 32,500g und überspringe morgen das 10,000g-Bündel. (In den meisten Durchläufen wirst du wahrscheinlich knapp sein.)",
              k: "tip",
            },
          ],
        },
        "Direkt danach ist es 2:00 Uhr. Andernfalls schneide Gras und brich zusammen.",
      ],
    },
    15: {
      items: [
        {
          t: "Ab heute erscheinen Lachsbeeren, aber mach keinen großen Umweg, um sie zu ernten.",
          c: [
            { t: "Die Zeit ist den geringen Energiegewinn nicht wert.", k: "reason" },
            {
              t: "Nutze bei Lachsbeer-Büschen dieselbe Pausenstrategie wie bei Mülltonnen.",
              k: "tip",
            },
          ],
        },
        "Gieße alle Feldfrüchte, die noch nicht von Sprinklern abgedeckt sind (falls vorhanden).",
        "Leere dein Inventar. Nimm die Gegenstände für die Bündel Frühlingssammeln (4), Frühlingsfeldfrüchte (4), Schmied (3), Geologe (4) und Abenteurer (2).",
        {
          t: "Geh zum Gemeinschaftszentrum und schließe die Bündel mit diesen Gegenständen ab.",
          c: [
            {
              t: "Vergiss nach dem Abschluss der beiden Kesselraum-Bündel nicht, die Goldene Schriftrolle zu verlassen, damit du nicht in der Bug-Zwischensequenz stecken bleibst.",
              k: "warn",
            },
          ],
        },
        "Wenn du genug Geld hast (42,500g), schließe auch das Tresor-Bündel ab.",
        "Geh nach Hause, platziere ein Kristallarium und lege einen Diamanten hinein.",
        "Leere dein Inventar und geh zu den Minen.",
        "Wenn dir das restliche Erz für Sprinkler fehlt, baue auf Ebene 21/41 Erz ab, bevor du weiter hinabsteigst.",
        "Baue bis 2:00 Uhr ab und brich dann zusammen. Wenn du noch mehr Sprinkler brauchst, vergiss nicht, die geschmolzenen Barren im Inventar zu behalten.",
        "Am Ende des Tages werden die Loren freigeschaltet.",
      ],
    },
    16: {
      items: [
        "Hol Pilze aus der Höhle.",
        "Gieße alle noch nicht von Sprinklern abgedeckten Feldfrüchte (falls vorhanden).",
        "Stelle mit den gestern geschmolzenen Barren mehr Sprinkler her (falls nötig).",
        {
          t: "Baue bis 2:00 Uhr ab.",
          c: [
            {
              t: "Vergiss nicht, die Lore zu nutzen, um schneller zu reisen.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["Ab Frühling 17 – ab hier wird die Anleitung weniger detailliert."],
      items: [
        "Wenn du Minen-Ebene 120 noch nicht erreicht hast, schaffe sie so schnell wie möglich.",
        {
          t: "Wenn du außerdem mehr Gold brauchst, um den Tresor abzuschließen (42,500g), angle am Bergsee, um ihn so schnell wie möglich zu vervollständigen.",
          c: [
            {
              t: "Wenn beides noch aussteht, plane sie so, dass sie am selben Tag fertig werden.",
              k: "tip",
              c: [
                {
                  t: "Der Bus wird erst am nächsten Tag repariert.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Sobald du Minen-Ebene 120 erreichst, bringe alle Schmelzöfen von den Minen zur Farm.",
        "Mach die Schädelhöhle so schnell und so oft wie möglich. (Siehe 'Allgemeine Schädelhöhlen-Strategie'.)",
        {
          t: "In deiner Freizeit:",
          c: [
            "Beginne, Farm-Geröll dort zu beseitigen, wo Qualitätssprinkler + Sternfrucht hinkommen.",
            "Stelle Bodenbelag her und verlege ihn dort, wo die Qualitätssprinkler hinkommen.",
            "Stelle Vogelscheuchen her und platziere sie.",
            "Stelle mit übrigem Kupfer mehr Schmelzöfen her.",
            "Lege einen Eichenwald an, indem du in einer Ecke der Farm Eicheln pflanzt.",
            "Baue mehr Erz in den Minen ab (Ebenen 20/40/80).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Verschiffe Gegenstände für:",
          c: [
            "2,000g für das Kupferaxt-Upgrade.",
            "Genug Gold, um die 2. Charge Grünkohl-Saat zu kaufen (je 70g).",
          ],
        },
      ],
    },
    19: {
      items: [
        "Geh um 9:00 Uhr zu Clint und rüste auf die Kupferaxt auf (2,000g).",
        "Geh zu Pierre und kaufe die 2. Charge Grünkohl-Saat.",
      ],
    },
    20: {
      items: [
        "Ernte den 1. Grünkohl und pflanze die 2. Ernte.",
        "Verschiffe Gegenstände, um 5,000g für das Stahlaxt-Upgrade zu erreichen.",
      ],
    },
    21: {
      items: [
        "Prüfe Die Königin der Soßen auf das Rezept für Radieschensalat.",
        "Geh um 9:00 Uhr zu Clint, hol die Kupferaxt ab und rüste auf die Stahlaxt auf (5,000g).",
        "Wenn du die Herausforderung anstrebst, bis zum Ende von Jahr 1 jeden Gegenstand zu verschiffen, musst du heute Tulpenzwiebel (20g) und Zierlauch-Saat (30g) kaufen und pflanzen, damit sie bis Frühling 28 bereit sind.",
      ],
    },
    22: {
      items: ["Verschiffe Gegenstände, um 2,000g für das Kupferhacken-Upgrade zu erreichen."],
    },
    23: {
      items: [
        "Geh um 9:00 Uhr zu Clint, hol die Stahlaxt ab und rüste auf die Kupferhacke auf (2,000g).",
        {
          t: "Jetzt, da du die Stahlaxt hast, nutze sie an einem Pechtag, um Farmfläche zu räumen und Sprinkler vorzubereiten. Tu es selbst an einem Nicht-Pechtag spätestens bis zum 27.",
          c: [
            {
              t: "Du musst jedoch zuerst Minenarbeit-Stufe 10 erreichen, bevor du eine Pause machst, da du den Beruf Schmied vor Frühling 25 brauchst.",
              k: "warn",
            },
            {
              t: "Denk daran, auch Vogelscheuchen und Pastinaken-Saat (Füllfrüchte) zu platzieren.",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Verschiffe so viel wie möglich.",
          c: [
            { t: "Sammle so viel Gold wie möglich für morgen.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Plane, wie viele Sternfrucht-Saat (je 400g) du an Sommer 2 pflanzt. Das variiert je nach Durchlauf; berücksichtige deine Schädelhöhlen-Einnahmen von jetzt bis Sommer 2. Du brauchst etwa zwei Tage, um die Farm zu räumen und vorzubereiten. (Möglicherweise hast du nach Frühling 23 schon einen Tag an einem Pechtag geräumt.) Ziele auf etwa 400–500 Sternfrucht-Saat.",
        "Geh um 9:00 Uhr zu Clint, hol die Kupferhacke ab und rüste auf die Stahlhacke auf (5,000g).",
        {
          t: "Geh zur Oase und kaufe für jede Sternfrucht-Saat, die du kaufen wirst, ein Luxus-Geschwind-Wachs.",
          c: [
            {
              t: "Die Oase verkauft Luxus-Geschwind-Wachs nur donnerstags, und du brauchst es bis Sommer 2.",
              k: "reason",
            },
            {
              t: "Heute ist Pam zur Untersuchung in der Klinik (also fährt sie nicht den Bus), daher brauchst du ein Teleport-Totem: Wüste, um die Wüste zu erreichen. In den meisten Durchläufen benutzt du ohnehin jeden Tag ein Teleport-Totem, also ist das kein Problem.",
              k: "tip",
            },
          ],
        },
        {
          t: "Gib übriges Geld für Sternfrucht-Saat aus, damit du ohne Strafe zusammenbrechen kannst.",
          c: [
            {
              t: "Kaufe die restliche Sternfrucht-Saat an Sommer 2.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Nichts Besonderes zu tun."],
    },
    27: {
      items: [
        "Ernte den 2. Grünkohl. (Du erreichst Hofarbeit-Stufe 6.)",
        "Geh um 9:00 Uhr zu Clint und hol die Stahlhacke ab.",
      ],
    },
    28: {
      items: [
        "Prüfe Die Königin der Soßen auf das Rezept für Omelett.",
        {
          t: "Verschiffe so viel wie möglich.",
          c: [
            { t: "Sammle so viel Gold wie möglich für morgen.", k: "reason" },
          ],
        },
        "Stelle Qualitätssprinkler her und platziere sie.",
        {
          t: "Falls noch nicht geschehen, pflanze Pastinaken-Saat (Füllfrucht).",
          c: [
            {
              t: "Verwende kein Luxus-Geschwind-Wachs auf der Pastinaken-Saat, da sie nicht in Sommer 1 übergehen soll.",
              k: "warn",
            },
          ],
        },
        "Wenn du gegen Mittag fertig bist, kannst du die restliche Zeit in der Schädelhöhle verbringen.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Nichts Besonderes. Du kannst z. B. die Schädelhöhle besuchen. Du musst die Sternfrucht-Saat erst morgen pflanzen, also schneide die Pastinaken nicht ab.",
          c: [
            {
              t: "Der Beruf Landwirt wirkt sich auf die 3. Sternfrucht aus.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Schneide ab und pflanze alle Luxus-Geschwind-Wachs + die 1. Charge Sternfrucht-Saat, die du an Frühling 25 gekauft hast.",
        "Geh um 9:00 Uhr zur Oase, um die restliche Sternfrucht-Saat zu kaufen, kehre dann nach Hause zurück und pflanze.",
        {
          t: "Das dauert den Großteil des Tages. Wenn du Zeit übrig hast:",
          c: [
            "Stelle 10–20 Blitzableiter her und platziere sie.",
            "Setze Zapfhähne an die Eichen, die über die Farm verstreut sind und die du nicht gefällt hast.",
            "Pflanze weiter Eicheln in einer Ecke der Farm, um den Eichenwald wachsen zu lassen.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Besuche die Schädelhöhle.",
          c: [
            {
              t: "Du brauchst 25,000g für das Upgrade zur Iridiumspitzhacke.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Schmilz Iridiumbarren. Wenn sie spät fertig werden (gegen 14:30 Uhr), geh zu Clint und rüste auf die Iridiumspitzhacke auf.",
          c: [
            {
              t: "Wenn die Iridiumbarren allein nicht genug Geld bringen, kannst du Edelsteine direkt an Clint verkaufen.",
              k: "tip",
            },
          ],
        },
        "Stelle 10–20 Blitzableiter her und platziere sie.",
        "Setze Zapfhähne an die Eichen, die über die Farm verstreut sind und die du nicht gefällt hast.",
        "Pflanze weiter Eicheln in einer Ecke der Farm, um den Eichenwald wachsen zu lassen.",
        "Du brauchst so viel Eichenharz wie möglich für Fässer. Baum Dünger ist sehr nützlich, um den Eichenwald schnell wachsen zu lassen, aber zu seiner Herstellung brauchst du Sammeln-Stufe 7. Der beste Weg, Sammeln fast ohne Verlust von Spielzeit zu steigern (statt Bäume zu fällen oder den weiten Weg zu den Geheimen Wäldern zu laufen), ist Sommersaat herzustellen und zu ernten.",
        {
          t: "An Tagen, an denen du nicht in die Schädelhöhle gehst (wie heute):",
          c: [
            "Durchstreife die Karte nach Sommer-Sammelobjekten und stelle mindestens 10–20 Sommersaat her. Ernte, stelle neu her und pflanze so viel wie möglich nach, bis du Sammeln-Stufe 7 erreichst.",
            {
              t: "Hacke die 5 Stümpfe in den Geheimen Wäldern für Sammeln-EP und Hartholz.",
              c: [
                { t: "Du brauchst 100 Hartholz für den Pferdestall.", k: "reason" },
              ],
            },
            {
              t: "Sobald du 100 Hartholz hast, kaufe den Pferdestall bei Robin, um künftige Wege zu den Geheimen Wäldern zu verkürzen.",
              c: [
                {
                  t: "Das zweite Bauernhaus-Upgrade benötigt 150 Hartholz.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Ab Sommer 5"],
      items: [
        "Besuche die Schädelhöhle weiter. Sammle so viel Geld wie möglich für die 2. Charge Sternfrucht-Saat.",
      ],
    },
    9: {
      items: ["Verschiffe genug, um die 2. Charge Sternfrucht-Saat zu kaufen."],
    },
    10: {
      items: [
        {
          t: "Kaufe die 2. Charge Sternfrucht-Saat.",
          c: [
            {
              t: "Die Oase schließt morgen wegen des Luau, also kaufe heute.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Ernte und pflanze nach.",
          c: [
            {
              t: "Das Luxus-Geschwind-Wachs bleibt im Feld, du musst es also nicht erneut auftragen.",
              k: "reason",
            },
          ],
        },
        {
          t: "Verkaufe keine Sternfrucht – auch nicht in Goldqualität – gib alles in Fässer. Zapfe ab jetzt so viele Eichen an und baue so viele Fässer wie möglich.",
          c: [
            { t: "Kaufe Holz bei Robin, wenn dir das Holz ausgeht.", k: "tip" },
            {
              t: "Verkaufe keinen Wein, bevor du dich an der Statue der Unsicherheit von Landwirt zu Handwerker umskillst.",
              k: "warn",
            },
          ],
        },
        "Anfangs kannst du dein Haus mit Fässern füllen. Später ist es praktisch, mehrere Große Schuppen zu kaufen und sie nahe dem Haus zu platzieren. Oder du belegst, sobald du den Steinbruch freigeschaltet hast, diesen mit Bodenbelag und nutzt ihn als Fässerlager.",
        {
          t: "Am Ende des Tages erreichst du Hofarbeit-Stufe 10. Wähle den Beruf Landwirt.",
          c: [
            {
              t: "Leider gilt der Landwirt-Effekt nicht für heute gepflanzte Feldfrüchte.",
              k: "tip",
            },
            {
              t: "Skille dich später vor dem Verkauf von Sternfrucht-Wein auf Handwerker um.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Ab Sommer 13"],
      items: [
        "Sommer 13 ist immer ein Gewittertag.",
        "An Sommer 13 oder irgendwann danach kaufe und pflanze weitere Sommer-Feldfrüchte, die du für Bündel, Quests, Geschenke usw. brauchst.",
        "Die langsamsten Feldfrüchte sind Melone und Blaubeere, die mit dem Beruf Landwirt 10 Tage brauchen. Luxus-Geschwind-Wachs verkürzt das auf 7 Tage. Du kannst das Pflanzen zusätzlicher Sommer-Feldfrüchte also bis spätestens Sommer 21 hinauszögern.",
      ],
    },
    19: {
      items: ["Verschiffe genug Gegenstände für die 3. Sternfrucht."],
    },
    20: {
      items: [
        "Ernte die Sternfrucht.",
        "Geh um 9:00 Uhr zur Oase und kaufe die 2. Charge Sternfrucht-Saat.",
        {
          t: "Pflanze die Sternfrucht-Saat.",
          c: [
            {
              t: "Das Luxus-Geschwind-Wachs bleibt im Feld, du musst es also nicht erneut auftragen.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Verschiffe genug, um mehr Luxus-Geschwind-Wachs zu kaufen.",
          c: [
            {
              t: "Du wirst die ganze Farm mit Kürbissen bepflanzen, also brauchst du zusätzliches Geschwind-Wachs über das hinaus, was von den Sternfrucht-Feldern übrig bleibt.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Kaufe mehr Luxus-Geschwind-Wachs in der Oase.",
        "Hacke irgendwann zwischen jetzt und Sommer 28 alle Felder um und platziere alle Qualitätssprinkler sowie zusätzliches Luxus-Geschwind-Wachs. Wenn du den Boden an Sommer 28 nicht bewässerst, ist der Weizen an Herbst 2 nicht erntereif.",
      ],
    },
    26: {
      items: ["Sommer 26 ist immer ein Gewittertag."],
    },
    27: {
      items: [
        "Verschiffe genug, um Weizen-Saat (je 10g) zu kaufen, um morgen die ganze Farm zu bepflanzen.",
      ],
    },
    28: {
      items: [
        "Ernte die Sternfrucht.",
        "Geh um 9:00 Uhr zu Pierre und kaufe Weizen-Saat für die ganze Farm.",
        {
          t: "Pflanze die Weizen-Saat (Füllfrucht – erhält das Luxus-Geschwind-Wachs).",
          c: [
            {
              t: "Das Pflanzen an Sommer 28 funktioniert nur mit dem Beruf Landwirt. Andernfalls bekommst du mit dieser Strategie nicht den 3. Kürbis.",
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
        "Nichts Besonderes. Du kannst z. B. die Schädelhöhle besuchen. Du musst warten, bis der Weizen fertig gewachsen ist.",
        "Um das Museum zu vervollständigen, ist es sehr nützlich, vor Winter 1 Sammeln-Stufe 10 und den Beruf Fährtenleser zu haben (um Artefaktstellen leichter zu erkennen). Wenn du noch nicht Sammeln 10 hast, ist es besser, mit übrigen Ahornsamen und Kiefernzapfen einen großen Wald zu pflanzen und ihn komplett zu fällen. (Das ist effizienter als Herbst-Sammelobjekte zu ernten.)",
        "Verschiffe genug, um Kürbis-Saat (je 100g) für die ganze Farm zu kaufen.",
      ],
    },
    2: {
      items: [
        {
          t: "Ernte den Weizen und pflanze Kürbis-Saat nach, um die ganze Farm zu bepflanzen.",
          c: [
            {
              t: "Kürbisse sind besser als Preiselbeeren, weil du nicht genug Fässer hast, um alle Preiselbeeren zu verarbeiten.",
              k: "reason",
            },
          ],
        },
        "Wiederhole wie bei der Sternfrucht Ernten + Nachpflanzen, um im Herbst 3 Kürbisernten zu erzielen.",
      ],
    },
    9: {
      items: [
        "Du kannst jetzt Sternfrucht-Wein verkaufen.",
        "Skille dich an der Statue der Unsicherheit von Landwirt zu Handwerker um.",
        {
          t: "Kaufe mehr Saat für morgen.",
          c: [
            {
              t: "Pierre hat mittwochs geschlossen, also kaufe heute.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "Der 1. Kürbis ist heute erntereif.",
        {
          t: "Pflanze nach.",
          c: [
            {
              t: "Wie die Sternfrucht kann auch der Kürbis insgesamt 3-mal geerntet werden.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Ab Winter 1"],
      items: [
        {
          t: "Jetzt hast du die Gelegenheit, die verbleibenden Gemeinschaftszentrum-Bündel abzuschließen. Um die Ingwerinsel und die Inselfarm freizuschalten, schließe das Gemeinschaftszentrum so schnell wie möglich ab.",
          c: [
            {
              t: "Sobald du die Inselfarm erreichst, kannst du wieder Sternfrucht in großen Mengen pflanzen, was zu deiner Haupteinnahmequelle wird.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Heutige Ziele (Zusammenfassung): ein Hauptziel (einklappbare Überschrift) mit
// Methoden/Gründen (c). Getrennt von items; verdichtet die Schlüsselziele jedes Tages.
// Triviale Schritte werden ausgelassen, wichtige Schneeball-Punkte (Materialien für
// den nächsten Tag bevorraten usw.) bleiben erhalten.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Spare Geld, um morgen so schnell wie möglich die Fiberglasangel (1,800g) zu kaufen.",
        c: [
          {
            t: "Triff alle in der Stadt.",
            c: [
              {
                t: "Der Abschluss der Quest 'Sag Hallo!' schaltet 'Wie man Freunde gewinnt' frei, was an Frühling 2 zusätzliche 100g bringt.",
                k: "reason",
              },
            ],
          },
          "Spende ein Artefakt dem Museum für die Belohnung von 250g.",
          "Verkaufe deine Sammelobjekte.",
        ],
      },
      {
        t: "Pflanze Saat.",
        c: [
          "Pflanze die Pastinaken-Saat.",
          "Schneide Unkraut in der Stadt, um Gemischte Saat zu erhalten.",
        ],
      },
    ],
    2: [
      {
        t: "Kaufe die Fiberglasangel (1,800g).",
        c: [
          "Kaufe die Übungsangel (25g) und angle.",
          "Gib Willy den Stein für die Belohnung 'Wie man Freunde gewinnt' (100g).",
        ],
      },
      "Kaufe Köder für den nächsten Tag.",
    ],
    3: [
      {
        t: "Beschaffe ein Kupfererz.",
        c: [
          {
            t: "Um morgen Clints Zwischensequenz auszulösen.",
            k: "reason",
          },
          {
            t: "Beschaffe es durch Angeln.",
            c: [
              {
                t: "Wenn du keines bekommst, behalte 75g, um Kupfererz bei Clint zu kaufen.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Fange so viele Katzenfische wie möglich.",
        c: ["Verkaufe alle Fische + überschüssige Strand-Sammelobjekte in Willys Laden und kaufe Köder."],
      },
    ],
    4: [
      {
        t: "Beschaffe 150 Holz.",
        c: [
          {
            t: "Du brauchst in den nächsten zwei Tagen 2 Truhen und eine Vogelscheuche.",
            k: "reason",
          },
        ],
      },
      "Angle am Bergsee.",
    ],
    5: [
      {
        t: "Rüste deine Spitzhacke auf die Kupferspitzhacke auf (2,000g).",
        c: [
          {
            t: "Stelle auf Minen-Ebene 10 5 Kupferbarren her und gib die Spitzhacke bei Clint ab.",
            c: [
              {
                t: "Gib sie ab, bevor Clint schließt (stelle die 5 Barren spätestens bis 15:00 Uhr fertig).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Pflanze Saat und angle am Bergsee.",
        c: [
          "Kaufe und pflanze Grünkohl-Saat (für Hofarbeit 2) sowie Bohnen-, Blumenkohl- und Kartoffel-Saat.",
        ],
      },
      {
        t: "Lege Vorräte für das Kommende an.",
        c: [
          {
            t: "Behalte Jade, Smaragd, Rubin und Diamant für die Schädelhöhle.",
            k: "tip",
          },
          { t: "Behalte eine Kohle für eine Vogelscheuche.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Spare für das Stahlspitzhacken-Upgrade (5,000g) und Golderz.",
        c: ["Angle am Bergsee für Eisenbarren + verkäufliche Fische."],
      },
      {
        t: "Löse die Zwischensequenz des Gemeinschaftszentrums aus und berühre die Goldene Schriftrolle (startet die Quest).",
        c: [
          { t: "Sie wird ausgelöst, wenn du die Stadt von der Bushaltestelle aus betrittst.", k: "tip" },
        ],
      },
      "Stelle eine Vogelscheuche her und platziere sie.",
    ],
    7: [
      {
        t: "Rüste deine Spitzhacke auf die Stahlspitzhacke auf (5,000g).",
        c: ["Kaufe Golderz beim Schmied, dann rüste auf."],
      },
      "Triff den Zauberer (löst eine Zwischensequenz aus).",
      "Angle am Bergsee und schmilz Goldbarren.",
    ],
    8: [
      {
        t: "Spare 12,000g für die Upgrades Goldspitzhacke (10,000g) und Rucksack (2,000g).",
        c: ["Angle am Bergsee für verkäufliche Gegenstände."],
      },
      {
        t: "Schmilz 5 Goldbarren und schlafe, während du sie hältst.",
        c: [
          {
            t: "Wache mit 50 % Energie auf, um Überanstrengung zu vermeiden (erster Tag ohne Stufenaufstieg).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Rüste auf die Goldspitzhacke auf (10,000g) und rüste deinen Rucksack auf (2,000g).",
      "Angle am Bergsee (Fischen 10 → Beruf Angler).",
    ],
    10: [
      {
        t: "Berechne die für Hofarbeit 6 benötigte Grünkohl-Saat und spare für die Hälfte.",
        c: [
          {
            t: "Pflanze Grünkohl in zwei Chargen, damit du nicht mehr Sprinkler herstellst als nötig.",
            k: "tip",
          },
          {
            t: "Wenn du nicht Fischen 10 hast, verschiffe nicht – verkaufe morgen direkt an Willy.",
            k: "tip",
          },
        ],
      },
      {
        t: "Nimm einen Schmelzofen für die Minen von morgen mit.",
        c: [{ t: "Vergiss es nicht vor dem Zusammenbruch.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Ernte Grünkohl (Hofarbeit 2) und kaufe + pflanze die 2. Charge Grünkohl-Saat (6,020g).",
        c: [
          "Hacke Felder im Sprinkler-Muster um (kein Gießen).",
          { t: "Grünkohl muss bis Frühling 14 nicht gegossen werden.", k: "tip" },
        ],
      },
      "Baue ab und schmilz Barren in den Minen.",
    ],
    12: [
      {
        t: "Baue ab und schmilz Kupfer und Eisen.",
        c: ["Wähle bei Minenarbeit-Stufe 5 den Beruf Minenarbeiter."],
      },
    ],
    13: [
      {
        t: "Steige weiter ab und baue in den Minen ab.",
        c: [
          { t: "Überspringe das Eierfest, es sei denn, du brauchst etwas (Zeitverschwendung).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Steige Richtung Minen-Ebene 120 ab und baue Erz für Sprinkler ab.",
        c: ["Wenn es knapp ist, baue Eisen-/Golderz auf Ebene 21/41 ab."],
      },
      {
        t: "Verschiffe Gold für das Tresor-Bündel (42,500g).",
        c: [
          {
            t: "Wenn es knapp ist, geh nur bis 32,500g und überspringe morgen das 10,000g-Bündel.",
            k: "tip",
          },
        ],
      },
      "Stelle zu Hause so viele Sprinkler wie möglich her.",
    ],
    15: [
      {
        t: "Schließe die Gemeinschaftszentrum-Bündel ab.",
        c: [
          "Bring die Gegenstände für die Bündel Frühlingssammeln, Frühlingsfeldfrüchte, Schmied, Geologe und Abenteurer und gib sie ab.",
          { t: "Wenn du genug Geld hast (42,500g), schließe auch das Tresor-Bündel ab.", k: "tip" },
          {
            t: "Verlasse die Goldene Schriftrolle, damit du nicht in der Bug-Zwischensequenz stecken bleibst.",
            k: "warn",
          },
        ],
      },
      "Platziere ein Kristallarium und lege einen Diamanten hinein.",
      {
        t: "Baue bis 2:00 Uhr ab.",
        c: [{ t: "Die Loren werden am Ende des Tages freigeschaltet.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Baue ab und stelle mehr Sprinkler her.",
        c: [{ t: "Reise schneller mit der Lore.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Schaffe Minen-Ebene 120 und schließe den Tresor ab (42,500g).",
        c: [
          {
            t: "Wenn beides noch aussteht, plane sie so, dass sie am selben Tag fertig werden (der Bus wird am nächsten Tag repariert).",
            k: "tip",
          },
        ],
      },
      "Besuche die Schädelhöhle so oft wie möglich.",
      {
        t: "Bereite in deiner Freizeit die nächsten Feldfrüchte vor.",
        c: [
          "Beseitige Farm-Geröll und verlege Bodenbelag dort, wo Qualitätssprinkler hinkommen.",
          "Stelle mehr Vogelscheuchen und Schmelzöfen her und pflanze Eicheln, um einen Eichenwald wachsen zu lassen.",
        ],
      },
    ],
    18: [
      "Verschiffe Gold für das Kupferaxt-Upgrade (2,000g) und die 2. Charge Grünkohl-Saat.",
    ],
    19: [
      "Rüste deine Axt auf die Kupferaxt auf (2,000g).",
      "Kaufe die 2. Charge Grünkohl-Saat bei Pierre.",
    ],
    20: [
      "Ernte den 1. Grünkohl und pflanze die 2. Ernte.",
      "Verschiffe Gold für das Stahlaxt-Upgrade (5,000g).",
    ],
    21: [
      "Rüste deine Axt auf die Stahlaxt auf (5,000g).",
      {
        t: "(Optional) Wenn du die Alles-verschiffen-Herausforderung anstrebst, pflanze Tulpenzwiebel und Zierlauch-Saat.",
        c: [{ t: "Sie sind bis Frühling 28 bereit.", k: "reason" }],
      },
    ],
    22: ["Verschiffe Gold für das Kupferhacken-Upgrade (2,000g)."],
    23: [
      "Rüste deine Hacke auf die Kupferhacke auf (2,000g).",
      {
        t: "Räume an einem Pechtag Farmfläche und bereite Sprinkler vor (spätestens bis zum 27.).",
        c: [
          {
            t: "Erreiche zuerst Minenarbeit-Stufe 10, bevor du eine Pause machst (Beruf Schmied vor Frühling 25 nötig).",
            k: "warn",
          },
          {
            t: "Platziere auch Vogelscheuchen und Pastinaken-Saat (Füllfrucht).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Sammle so viel Gold wie möglich für morgen.",
        c: ["Verschiffe so viel wie möglich."],
      },
    ],
    25: [
      "Plane, wie viele Sternfrucht-Saat du an Sommer 2 pflanzt (ziele auf ~400–500).",
      "Rüste deine Hacke auf die Stahlhacke auf (5,000g).",
      {
        t: "Kaufe Luxus-Geschwind-Wachs in der Oase (eines pro Sternfrucht-Saat).",
        c: [{ t: "Die Oase verkauft es nur donnerstags.", k: "reason" }],
      },
    ],
    26: ["Nichts Besonderes. Besuche z. B. die Schädelhöhle."],
    27: [
      "Ernte den 2. Grünkohl (Hofarbeit 6).",
      "Hol die Stahlhacke bei Clint ab.",
    ],
    28: [
      {
        t: "Stelle Qualitätssprinkler her und pflanze eine Füllfrucht (Pastinaken).",
        c: [
          {
            t: "Verwende kein Luxus-Geschwind-Wachs auf Pastinaken (sie sollen nicht in Sommer 1 übergehen).",
            k: "warn",
          },
        ],
      },
      "Verschiffe so viel Gold wie möglich für morgen.",
    ],
  },
  summer: {
    1: [
      {
        t: "Nichts Besonderes. Besuche z. B. die Schädelhöhle.",
        c: [
          {
            t: "Schneide die Pastinaken nicht ab (der Beruf Landwirt wirkt sich auf die 3. Sternfrucht aus).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Pflanze die 1. Sternfrucht mit Luxus-Geschwind-Wachs.",
        c: ["Kaufe die restliche Sternfrucht-Saat in der Oase und pflanze sie."],
      },
      {
        t: "Lege in deiner Freizeit Vorräte an.",
        c: [
          "Stelle 10–20 Blitzableiter her.",
          "Setze Zapfhähne an Eichen und pflanze Eicheln, um den Eichenwald wachsen zu lassen.",
        ],
      },
    ],
    3: [
      {
        t: "Besuche die Schädelhöhle.",
        c: [
          {
            t: "Du brauchst 25,000g für das Upgrade zur Iridiumspitzhacke.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Schmilz Iridiumbarren und rüste auf die Iridiumspitzhacke auf.",
      {
        t: "Sammle Eichenharz und Hartholz, während du Sammeln-Stufe 7 anstrebst.",
        c: [
          "Stelle Sommersaat her und ernte sie, um Sammeln-EP zu gewinnen.",
          "Hacke die Stümpfe in den Geheimen Wäldern für Hartholz.",
          {
            t: "Kaufe den Pferdestall mit 100 Hartholz, um künftige Wege zu verkürzen.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Besuche die Schädelhöhle und spare für die 2. Charge Sternfrucht-Saat."],
    9: ["Verschiffe genug, um die 2. Charge Sternfrucht-Saat zu kaufen."],
    10: [
      {
        t: "Kaufe die 2. Charge Sternfrucht-Saat.",
        c: [{ t: "Die Oase schließt morgen wegen des Luau, also kaufe heute.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Wiederhole Ernten/Nachpflanzen und gib alle Sternfrucht in Fässer.",
        c: [
          "Zapfe so viele Eichen an und baue so viele Fässer wie möglich.",
          {
            t: "Verkaufe keinen Wein, bevor du dich auf Handwerker umskillst.",
            k: "warn",
          },
        ],
      },
      "Am Ende des Tages erreichst du Hofarbeit 10 (Beruf Landwirt).",
    ],
    13: [
      "Kaufe und pflanze weitere Sommer-Feldfrüchte für Bündel/Quests (spätestens bis Sommer 21).",
    ],
    19: ["Verschiffe genug für die 3. Sternfrucht."],
    20: ["Ernte die Sternfrucht und pflanze nach (kaufe die 2. Charge Saat in der Oase)."],
    24: [
      {
        t: "Verschiffe genug, um mehr Luxus-Geschwind-Wachs zu kaufen.",
        c: [
          {
            t: "Du wirst die ganze Farm mit Kürbissen bepflanzen, also brauchst du zusätzliches Geschwind-Wachs.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Platziere Qualitätssprinkler und zusätzliches Luxus-Geschwind-Wachs.",
        c: [
          {
            t: "Bewässere an Sommer 28, damit der Weizen an Herbst 2 erntereif ist.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Nichts Besonderes (immer ein Gewittertag)."],
    27: ["Verschiffe genug, um morgen Weizen-Saat für die ganze Farm zu kaufen."],
    28: [
      "Ernte die Sternfrucht.",
      {
        t: "Pflanze Weizen-Saat auf der ganzen Farm (Füllfrucht).",
        c: [
          {
            t: "Nur mit dem Beruf Landwirt gültig (für den 3. Kürbis).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Verschiffe genug, um Kürbis-Saat für die ganze Farm zu kaufen.",
      {
        t: "(Optional) Bereite für das Museum Sammeln-Stufe 10 und den Beruf Fährtenleser vor.",
        c: [
          {
            t: "Einen Wald mit Ahornsamen und Kiefernzapfen zu pflanzen und zu fällen ist effizient.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Ernte den Weizen und pflanze Kürbis-Saat auf der ganzen Farm.",
        c: [
          {
            t: "Kürbisse sind besser als Preiselbeeren, da du nicht genug Fässer hast.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Skille dich auf Handwerker um, um Sternfrucht-Wein zu verkaufen.",
        c: ["Skille an der Statue der Unsicherheit von Landwirt → Handwerker um."],
      },
      {
        t: "Kaufe im Voraus Saat für morgen.",
        c: [{ t: "Pierre hat mittwochs geschlossen, also kaufe heute.", k: "reason" }],
      },
    ],
    10: ["Ernte den 1. Kürbis und pflanze nach."],
  },
  winter: {
    1: [
      {
        t: "Schließe die verbleibenden Gemeinschaftszentrum-Bündel ab.",
        c: [
          {
            t: "Das Freischalten der Ingwerinsel und der Inselfarm lässt dich wieder Sternfrucht in großen Mengen als Haupteinnahme pflanzen.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
