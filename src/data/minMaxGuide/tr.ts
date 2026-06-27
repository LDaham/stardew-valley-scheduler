// =============================================================================
// LİSANS BİLDİRİMİ (GPL-3.0)
// Bu dosyadaki kılavuz içeriği (MIN_MAX_GUIDE / DAILY_GOALS), BlackSight6 & Zamiel
// tarafından yazılan "Stardew Valley Min-Max Routing / Strategy" (GPL-3.0) eserinin
// türevidir.
//   Kaynak: https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md
//   Lisans: GNU GPL-3.0 — tam metin LICENSES/GPL-3.0.txt içinde.
// Değişiklikler: günlük bir veri ağacına (GuideNode) yoğunlaştırılıp yeniden yapılandırıldı,
// özel adlar oyun içi resmi Türkçe adlarla kullanıldı.
// Bu nedenle bu dosya, projenin MIT lisansına değil, GPL-3.0'a tabidir.
// (CC BY-NC-SA altındaki wiki materyalinden ayrı tutulmuştur; salt bir derleme olarak dağıtılır.)
//
// Copyright (C) BlackSight6 & Zamiel (özgün kılavuz)
// Uyarlama (C) 2026 Lee Daham
// Bu program özgür yazılımdır: Özgür Yazılım Vakfı tarafından yayımlanan GNU Genel Kamu
// Lisansı'nın 3. sürümü veya (tercihinize göre) sonraki herhangi bir sürümü koşulları
// altında yeniden dağıtabilir ve/veya değiştirebilirsiniz. Bu program HİÇBİR GARANTİ
// OLMADAN dağıtılır. Ayrıntılar için GNU GPL'ye bakın:
// https://www.gnu.org/licenses/gpl-3.0.html
// =============================================================================

import type { GuideData, GoalsData } from "./types";

