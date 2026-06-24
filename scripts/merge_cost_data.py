#!/usr/bin/env python3
"""
파싱된 데이터와 기존 costMaterials.json을 병합하여 최종 JSON 생성.
- 기존 4개 가게 (carpenter/blacksmith/wizard/desertTrader)는 기존 데이터를 우선 유지
- 기존에 없는 항목만 파싱 데이터에서 추가
- 신규 가게는 파싱 데이터 그대로 사용
- 배열 순서 정리
"""

import json, os, sys

BASE = os.path.join(os.path.dirname(__file__), "..")
EXISTING = os.path.join(BASE, "src", "data", "costMaterials.json")
DRAFT = os.path.join(BASE, "src", "data", "costMaterials_draft.json")
OUTPUT = os.path.join(BASE, "src", "data", "costMaterials.json")
REPORT = os.path.join(BASE, "progress", "_costmaterials_report.txt")

# 권장 가게 순서
SHOP_ORDER = [
    "pierre", "carpenter", "blacksmith", "wizard", "clinic", "joja",
    "saloon", "sewers", "ranch", "fishShop", "adventurersGuild",
    "travelingCart", "oasis", "desertTrader", "casino",
    "islandTrader", "qiWalnutRoom"
]

def main():
    rpt = []
    def log(msg):
        rpt.append(msg)
        print(msg)

    with open(EXISTING, "r", encoding="utf-8") as f:
        existing = json.load(f)
    with open(DRAFT, "r", encoding="utf-8") as f:
        draft = json.load(f)

    existing_by_id = {s["id"]: s for s in existing}
    draft_by_id = {s["id"]: s for s in draft}

    log("=" * 60)
    log("병합 리포트")
    log("=" * 60)

    final_shops = []

    for shop_id in SHOP_ORDER:
        ex = existing_by_id.get(shop_id)
        dr = draft_by_id.get(shop_id)

        if shop_id in ("carpenter", "wizard", "desertTrader"):
            # 이 3개는 기존 데이터가 이미 재료(materials) 포함이므로 기존 유지
            if ex:
                log(f"\n{shop_id}: 기존 {len(ex['offers'])}개 유지 (재료 포함)")
                final_shops.append(ex)
            continue

        if shop_id == "blacksmith":
            # 기존 4개(도구 업그레이드) + 파싱에서 판매 물품·정동석 추가
            if ex and dr:
                existing_ens = {o["en"] for o in ex["offers"]}
                added = []
                for offer in dr["offers"]:
                    # 도구 업그레이드는 이미 기존에 있으므로 판매 물품만 추가
                    if offer["en"] not in existing_ens:
                        added.append(offer)
                        existing_ens.add(offer["en"])
                merged = ex["offers"] + added
                log(f"\n{shop_id}: 기존 {len(ex['offers'])}개 + 추가 {len(added)}개 = {len(merged)}개")
                for a in added:
                    log(f"  [추가] {a['ko']} / {a['en']} / gold={a['gold']}")
                final_shops.append({"id": shop_id, "offers": merged})
            elif ex:
                final_shops.append(ex)
            continue

        # 신규 가게
        if dr and dr["offers"]:
            log(f"\n{shop_id}: 신규 {len(dr['offers'])}개")
            final_shops.append(dr)
        elif shop_id in ("travelingCart", "islandTrader", "qiWalnutRoom"):
            log(f"\n{shop_id}: 파싱 데이터 없음 (별도 처리 필요)")
        else:
            log(f"\n{shop_id}: 데이터 없음, 건너뜀")

    # 최종 JSON 저장
    log(f"\n{'='*60}")
    log("최종 결과")
    log(f"{'='*60}")
    log(f"총 {len(final_shops)}개 가게, {sum(len(s['offers']) for s in final_shops)}개 offers")
    for s in final_shops:
        log(f"  {s['id']}: {len(s['offers'])}개")

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(final_shops, f, ensure_ascii=False, indent=1)

    log(f"\n저장: {OUTPUT}")

    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(rpt))

if __name__ == "__main__":
    main()
