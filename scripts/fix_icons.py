#!/usr/bin/env python3
import json, os, shutil, re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
JSON_PATH = os.path.join(BASE_DIR, "src", "data", "costMaterials.json")
ICONS_DIR = os.path.join(BASE_DIR, "public", "icons")
PROGRESS_DIR = os.path.join(BASE_DIR, "progress")
REPORT_PATH = os.path.join(PROGRESS_DIR, "_costmaterials_icons_report.txt")

# Load JSON
with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

# Build a map of existing icons in public/icons
existing_icons = {}
for root, dirs, files in os.walk(ICONS_DIR):
    for file in files:
        if file.endswith(".png"):
            # e.g., public/icons/seeds/Apple_Sapling.png -> /icons/seeds/Apple_Sapling.png
            rel_path = "/" + os.path.relpath(os.path.join(root, file), os.path.join(BASE_DIR, "public")).replace("\\", "/")
            # Use lowercase for case-insensitive matching
            base = os.path.splitext(file)[0].lower()
            if base not in existing_icons:
                existing_icons[base] = []
            existing_icons[base].append(rel_path)

# Build a map of wiki files
wiki_files = []
for d in os.listdir(PROGRESS_DIR):
    if d.endswith("_files") and os.path.isdir(os.path.join(PROGRESS_DIR, d)):
        dir_path = os.path.join(PROGRESS_DIR, d)
        for f in os.listdir(dir_path):
            if f.endswith(".png"):
                wiki_files.append((f, os.path.join(dir_path, f)))

reused = []
copied = []
missing = []

def find_wiki_file(en_name, target_base):
    # Try to find a matching file in wiki _files
    # e.g. target_base: 'Apple_Sapling'
    # en_name: 'Apple Sapling'
    candidates = [
        f"{en_name}.png",
        f"48px-{en_name}.png",
        f"24px-{en_name}.png",
        f"{target_base}.png",
        f"48px-{target_base}.png",
        f"24px-{target_base}.png"
    ]
    candidates_lower = [c.lower() for c in candidates]
    
    best_match = None
    # Prioritize 48px
    for fname, fpath in wiki_files:
        fl = fname.lower()
        if fl in candidates_lower:
            if "48px" in fl:
                return fpath
            best_match = fpath
    
    # Fuzzy match
    if not best_match:
        for fname, fpath in wiki_files:
            fl = fname.lower()
            if target_base.lower().replace("_", "") in fl.replace("_", "").replace(" ", ""):
                if "48px" in fl:
                    return fpath
                best_match = fpath
                
    return best_match

def process_icon(obj):
    icon_path = obj.get("icon")
    if not icon_path: return
    full_path = os.path.join(BASE_DIR, "public", icon_path.lstrip("/"))
    if os.path.exists(full_path):
        return # Already exists
        
    en_name = obj.get("en", "")
    target_base = os.path.splitext(os.path.basename(icon_path))[0]
    target_base_lower = target_base.lower()
    
    # 1. Reuse existing
    if target_base_lower in existing_icons:
        # Prefer non-costMaterials path if possible
        paths = existing_icons[target_base_lower]
        chosen = paths[0]
        for p in paths:
            if "costMaterials" not in p:
                chosen = p
                break
        obj["icon"] = chosen
        reused.append(f"{icon_path} -> {chosen}")
        return
        
    # 2. Copy from wiki files
    wiki_path = find_wiki_file(en_name, target_base)
    if wiki_path:
        dest_dir = os.path.join(ICONS_DIR, "costMaterials")
        os.makedirs(dest_dir, exist_ok=True)
        dest_path = os.path.join(dest_dir, f"{target_base}.png")
        shutil.copy2(wiki_path, dest_path)
        # Add to existing_icons so we don't copy again
        existing_icons[target_base_lower] = [icon_path]
        copied.append(f"{os.path.basename(wiki_path)} -> {icon_path}")
        return
        
    # 3. Missing
    missing.append(f"[{en_name}] {icon_path}")

# Iterate through JSON
for shop in data:
    for offer in shop.get("offers", []):
        process_icon(offer)
        for mat in offer.get("materials", []):
            process_icon(mat)

# Save JSON
with open(JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=1)

# Report
report = [
    "비용 및 재료 - 아이콘 파일 보강 리포트\n",
    f"1. 재사용 (경로 변경): {len(reused)}개",
]
for r in sorted(reused): report.append(f"  {r}")

report.append(f"\n2. 복사 (_files에서): {len(copied)}개")
for c in sorted(copied): report.append(f"  {c}")

report.append(f"\n3. 출처 없음 (그대로 둠): {len(missing)}개")
for m in sorted(list(set(missing))): report.append(f"  {m}")

with open(REPORT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print(f"Reused: {len(reused)}, Copied: {len(copied)}, Missing: {len(missing)}")