export const MIN_MAX_GUIDE: GuideData = {
  spring: {
    1: {
      items: [
        "Yaban havucu tohumunu al.",
        {
          t: "Toplayıcılık 1. seviyeye ulaşmak için hemen 9 ağaç devir.",
          c: [
            { t: "8 ve 1/3 ağaç gerekiyor.", k: "tip" },
            {
              t: "Gümüş kalitede yeşil soğan şansın olması için toplamadan önce 1. seviye gerekir.",
              k: "reason",
            },
            {
              t: "Yalnızca kesmeye odaklan, ormana giden patikanın yönünden başla.",
              k: "tip",
              c: [
                {
                  t: "Bu, patika boyunca yabani otları da temizler ve ilerlemeni kolaylaştırır.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Yalnızca akçaağaçları ve çamları kes, yumurta biçimli meşeleri değil.",
              k: "warn",
              c: [
                {
                  t: "Meşeler İlkbahar 2'ye kadar meşe palamudu düşürmez ve meşe palamudu değerlidir.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Aynı nedenle, İlkbahar 2'den önce yerdeki tohumlara balta veya çapayla dokunma (yok olurlar).",
              k: "warn",
            },
            {
              t: "Kütükleri kesme; her ağacı düşene kadar vur (en fazla 10 vuruş), sonra sonrakine geç.",
              k: "tip",
              c: [{ t: "Bu daha çok odun ve Toplayıcılık deneyimi verir.", k: "reason" }],
            },
            {
              t: "Bir ağaç düşmeye başlayınca, odunun düşeceği yere yürü ve hemen duraklat.",
              k: "tip",
            },
            {
              t: "Oyun zamanı durur ama düşme animasyonu tamamlanır ve duraklatma sırasında odun otomatik toplanır.",
              k: "reason",
            },
            {
              t: "Ağaç (kütük değil) keserken her zaman bu stratejiyi kullan.",
              k: "tip",
            },
            {
              t: "Ağaçların sayısını şaşırırsan, Beceriler sekmesinde Toplayıcılık seviye atlamasını kontrol et.",
              k: "tip",
            },
            { t: "Yarınki balıkçılık için de faydalı.", k: "tip" },
          ],
        },
        "Toplayıcılık 1'e ulaşınca bir sandık yap ve evinin yanına koy, sonra envanterini boşalt; yalnızca tırpanı, baltayı, kazmayı ve çapayı tut.",
        "Güneydeki ormana doğru çık. (Saat 9:20 civarı.)",
        {
          t: "Kömürözü Ormanı'ndaki toplanabilirleri kontrol etmek ve rotanı planlamak için ekran görüntüsü/yakınlaştırma kullan.",
          c: [
            "Geçerken tüm toplanabilirleri al.",
            {
              t: "Enerji kazancını boşa harcamıyorsa, envanterde yer açmak için yeşil soğanları toplarken yiyebilirsin.",
              k: "tip",
            },
            {
              t: "Mümkün olduğunca çok yabani ot biç, ama tek biri için fazla yoldan sapma.",
              k: "tip",
            },
            { t: "12:50'ye kadar Marnie ile buluşman gerekiyor.", k: "reason" },
          ],
        },
        {
          t: "Jas evinden ip atlama yerine giderken onunla buluş.",
          time: "11:20",
        },
        {
          t: "Haley güneybatıdaki fotoğraf noktasına giderken onunla buluş. Programın önündeysen, daha çok yabani ot biçmek için iyi bir zaman.",
          time: "11:40",
        },
        "Kasabaya git.",
        {
          t: "Jodi ve Haley'nin evlerinin yanındaki iki çöp kutusunu kontrol et ve zaman varsa aralarındaki yabani otları temizle.",
          c: [
            {
              t: "Bir çöp kutusunu kontrol ettikten hemen sonra duraklatmak en iyisidir.",
              k: "tip",
            },
            {
              t: "Eşyalar ters yöne fırladığında zaman kaybını önler.",
              k: "reason",
            },
            {
              t: "Düşen ağaçlardaki duraklatma stratejisine benzer.",
              k: "tip",
            },
            {
              t: "Çöp kutularını kontrol etmek çok zaman kaybettirir, bu yüzden rota bunu yalnızca ilk iki gün yapar.",
              k: "tip",
            },
          ],
        },
        {
          t: "Marnie Pierre'in Bakkalı'ndan çiftliğe yürürken (Emily'nin evinin yanından geçer) onunla buluş.",
          time: "12:50",
        },
        "Kumsala git.",
        {
          t: "İlk eserini hedeflemek için eser noktalarını çapala.",
          c: [
            "Kumsaldaki toplanabilirleri yerde bırak.",
            {
              t: "Şu an envanterin dolu ve onları İlkbahar 2'de alabilirsin.",
              k: "reason",
            },
          ],
        },
        {
          t: "Elliott kulübesinin güneyindeki kamp ateşinin yanındayken onunla buluş.",
          time: "12:00",
        },
        "Kasabaya git.",
        "Bir eser elde ettiysen, Müze'ye bağışla ve ödülü al (250g).",
        "Müze ve Demirci yanındaki çöp kutularını kontrol et.",
        {
          t: "Demirci'nin içinde Clint ile buluş.",
          c: [{ t: "Doğuya doğru çık.", k: "tip" }],
        },
        "JojaMart yanındaki çöp kutusunu kontrol et.",
        {
          t: "JojaMart'ın içinde Pam, Sam ve Shane ile buluş.",
          c: [
            {
              t: "Sam ve Shane çalışırken bile tanışılmış sayılır.",
              k: "reason",
            },
          ],
        },
        "JojaMart'ın arkasındaki (kuzeyindeki) yabani otları temizle.",
        "Köprüde Abigail ile buluş.",
        {
          t: "Maru güneye yürüyor ve yakındaysa şimdi onunla konuş; değilse bankta otururken sonra onunla buluş.",
          time: "15:20",
        },
        "Lewis'in evinin yanındaki çöp kutusunu kontrol et.",
        "Onlarla buluş: Evelyn (çiçek bahçesi), Caroline + Jodi (kasaba meydanı), Vincent + Harvey (Jodi'nin evinin üstünde).",
        "Haritanın batı tarafında Harvey'nin yakınındaki yabani otları biç.",
        {
          t: "Pierre'in Bakkalı'nın içinde Leah + Pierre ile buluş.",
          c: [
            {
              t: "Pierre ile konuşmak için tezgâhın arkasına geçmen gerekir.",
              k: "tip",
            },
            {
              t: "İlkbahar 5–6'da ilkbahar ekinlerini alacağın için bugün Pierre'den alışveriş yapma.",
              k: "tip",
            },
          ],
        },
        {
          t: "Salon'un yakınında diğer herkesle buluş.",
          time: "~16:00",
          c: [
            {
              t: "16:00'da Alex egzersizini bitirir ve odasından çıkar. Evin yanındaki çöp kutusunu kontrol et ve George ile Alex ile buluşmak için içeri gir.",
              c: [
                {
                  t: "Erken gelirsen, Alex'in odasından çıkmasını beklemen gerekebilir.",
                  k: "tip",
                },
              ],
            },
            {
              t: "16:00'da Emily Salon'a gelir. Salon'un yanındaki çöp kutusunu kontrol et ve Gus ile Emily ile buluşmak için içeri gir.",
              c: [{ t: "Gus için tezgâhın arkasına geçmen gerekir.", k: "tip" }],
            },
            "16:20'de Penny, Lewis'in çitinin yanından geçer ve Alex evden çıkar.",
            "16:40'ta Penny, Maru ile banka gelir. Onlarla henüz buluşmadıysan, orada buluş.",
            "Bugün en fazla 27 kişiden 24'üyle buluştuğunu doğrulamak için görev günlüğünü kontrol et.",
          ],
        },
        {
          t: "Çiftliğe geri dön.",
          c: [
            {
              t: "Otobüs durağındaki toplanabilirleri şimdilik yerde bırak.",
              k: "tip",
            },
          ],
        },
        "Envanterini boşalt. Aletlerini tut.",
        "Yaklaşık 18:00'e kadar çiftlik yabani otlarını biç.",
        "18:10 civarı arka ormana çık.",
        "Çadırının dışında Linus ile buluş.",
        {
          t: "Evinin güneydoğusunda Demetrius ile buluş.",
          c: [
            {
              t: "Robin ile zaten buluştun, bu yüzden onunla konuşmana gerek yok.",
              k: "reason",
            },
          ],
        },
        {
          t: "Sebastian evden çıkarken onunla buluş.",
          c: [
            {
              t: "19:00'dan önce gelirsen, 18:40'ta odasından çıkmasını beklemen gerekir.",
              k: "tip",
            },
            {
              t: "Bu, çiftlikte daha çok yabani ot biçmeye harcayabileceğin boşa giden zamandır.",
              k: "reason",
            },
          ],
        },
        "Güneye, Halkevi'ne git.",
        "Halkevi'nin batısındaki yabani otları biç.",
        "Çeşmenin batısındaki yabani otları biç.",
        {
          t: "Eve git.",
          c: [
            {
              t: "Daha önce bıraktığın otobüs durağındaki toplanabilirleri al.",
              k: "tip",
            },
          ],
        },
        {
          t: "Yaban havucu tohumunu + karışık tohumları çapala, ek ve sula.",
          c: [
            {
              t: "İlk 15 yaban havucu tohumunun ötesinde ekin ekmek, kargaların her gün bir veya daha fazlasını yiyebileceği anlamına gelir. Ama karışık tohumları ekmek ek değere değer. (Karışık tohumlardan çıkan karnabahar ve patates, ilerideki ilkbahar ekinleri paketi için onları almaktan kurtarır.)",
              k: "tip",
            },
          ],
        },
        "4–6 enerjin kalana kadar ağaç kes.",
        {
          t: "Kaç karışık tohumun olduğuna bağlı olarak 1:00–1:30'a kadar yabani ot ve çim biç.",
          c: [
            {
              t: "Tüm karışık tohumları 2:00'den önce çapalamalı, ekmeli ve sulamalısın.",
              k: "warn",
            },
          ],
        },
        {
          t: "Eve git ve şunlar dışında her şeyi gönder:",
          c: ["Taş", "Odun", "Kömür", "20 lif"],
        },
        {
          t: "Not:",
          k: "tip",
          c: [
            {
              t: "Yeşil soğan dışındaki tüm toplanabilirleri sat. Halkevi paketlerini sonra dert et. Yarın mümkün olduğunca çok paraya ihtiyacın var.",
              k: "tip",
            },
            {
              t: "Normalde pırasa, karahindiba ve çöp kutusu yemeğini (düşük GPE) satmak yerine yersin, ama bugün para acil, bu yüzden istisna.",
              k: "tip",
            },
          ],
        },
        {
          t: "Kalan karışık tohumları çapala, ek ve sula.",
          c: [
            {
              t: "0 enerjinin altına zorlanıp bayılsan bile, İlkbahar 2'de Toplayıcılıkta seviye atlarsın, bu yüzden hiçbir ceza devredilmez.",
              k: "tip",
            },
            {
              t: "Karışık tohumlardan biri karnabahar değilse (bir mod veya wiki ile kontrol et), ilk paket teslimini ve Mahzen için ek altın gönderimini — İlkbahar 15 için planlanan — İlkbahar 17'ye ertelemen gerekir.",
              k: "warn",
            },
            {
              t: "Maden arabası eksikliği, Madenleri temizlemeye hafif bir zaman baskısı ekler, ama bu çok nadirdir ve rotayı değiştirmez.",
              k: "tip",
            },
          ],
        },
        {
          t: "Evinin içinde ol.",
          time: "2:00'den hemen önce",
          c: [{ t: "Altın cezasından kaçınmak için.", k: "reason" }],
        },
        {
          t: "Yatağı yok et.",
          c: [
            {
              t: "Her sabah tam kapının yanında belirirsin, bu da zaman kazandırır.",
              k: "reason",
            },
            {
              t: "Ya da evden çıkar ve bir sandıkta tut.",
              k: "tip",
            },
          ],
        },
        {
          t: "TV'yi kapının yanına taşı.",
          c: [{ t: "Uyanır uyanmaz kontrol etmek için.", k: "reason" }],
        },
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Toplayıcılık 0 → 1"],
        },
      ],
    },
    2: {
      items: [
        {
          t: "Tüm postanı oku.",
          c: [
            {
              t: "Bambu oltayı almak için Willy'nin mektubunu okuman gerekir.",
              k: "reason",
            },
          ],
        },
        "Ekinlerini sula.",
        {
          t: "Bir sandık yap ve yanında taşı.",
          c: [
            {
              t: "İlkbahar 1'de yalnızca 0–3 yeşil soğan (ve hiç çöp kutusu yemeği) almış ve 50 odun kesememiş olabilirsin. Şimdi 50 kes ve rotaya devam et. Sadece her şeyin biraz geciktiğini unutma.",
              k: "tip",
            },
          ],
        },
        "Tüm envanterini sandığa boşalt. Çapayı + yapılan sandığı + 1 taşı al.",
        {
          t: "George'un evi, Salon ve Lewis'in evinin yanındaki çöp kutularını kontrol et.",
          c: [
            {
              t: "Köylüler seni yakalarsa sorun değil — her NPC'nin dostluğu hâlâ 0.",
              k: "reason",
            },
            {
              t: "Çöp kutuları için yoldan saptığın son sefer bu. Çok zaman kaybettirirler, bu yüzden bundan sonra yalnızca ek zamana mal olmadığında kontrol et.",
              k: "tip",
            },
          ],
        },
        "Kumsala git ve bambu oltayı al.",
        "Taşı Willy'ye ver ve 'Arkadaş Edinme' görevinin ödülünü al (100g).",
        "Sandığı iskelenin sağ alt köşesine koy.",
        "İskeleden doğuya dönük balık tut. Maksimum mesafeye at.",
        {
          t: "8:40'ta bambu oltayı yok et ve kumsalın geri kalan toplanabilirlerini + eser noktalarını kontrol et.",
          c: [
            {
              t: "Şimdi bir eser elde edersen ve İlkbahar 1'de elde etmediysen, ödül için hemen bağışla (250g).",
              k: "tip",
            },
          ],
        },
        {
          t: "Willy'nin dükkanına git. Tüm kumsal toplanabilirlerini + balıkları sat. Willy'den talim oltasını (25g) al.",
          c: [
            {
              t: "Talim oltası kusursuz yakalama şansını artırır. (Balıkçılığı kusursuz yakalamalarla seviye atlatmak, yüksek kaliteli balıktan daha önemlidir.)",
              k: "reason",
            },
          ],
        },
        {
          t: "Talim oltasıyla, Willy'nin kapısının tam güneyine minimum mesafeye at. 1,800g'ye ulaşmaya yetecek kadar balık topla.",
          c: [
            {
              t: "Minimum mesafe atışlarının kolay balık şansı daha yüksektir ve atma/sarma animasyonlarını kısaltır.",
              k: "reason",
            },
            { t: "Ayrıca 'Genel Balıkçılık Stratejisi'ne bak.", k: "tip" },
          ],
        },
        "Su yosunu (1.54 GPE) ve Joja Kola (1.92 GPE) bitince, en yüksek kaliteli hamsiyi (1.82 GPE) veya ringa balığını (1.82 GPE) ye.",
        {
          t: "1,800g için yeterli balığın olunca ve Balıkçılık 2. seviyeye ulaşınca, talim oltasını yok et, tüm balıkları sat ve Willy'den camyünü oltayı al. Ayrıca mümkün olduğunca çok yem al (tanesi 5g) ve yeni oltaya tak.",
          c: [
            {
              t: "Kusursuz yakalamalar düşer, ama yem sayesinde camyünü olta deneyimi daha hızlı verir.",
              k: "reason",
            },
          ],
        },
        "Aynı yerden maksimum mesafe atışlarıyla balık tut.",
        {
          t: "16:30'da, oltada 35'ten az yem varsa, Willy'den daha fazla al.",
          c: [
            {
              t: "Bugünün geri kalanı artı yarın sabaha yetecek kadar yeme ihtiyacın var.",
              k: "reason",
            },
          ],
        },
        "2:00'ye kadar balık tut. Bayılmadan önce tüm balıkları sandığa koy. (Yarın Willy'ye sat.)",
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Balıkçılık 0 → 4"],
        },
      ],
    },
    3: {
      items: [
        "İlkbahar 3 her zaman yağmurludur.",
        "Tüm envanterini sandığa boşalt. Camyünü oltayı al.",
        "80+ yemin varsa ve İlkbahar 2'nin balık sandığından bakır cevheri aldıysan, bir sandık yap, yanında taşı ve doğrudan Kömürözü Ormanı'nın nehrine balık tutmaya git. Yarın Dağ Gölü'ne gitmeden önce Willy'den daha fazla yem almak için kılavuzdan kısaca ayrılmayı unutma.",
        {
          t: "Aksi takdirde:",
          c: [
            "Çapayı sandıktan al.",
            "Leah'nın evinin güneyinde 8:30'a kadar veya yemin bitene kadar (hangisi önce olursa) balık tut.",
            "Jodi ve Emily'nin evlerinin güneyindeki çöp kutularını kontrol et.",
            "Kumsalda toplanabilirleri + eser noktalarını kontrol et.",
            {
              t: "Tüm balıkları + fazla kumsal toplanabilirlerini Willy'nin dükkanında sat.",
              c: [
                {
                  t: "İstersen, deniz balığı paketi için bir sardalya saklayabilirsin.",
                  k: "tip",
                },
              ],
            },
            {
              t: "Yalnızca 75g'n kalana kadar yem al.",
              c: [
                {
                  t: "Balık sandığında zaten bakır cevheri bulduysan, tüm paranı yeme harcayabilirsin.",
                  k: "tip",
                },
                {
                  t: "Burada alabileceğin yem miktarı oynayışına göre değişir (500–700), ama ne alırsan al, İlkbahar bitmeden hepsini kullanırsın.",
                  k: "tip",
                },
                {
                  t: "Teknik olarak, Balıkçı mesleğini alana kadar bazı balıkların satışını erteleyebilirsin. Ama üç sorun var. Birincisi, yalnızca Dağ Gölü'nde yaklaşık bir saatlik balıkçılıktan fazlasını kazanırsan değer. İkincisi, İlkbahar 3'ün sonunda bayılırken taşıyabileceğin balık sayısı sınırlıdır. Üçüncüsü, yem almak için bir sonraki uygun zaman, neredeyse hiç boş zamanın olmadığı İlkbahar 5'te kazmayı bıraktıktan sonradır. Bu yüzden şimdi satmak genel olarak daha basit ve çok daha az risklidir.",
                  k: "reason",
                },
              ],
            },
            {
              t: "Sandığın içindekileri boşalt ve sandığı al.",
              c: [
                {
                  t: "Bunu 0 enerji maliyetiyle yapmak için boş bir alet çubuğu yuvası seç ve sol tıklamayı sıkça yap.",
                  k: "tip",
                },
              ],
            },
            {
              t: "75g sakladıysan, Clint'e git ve bakır cevheri (75g) al; böylece yarın Clint'in ara sahnesini tetikle.",
              c: [{ t: "Yere bırakman gerekmez.", k: "tip" }],
            },
            "Kömürözü Ormanı'nın nehrine git.",
          ],
        },
        {
          t: "Kömürözü Ormanı nehrindeki en iyi balıkçılık noktası, Leah'nın kapısının 6 kare batısı, güneye atış. Sandığı kendinin bir kare kuzeydoğusuna koy.",
          c: [
            {
              t: "Küçük adanın doğusundaki derin suyu hedefle (wiki 'nehir balıkçılık bölgesi' görseline bak).",
              k: "tip",
            },
          ],
        },
        {
          t: "2:00'ye kadar balık tut. Bayılmadan önce envanteri olta + mücevherler + cevher + kömür + en değerli balıklarla doldur.",
          c: [
            {
              t: "İlkbahar 7'ye (veya daha erken bir yağmurlu güne) kadar bu sandığa dönmezsin.",
              k: "tip",
            },
          ],
        },
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Balıkçılık 4 → 6 (Balıkçı mesleğini seç)"],
        },
      ],
    },
    4: {
      items: [
        {
          t: "Her gün TV'de yarının havasını kontrol et ve buna göre planla.",
          c: [
            {
              t: "Örneğin, Dağ Gölü'nde balık tutuyorsan ve yarın yağmur yağmayacaksa, oltayı sandıkta bırakabilirsin.",
              k: "tip",
            },
          ],
        },
        "Ekinlerini sula.",
        {
          t: "150'den az odunun varsa, 150'ye kadar kes.",
          c: [
            { t: "Keserken tırpanı yanında taşı, çimi de biç.", k: "tip" },
            {
              t: "Önümüzdeki iki günde 2 sandık ve bir korkuluk gerekecek.",
              k: "reason",
            },
          ],
        },
        "Bir sandık yap ve yanında taşı.",
        "Envanterini boşalt. Camyünü oltayı + yapılan sandığı al.",
        {
          t: "Dağ Gölü'ne git. En iyi nokta, ekranın altındaki uzun çitin yanında, doğuya atış. Sandığı arkanda üç kareye koy.",
          c: [
            {
              t: "Suya batmış kütüğün yakınındaki derin suyu hedefle (wiki 'göl balıkçılık bölgesi' görseline bak).",
              k: "tip",
            },
          ],
        },
        {
          t: "1:00'e kadar balık tut. Envanteri mücevherler, cevher, kömür ve en değerli balıklarla doldur.",
          c: [
            {
              t: "Yarın yağmur yağmadıkça, camyünü oltayı sandıkta bırakabilirsin.",
              k: "tip",
            },
          ],
        },
        "Eve git.",
        {
          t: "Satılabilen her şeyi gönder (mücevherler, balık vb.).",
          c: [
            { t: "Yemek için kefalları sakla.", k: "tip" },
            {
              t: "Halkevi paketlerinde kullanılan her balıktan birer tane sakla.",
              k: "tip",
            },
            {
              t: "Sonraki Kafatası Mağarası için yeşim, zümrüt, yakut ve elması sakla.",
              k: "tip",
            },
          ],
        },
        "Satıştan hemen sonra 2:00 olacak. Yoksa çim biç ve bayıl.",
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Balıkçılık 6 → 7"],
        },
      ],
    },
    5: {
      items: [
        "Her gün TV'de günün talihini kontrol et.",
        "Evcil hayvanı kabul et veya reddet. (Bkz. 'Evcil Hayvan Mekanikleri'.)",
        "Yaban havuçlarını topla ve kaç tane topladığını not et.",
        {
          t: "Hangi karışık tohumları ektiğini not et.",
          c: [
            {
              t: "Tohumun görünüşünden veya bir modla anlayabilirsin.",
              k: "tip",
            },
          ],
        },
        "Yaban havucu görevinin ödülünü al (100g).",
        "Kalan karışık tohumları bugün geç saate kadar sulama.",
        "Bir sandık yap ve yanında taşı.",
        "Demir cevherin veya altın cevherin varsa, kaç tane olduğunu not et. (Balık sandığından rastgele gelirler.)",
        {
          t: "Sandıktan, kazma + mücevherler + taş + kömür + bakır + 3 yaban havucu dışında her şeyi al.",
          c: [
            {
              t: "Kafatası Mağarası için yeşim, zümrüt, yakut ve elması sakla.",
              k: "tip",
            },
            {
              t: "Yaban havucu lazım: 1 paket için, 1 göndermek için (isteğe bağlı), 1 Pam için (isteğe bağlı).",
              k: "reason",
            },
            { t: "Yarınki korkuluk için bir kömür saklayabilirsin.", k: "tip" },
          ],
        },
        "Madenlere git.",
        "Sandığı asansörün soluna koy.",
        "10. kata in. (Bkz. 'Genel Maden Stratejisi'.)",
        {
          t: "25 bakır cevheri ve 25 taşın olur olmaz 0. kata dön, bir ocak yap ve bakır külçeleri erit.",
          c: [
            {
              t: "Gerçekten yakın değilse bir sonraki asansörü bekleme.",
              k: "tip",
            },
          ],
        },
        "5 külçen olana kadar ocağı çalışır tut. 5'i en geç 15:00'e kadar bitirmelisin.",
        {
          t: "10. kata ulaşınca, kalan külçeler erirken 11. katı tekrarlayarak bakır cevheri kaz.",
          c: [
            {
              t: "15:00'ten önce muhtemelen 15. kata ulaşamazsın.",
              k: "reason",
            },
          ],
        },
        {
          t: "5 külçe hazır olur olmaz:",
          c: [
            {
              t: "Kılıcı + yaban havuçlarını sandıkta bırak.",
              c: [
                {
                  t: "İlkbahar 11'e kadar bu sandığa dönmezsin.",
                  k: "tip",
                },
              ],
            },
            "Ocağı + mücevherleri + ufak tefek şeyleri al. 4 envanter yuvasını boş tut.",
            "Çiftlikte kömür bırakmadıysan, yarınki korkuluk için bir tane al.",
            "Demirci'ye git.",
          ],
        },
        {
          t: "5. külçeyi eritmek için çok geç kaldıysan, 16:00'ya kadar Demirci'ye ulaşıp içeri bir ocak koyabilir, 5. külçeyi eritip 30 dakika bekleyebilirsin. Binada olduğun sürece Clint 19:10'a kadar satış yapar.",
          k: "tip",
          c: [
            {
              t: "Ancak bu bir hata sayılır, bu yüzden hile yapmamak için Clint tezgâhtan ayrılmadan önce ihtiyacın olanı al.",
              k: "warn",
            },
          ],
        },
        {
          t: "Külçeleri zamanında yapamazsan veya Demirci'ye kapanmadan ulaşamazsan, kalan zamanı balık tutarak geçir. Rota o zaman bir gün geriye kayar.",
          c: [
            {
              t: "Göründüğü kadar büyük bir hata değil, çünkü ek gelir için zaten çok balık tutacaksın.",
              k: "reason",
            },
          ],
        },
        "Madenler jeot, donuk jeot ve yanık jeot verir. Hesaba göre onları kırması için Clint'e 25g ödemek ortalamada daha değerlidir, ama gün ortasında Demirci'ye yürümenin fırsat maliyeti bu kazancı kat kat aşar. Bu yüzden tüm jeotları ek nakit için gönder. (Mineraller/Müze ile oyun sonunda ilgilen.)",
        {
          t: "Demirci'de:",
          c: [
            "Mücevherlerini sat.",
            {
              t: "En az 3,310g sakla, geri kalanıyla:",
              c: [
                "En fazla 25 demir cevheri al (balıkçılıktan gelen cevher dahil) (25 × 150g = 3,750g).",
                "En fazla 25 altın cevheri al (balıkçılıktan gelen cevher dahil) (25 × 400g = 10,000g). (Bu noktada altın cevheri için neredeyse hiç paran olmayacak ve bu sorun değil.)",
              ],
            },
          ],
        },
        {
          t: "3,310g neye yarıyor:",
          c: [
            "2,000g kazma yükseltmesi için.",
            {
              t: "1,120g, Çiftçilik 2. seviye için 16 lahana tohumuna (toplam 380 deneyim). (Karışık tohumların ve pirinç filizinin deneyimini hesaba katarsan daha az lahana alabilirsin.)",
              c: [
                "Yaban havucu başına 8 deneyim × 15 = 120 deneyim",
                "380 deneyim − 120 deneyim = 260 deneyim",
                "260 deneyim / lahana başına 17 deneyim = 16 lahana",
                "16 lahana tohumu × 70g = 1,120g",
              ],
            },
            "60g, 1 fasulye yetiştirici için.",
            "80g, 1 karnabahar tohumu için (bir karışık tohumdan bir tane aldıysan gerekmez).",
            "50g, 1 patates tohumu için (bir karışık tohumdan bir tane aldıysan gerekmez).",
          ],
        },
        "Bakır kazmaya yükselt (2,000g).",
        {
          t: "Pierre'e git ve al:",
          c: [
            "1 fasulye yetiştirici (60g)",
            "1 karnabahar tohumu (80g) (bir karışık tohumdan bir tane aldıysan gerekmez)",
            "1 patates tohumu (50g) (bir karışık tohumdan bir tane aldıysan gerekmez)",
            "16 lahana tohumu (1,120g)",
            "Kalan parayla ek lahana tohumu al.",
          ],
        },
        "Pierre'e kapanmadan ulaşamasan bile, rota anlamlı şekilde değişmez. Tohumları yarın al ve ek.",
        "Eve git.",
        "Ek ve sula.",
        "Camyünü oltayı + ocağı + demir cevherini + altın cevherini + kömürü + kefalları al.",
        "Dağ Gölü'ne git.",
        "Ocağı sandığın yanına koy. Balık tutarken 5 demir külçesi erit.",
        {
          t: "2:00'ye kadar balık tut. Bayılmadan önce envanteri en değerli eşyalarla doldur.",
          c: [
            {
              t: "Kalan demir cevherini + altın cevherini Dağ Gölü sandığında bırak.",
              c: [
                { t: "Yarın yağmur yağarsa ocağı al.", k: "tip" },
              ],
            },
            "Kaç altın cevherin olduğunu not et.",
          ],
        },
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Çiftçilik 0 → 1", "Madencilik 0 → 1", "Balıkçılık 7 → 8"],
        },
      ],
    },
    6: {
      items: [
        {
          t: "Ekinlerini sula.",
          c: [
            {
              t: "Kargalar ilkbahar paketi ekinlerini yediyse, not et ve uygun olunca Pierre'den tekrar tohum al.",
              k: "tip",
            },
          ],
        },
        "Bir korkuluk yap ve koy.",
        "7:40'a kadar ağaç kes.",
        "Envanterini boşalt ve camyünü oltayı al.",
        {
          t: "Kasabaya otobüs durağından gir. Halkevi ara sahnesi tetiklenir. Geçme.",
          k: "warn",
          c: [
            {
              t: "Geçersen kasaba girişine yerleştirilirsin; izlersen Halkevi'nin yanına yerleştirilirsin.",
              k: "reason",
            },
          ],
        },
        "Halkevi'ne gir ve Altın Parşömen kaidesine dokun (görevi başlatır).",
        "Dağ Gölü'ne git ve 1:00'e kadar balık tut. Envanteri 5 demir külçesi + en değerli satılabilir eşyalarla doldur.",
        "Eve git.",
        {
          t: "Satılabilenlerden, çelik kazma yükseltmesine (5,000g) yetecek kadarını gönder ve en fazla 25 altın cevheri almaya yetecek kadar altın da gönder.",
          c: [
            { t: "Yetmezse kefal sat. (Önce düşük kaliteliyi sat.)", k: "tip" },
          ],
        },
        "Satıştan hemen sonra 2:00 olacak. Yoksa çim biç ve bayıl.",
      ],
    },
    7: {
      items: [
        "Vogda Kızartma tarifi için Soslar Kraliçesi'ni kontrol et.",
        "Büyücü'nün mektubunu alana kadar postanı kontrol et.",
        "Ekinlerini sula.",
        "Envanterini boşalt. 5 demir külçesini al.",
        {
          t: "Büyücü'ye git (bir ara sahne tetikler).",
          c: [
            {
              t: "Ara sahneyi izlemek Büyücü ile buluşmuş sayılmaz. Adının Sosyal sekmesinde görünmesi için ara sahneden sonra onunla konuşmalısın. Ama bu, gerçek bir faydası olmayan tamamen kozmetiktir, bu yüzden zaman kaybı olarak gör.",
              k: "tip",
            },
          ],
        },
        "Kömürözü Ormanı nehrindeki sandığın içindekileri boşalt (isteğe bağlı).",
        {
          t: "Demirci'ye git:",
          c: [
            "En fazla 25 altın cevheri al (balıkçılıktan gelen cevher dahil).",
            "Çelik kazmaya yükselt (5,000g).",
          ],
        },
        "Dağ Gölü'nde 2:00'ye kadar balık tut, sonra bayıl. Balık tutarken altın külçeleri erit. 2–3 erit; bayıldığında ocakta bir tane daha olacak.",
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Balıkçılık 8 → 9"],
        },
      ],
    },
    8: {
      items: [
        "Mağara ara sahnesi çıkarsa, mantarları seç. (Bkz. 'Çeşitli Notlar'.)",
        "Ekinlerini sula.",
        {
          t: "Satılabilenlerden, 12,000g'ye ulaşmaya yetecek kadarını gönder.",
          c: [
            {
              t: "Altın kazma yükseltmesi (10,000g) + sırt çantası yükseltmesi (2,000g) için.",
              k: "reason",
            },
            {
              t: "Yetmezse, gün bitmeden eve dön ve farkı kapatmak için o gün tuttuğun balıkları gönder.",
              k: "tip",
            },
          ],
        },
        "Dağ Gölü'nde 2:00'ye kadar balık tut, sonra bayıl. Balık tutarken toplam 5 olana kadar altın külçeleri erit. Bayıldığında bu külçeleri tutuyor olmalısın.",
        {
          t: "Bu, başlangıçtan beri hiçbir beceride seviye atlamadığın ilk gün, bu yüzden kendini fazla zorlama.",
          c: [
            {
              t: "%0 değil, %50 enerjiyle uyanmalısın.",
              k: "tip",
            },
          ],
        },
      ],
    },
    9: {
      items: [
        "Ekinlerini sula.",
        "Yaklaşık 8:00'e kadar ağaç kes.",
        "Envanterini boşalt. Camyünü oltayı al.",
        "Demirci'ye git ve altın kazmaya yükselt (10,000g).",
        "Pierre'e git ve sırt çantanı yükselt (2,000g).",
        "Dağ Gölü'nde 2:00'ye kadar balık tut, sonra bayıl.",
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Balıkçılık 9 → 10 (Oltacı mesleğini seç)"],
        },
        "Bugün Balıkçılık 10'a ulaşamasan bile, bir sonraki balıkçılık gününde alırsın. Rota anlamlı şekilde değişmez.",
      ],
    },
    10: {
      items: [
        "Ekinlerini sula.",
        "Mağaradan mantar al.",
        {
          t: "Çiftçilik 6. seviye için gereken ek lahanayı hesapla.",
          c: [
            "Yaban havucu başına 8 deneyim × 15 = 120 deneyim",
            "Lahana başına 17 deneyim × 16 = 272 deneyim",
            "toplam 3,300 deneyim − 120 − 272 = gereken 2,908 deneyim",
            "2,908 deneyim / 17 = 172 lahana",
            "172 lahana tohumu × 70g = 12,040g",
          ],
        },
        {
          t: "Balıkçılık 10. seviyedeysen, ihtiyacın olan lahana tohumlarının yarısını (6,020g) almaya yetecek kadar balık gönder.",
          c: [
            {
              t: "İki parti en iyisidir; gerekenden fazla fıskiye yapmazsın. Böylece İlkbahar 28'de kaliteli fıskiyeler için mümkün olduğunca çok demir külçesi sağlarsın.",
              k: "reason",
            },
          ],
        },
        {
          t: "Balıkçılık 10. seviyede değilsen, balıkları şimdi gönderme. Yarın doğrudan Willy'ye sat.",
          c: [{ t: "Altının %25'ini kaybedersin.", k: "reason" }],
        },
        "Envanterini boşalt. Camyünü oltayı al.",
        "Oltada 100'den az yem varsa, birkaç balık da al. Dağ Gölü'nde 9:00'a kadar birkaç saat balık tut, sonra Willy'ye balık sat ve daha fazla yem al.",
        "Dağ Gölü'nde 2:00'ye kadar balık tut, sonra bayıl. Yarınki Madenler için ocağı almayı unutma.",
      ],
    },
    11: {
      items: [
        "Lahanayı topla. (Çiftçilik 2. seviyeye ulaşırsın.)",
        {
          t: "Kareleri fıskiye düzeninde çapalamaya başla.",
          c: [{ t: "Hiçbir kareyi sulama.", k: "warn" }],
        },
        "Çiftlikten yaklaşık 8:00'de ayrıl.",
        "Dün balık göndermediysen, Willy'ye sat.",
        "Demirci'ye git ve altın kazmayı al.",
        "Pierre'e git ve hesapladığın kadar lahana tohumu al (6,020g).",
        {
          t: "Çiftliğe geri dön ve çapalamayı + ekmeyi bitir.",
          c: [
            { t: "Hiçbir kareyi sulama.", k: "warn" },
            {
              t: "İsteğe bağlı olarak, gelecekteki fıskiyelerin yerini işaretlemek için kaldırım taşı yol yap.",
              k: "tip",
            },
            { t: "Lahanayı İlkbahar 14'e kadar sulamak gerekmez.", k: "tip" },
          ],
        },
        "Madenlere git ve bir ocak koy. Külçe eritmeye devam et.",
        {
          t: "2:00'ye kadar kaz, sonra bayıl.",
          c: [
            {
              t: "Daha çok bakır topladıkça, 3 ocak daha yap (toplam 4).",
              k: "tip",
            },
          ],
        },
        {
          t: "Günün sonunda şunu kazanırsın:",
          k: "result",
          c: ["Çiftçilik 1 → 2"],
        },
      ],
    },
    12: {
      items: [
        "Mağaradan mantar al.",
        "2:00'ye kadar kaz, sonra bayıl. Kazarken bakır ve demir erit.",
        "Madencilik 5. seviyeye ulaşınca, Madenci mesleğini seç.",
      ],
    },
    13: {
      items: [
        "2:00'ye kadar kaz, sonra bayıl.",
        {
          t: "Yumurta Festivali'nde ihtiyacın olan bir şey yok, bu yüzden gitmek zaman kaybı. İstisna, 1. yılın sonuna kadar her eşyayı gönderme meydan okumasına gidiyorsan; o zaman bir iki çilek tohumu gerekir.",
          k: "tip",
        },
      ],
    },
    14: {
      items: [
        "Kırmızı Lahana Salatası tarifi için Soslar Kraliçesi'ni kontrol et.",
        "Mağaradan mantar al.",
        "0:00'a kadar Madenlere ulaş.",
        "Fıskiyeler için kalan cevherin eksikse, daha aşağı inmeden önce 21./41. katta cevher kaz.",
        {
          t: "Madenlerin dibine ulaşınca, cevher kazmaya geri dön.",
          c: [
            {
              t: "Beceriye, şansa ve yağmurlu günlerde balıkçılık molaları verip vermediğine bağlı olarak, 120. kata İlkbahar 14–18 arasında ulaşabilirsin.",
              k: "tip",
            },
            {
              t: "Tüm (normal) fıskiyeleri yaptıktan sonra, bakır cevheri yalnızca alet yükseltmeleri için gerekir. Kaliteli fıskiyeler çok demir ve altın cevheri gerektirir.",
              k: "tip",
            },
          ],
        },
        {
          t: "0:00'da eve git ve mümkün olduğunca çok fıskiye yap + koy.",
          c: [{ t: "Tüm ekinleri kapsamasalar da sorun değil.", k: "tip" }],
        },
        {
          t: "42,500g'ye ulaşmak için eşya gönder.",
          c: [
            {
              t: "Yetmezse, yalnızca 32,500g'ye git ve yarınki 10,000g'lik paketi atla. (Çoğu oynayışta muhtemelen eksik kalırsın.)",
              k: "tip",
            },
          ],
        },
        "Bunun hemen ardından 2:00 olacak. Yoksa çim biç ve bayıl.",
      ],
    },
    15: {
      items: [
        {
          t: "Ahududu bugün görünmeye başlar, ama toplamak için fazla yoldan sapma.",
          c: [
            { t: "Zaman, küçük enerji kazancına değmez.", k: "reason" },
            {
              t: "Ahududu çalılarında çöp kutularındaki ile aynı duraklatma stratejisini kullan.",
              k: "tip",
            },
          ],
        },
        "Fıskiyelerin henüz kapsamadığı ekinleri sula (varsa).",
        "Envanterini boşalt. İlkbahar toplama (4), ilkbahar ekinleri (4), demirci (3), jeolog (4) ve maceraperest (2) paketleri için eşyaları al.",
        {
          t: "Halkevi'ne git ve paketleri bu eşyalarla tamamla.",
          c: [
            {
              t: "İki Kazan Dairesi paketini tamamladıktan sonra, hatalı ara sahnede takılmamak için Altın Parşömen'den çıkmayı unutma.",
              k: "warn",
            },
          ],
        },
        "Yeterli paran varsa (42,500g), Mahzen paketini de tamamla.",
        "Eve git, bir kristalaryum koy ve içine bir elmas koy.",
        "Envanterini boşalt ve Madenlere git.",
        "Fıskiyeler için kalan cevherin eksikse, daha aşağı inmeden önce 21./41. katta cevher kaz.",
        "2:00'ye kadar kaz, sonra bayıl. Hâlâ daha çok fıskiyeye ihtiyacın varsa, eritilmiş külçeleri envanterinde tutmayı unutma.",
        "Günün sonunda maden arabaları açılır.",
      ],
    },
    16: {
      items: [
        "Mağaradan mantar al.",
        "Fıskiyelerin henüz kapsamadığı ekinleri sula (varsa).",
        "Dünkü eritilmiş külçelerle daha fazla fıskiye yap (gerekirse).",
        {
          t: "2:00'ye kadar kaz.",
          c: [
            {
              t: "Daha hızlı seyahat etmek için maden arabasını kullanmayı unutma.",
              k: "warn",
            },
          ],
        },
      ],
    },
    17: {
      notes: ["İlkbahar 17'den sonra — burada kılavuz daha az ayrıntılı olur."],
      items: [
        "Madenlerin 120. katına henüz ulaşmadıysan, mümkün olduğunca hızlı bitir.",
        {
          t: "Ayrıca, Mahzen'i bitirmek için (42,500g) daha çok altına ihtiyacın varsa, mümkün olduğunca hızlı tamamlamak için Dağ Gölü'nde balık tut.",
          c: [
            {
              t: "İkisi de kaldıysa, aynı günde bitecek şekilde zamanla.",
              k: "tip",
              c: [
                {
                  t: "Otobüs ertesi güne kadar onarılmaz.",
                  k: "reason",
                },
              ],
            },
          ],
        },
        "Madenlerin 120. katına ulaşınca, tüm ocakları Madenlerden çiftliğe taşı.",
        "Kafatası Mağarası'nı mümkün olduğunca hızlı ve sık yap. (Bkz. 'Genel Kafatası Mağarası Stratejisi'.)",
        {
          t: "Boş zamanında:",
          c: [
            "Kaliteli fıskiyeler + yıldızmeyvesinin geleceği yerdeki çiftlik molozunu temizlemeye başla.",
            "Kaliteli fıskiyelerin geleceği yere zemin döşemesi yap ve yerleştir.",
            "Korkuluklar yap ve yerleştir.",
            "Artan bakırla daha fazla ocak yap.",
            "Çiftliğin bir köşesine meşe palamudu ekerek bir meşe ormanı başlat.",
            "Madenlerde daha çok cevher kaz (20./40./80. katlar).",
          ],
        },
      ],
    },
    18: {
      items: [
        {
          t: "Şunlar için eşya gönder:",
          c: [
            "2,000g bakır balta yükseltmesi için.",
            "2. parti lahana tohumunu (tanesi 70g) almaya yetecek altın.",
          ],
        },
      ],
    },
    19: {
      items: [
        "9:00'da Clint'e git ve bakır baltaya yükselt (2,000g).",
        "Pierre'e git ve 2. parti lahana tohumunu al.",
      ],
    },
    20: {
      items: [
        "1. lahanayı topla ve 2. ekini ek.",
        "Çelik balta yükseltmesi için 5,000g'ye ulaşmak üzere eşya gönder.",
      ],
    },
    21: {
      items: [
        "Turp Salatası tarifi için Soslar Kraliçesi'ni kontrol et.",
        "9:00'da Clint'e git, bakır baltayı al ve çelik baltaya yükselt (5,000g).",
        "1. yılın sonuna kadar her eşyayı gönderme meydan okumasına gidiyorsan, İlkbahar 28'e hazır olmaları için bugün lale soğanı (20g) ve maviruh tohumu (30g) alıp ekmelisin.",
      ],
    },
    22: {
      items: ["Bakır çapa yükseltmesi için 2,000g'ye ulaşmak üzere eşya gönder."],
    },
    23: {
      items: [
        "9:00'da Clint'e git, çelik baltayı al ve bakır çapaya yükselt (2,000g).",
        {
          t: "Artık çelik baltan olduğundan, şanssız bir gün geldiğinde çiftlik alanını temizlemek ve fıskiyeleri hazırlamak için kullan. Şanssız olmayan bir günde bile, en geç 27'ye kadar yap.",
          c: [
            {
              t: "Ancak, İlkbahar 25'ten önce Demirci mesleğine ihtiyacın olduğundan, mola vermeden önce önce Madencilik 10. seviyeye ulaşmalısın.",
              k: "warn",
            },
            {
              t: "Korkulukları ve yaban havucu tohumlarını (dolgu ekinleri) da koymayı unutma.",
              k: "warn",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Mümkün olduğunca çok gönder.",
          c: [
            { t: "Yarın için mümkün olduğunca çok altın topla.", k: "reason" },
          ],
        },
      ],
    },
    25: {
      items: [
        "Yaz 2'de kaç yıldızmeyvesi tohumu (tanesi 400g) ekeceğini planla. Oynayışa göre değişir; şimdiden Yaz 2'ye kadar Kafatası Mağarası gelirini hesaba kat. Çiftliği temizleyip hazırlamak için yaklaşık iki gün gerekir. (İlkbahar 23'ten sonra şanssız bir günde bir günü zaten temizlemiş olabilirsin.) Yaklaşık 400–500 yıldızmeyvesi tohumu hedefle.",
        "9:00'da Clint'e git, bakır çapayı al ve çelik çapaya yükselt (5,000g).",
        {
          t: "Vaha'ya git ve alacağın her yıldızmeyvesi tohumu için bir Üstün Hızlı-Ek al.",
          c: [
            {
              t: "Vaha Üstün Hızlı-Ek'i yalnızca perşembeleri satar ve Yaz 2'ye kadar lazım.",
              k: "reason",
            },
            {
              t: "Bugün Pam kontrol için klinikte (bu yüzden otobüsü sürmüyor), bu yüzden çöle ulaşmak için Işınlanma Totemi: Çöl gerekir. Çoğu oynayışta zaten her gün bir ışınlanma totemi kullanırsın, yani sorun değil.",
              k: "tip",
            },
          ],
        },
        {
          t: "Cezasız bayılabilmek için kalan parayı yıldızmeyvesi tohumlarına harca.",
          c: [
            {
              t: "Yıldızmeyvesi tohumlarının geri kalanını Yaz 2'de al.",
              k: "tip",
            },
          ],
        },
      ],
    },
    26: {
      items: ["Yapılacak özel bir şey yok."],
    },
    27: {
      items: [
        "2. lahanayı topla. (Çiftçilik 6. seviyeye ulaşırsın.)",
        "9:00'da Clint'e git ve çelik çapayı al.",
      ],
    },
    28: {
      items: [
        "Omlet tarifi için Soslar Kraliçesi'ni kontrol et.",
        {
          t: "Mümkün olduğunca çok gönder.",
          c: [
            { t: "Yarın için mümkün olduğunca çok altın topla.", k: "reason" },
          ],
        },
        "Kaliteli fıskiyeler yap ve koy.",
        {
          t: "Henüz yapmadıysan, yaban havucu tohumu (dolgu ekini) ek.",
          c: [
            {
              t: "Yaban havucu tohumlarına Üstün Hızlı-Ek kullanma, çünkü Yaz 1'e devretmemeleri gerekir.",
              k: "warn",
            },
          ],
        },
        "Öğle civarı bitirirsen, kalan zamanı Kafatası Mağarası'nda geçirebilirsin.",
      ],
    },
  },
  summer: {
    1: {
      items: [
        {
          t: "Özel bir şey yok. Kafatası Mağarası vb. yapabilirsin. Yıldızmeyvesi tohumlarını yarına kadar ekmen gerekmez, bu yüzden yaban havuçlarını biçme.",
          c: [
            {
              t: "Ziraatçı mesleği 3. yıldızmeyvesini etkiler.",
              k: "reason",
            },
          ],
        },
      ],
    },
    2: {
      items: [
        "İlkbahar 25'te aldığın tüm Üstün Hızlı-Ek'i + 1. parti yıldızmeyvesi tohumunu biç ve ek.",
        "9:00'da yıldızmeyvesi tohumlarının geri kalanını almak için Vaha'ya git, sonra eve dön ve ek.",
        {
          t: "Bu günün çoğunu alır. Boş zamanın varsa:",
          c: [
            "10–20 paratoner yap ve koy.",
            "Çiftliğe dağılmış, kesmediğin meşelere akıtaçlar koy.",
            "Meşe ormanını büyütmek için çiftliğin bir köşesine meşe palamudu ekmeye devam et.",
          ],
        },
      ],
    },
    3: {
      items: [
        {
          t: "Kafatası Mağarası'nı yap.",
          c: [
            {
              t: "İridyum kazma yükseltmesi için 25,000g gerekir.",
              k: "reason",
            },
          ],
        },
      ],
    },
    4: {
      items: [
        {
          t: "İridyum külçeleri erit. Geç biterlerse (14:30 civarı), Clint'e git ve iridyum kazmaya yükselt.",
          c: [
            {
              t: "İridyum külçeleri tek başına yeterli para etmezse, mücevherleri doğrudan Clint'e satabilirsin.",
              k: "tip",
            },
          ],
        },
        "10–20 paratoner yap ve koy.",
        "Çiftliğe dağılmış, kesmediğin meşelere akıtaçlar koy.",
        "Meşe ormanını büyütmek için çiftliğin bir köşesine meşe palamudu ekmeye devam et.",
        "Fıçılar için mümkün olduğunca çok meşe reçinesine ihtiyacın var. Ağaç gübresi meşe ormanını hızlı büyütmek için çok faydalıdır, ama yapımı Toplayıcılık 7. seviye gerektirir. Neredeyse hiç oyun içi zaman harcamadan Toplayıcılığı seviye atlatmanın en iyi yolu (ağaç kesmek veya Gizli Koru'ya uzun yolu yürümek yerine) yaz tohumları yapıp toplamaktır.",
        {
          t: "Yani Kafatası Mağarası'na gitmediğin günlerde (bugün gibi):",
          c: [
            "Yaz toplanabilirleri için haritayı dolaş ve en az 10–20 yaz tohumu yap. Toplayıcılık 7. seviyeye kadar mümkün olduğunca çok topla, tekrar yap ve yeniden ek.",
            {
              t: "Toplayıcılık deneyimi ve kereste için Gizli Koru'daki 5 kütüğü kes.",
              c: [
                { t: "At Ahırı için 100 kereste gerekir.", k: "reason" },
              ],
            },
            {
              t: "100 kerestin olur olmaz, gelecekteki Gizli Koru gidiş-gelişlerini azaltmak için Robin'den At Ahırı'nı al.",
              c: [
                {
                  t: "İkinci ev yükseltmesi 150 kereste gerektirir.",
                  k: "tip",
                },
              ],
            },
          ],
        },
      ],
    },
    5: {
      notes: ["Yaz 5'ten sonra"],
      items: [
        "Kafatası Mağarası'nı daha çok yap. 2. parti yıldızmeyvesi tohumu için mümkün olduğunca çok para topla.",
      ],
    },
    9: {
      items: ["2. parti yıldızmeyvesi tohumunu almaya yetecek kadar gönder."],
    },
    10: {
      items: [
        {
          t: "2. parti yıldızmeyvesi tohumunu al.",
          c: [
            {
              t: "Vaha yarın Luau için kapanıyor, bu yüzden bugün al.",
              k: "reason",
            },
          ],
        },
      ],
    },
    11: {
      items: [
        {
          t: "Topla ve yeniden ek.",
          c: [
            {
              t: "Üstün Hızlı-Ek karede kalır, bu yüzden yeniden uygulaman gerekmez.",
              k: "reason",
            },
          ],
        },
        {
          t: "Hiçbir yıldızmeyvesini — altın kalite olsa bile — satma, hepsini fıçılara koy. Bu noktada mümkün olduğunca çok meşeye akıtaç tak ve mümkün olduğunca çok fıçı yap.",
          c: [
            { t: "Bitince Robin'den odun al.", k: "tip" },
            {
              t: "Belirsizlik Heykelciği'nde Ziraatçı'dan Zanaatkâr'a geçene kadar şarap satma.",
              k: "warn",
            },
          ],
        },
        "Önce evini fıçılarla doldurabilirsin. Sonra birkaç Büyük Baraka alıp evin yakınına koymak uygun olur. Ya da Taş Ocağı'nı açınca, zemin döşemesiyle kapla ve fıçı deposu olarak kullan.",
        {
          t: "Günün sonunda Çiftçilik 10. seviyeye ulaşırsın. Ziraatçı mesleğini seç.",
          c: [
            {
              t: "Ne yazık ki Ziraatçı etkisi bugün ekilen ekinlere uygulanmaz.",
              k: "tip",
            },
            {
              t: "Yıldızmeyvesi Şarabı satmadan önce sonra Zanaatkâr'a geç.",
              k: "tip",
            },
          ],
        },
      ],
    },
    13: {
      notes: ["Yaz 13'ten sonra"],
      items: [
        "Yaz 13 her zaman fırtınalı bir gündür.",
        "Yaz 13'te veya bir süre sonra, paketler, görevler, hediyeler vb. için gereken diğer yaz ekinlerini al ve ek.",
        "En uzun ekinler kavun ve yaban mersinidir; Ziraatçı mesleğiyle 10 gün sürer. Üstün Hızlı-Ek bunu 7 güne indirir. Yani ek yaz ekinlerini ekmeyi en geç Yaz 21'e kadar erteleyebilirsin.",
      ],
    },
    19: {
      items: ["3. yıldızmeyvesi için yeterli eşya gönder."],
    },
    20: {
      items: [
        "Yıldızmeyvesini topla.",
        "9:00'da Vaha'ya git ve 2. parti yıldızmeyvesi tohumunu al.",
        {
          t: "Yıldızmeyvesi tohumlarını ek.",
          c: [
            {
              t: "Üstün Hızlı-Ek karede kalır, bu yüzden yeniden uygulaman gerekmez.",
              k: "reason",
            },
          ],
        },
      ],
    },
    24: {
      items: [
        {
          t: "Daha fazla Üstün Hızlı-Ek almaya yetecek kadar gönder.",
          c: [
            {
              t: "Tüm çiftliği bal kabağıyla kaplayacaksın, bu yüzden yıldızmeyvesi karelerinden devreden miktarın ötesinde ek Hızlı-Ek gerekir.",
              k: "reason",
            },
          ],
        },
      ],
    },
    25: {
      items: [
        "Vaha'da daha fazla Üstün Hızlı-Ek al.",
        "Şimdiyle Yaz 28 arasında bir zaman, tüm kaliteli fıskiyeleri ve ek Üstün Hızlı-Ek'i çapala ve yerleştir. Yaz 28'de toprağı sulamazsan, buğday Sonbahar 2'de hazır olmaz.",
      ],
    },
    26: {
      items: ["Yaz 26 her zaman fırtınalı bir gündür."],
    },
    27: {
      items: [
        "Yarın tüm çiftliği kaplamak için buğday tohumu (tanesi 10g) almaya yetecek kadar gönder.",
      ],
    },
    28: {
      items: [
        "Yıldızmeyvesini topla.",
        "9:00'da Pierre'e git ve tüm çiftliği kaplamak için buğday tohumu al.",
        {
          t: "Buğday tohumlarını ek (dolgu ekini — Üstün Hızlı-Ek'i korur).",
          c: [
            {
              t: "Yaz 28 ekimi yalnızca Ziraatçı mesleğin varsa işe yarar. Aksi takdirde bu stratejiyle 3. bal kabağını alamazsın.",
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
        "Özel bir şey yok. Kafatası Mağarası vb. yapabilirsin. Buğdayın büyümeyi bitirmesini beklemen gerekir.",
        "Müze'yi tamamlamak için, Kış 1'den önce Toplayıcılık 10. seviye ve İzci mesleğine sahip olmak çok faydalıdır (eser noktalarını daha kolay görmek için). Henüz Toplayıcılık 10 değilsen, artan akçaağaç tohumları ve çam kozalaklarıyla büyük bir orman ekip hepsini kesmek daha iyidir. (Sonbahar toplanabilirlerini toplamaktan daha verimlidir.)",
        "Çiftliği kaplamak için bal kabağı tohumu (tanesi 100g) almaya yetecek kadar gönder.",
      ],
    },
    2: {
      items: [
        {
          t: "Buğdayı topla ve tüm çiftliği kaplamak için bal kabağı tohumlarını yeniden ek.",
          c: [
            {
              t: "Bal kabakları kızılcıktan daha iyidir, çünkü tüm kızılcığı işleyecek kadar fıçın olmayacak.",
              k: "reason",
            },
          ],
        },
        "Yıldızmeyvesi gibi, sonbaharda 3 bal kabağı hasadı almak için topla + yeniden ek işlemini tekrarla.",
      ],
    },
    9: {
      items: [
        "Artık Yıldızmeyvesi Şarabı satabilirsin.",
        "Belirsizlik Heykelciği'nde Ziraatçı'dan Zanaatkâr'a geç.",
        {
          t: "Yarın için daha fazla tohum al.",
          c: [
            {
              t: "Pierre çarşamba günü kapalı, bu yüzden bugün al.",
              k: "reason",
            },
          ],
        },
      ],
    },
    10: {
      items: [
        "1. bal kabağı bugün hazır.",
        {
          t: "Yeniden ek.",
          c: [
            {
              t: "Yıldızmeyvesi gibi, bal kabağı da toplam 3 kez hasat edilebilir.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
  winter: {
    1: {
      notes: ["Kış 1'den sonra"],
      items: [
        {
          t: "Şimdi Halkevi'nin kalan paketlerini tamamlama şansın. Zencefil Adası'nı ve ada çiftliğini açmak için Halkevi'ni mümkün olduğunca hızlı tamamla.",
          c: [
            {
              t: "Ada çiftliğine ulaşınca, tekrar toplu hâlde yıldızmeyvesi ekebilirsin; bu da ana gelir kaynağın olur.",
              k: "tip",
            },
          ],
        },
      ],
    },
  },
};

// Bugünün hedefleri (özet): bir ana hedef (katlanabilir başlık) ve yöntemler/nedenler
// (c). items'tan ayrıdır; her günün ana hedeflerini yoğunlaştırır. Önemsiz adımlar atlanır
// ama önemli kartopu maddeleri (sonraki güne malzeme stoklamak vb.) korunur.
export const DAILY_GOALS: GoalsData = {
  spring: {
    1: [
      {
        t: "Yarın mümkün olduğunca hızlı camyünü oltayı (1,800g) almak için para biriktir.",
        c: [
          {
            t: "Kasabadaki herkesle buluş.",
            c: [
              {
                t: "'Talimatlar' görevini tamamlamak 'Arkadaş Edinme'yi açar; bu da İlkbahar 2'de ekstra 100g verir.",
                k: "reason",
              },
            ],
          },
          "Müze'ye bir eser bağışla, 250g ödül için.",
          "Toplanabilirlerini sat.",
        ],
      },
      {
        t: "Tohum ek.",
        c: [
          "Yaban havucu tohumlarını ek.",
          "Karışık tohum almak için kasabada yabani ot biç.",
        ],
      },
    ],
    2: [
      {
        t: "Camyünü oltayı al (1,800g).",
        c: [
          "Talim oltasını (25g) al ve balık tut.",
          "'Arkadaş Edinme' ödülü için taşı Willy'ye ver (100g).",
        ],
      },
      "Sonraki gün için yem al.",
    ],
    3: [
      {
        t: "Bir bakır cevheri elde et.",
        c: [
          {
            t: "Yarın Clint'in ara sahnesini tetiklemek için.",
            k: "reason",
          },
          {
            t: "Balık tutarak elde et.",
            c: [
              {
                t: "Elde edemezsen, Clint'ten bakır cevheri almak için 75g sakla.",
                k: "tip",
              },
            ],
          },
        ],
      },
      {
        t: "Mümkün olduğunca çok kedibalığı tut.",
        c: ["Tüm balıkları + fazla kumsal toplanabilirlerini Willy'nin dükkanında sat ve yem al."],
      },
    ],
    4: [
      {
        t: "150 odun elde et.",
        c: [
          {
            t: "Önümüzdeki iki günde 2 sandık ve bir korkuluk gerekecek.",
            k: "reason",
          },
        ],
      },
      "Dağ Gölü'nde balık tut.",
    ],
    5: [
      {
        t: "Kazmanı bakır kazmaya yükselt (2,000g).",
        c: [
          {
            t: "Madenlerin 10. katında 5 bakır külçesi yap ve kazmayı Clint'e bırak.",
            c: [
              {
                t: "Clint kapanmadan bırak (5 külçeyi en geç 15:00'e kadar bitir).",
                k: "warn",
              },
            ],
          },
        ],
      },
      {
        t: "Tohum ek ve Dağ Gölü'nde balık tut.",
        c: [
          "Lahana tohumu (Çiftçilik 2 için) artı fasulye, karnabahar ve patates tohumu al ve ek.",
        ],
      },
      {
        t: "Sonraki için stok yap.",
        c: [
          {
            t: "Kafatası Mağarası için yeşim, zümrüt, yakut ve elması sakla.",
            k: "tip",
          },
          { t: "Bir korkuluk için bir kömür sakla.", k: "tip" },
        ],
      },
    ],
    6: [
      {
        t: "Çelik kazma yükseltmesi (5,000g) ve altın cevheri için biriktir.",
        c: ["Dağ Gölü'nde demir külçeleri + satılabilir balık için balık tut."],
      },
      {
        t: "Halkevi ara sahnesini tetikle ve Altın Parşömen'e dokun (görevi başlatır).",
        c: [
          { t: "Kasabaya otobüs durağından girdiğinde tetiklenir.", k: "tip" },
        ],
      },
      "Bir korkuluk yap ve koy.",
    ],
    7: [
      {
        t: "Kazmanı çelik kazmaya yükselt (5,000g).",
        c: ["Demirci'den altın cevheri al, sonra yükselt."],
      },
      "Büyücü ile buluş (bir ara sahne tetikler).",
      "Dağ Gölü'nde balık tut ve altın külçeleri erit.",
    ],
    8: [
      {
        t: "Altın kazma (10,000g) ve sırt çantası (2,000g) yükseltmeleri için 12,000g biriktir.",
        c: ["Dağ Gölü'nde satılabilir eşyalar için balık tut."],
      },
      {
        t: "5 altın külçesi erit ve onları tutarak uyu.",
        c: [
          {
            t: "Aşırı yorgunluğu önlemek için %50 enerjiyle uyan (beceri atlamadan ilk gün).",
            k: "warn",
          },
        ],
      },
    ],
    9: [
      "Altın kazmaya yükselt (10,000g) ve sırt çantanı yükselt (2,000g).",
      "Dağ Gölü'nde balık tut (Balıkçılık 10 → Oltacı mesleği).",
    ],
    10: [
      {
        t: "Çiftçilik 6 için gereken lahana tohumlarını hesapla ve yarısı için biriktir.",
        c: [
          {
            t: "Gerekenden fazla fıskiye yapmamak için lahanayı iki partide ek.",
            k: "tip",
          },
          {
            t: "Balıkçılık 10 değilsen, gönderme — yarın doğrudan Willy'ye sat.",
            k: "tip",
          },
        ],
      },
      {
        t: "Yarınki Madenler için bir ocak al.",
        c: [{ t: "Bayılmadan önce unutma.", k: "warn" }],
      },
    ],
    11: [
      {
        t: "Lahanayı topla (Çiftçilik 2) ve 2. parti lahana tohumunu al + ek (6,020g).",
        c: [
          "Kareleri fıskiye düzeninde çapala (sulamadan).",
          { t: "Lahanayı İlkbahar 14'e kadar sulamak gerekmez.", k: "tip" },
        ],
      },
      "Madenlerde kaz ve külçe erit.",
    ],
    12: [
      {
        t: "Bakır ve demir kaz ve erit.",
        c: ["Madencilik 5. seviyede Madenci mesleğini seç."],
      },
    ],
    13: [
      {
        t: "Madenlerde inmeye ve kazmaya devam et.",
        c: [
          { t: "Bir şeye ihtiyacın yoksa Yumurta Festivali'ni atla (zaman kaybı).", k: "tip" },
        ],
      },
    ],
    14: [
      {
        t: "Fıskiyeler için cevher kazarak Madenlerin 120. katına doğru in.",
        c: ["Eksikse, 21./41. katta demir/altın cevheri kaz."],
      },
      {
        t: "Mahzen paketi için altın gönder (42,500g).",
        c: [
          {
            t: "Eksikse, yalnızca 32,500g'ye git ve yarınki 10,000g'lik paketi atla.",
            k: "tip",
          },
        ],
      },
      "Evde mümkün olduğunca çok fıskiye yap.",
    ],
    15: [
      {
        t: "Halkevi paketlerini tamamla.",
        c: [
          "İlkbahar toplama, ilkbahar ekinleri, demirci, jeolog ve maceraperest paketleri için eşyaları getir ve teslim et.",
          { t: "Yeterli paran varsa (42,500g), Mahzen paketini de tamamla.", k: "tip" },
          {
            t: "Hatalı ara sahnede takılmamak için Altın Parşömen'den çık.",
            k: "warn",
          },
        ],
      },
      "Bir kristalaryum koy ve içine bir elmas koy.",
      {
        t: "2:00'ye kadar kaz.",
        c: [{ t: "Maden arabaları günün sonunda açılır.", k: "tip" }],
      },
    ],
    16: [
      {
        t: "Kaz ve daha fazla fıskiye yap.",
        c: [{ t: "Maden arabasıyla daha hızlı seyahat et.", k: "tip" }],
      },
    ],
    17: [
      {
        t: "Madenlerin 120. katını bitir ve Mahzen'i tamamla (42,500g).",
        c: [
          {
            t: "İkisi de kaldıysa, aynı günde bitecek şekilde zamanla (otobüs ertesi gün onarılır).",
            k: "tip",
          },
        ],
      },
      "Kafatası Mağarası'nı mümkün olduğunca sık yap.",
      {
        t: "Boş zamanında sonraki ekinleri hazırla.",
        c: [
          "Çiftlik molozunu temizle ve kaliteli fıskiyelerin geleceği yere zemin döşemesi yerleştir.",
          "Daha fazla korkuluk ve ocak yap ve meşe ormanı büyütmek için meşe palamudu ek.",
        ],
      },
    ],
    18: [
      "Bakır balta yükseltmesi (2,000g) ve 2. parti lahana tohumu için altın gönder.",
    ],
    19: [
      "Baltanı bakır baltaya yükselt (2,000g).",
      "Pierre'den 2. parti lahana tohumunu al.",
    ],
    20: [
      "1. lahanayı topla ve 2. ekini ek.",
      "Çelik balta yükseltmesi (5,000g) için altın gönder.",
    ],
    21: [
      "Baltanı çelik baltaya yükselt (5,000g).",
      {
        t: "(İsteğe bağlı) Her eşyayı gönderme meydan okumasına gidiyorsan, lale soğanı ve maviruh tohumu ek.",
        c: [{ t: "İlkbahar 28'e hazır olurlar.", k: "reason" }],
      },
    ],
    22: ["Bakır çapa yükseltmesi (2,000g) için altın gönder."],
    23: [
      "Çapanı bakır çapaya yükselt (2,000g).",
      {
        t: "Şanssız bir günde çiftlik alanını temizle ve fıskiyeleri hazırla (en geç 27'ye kadar).",
        c: [
          {
            t: "Mola vermeden önce önce Madencilik 10. seviyeye ulaş (İlkbahar 25'ten önce Demirci mesleği gerekli).",
            k: "warn",
          },
          {
            t: "Korkulukları ve yaban havucu tohumlarını da koy (dolgu).",
            k: "warn",
          },
        ],
      },
    ],
    24: [
      {
        t: "Yarın için mümkün olduğunca çok altın topla.",
        c: ["Mümkün olduğunca çok gönder."],
      },
    ],
    25: [
      "Yaz 2'de kaç yıldızmeyvesi tohumu ekeceğini planla (~400–500 hedefle).",
      "Çapanı çelik çapaya yükselt (5,000g).",
      {
        t: "Vaha'da Üstün Hızlı-Ek al (her yıldızmeyvesi tohumu için bir tane).",
        c: [{ t: "Vaha onu yalnızca perşembeleri satar.", k: "reason" }],
      },
    ],
    26: ["Özel bir şey yok. Kafatası Mağarası vb. yap."],
    27: [
      "2. lahanayı topla (Çiftçilik 6).",
      "Çelik çapayı Clint'ten al.",
    ],
    28: [
      {
        t: "Kaliteli fıskiyeler yap ve dolgu ekini (yaban havucu) ek.",
        c: [
          {
            t: "Yaban havuçlarına Üstün Hızlı-Ek kullanma (Yaz 1'e devretmemeleri gerekir).",
            k: "warn",
          },
        ],
      },
      "Yarın için mümkün olduğunca çok altın gönder.",
    ],
  },
  summer: {
    1: [
      {
        t: "Özel bir şey yok. Kafatası Mağarası vb. yap.",
        c: [
          {
            t: "Yaban havuçlarını biçme (Ziraatçı mesleği 3. yıldızmeyvesini etkiler).",
            k: "warn",
          },
        ],
      },
    ],
    2: [
      {
        t: "1. yıldızmeyvesini Üstün Hızlı-Ek ile ek.",
        c: ["Yıldızmeyvesi tohumlarının geri kalanını Vaha'da al ve ek."],
      },
      {
        t: "Boş zamanında stok yap.",
        c: [
          "10–20 paratoner yap.",
          "Meşelere akıtaç koy ve meşe ormanını büyütmek için meşe palamudu ek.",
        ],
      },
    ],
    3: [
      {
        t: "Kafatası Mağarası'nı yap.",
        c: [
          {
            t: "İridyum kazma yükseltmesi için 25,000g gerekir.",
            k: "reason",
          },
        ],
      },
    ],
    4: [
      "İridyum külçeleri erit ve iridyum kazmaya yükselt.",
      {
        t: "Toplayıcılık 7. seviyeyi hedeflerken meşe reçinesi ve kereste topla.",
        c: [
          "Toplayıcılık deneyimi kazanmak için yaz tohumları yap ve topla.",
          "Kereste için Gizli Koru kütüklerini kes.",
          {
            t: "Gelecekteki gidiş-gelişleri azaltmak için 100 keresteyle At Ahırı'nı al.",
            k: "tip",
          },
        ],
      },
    ],
    5: ["Kafatası Mağarası'nı yap, 2. parti yıldızmeyvesi tohumu için biriktir."],
    9: ["2. parti yıldızmeyvesi tohumunu almaya yetecek kadar gönder."],
    10: [
      {
        t: "2. parti yıldızmeyvesi tohumunu al.",
        c: [{ t: "Vaha yarın Luau için kapanıyor, bu yüzden bugün al.", k: "reason" }],
      },
    ],
    11: [
      {
        t: "Topla/yeniden ek işlemini tekrarla ve tüm yıldızmeyvesini fıçılara koy.",
        c: [
          "Mümkün olduğunca çok meşeye akıtaç tak ve mümkün olduğunca çok fıçı yap.",
          {
            t: "Zanaatkâr'a geçene kadar şarap satma.",
            k: "warn",
          },
        ],
      },
      "Günün sonunda Çiftçilik 10'a ulaşırsın (Ziraatçı mesleği).",
    ],
    13: [
      "Paketler/görevler için diğer yaz ekinlerini al ve ek (en geç Yaz 21'e kadar).",
    ],
    19: ["3. yıldızmeyvesi için yeterli gönder."],
    20: ["Yıldızmeyvesini topla ve yeniden ek (2. parti tohumu Vaha'da al)."],
    24: [
      {
        t: "Daha fazla Üstün Hızlı-Ek almaya yetecek kadar gönder.",
        c: [
          {
            t: "Tüm çiftliği bal kabağıyla kaplayacaksın, bu yüzden ek Hızlı-Ek gerekir.",
            k: "reason",
          },
        ],
      },
    ],
    25: [
      {
        t: "Kaliteli fıskiyeler ve ek Üstün Hızlı-Ek yerleştir.",
        c: [
          {
            t: "Buğdayın Sonbahar 2'de hazır olması için Yaz 28'de sula.",
            k: "reason",
          },
        ],
      },
    ],
    26: ["Özel bir şey yok (her zaman fırtınalı bir gün)."],
    27: ["Yarın tüm çiftliği kaplamak için buğday tohumu almaya yetecek kadar gönder."],
    28: [
      "Yıldızmeyvesini topla.",
      {
        t: "Tüm çiftliğe buğday tohumu ek (dolgu).",
        c: [
          {
            t: "Yalnızca Ziraatçı mesleğiyle geçerli (3. bal kabağı için).",
            k: "warn",
          },
        ],
      },
    ],
  },
  fall: {
    1: [
      "Çiftliği kaplamak için bal kabağı tohumu almaya yetecek kadar gönder.",
      {
        t: "(İsteğe bağlı) Müze için Toplayıcılık 10. seviye ve İzci mesleğini hazırla.",
        c: [
          {
            t: "Akçaağaç tohumları ve çam kozalaklarıyla bir orman ekip kesmek verimlidir.",
            k: "tip",
          },
        ],
      },
    ],
    2: [
      {
        t: "Buğdayı topla ve tüm çiftliğe bal kabağı tohumu ek.",
        c: [
          {
            t: "Bal kabakları kızılcıktan daha iyidir, çünkü yeterli fıçın olmayacak.",
            k: "reason",
          },
        ],
      },
    ],
    9: [
      {
        t: "Yıldızmeyvesi Şarabı satmaya başlamak için Zanaatkâr'a geç.",
        c: ["Belirsizlik Heykelciği'nde Ziraatçı → Zanaatkâr geç."],
      },
      {
        t: "Yarın için tohumları önceden al.",
        c: [{ t: "Pierre çarşamba günü kapalı, bu yüzden bugün al.", k: "reason" }],
      },
    ],
    10: ["1. bal kabağını topla ve yeniden ek."],
  },
  winter: {
    1: [
      {
        t: "Halkevi'nin kalan paketlerini tamamla.",
        c: [
          {
            t: "Zencefil Adası'nı ve ada çiftliğini açmak, ana gelir olarak tekrar toplu yıldızmeyvesi ekmeni sağlar.",
            k: "reason",
          },
        ],
      },
    ],
  },
};
