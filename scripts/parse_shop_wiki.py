#!/usr/bin/env python3
"""각 가게 위키 HTML의 판매표를 정밀 덤프하여 JSON 데이터를 구성"""

import os, re, json, sys
from bs4 import BeautifulSoup

PROGRESS = os.path.join(os.path.dirname(__file__), "..", "progress")
EXISTING = os.path.join(os.path.dirname(__file__), "..", "src", "data", "costMaterials.json")
OUTPUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "costMaterials_draft.json")
REPORT = os.path.join(PROGRESS, "_costmaterials_report.txt")

rpt = []
def log(msg):
    rpt.append(msg)
    print(msg)

def parse_gold(text):
    text = re.sub(r"[골드gG\s]", "", text.strip())
    text = text.replace(",", "")
    m = re.search(r"(\d+)", text)
    return int(m.group(1)) if m else 0

def gold_td(td):
    dsv = td.get("data-sort-value")
    if dsv:
        try: return int(dsv)
        except: pass
    return parse_gold(td.get_text())

def img_en(td):
    img = td.find("img")
    if img:
        return img.get("alt", "").replace(".png", "").replace(".gif", "").strip()
    return ""

def link_ko(td):
    a = td.find("a")
    if a: return a.get_text().strip()
    return td.get_text().strip()

def iname(en):
    n = en.replace(" ", "_").replace("'", "_").replace(":", "")
    n = re.sub(r"[^\w\-.]", "_", n)
    n = re.sub(r"_+", "_", n)
    return n

def mk_offer(ko, en, gold, materials=None, day=None, note=None):
    o = {"ko": ko, "en": en, "icon": f"/icons/costMaterials/{iname(en)}.png", "gold": gold, "materials": materials or []}
    if day: o["day"] = day
    if note: o["note"] = note
    return o

def mk_mat(ko, en, qty):
    return {"ko": ko, "en": en, "icon": f"/icons/costMaterials/{iname(en)}.png", "qty": qty}

def load_soup(fname):
    path = os.path.join(PROGRESS, fname)
    if not os.path.exists(path):
        log(f"  [누락] {fname}")
        return None
    with open(path, "r", encoding="utf-8") as f:
        return BeautifulSoup(f.read(), "html.parser")

def parse_mat_td(td):
    """재료 td에서 (en, qty) 쌍 추출"""
    mats = []
    imgs = td.find_all("img")
    for img in imgs:
        en = img.get("alt", "").replace(".png", "").strip()
        if en in ("Gold", ""): continue
        # 다음 텍스트에서 수량
        qty = 1
        for sib in img.next_siblings:
            if isinstance(sib, str):
                m = re.search(r"(\d+)", sib.strip())
                if m:
                    qty = int(m.group(1))
                break
            else:
                break
        mats.append((en, qty))
    return mats

# ══════════════════════════════════════════════
# 대장간
# ══════════════════════════════════════════════
def do_blacksmith():
    log("\n=== 대장간 (blacksmith) ===")
    soup = load_soup("대장간 - Stardew Valley Wiki.html")
    if not soup: return []
    tables = soup.find_all("table", class_="wikitable")
    offers = []

    # 표0: 판매 물품(석탄 등) - 5행 (아이템/이름/설명/1년차가격/2년차가격)
    log("  표0: 판매 물품")
    for row in tables[0].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 4: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        g = gold_td(tds[3])
        note_text = ""
        if len(tds) > 4:
            g2 = gold_td(tds[4])
            if g2 != g:
                note_text = f"1년차 {g}골드 / 2년차부터 {g2}골드"
                g = g  # 1년차 가격을 기본으로
        log(f"    {ko} / {en} / gold={g}")
        offers.append(mk_offer(ko, en, g, note=note_text if note_text else None))

    # 표1-2: 도구 업그레이드 (사진/이름/재료/비용)
    for ti in [1, 2]:
        label = "도구 업그레이드" if ti == 1 else "도구 업그레이드(계속)"
        log(f"  표{ti}: {label}")
        for row in tables[ti].find_all("tr")[1:]:
            tds = row.find_all("td")
            if len(tds) < 3: continue
            en = img_en(tds[0])
            ko = link_ko(tds[1])
            mat_pairs = parse_mat_td(tds[2])
            g = gold_td(tds[3]) if len(tds) > 3 else 0
            materials = [mk_mat(p[0], p[0], p[1]) for p in mat_pairs]
            log(f"    {ko} / {en} / gold={g} / mats={[(m['en'],m['qty']) for m in materials]}")
            offers.append(mk_offer(ko, en, g, materials=materials))

    # 표3: 정동석 가공 (사진/이름/설명/비용)
    log("  표3: 정동석 가공")
    for row in tables[3].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 3: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        g = gold_td(tds[3]) if len(tds) > 3 else gold_td(tds[-1])
        log(f"    {ko} / {en} / gold={g}")
        offers.append(mk_offer(ko, en, g))

    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 피에르네 잡화점
