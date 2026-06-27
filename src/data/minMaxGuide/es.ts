// =============================================================================
// AVISO DE LICENCIA (GPL-3.0)
// El contenido de la guía de este archivo (MIN_MAX_GUIDE / DAILY_GOALS) es una obra
// derivada de "Stardew Valley Min-Max Routing / Strategy" de BlackSight6 & Zamiel
// (GPL-3.0).
//   Fuente: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Licencia: GNU GPL-3.0 — texto completo en LICENSES/GPL-3.0.txt.
// Modificaciones: condensado y reestructurado en un árbol de datos por día (GuideNode),
// con los nombres propios usando los nombres oficiales del juego en español.
// Por tanto, este archivo se rige por la GPL-3.0, no por la licencia MIT del proyecto.
// (Mantenido separado del material del wiki bajo CC BY-NC-SA; distribuido como mera agregación.)
//
// Copyright (C) BlackSight6 & Zamiel (guía original)
// Adaptación (C) 2026 Lee Daham
// Este programa es software libre: puedes redistribuirlo y/o modificarlo bajo los
// términos de la Licencia Pública General GNU publicada por la Free Software
// Foundation, ya sea la versión 3 de la Licencia o (a tu elección) cualquier versión
// posterior. Este programa se distribuye SIN NINGUNA GARANTÍA. Consulta la GNU GPL
// para más detalles: https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Coge las semillas de chirivía.",
        {
          t: "Tala de inmediato 9 árboles para alcanzar Recolección nivel 1.",
          c: [
            { t: "Necesitas 8 1/3 árboles.", k: "tip" },
            {
              t: "Necesitas el nivel 1 antes de recolectar para tener una posibilidad de cebolletas de calidad plata.",
              k: "reason",
            },
            {
              t: "Concéntrate solo en talar, empezando en dirección al camino hacia el bosque.",
              k: "tip",
              c: [
                {
                  t: "Así también despejas las malas hierbas del camino, lo que facilita tu avance.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Tala solo arces y pinos, no los robles con forma de huevo.",
              k: "warn",
              c: [
                {
                  t: "Los robles no sueltan bellotas hasta el día 2 de primavera, y las bellotas son valiosas.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Por la misma razón, no toques las semillas del suelo con el hacha o la azada antes del día 2 de primavera (se destruyen).",
              k: "warn",
            },
            {
              t: "No tales tocones; golpea cada árbol hasta que caiga (hasta 10 golpes) y pasa al siguiente.",
              k: "tip",
              c: [{ t: "Esto da más madera y experiencia de Recolección.", k: "reason" }],
            },
            {
              t: "Cuando un árbol empiece a caer, camina hasta donde caerá la madera y pausa de inmediato.",
              k: "tip",
            },
            {
              t: "El tiempo del juego se detiene pero la animación de caída termina, y la madera se recoge automáticamente mientras está en pausa.",
              k: "reason",
            },
            {
              t: "Usa siempre esta estrategia al talar árboles (no tocones).",
              k: "tip",
            },
            {
              t: "Si pierdes la cuenta de los árboles, revisa la pestaña de Habilidades para ver la subida de nivel de Recolección.",
              k: "tip",
            },
            { t: "También es útil para pescar mañana.", k: "tip" },
          ],
        },
        "Una vez en Recolección 1, fabrica un cofre y colócalo junto a tu casa, luego vacía tu inventario y conserva solo la guadaña, el hacha, el pico y la azada.",
        "Sal hacia el bosque al sur. (Son alrededor de las 9:20.)",
        {
          t: "Usa una captura de pantalla/zoom para revisar los recolectables del Bosque Tizón y planear tu ruta.",
          c: [
            "Recoge todos los recolectables al pasar.",
            {
              t: "Si no desperdicia ganancias de energía, puedes comer cebolletas mientras las recoges para liberar espacio en el inventario.",
              k: "tip",
            },
            {
              t: "Corta tantas malas hierbas como puedas, pero no te desvíes mucho por una sola.",
              k: "tip",
            },
            { t: "Tienes que encontrarte con Marnie antes de las 12:50.", k: "reason" },
          ],
        },
        {
          t: "Encuéntrate con Jas mientras va de su casa al lugar de la comba.",
          time: "11:20",
        },
        {
          t: "Encuéntrate con Haley camino del lugar de las fotos en el suroeste. Si vas adelantado, es buen momento para cortar más malas hierbas.",
          time: "11:40",
        },
        "Ve al pueblo.",
        {
          t: "Revisa los dos cubos de basura junto a las casas de Jodi y Haley, y despeja malas hierbas en medio si hay tiempo.",
          c: [
            {
              t: "Pausar justo después de revisar un cubo de basura es lo óptimo.",
              k: "tip",
            },
            {
              t: "Evita perder tiempo cuando los objetos salen disparados al lado contrario.",
              k: "reason",
            },
            {
              t: "Es similar a la estrategia de pausa para los árboles que caen.",
              k: "tip",
            },
            {
              t: "Revisar cubos de basura desperdicia mucho tiempo, así que la ruta solo lo hace los dos primeros días.",
              k: "tip",
            },
          ],
        },
        {
          t: "Encuéntrate con Marnie mientras camina de la Tienda local Pierre's al rancho (pasa por la casa de Emily).",
          time: "12:50",
        },
        "Ve a la playa.",
        {
          t: "Cava en los puntos de artefactos para conseguir tu primer artefacto.",
          c: [
            "Deja los recolectables de la playa en el suelo.",
            {
              t: "Ahora vas justo de inventario y puedes recogerlos el día 2 de primavera.",
              k: "reason",
            },
          ],
        },
        {
          t: "Encuéntrate con Elliott junto a la hoguera al sur de su cabaña.",
          time: "12:00",
        },
        "Ve al pueblo.",
        "Si conseguiste un artefacto, dónalo al Museo y reclama la recompensa (250g).",
        "Revisa los cubos de basura junto al Museo y la Herrería.",
        {
          t: "Encuéntrate con Clint dentro de la Herrería.",
          c: [{ t: "Sal en dirección este.", k: "tip" }],
        },
        "Revisa el cubo de basura junto a MercaJoja.",
        {
          t: "Encuéntrate con Pam, Sam y Shane dentro de MercaJoja.",
          c: [
            {
              t: "Sam y Shane cuentan como conocidos aunque estén trabajando.",
              k: "reason",
            },
          ],
        },
        "Despeja las malas hierbas detrás (al norte) de MercaJoja.",
        "Encuéntrate con Abigail en el puente.",
        {
          t: "Si Maru camina hacia el sur y está cerca, háblale ahora; si no, encuéntrate con ella más tarde cuando esté sentada en el banco.",
          time: "15:20",
        },
        "Revisa el cubo de basura junto a la casa de Lewis.",
        "Encuéntrate con Evelyn (jardín de flores), Caroline + Jodi (plaza del pueblo) y Vincent + Harvey (encima de la casa de Jodi).",
        "Corta malas hierbas en el lado oeste del mapa cerca de Harvey.",
        {
          t: "Encuéntrate con Leah + Pierre dentro de la Tienda local Pierre's.",
          c: [
            {
              t: "Tienes que ir detrás del mostrador para hablar con Pierre.",
              k: "tip",
            },
            {
              t: "No compres a Pierre hoy, ya que comprarás cultivos de primavera los días 5-6 de primavera.",
              k: "tip",
            },
          ],
        },
        {
          t: "Encuéntrate con todos los demás cerca del Salón.",
          time: "~16:00",
          c: [
            {
              t: "A las 16:00 Alex termina de hacer ejercicio y sale de su habitación. Revisa el cubo de basura junto a la casa y entra para encontrarte con George y Alex.",
              c: [
                {
                  t: "Si llegas pronto, puede que tengas que esperar a que Alex salga de su habitación.",
                  k: "tip",
                },
              ],
            },
            {
              t: "A las 16:00 Emily llega al Salón. Revisa el cubo de basura junto al Salón y entra para encontrarte con Gus y Emily.",
              c: [{ t: "Para Gus tienes que ir detrás del mostrador.", k: "tip" }],
            },
            "A las 16:20 Penny pasa la valla de Lewis y Alex sale de casa.",
            "A las 16:40 Penny llega al banco con Maru. Si aún no las has conocido, hazlo allí.",
            "Revisa tu diario de misiones para confirmar que hoy has conocido a 24 de hasta 27 personas.",
          ],
        },
        {
          t: "Vuelve a la granja.",
          c: [
            {
              t: "Deja por ahora los recolectables en el suelo en la parada de autobús.",
              k: "tip",
            },
          ],
        },
        "Vacía tu inventario. Conserva tus herramientas.",
        "Corta malas hierbas en la granja hasta alrededor de las 18:00.",
        "Sal al bosque de atrás sobre las 18:10.",
        "Encuéntrate con Linus fuera de su tienda de campaña.",
        {
          t: "Encuéntrate con Demetrius al sureste de su casa.",
          c: [
            {
              t: "Ya conociste a Robin, así que no hace falta hablar con ella.",
              k: "reason",
            },
          ],
        },
        {
          t: "Encuéntrate con Sebastian cuando sale de casa.",
          c: [
            {
              t: "Si llegas antes de las 19:00, tendrás que esperar a que salga de su habitación a las 18:40.",
              k: "tip",
            },
            {
              t: "Es tiempo perdido que podrías haber usado cortando más malas hierbas en la granja.",
              k: "reason",
            },
          ],
        },
        "Ve al sur hacia el Centro Cívico.",
        "Corta malas hierbas al oeste del Centro Cívico.",
        "Corta malas hierbas al oeste de la fuente.",
        {
          t: "Vuelve a casa.",
          c: [
            {
              t: "Recoge los recolectables de la parada de autobús que dejaste antes.",
              k: "tip",
            },
          ],
        },
        {
          t: "Cava, planta y riega las semillas de chirivía + las semillas variadas.",
          c: [
            {
              t: "Plantar cultivos más allá de las 15 semillas de chirivía iniciales significa que los cuervos pueden comerse uno o más cada día. Pero plantar las semillas variadas vale la pena por el valor extra. (La coliflor y la patata de las semillas variadas te permiten ahorrarte comprarlas para el paquete de cultivos de primavera más adelante.)",
              k: "tip",
            },
          ],
        },
        "Tala árboles hasta que te queden 4-6 de energía.",
        {
          t: "Corta malas hierbas y hierba hasta la 1:00-1:30, según cuántas semillas variadas tengas.",
          c: [
            {
              t: "Debes cavar, plantar y regar todas las semillas variadas antes de las 2:00.",
              k: "warn",
            },
          ],
        },
        {
          t: "Vuelve a casa y envía todo excepto:",
          c: ["Piedra", "Madera", "Carbón", "20 de fibra vegetal"],
        },
        {
          t: "Nota:",
          k: "tip",
          c: [
            {
              t: "Vende todos los recolectables excepto las cebolletas. Preocúpate por los paquetes del Centro Cívico más tarde. Mañana necesitas todo el dinero posible.",
              k: "tip",
            },
            {
              t: "Normalmente comes puerros, dientes de león y comida de cubos de basura (bajo GPE) en lugar de venderlos, pero hoy el dinero urge, así que es una excepción.",
              k: "tip",
            },
          ],
        },
        {
          t: "Cava, planta y riega las semillas variadas restantes.",
          c: [
            {
              t: "Aunque te excedas por debajo de 0 de energía y te desmayes, subes de nivel de Recolección el día 2 de primavera, así que no se arrastra ninguna penalización.",
              k: "tip",
            },
            {
              t: "Si una de las semillas variadas no es una coliflor (comprueba con un mod o el wiki), tendrás que retrasar la entrega inicial del paquete y el envío de oro extra para la Caja fuerte —programado para el día 15 de primavera— hasta el día 17 de primavera.",
              k: "warn",
            },
            {
              t: "La escasez de vagonetas añade algo de presión de tiempo para despejar las Minas, pero es muy raro y no cambia la ruta.",
              k: "tip",
            },
          ],
        },
        {
          t: "Estate dentro de tu casa.",
          time: "justo antes de las 2:00",
          c: [{ t: "Para evitar la penalización de oro.", k: "reason" }],
        },
        {
          t: "Destruye la cama.",
          c: [
            {
              t: "Apareces justo al lado de la puerta cada mañana, lo que ahorra tiempo.",
              k: "reason",
            },
            {
              t: "O sácala de la casa y guárdala en un cofre.",
              k: "tip",
            },
          ],
        },
        {
          t: "Mueve la televisión junto a la puerta.",
          c: [{ t: "Para revisarla justo al despertar.", k: "reason" }],
        },
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Recolección 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Lee todo tu correo.",
          c: [
            {
              t: "Tienes que leer la carta de Willy para conseguir la caña de bambú.",
              k: "reason",
            },
          ],
        },
        "Riega tus cultivos.",
        {
          t: "Fabrica un cofre y llévalo contigo.",
          c: [
            {
              t: "El día 1 de primavera puede que solo hayas conseguido 0-3 cebolletas (y nada de comida de cubos de basura) y no hayas talado 50 de madera. Tala 50 ahora y continúa la ruta. Solo ten en cuenta que todo se retrasa ligeramente.",
              k: "tip",
            },
          ],
        },
        "Vacía todo tu inventario en el cofre. Coge la azada + el cofre fabricado + 1 de piedra.",
        {
          t: "Revisa los cubos de basura junto a la casa de George, el Salón y la casa de Lewis.",
          c: [
            {
              t: "No pasa nada si los aldeanos te pillan: la amistad de cada NPC sigue en 0.",
              k: "reason",
            },
            {
              t: "Esta es la última vez que te desvías por cubos de basura. Desperdician mucho tiempo, así que a partir de ahora revísalos solo cuando no cueste tiempo extra.",
              k: "tip",
            },
          ],
        },
        "Ve a la playa y recibe la caña de bambú.",
        "Dale la piedra a Willy y reclama la recompensa de la misión 'Cómo hacer amigos' (100g).",
        "Coloca el cofre en la esquina inferior derecha del muelle.",
        "Pesca desde el muelle mirando al este. Lanza a la distancia máxima.",
        {
          t: "A las 8:40, destruye la caña de bambú y revisa el resto de recolectables de la playa + puntos de artefactos.",
          c: [
            {
              t: "Si consigues un artefacto ahora y no lo conseguiste el día 1 de primavera, dónalo de inmediato por la recompensa (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Ve a la tienda de Willy. Vende todos los recolectables de la playa + pescado. Compra la caña de entrenamiento (25g) a Willy.",
          c: [
            {
              t: "La caña de entrenamiento aumenta tu probabilidad de captura perfecta. (Subir Pesca con capturas perfectas importa más que el pescado de alta calidad.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Con la caña de entrenamiento, lanza a la distancia mínima justo al sur de la puerta de Willy. Reúne suficiente pescado para llegar a 1,800g.",
          c: [
            {
              t: "Los lanzamientos a distancia mínima tienen más probabilidad de peces fáciles y acortan las animaciones de lanzar/recoger.",
              k: "reason",
            },
            { t: "Consulta también la 'Estrategia general de pesca'.", k: "tip" },
          ],
        },
        "Cuando se acaben el alga (1.54 GPE) y la Joja-Cola (1.92 GPE), come la anchoa (1.82 GPE) o el arenque (1.82 GPE) de mayor calidad.",
        {
          t: "Una vez tengas suficiente pescado para 1,800g y alcances Pesca nivel 2, destruye la caña de entrenamiento, vende todo el pescado y compra la caña de fibra de vidrio a Willy. Compra también todo el cebo posible (5g cada uno) y equípalo en la caña nueva.",
          c: [
            {
              t: "Las capturas perfectas bajan, pero gracias al cebo la caña de fibra de vidrio da experiencia más rápido.",
              k: "reason",
            },
          ],
        },
        "Pesca desde el mismo sitio con lanzamientos a distancia máxima.",
        {
          t: "A las 16:30, si la caña tiene menos de 35 de cebo, ve a comprar más a Willy.",
          c: [
            {
              t: "Necesitas suficiente cebo para el resto de hoy más mañana por la mañana.",
              k: "reason",
            },
          ],
        },
        "Pesca hasta las 2:00. Pon todo el pescado en el cofre antes de desmayarte. (Véndelo a Willy mañana.)",
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Pesca 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "El día 3 de primavera siempre llueve.",
        "Vacía todo tu inventario en el cofre. Coge la caña de fibra de vidrio.",
        "Si tienes 80+ de cebo y conseguiste mena de cobre del cofre de pesca del día 2 de primavera, fabrica un cofre, llévalo contigo y ve directo al río del Bosque Tizón a pescar. Recuerda salir brevemente de la guía para comprar más cebo a Willy antes de ir al lago de la montaña mañana.",
        {
          t: "Si no:",
          c: [
            "Coge la azada del cofre.",
            "Pesca al sur de la casa de Leah hasta las 8:30 o hasta que se te acabe el cebo (lo que ocurra primero).",
            "Revisa los cubos de basura al sur de las casas de Jodi y Emily.",
            "Revisa recolectables + puntos de artefactos en la playa.",
            {
              t: "Vende todo el pescado + recolectables de playa de sobra en la tienda de Willy.",
              c: [
                {
                  t: "Si quieres, puedes conservar una sardina para el paquete de peces de mar.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Compra cebo hasta que te queden solo 75g.",
              c: [
                {
                  t: "Si ya encontraste mena de cobre en el cofre de pesca, puedes gastar todo tu dinero en cebo.",
                  k: "tip",
                },
                {
                  t: "La cantidad de cebo que puedes comprar aquí varía (500-700) según tu partida, pero compres lo que compres, lo usarás todo antes de que acabe la primavera.",
                  k: "tip",
                },
                {
                  t: "Técnicamente podrías retrasar la venta de algo de pescado hasta conseguir la profesión Pescador. Pero hay tres problemas. Primero, solo merece la pena si ganas más de aproximadamente una hora de pesca en el lago de la montaña. Segundo, la cantidad de pescado que puedes llevar al desmayarte al final del día 3 de primavera es limitada. Tercero, la siguiente ocasión cómoda para comprar cebo es tras dejar el pico el día 5 de primavera, un día con casi nada de tiempo libre. Así que vender ahora es más sencillo en conjunto y mucho menos arriesgado.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Vacía el contenido del cofre y recoge el cofre.",
              c: [
                {
                  t: "Para hacerlo sin coste de energía, selecciona una ranura vacía de la barra de herramientas y haz clic izquierdo repetidamente.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Si conservaste 75g, ve a Clint y compra mena de cobre (75g) para activar la escena de Clint mañana.",
              c: [{ t: "No hace falta que la dejes en el suelo.", k: "tip" }],
            },
            "Ve al río del Bosque Tizón.",
          ],
        },
        {
          t: "El mejor sitio de pesca en el río del Bosque Tizón está 6 casillas al oeste de la puerta de Leah, lanzando al sur. Coloca el cofre una casilla al noreste de ti.",
          c: [
            {
              t: "Apunta al agua profunda al este de la pequeña isla (mira la imagen de 'zona de pesca de río' del wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pesca hasta las 2:00. Antes de desmayarte, llena tu inventario con la caña + gemas + mena + carbón + el pescado más valioso.",
          c: [
            {
              t: "No volverás a este cofre hasta el día 7 de primavera (o un día de lluvia anterior).",
              k: "tip",
            },
          ],
        },
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Pesca 4 → 6 (elige la profesión Pescador)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Revisa el tiempo de mañana en la televisión cada día y planifica en consecuencia.",
          c: [
            {
              t: "Por ejemplo, si estás pescando en el lago de la montaña y mañana no lloverá, puedes dejar la caña en el cofre.",
              k: "tip",
            },
          ],
        },
        "Riega tus cultivos.",
        {
          t: "Si tienes menos de 150 de madera, tala hasta 150.",
          c: [
            { t: "Lleva la guadaña al talar para cortar también la hierba.", k: "tip" },
            {
              t: "Necesitarás 2 cofres y un espantapájaros en los próximos dos días.",
              k: "reason",
            },
          ],
        },
        "Fabrica un cofre y llévalo contigo.",
        "Vacía tu inventario. Coge la caña de fibra de vidrio + el cofre fabricado.",
        {
          t: "Ve al lago de la montaña. El mejor sitio es junto a la valla larga en la parte inferior de la pantalla, lanzando al este. Coloca el cofre tres casillas detrás de ti.",
          c: [
            {
              t: "Apunta al agua profunda cerca del tronco sumergido (mira la imagen de 'zona de pesca de lago' del wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pesca hasta la 1:00. Llena tu inventario con gemas, mena, carbón y el pescado más valioso.",
          c: [
            {
              t: "A menos que mañana llueva, puedes dejar la caña de fibra de vidrio en el cofre.",
              k: "tip",
            },
          ],
        },
        "Vuelve a casa.",
        {
          t: "Envía todo lo vendible (gemas, pescado, etc.).",
          c: [
            { t: "Conserva barbos para comer.", k: "tip" },
            {
              t: "Conserva uno de cada pez usado en los paquetes del Centro Cívico.",
              k: "tip",
            },
            {
              t: "Conserva jade, esmeralda, rubí y diamante para la Caverna Calavera más adelante.",
              k: "tip",
            },
          ],
        },
        "Serán las 2:00 justo después de vender. Si no, corta hierba y desmáyate.",
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Pesca 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Revisa la fortuna del día en la televisión cada día.",
        "Acepta o rechaza la mascota. (Mira 'Mecánicas de mascota'.)",
        "Cosecha las chirivías y anota cuántas cosechaste.",
        {
          t: "Anota qué semillas variadas plantaste.",
          c: [
            {
              t: "Puedes saberlo por el aspecto de la semilla o con un mod.",
              k: "tip",
            },
          ],
        },
        "Reclama la recompensa de la misión de la chirivía (100g).",
        "No riegues las semillas variadas restantes hasta más tarde hoy.",
        "Fabrica un cofre y llévalo contigo.",
        "Si tienes mena de hierro o mena de oro, anota cuánta. (Vienen al azar del cofre de pesca.)",
        {
          t: "Del cofre, coge todo excepto el pico + gemas + piedra + carbón + cobre + 3 chirivías.",
          c: [
            {
              t: "Conserva jade, esmeralda, rubí y diamante para la Caverna Calavera.",
              k: "tip",
            },
            {
              t: "Necesitas chirivías: 1 para un paquete, 1 para enviar (opcional), 1 para Pam (opcional).",
              k: "reason",
            },
            { t: "Puedes conservar un carbón para el espantapájaros de mañana.", k: "tip" },
          ],
        },
        "Ve a las Minas.",
        "Coloca el cofre a la izquierda del ascensor.",
        "Baja al nivel 10. (Mira 'Estrategia general de minas'.)",
        {
          t: "En cuanto tengas 25 de mena de cobre y 25 de piedra, vuelve al nivel 0, fabrica un horno y funde lingotes de cobre.",
          c: [
            {
              t: "No esperes al siguiente ascensor a menos que esté muy cerca.",
              k: "tip",
            },
          ],
        },
        "Mantén el horno funcionando hasta tener 5 lingotes. Debes terminar los 5 como muy tarde a las 15:00.",
        {
          t: "Una vez llegues al nivel 10, mina mena de cobre repitiendo el nivel 11 mientras se funden los lingotes restantes.",
          c: [
            {
              t: "Probablemente no puedas llegar al nivel 15 antes de las 15:00.",
              k: "reason",
            },
          ],
        },
        {
          t: "En cuanto los 5 lingotes estén listos:",
          c: [
            {
              t: "Deja la espada + las chirivías en el cofre.",
              c: [
                {
                  t: "No volverás a este cofre hasta el día 11 de primavera.",
                  k: "tip",
                },
              ],
            },
            "Coge el horno + gemas + cosas varias. Mantén 4 ranuras de inventario libres.",
            "Si no dejaste carbón en la granja, coge uno para el espantapájaros de mañana.",
            "Ve a la Herrería.",
          ],
        },
        {
          t: "Si vas demasiado tarde para fundir el 5.º lingote, puedes llegar a la Herrería para las 16:00, colocar un horno dentro, fundir el 5.º lingote y esperar 30 minutos. Mientras estés en el edificio, Clint vende hasta las 19:10.",
          k: "tip",
          c: [
            {
              t: "Sin embargo, esto se trata como un fallo, así que para evitar hacer trampa, compra lo que necesites antes de que Clint deje el mostrador.",
              k: "warn",
            },
          ],
        },
        {
          t: "Si no logras hacer los lingotes a tiempo o llegar a la Herrería antes de que cierre, dedica el resto del tiempo a pescar. La ruta se retrasa entonces un día.",
          c: [
            {
              t: "No es un error tan grande como parece, ya que de todas formas pescarás mucho para conseguir fondos extra.",
              k: "reason",
            },
          ],
        },
        "Las Minas dan geodas, geodas de hielo y geodas de magma. Según las cuentas, pagar a Clint 25g por abrirlas vale más de media, pero el coste de oportunidad de caminar hasta la Herrería a mediodía supera con creces esa ganancia. Así que envía todas las geodas por dinero extra. (Preocúpate por minerales/Museo al final de la partida.)",
        {
          t: "En la Herrería:",
          c: [
            "Vende tus gemas.",
            {
              t: "Conserva al menos 3,310g, y con el resto:",
              c: [
                "Compra hasta 25 de mena de hierro (incluida la mena de la pesca) (25 × 150g = 3,750g).",
                "Compra hasta 25 de mena de oro (incluida la mena de la pesca) (25 × 400g = 10,000g). (A estas alturas casi no tendrás dinero para mena de oro, y no pasa nada.)",
              ],
            },
          ],
        },
        {
          t: "Para qué son los 3,310g:",
          c: [
            "2,000g para la mejora del pico.",
            {
              t: "1,120g para 16 semillas de col rizada para Agricultura nivel 2 (380 de experiencia en total). (Puedes comprar menos col rizada si tienes en cuenta la experiencia de las semillas variadas y el brote de arroz.)",
              c: [
                "8 de experiencia por chirivía × 15 = 120 de experiencia",
                "380 de experiencia − 120 de experiencia = 260 de experiencia",
                "260 de experiencia / 17 de experiencia por col rizada = 16 de col rizada",
                "16 semillas de col rizada × 70g = 1,120g",
              ],
            },
            "60g para 1 kit de judías.",
            "80g para 1 semillas de coliflor (no necesario si conseguiste una de una semilla variada).",
            "50g para 1 brote de patata (no necesario si conseguiste una de una semilla variada).",
          ],
        },
        "Mejora al pico de cobre (2,000g).",
        {
          t: "Ve a Pierre y compra:",
          c: [
            "1 kit de judías (60g)",
            "1 semillas de coliflor (80g) (no necesario si conseguiste una de una semilla variada)",
            "1 brote de patata (50g) (no necesario si conseguiste una de una semilla variada)",
            "16 semillas de col rizada (1,120g)",
            "Compra semillas de col rizada extra con el dinero que sobre.",
          ],
        },
        "Aunque no llegues a Pierre antes del cierre, la ruta no cambia de forma significativa. Simplemente compra y planta las semillas mañana.",
        "Vuelve a casa.",
        "Planta y riega.",
        "Coge la caña de fibra de vidrio + horno + mena de hierro + mena de oro + carbón + barbos.",
        "Ve al lago de la montaña.",
        "Coloca el horno junto al cofre. Funde 5 lingotes de hierro mientras pescas.",
        {
          t: "Pesca hasta las 2:00. Antes de desmayarte, llena tu inventario con los objetos más valiosos.",
          c: [
            {
              t: "Deja la mena de hierro + mena de oro restante en el cofre del lago de la montaña.",
              c: [
                { t: "Coge el horno si mañana llueve.", k: "tip" },
              ],
            },
            "Anota cuánta mena de oro tienes.",
          ],
        },
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Agricultura 0 → 1", "Minería 0 → 1", "Pesca 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Riega tus cultivos.",
          c: [
            {
              t: "Si los cuervos se comieron tus cultivos del paquete de primavera, anótalo y vuelve a comprar semillas a Pierre cuando te venga bien.",
              k: "tip",
            },
          ],
        },
        "Fabrica y coloca un espantapájaros.",
        "Tala árboles hasta las 7:40.",
        "Vacía tu inventario y coge la caña de fibra de vidrio.",
        {
          t: "Entra al pueblo desde la parada de autobús. Se activa la escena del Centro Cívico. No la saltes.",
          k: "warn",
          c: [
            {
              t: "Si la saltas, apareces en la entrada del pueblo; si la ves, apareces junto al Centro Cívico.",
              k: "reason",
            },
          ],
        },
        "Entra al Centro Cívico y toca el pedestal del Pergamino dorado (inicia la misión).",
        "Ve al lago de la montaña y pesca hasta la 1:00. Llena tu inventario con 5 lingotes de hierro + lo más valioso y vendible.",
        "Vuelve a casa.",
        {
          t: "De lo vendible, envía lo suficiente para la mejora del pico de acero (5,000g) y envía también suficiente oro para comprar hasta 25 de mena de oro.",
          c: [
            { t: "Si vas justo, vende barbos. (Vende primero los de baja calidad.)", k: "tip" },
          ],
        },
        "Serán las 2:00 justo después de vender. Si no, corta hierba y desmáyate.",
      ],
    },
    7: {
      items: [
        "Revisa La reina de la salsa para la receta de Sofrito.",
        "Revisa tu correo hasta recibir la carta del Mago.",
        "Riega tus cultivos.",
        "Vacía tu inventario. Coge los 5 lingotes de hierro.",
        {
          t: "Ve a Rasmodius (activa una escena).",
          c: [
            {
              t: "Ver la escena no cuenta como conocer al Mago. Debes hablar con él después de la escena para que su nombre aparezca en la pestaña Social. Pero es puramente estético y sin beneficio real, así que considéralo una pérdida de tiempo.",
              k: "tip",
            },
          ],
        },
        "Vacía el contenido del cofre del río del Bosque Tizón (opcional).",
        {
          t: "Ve a la Herrería:",
          c: [
            "Compra hasta 25 de mena de oro (incluida la mena de la pesca).",
            "Mejora al pico de acero (5,000g).",
          ],
        },
        "Pesca en el lago de la montaña hasta las 2:00 y luego desmáyate. Funde lingotes de oro mientras pescas. Funde 2-3, y habrá uno más en el horno cuando te desmayes.",
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Pesca 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Si aparece la escena de la cueva, elige champiñones. (Mira 'Notas varias'.)",
        "Riega tus cultivos.",
        {
          t: "De lo vendible, envía lo suficiente para llegar a 12,000g.",
          c: [
            {
              t: "Es para la mejora del pico de oro (10,000g) + la mejora de la mochila (2,000g).",
              k: "reason",
            },
            {
              t: "Si vas justo, vuelve a casa antes de que acabe el día y envía el pescado que capturaste ese día para cubrir la diferencia.",
              k: "tip",
            },
          ],
        },
        "Pesca en el lago de la montaña hasta las 2:00 y luego desmáyate. Funde lingotes de oro mientras pescas hasta tener 5 en total. Deberías llevar estos lingotes contigo cuando te desmayes.",
        {
          t: "Este es el primer día desde el inicio en que no subes ninguna habilidad, así que no te excedas.",
          c: [
            {
              t: "Deberías despertar al 50% de energía, no al 0%.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Riega tus cultivos.",
        "Tala árboles hasta alrededor de las 8:00.",
        "Vacía tu inventario. Coge la caña de fibra de vidrio.",
        "Ve a la Herrería y mejora al pico de oro (10,000g).",
        "Ve a Pierre y mejora tu mochila (2,000g).",
        "Pesca en el lago de la montaña hasta las 2:00 y luego desmáyate.",
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Pesca 9 → 10 (elige la profesión Pesquero)"],
        },
        "Aunque hoy no llegues a Pesca 10, lo conseguirás el siguiente día de pesca. La ruta no cambia de forma significativa.",
      ],
    },
    10: {
      items: [
        "Riega tus cultivos.",
        "Coge champiñones de la cueva.",
        {
          t: "Calcula la col rizada extra necesaria para Agricultura nivel 6.",
          c: [
            "8 de experiencia por chirivía × 15 = 120 de experiencia",
            "17 de experiencia por col rizada × 16 = 272 de experiencia",
            "3,300 de experiencia en total − 120 − 272 = 2,908 de experiencia necesaria",
            "2,908 de experiencia / 17 = 172 de col rizada",
            "172 semillas de col rizada × 70g = 12,040g",
          ],
        },
        {
          t: "Si tienes Pesca nivel 10, envía suficiente pescado para comprar la mitad de las semillas de col rizada que necesitas (6,020g).",
          c: [
            {
              t: "Dos tandas es lo óptimo para no fabricar más aspersores de los necesarios. Así aseguras tantos lingotes de hierro como sea posible para los aspersores de calidad el día 28 de primavera.",
              k: "reason",
            },
          ],
        },
        {
          t: "Si no tienes Pesca nivel 10, no envíes pescado ahora. Véndelo directamente a Willy mañana.",
          c: [{ t: "Perderías el 25% del oro.", k: "reason" }],
        },
        "Vacía tu inventario. Coge la caña de fibra de vidrio.",
        "Si la caña tiene menos de 100 de cebo, coge también algunos peces. Pesca unas horas en el lago de la montaña hasta las 9:00, luego vende pescado a Willy y compra más cebo.",
        "Pesca en el lago de la montaña hasta las 2:00 y luego desmáyate. No olvides coger el horno para las Minas de mañana.",
      ],
    },
    11: {
      items: [
        "Cosecha la col rizada. (Alcanzas Agricultura nivel 2.)",
        {
          t: "Empieza a cavar casillas en un patrón de aspersores.",
          c: [{ t: "No riegues ninguna casilla.", k: "warn" }],
        },
        "Sal de la granja sobre las 8:00.",
        "Si ayer no enviaste pescado, véndelo a Willy.",
        "Ve a la Herrería y coge el pico de oro.",
        "Ve a Pierre y compra toda la semilla de col rizada que calculaste (6,020g).",
        {
          t: "Vuelve a la granja y termina de cavar + plantar.",
          c: [
            { t: "No riegues ninguna casilla.", k: "warn" },
            {
              t: "Opcionalmente fabrica camino de guijarros para marcar dónde irán los futuros aspersores.",
              k: "tip",
            },
            { t: "La col rizada no necesita riego hasta el día 14 de primavera.", k: "tip" },
          ],
        },
        "Ve a las Minas y coloca un horno. Sigue fundiendo lingotes.",
        {
          t: "Mina hasta las 2:00 y luego desmáyate.",
          c: [
            {
              t: "A medida que reúnas más cobre, fabrica 3 hornos más (4 en total).",
              k: "tip",
            },
          ],
        },
        {
          t: "Al final del día obtienes:",
          k: "result",
          c: ["Agricultura 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Coge champiñones de la cueva.",
        "Mina hasta las 2:00 y luego desmáyate. Funde cobre y hierro mientras minas.",
        "Cuando alcances Minería nivel 5, elige la profesión Minero.",
      ],
    },
    13: {
      items: [
        "Mina hasta las 2:00 y luego desmáyate.",
        {
          t: "No hay nada que necesites en el Festival del Huevo, así que ir es una pérdida de tiempo. La excepción es si vas a por el reto de enviar todos los objetos hasta el final del año 1, en cuyo caso necesitas una semilla de fresa o dos.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Revisa La reina de la salsa para la receta de Chucrut.",
        "Coge champiñones de la cueva.",
        "Llega a las Minas antes de las 0:00.",
        "Si te falta la mena restante para los aspersores, mina mena en el nivel 21/41 antes de seguir bajando.",
        {
          t: "Una vez llegues al fondo de las Minas, vuelve a minar mena.",
          c: [
            {
              t: "Según habilidad, suerte y si haces pausas de pesca en días de lluvia, puedes llegar al nivel 120 entre los días 14-18 de primavera.",
              k: "tip",
            },
            {
              t: "Una vez hayas fabricado todos los aspersores (normales), la mena de cobre solo se necesita para mejoras de herramientas. Los aspersores de calidad necesitan mucha mena de hierro y de oro.",
              k: "tip",
            },
          ],
        },
        {
          t: "A las 0:00, vuelve a casa y fabrica + coloca tantos aspersores como puedas.",
          c: [{ t: "No pasa nada si no cubren todos los cultivos.", k: "tip" }],
        },
        {
          t: "Envía objetos para llegar a 42,500g.",
          c: [
            {
              t: "Si vas justo, llega solo a 32,500g y sáltate el paquete de 10,000g de mañana. (En la mayoría de partidas seguramente irás justo.)",
              k: "tip",
            },
          ],
        },
        "Serán las 2:00 justo después de esto. Si no, corta hierba y desmáyate.",
      ],
    },
    15: {
      items: [
        {
          t: "Hoy empiezan a aparecer las frambuesas, pero no te desvíes mucho para cosecharlas.",
          c: [
            { t: "El tiempo no compensa la pequeña ganancia de energía.", k: "reason" },
            {
              t: "Usa la misma estrategia de pausa en los arbustos de frambuesa que en los cubos de basura.",
              k: "tip",
            },
          ],
        },
        "Riega los cultivos que aún no cubran los aspersores (si los hay).",
        "Vacía tu inventario. Coge los objetos para los paquetes de recolección de primavera (4), cultivos de primavera (4), herrería (3), geólogo (4) y aventurero (2).",
        {
          t: "Ve al Centro Cívico y completa los paquetes con estos objetos.",
          c: [
            {
              t: "Tras completar los dos paquetes de la Sala de calderas, no olvides salir del Pergamino dorado para no quedarte atascado en la escena defectuosa.",
              k: "warn",
            },
          ],
        },
        "Si tienes suficiente dinero (42,500g), completa también el paquete de la Caja fuerte.",
        "Vuelve a casa, coloca un cristalario y mete un diamante.",
        "Vacía tu inventario y ve a las Minas.",
        "Si te falta la mena restante para los aspersores, mina mena en el nivel 21/41 antes de seguir bajando.",
        "Mina hasta las 2:00 y luego desmáyate. Si aún necesitas más aspersores, no olvides conservar los lingotes fundidos en tu inventario.",
        "Al final del día se desbloquean las vagonetas.",
      ],
    },
    16: {
      items: [
        "Coge champiñones de la cueva.",
        "Riega los cultivos que aún no cubran los aspersores (si los hay).",
        "Fabrica más aspersores con los lingotes fundidos de ayer (si hace falta).",
        {
          t: "Mina hasta las 2:00.",
          c: [
            {
              t: "No olvides usar la vagoneta para viajar más rápido.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["Después del día 17 de primavera, la guía se vuelve menos específica."],
      items: [
        "Si aún no has llegado al nivel 120 de las Minas, termínalo lo antes posible.",
        {
          t: "Además, si necesitas más oro para terminar la Caja fuerte (42,500g), pesca en el lago de la montaña para completarla lo antes posible.",
          c: [
            {
              t: "Si te quedan ambas cosas, sincronízalas para que terminen el mismo día.",
              k: "tip",
              c: [
                {
                  t: "El autobús no se repara hasta el día siguiente.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Una vez llegues al nivel 120 de las Minas, traslada todos los hornos de las Minas a la granja.",
        "Haz la Caverna Calavera lo más rápido y a menudo posible. (Mira 'Estrategia general de la Caverna Calavera'.)",
        {
          t: "En tu tiempo libre:",
          c: [
            "Empieza a despejar escombros de la granja donde irán los aspersores de calidad + la carambola.",
            "Fabrica y coloca suelo donde irán los aspersores de calidad.",
            "Fabrica y coloca espantapájaros.",
            "Fabrica más hornos con el cobre de sobra.",
            "Empieza un bosque de robles plantando bellotas en una esquina de la granja.",
            "Mina más mena en las Minas (niveles 20/40/80).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Envía objetos para:",
          c: [
            "2,000g para la mejora del hacha de cobre.",
            "Suficiente oro para comprar la 2.ª tanda de semillas de col rizada (70g cada una).",
          ],
        },
      ],
    },
    19: {
      items: [
        "A las 9:00, ve a Clint y mejora al hacha de cobre (2,000g).",
        "Ve a Pierre y compra la 2.ª tanda de semillas de col rizada.",
      ],
    },
    20: {
      items: [
        "Cosecha la 1.ª col rizada y planta el 2.º cultivo.",
        "Envía objetos para llegar a 5,000g para la mejora del hacha de acero.",
      ],
    },
    21: {
      items: [
        "Revisa La reina de la salsa para la receta de Ensalada de rábanos.",
        "A las 9:00, ve a Clint, coge el hacha de cobre y mejora al hacha de acero (5,000g).",
        "Si vas a por el reto de enviar todos los objetos hasta el final del año 1, debes comprar y plantar hoy bulbo de tulipán (20g) y semillas de allium (30g) para que estén listas para el día 28 de primavera.",
      ],
    },
    22: {
      items: ["Envía objetos para llegar a 2,000g para la mejora de la azada de cobre."],
    },
    23: {
      items: [
        "A las 9:00, ve a Clint, coge el hacha de acero y mejora a la azada de cobre (2,000g).",
        {
          t: "Ahora que tienes el hacha de acero, cuando llegue un día de mala suerte, úsala para despejar espacio en la granja y preparar aspersores. Incluso en un día normal, hazlo como muy tarde el día 27.",
          c: [
            {
              t: "Sin embargo, debes alcanzar Minería nivel 10 antes de tomarte un descanso, ya que necesitas la profesión Herrero antes del día 25 de primavera.",
              k: "warn",
            },
            {
              t: "Recuerda colocar también espantapájaros y semillas de chirivía (cultivos de relleno).",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Envía todo lo que puedas.",
          c: [
            { t: "Reúne todo el oro posible para mañana.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Planifica cuántas semillas de carambola (400g cada una) plantar el día 2 de verano. Varía según la partida; ten en cuenta tus ingresos de la Caverna Calavera de ahora hasta el día 2 de verano. Necesitas unos dos días para despejar y preparar la granja. (Puede que ya hayas despejado un día en un día de mala suerte tras el día 23 de primavera.) Apunta a unas 400-500 semillas de carambola.",
        "A las 9:00, ve a Clint, coge la azada de cobre y mejora a la azada de acero (5,000g).",
        {
          t: "Ve al Oasis y compra un acelerador deluxe por cada semilla de carambola que vayas a comprar.",
          c: [
            {
              t: "El Oasis solo vende acelerador deluxe los jueves, y lo necesitas para el día 2 de verano.",
              k: "reason",
            },
            {
              t: "Hoy Pam está en la clínica para una revisión (así que no conduce el autobús), por lo que necesitas un Tótem de teletransporte: Desierto para llegar al desierto. En la mayoría de partidas usas un tótem de teletransporte cada día de todas formas, así que no es problema.",
              k: "tip",
            },
          ],
        },
        {
          t: "Gasta el dinero sobrante en semillas de carambola para poder desmayarte sin penalización.",
          c: [
            {
              t: "Compra el resto de semillas de carambola el día 2 de verano.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Nada en particular que hacer."],
    },
    27: {
      items: [
        "Cosecha la 2.ª col rizada. (Alcanzas Agricultura nivel 6.)",
        "A las 9:00, ve a Clint y coge la azada de acero.",
      ],
    },
    28: {
      items: [
        "Revisa La reina de la salsa para la receta de Tortilla.",
        {
          t: "Envía todo lo que puedas.",
          c: [
            { t: "Reúne todo el oro posible para mañana.", k: "reason" },
          ],
        },
        "Fabrica y coloca aspersores de calidad.",
        {
          t: "Si aún no lo has hecho, planta semillas de chirivía (cultivo de relleno).",
          c: [
            {
              t: "No uses acelerador deluxe en las semillas de chirivía, ya que no deben pasar al día 1 de verano.",
              k: "warn",
            },
          ],
        },
        "Si terminas sobre el mediodía, puedes pasar el resto del tiempo en la Caverna Calavera.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Nada en particular. Puedes explorar la Caverna Calavera, etc. No necesitas plantar semillas de carambola hasta mañana, así que no cortes las chirivías.",
          c: [
            {
              t: "La profesión Agricultor afecta a la 3.ª carambola.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Corta y planta todo el acelerador deluxe + la 1.ª tanda de semillas de carambola que compraste el día 25 de primavera.",
        "A las 9:00, ve al Oasis a comprar el resto de semillas de carambola, luego vuelve a casa y planta.",
        {
          t: "Esto ocupa la mayor parte del día. Si te queda tiempo:",
          c: [
            "Fabrica y coloca 10-20 pararrayos.",
            "Fabrica y coloca resineras en los robles repartidos por la granja que no talaste.",
            "Sigue plantando bellotas en una esquina de la granja para hacer crecer el bosque de robles.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Explora la Caverna Calavera.",
          c: [
            {
              t: "Necesitas 25,000g para la mejora del pico de iridio.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Funde lingotes de iridio. Si terminan tarde (sobre las 14:30), ve a Clint y mejora al pico de iridio.",
          c: [
            {
              t: "Si los lingotes de iridio por sí solos no dan suficiente dinero, puedes vender gemas directamente a Clint.",
              k: "tip",
            },
          ],
        },
        "Fabrica y coloca 10-20 pararrayos.",
        "Fabrica y coloca resineras en los robles repartidos por la granja que no talaste.",
        "Sigue plantando bellotas en una esquina de la granja para hacer crecer el bosque de robles.",
        "Necesitas tanta resina de roble como sea posible para los barriles. El fertilizante de árboles es muy útil para hacer crecer rápido el bosque de robles, pero fabricarlo requiere Recolección nivel 7. La mejor manera de subir Recolección sin apenas desperdiciar tiempo de juego (en lugar de talar árboles o caminar la larga distancia hasta el Bosque secreto) es fabricar y cosechar semillas veraniegas.",
        {
          t: "Así que en los días que no vas a la Caverna Calavera (como hoy):",
          c: [
            "Recorre el mapa en busca de recolectables de verano y fabrica al menos 10-20 semillas veraniegas. Cosecha, vuelve a fabricar y replanta tanto como puedas hasta Recolección nivel 7.",
            {
              t: "Tala los 5 tocones del Bosque secreto por experiencia de Recolección y madera noble.",
              c: [
                { t: "Necesitas 100 de madera noble para la Cuadra.", k: "reason" },
              ],
            },
            {
              t: "En cuanto tengas 100 de madera noble, compra la Cuadra a Robin para reducir los futuros viajes de ida y vuelta al Bosque secreto.",
              c: [
                {
                  t: "La segunda mejora de la casa necesita 150 de madera noble.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Después del día 5 de verano"],
      items: [
        "Explora más la Caverna Calavera. Reúne todo el dinero posible para la 2.ª tanda de semillas de carambola.",
      ],
    },
    9: {
      items: ["Envía lo suficiente para comprar la 2.ª tanda de semillas de carambola."],
    },
    10: {
      items: [
        {
          t: "Compra la 2.ª tanda de semillas de carambola.",
          c: [
            {
              t: "El Oasis cierra mañana por el Luau, así que compra hoy.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Cosecha y replanta.",
          c: [
            {
              t: "El acelerador deluxe permanece en la casilla, así que no necesitas volver a aplicarlo.",
              k: "reason",
            },
          ],
        },
        {
          t: "No vendas ninguna carambola —ni siquiera la de calidad oro—, mételo todo en barriles. Llegados a este punto, conecta tantos robles y construye tantos barriles como sea posible.",
          c: [
            { t: "Compra madera a Robin cuando se te acabe.", k: "tip" },
            {
              t: "No vendas vino hasta que cambies de Agricultor a Artesano mediante la Estatua de la incertidumbre.",
              k: "warn",
            },
          ],
        },
        "Al principio puedes llenar tu casa de barriles. Más tarde es cómodo comprar varios Cobertizos grandes y colocarlos cerca de la casa. O, una vez desbloquees la Cantera, cúbrela de suelo y úsala para almacenar barriles.",
        {
          t: "Al final del día alcanzas Agricultura nivel 10. Elige la profesión Agricultor.",
          c: [
            {
              t: "Por desgracia, el efecto de Agricultor no se aplica a los cultivos plantados hoy.",
              k: "tip",
            },
            {
              t: "Cambia a Artesano más tarde antes de vender vino de carambola.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Después del día 13 de verano"],
      items: [
        "El día 13 de verano siempre es de tormenta.",
        "El día 13 de verano o en algún momento después, compra y planta otros cultivos de verano necesarios para paquetes, misiones, regalos, etc.",
        "Los cultivos más largos son el melón y el arándano, que tardan 10 días con la profesión Agricultor. El acelerador deluxe lo reduce a 7 días. Así que puedes retrasar la plantación de cultivos de verano extra hasta el día 21 de verano como muy tarde.",
      ],
    },
    19: {
      items: ["Envía suficientes objetos para la 3.ª carambola."],
    },
    20: {
      items: [
        "Cosecha la carambola.",
        "A las 9:00, ve al Oasis y compra la 2.ª tanda de semillas de carambola.",
        {
          t: "Planta las semillas de carambola.",
          c: [
            {
              t: "El acelerador deluxe permanece en la casilla, así que no necesitas volver a aplicarlo.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Envía lo suficiente para comprar más acelerador deluxe.",
          c: [
            {
              t: "Cubrirás toda la granja con calabazas, así que necesitas acelerador extra además del que se arrastra de las casillas de carambola.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Compra más acelerador deluxe en el Oasis.",
        "En algún momento entre ahora y el día 28 de verano, cava y coloca todos los aspersores de calidad y el acelerador deluxe extra. Si no riegas la tierra el día 28 de verano, el trigo no estará listo el día 2 de otoño.",
      ],
    },
    26: {
      items: ["El día 26 de verano siempre es de tormenta."],
    },
    27: {
      items: [
        "Envía lo suficiente para comprar semillas de trigo (10g cada una) para cubrir mañana toda la granja.",
      ],
    },
    28: {
      items: [
        "Cosecha la carambola.",
        "A las 9:00, ve a Pierre y compra semillas de trigo para cubrir toda la granja.",
        {
          t: "Planta las semillas de trigo (cultivo de relleno: conserva el acelerador deluxe).",
          c: [
            {
              t: "La plantación del día 28 de verano solo funciona si tienes la profesión Agricultor. De lo contrario no puedes conseguir la 3.ª calabaza con esta estrategia.",
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
        "Nada en particular. Puedes explorar la Caverna Calavera, etc. Tienes que esperar a que el trigo termine de crecer.",
        "Para completar el Museo, es muy útil tener Recolección nivel 10 y la profesión Rastreador antes del día 1 de invierno (para detectar los puntos de artefactos más fácilmente). Si aún no tienes Recolección 10, es mejor plantar un gran bosque con las semillas de arce y las piñas de sobra y talarlo todo. (Es más eficiente que cosechar recolectables de otoño.)",
        "Envía lo suficiente para comprar semillas de calabaza (100g cada una) para cubrir la granja.",
      ],
    },
    2: {
      items: [
        {
          t: "Cosecha el trigo y replanta semillas de calabaza para cubrir toda la granja.",
          c: [
            {
              t: "Las calabazas son mejores que las grosellas porque no tendrás suficientes barriles para procesar todas las grosellas.",
              k: "reason",
            },
          ],
        },
        "Como con la carambola, repite cosechar + replantar para conseguir 3 cosechas de calabaza en otoño.",
      ],
    },
    9: {
      items: [
        "Ya puedes vender vino de carambola.",
        "Cambia de Agricultor a Artesano mediante la Estatua de la incertidumbre.",
        {
          t: "Compra más semillas para mañana.",
          c: [
            {
              t: "Pierre cierra los miércoles, así que compra hoy.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "La 1.ª calabaza está lista hoy.",
        {
          t: "Replanta.",
          c: [
            {
              t: "Como la carambola, la calabaza también se puede cosechar 3 veces en total.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Después del día 1 de invierno"],
      items: [
        {
          t: "Ahora es tu oportunidad de completar los paquetes restantes del Centro Cívico. Para desbloquear la Isla Jengibre y la granja de la isla, completa el Centro Cívico lo antes posible.",
          c: [
            {
              t: "Una vez llegues a la granja de la isla, puedes volver a plantar carambola a gran escala, que se convierte en tu principal fuente de ingresos.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Objetivos de hoy (resumen): un objetivo principal (encabezado plegable) con
// métodos/razones (c). Separado de items; condensa los objetivos clave de cada día.
// Se omiten los pasos triviales, pero se conservan los puntos importantes de bola de
// nieve (acumular materiales para el día siguiente, etc.).
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Ahorra dinero para comprar la caña de fibra de vidrio (1,800g) lo antes posible mañana.",
        c: [
          {
            t: "Conoce a todos en el pueblo.",
            c: [
              {
                t: "Completar la misión 'Presentaciones' desbloquea 'Cómo hacer amigos', que da 100g extra el día 2 de primavera.",
                k: "reason",
              },
            ],
          },
          "Dona un artefacto al Museo por la recompensa de 250g.",
          "Vende tus recolectables.",
        ],
      },
      {
        t: "Planta semillas.",
        c: [
          "Planta las semillas de chirivía.",
          "Corta malas hierbas en el pueblo para conseguir semillas variadas.",
        ],
      },
    ],
    2: [
      {
        t: "Compra la caña de fibra de vidrio (1,800g).",
        c: [
          "Compra la caña de entrenamiento (25g) y pesca.",
          "Dale la piedra a Willy por la recompensa de 'Cómo hacer amigos' (100g).",
        ],
      },
      "Compra cebo para el día siguiente.",
    ],
    3: [
      {
        t: "Consigue una mena de cobre.",
        c: [
          {
            t: "Para activar la escena de Clint mañana.",
            k: "reason",
          },
          {
            t: "Consíguela pescando.",
            c: [
              {
                t: "Si no consigues una, conserva 75g para comprar mena de cobre a Clint.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Captura tantos peces gato como puedas.",
        c: ["Vende todo el pescado + recolectables de playa de sobra en la tienda de Willy y compra cebo."],
      },
    ],
    4: [
      {
        t: "Consigue 150 de madera.",
        c: [
          {
            t: "Necesitarás 2 cofres y un espantapájaros en los próximos dos días.",
            k: "reason",
          },
        ],
      },
      "Pesca en el lago de la montaña.",
    ],
    5: [
      {
        t: "Mejora tu pico al pico de cobre (2,000g).",
        c: [
          {
            t: "Haz 5 lingotes de cobre en el nivel 10 de las Minas y deja el pico con Clint.",
            c: [
              {
                t: "Déjalo antes de que Clint cierre (termina los 5 lingotes como muy tarde a las 15:00).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Planta semillas y pesca en el lago de la montaña.",
        c: [
          "Compra y planta semillas de col rizada (para Agricultura 2) más semillas de judías, coliflor y patata.",
        ],
      },
      {
        t: "Abastécete para lo que viene.",
        c: [
          {
            t: "Conserva jade, esmeralda, rubí y diamante para la Caverna Calavera.",
            k: "tip",
          },
          { t: "Conserva un carbón para un espantapájaros.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Ahorra para la mejora del pico de acero (5,000g) y mena de oro.",
        c: ["Pesca en el lago de la montaña por lingotes de hierro + pescado vendible."],
      },
      {
        t: "Activa la escena del Centro Cívico y toca el Pergamino dorado (inicia la misión).",
        c: [
          { t: "Se activa al entrar al pueblo desde la parada de autobús.", k: "tip" },
        ],
      },
      "Fabrica y coloca un espantapájaros.",
    ],
    7: [
      {
        t: "Mejora tu pico al pico de acero (5,000g).",
        c: ["Compra mena de oro en la Herrería y luego mejora."],
      },
      "Conoce al Mago (activa una escena).",
      "Pesca en el lago de la montaña y funde lingotes de oro.",
    ],
    8: [
      {
        t: "Ahorra 12,000g para las mejoras del pico de oro (10,000g) y la mochila (2,000g).",
        c: ["Pesca en el lago de la montaña por objetos vendibles."],
      },
      {
        t: "Funde 5 lingotes de oro y duerme llevándolos contigo.",
        c: [
          {
            t: "Despierta al 50% de energía para evitar el agotamiento (primer día sin subida de habilidad).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Mejora al pico de oro (10,000g) y mejora tu mochila (2,000g).",
      "Pesca en el lago de la montaña (Pesca 10 → profesión Pesquero).",
    ],
    10: [
      {
        t: "Calcula las semillas de col rizada necesarias para Agricultura 6 y ahorra para la mitad.",
        c: [
          {
            t: "Planta col rizada en dos tandas para no fabricar más aspersores de los necesarios.",
            k: "tip",
          },
          {
            t: "Si no tienes Pesca 10, no envíes: vende a Willy directamente mañana.",
            k: "tip",
          },
        ],
      },
      {
        t: "Coge un horno para las Minas de mañana.",
        c: [{ t: "No lo olvides antes de desmayarte.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Cosecha col rizada (Agricultura 2) y compra + planta la 2.ª tanda de semillas de col rizada (6,020g).",
        c: [
          "Cava casillas en un patrón de aspersores (sin regar).",
          { t: "La col rizada no necesita riego hasta el día 14 de primavera.", k: "tip" },
        ],
      },
      "Mina y funde lingotes en las Minas.",
    ],
    12: [
      {
        t: "Mina y funde cobre y hierro.",
        c: ["Elige la profesión Minero en Minería nivel 5."],
      },
    ],
    13: [
      {
        t: "Sigue bajando y minando en las Minas.",
        c: [
          { t: "Sáltate el Festival del Huevo a menos que necesites algo (es una pérdida de tiempo).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Baja hacia el nivel 120 de las Minas, minando mena para aspersores.",
        c: ["Si vas justo, mina mena de hierro/oro en el nivel 21/41."],
      },
      {
        t: "Envía oro para el paquete de la Caja fuerte (42,500g).",
        c: [
          {
            t: "Si vas justo, llega solo a 32,500g y sáltate el paquete de 10,000g de mañana.",
            k: "tip",
          },
        ],
      },
      "Fabrica tantos aspersores como puedas en casa.",
    ],
    15: [
      {
        t: "Completa los paquetes del Centro Cívico.",
        c: [
          "Lleva y entrega los objetos para los paquetes de recolección de primavera, cultivos de primavera, herrería, geólogo y aventurero.",
          { t: "Si tienes suficiente dinero (42,500g), completa también el paquete de la Caja fuerte.", k: "tip" },
          {
            t: "Sal del Pergamino dorado para no quedarte atascado en la escena defectuosa.",
            k: "warn",
          },
        ],
      },
      "Coloca un cristalario y mete un diamante.",
      {
        t: "Mina hasta las 2:00.",
        c: [{ t: "Las vagonetas se desbloquean al final del día.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Mina y fabrica más aspersores.",
        c: [{ t: "Viaja más rápido con la vagoneta.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Termina el nivel 120 de las Minas y completa la Caja fuerte (42,500g).",
        c: [
          {
            t: "Si te quedan ambas cosas, sincronízalas para que terminen el mismo día (el autobús se repara al día siguiente).",
            k: "tip",
          },
        ],
      },
      "Explora la Caverna Calavera tan a menudo como puedas.",
      {
        t: "Prepara los próximos cultivos en tu tiempo libre.",
        c: [
          "Despeja escombros de la granja y coloca suelo donde irán los aspersores de calidad.",
          "Fabrica más espantapájaros y hornos, y planta bellotas para hacer crecer un bosque de robles.",
        ],
      },
    ],
    18: [
      "Envía oro para la mejora del hacha de cobre (2,000g) y la 2.ª tanda de semillas de col rizada.",
    ],
    19: [
      "Mejora tu hacha al hacha de cobre (2,000g).",
      "Compra la 2.ª tanda de semillas de col rizada a Pierre.",
    ],
    20: [
      "Cosecha la 1.ª col rizada y planta el 2.º cultivo.",
      "Envía oro para la mejora del hacha de acero (5,000g).",
    ],
    21: [
      "Mejora tu hacha al hacha de acero (5,000g).",
      {
        t: "(Opcional) Si vas a por el reto de enviar todos los objetos, planta bulbo de tulipán y semillas de allium.",
        c: [{ t: "Estarán listas para el día 28 de primavera.", k: "reason" }],
      },
    ],
    22: ["Envía oro para la mejora de la azada de cobre (2,000g)."],
    23: [
      "Mejora tu azada a la azada de cobre (2,000g).",
      {
        t: "En un día de mala suerte, despeja espacio en la granja y prepara aspersores (como muy tarde el día 27).",
        c: [
          {
            t: "Alcanza primero Minería nivel 10 antes de tomarte un descanso (profesión Herrero necesaria antes del día 25 de primavera).",
            k: "warn",
          },
          {
            t: "Coloca también espantapájaros y semillas de chirivía (relleno).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Reúne todo el oro posible para mañana.",
        c: ["Envía todo lo que puedas."],
      },
    ],
    25: [
      "Planifica cuántas semillas de carambola plantar el día 2 de verano (apunta a ~400-500).",
      "Mejora tu azada a la azada de acero (5,000g).",
      {
        t: "Compra acelerador deluxe en el Oasis (uno por semilla de carambola).",
        c: [{ t: "El Oasis solo lo vende los jueves.", k: "reason" }],
      },
    ],
    26: ["Nada en particular. Explora la Caverna Calavera, etc."],
    27: [
      "Cosecha la 2.ª col rizada (Agricultura 6).",
      "Coge la azada de acero de Clint.",
    ],
    28: [
      {
        t: "Fabrica aspersores de calidad y planta un cultivo de relleno (chirivías).",
        c: [
          {
            t: "No uses acelerador deluxe en las chirivías (no deben pasar al día 1 de verano).",
            k: "warn",
          },
        ],
      },
      "Envía todo el oro posible para mañana.",
    ],
  },
  summer: {
    1: [
      {
        t: "Nada en particular. Explora la Caverna Calavera, etc.",
        c: [
          {
            t: "No cortes las chirivías (la profesión Agricultor afecta a la 3.ª carambola).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Planta la 1.ª carambola con acelerador deluxe.",
        c: ["Compra el resto de semillas de carambola en el Oasis y plántalas."],
      },
      {
        t: "Abastécete en tu tiempo libre.",
        c: [
          "Fabrica 10-20 pararrayos.",
          "Coloca resineras en los robles y planta bellotas para hacer crecer el bosque de robles.",
        ],
      },
    ],
    3: [
      {
        t: "Explora la Caverna Calavera.",
        c: [
          {
            t: "Necesitas 25,000g para la mejora del pico de iridio.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Funde lingotes de iridio y mejora al pico de iridio.",
      {
        t: "Reúne resina de roble y madera noble mientras apuntas a Recolección nivel 7.",
        c: [
          "Fabrica y cosecha semillas veraniegas para ganar experiencia de Recolección.",
          "Tala los tocones del Bosque secreto por madera noble.",
          {
            t: "Compra la Cuadra con 100 de madera noble para reducir los futuros viajes de ida y vuelta.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Explora la Caverna Calavera, ahorrando para la 2.ª tanda de semillas de carambola."],
    9: ["Envía lo suficiente para comprar la 2.ª tanda de semillas de carambola."],
    10: [
      {
        t: "Compra la 2.ª tanda de semillas de carambola.",
        c: [{ t: "El Oasis cierra mañana por el Luau, así que compra hoy.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Repite cosechar/replantar y mete toda la carambola en barriles.",
        c: [
          "Conecta tantos robles y construye tantos barriles como sea posible.",
          {
            t: "No vendas vino hasta que cambies a Artesano.",
            k: "warn",
          },
        ],
      },
      "Al final del día alcanzas Agricultura 10 (profesión Agricultor).",
    ],
    13: [
      "Compra y planta otros cultivos de verano para paquetes/misiones (como muy tarde el día 21 de verano).",
    ],
    19: ["Envía lo suficiente para la 3.ª carambola."],
    20: ["Cosecha la carambola y replanta (compra la 2.ª tanda de semillas en el Oasis)."],
    24: [
      {
        t: "Envía lo suficiente para comprar más acelerador deluxe.",
        c: [
          {
            t: "Cubrirás toda la granja con calabazas, así que necesitas acelerador extra.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Coloca aspersores de calidad y acelerador deluxe extra.",
        c: [
          {
            t: "Riega el día 28 de verano para que el trigo esté listo el día 2 de otoño.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Nada en particular (siempre es un día de tormenta)."],
    27: ["Envía lo suficiente para comprar semillas de trigo para cubrir mañana toda la granja."],
    28: [
      "Cosecha la carambola.",
      {
        t: "Planta semillas de trigo por toda la granja (relleno).",
        c: [
          {
            t: "Solo válido con la profesión Agricultor (para la 3.ª calabaza).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Envía lo suficiente para comprar semillas de calabaza para cubrir la granja.",
      {
        t: "(Opcional) Prepara Recolección nivel 10 y la profesión Rastreador para el Museo.",
        c: [
          {
            t: "Plantar un bosque con semillas de arce y piñas y talarlo es eficiente.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Cosecha el trigo y planta semillas de calabaza por toda la granja.",
        c: [
          {
            t: "Las calabazas son mejores que las grosellas, ya que no tendrás suficientes barriles.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Cambia a Artesano para empezar a vender vino de carambola.",
        c: ["Cambia de Agricultor → Artesano mediante la Estatua de la incertidumbre."],
      },
      {
        t: "Compra semillas para mañana con antelación.",
        c: [{ t: "Pierre cierra los miércoles, así que compra hoy.", k: "reason" }],
      },
    ],
    10: ["Cosecha la 1.ª calabaza y replanta."],
  },
  winter: {
    1: [
      {
        t: "Completa los paquetes restantes del Centro Cívico.",
        c: [
          {
            t: "Desbloquear la Isla Jengibre y la granja de la isla te permite volver a plantar carambola a gran escala como tu principal ingreso.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
