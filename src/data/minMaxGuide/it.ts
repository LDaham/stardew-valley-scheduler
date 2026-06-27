// =============================================================================
// AVVISO DI LICENZA (GPL-3.0)
// Il contenuto della guida in questo file (MIN_MAX_GUIDE / DAILY_GOALS) è un'opera
// derivata di "Stardew Valley Min-Max Routing / Strategy" di BlackSight6 & Zamiel
// (GPL-3.0).
//   Fonte: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Licenza: GNU GPL-3.0 — testo completo in LICENSES/GPL-3.0.txt.
// Modifiche: condensato e ristrutturato in un albero di dati per giorno (GuideNode),
// con i nomi propri che usano i nomi ufficiali italiani del gioco.
// Pertanto questo file è soggetto alla GPL-3.0, non alla licenza MIT del progetto.
// (Mantenuto separato dal materiale del wiki sotto CC BY-NC-SA; distribuito come mera aggregazione.)
//
// Copyright (C) BlackSight6 & Zamiel (guida originale)
// Adattamento (C) 2026 Lee Daham
// Questo programma è software libero: puoi ridistribuirlo e/o modificarlo secondo i
// termini della GNU General Public License pubblicata dalla Free Software Foundation,
// nella versione 3 della Licenza o (a tua scelta) in qualsiasi versione successiva.
// Questo programma è distribuito SENZA ALCUNA GARANZIA. Consulta la GNU GPL per
// maggiori dettagli: https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Prendi i semi di pastinaca.",
        {
          t: "Abbatti subito 9 alberi per raggiungere Raccolta selvatica livello 1.",
          c: [
            { t: "Ti servono 8 alberi e 1/3.", k: "tip" },
            {
              t: "Ti serve il livello 1 prima di raccogliere per avere una possibilità di cipolle primaverili di qualità argento.",
              k: "reason",
            },
            {
              t: "Concentrati solo sull'abbattere, iniziando in direzione del sentiero verso la foresta.",
              k: "tip",
              c: [
                {
                  t: "Così ripulisci anche le erbacce lungo il sentiero, agevolando i tuoi spostamenti.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Abbatti solo aceri e pini, non le querce a forma di uovo.",
              k: "warn",
              c: [
                {
                  t: "Le querce non rilasciano ghiande fino al 2 di primavera, e le ghiande sono preziose.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Per lo stesso motivo, non toccare i semi a terra con l'ascia o la zappa prima del 2 di primavera (vengono distrutti).",
              k: "warn",
            },
            {
              t: "Non abbattere i ceppi; colpisci ogni albero finché non cade (fino a 10 colpi), poi passa al successivo.",
              k: "tip",
              c: [{ t: "Questo dà più legno ed esperienza di Raccolta selvatica.", k: "reason" }],
            },
            {
              t: "Quando un albero inizia a cadere, vai dove cadrà il legno e metti subito in pausa.",
              k: "tip",
            },
            {
              t: "Il tempo di gioco si ferma ma l'animazione di caduta termina, e il legno viene raccolto automaticamente durante la pausa.",
              k: "reason",
            },
            {
              t: "Usa sempre questa strategia quando abbatti gli alberi (non i ceppi).",
              k: "tip",
            },
            {
              t: "Se perdi il conto degli alberi, controlla la scheda Abilità per l'aumento di livello di Raccolta selvatica.",
              k: "tip",
            },
            { t: "È utile anche per la pesca di domani.", k: "tip" },
          ],
        },
        "Una volta raggiunta Raccolta selvatica 1, crea un baule e posizionalo accanto a casa, poi svuota l'inventario tenendo solo la falce, l'ascia, il piccone e la zappa.",
        "Esci verso la foresta a sud. (Sono circa le 9:20.)",
        {
          t: "Usa uno screenshot/zoom per controllare gli oggetti raccoglibili nella Foresta Linfabrace e pianificare il percorso.",
          c: [
            "Raccogli tutti gli oggetti raccoglibili al tuo passaggio.",
            {
              t: "Se non spreca guadagni di energia, puoi mangiare le cipolle primaverili mentre le raccogli per liberare spazio nell'inventario.",
              k: "tip",
            },
            {
              t: "Taglia quante più erbacce possibile, ma non fare una lunga deviazione per una sola.",
              k: "tip",
            },
            { t: "Devi incontrare Marnie entro le 12:50.", k: "reason" },
          ],
        },
        {
          t: "Incontra Jas mentre va da casa sua al punto della corda per saltare.",
          time: "11:20",
        },
        {
          t: "Incontra Haley diretta al punto delle foto a sud-ovest. Se sei in anticipo, è un buon momento per tagliare altre erbacce.",
          time: "11:40",
        },
        "Vai in città.",
        {
          t: "Controlla i due bidoni della spazzatura vicino alle case di Jodi e Haley, e ripulisci le erbacce in mezzo se c'è tempo.",
          c: [
            {
              t: "Mettere in pausa subito dopo aver controllato un bidone è ottimale.",
              k: "tip",
            },
            {
              t: "Evita di sprecare tempo quando gli oggetti saltano fuori dal lato opposto.",
              k: "reason",
            },
            {
              t: "È simile alla strategia di pausa per gli alberi che cadono.",
              k: "tip",
            },
            {
              t: "Controllare i bidoni spreca molto tempo, quindi il percorso lo fa solo nei primi due giorni.",
              k: "tip",
            },
          ],
        },
        {
          t: "Incontra Marnie mentre cammina dall'Emporio di Pierre al ranch (passa davanti alla casa di Emily).",
          time: "12:50",
        },
        "Vai alla spiaggia.",
        {
          t: "Zappa i punti dei manufatti per puntare al tuo primo manufatto.",
          c: [
            "Lascia a terra gli oggetti raccoglibili della spiaggia.",
            {
              t: "Per ora sei a corto di inventario e puoi raccoglierli il 2 di primavera.",
              k: "reason",
            },
          ],
        },
        {
          t: "Incontra Elliott vicino al falò a sud della sua capanna.",
          time: "12:00",
        },
        "Vai in città.",
        "Se hai ottenuto un manufatto, donalo al Museo e riscatta la ricompensa (250g).",
        "Controlla i bidoni vicino al Museo e al Fabbro.",
        {
          t: "Incontra Clint dentro il Fabbro.",
          c: [{ t: "Riparti verso est.", k: "tip" }],
        },
        "Controlla il bidone vicino a JojaMart.",
        {
          t: "Incontra Pam, Sam e Shane dentro JojaMart.",
          c: [
            {
              t: "Sam e Shane contano come incontrati anche mentre lavorano.",
              k: "reason",
            },
          ],
        },
        "Ripulisci le erbacce dietro (a nord di) JojaMart.",
        "Incontra Abigail sul ponte.",
        {
          t: "Se Maru cammina verso sud ed è nelle vicinanze, parlale ora; altrimenti incontrala più tardi quando è seduta sulla panchina.",
          time: "15:20",
        },
        "Controlla il bidone vicino alla casa di Lewis.",
        "Incontra Evelyn (giardino dei fiori), Caroline + Jodi (piazza del paese) e Vincent + Harvey (sopra la casa di Jodi).",
        "Taglia le erbacce sul lato ovest della mappa vicino a Harvey.",
        {
          t: "Incontra Leah + Pierre dentro l'Emporio di Pierre.",
          c: [
            {
              t: "Devi passare dietro il bancone per parlare con Pierre.",
              k: "tip",
            },
            {
              t: "Non comprare da Pierre oggi, dato che comprerai le colture primaverili il 5-6 di primavera.",
              k: "tip",
            },
          ],
        },
        {
          t: "Incontra tutti gli altri vicino al Saloon.",
          time: "~16:00",
          c: [
            {
              t: "Alle 16:00 Alex finisce di allenarsi e lascia la sua stanza. Controlla il bidone vicino alla casa ed entra per incontrare George e Alex.",
              c: [
                {
                  t: "Se sei in anticipo, potresti dover aspettare che Alex esca dalla sua stanza.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Alle 16:00 Emily arriva al Saloon. Controlla il bidone vicino al Saloon ed entra per incontrare Gus ed Emily.",
              c: [{ t: "Per Gus devi passare dietro il bancone.", k: "tip" }],
            },
            "Alle 16:20 Penny supera lo steccato di Lewis e Alex esce di casa.",
            "Alle 16:40 Penny arriva alla panchina con Maru. Se non le hai ancora incontrate, fallo lì.",
            "Controlla il registro delle missioni per confermare di aver incontrato oggi 24 persone su un massimo di 27.",
          ],
        },
        {
          t: "Torna alla fattoria.",
          c: [
            {
              t: "Per ora lascia a terra gli oggetti raccoglibili alla fermata dell'autobus.",
              k: "tip",
            },
          ],
        },
        "Svuota l'inventario. Tieni gli attrezzi.",
        "Taglia le erbacce della fattoria fino a circa le 18:00.",
        "Esci verso i boschi sul retro intorno alle 18:10.",
        "Incontra Linus fuori dalla sua tenda.",
        {
          t: "Incontra Demetrius a sud-est della sua casa.",
          c: [
            {
              t: "Hai già incontrato Robin, quindi non serve parlarle.",
              k: "reason",
            },
          ],
        },
        {
          t: "Incontra Sebastian quando esce di casa.",
          c: [
            {
              t: "Se arrivi prima delle 19:00, dovrai aspettare che esca dalla sua stanza alle 18:40.",
              k: "tip",
            },
            {
              t: "È tempo perso che avresti potuto usare per tagliare altre erbacce nella fattoria.",
              k: "reason",
            },
          ],
        },
        "Vai a sud verso il Centro sociale.",
        "Taglia le erbacce a ovest del Centro sociale.",
        "Taglia le erbacce a ovest della fontana.",
        {
          t: "Torna a casa.",
          c: [
            {
              t: "Raccogli gli oggetti raccoglibili alla fermata dell'autobus che hai lasciato prima.",
              k: "tip",
            },
          ],
        },
        {
          t: "Zappa, pianta e annaffia i semi di pastinaca + i semi misti.",
          c: [
            {
              t: "Piantare colture oltre i 15 semi di pastinaca iniziali significa che i corvi possono mangiarne uno o più ogni giorno. Ma piantare i semi misti vale il valore extra. (Il cavolfiore e la patata dei semi misti ti permettono di non comprarli per il fascio colture primaverili in seguito.)",
              k: "tip",
            },
          ],
        },
        "Abbatti alberi finché non ti restano 4-6 di energia.",
        {
          t: "Taglia erbacce ed erba fino all'1:00-1:30, a seconda di quanti semi misti hai.",
          c: [
            {
              t: "Devi zappare, piantare e annaffiare tutti i semi misti prima delle 2:00.",
              k: "warn",
            },
          ],
        },
        {
          t: "Torna a casa e spedisci tutto tranne:",
          c: ["Pietra", "Legno", "Carbone", "20 di fibra"],
        },
        {
          t: "Nota:",
          k: "tip",
          c: [
            {
              t: "Vendi tutti gli oggetti raccoglibili tranne le cipolle primaverili. Pensa ai fasci del Centro sociale più tardi. Domani ti serve più denaro possibile.",
              k: "tip",
            },
            {
              t: "Di norma mangi porri, denti di leone e cibo dei bidoni (basso GPE) invece di venderli, ma oggi il denaro è urgente, quindi è un'eccezione.",
              k: "tip",
            },
          ],
        },
        {
          t: "Zappa, pianta e annaffia i semi misti rimanenti.",
          c: [
            {
              t: "Anche se ti sforzi sotto 0 di energia e svieni, sali di livello in Raccolta selvatica il 2 di primavera, quindi nessuna penalità viene riportata.",
              k: "tip",
            },
            {
              t: "Se uno dei semi misti non è un cavolfiore (controlla con una mod o il wiki), dovrai posticipare la prima consegna del fascio e la spedizione d'oro extra per la Cassaforte — prevista per il 15 di primavera — al 17 di primavera.",
              k: "warn",
            },
            {
              t: "Una carenza di carrelli aggiunge una leggera pressione di tempo per completare le Miniere, ma è molto raro e non cambia il percorso.",
              k: "tip",
            },
          ],
        },
        {
          t: "Sii dentro casa.",
          time: "poco prima delle 2:00",
          c: [{ t: "Per evitare la penalità d'oro.", k: "reason" }],
        },
        {
          t: "Distruggi il letto.",
          c: [
            {
              t: "Compari proprio accanto alla porta ogni mattina, risparmiando tempo.",
              k: "reason",
            },
            {
              t: "Oppure rimuovilo dalla casa e tienilo in un baule.",
              k: "tip",
            },
          ],
        },
        {
          t: "Sposta la TV accanto alla porta.",
          c: [{ t: "Per controllarla appena ti svegli.", k: "reason" }],
        },
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Raccolta selvatica 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Leggi tutta la posta.",
          c: [
            {
              t: "Devi leggere la lettera di Willy per ottenere la canna di bamboo.",
              k: "reason",
            },
          ],
        },
        "Annaffia le colture.",
        {
          t: "Crea un baule e portalo con te.",
          c: [
            {
              t: "Il 1 di primavera potresti aver ottenuto solo 0-3 cipolle primaverili (e nessun cibo dai bidoni) e non aver abbattuto 50 di legno. Abbattine 50 ora e continua il percorso. Tieni solo presente che tutto è leggermente ritardato.",
              k: "tip",
            },
          ],
        },
        "Svuota tutto l'inventario nel baule. Prendi la zappa + il baule creato + 1 pietra.",
        {
          t: "Controlla i bidoni vicino alla casa di George, al Saloon e alla casa di Lewis.",
          c: [
            {
              t: "Va bene se i compaesani ti sorprendono: l'amicizia di ogni PNG è ancora a 0.",
              k: "reason",
            },
            {
              t: "Questa è l'ultima volta che fai una deviazione per i bidoni. Sprecano molto tempo, quindi d'ora in poi controllali solo quando non costa tempo extra.",
              k: "tip",
            },
          ],
        },
        "Vai alla spiaggia e ricevi la canna di bamboo.",
        "Dai la pietra a Willy e riscatta la ricompensa della missione 'Farsi degli amici' (100g).",
        "Posiziona il baule nell'angolo in basso a destra del molo.",
        "Pesca dal molo rivolto a est. Lancia alla distanza massima.",
        {
          t: "Alle 8:40, distruggi la canna di bamboo e controlla il resto degli oggetti raccoglibili della spiaggia + i punti dei manufatti.",
          c: [
            {
              t: "Se ottieni un manufatto ora e non ne avevi il 1 di primavera, donalo subito per la ricompensa (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Vai al negozio di Willy. Vendi tutti gli oggetti raccoglibili della spiaggia + il pesce. Compra la canna d'allenamento (25g) da Willy.",
          c: [
            {
              t: "La canna d'allenamento aumenta la probabilità di cattura perfetta. (Salire in Pesca con catture perfette conta più del pesce di alta qualità.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Con la canna d'allenamento, lancia alla distanza minima proprio a sud della porta di Willy. Raccogli abbastanza pesce per arrivare a 1,800g.",
          c: [
            {
              t: "I lanci a distanza minima hanno più probabilità di pesci facili e accorciano le animazioni di lancio/recupero.",
              k: "reason",
            },
            { t: "Vedi anche la 'Strategia generale di pesca'.", k: "tip" },
          ],
        },
        "Quando l'alga marina (1.54 GPE) e la Joja Cola (1.92 GPE) finiscono, mangia l'acciuga (1.82 GPE) o l'aringa (1.82 GPE) della qualità più alta.",
        {
          t: "Una volta che hai abbastanza pesce per 1,800g e raggiungi Pesca livello 2, distruggi la canna d'allenamento, vendi tutto il pesce e compra la canna di vetroresina da Willy. Compra anche più esca possibile (5g ciascuna) ed equipaggiala sulla nuova canna.",
          c: [
            {
              t: "Le catture perfette calano, ma grazie all'esca la canna di vetroresina dà esperienza più in fretta.",
              k: "reason",
            },
          ],
        },
        "Pesca dallo stesso punto con lanci a distanza massima.",
        {
          t: "Alle 16:30, se la canna ha meno di 35 di esca, vai a comprarne altra da Willy.",
          c: [
            {
              t: "Ti serve abbastanza esca per il resto di oggi più domani mattina.",
              k: "reason",
            },
          ],
        },
        "Pesca fino alle 2:00. Metti tutto il pesce nel baule prima di svenire. (Vendilo a Willy domani.)",
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Pesca 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "Il 3 di primavera piove sempre.",
        "Svuota tutto l'inventario nel baule. Prendi la canna di vetroresina.",
        "Se hai 80+ di esca e hai ottenuto rame grezzo dal baule da pesca del 2 di primavera, crea un baule, portalo con te e vai dritto al fiume della Foresta Linfabrace a pescare. Ricorda di lasciare brevemente la guida per comprare altra esca da Willy prima di andare al Lago montano domani.",
        {
          t: "Altrimenti:",
          c: [
            "Prendi la zappa dal baule.",
            "Pesca a sud della casa di Leah fino alle 8:30 o finché non finisci l'esca (a seconda di cosa avviene prima).",
            "Controlla i bidoni a sud delle case di Jodi ed Emily.",
            "Controlla oggetti raccoglibili + punti dei manufatti alla spiaggia.",
            {
              t: "Vendi tutto il pesce + gli oggetti raccoglibili di spiaggia in più al negozio di Willy.",
              c: [
                {
                  t: "Se vuoi, puoi tenere una sardina per il fascio pesci di mare.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Compra esca finché non ti restano solo 75g.",
              c: [
                {
                  t: "Se hai già trovato rame grezzo nel baule da pesca, puoi spendere tutti i soldi in esca.",
                  k: "tip",
                },
                {
                  t: "La quantità di esca che puoi comprare qui varia (500-700) a seconda della partita, ma qualunque cosa compri, la userai tutta prima della fine della primavera.",
                  k: "tip",
                },
                {
                  t: "Tecnicamente potresti posticipare la vendita di parte del pesce fino a ottenere la professione Pescatore. Ma ci sono tre problemi. Primo, conviene solo se guadagni più di circa un'ora di pesca al Lago montano. Secondo, il numero di pesci che puoi portare svenendo alla fine del 3 di primavera è limitato. Terzo, la prossima occasione comoda per comprare esca è dopo aver consegnato il piccone il 5 di primavera, un giorno con quasi nessun tempo libero. Vendere ora è quindi più semplice nel complesso e molto meno rischioso.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Svuota il contenuto del baule e raccogli il baule.",
              c: [
                {
                  t: "Per farlo senza costo di energia, seleziona uno slot vuoto della barra degli attrezzi e clicca col sinistro a ripetizione.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Se hai tenuto 75g, vai da Clint e compra rame grezzo (75g) per attivare la scena di Clint domani.",
              c: [{ t: "Non serve lasciarlo a terra.", k: "tip" }],
            },
            "Vai al fiume della Foresta Linfabrace.",
          ],
        },
        {
          t: "Il punto di pesca migliore al fiume della Foresta Linfabrace è 6 caselle a ovest della porta di Leah, lanciando a sud. Posiziona il baule una casella a nord-est di te.",
          c: [
            {
              t: "Punta all'acqua profonda a est della piccola isola (vedi l'immagine 'zona di pesca fluviale' del wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pesca fino alle 2:00. Prima di svenire, riempi l'inventario con la canna + gemme + minerale grezzo + carbone + il pesce più prezioso.",
          c: [
            {
              t: "Non tornerai a questo baule fino al 7 di primavera (o un giorno di pioggia precedente).",
              k: "tip",
            },
          ],
        },
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Pesca 4 → 6 (scegli la professione Pescatore)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Controlla il meteo di domani alla TV ogni giorno e pianifica di conseguenza.",
          c: [
            {
              t: "Ad esempio, se peschi al Lago montano e domani non pioverà, puoi lasciare la canna nel baule.",
              k: "tip",
            },
          ],
        },
        "Annaffia le colture.",
        {
          t: "Se hai meno di 150 di legno, abbattine fino a 150.",
          c: [
            { t: "Porta la falce mentre abbatti per tagliare anche l'erba.", k: "tip" },
            {
              t: "Ti serviranno 2 bauli e uno spaventapasseri nei prossimi due giorni.",
              k: "reason",
            },
          ],
        },
        "Crea un baule e portalo con te.",
        "Svuota l'inventario. Prendi la canna di vetroresina + il baule creato.",
        {
          t: "Vai al Lago montano. Il punto migliore è vicino alla lunga staccionata in fondo allo schermo, lanciando a est. Posiziona il baule tre caselle dietro di te.",
          c: [
            {
              t: "Punta all'acqua profonda vicino al tronco sommerso (vedi l'immagine 'zona di pesca lacustre' del wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pesca fino all'1:00. Riempi l'inventario con gemme, minerale grezzo, carbone e il pesce più prezioso.",
          c: [
            {
              t: "A meno che non piova domani, puoi lasciare la canna di vetroresina nel baule.",
              k: "tip",
            },
          ],
        },
        "Torna a casa.",
        {
          t: "Spedisci tutto il vendibile (gemme, pesce, ecc.).",
          c: [
            { t: "Tieni dei cavedani da mangiare.", k: "tip" },
            {
              t: "Tieni uno di ogni pesce usato nei fasci del Centro sociale.",
              k: "tip",
            },
            {
              t: "Tieni giada, smeraldo, rubino e diamante per la Caverna del Teschio più avanti.",
              k: "tip",
            },
          ],
        },
        "Saranno le 2:00 subito dopo la vendita. Altrimenti taglia l'erba e svieni.",
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Pesca 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Controlla la fortuna del giorno alla TV ogni giorno.",
        "Accetta o rifiuta l'animale domestico. (Vedi 'Meccaniche dell'animale'.)",
        "Raccogli le pastinache e annota quante ne hai raccolte.",
        {
          t: "Annota quali semi misti hai piantato.",
          c: [
            {
              t: "Puoi capirlo dall'aspetto del seme o con una mod.",
              k: "tip",
            },
          ],
        },
        "Riscatta la ricompensa della missione della pastinaca (100g).",
        "Non annaffiare i semi misti rimanenti fino a più tardi oggi.",
        "Crea un baule e portalo con te.",
        "Se hai ferro grezzo o oro grezzo, annota quanto. (Vengono a caso dal baule da pesca.)",
        {
          t: "Dal baule, prendi tutto tranne il piccone + gemme + pietra + carbone + rame + 3 pastinache.",
          c: [
            {
              t: "Tieni giada, smeraldo, rubino e diamante per la Caverna del Teschio.",
              k: "tip",
            },
            {
              t: "Ti servono pastinache: 1 per un fascio, 1 da spedire (facoltativo), 1 per Pam (facoltativo).",
              k: "reason",
            },
            { t: "Puoi tenere un carbone per lo spaventapasseri di domani.", k: "tip" },
          ],
        },
        "Vai alle Miniere.",
        "Posiziona il baule a sinistra dell'ascensore.",
        "Scendi al livello 10. (Vedi 'Strategia generale delle miniere'.)",
        {
          t: "Appena hai 25 di rame grezzo e 25 di pietra, torna al livello 0, crea una fornace e fondi lingotti di rame.",
          c: [
            {
              t: "Non aspettare il prossimo ascensore a meno che non sia davvero vicino.",
              k: "tip",
            },
          ],
        },
        "Tieni la fornace in funzione finché non hai 5 lingotti. Devi finire i 5 al più tardi entro le 15:00.",
        {
          t: "Una volta al livello 10, estrai rame grezzo ripetendo il livello 11 mentre i lingotti rimanenti fondono.",
          c: [
            {
              t: "Probabilmente non riesci a raggiungere il livello 15 prima delle 15:00.",
              k: "reason",
            },
          ],
        },
        {
          t: "Appena i 5 lingotti sono pronti:",
          c: [
            {
              t: "Lascia la spada + le pastinache nel baule.",
              c: [
                {
                  t: "Non tornerai a questo baule fino all'11 di primavera.",
                  k: "tip",
                },
              ],
            },
            "Prendi la fornace + gemme + cianfrusaglie. Tieni 4 slot dell'inventario liberi.",
            "Se non hai lasciato carbone alla fattoria, prendine uno per lo spaventapasseri di domani.",
            "Vai al Fabbro.",
          ],
        },
        {
          t: "Se sei troppo in ritardo per fondere il 5° lingotto, puoi raggiungere il Fabbro entro le 16:00, posizionare una fornace dentro, fondere il 5° lingotto e aspettare 30 minuti. Finché sei nell'edificio, Clint vende fino alle 19:10.",
          k: "tip",
          c: [
            {
              t: "Tuttavia questo è considerato un bug, quindi per evitare di barare, compra ciò che ti serve prima che Clint lasci il bancone.",
              k: "warn",
            },
          ],
        },
        {
          t: "Se non riesci a fare i lingotti in tempo o a raggiungere il Fabbro prima della chiusura, passa il resto del tempo a pescare. Il percorso slitta allora di un giorno.",
          c: [
            {
              t: "Non è un errore così grande come sembra, dato che pescherai comunque molto per fondi extra.",
              k: "reason",
            },
          ],
        },
        "Le Miniere danno geodi, geodi ghiacciati e geodi di magma. Secondo i calcoli, pagare Clint 25g per aprirli vale di più in media, ma il costo opportunità di andare al Fabbro a metà giornata supera di gran lunga quel guadagno. Quindi spedisci tutti i geodi per denaro extra. (Pensa a minerali/Museo a fine partita.)",
        {
          t: "Al Fabbro:",
          c: [
            "Vendi le gemme.",
            {
              t: "Tieni almeno 3,310g, e con il resto:",
              c: [
                "Compra fino a 25 di ferro grezzo (incluso il grezzo dalla pesca) (25 × 150g = 3,750g).",
                "Compra fino a 25 di oro grezzo (incluso il grezzo dalla pesca) (25 × 400g = 10,000g). (A questo punto non avrai quasi denaro per l'oro grezzo, e va bene.)",
              ],
            },
          ],
        },
        {
          t: "A cosa servono i 3,310g:",
          c: [
            "2,000g per il miglioramento del piccone.",
            {
              t: "1,120g per 16 semi di cavolo verde per Fattoria livello 2 (380 di esperienza in totale). (Puoi comprare meno cavolo verde se consideri l'esperienza dei semi misti e del germoglio di riso.)",
              c: [
                "8 di esperienza per pastinaca × 15 = 120 di esperienza",
                "380 di esperienza − 120 di esperienza = 260 di esperienza",
                "260 di esperienza / 17 di esperienza per cavolo verde = 16 di cavolo verde",
                "16 semi di cavolo verde × 70g = 1,120g",
              ],
            },
            "60g per 1 avvia-fagioli.",
            "80g per 1 semi di cavolfiore (non necessari se ne hai ottenuto uno da un seme misto).",
            "50g per 1 semi di patata (non necessari se ne hai ottenuta una da un seme misto).",
          ],
        },
        "Migliora al piccone di rame (2,000g).",
        {
          t: "Vai da Pierre e compra:",
          c: [
            "1 avvia-fagioli (60g)",
            "1 semi di cavolfiore (80g) (non necessari se ne hai ottenuto uno da un seme misto)",
            "1 semi di patata (50g) (non necessari se ne hai ottenuta una da un seme misto)",
            "16 semi di cavolo verde (1,120g)",
            "Compra semi di cavolo verde extra con il denaro avanzato.",
          ],
        },
        "Anche se non raggiungi Pierre prima della chiusura, il percorso non cambia in modo significativo. Compra e pianta semplicemente i semi domani.",
        "Torna a casa.",
        "Pianta e annaffia.",
        "Prendi la canna di vetroresina + fornace + ferro grezzo + oro grezzo + carbone + cavedani.",
        "Vai al Lago montano.",
        "Posiziona la fornace accanto al baule. Fondi 5 lingotti di ferro mentre peschi.",
        {
          t: "Pesca fino alle 2:00. Prima di svenire, riempi l'inventario con gli oggetti più preziosi.",
          c: [
            {
              t: "Lascia il ferro grezzo + l'oro grezzo rimanente nel baule del Lago montano.",
              c: [
                { t: "Prendi la fornace se domani piove.", k: "tip" },
              ],
            },
            "Annota quanto oro grezzo hai.",
          ],
        },
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Fattoria 0 → 1", "Estrazione 0 → 1", "Pesca 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Annaffia le colture.",
          c: [
            {
              t: "Se i corvi hanno mangiato le tue colture del fascio primaverile, annotalo e ricompra i semi da Pierre quando ti è comodo.",
              k: "tip",
            },
          ],
        },
        "Crea e posiziona uno spaventapasseri.",
        "Abbatti alberi fino alle 7:40.",
        "Svuota l'inventario e prendi la canna di vetroresina.",
        {
          t: "Entra in città dalla fermata dell'autobus. La scena del Centro sociale si attiva. Non saltarla.",
          k: "warn",
          c: [
            {
              t: "Se la salti, vieni posizionato all'ingresso della città; se la guardi, vieni posizionato accanto al Centro sociale.",
              k: "reason",
            },
          ],
        },
        "Entra nel Centro sociale e tocca il piedistallo della Pergamena dorata (avvia la missione).",
        "Vai al Lago montano e pesca fino all'1:00. Riempi l'inventario con 5 lingotti di ferro + gli oggetti vendibili più preziosi.",
        "Torna a casa.",
        {
          t: "Tra ciò che è vendibile, spedisci abbastanza per il miglioramento del piccone d'acciaio (5,000g), e spedisci anche abbastanza oro per comprare fino a 25 di oro grezzo.",
          c: [
            { t: "Se sei a corto, vendi cavedani. (Vendi prima quelli di bassa qualità.)", k: "tip" },
          ],
        },
        "Saranno le 2:00 subito dopo la vendita. Altrimenti taglia l'erba e svieni.",
      ],
    },
    7: {
      items: [
        "Controlla La Regina del sugo per la ricetta del Saltinpadella.",
        "Controlla la posta finché non ricevi la lettera del Mago.",
        "Annaffia le colture.",
        "Svuota l'inventario. Prendi i 5 lingotti di ferro.",
        {
          t: "Vai dal Mago (attiva una scena).",
          c: [
            {
              t: "Guardare la scena non conta come incontrare il Mago. Devi parlargli dopo la scena perché il suo nome appaia nella scheda Sociale. Ma è puramente estetico senza alcun vantaggio reale, quindi consideralo una perdita di tempo.",
              k: "tip",
            },
          ],
        },
        "Svuota il contenuto del baule del fiume della Foresta Linfabrace (facoltativo).",
        {
          t: "Vai al Fabbro:",
          c: [
            "Compra fino a 25 di oro grezzo (incluso il grezzo dalla pesca).",
            "Migliora al piccone d'acciaio (5,000g).",
          ],
        },
        "Pesca al Lago montano fino alle 2:00, poi svieni. Fondi lingotti d'oro mentre peschi. Fondine 2-3, e uno in più sarà nella fornace quando svieni.",
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Pesca 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Se appare la scena della grotta, scegli i funghi. (Vedi 'Note varie'.)",
        "Annaffia le colture.",
        {
          t: "Tra ciò che è vendibile, spedisci abbastanza per arrivare a 12,000g.",
          c: [
            {
              t: "È per il miglioramento del piccone d'oro (10,000g) + il miglioramento dello zaino (2,000g).",
              k: "reason",
            },
            {
              t: "Se sei a corto, torna a casa prima della fine della giornata e spedisci il pesce che hai pescato quel giorno per coprire la differenza.",
              k: "tip",
            },
          ],
        },
        "Pesca al Lago montano fino alle 2:00, poi svieni. Fondi lingotti d'oro mentre peschi finché non ne hai 5 in totale. Dovresti tenere questi lingotti quando svieni.",
        {
          t: "Questo è il primo giorno dall'inizio in cui non sali alcuna abilità, quindi non sforzarti troppo.",
          c: [
            {
              t: "Dovresti svegliarti al 50% di energia, non allo 0%.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Annaffia le colture.",
        "Abbatti alberi fino a circa le 8:00.",
        "Svuota l'inventario. Prendi la canna di vetroresina.",
        "Vai al Fabbro e migliora al piccone d'oro (10,000g).",
        "Vai da Pierre e migliora lo zaino (2,000g).",
        "Pesca al Lago montano fino alle 2:00, poi svieni.",
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Pesca 9 → 10 (scegli la professione Acchiappa-pesci)"],
        },
        "Anche se oggi non raggiungi Pesca 10, lo otterrai al prossimo giorno di pesca. Il percorso non cambia in modo significativo.",
      ],
    },
    10: {
      items: [
        "Annaffia le colture.",
        "Prendi funghi dalla grotta.",
        {
          t: "Calcola il cavolo verde extra necessario per Fattoria livello 6.",
          c: [
            "8 di esperienza per pastinaca × 15 = 120 di esperienza",
            "17 di esperienza per cavolo verde × 16 = 272 di esperienza",
            "3,300 di esperienza in totale − 120 − 272 = 2,908 di esperienza necessaria",
            "2,908 di esperienza / 17 = 172 di cavolo verde",
            "172 semi di cavolo verde × 70g = 12,040g",
          ],
        },
        {
          t: "Se hai Pesca livello 10, spedisci abbastanza pesce per comprare metà dei semi di cavolo verde che ti servono (6,020g).",
          c: [
            {
              t: "Due lotti è ottimale per non creare più irrigatori del necessario. Così assicuri quanti più lingotti di ferro possibile per gli irrigatori di qualità il 28 di primavera.",
              k: "reason",
            },
          ],
        },
        {
          t: "Se non hai Pesca livello 10, non spedire il pesce ora. Vendilo direttamente a Willy domani.",
          c: [{ t: "Perderesti il 25% dell'oro.", k: "reason" }],
        },
        "Svuota l'inventario. Prendi la canna di vetroresina.",
        "Se la canna ha meno di 100 di esca, prendi anche qualche pesce. Pesca qualche ora al Lago montano fino alle 9:00, poi vendi il pesce a Willy e compra altra esca.",
        "Pesca al Lago montano fino alle 2:00, poi svieni. Non dimenticare di prendere la fornace per le Miniere di domani.",
      ],
    },
    11: {
      items: [
        "Raccogli il cavolo verde. (Raggiungi Fattoria livello 2.)",
        {
          t: "Inizia a zappare le caselle in uno schema da irrigatori.",
          c: [{ t: "Non annaffiare nessuna casella.", k: "warn" }],
        },
        "Lascia la fattoria intorno alle 8:00.",
        "Se ieri non hai spedito il pesce, vendilo a Willy.",
        "Vai al Fabbro e ritira il piccone d'oro.",
        "Vai da Pierre e compra tutti i semi di cavolo verde che hai calcolato (6,020g).",
        {
          t: "Torna alla fattoria e finisci di zappare + piantare.",
          c: [
            { t: "Non annaffiare nessuna casella.", k: "warn" },
            {
              t: "Facoltativamente crea un sentiero di ciottoli per segnare dove andranno i futuri irrigatori.",
              k: "tip",
            },
            { t: "Il cavolo verde non ha bisogno d'acqua fino al 14 di primavera.", k: "tip" },
          ],
        },
        "Vai alle Miniere e posiziona una fornace. Continua a fondere lingotti.",
        {
          t: "Estrai fino alle 2:00, poi svieni.",
          c: [
            {
              t: "Man mano che raccogli più rame, crea altre 3 fornaci (4 in totale).",
              k: "tip",
            },
          ],
        },
        {
          t: "Alla fine della giornata ottieni:",
          k: "result",
          c: ["Fattoria 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Prendi funghi dalla grotta.",
        "Estrai fino alle 2:00, poi svieni. Fondi rame e ferro mentre estrai.",
        "Quando raggiungi Estrazione livello 5, scegli la professione Minatore.",
      ],
    },
    13: {
      items: [
        "Estrai fino alle 2:00, poi svieni.",
        {
          t: "Non c'è nulla che ti serva alla Festa delle Uova, quindi andarci è una perdita di tempo. L'eccezione è se punti alla sfida di spedire ogni oggetto fino alla fine dell'anno 1, nel qual caso ti serve un seme di fragola o due.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Controlla La Regina del sugo per la ricetta dell'Insalata russa.",
        "Prendi funghi dalla grotta.",
        "Arriva alle Miniere entro le 0:00.",
        "Se sei a corto del minerale rimanente per gli irrigatori, estrai minerale al livello 21/41 prima di scendere ancora.",
        {
          t: "Una volta raggiunto il fondo delle Miniere, torna a estrarre minerale.",
          c: [
            {
              t: "A seconda dell'abilità, della fortuna e se fai pause di pesca nei giorni di pioggia, puoi raggiungere il livello 120 tra il 14 e il 18 di primavera.",
              k: "tip",
            },
            {
              t: "Una volta creati tutti gli irrigatori (normali), il rame grezzo serve solo per i miglioramenti degli attrezzi. Gli irrigatori di qualità richiedono molto ferro grezzo e oro grezzo.",
              k: "tip",
            },
          ],
        },
        {
          t: "Alle 0:00, torna a casa e crea + posiziona quanti più irrigatori possibile.",
          c: [{ t: "Va bene se non coprono tutte le colture.", k: "tip" }],
        },
        {
          t: "Spedisci oggetti per arrivare a 42,500g.",
          c: [
            {
              t: "Se sei a corto, arriva solo a 32,500g e salta il fascio da 10,000g di domani. (Nella maggior parte delle partite probabilmente sarai a corto.)",
              k: "tip",
            },
          ],
        },
        "Saranno le 2:00 subito dopo. Altrimenti taglia l'erba e svieni.",
      ],
    },
    15: {
      items: [
        {
          t: "I lamponi iniziano ad apparire oggi, ma non fare una lunga deviazione per raccoglierli.",
          c: [
            { t: "Il tempo non vale il piccolo guadagno di energia.", k: "reason" },
            {
              t: "Usa la stessa strategia di pausa sui cespugli di lamponi che sui bidoni.",
              k: "tip",
            },
          ],
        },
        "Annaffia le colture non ancora coperte dagli irrigatori (se presenti).",
        "Svuota l'inventario. Prendi gli oggetti per i fasci raccolta primaverile (4), colture primaverili (4), fabbro (3), geologo (4) e avventuriero (2).",
        {
          t: "Vai al Centro sociale e completa i fasci con questi oggetti.",
          c: [
            {
              t: "Dopo aver completato i due fasci della Sala caldaie, non dimenticare di uscire dalla Pergamena dorata per non restare bloccato nella scena bacata.",
              k: "warn",
            },
          ],
        },
        "Se hai abbastanza denaro (42,500g), completa anche il fascio della Cassaforte.",
        "Torna a casa, posiziona un cristallario e mettici dentro un diamante.",
        "Svuota l'inventario e vai alle Miniere.",
        "Se sei a corto del minerale rimanente per gli irrigatori, estrai minerale al livello 21/41 prima di scendere ancora.",
        "Estrai fino alle 2:00, poi svieni. Se ti servono ancora più irrigatori, non dimenticare di tenere i lingotti fusi nell'inventario.",
        "Alla fine della giornata si sbloccano i carrelli.",
      ],
    },
    16: {
      items: [
        "Prendi funghi dalla grotta.",
        "Annaffia le colture non ancora coperte dagli irrigatori (se presenti).",
        "Crea altri irrigatori con i lingotti fusi di ieri (se necessario).",
        {
          t: "Estrai fino alle 2:00.",
          c: [
            {
              t: "Non dimenticare di usare il carrello per viaggiare più in fretta.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["Dopo il 17 di primavera, qui la guida diventa meno dettagliata."],
      items: [
        "Se non hai ancora raggiunto il livello 120 delle Miniere, completalo il più in fretta possibile.",
        {
          t: "Inoltre, se ti serve più oro per finire la Cassaforte (42,500g), pesca al Lago montano per completarla il più in fretta possibile.",
          c: [
            {
              t: "Se restano entrambe, sincronizzale perché finiscano lo stesso giorno.",
              k: "tip",
              c: [
                {
                  t: "L'autobus non viene riparato fino al giorno dopo.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Una volta raggiunto il livello 120 delle Miniere, sposta tutte le fornaci dalle Miniere alla fattoria.",
        "Fai la Caverna del Teschio il più in fretta e il più spesso possibile. (Vedi 'Strategia generale della Caverna del Teschio'.)",
        {
          t: "Nel tempo libero:",
          c: [
            "Inizia a ripulire i detriti della fattoria dove andranno gli irrigatori di qualità + la carambola.",
            "Crea e posa la pavimentazione dove andranno gli irrigatori di qualità.",
            "Crea e posiziona spaventapasseri.",
            "Crea altre fornaci con il rame avanzato.",
            "Avvia una foresta di querce piantando ghiande in un angolo della fattoria.",
            "Estrai altro minerale nelle Miniere (livelli 20/40/80).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Spedisci oggetti per:",
          c: [
            "2,000g per il miglioramento dell'ascia di rame.",
            "Abbastanza oro per comprare il 2° lotto di semi di cavolo verde (70g ciascuno).",
          ],
        },
      ],
    },
    19: {
      items: [
        "Alle 9:00, vai da Clint e migliora all'ascia di rame (2,000g).",
        "Vai da Pierre e compra il 2° lotto di semi di cavolo verde.",
      ],
    },
    20: {
      items: [
        "Raccogli il 1° cavolo verde e pianta la 2ª coltura.",
        "Spedisci oggetti per arrivare a 5,000g per il miglioramento dell'ascia d'acciaio.",
      ],
    },
    21: {
      items: [
        "Controlla La Regina del sugo per la ricetta dell'Insalata di ravanelli.",
        "Alle 9:00, vai da Clint, ritira l'ascia di rame e migliora all'ascia d'acciaio (5,000g).",
        "Se punti alla sfida di spedire ogni oggetto fino alla fine dell'anno 1, devi comprare e piantare oggi un bulbo di tulipano (20g) e semi di jazz (30g) perché siano pronti entro il 28 di primavera.",
      ],
    },
    22: {
      items: ["Spedisci oggetti per arrivare a 2,000g per il miglioramento della zappa di rame."],
    },
    23: {
      items: [
        "Alle 9:00, vai da Clint, ritira l'ascia d'acciaio e migliora alla zappa di rame (2,000g).",
        {
          t: "Ora che hai l'ascia d'acciaio, quando arriva un giorno sfortunato, usala per liberare spazio nella fattoria e preparare gli irrigatori. Anche in un giorno normale, fallo al più tardi entro il 27.",
          c: [
            {
              t: "Tuttavia, devi prima raggiungere Estrazione livello 10 prima di fare una pausa, dato che ti serve la professione Fabbro prima del 25 di primavera.",
              k: "warn",
            },
            {
              t: "Ricorda di posizionare anche spaventapasseri e semi di pastinaca (colture di riempimento).",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Spedisci più che puoi.",
          c: [
            { t: "Raccogli più oro possibile per domani.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Pianifica quanti semi di carambola (400g ciascuno) piantare il 2 d'estate. Varia a seconda della partita; considera i tuoi introiti dalla Caverna del Teschio da ora fino al 2 d'estate. Ti servono circa due giorni per liberare e preparare la fattoria. (Potresti aver già liberato un giorno in un giorno sfortunato dopo il 23 di primavera.) Punta a circa 400-500 semi di carambola.",
        "Alle 9:00, vai da Clint, ritira la zappa di rame e migliora alla zappa d'acciaio (5,000g).",
        {
          t: "Vai all'Oasi e compra un crescipresto deluxe per ogni seme di carambola che comprerai.",
          c: [
            {
              t: "L'Oasi vende crescipresto deluxe solo il giovedì, e ti serve entro il 2 d'estate.",
              k: "reason",
            },
            {
              t: "Oggi Pam è alla clinica per una visita (quindi non guida l'autobus), perciò ti serve un Teletra-Totem: Deserto per raggiungere il deserto. Nella maggior parte delle partite usi comunque un teletra-totem ogni giorno, quindi non è un problema.",
              k: "tip",
            },
          ],
        },
        {
          t: "Spendi il denaro avanzato in semi di carambola per poter svenire senza penalità.",
          c: [
            {
              t: "Compra il resto dei semi di carambola il 2 d'estate.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Niente di particolare da fare."],
    },
    27: {
      items: [
        "Raccogli il 2° cavolo verde. (Raggiungi Fattoria livello 6.)",
        "Alle 9:00, vai da Clint e ritira la zappa d'acciaio.",
      ],
    },
    28: {
      items: [
        "Controlla La Regina del sugo per la ricetta dell'Omelette.",
        {
          t: "Spedisci più che puoi.",
          c: [
            { t: "Raccogli più oro possibile per domani.", k: "reason" },
          ],
        },
        "Crea e posiziona irrigatori di qualità.",
        {
          t: "Se non l'hai già fatto, pianta semi di pastinaca (coltura di riempimento).",
          c: [
            {
              t: "Non usare crescipresto deluxe sui semi di pastinaca, dato che non devono passare al 1 d'estate.",
              k: "warn",
            },
          ],
        },
        "Se finisci verso mezzogiorno, puoi passare il resto del tempo nella Caverna del Teschio.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Niente di particolare. Puoi fare la Caverna del Teschio, ecc. Non devi piantare i semi di carambola fino a domani, quindi non tagliare le pastinache.",
          c: [
            {
              t: "La professione Esperto d'agraria influisce sulla 3ª carambola.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Taglia e pianta tutto il crescipresto deluxe + il 1° lotto di semi di carambola che hai comprato il 25 di primavera.",
        "Alle 9:00, vai all'Oasi a comprare il resto dei semi di carambola, poi torna a casa e pianta.",
        {
          t: "Questo occupa gran parte della giornata. Se hai tempo libero:",
          c: [
            "Crea e posiziona 10-20 parafulmini.",
            "Crea e posiziona estrattori sulle querce sparse per la fattoria che non hai abbattuto.",
            "Continua a piantare ghiande in un angolo della fattoria per far crescere la foresta di querce.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Fai la Caverna del Teschio.",
          c: [
            {
              t: "Ti servono 25,000g per il miglioramento del piccone d'iridio.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Fondi lingotti d'iridio. Se finiscono tardi (verso le 14:30), vai da Clint e migliora al piccone d'iridio.",
          c: [
            {
              t: "Se i lingotti d'iridio da soli non danno abbastanza denaro, puoi vendere gemme direttamente a Clint.",
              k: "tip",
            },
          ],
        },
        "Crea e posiziona 10-20 parafulmini.",
        "Crea e posiziona estrattori sulle querce sparse per la fattoria che non hai abbattuto.",
        "Continua a piantare ghiande in un angolo della fattoria per far crescere la foresta di querce.",
        "Ti serve quanta più resina di quercia possibile per i barilotti. Il fertilizzante per alberi è molto utile per far crescere in fretta la foresta di querce, ma crearlo richiede Raccolta selvatica livello 7. Il modo migliore per salire in Raccolta selvatica senza quasi sprecare tempo di gioco (invece di abbattere alberi o camminare la lunga distanza fino ai Boschi segreti) è creare e raccogliere semi estivi.",
        {
          t: "Quindi nei giorni in cui non vai alla Caverna del Teschio (come oggi):",
          c: [
            "Gira per la mappa in cerca di oggetti raccoglibili estivi e crea almeno 10-20 semi estivi. Raccogli, ricrea e ripianta più che puoi fino a Raccolta selvatica livello 7.",
            {
              t: "Abbatti i 5 ceppi nei Boschi segreti per esperienza di Raccolta selvatica e legno duro.",
              c: [
                { t: "Ti servono 100 di legno duro per la Stalla.", k: "reason" },
              ],
            },
            {
              t: "Appena hai 100 di legno duro, compra la Stalla da Robin per ridurre i futuri viaggi ai Boschi segreti.",
              c: [
                {
                  t: "Il secondo miglioramento della casa richiede 150 di legno duro.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Dopo il 5 d'estate"],
      items: [
        "Fai di più la Caverna del Teschio. Raccogli più denaro possibile per il 2° lotto di semi di carambola.",
      ],
    },
    9: {
      items: ["Spedisci abbastanza per comprare il 2° lotto di semi di carambola."],
    },
    10: {
      items: [
        {
          t: "Compra il 2° lotto di semi di carambola.",
          c: [
            {
              t: "L'Oasi chiude domani per il Luau, quindi compra oggi.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Raccogli e ripianta.",
          c: [
            {
              t: "Il crescipresto deluxe resta nella casella, quindi non devi riapplicarlo.",
              k: "reason",
            },
          ],
        },
        {
          t: "Non vendere nessuna carambola — nemmeno di qualità oro —, mettila tutta nei barilotti. A questo punto, applica estrattori a quante più querce e costruisci quanti più barilotti possibile.",
          c: [
            { t: "Compra legno da Robin quando lo finisci.", k: "tip" },
            {
              t: "Non vendere vino prima di riconvertirti da Esperto d'agraria ad Artigiano tramite la Statua dell'incertezza.",
              k: "warn",
            },
          ],
        },
        "All'inizio puoi riempire la casa di barilotti. Più avanti è comodo comprare diverse Rimesse grandi e posizionarle vicino alla casa. Oppure, una volta sbloccata la Cava, coprila di pavimentazione e usala per stoccare i barilotti.",
        {
          t: "Alla fine della giornata raggiungi Fattoria livello 10. Scegli la professione Esperto d'agraria.",
          c: [
            {
              t: "Purtroppo l'effetto di Esperto d'agraria non si applica alle colture piantate oggi.",
              k: "tip",
            },
            {
              t: "Riconvertiti ad Artigiano più tardi prima di vendere vino di carambola.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Dopo il 13 d'estate"],
      items: [
        "Il 13 d'estate è sempre un giorno di tempesta.",
        "Il 13 d'estate o in un momento successivo, compra e pianta altre colture estive necessarie per fasci, missioni, regali, ecc.",
        "Le colture più lunghe sono il melone e il mirtillo, che impiegano 10 giorni con la professione Esperto d'agraria. Il crescipresto deluxe riduce a 7 giorni. Puoi quindi rimandare la piantagione di colture estive extra fino al 21 d'estate al più tardi.",
      ],
    },
    19: {
      items: ["Spedisci abbastanza oggetti per la 3ª carambola."],
    },
    20: {
      items: [
        "Raccogli la carambola.",
        "Alle 9:00, vai all'Oasi e compra il 2° lotto di semi di carambola.",
        {
          t: "Pianta i semi di carambola.",
          c: [
            {
              t: "Il crescipresto deluxe resta nella casella, quindi non devi riapplicarlo.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Spedisci abbastanza per comprare altro crescipresto deluxe.",
          c: [
            {
              t: "Coprirai tutta la fattoria di zucche, quindi ti serve crescipresto extra oltre a quello riportato dalle caselle di carambola.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Compra altro crescipresto deluxe all'Oasi.",
        "In un momento tra ora e il 28 d'estate, zappa e posiziona tutti gli irrigatori di qualità e il crescipresto deluxe extra. Se non annaffi il terreno il 28 d'estate, il grano non sarà pronto il 2 d'autunno.",
      ],
    },
    26: {
      items: ["Il 26 d'estate è sempre un giorno di tempesta."],
    },
    27: {
      items: [
        "Spedisci abbastanza per comprare semi di grano (10g ciascuno) per coprire tutta la fattoria domani.",
      ],
    },
    28: {
      items: [
        "Raccogli la carambola.",
        "Alle 9:00, vai da Pierre e compra semi di grano per coprire tutta la fattoria.",
        {
          t: "Pianta i semi di grano (coltura di riempimento — conserva il crescipresto deluxe).",
          c: [
            {
              t: "La piantagione del 28 d'estate funziona solo se hai la professione Esperto d'agraria. Altrimenti non puoi ottenere la 3ª zucca con questa strategia.",
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
        "Niente di particolare. Puoi fare la Caverna del Teschio, ecc. Devi aspettare che il grano finisca di crescere.",
        "Per completare il Museo, è molto utile avere Raccolta selvatica livello 10 e la professione Segugio prima del 1 d'inverno (per individuare più facilmente i punti dei manufatti). Se non hai ancora Raccolta selvatica 10, è meglio piantare una grande foresta con i semi di acero e le pigne avanzati e abbatterla tutta. (È più efficiente che raccogliere gli oggetti raccoglibili autunnali.)",
        "Spedisci abbastanza per comprare semi di zucca (100g ciascuno) per coprire la fattoria.",
      ],
    },
    2: {
      items: [
        {
          t: "Raccogli il grano e ripianta semi di zucca per coprire tutta la fattoria.",
          c: [
            {
              t: "Le zucche sono migliori dei mirtilli rossi perché non avrai abbastanza barilotti per lavorare tutti i mirtilli rossi.",
              k: "reason",
            },
          ],
        },
        "Come per la carambola, ripeti raccolta + ripiantagione per ottenere 3 raccolti di zucca in autunno.",
      ],
    },
    9: {
      items: [
        "Ora puoi vendere vino di carambola.",
        "Riconvertiti da Esperto d'agraria ad Artigiano tramite la Statua dell'incertezza.",
        {
          t: "Compra altri semi per domani.",
          c: [
            {
              t: "Pierre è chiuso il mercoledì, quindi compra oggi.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "La 1ª zucca è pronta oggi.",
        {
          t: "Ripianta.",
          c: [
            {
              t: "Come la carambola, anche la zucca può essere raccolta 3 volte in totale.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Dopo il 1 d'inverno"],
      items: [
        {
          t: "Ora è la tua occasione per completare i fasci rimanenti del Centro sociale. Per sbloccare l'Isola Zenzero e la fattoria dell'isola, completa il Centro sociale il più in fretta possibile.",
          c: [
            {
              t: "Una volta raggiunta la fattoria dell'isola, puoi di nuovo piantare carambola in massa, che diventa la tua principale fonte di reddito.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Obiettivi di oggi (riepilogo): un obiettivo principale (intestazione comprimibile)
// con metodi/motivi (c). Separato da items; condensa gli obiettivi chiave di ogni giorno.
// I passaggi banali sono omessi, ma i punti importanti a valanga (accumulare materiali
// per il giorno dopo, ecc.) sono mantenuti.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Risparmia denaro per comprare la canna di vetroresina (1,800g) il più in fretta possibile domani.",
        c: [
          {
            t: "Incontra tutti in città.",
            c: [
              {
                t: "Completare la missione 'Presentazioni' sblocca 'Farsi degli amici', che dà 100g extra il 2 di primavera.",
                k: "reason",
              },
            ],
          },
          "Dona un manufatto al Museo per la ricompensa di 250g.",
          "Vendi gli oggetti raccoglibili.",
        ],
      },
      {
        t: "Pianta semi.",
        c: [
          "Pianta i semi di pastinaca.",
          "Taglia le erbacce in città per ottenere semi misti.",
        ],
      },
    ],
    2: [
      {
        t: "Compra la canna di vetroresina (1,800g).",
        c: [
          "Compra la canna d'allenamento (25g) e pesca.",
          "Dai la pietra a Willy per la ricompensa di 'Farsi degli amici' (100g).",
        ],
      },
      "Compra esca per il giorno dopo.",
    ],
    3: [
      {
        t: "Ottieni un rame grezzo.",
        c: [
          {
            t: "Per attivare la scena di Clint domani.",
            k: "reason",
          },
          {
            t: "Ottienilo pescando.",
            c: [
              {
                t: "Se non ne ottieni uno, tieni 75g per comprare rame grezzo da Clint.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Cattura più pesci gatto possibile.",
        c: ["Vendi tutto il pesce + gli oggetti raccoglibili di spiaggia in più al negozio di Willy e compra esca."],
      },
    ],
    4: [
      {
        t: "Ottieni 150 di legno.",
        c: [
          {
            t: "Ti serviranno 2 bauli e uno spaventapasseri nei prossimi due giorni.",
            k: "reason",
          },
        ],
      },
      "Pesca al Lago montano.",
    ],
    5: [
      {
        t: "Migliora il piccone al piccone di rame (2,000g).",
        c: [
          {
            t: "Fai 5 lingotti di rame al livello 10 delle Miniere e consegna il piccone a Clint.",
            c: [
              {
                t: "Consegnalo prima che Clint chiuda (finisci i 5 lingotti al più tardi entro le 15:00).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Pianta semi e pesca al Lago montano.",
        c: [
          "Compra e pianta semi di cavolo verde (per Fattoria 2) più semi di fagioli, cavolfiore e patata.",
        ],
      },
      {
        t: "Fai scorte per ciò che viene dopo.",
        c: [
          {
            t: "Tieni giada, smeraldo, rubino e diamante per la Caverna del Teschio.",
            k: "tip",
          },
          { t: "Tieni un carbone per uno spaventapasseri.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Risparmia per il miglioramento del piccone d'acciaio (5,000g) e oro grezzo.",
        c: ["Pesca al Lago montano per lingotti di ferro + pesce vendibile."],
      },
      {
        t: "Attiva la scena del Centro sociale e tocca la Pergamena dorata (avvia la missione).",
        c: [
          { t: "Si attiva quando entri in città dalla fermata dell'autobus.", k: "tip" },
        ],
      },
      "Crea e posiziona uno spaventapasseri.",
    ],
    7: [
      {
        t: "Migliora il piccone al piccone d'acciaio (5,000g).",
        c: ["Compra oro grezzo al Fabbro, poi migliora."],
      },
      "Incontra il Mago (attiva una scena).",
      "Pesca al Lago montano e fondi lingotti d'oro.",
    ],
    8: [
      {
        t: "Risparmia 12,000g per i miglioramenti del piccone d'oro (10,000g) e dello zaino (2,000g).",
        c: ["Pesca al Lago montano per oggetti vendibili."],
      },
      {
        t: "Fondi 5 lingotti d'oro e dormi tenendoli.",
        c: [
          {
            t: "Svegliati al 50% di energia per evitare lo sforzo eccessivo (primo giorno senza aumento di abilità).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Migliora al piccone d'oro (10,000g) e migliora lo zaino (2,000g).",
      "Pesca al Lago montano (Pesca 10 → professione Acchiappa-pesci).",
    ],
    10: [
      {
        t: "Calcola i semi di cavolo verde necessari per Fattoria 6 e risparmia per metà.",
        c: [
          {
            t: "Pianta il cavolo verde in due lotti per non creare più irrigatori del necessario.",
            k: "tip",
          },
          {
            t: "Se non hai Pesca 10, non spedire: vendi a Willy direttamente domani.",
            k: "tip",
          },
        ],
      },
      {
        t: "Prendi una fornace per le Miniere di domani.",
        c: [{ t: "Non dimenticarlo prima di svenire.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Raccogli il cavolo verde (Fattoria 2) e compra + pianta il 2° lotto di semi di cavolo verde (6,020g).",
        c: [
          "Zappa le caselle in uno schema da irrigatori (senza annaffiare).",
          { t: "Il cavolo verde non ha bisogno d'acqua fino al 14 di primavera.", k: "tip" },
        ],
      },
      "Estrai e fondi lingotti nelle Miniere.",
    ],
    12: [
      {
        t: "Estrai e fondi rame e ferro.",
        c: ["Scegli la professione Minatore a Estrazione livello 5."],
      },
    ],
    13: [
      {
        t: "Continua a scendere ed estrarre nelle Miniere.",
        c: [
          { t: "Salta la Festa delle Uova a meno che non ti serva qualcosa (una perdita di tempo).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Scendi verso il livello 120 delle Miniere, estraendo minerale per gli irrigatori.",
        c: ["Se sei a corto, estrai ferro/oro grezzo al livello 21/41."],
      },
      {
        t: "Spedisci oro per il fascio della Cassaforte (42,500g).",
        c: [
          {
            t: "Se sei a corto, arriva solo a 32,500g e salta il fascio da 10,000g di domani.",
            k: "tip",
          },
        ],
      },
      "Crea più irrigatori possibile a casa.",
    ],
    15: [
      {
        t: "Completa i fasci del Centro sociale.",
        c: [
          "Porta e consegna gli oggetti per i fasci raccolta primaverile, colture primaverili, fabbro, geologo e avventuriero.",
          { t: "Se hai abbastanza denaro (42,500g), completa anche il fascio della Cassaforte.", k: "tip" },
          {
            t: "Esci dalla Pergamena dorata per non restare bloccato nella scena bacata.",
            k: "warn",
          },
        ],
      },
      "Posiziona un cristallario e mettici dentro un diamante.",
      {
        t: "Estrai fino alle 2:00.",
        c: [{ t: "I carrelli si sbloccano alla fine della giornata.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Estrai e crea più irrigatori.",
        c: [{ t: "Viaggia più in fretta con il carrello.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Completa il livello 120 delle Miniere e completa la Cassaforte (42,500g).",
        c: [
          {
            t: "Se restano entrambe, sincronizzale perché finiscano lo stesso giorno (l'autobus viene riparato il giorno dopo).",
            k: "tip",
          },
        ],
      },
      "Fai la Caverna del Teschio il più spesso possibile.",
      {
        t: "Prepara le prossime colture nel tempo libero.",
        c: [
          "Ripulisci i detriti della fattoria e posa la pavimentazione dove andranno gli irrigatori di qualità.",
          "Crea altri spaventapasseri e fornaci, e pianta ghiande per far crescere una foresta di querce.",
        ],
      },
    ],
    18: [
      "Spedisci oro per il miglioramento dell'ascia di rame (2,000g) e il 2° lotto di semi di cavolo verde.",
    ],
    19: [
      "Migliora l'ascia all'ascia di rame (2,000g).",
      "Compra il 2° lotto di semi di cavolo verde da Pierre.",
    ],
    20: [
      "Raccogli il 1° cavolo verde e pianta la 2ª coltura.",
      "Spedisci oro per il miglioramento dell'ascia d'acciaio (5,000g).",
    ],
    21: [
      "Migliora l'ascia all'ascia d'acciaio (5,000g).",
      {
        t: "(Facoltativo) Se punti alla sfida di spedire ogni oggetto, pianta un bulbo di tulipano e semi di jazz.",
        c: [{ t: "Saranno pronti entro il 28 di primavera.", k: "reason" }],
      },
    ],
    22: ["Spedisci oro per il miglioramento della zappa di rame (2,000g)."],
    23: [
      "Migliora la zappa alla zappa di rame (2,000g).",
      {
        t: "In un giorno sfortunato, libera spazio nella fattoria e prepara gli irrigatori (al più tardi entro il 27).",
        c: [
          {
            t: "Raggiungi prima Estrazione livello 10 prima di fare una pausa (professione Fabbro necessaria prima del 25 di primavera).",
            k: "warn",
          },
          {
            t: "Posiziona anche spaventapasseri e semi di pastinaca (riempimento).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Raccogli più oro possibile per domani.",
        c: ["Spedisci più che puoi."],
      },
    ],
    25: [
      "Pianifica quanti semi di carambola piantare il 2 d'estate (punta a ~400-500).",
      "Migliora la zappa alla zappa d'acciaio (5,000g).",
      {
        t: "Compra crescipresto deluxe all'Oasi (uno per seme di carambola).",
        c: [{ t: "L'Oasi lo vende solo il giovedì.", k: "reason" }],
      },
    ],
    26: ["Niente di particolare. Fai la Caverna del Teschio, ecc."],
    27: [
      "Raccogli il 2° cavolo verde (Fattoria 6).",
      "Ritira la zappa d'acciaio da Clint.",
    ],
    28: [
      {
        t: "Crea irrigatori di qualità e pianta una coltura di riempimento (pastinache).",
        c: [
          {
            t: "Non usare crescipresto deluxe sulle pastinache (non devono passare al 1 d'estate).",
            k: "warn",
          },
        ],
      },
      "Spedisci più oro possibile per domani.",
    ],
  },
  summer: {
    1: [
      {
        t: "Niente di particolare. Fai la Caverna del Teschio, ecc.",
        c: [
          {
            t: "Non tagliare le pastinache (la professione Esperto d'agraria influisce sulla 3ª carambola).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Pianta la 1ª carambola con crescipresto deluxe.",
        c: ["Compra il resto dei semi di carambola all'Oasi e piantali."],
      },
      {
        t: "Fai scorte nel tempo libero.",
        c: [
          "Crea 10-20 parafulmini.",
          "Posiziona estrattori sulle querce e pianta ghiande per far crescere la foresta di querce.",
        ],
      },
    ],
    3: [
      {
        t: "Fai la Caverna del Teschio.",
        c: [
          {
            t: "Ti servono 25,000g per il miglioramento del piccone d'iridio.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Fondi lingotti d'iridio e migliora al piccone d'iridio.",
      {
        t: "Raccogli resina di quercia e legno duro mentre punti a Raccolta selvatica livello 7.",
        c: [
          "Crea e raccogli semi estivi per guadagnare esperienza di Raccolta selvatica.",
          "Abbatti i ceppi dei Boschi segreti per legno duro.",
          {
            t: "Compra la Stalla con 100 di legno duro per ridurre i futuri viaggi.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Fai la Caverna del Teschio, risparmiando per il 2° lotto di semi di carambola."],
    9: ["Spedisci abbastanza per comprare il 2° lotto di semi di carambola."],
    10: [
      {
        t: "Compra il 2° lotto di semi di carambola.",
        c: [{ t: "L'Oasi chiude domani per il Luau, quindi compra oggi.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Ripeti raccolta/ripiantagione e metti tutta la carambola nei barilotti.",
        c: [
          "Applica estrattori a quante più querce e costruisci quanti più barilotti possibile.",
          {
            t: "Non vendere vino prima di riconvertirti ad Artigiano.",
            k: "warn",
          },
        ],
      },
      "Alla fine della giornata raggiungi Fattoria 10 (professione Esperto d'agraria).",
    ],
    13: [
      "Compra e pianta altre colture estive per fasci/missioni (al più tardi entro il 21 d'estate).",
    ],
    19: ["Spedisci abbastanza per la 3ª carambola."],
    20: ["Raccogli la carambola e ripianta (compra il 2° lotto di semi all'Oasi)."],
    24: [
      {
        t: "Spedisci abbastanza per comprare altro crescipresto deluxe.",
        c: [
          {
            t: "Coprirai tutta la fattoria di zucche, quindi ti serve crescipresto extra.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Posiziona irrigatori di qualità e crescipresto deluxe extra.",
        c: [
          {
            t: "Annaffia il 28 d'estate perché il grano sia pronto il 2 d'autunno.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Niente di particolare (sempre un giorno di tempesta)."],
    27: ["Spedisci abbastanza per comprare semi di grano per coprire tutta la fattoria domani."],
    28: [
      "Raccogli la carambola.",
      {
        t: "Pianta semi di grano su tutta la fattoria (riempimento).",
        c: [
          {
            t: "Valido solo con la professione Esperto d'agraria (per la 3ª zucca).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Spedisci abbastanza per comprare semi di zucca per coprire la fattoria.",
      {
        t: "(Facoltativo) Prepara Raccolta selvatica livello 10 e la professione Segugio per il Museo.",
        c: [
          {
            t: "Piantare una foresta con semi di acero e pigne e abbatterla è efficiente.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Raccogli il grano e pianta semi di zucca su tutta la fattoria.",
        c: [
          {
            t: "Le zucche sono migliori dei mirtilli rossi, dato che non avrai abbastanza barilotti.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Riconvertiti ad Artigiano per iniziare a vendere vino di carambola.",
        c: ["Riconvertiti da Esperto d'agraria → Artigiano tramite la Statua dell'incertezza."],
      },
      {
        t: "Compra in anticipo i semi per domani.",
        c: [{ t: "Pierre è chiuso il mercoledì, quindi compra oggi.", k: "reason" }],
      },
    ],
    10: ["Raccogli la 1ª zucca e ripianta."],
  },
  winter: {
    1: [
      {
        t: "Completa i fasci rimanenti del Centro sociale.",
        c: [
          {
            t: "Sbloccare l'Isola Zenzero e la fattoria dell'isola ti permette di ripiantare carambola in massa come reddito principale.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