# ══════════════════════════════════════════════
def do_pierre():
    log("\n=== 잡화점 (pierre) ===")
    soup = load_soup("피에르네 잡화점 - Stardew Valley Wiki.html")
    if not soup: return []
    
    offers = []
    current_section = "상시"
    
    for elem in soup.find_all(["h2", "table"]):
        if elem.name == "h2":
            span = elem.find("span", class_="mw-headline")
            if span:
                txt = span.get_text().strip()
                if "상시" in txt: current_section = "상시"
                elif "봄" in txt and "한정" in txt: current_section = "봄 한정"
                elif "여름" in txt and "한정" in txt: current_section = "여름 한정"
                elif "가을" in txt and "한정" in txt: current_section = "가을 한정"
                elif "플레이어" in txt: current_section = "해금"
                else: current_section = "skip"
        elif elem.name == "table" and "wikitable" in (elem.get("class") or []):
            if current_section == "skip": continue
            log(f"  섹션: {current_section}")
            count = 0
            for row in elem.find_all("tr")[1:]:
                tds = row.find_all("td")
                if len(tds) < 3: continue
                en = img_en(tds[0])
                ko = link_ko(tds[1])
                full = tds[1].get_text().strip()
                g = gold_td(tds[-1])
                
                # 벽지/바닥재 제외
                if "벽지" in ko or "바닥재" in ko: continue
                # 카탈로그 제외? 아니, 포함
                
                note = None
                if current_section == "봄 한정": note = "봄 한정"
                elif current_section == "여름 한정": note = "여름 한정"
                elif current_section == "가을 한정": note = "가을 한정"
                
                # 제작법 표시
                if "제작법" in full:
                    if "(제작법)" not in ko: ko = ko + " (제작법)"
                
                # 2년차 조건
                if len(tds) > 2:
                    desc = tds[2].get_text()
                    if "2년차" in desc:
                        note = (note + " / " if note else "") + "2년차 이후"
                
                if not en: en = ko
                offers.append(mk_offer(ko, en, g, note=note))
                count += 1
            log(f"    {count}개 추출")
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 하비의 병원
# ══════════════════════════════════════════════
def do_clinic():
    log("\n=== 하비의 병원 (clinic) ===")
    soup = load_soup("하비의 병원 - Stardew Valley Wiki.html")
    if not soup: return []
    tables = soup.find_all("table", class_="wikitable")
    offers = []
    
    # 표0만 의약 용품 (사진/이름/설명/효과/구입가)
    log("  표0: 의약 용품")
    for row in tables[0].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 4: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        g = gold_td(tds[-1])
        log(f"    {ko} / {en} / gold={g}")
        if not en: en = ko
        offers.append(mk_offer(ko, en, g))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 조자마트
