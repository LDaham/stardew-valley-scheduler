// =============================================================================
// AVISO DE LICENÇA (GPL-3.0)
// O conteúdo do guia neste arquivo (MIN_MAX_GUIDE / DAILY_GOALS) é uma obra derivada
// de "Stardew Valley Min-Max Routing / Strategy" de BlackSight6 & Zamiel (GPL-3.0).
//   Fonte: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Licença: GNU GPL-3.0 — texto completo em LICENSES/GPL-3.0.txt.
// Modificações: condensado e reestruturado em uma árvore de dados por dia (GuideNode),
// com os nomes próprios usando os nomes oficiais do jogo em português.
// Portanto, este arquivo segue a GPL-3.0, não a licença MIT do projeto.
// (Mantido separado do material do wiki sob CC BY-NC-SA; distribuído como mera agregação.)
//
// Copyright (C) BlackSight6 & Zamiel (guia original)
// Adaptação (C) 2026 Lee Daham
// Este programa é software livre: você pode redistribuí-lo e/ou modificá-lo sob os
// termos da Licença Pública Geral GNU publicada pela Free Software Foundation, seja a
// versão 3 da Licença, ou (a seu critério) qualquer versão posterior. Este programa é
// distribuído SEM NENHUMA GARANTIA. Consulte a GNU GPL para mais detalhes:
// https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Pegue as sementes de chirívia.",
        {
          t: "Derrube imediatamente 9 árvores para alcançar Coleta nível 1.",
          c: [
            { t: "Você precisa de 8 árvores e 1/3.", k: "tip" },
            {
              t: "Você precisa do nível 1 antes de coletar para ter chance de cebolinhas de qualidade prata.",
              k: "reason",
            },
            {
              t: "Concentre-se apenas em cortar, começando na direção do caminho para a floresta.",
              k: "tip",
              c: [
                {
                  t: "Isso também limpa as ervas daninhas ao longo do caminho, facilitando seu deslocamento.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Corte apenas ácers e pinheiros, não os carvalhos em forma de ovo.",
              k: "warn",
              c: [
                {
                  t: "Os carvalhos só soltam bolotas a partir da primavera 2, e bolotas são preciosas.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Pelo mesmo motivo, não toque nas sementes no chão com o machado ou a enxada antes da primavera 2 (elas são destruídas).",
              k: "warn",
            },
            {
              t: "Não corte tocos; bata em cada árvore até ela cair (até 10 golpes) e passe para a próxima.",
              k: "tip",
              c: [{ t: "Isso dá mais madeira e experiência de Coleta.", k: "reason" }],
            },
            {
              t: "Quando uma árvore começar a cair, vá até onde a madeira vai cair e pause imediatamente.",
              k: "tip",
            },
            {
              t: "O tempo do jogo para, mas a animação de queda termina, e a madeira é coletada automaticamente durante a pausa.",
              k: "reason",
            },
            {
              t: "Use sempre essa estratégia ao cortar árvores (não tocos).",
              k: "tip",
            },
            {
              t: "Se você perder a conta das árvores, verifique a aba Habilidades pelo aumento de nível de Coleta.",
              k: "tip",
            },
            { t: "Também é útil para a pesca de amanhã.", k: "tip" },
          ],
        },
        "Ao chegar em Coleta 1, fabrique um baú e coloque-o ao lado da sua casa, depois esvazie o inventário, mantendo apenas a foice, o machado, a picareta e a enxada.",
        "Vá para a floresta ao sul. (São por volta das 9:20.)",
        {
          t: "Use uma captura de tela/zoom para verificar os coletáveis da Floresta Cinzaseiva e planejar sua rota.",
          c: [
            "Pegue todos os coletáveis ao passar.",
            {
              t: "Se não desperdiçar ganhos de energia, você pode comer cebolinhas enquanto as colhe para liberar espaço no inventário.",
              k: "tip",
            },
            {
              t: "Corte o máximo de ervas daninhas possível, mas não faça um grande desvio por uma só.",
              k: "tip",
            },
            { t: "Você precisa encontrar a Marnie até as 12:50.", k: "reason" },
          ],
        },
        {
          t: "Encontre a Jas enquanto ela vai da casa dela para o local da corda de pular.",
          time: "11:20",
        },
        {
          t: "Encontre a Haley a caminho do local das fotos no sudoeste. Se estiver adiantado, é um bom momento para cortar mais ervas daninhas.",
          time: "11:40",
        },
        "Vá para a cidade.",
        {
          t: "Verifique as duas lixeiras perto das casas de Jodi e Haley, e limpe as ervas daninhas entre elas se houver tempo.",
          c: [
            {
              t: "Pausar logo após verificar uma lixeira é o ideal.",
              k: "tip",
            },
            {
              t: "Evita desperdiçar tempo quando os itens saltam para o lado oposto.",
              k: "reason",
            },
            {
              t: "É parecido com a estratégia de pausa das árvores que caem.",
              k: "tip",
            },
            {
              t: "Verificar lixeiras desperdiça muito tempo, então a rota só faz isso nos dois primeiros dias.",
              k: "tip",
            },
          ],
        },
        {
          t: "Encontre a Marnie enquanto ela caminha do Armazém do Pierre até o rancho (ela passa pela casa da Emily).",
          time: "12:50",
        },
        "Vá para a praia.",
        {
          t: "Are os pontos de artefato para tentar seu primeiro artefato.",
          c: [
            "Deixe os coletáveis da praia no chão.",
            {
              t: "Você está sem espaço no inventário agora e pode pegá-los na primavera 2.",
              k: "reason",
            },
          ],
        },
        {
          t: "Encontre o Elliott perto da fogueira ao sul da cabana dele.",
          time: "12:00",
        },
        "Vá para a cidade.",
        "Se você conseguiu um artefato, doe-o ao Museu e receba a recompensa (250g).",
        "Verifique as lixeiras perto do Museu e do Ferreiro.",
        {
          t: "Encontre o Clint dentro do Ferreiro.",
          c: [{ t: "Saia em direção ao leste.", k: "tip" }],
        },
        "Verifique a lixeira perto do Mercado Joja.",
        {
          t: "Encontre Pam, Sam e Shane dentro do Mercado Joja.",
          c: [
            {
              t: "Sam e Shane contam como encontrados mesmo enquanto trabalham.",
              k: "reason",
            },
          ],
        },
        "Limpe as ervas daninhas atrás (ao norte) do Mercado Joja.",
        "Encontre a Abigail na ponte.",
        {
          t: "Se a Maru estiver caminhando para o sul e por perto, fale com ela agora; senão, encontre-a mais tarde quando estiver sentada no banco.",
          time: "15:20",
        },
        "Verifique a lixeira perto da casa do Lewis.",
        "Encontre Evelyn (jardim de flores), Caroline + Jodi (praça da cidade) e Vincent + Harvey (acima da casa da Jodi).",
        "Corte as ervas daninhas no lado oeste do mapa perto do Harvey.",
        {
          t: "Encontre Leah + Pierre dentro do Armazém do Pierre.",
          c: [
            {
              t: "Você precisa ir atrás do balcão para falar com o Pierre.",
              k: "tip",
            },
            {
              t: "Não compre do Pierre hoje, pois você comprará cultivos da primavera na primavera 5–6.",
              k: "tip",
            },
          ],
        },
        {
          t: "Encontre todos os outros perto do Saloon.",
          time: "~16:00",
          c: [
            {
              t: "Às 16:00 o Alex termina de se exercitar e sai do quarto. Verifique a lixeira perto da casa e entre para encontrar George e Alex.",
              c: [
                {
                  t: "Se estiver adiantado, talvez precise esperar o Alex sair do quarto.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Às 16:00 a Emily chega ao Saloon. Verifique a lixeira perto do Saloon e entre para encontrar Gus e Emily.",
              c: [{ t: "Para o Gus você precisa ir atrás do balcão.", k: "tip" }],
            },
            "Às 16:20 a Penny passa pela cerca do Lewis e o Alex sai de casa.",
            "Às 16:40 a Penny chega ao banco com a Maru. Se ainda não as encontrou, faça isso lá.",
            "Verifique seu registro de missões para confirmar que encontrou 24 de até 27 pessoas hoje.",
          ],
        },
        {
          t: "Volte para a fazenda.",
          c: [
            {
              t: "Deixe os coletáveis no chão no ponto de ônibus por enquanto.",
              k: "tip",
            },
          ],
        },
        "Esvazie o inventário. Mantenha suas ferramentas.",
        "Corte as ervas daninhas da fazenda até por volta das 18:00.",
        "Saia para o bosque dos fundos por volta das 18:10.",
        "Encontre o Linus do lado de fora da tenda dele.",
        {
          t: "Encontre o Demetrius ao sudeste da casa dele.",
          c: [
            {
              t: "Você já encontrou a Robin, então não precisa falar com ela.",
              k: "reason",
            },
          ],
        },
        {
          t: "Encontre o Sebastian quando ele sair de casa.",
          c: [
            {
              t: "Se você chegar antes das 19:00, terá que esperar ele sair do quarto às 18:40.",
              k: "tip",
            },
            {
              t: "É tempo perdido que você poderia ter usado cortando mais ervas daninhas na fazenda.",
              k: "reason",
            },
          ],
        },
        "Vá para o sul até o Centro Comunitário.",
        "Corte as ervas daninhas a oeste do Centro Comunitário.",
        "Corte as ervas daninhas a oeste da fonte.",
        {
          t: "Volte para casa.",
          c: [
            {
              t: "Pegue os coletáveis do ponto de ônibus que você deixou antes.",
              k: "tip",
            },
          ],
        },
        {
          t: "Are, plante e regue as sementes de chirívia + as sementes mistas.",
          c: [
            {
              t: "Plantar cultivos além das 15 sementes de chirívia iniciais significa que os corvos podem comer um ou mais por dia. Mas plantar as sementes mistas vale o valor extra. (A couve-flor e a batata das sementes mistas evitam que você as compre para o pacote de cultivos da primavera depois.)",
              k: "tip",
            },
          ],
        },
        "Corte árvores até restarem 4–6 de energia.",
        {
          t: "Corte ervas daninhas e grama até a 1:00–1:30, dependendo de quantas sementes mistas você tem.",
          c: [
            {
              t: "Você precisa arar, plantar e regar todas as sementes mistas antes das 2:00.",
              k: "warn",
            },
          ],
        },
        {
          t: "Volte para casa e envie tudo, exceto:",
          c: ["Pedra", "Madeira", "Carvão", "20 de fibra"],
        },
        {
          t: "Observação:",
          k: "tip",
          c: [
            {
              t: "Venda todos os coletáveis, exceto as cebolinhas. Preocupe-se com os pacotes do Centro Comunitário depois. Amanhã você precisa do máximo de dinheiro possível.",
              k: "tip",
            },
            {
              t: "Normalmente você come alho-poró, dente-de-leão e comida de lixeira (baixo GPE) em vez de vender, mas hoje o dinheiro é urgente, então é uma exceção.",
              k: "tip",
            },
          ],
        },
        {
          t: "Are, plante e regue as sementes mistas restantes.",
          c: [
            {
              t: "Mesmo que você force além de 0 de energia e desmaie, sobe de nível em Coleta na primavera 2, então nenhuma penalidade é transferida.",
              k: "tip",
            },
            {
              t: "Se uma das sementes mistas não for couve-flor (verifique com um mod ou o wiki), você terá que adiar a primeira entrega do pacote e o envio extra de ouro para o Cofre — previsto para a primavera 15 — até a primavera 17.",
              k: "warn",
            },
            {
              t: "A falta de vagonetes adiciona uma leve pressão de tempo para concluir as Minas, mas é muito raro e não muda a rota.",
              k: "tip",
            },
          ],
        },
        {
          t: "Esteja dentro de casa.",
          time: "pouco antes das 2:00",
          c: [{ t: "Para evitar a penalidade de ouro.", k: "reason" }],
        },
        {
          t: "Destrua a cama.",
          c: [
            {
              t: "Você aparece bem ao lado da porta toda manhã, economizando tempo.",
              k: "reason",
            },
            {
              t: "Ou remova-a de casa e guarde-a em um baú.",
              k: "tip",
            },
          ],
        },
        {
          t: "Mova a TV para o lado da porta.",
          c: [{ t: "Para verificá-la assim que acordar.", k: "reason" }],
        },
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Coleta 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Leia toda a sua correspondência.",
          c: [
            {
              t: "Você precisa ler a carta do Willy para obter a vara de bambu.",
              k: "reason",
            },
          ],
        },
        "Regue seus cultivos.",
        {
          t: "Fabrique um baú e leve-o com você.",
          c: [
            {
              t: "Na primavera 1 você pode ter conseguido apenas 0–3 cebolinhas (e nenhuma comida de lixeira) e não ter cortado 50 de madeira. Corte 50 agora e continue a rota. Só observe que tudo fica levemente atrasado.",
              k: "tip",
            },
          ],
        },
        "Esvazie todo o inventário no baú. Pegue a enxada + o baú fabricado + 1 pedra.",
        {
          t: "Verifique as lixeiras perto da casa do George, do Saloon e da casa do Lewis.",
          c: [
            {
              t: "Tudo bem se os aldeões te pegarem — a amizade de cada NPC ainda é 0.",
              k: "reason",
            },
            {
              t: "Esta é a última vez que você faz um desvio pelas lixeiras. Elas desperdiçam muito tempo, então depois só as verifique quando não custar tempo extra.",
              k: "tip",
            },
          ],
        },
        "Vá para a praia e receba a vara de bambu.",
        "Dê a pedra ao Willy e receba a recompensa da missão 'Como Ganhar Amigos' (100g).",
        "Coloque o baú no canto inferior direito do píer.",
        "Pesque do píer virado para o leste. Lance à distância máxima.",
        {
          t: "Às 8:40, destrua a vara de bambu e verifique o resto dos coletáveis da praia + os pontos de artefato.",
          c: [
            {
              t: "Se você conseguir um artefato agora e não conseguiu na primavera 1, doe-o imediatamente pela recompensa (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Vá à loja do Willy. Venda todos os coletáveis da praia + peixes. Compre a vara de treinamento (25g) do Willy.",
          c: [
            {
              t: "A vara de treinamento aumenta sua chance de captura perfeita. (Subir Pesca com capturas perfeitas importa mais do que peixe de alta qualidade.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Com a vara de treinamento, lance à distância mínima bem ao sul da porta do Willy. Junte peixes suficientes para chegar a 1,800g.",
          c: [
            {
              t: "Lances à distância mínima têm mais chance de peixes fáceis e encurtam as animações de lançar/recolher.",
              k: "reason",
            },
            { t: "Veja também a 'Estratégia Geral de Pesca'.", k: "tip" },
          ],
        },
        "Quando as algas marinhas (1.54 GPE) e a Joja-Cola (1.92 GPE) acabarem, coma a anchova (1.82 GPE) ou o arenque (1.82 GPE) de maior qualidade.",
        {
          t: "Assim que tiver peixes suficientes para 1,800g e alcançar Pesca nível 2, destrua a vara de treinamento, venda todos os peixes e compre a vara de fibra de vidro do Willy. Compre também o máximo de isca possível (5g cada) e equipe-a na vara nova.",
          c: [
            {
              t: "As capturas perfeitas caem, mas graças à isca a vara de fibra de vidro dá experiência mais rápido.",
              k: "reason",
            },
          ],
        },
        "Pesque do mesmo lugar com lances à distância máxima.",
        {
          t: "Às 16:30, se a vara tiver menos de 35 de isca, vá comprar mais do Willy.",
          c: [
            {
              t: "Você precisa de isca suficiente para o resto de hoje mais amanhã de manhã.",
              k: "reason",
            },
          ],
        },
        "Pesque até as 2:00. Coloque todos os peixes no baú antes de desmaiar. (Venda ao Willy amanhã.)",
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Pesca 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "A primavera 3 é sempre chuvosa.",
        "Esvazie todo o inventário no baú. Pegue a vara de fibra de vidro.",
        "Se você tem 80+ de isca e conseguiu minério de cobre do baú de pesca da primavera 2, fabrique um baú, leve-o com você e vá direto ao rio da Floresta Cinzaseiva pescar. Lembre-se de sair brevemente do guia para comprar mais isca do Willy antes de ir ao Lago das montanhas amanhã.",
        {
          t: "Caso contrário:",
          c: [
            "Pegue a enxada do baú.",
            "Pesque ao sul da casa da Leah até as 8:30 ou até ficar sem isca (o que vier primeiro).",
            "Verifique as lixeiras ao sul das casas de Jodi e Emily.",
            "Verifique coletáveis + pontos de artefato na praia.",
            {
              t: "Venda todos os peixes + coletáveis de praia extras na loja do Willy.",
              c: [
                {
                  t: "Se quiser, pode guardar uma sardinha para o pacote de peixes do mar.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Compre isca até restarem apenas 75g.",
              c: [
                {
                  t: "Se você já encontrou minério de cobre no baú de pesca, pode gastar todo o seu dinheiro em isca.",
                  k: "tip",
                },
                {
                  t: "A quantidade de isca que você pode comprar aqui varia (500–700) conforme sua jogatina, mas qualquer que seja, você usará tudo antes do fim da primavera.",
                  k: "tip",
                },
                {
                  t: "Tecnicamente você poderia adiar a venda de alguns peixes até obter a profissão Pescador. Mas há três problemas. Primeiro, só vale a pena se você ganhar mais do que cerca de uma hora de pesca no Lago das montanhas. Segundo, o número de peixes que você pode carregar ao desmaiar no fim da primavera 3 é limitado. Terceiro, a próxima ocasião conveniente para comprar isca é depois de deixar a picareta na primavera 5, um dia com quase nenhum tempo livre. Então vender agora é mais simples no geral e muito menos arriscado.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Esvazie o conteúdo do baú e pegue o baú.",
              c: [
                {
                  t: "Para fazer isso sem custo de energia, selecione um espaço vazio da barra de ferramentas e clique com o esquerdo repetidamente.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Se você guardou 75g, vá ao Clint e compre minério de cobre (75g) para acionar a cena do Clint amanhã.",
              c: [{ t: "Não precisa deixá-lo no chão.", k: "tip" }],
            },
            "Vá ao rio da Floresta Cinzaseiva.",
          ],
        },
        {
          t: "O melhor ponto de pesca no rio da Floresta Cinzaseiva fica 6 quadras a oeste da porta da Leah, lançando para o sul. Coloque o baú uma quadra a nordeste de você.",
          c: [
            {
              t: "Mire na água profunda a leste da pequena ilha (veja a imagem 'zona de pesca de rio' do wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pesque até as 2:00. Antes de desmaiar, encha o inventário com a vara + gemas + minério + carvão + os peixes mais valiosos.",
          c: [
            {
              t: "Você não voltará a este baú até a primavera 7 (ou um dia de chuva anterior).",
              k: "tip",
            },
          ],
        },
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Pesca 4 → 6 (escolha a profissão Pescador)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Verifique o clima de amanhã na TV todo dia e planeje de acordo.",
          c: [
            {
              t: "Por exemplo, se você está pescando no Lago das montanhas e não vai chover amanhã, pode deixar a vara no baú.",
              k: "tip",
            },
          ],
        },
        "Regue seus cultivos.",
        {
          t: "Se você tem menos de 150 de madeira, corte até 150.",
          c: [
            { t: "Leve a foice ao cortar para também limpar a grama.", k: "tip" },
            {
              t: "Você precisará de 2 baús e um espantalho nos próximos dois dias.",
              k: "reason",
            },
          ],
        },
        "Fabrique um baú e leve-o com você.",
        "Esvazie o inventário. Pegue a vara de fibra de vidro + o baú fabricado.",
        {
          t: "Vá ao Lago das montanhas. O melhor ponto é junto à cerca comprida na parte de baixo da tela, lançando para o leste. Coloque o baú três quadras atrás de você.",
          c: [
            {
              t: "Mire na água profunda perto do tronco submerso (veja a imagem 'zona de pesca de lago' do wiki).",
              k: "tip",
            },
          ],
        },
        {
          t: "Pesque até a 1:00. Encha o inventário com gemas, minério, carvão e os peixes mais valiosos.",
          c: [
            {
              t: "A menos que chova amanhã, você pode deixar a vara de fibra de vidro no baú.",
              k: "tip",
            },
          ],
        },
        "Volte para casa.",
        {
          t: "Envie tudo o que for vendável (gemas, peixes etc.).",
          c: [
            { t: "Guarde esquálios para comer.", k: "tip" },
            {
              t: "Guarde um de cada peixe usado nos pacotes do Centro Comunitário.",
              k: "tip",
            },
            {
              t: "Guarde jade, esmeralda, rubi e diamante para a Caverna da Caveira mais tarde.",
              k: "tip",
            },
          ],
        },
        "Serão 2:00 logo após a venda. Senão, corte grama e desmaie.",
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Pesca 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Verifique a sorte do dia na TV todo dia.",
        "Aceite ou recuse o animal de estimação. (Veja 'Mecânicas do Pet'.)",
        "Colha as chirívias e anote quantas você colheu.",
        {
          t: "Anote quais sementes mistas você plantou.",
          c: [
            {
              t: "Você pode saber pela aparência da semente ou com um mod.",
              k: "tip",
            },
          ],
        },
        "Receba a recompensa da missão da chirívia (100g).",
        "Não regue as sementes mistas restantes até mais tarde hoje.",
        "Fabrique um baú e leve-o com você.",
        "Se você tem minério de ferro ou minério de ouro, anote quanto. (Vêm aleatoriamente do baú de pesca.)",
        {
          t: "Do baú, pegue tudo, exceto a picareta + gemas + pedra + carvão + cobre + 3 chirívias.",
          c: [
            {
              t: "Guarde jade, esmeralda, rubi e diamante para a Caverna da Caveira.",
              k: "tip",
            },
            {
              t: "Você precisa de chirívias: 1 para um pacote, 1 para enviar (opcional), 1 para a Pam (opcional).",
              k: "reason",
            },
            { t: "Você pode guardar um carvão para o espantalho de amanhã.", k: "tip" },
          ],
        },
        "Vá às Minas.",
        "Coloque o baú à esquerda do elevador.",
        "Desça até o andar 10. (Veja 'Estratégia Geral das Minas'.)",
        {
          t: "Assim que tiver 25 de minério de cobre e 25 de pedra, volte ao andar 0, fabrique uma fornalha e funda barras de cobre.",
          c: [
            {
              t: "Não espere o próximo elevador a menos que esteja bem perto.",
              k: "tip",
            },
          ],
        },
        "Mantenha a fornalha funcionando até ter 5 barras. Você deve terminar as 5 no máximo até as 15:00.",
        {
          t: "Ao chegar ao andar 10, minere minério de cobre repetindo o andar 11 enquanto as barras restantes fundem.",
          c: [
            {
              t: "Você provavelmente não consegue chegar ao andar 15 antes das 15:00.",
              k: "reason",
            },
          ],
        },
        {
          t: "Assim que as 5 barras estiverem prontas:",
          c: [
            {
              t: "Deixe a espada + as chirívias no baú.",
              c: [
                {
                  t: "Você não voltará a este baú até a primavera 11.",
                  k: "tip",
                },
              ],
            },
            "Pegue a fornalha + gemas + miudezas. Mantenha 4 espaços do inventário livres.",
            "Se não deixou carvão na fazenda, pegue um para o espantalho de amanhã.",
            "Vá ao Ferreiro.",
          ],
        },
        {
          t: "Se você estiver atrasado demais para fundir a 5ª barra, pode chegar ao Ferreiro até as 16:00, colocar uma fornalha dentro, fundir a 5ª barra e esperar 30 minutos. Enquanto estiver no prédio, o Clint vende até as 19:10.",
          k: "tip",
          c: [
            {
              t: "No entanto, isso é tratado como um bug, então para evitar trapacear, compre o que precisa antes do Clint sair do balcão.",
              k: "warn",
            },
          ],
        },
        {
          t: "Se você não conseguir fazer as barras a tempo ou chegar ao Ferreiro antes de fechar, passe o resto do tempo pescando. A rota então atrasa um dia.",
          c: [
            {
              t: "Não é um erro tão grande quanto parece, já que você vai pescar muito de qualquer forma por fundos extras.",
              k: "reason",
            },
          ],
        },
        "As Minas dão geodos, geodos congelados e geodos de magma. Pela matemática, pagar 25g ao Clint para quebrá-los vale mais em média, mas o custo de oportunidade de ir ao Ferreiro no meio do dia supera de longe esse ganho. Então envie todos os geodos por dinheiro extra. (Preocupe-se com minerais/Museu no fim do jogo.)",
        {
          t: "No Ferreiro:",
          c: [
            "Venda suas gemas.",
            {
              t: "Guarde pelo menos 3,310g, e com o resto:",
              c: [
                "Compre até 25 de minério de ferro (incluindo o minério da pesca) (25 × 150g = 3,750g).",
                "Compre até 25 de minério de ouro (incluindo o minério da pesca) (25 × 400g = 10,000g). (A esta altura você quase não terá dinheiro para minério de ouro, e tudo bem.)",
              ],
            },
          ],
        },
        {
          t: "Para que serve os 3,310g:",
          c: [
            "2,000g para o aprimoramento da picareta.",
            {
              t: "1,120g para 16 sementes de couve para Cultivo nível 2 (380 de experiência no total). (Você pode comprar menos couve se considerar a experiência das sementes mistas e dos brotos de arroz.)",
              c: [
                "8 de experiência por chirívia × 15 = 120 de experiência",
                "380 de experiência − 120 de experiência = 260 de experiência",
                "260 de experiência / 17 de experiência por couve = 16 de couve",
                "16 sementes de couve × 70g = 1,120g",
              ],
            },
            "60g para 1 mudas de vagem.",
            "80g para 1 sementes de couve-flor (não necessário se você obteve uma de uma semente mista).",
            "50g para 1 sementes de batata (não necessário se você obteve uma de uma semente mista).",
          ],
        },
        "Aprimore para a picareta de cobre (2,000g).",
        {
          t: "Vá ao Pierre e compre:",
          c: [
            "1 mudas de vagem (60g)",
            "1 sementes de couve-flor (80g) (não necessário se você obteve uma de uma semente mista)",
            "1 sementes de batata (50g) (não necessário se você obteve uma de uma semente mista)",
            "16 sementes de couve (1,120g)",
            "Compre sementes de couve extras com o dinheiro que sobrar.",
          ],
        },
        "Mesmo que você não chegue ao Pierre antes de fechar, a rota não muda de forma significativa. Apenas compre e plante as sementes amanhã.",
        "Volte para casa.",
        "Plante e regue.",
        "Pegue a vara de fibra de vidro + fornalha + minério de ferro + minério de ouro + carvão + esquálios.",
        "Vá ao Lago das montanhas.",
        "Coloque a fornalha ao lado do baú. Funda 5 barras de ferro enquanto pesca.",
        {
          t: "Pesque até as 2:00. Antes de desmaiar, encha o inventário com os itens mais valiosos.",
          c: [
            {
              t: "Deixe o minério de ferro + minério de ouro restante no baú do Lago das montanhas.",
              c: [
                { t: "Pegue a fornalha se chover amanhã.", k: "tip" },
              ],
            },
            "Anote quanto minério de ouro você tem.",
          ],
        },
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Cultivo 0 → 1", "Mineração 0 → 1", "Pesca 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Regue seus cultivos.",
          c: [
            {
              t: "Se os corvos comeram seus cultivos do pacote da primavera, anote e recompre sementes do Pierre quando for conveniente.",
              k: "tip",
            },
          ],
        },
        "Fabrique e coloque um espantalho.",
        "Corte árvores até as 7:40.",
        "Esvazie o inventário e pegue a vara de fibra de vidro.",
        {
          t: "Entre na cidade pelo ponto de ônibus. A cena do Centro Comunitário é acionada. Não a pule.",
          k: "warn",
          c: [
            {
              t: "Se você a pular, é colocado na entrada da cidade; se assistir, é colocado ao lado do Centro Comunitário.",
              k: "reason",
            },
          ],
        },
        "Entre no Centro Comunitário e toque o pedestal do Pergaminho Dourado (inicia a missão).",
        "Vá ao Lago das montanhas e pesque até a 1:00. Encha o inventário com 5 barras de ferro + os itens vendáveis mais valiosos.",
        "Volte para casa.",
        {
          t: "Do que for vendável, envie o suficiente para o aprimoramento da picareta de aço (5,000g), e envie também ouro suficiente para comprar até 25 de minério de ouro.",
          c: [
            { t: "Se faltar, venda esquálios. (Venda os de baixa qualidade primeiro.)", k: "tip" },
          ],
        },
        "Serão 2:00 logo após a venda. Senão, corte grama e desmaie.",
      ],
    },
    7: {
      items: [
        "Verifique a Rainha do Molho pela receita do Refogado.",
        "Verifique sua correspondência até receber a carta do Feiticeiro.",
        "Regue seus cultivos.",
        "Esvazie o inventário. Pegue as 5 barras de ferro.",
        {
          t: "Vá ao Feiticeiro (aciona uma cena).",
          c: [
            {
              t: "Assistir à cena não conta como conhecer o Feiticeiro. Você precisa falar com ele depois da cena para o nome dele aparecer na aba Social. Mas é puramente estético, sem benefício real, então trate como perda de tempo.",
              k: "tip",
            },
          ],
        },
        "Esvazie o conteúdo do baú do rio da Floresta Cinzaseiva (opcional).",
        {
          t: "Vá ao Ferreiro:",
          c: [
            "Compre até 25 de minério de ouro (incluindo o minério da pesca).",
            "Aprimore para a picareta de aço (5,000g).",
          ],
        },
        "Pesque no Lago das montanhas até as 2:00, depois desmaie. Funda barras de ouro enquanto pesca. Funda 2–3, e mais uma estará na fornalha quando você desmaiar.",
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Pesca 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Se a cena da caverna aparecer, escolha os cogumelos. (Veja 'Notas Diversas'.)",
        "Regue seus cultivos.",
        {
          t: "Do que for vendável, envie o suficiente para chegar a 12,000g.",
          c: [
            {
              t: "É para o aprimoramento da picareta de ouro (10,000g) + o aprimoramento da mochila (2,000g).",
              k: "reason",
            },
            {
              t: "Se faltar, volte para casa antes do fim do dia e envie os peixes que pescou naquele dia para cobrir a diferença.",
              k: "tip",
            },
          ],
        },
        "Pesque no Lago das montanhas até as 2:00, depois desmaie. Funda barras de ouro enquanto pesca até ter 5 no total. Você deve estar segurando essas barras quando desmaiar.",
        {
          t: "Este é o primeiro dia desde o início em que você não sobe nenhuma habilidade, então não se esforce demais.",
          c: [
            {
              t: "Você deve acordar com 50% de energia, não 0%.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Regue seus cultivos.",
        "Corte árvores até cerca das 8:00.",
        "Esvazie o inventário. Pegue a vara de fibra de vidro.",
        "Vá ao Ferreiro e aprimore para a picareta de ouro (10,000g).",
        "Vá ao Pierre e aprimore sua mochila (2,000g).",
        "Pesque no Lago das montanhas até as 2:00, depois desmaie.",
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Pesca 9 → 10 (escolha a profissão Mestre Pescador)"],
        },
        "Mesmo que você não chegue à Pesca 10 hoje, conseguirá no próximo dia de pesca. A rota não muda de forma significativa.",
      ],
    },
    10: {
      items: [
        "Regue seus cultivos.",
        "Pegue cogumelos da caverna.",
        {
          t: "Calcule a couve extra necessária para Cultivo nível 6.",
          c: [
            "8 de experiência por chirívia × 15 = 120 de experiência",
            "17 de experiência por couve × 16 = 272 de experiência",
            "3,300 de experiência no total − 120 − 272 = 2,908 de experiência necessária",
            "2,908 de experiência / 17 = 172 de couve",
            "172 sementes de couve × 70g = 12,040g",
          ],
        },
        {
          t: "Se você está em Pesca nível 10, envie peixes suficientes para comprar metade das sementes de couve que precisa (6,020g).",
          c: [
            {
              t: "Dois lotes é o ideal para você não fabricar mais aspersores que o necessário. Assim você garante o máximo de barras de ferro possível para os aspersores de qualidade na primavera 28.",
              k: "reason",
            },
          ],
        },
        {
          t: "Se você não está em Pesca nível 10, não envie os peixes agora. Venda-os direto ao Willy amanhã.",
          c: [{ t: "Você perderia 25% do ouro.", k: "reason" }],
        },
        "Esvazie o inventário. Pegue a vara de fibra de vidro.",
        "Se a vara tiver menos de 100 de isca, pegue alguns peixes também. Pesque algumas horas no Lago das montanhas até as 9:00, depois venda peixes ao Willy e compre mais isca.",
        "Pesque no Lago das montanhas até as 2:00, depois desmaie. Não esqueça de pegar a fornalha para as Minas de amanhã.",
      ],
    },
    11: {
      items: [
        "Colha a couve. (Você alcança Cultivo nível 2.)",
        {
          t: "Comece a arar as quadras em um padrão de aspersores.",
          c: [{ t: "Não regue nenhuma quadra.", k: "warn" }],
        },
        "Saia da fazenda por volta das 8:00.",
        "Se você não enviou os peixes ontem, venda-os ao Willy.",
        "Vá ao Ferreiro e pegue a picareta de ouro.",
        "Vá ao Pierre e compre o tanto de sementes de couve que calculou (6,020g).",
        {
          t: "Volte para a fazenda e termine de arar + plantar.",
          c: [
            { t: "Não regue nenhuma quadra.", k: "warn" },
            {
              t: "Opcionalmente, fabrique caminho arredondado de pedra para marcar onde irão os futuros aspersores.",
              k: "tip",
            },
            { t: "A couve não precisa de rega até a primavera 14.", k: "tip" },
          ],
        },
        "Vá às Minas e coloque uma fornalha. Continue fundindo barras.",
        {
          t: "Minere até as 2:00, depois desmaie.",
          c: [
            {
              t: "À medida que junta mais cobre, fabrique mais 3 fornalhas (4 no total).",
              k: "tip",
            },
          ],
        },
        {
          t: "No fim do dia você ganha:",
          k: "result",
          c: ["Cultivo 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Pegue cogumelos da caverna.",
        "Minere até as 2:00, depois desmaie. Funda cobre e ferro enquanto minera.",
        "Quando alcançar Mineração nível 5, escolha a profissão Minerador.",
      ],
    },
    13: {
      items: [
        "Minere até as 2:00, depois desmaie.",
        {
          t: "Não há nada de que você precise no Festival do Ovo, então ir é perda de tempo. A exceção é se você está buscando o desafio de enviar todos os itens até o fim do ano 1, caso em que precisa de uma semente de morango ou duas.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Verifique a Rainha do Molho pela receita da Salada de Repolho.",
        "Pegue cogumelos da caverna.",
        "Chegue às Minas até as 0:00.",
        "Se faltar o minério restante para os aspersores, minere minério no andar 21/41 antes de descer mais.",
        {
          t: "Ao chegar ao fundo das Minas, volte a minerar minério.",
          c: [
            {
              t: "Dependendo da habilidade, da sorte e de você fazer pausas de pesca em dias de chuva, você pode chegar ao andar 120 entre a primavera 14–18.",
              k: "tip",
            },
            {
              t: "Depois de fabricar todos os aspersores (normais), o minério de cobre só é necessário para aprimoramentos de ferramentas. Os aspersores de qualidade precisam de muito minério de ferro e de ouro.",
              k: "tip",
            },
          ],
        },
        {
          t: "Às 0:00, volte para casa e fabrique + coloque o máximo de aspersores possível.",
          c: [{ t: "Tudo bem se eles não cobrirem todos os cultivos.", k: "tip" }],
        },
        {
          t: "Envie itens para chegar a 42,500g.",
          c: [
            {
              t: "Se faltar, vá apenas até 32,500g e pule o pacote de 10,000g de amanhã. (Na maioria das jogatinas você provavelmente ficará curto.)",
              k: "tip",
            },
          ],
        },
        "Serão 2:00 logo depois disso. Senão, corte grama e desmaie.",
      ],
    },
    15: {
      items: [
        {
          t: "As amoras-silvestres começam a aparecer hoje, mas não faça um grande desvio para colhê-las.",
          c: [
            { t: "O tempo não compensa o pequeno ganho de energia.", k: "reason" },
            {
              t: "Use a mesma estratégia de pausa nos arbustos de amora-silvestre que nas lixeiras.",
              k: "tip",
            },
          ],
        },
        "Regue os cultivos ainda não cobertos pelos aspersores (se houver).",
        "Esvazie o inventário. Pegue os itens para os pacotes de coleta da primavera (4), cultivos da primavera (4), ferreiro (3), geólogo (4) e aventureiro (2).",
        {
          t: "Vá ao Centro Comunitário e complete os pacotes com esses itens.",
          c: [
            {
              t: "Depois de completar os dois pacotes da Sala da Caldeira, não esqueça de sair do Pergaminho Dourado para não ficar preso na cena bugada.",
              k: "warn",
            },
          ],
        },
        "Se você tem dinheiro suficiente (42,500g), complete também o pacote do Cofre.",
        "Volte para casa, coloque um cristalário e ponha um diamante nele.",
        "Esvazie o inventário e vá às Minas.",
        "Se faltar o minério restante para os aspersores, minere minério no andar 21/41 antes de descer mais.",
        "Minere até as 2:00, depois desmaie. Se você ainda precisa de mais aspersores, não esqueça de manter as barras fundidas no inventário.",
        "No fim do dia, os vagonetes são desbloqueados.",
      ],
    },
    16: {
      items: [
        "Pegue cogumelos da caverna.",
        "Regue os cultivos ainda não cobertos pelos aspersores (se houver).",
        "Fabrique mais aspersores com as barras fundidas de ontem (se necessário).",
        {
          t: "Minere até as 2:00.",
          c: [
            {
              t: "Não esqueça de usar o vagonete para viajar mais rápido.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["Após a primavera 17 — o guia fica menos específico aqui."],
      items: [
        "Se você ainda não alcançou o andar 120 das Minas, termine o mais rápido possível.",
        {
          t: "Além disso, se você precisa de mais ouro para terminar o Cofre (42,500g), pesque no Lago das montanhas para completá-lo o mais rápido possível.",
          c: [
            {
              t: "Se ambos restarem, sincronize-os para terminarem no mesmo dia.",
              k: "tip",
              c: [
                {
                  t: "O ônibus só é consertado no dia seguinte.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Ao alcançar o andar 120 das Minas, mova todas as fornalhas das Minas para a fazenda.",
        "Faça a Caverna da Caveira o mais rápido e o mais frequente possível. (Veja 'Estratégia Geral da Caverna da Caveira'.)",
        {
          t: "No seu tempo livre:",
          c: [
            "Comece a limpar os entulhos da fazenda onde irão os aspersores de qualidade + a carambola.",
            "Fabrique e assente o piso onde irão os aspersores de qualidade.",
            "Fabrique e coloque espantalhos.",
            "Fabrique mais fornalhas com o cobre que sobrar.",
            "Inicie uma floresta de carvalhos plantando bolotas em um canto da fazenda.",
            "Minere mais minério nas Minas (andares 20/40/80).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Envie itens para:",
          c: [
            "2,000g para o aprimoramento do machado de cobre.",
            "Ouro suficiente para comprar o 2º lote de sementes de couve (70g cada).",
          ],
        },
      ],
    },
    19: {
      items: [
        "Às 9:00, vá ao Clint e aprimore para o machado de cobre (2,000g).",
        "Vá ao Pierre e compre o 2º lote de sementes de couve.",
      ],
    },
    20: {
      items: [
        "Colha a 1ª couve e plante o 2º cultivo.",
        "Envie itens para chegar a 5,000g para o aprimoramento do machado de aço.",
      ],
    },
    21: {
      items: [
        "Verifique a Rainha do Molho pela receita da Salada de Rabanete.",
        "Às 9:00, vá ao Clint, pegue o machado de cobre e aprimore para o machado de aço (5,000g).",
        "Se você está buscando o desafio de enviar todos os itens até o fim do ano 1, deve comprar e plantar hoje um bulbo de tulipa (20g) e sementes de jasmim-azul (30g) para estarem prontos até a primavera 28.",
      ],
    },
    22: {
      items: ["Envie itens para chegar a 2,000g para o aprimoramento da enxada de cobre."],
    },
    23: {
      items: [
        "Às 9:00, vá ao Clint, pegue o machado de aço e aprimore para a enxada de cobre (2,000g).",
        {
          t: "Agora que você tem o machado de aço, quando vier um dia de azar, use-o para limpar espaço na fazenda e preparar os aspersores. Mesmo em um dia sem azar, faça isso no máximo até o dia 27.",
          c: [
            {
              t: "No entanto, você deve alcançar Mineração nível 10 primeiro antes de fazer uma pausa, já que precisa da profissão Ferreiro antes da primavera 25.",
              k: "warn",
            },
            {
              t: "Lembre-se de colocar também espantalhos e sementes de chirívia (cultivos de preenchimento).",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Envie o máximo possível.",
          c: [
            { t: "Junte o máximo de ouro possível para amanhã.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Planeje quantas sementes de carambola (400g cada) plantar no verão 2. Varia conforme a jogatina; considere sua renda da Caverna da Caveira de agora até o verão 2. Você precisa de cerca de dois dias para limpar e preparar a fazenda. (Você pode já ter limpado um dia em um dia de azar após a primavera 23.) Mire em cerca de 400–500 sementes de carambola.",
        "Às 9:00, vá ao Clint, pegue a enxada de cobre e aprimore para a enxada de aço (5,000g).",
        {
          t: "Vá ao Oásis e compre um Solo Foliar Premium para cada semente de carambola que vai comprar.",
          c: [
            {
              t: "O Oásis só vende Solo Foliar Premium às quintas-feiras, e você precisa dele até o verão 2.",
              k: "reason",
            },
            {
              t: "Hoje a Pam está na clínica para um check-up (então não dirige o ônibus), então você precisa de um Totem de Teletransporte: Deserto para chegar ao deserto. Na maioria das jogatinas você usa um totem de teletransporte todo dia de qualquer forma, então não é problema.",
              k: "tip",
            },
          ],
        },
        {
          t: "Gaste o dinheiro restante em sementes de carambola para poder desmaiar sem penalidade.",
          c: [
            {
              t: "Compre o resto das sementes de carambola no verão 2.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Nada em particular para fazer."],
    },
    27: {
      items: [
        "Colha a 2ª couve. (Você alcança Cultivo nível 6.)",
        "Às 9:00, vá ao Clint e pegue a enxada de aço.",
      ],
    },
    28: {
      items: [
        "Verifique a Rainha do Molho pela receita do Omelete.",
        {
          t: "Envie o máximo possível.",
          c: [
            { t: "Junte o máximo de ouro possível para amanhã.", k: "reason" },
          ],
        },
        "Fabrique e coloque aspersores de qualidade.",
        {
          t: "Se ainda não fez, plante sementes de chirívia (cultivo de preenchimento).",
          c: [
            {
              t: "Não use Solo Foliar Premium nas sementes de chirívia, pois elas não devem passar para o verão 1.",
              k: "warn",
            },
          ],
        },
        "Se você terminar por volta do meio-dia, pode passar o resto do tempo na Caverna da Caveira.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Nada em particular. Você pode fazer a Caverna da Caveira etc. Não precisa plantar as sementes de carambola até amanhã, então não corte as chirívias.",
          c: [
            {
              t: "A profissão Agricultor afeta a 3ª carambola.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "Corte e plante todo o Solo Foliar Premium + o 1º lote de sementes de carambola que você comprou na primavera 25.",
        "Às 9:00, vá ao Oásis comprar o resto das sementes de carambola, depois volte para casa e plante.",
        {
          t: "Isso ocupa a maior parte do dia. Se você tiver tempo livre:",
          c: [
            "Fabrique e coloque 10–20 para-raios.",
            "Coloque torneirinhas nos carvalhos espalhados pela fazenda que você não cortou.",
            "Continue plantando bolotas em um canto da fazenda para cultivar a floresta de carvalhos.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Faça a Caverna da Caveira.",
          c: [
            {
              t: "Você precisa de 25,000g para o aprimoramento da picareta de irídio.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Funda barras de irídio. Se ficarem prontas tarde (por volta das 14:30), vá ao Clint e aprimore para a picareta de irídio.",
          c: [
            {
              t: "Se as barras de irídio sozinhas não derem dinheiro suficiente, você pode vender gemas direto ao Clint.",
              k: "tip",
            },
          ],
        },
        "Fabrique e coloque 10–20 para-raios.",
        "Coloque torneirinhas nos carvalhos espalhados pela fazenda que você não cortou.",
        "Continue plantando bolotas em um canto da fazenda para cultivar a floresta de carvalhos.",
        "Você precisa do máximo de resina de carvalho possível para os barris. O fertilizante de árvore é muito útil para cultivar a floresta de carvalhos rápido, mas fabricá-lo requer Coleta nível 7. A melhor forma de subir Coleta com quase nenhum tempo de jogo desperdiçado (em vez de cortar árvores ou caminhar a longa distância até o Bosque Secreto) é fabricar e colher sementes de verão.",
        {
          t: "Então, nos dias em que você não vai à Caverna da Caveira (como hoje):",
          c: [
            "Percorra o mapa em busca de coletáveis de verão e fabrique pelo menos 10–20 sementes de verão. Colha, refaça e replante o máximo possível até Coleta nível 7.",
            {
              t: "Corte os 5 tocos do Bosque Secreto por experiência de Coleta e madeira de lei.",
              c: [
                { t: "Você precisa de 100 de madeira de lei para o Estábulo.", k: "reason" },
              ],
            },
            {
              t: "Assim que tiver 100 de madeira de lei, compre o Estábulo da Robin para reduzir as futuras viagens ao Bosque Secreto.",
              c: [
                {
                  t: "O segundo aprimoramento da casa precisa de 150 de madeira de lei.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Após o verão 5"],
      items: [
        "Faça mais a Caverna da Caveira. Junte o máximo de dinheiro possível para o 2º lote de sementes de carambola.",
      ],
    },
    9: {
      items: ["Envie o suficiente para comprar o 2º lote de sementes de carambola."],
    },
    10: {
      items: [
        {
          t: "Compre o 2º lote de sementes de carambola.",
          c: [
            {
              t: "O Oásis fecha amanhã para o Luau, então compre hoje.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Colha e replante.",
          c: [
            {
              t: "O Solo Foliar Premium permanece na quadra, então você não precisa reaplicá-lo.",
              k: "reason",
            },
          ],
        },
        {
          t: "Não venda nenhuma carambola — nem de qualidade ouro —, coloque tudo nos barris. A esta altura, ligue torneirinhas no máximo de carvalhos e construa o máximo de barris possível.",
          c: [
            { t: "Compre madeira da Robin quando acabar.", k: "tip" },
            {
              t: "Não venda vinho até trocar de Agricultor para Artesão pela Estátua da Incerteza.",
              k: "warn",
            },
          ],
        },
        "No começo você pode encher sua casa de barris. Mais tarde é conveniente comprar vários Galpões Grandes e colocá-los perto da casa. Ou, depois de desbloquear a Pedreira, cubra-a com piso e use-a para armazenar barris.",
        {
          t: "No fim do dia você alcança Cultivo nível 10. Escolha a profissão Agricultor.",
          c: [
            {
              t: "Infelizmente, o efeito de Agricultor não se aplica aos cultivos plantados hoje.",
              k: "tip",
            },
            {
              t: "Troque para Artesão mais tarde antes de vender Vinho de Carambola.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Após o verão 13"],
      items: [
        "O verão 13 é sempre um dia de tempestade.",
        "No verão 13 ou em algum momento depois, compre e plante outros cultivos de verão necessários para pacotes, missões, presentes etc.",
        "Os cultivos mais longos são o melão e o mirtilo, que levam 10 dias com a profissão Agricultor. O Solo Foliar Premium reduz isso para 7 dias. Então você pode adiar o plantio de cultivos de verão extras até o verão 21, no máximo.",
      ],
    },
    19: {
      items: ["Envie itens suficientes para a 3ª carambola."],
    },
    20: {
      items: [
        "Colha a carambola.",
        "Às 9:00, vá ao Oásis e compre o 2º lote de sementes de carambola.",
        {
          t: "Plante as sementes de carambola.",
          c: [
            {
              t: "O Solo Foliar Premium permanece na quadra, então você não precisa reaplicá-lo.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Envie o suficiente para comprar mais Solo Foliar Premium.",
          c: [
            {
              t: "Você cobrirá toda a fazenda com abóboras, então precisa de Solo Foliar extra além do que é transferido das quadras de carambola.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Compre mais Solo Foliar Premium no Oásis.",
        "Em algum momento entre agora e o verão 28, are e coloque todos os aspersores de qualidade e o Solo Foliar Premium extra. Se você não regar o solo no verão 28, o trigo não estará pronto no outono 2.",
      ],
    },
    26: {
      items: ["O verão 26 é sempre um dia de tempestade."],
    },
    27: {
      items: [
        "Envie o suficiente para comprar sementes de trigo (10g cada) para cobrir toda a fazenda amanhã.",
      ],
    },
    28: {
      items: [
        "Colha a carambola.",
        "Às 9:00, vá ao Pierre e compre sementes de trigo para cobrir toda a fazenda.",
        {
          t: "Plante as sementes de trigo (cultivo de preenchimento — mantém o Solo Foliar Premium).",
          c: [
            {
              t: "O plantio do verão 28 só funciona se você tem a profissão Agricultor. Caso contrário, não consegue a 3ª abóbora com esta estratégia.",
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
        "Nada em particular. Você pode fazer a Caverna da Caveira etc. Você tem que esperar o trigo terminar de crescer.",
        "Para completar o Museu, é muito útil ter Coleta nível 10 e a profissão Rastreador antes do inverno 1 (para localizar os pontos de artefato mais facilmente). Se você ainda não está em Coleta 10, é melhor plantar uma grande floresta com as sementes de ácer e pinhas que sobraram e cortar tudo. (É mais eficiente do que colher os coletáveis do outono.)",
        "Envie o suficiente para comprar sementes de abóbora (100g cada) para cobrir a fazenda.",
      ],
    },
    2: {
      items: [
        {
          t: "Colha o trigo e replante sementes de abóbora para cobrir toda a fazenda.",
          c: [
            {
              t: "Abóboras são melhores que oxicocos porque você não terá barris suficientes para processar todos os oxicocos.",
              k: "reason",
            },
          ],
        },
        "Como na carambola, repita colher + replantar para conseguir 3 colheitas de abóbora no outono.",
      ],
    },
    9: {
      items: [
        "Agora você pode vender Vinho de Carambola.",
        "Troque de Agricultor para Artesão pela Estátua da Incerteza.",
        {
          t: "Compre mais sementes para amanhã.",
          c: [
            {
              t: "O Pierre fecha na quarta-feira, então compre hoje.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "A 1ª abóbora está pronta hoje.",
        {
          t: "Replante.",
          c: [
            {
              t: "Como a carambola, a abóbora também pode ser colhida 3 vezes no total.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Após o inverno 1"],
      items: [
        {
          t: "Agora é sua chance de completar os pacotes restantes do Centro Comunitário. Para desbloquear a Ilha Gengibre e a fazenda da ilha, complete o Centro Comunitário o mais rápido possível.",
          c: [
            {
              t: "Ao chegar à fazenda da ilha, você pode plantar carambola em massa de novo, o que se torna sua principal fonte de renda.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Metas de hoje (resumo): uma meta principal (cabeçalho recolhível) com métodos/motivos
// (c). Separado de items; condensa as metas-chave de cada dia. Etapas triviais são
// omitidas, mas itens importantes de bola de neve (estocar materiais para o dia seguinte
// etc.) são mantidos.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Junte dinheiro para comprar a vara de fibra de vidro (1,800g) o mais rápido possível amanhã.",
        c: [
          {
            t: "Encontre todos na cidade.",
            c: [
              {
                t: "Completar a missão 'Apresentações' desbloqueia 'Como Ganhar Amigos', que dá 100g extra na primavera 2.",
                k: "reason",
              },
            ],
          },
          "Doe um artefato ao Museu pela recompensa de 250g.",
          "Venda seus coletáveis.",
        ],
      },
      {
        t: "Plante sementes.",
        c: [
          "Plante as sementes de chirívia.",
          "Corte ervas daninhas na cidade para conseguir sementes mistas.",
        ],
      },
    ],
    2: [
      {
        t: "Compre a vara de fibra de vidro (1,800g).",
        c: [
          "Compre a vara de treinamento (25g) e pesque.",
          "Dê a pedra ao Willy pela recompensa de 'Como Ganhar Amigos' (100g).",
        ],
      },
      "Compre isca para o dia seguinte.",
    ],
    3: [
      {
        t: "Consiga um minério de cobre.",
        c: [
          {
            t: "Para acionar a cena do Clint amanhã.",
            k: "reason",
          },
          {
            t: "Consiga pescando.",
            c: [
              {
                t: "Se você não conseguir um, guarde 75g para comprar minério de cobre do Clint.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Pesque o máximo de bagres possível.",
        c: ["Venda todos os peixes + coletáveis de praia extras na loja do Willy e compre isca."],
      },
    ],
    4: [
      {
        t: "Consiga 150 de madeira.",
        c: [
          {
            t: "Você precisará de 2 baús e um espantalho nos próximos dois dias.",
            k: "reason",
          },
        ],
      },
      "Pesque no Lago das montanhas.",
    ],
    5: [
      {
        t: "Aprimore sua picareta para a picareta de cobre (2,000g).",
        c: [
          {
            t: "Faça 5 barras de cobre no andar 10 das Minas e deixe a picareta com o Clint.",
            c: [
              {
                t: "Deixe antes de o Clint fechar (termine as 5 barras no máximo até as 15:00).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Plante sementes e pesque no Lago das montanhas.",
        c: [
          "Compre e plante sementes de couve (para Cultivo 2) mais sementes de vagem, couve-flor e batata.",
        ],
      },
      {
        t: "Estoque para o que vem a seguir.",
        c: [
          {
            t: "Guarde jade, esmeralda, rubi e diamante para a Caverna da Caveira.",
            k: "tip",
          },
          { t: "Guarde um carvão para um espantalho.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Junte para o aprimoramento da picareta de aço (5,000g) e minério de ouro.",
        c: ["Pesque no Lago das montanhas por barras de ferro + peixes vendáveis."],
      },
      {
        t: "Acione a cena do Centro Comunitário e toque o Pergaminho Dourado (inicia a missão).",
        c: [
          { t: "É acionada quando você entra na cidade pelo ponto de ônibus.", k: "tip" },
        ],
      },
      "Fabrique e coloque um espantalho.",
    ],
    7: [
      {
        t: "Aprimore sua picareta para a picareta de aço (5,000g).",
        c: ["Compre minério de ouro no Ferreiro, depois aprimore."],
      },
      "Encontre o Feiticeiro (aciona uma cena).",
      "Pesque no Lago das montanhas e funda barras de ouro.",
    ],
    8: [
      {
        t: "Junte 12,000g para os aprimoramentos da picareta de ouro (10,000g) e da mochila (2,000g).",
        c: ["Pesque no Lago das montanhas por itens vendáveis."],
      },
      {
        t: "Funda 5 barras de ouro e durma segurando-as.",
        c: [
          {
            t: "Acorde com 50% de energia para evitar o esgotamento (primeiro dia sem subir de habilidade).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Aprimore para a picareta de ouro (10,000g) e aprimore sua mochila (2,000g).",
      "Pesque no Lago das montanhas (Pesca 10 → profissão Mestre Pescador).",
    ],
    10: [
      {
        t: "Calcule as sementes de couve necessárias para Cultivo 6 e junte para a metade.",
        c: [
          {
            t: "Plante a couve em dois lotes para não fabricar mais aspersores que o necessário.",
            k: "tip",
          },
          {
            t: "Se você não está em Pesca 10, não envie — venda ao Willy direto amanhã.",
            k: "tip",
          },
        ],
      },
      {
        t: "Pegue uma fornalha para as Minas de amanhã.",
        c: [{ t: "Não esqueça antes de desmaiar.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Colha a couve (Cultivo 2) e compre + plante o 2º lote de sementes de couve (6,020g).",
        c: [
          "Are as quadras em um padrão de aspersores (sem regar).",
          { t: "A couve não precisa de rega até a primavera 14.", k: "tip" },
        ],
      },
      "Minere e funda barras nas Minas.",
    ],
    12: [
      {
        t: "Minere e funda cobre e ferro.",
        c: ["Escolha a profissão Minerador em Mineração nível 5."],
      },
    ],
    13: [
      {
        t: "Continue descendo e minerando nas Minas.",
        c: [
          { t: "Pule o Festival do Ovo a menos que precise de algo (perda de tempo).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Desça em direção ao andar 120 das Minas, minerando minério para os aspersores.",
        c: ["Se faltar, minere minério de ferro/ouro no andar 21/41."],
      },
      {
        t: "Envie ouro para o pacote do Cofre (42,500g).",
        c: [
          {
            t: "Se faltar, vá apenas até 32,500g e pule o pacote de 10,000g de amanhã.",
            k: "tip",
          },
        ],
      },
      "Fabrique o máximo de aspersores possível em casa.",
    ],
    15: [
      {
        t: "Complete os pacotes do Centro Comunitário.",
        c: [
          "Leve e entregue os itens para os pacotes de coleta da primavera, cultivos da primavera, ferreiro, geólogo e aventureiro.",
          { t: "Se você tem dinheiro suficiente (42,500g), complete também o pacote do Cofre.", k: "tip" },
          {
            t: "Saia do Pergaminho Dourado para não ficar preso na cena bugada.",
            k: "warn",
          },
        ],
      },
      "Coloque um cristalário e ponha um diamante nele.",
      {
        t: "Minere até as 2:00.",
        c: [{ t: "Os vagonetes são desbloqueados no fim do dia.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Minere e fabrique mais aspersores.",
        c: [{ t: "Viaje mais rápido com o vagonete.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Termine o andar 120 das Minas e complete o Cofre (42,500g).",
        c: [
          {
            t: "Se ambos restarem, sincronize-os para terminarem no mesmo dia (o ônibus é consertado no dia seguinte).",
            k: "tip",
          },
        ],
      },
      "Faça a Caverna da Caveira o mais frequente possível.",
      {
        t: "Prepare os próximos cultivos no seu tempo livre.",
        c: [
          "Limpe os entulhos da fazenda e assente o piso onde irão os aspersores de qualidade.",
          "Fabrique mais espantalhos e fornalhas, e plante bolotas para cultivar uma floresta de carvalhos.",
        ],
      },
    ],
    18: [
      "Envie ouro para o aprimoramento do machado de cobre (2,000g) e o 2º lote de sementes de couve.",
    ],
    19: [
      "Aprimore seu machado para o machado de cobre (2,000g).",
      "Compre o 2º lote de sementes de couve do Pierre.",
    ],
    20: [
      "Colha a 1ª couve e plante o 2º cultivo.",
      "Envie ouro para o aprimoramento do machado de aço (5,000g).",
    ],
    21: [
      "Aprimore seu machado para o machado de aço (5,000g).",
      {
        t: "(Opcional) Se for buscar o desafio de enviar todos os itens, plante um bulbo de tulipa e sementes de jasmim-azul.",
        c: [{ t: "Estarão prontos até a primavera 28.", k: "reason" }],
      },
    ],
    22: ["Envie ouro para o aprimoramento da enxada de cobre (2,000g)."],
    23: [
      "Aprimore sua enxada para a enxada de cobre (2,000g).",
      {
        t: "Em um dia de azar, limpe espaço na fazenda e prepare os aspersores (no máximo até o dia 27).",
        c: [
          {
            t: "Alcance Mineração nível 10 primeiro antes de fazer uma pausa (profissão Ferreiro necessária antes da primavera 25).",
            k: "warn",
          },
          {
            t: "Coloque também espantalhos e sementes de chirívia (preenchimento).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Junte o máximo de ouro possível para amanhã.",
        c: ["Envie o máximo possível."],
      },
    ],
    25: [
      "Planeje quantas sementes de carambola plantar no verão 2 (mire em ~400–500).",
      "Aprimore sua enxada para a enxada de aço (5,000g).",
      {
        t: "Compre Solo Foliar Premium no Oásis (um por semente de carambola).",
        c: [{ t: "O Oásis só vende às quintas-feiras.", k: "reason" }],
      },
    ],
    26: ["Nada em particular. Faça a Caverna da Caveira etc."],
    27: [
      "Colha a 2ª couve (Cultivo 6).",
      "Pegue a enxada de aço com o Clint.",
    ],
    28: [
      {
        t: "Fabrique aspersores de qualidade e plante um cultivo de preenchimento (chirívias).",
        c: [
          {
            t: "Não use Solo Foliar Premium nas chirívias (elas não devem passar para o verão 1).",
            k: "warn",
          },
        ],
      },
      "Envie o máximo de ouro possível para amanhã.",
    ],
  },
  summer: {
    1: [
      {
        t: "Nada em particular. Faça a Caverna da Caveira etc.",
        c: [
          {
            t: "Não corte as chirívias (a profissão Agricultor afeta a 3ª carambola).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "Plante a 1ª carambola com Solo Foliar Premium.",
        c: ["Compre o resto das sementes de carambola no Oásis e plante-as."],
      },
      {
        t: "Estoque no seu tempo livre.",
        c: [
          "Fabrique 10–20 para-raios.",
          "Coloque torneirinhas nos carvalhos e plante bolotas para cultivar a floresta de carvalhos.",
        ],
      },
    ],
    3: [
      {
        t: "Faça a Caverna da Caveira.",
        c: [
          {
            t: "Você precisa de 25,000g para o aprimoramento da picareta de irídio.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "Funda barras de irídio e aprimore para a picareta de irídio.",
      {
        t: "Junte resina de carvalho e madeira de lei enquanto mira em Coleta nível 7.",
        c: [
          "Fabrique e colha sementes de verão para ganhar experiência de Coleta.",
          "Corte os tocos do Bosque Secreto por madeira de lei.",
          {
            t: "Compre o Estábulo com 100 de madeira de lei para reduzir as futuras viagens.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Faça a Caverna da Caveira, juntando para o 2º lote de sementes de carambola."],
    9: ["Envie o suficiente para comprar o 2º lote de sementes de carambola."],
    10: [
      {
        t: "Compre o 2º lote de sementes de carambola.",
        c: [{ t: "O Oásis fecha amanhã para o Luau, então compre hoje.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Repita colher/replantar e coloque toda a carambola nos barris.",
        c: [
          "Ligue torneirinhas no máximo de carvalhos e construa o máximo de barris possível.",
          {
            t: "Não venda vinho até trocar para Artesão.",
            k: "warn",
          },
        ],
      },
      "No fim do dia você alcança Cultivo 10 (profissão Agricultor).",
    ],
    13: [
      "Compre e plante outros cultivos de verão para pacotes/missões (no máximo até o verão 21).",
    ],
    19: ["Envie o suficiente para a 3ª carambola."],
    20: ["Colha a carambola e replante (compre o 2º lote de sementes no Oásis)."],
    24: [
      {
        t: "Envie o suficiente para comprar mais Solo Foliar Premium.",
        c: [
          {
            t: "Você cobrirá toda a fazenda com abóboras, então precisa de Solo Foliar extra.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Coloque aspersores de qualidade e Solo Foliar Premium extra.",
        c: [
          {
            t: "Regue no verão 28 para o trigo estar pronto no outono 2.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Nada em particular (sempre um dia de tempestade)."],
    27: ["Envie o suficiente para comprar sementes de trigo para cobrir toda a fazenda amanhã."],
    28: [
      "Colha a carambola.",
      {
        t: "Plante sementes de trigo por toda a fazenda (preenchimento).",
        c: [
          {
            t: "Válido apenas com a profissão Agricultor (para a 3ª abóbora).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Envie o suficiente para comprar sementes de abóbora para cobrir a fazenda.",
      {
        t: "(Opcional) Prepare Coleta nível 10 e a profissão Rastreador para o Museu.",
        c: [
          {
            t: "Plantar uma floresta com sementes de ácer e pinhas e cortá-la é eficiente.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Colha o trigo e plante sementes de abóbora por toda a fazenda.",
        c: [
          {
            t: "Abóboras são melhores que oxicocos, já que você não terá barris suficientes.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Troque para Artesão para começar a vender Vinho de Carambola.",
        c: ["Troque de Agricultor → Artesão pela Estátua da Incerteza."],
      },
      {
        t: "Compre sementes para amanhã com antecedência.",
        c: [{ t: "O Pierre fecha na quarta-feira, então compre hoje.", k: "reason" }],
      },
    ],
    10: ["Colha a 1ª abóbora e replante."],
  },
  winter: {
    1: [
      {
        t: "Complete os pacotes restantes do Centro Comunitário.",
        c: [
          {
            t: "Desbloquear a Ilha Gengibre e a fazenda da ilha permite plantar carambola em massa de novo como renda principal.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