# ══════════════════════════════════════════════
def do_joja():
    log("\n=== 조자마트 (joja) ===")
    soup = load_soup("조자마트 - Stardew Valley Wiki.html")
    if not soup: return []
    
    offers = []
    current_section = "상시"
    
    for elem in soup.find_all(["h2", "h3", "table"]):
        if elem.name in ("h2", "h3"):
            span = elem.find("span", class_="mw-headline")
            if span:
                txt = span.get_text().strip()
                if "봄" in txt: current_section = "봄 한정"
                elif "여름" in txt: current_section = "여름 한정"
                elif "가을" in txt: current_section = "가을 한정"
                elif "상시" in txt or "판매" in txt or "상점" in txt: current_section = "상시"
                elif any(s in txt for s in ["지역", "멤버", "개발", "연혁", "갤러리", "여담"]): current_section = "skip"
        elif elem.name == "table" and "wikitable" in (elem.get("class") or []):
            if current_section == "skip": continue
            log(f"  섹션: {current_section}")
            count = 0
            for row in elem.find_all("tr")[1:]:
                tds = row.find_all("td")
                if len(tds) < 3: continue
                en = img_en(tds[0])
                ko = link_ko(tds[1])
                g = gold_td(tds[-1])
                if not ko: continue
                if not en: en = ko
                
                note = None
                if current_section == "봄 한정": note = "봄 한정"
                elif current_section == "여름 한정": note = "여름 한정"
                elif current_section == "가을 한정": note = "가을 한정"
                
                offers.append(mk_offer(ko, en, g, note=note))
                count += 1
            log(f"    {count}개 추출")
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 스타드롭 주점
# ══════════════════════════════════════════════
def do_saloon():
    log("\n=== 스타드롭 주점 (saloon) ===")
    soup = load_soup("스타드롭 주점 - Stardew Valley Wiki.html")
    if not soup: return []
    tables = soup.find_all("table", class_="wikitable")
    offers = []
    
    # 표0: 상시 판매 (사진/이름/설명/가격) 16행
    log("  표0: 상시 판매")
    for row in tables[0].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 3: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        g = gold_td(tds[-1])
        if not ko: continue
        if not en: en = ko
        
        # 제작법 확인
        full = tds[1].get_text().strip()
        if "제작법" in full and "(제작법)" not in ko:
            ko = ko + " (제작법)"
        
        log(f"    {ko} / {en} / gold={g}")
        offers.append(mk_offer(ko, en, g))
    
    # 표1: 요리 로테이션 (42행) - 복잡하므로 간략 처리
    log("  표1: 요리 로테이션 (42행)")
    for row in tables[1].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 2: continue
        en = img_en(tds[0])
        ko = link_ko(tds[0])
        # 가격은 접이식 안에 있을 수 있음
        g = 0
        for td in tds:
            text = td.get_text()
            if "골드" in text:
                g = parse_gold(text)
                break
            dsv = td.get("data-sort-value")
            if dsv:
                try: g = int(dsv)
                except: pass
                break
        if not ko: continue
        if not en: en = ko
        log(f"    {ko} / {en} / gold={g}")
        offers.append(mk_offer(ko, en, g, note="요리 로테이션"))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 크로버스 (하수도)
# ══════════════════════════════════════════════
def do_krobus():
    log("\n=== 크로버스/하수도 (sewers) ===")
    soup = load_soup("크로버스 - Stardew Valley Wiki.html")
    if not soup: return []
    
    offers = []
    current_section = ""
    
    for elem in soup.find_all(["h2", "h3", "table"]):
        if elem.name in ("h2", "h3"):
            span = elem.find("span", class_="mw-headline")
            if span: current_section = span.get_text().strip()
        elif elem.name == "table" and "wikitable" in (elem.get("class") or []):
            # 상점 관련 표만 처리
            if any(s in current_section for s in ["선물", "일정", "관계", "영화", "퀘스트", "대사", "갤러리", "연혁"]):
                continue
            if "상점" not in current_section and "판매" not in current_section:
                continue
            
            log(f"  섹션: {current_section}")
            rows = elem.find_all("tr")
            headers = [th.get_text().strip() for th in rows[0].find_all("th")] if rows else []
            log(f"    헤더: {headers}")
            
            for row in rows[1:]:
                tds = row.find_all("td")
                if len(tds) < 3: continue
                en = img_en(tds[0])
                ko = link_ko(tds[1])
                g = gold_td(tds[-1])
                if not ko: continue
                if not en: en = ko
                
                # 요일 정보 확인
                day = None
                for td in tds:
                    text = td.get_text().strip()
                    days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
                    for d in days:
                        if d in text: day = d; break
                
                log(f"    {ko} / {en} / gold={g} / day={day}")
                offers.append(mk_offer(ko, en, g, day=day))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 마니의 목장
# ══════════════════════════════════════════════
def do_ranch():
    log("\n=== 마니의 목장 (ranch) ===")
    soup = load_soup("마니의 목장 - Stardew Valley Wiki.html")
    if not soup: return []
    tables = soup.find_all("table", class_="wikitable")
    offers = []
    
    # 표0: 상점 물품 (사진/이름/설명/가격)
    log("  표0: 상점 물품")
    for row in tables[0].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 3: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        g = gold_td(tds[-1])
        if not ko: continue
        if not en: en = ko
        log(f"    {ko} / {en} / gold={g}")
        offers.append(mk_offer(ko, en, g))
    
    # 표1: 가축 목록 (사진/이름/설명/가격/필요건물)
    log("  표1: 가축 목록")
    for row in tables[1].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 4: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        g = gold_td(tds[3])
        note = None
        if len(tds) > 4:
            bldg = link_ko(tds[4])
            if bldg: note = bldg + " 필요"
        if not ko: continue
        if not en: en = ko
        log(f"    {ko} / {en} / gold={g} / note={note}")
        offers.append(mk_offer(ko, en, g, note=note))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 생선 가게
# ══════════════════════════════════════════════
def do_fish_shop():
    log("\n=== 생선 가게 (fishShop) ===")
    soup = load_soup("생선 가게 - Stardew Valley Wiki.html")
    if not soup: return []
    tables = soup.find_all("table", class_="wikitable")
    offers = []
    
    # 표0: 물품 (아이템/설명/가격/필요낚시레벨)
    log("  표0: 물품")
    for row in tables[0].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 3: continue
        # 이 표는 아이콘+이름이 한 td에 있을 수 있음
        en = img_en(tds[0])
        ko = link_ko(tds[0])
        g = gold_td(tds[2]) if len(tds) > 2 else 0
        
        note = None
        if len(tds) > 3:
            level_text = tds[3].get_text().strip()
            if level_text and level_text != "-":
                note = f"낚시 레벨 {level_text}"
        
        if not ko: continue
        if not en: en = ko
        log(f"    {ko} / {en} / gold={g} / note={note}")
        offers.append(mk_offer(ko, en, g, note=note))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 모험가의 길드
# ══════════════════════════════════════════════
def do_adventurers():
    log("\n=== 모험가의 길드 (adventurersGuild) ===")
    soup = load_soup("모험가의 길드 - Stardew Valley Wiki.html")
    if not soup: return []
    
    offers = []
    current_section = ""
    
    for elem in soup.find_all(["h2", "h3", "table"]):
        if elem.name in ("h2", "h3"):
            span = elem.find("span", class_="mw-headline")
            if span: current_section = span.get_text().strip()
        elif elem.name == "table" and "wikitable" in (elem.get("class") or []):
            if any(s in current_section for s in ["몬스터", "보상", "갤러리", "연혁", "목표"]):
                continue
            
            rows = elem.find_all("tr")
            if not rows: continue
            headers = [th.get_text().strip() for th in rows[0].find_all("th")]
            log(f"  섹션: {current_section}, 헤더: {headers}")
            
            for row in rows[1:]:
                tds = row.find_all("td")
                if len(tds) < 3: continue
                en = img_en(tds[0])
                ko = link_ko(tds[1])
                g = gold_td(tds[-1])
                if not ko: continue
                if not en: en = ko
                log(f"    {ko} / {en} / gold={g}")
                offers.append(mk_offer(ko, en, g))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 카지노
# ══════════════════════════════════════════════
def do_casino():
    log("\n=== 카지노 (casino) ===")
    soup = load_soup("카지노 - Stardew Valley Wiki.html")
    if not soup: return []
    tables = soup.find_all("table", class_="wikitable")
    offers = []
    
    # 표0: 상점 (사진/이름/설명/가격=Qi코인)
    log("  표0: 상점")
    for row in tables[0].find_all("tr")[1:]:
        tds = row.find_all("td")
        if len(tds) < 3: continue
        en = img_en(tds[0])
        ko = link_ko(tds[1])
        # 가격은 Qi 코인
        price_text = tds[-1].get_text().strip()
        qi = parse_gold(price_text)
        if not ko: continue
        if not en: en = ko
        note = f"카지노 코인 {qi:,}" if qi > 0 else None
        log(f"    {ko} / {en} / qi={qi}")
        offers.append(mk_offer(ko, en, 0, note=note))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 오아시스
# ══════════════════════════════════════════════
def do_oasis():
    log("\n=== 오아시스 (oasis) ===")
    soup = load_soup("오아시스 - Stardew Valley Wiki.html")
    if not soup: return []
    
    offers = []
    current_section = ""
    
    for elem in soup.find_all(["h2", "h3", "table"]):
        if elem.name in ("h2", "h3"):
            span = elem.find("span", class_="mw-headline")
            if span:
                txt = span.get_text().strip()
                current_section = txt
        elif elem.name == "table" and "wikitable" in (elem.get("class") or []):
            if any(s in current_section for s in ["갤러리", "연혁", "일정", "NPC"]):
                continue
            
            rows = elem.find_all("tr")
            if not rows: continue
            headers = [th.get_text().strip() for th in rows[0].find_all("th")]
            log(f"  섹션: {current_section}, 헤더: {headers}, {len(rows)}행")
            
            for row in rows[1:]:
                tds = row.find_all("td")
                if len(tds) < 3: continue
                en = img_en(tds[0])
                ko = link_ko(tds[1])
                g = gold_td(tds[-1])
                if not ko: continue
                if not en: en = ko
                
                # 요일 확인
                day = None
                for td in tds:
                    text = td.get_text().strip()
                    days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
                    for d in days:
                        if d in text: day = d; break
                    if day: break
                
                log(f"    {ko} / {en} / gold={g} / day={day}")
                offers.append(mk_offer(ko, en, g, day=day))
    
    log(f"  총 {len(offers)}개")
    return offers

# ══════════════════════════════════════════════
# 메인
# ══════════════════════════════════════════════
def main():
    log("=" * 60)
    log("비용 및 재료 - 위키 HTML 정밀 파싱")
    log("=" * 60)
    
    # 기존 데이터
    with open(EXISTING, "r", encoding="utf-8") as f:
        existing = json.load(f)
    existing_by_id = {s["id"]: s for s in existing}
    log(f"\n기존: {sum(len(s['offers']) for s in existing)}개 offers in {len(existing)} shops")
    
    # 각 가게 파싱
    results = {}
    results["pierre"] = do_pierre()
    results["blacksmith"] = do_blacksmith()
    results["clinic"] = do_clinic()
    results["joja"] = do_joja()
    results["saloon"] = do_saloon()
    results["sewers"] = do_krobus()
    results["ranch"] = do_ranch()
    results["fishShop"] = do_fish_shop()
    results["adventurersGuild"] = do_adventurers()
    results["casino"] = do_casino()
    results["oasis"] = do_oasis()
    
    # 결과 출력
    log(f"\n{'='*60}")
    log("파싱 요약")
    log(f"{'='*60}")
    for sid, offers in results.items():
        ex = len(existing_by_id.get(sid, {}).get("offers", []))
        log(f"  {sid}: 파싱 {len(offers)}개 (기존 {ex}개)")
    
    # JSON 덤프
    all_shops = []
    for sid, offers in results.items():
        all_shops.append({"id": sid, "offers": offers})
    
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(all_shops, f, ensure_ascii=False, indent=1)
    
    log(f"\n출력: {OUTPUT}")
    
    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(rpt))
    log(f"리포트: {REPORT}")

if __name__ == "__main__":
    main()
