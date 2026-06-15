"use client";

import { useTranslations } from "next-intl";
import { toYearDay } from "@/lib/calendar";
import type { Memo } from "@/types/schedule";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";

// 카테고리별 아이콘(수확은 작물 이미지)
function iconSrc(m: Memo): string {
  if (m.category === "harvest" && m.cropId) return `/icons/seeds/${m.cropId}.png`;
  if (m.category === "watering") return "/icons/reminders/watering.png";
  if (m.category === "buySeed") return "/icons/reminders/buySeeds.png";
  if (m.category === "eatFood") return "/icons/ui/food.png";
  if (m.category === "misc") return "/icons/addTask/museum.png";
  if (m.category === "tool") return "/icons/addTask/tool.png";
  if (m.category === "machine") return "/icons/addTask/machine.png";
  if (m.category === "build") return "/icons/addTask/build.png";
  return "/icons/ui/note.png";
}

// 박스 안에 ✕가 있는 삭제 버튼 [x]
function DeleteBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-6 shrink-0 items-center justify-center rounded border border-[#e23b3b] text-xs font-bold text-[#e23b3b] hover:bg-[#fbeaea]"
    >
      ✕
    </button>
  );
}

export default function MyTasksDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { memos, deleteMemo, deleteMemos } = useSchedule();

  // 작물별 그룹(추가 순서 유지). 같은 작물을 다른 날 심었으면(groupId가 다르면)
  // 파스닙(1), 파스닙(2)처럼 나눠 표시한다. 작물 없는 메모는 기타로 묶는다.
  const cropOrder: string[] = [];
  const byCrop = new Map<string, Memo[]>();
  const other: Memo[] = [];
  for (const m of memos) {
    if (m.cropId) {
      if (!byCrop.has(m.cropId)) {
        byCrop.set(m.cropId, []);
        cropOrder.push(m.cropId);
      }
      byCrop.get(m.cropId)!.push(m);
    } else {
      other.push(m);
    }
  }

  const groups: { key: string; title: string; list: Memo[] }[] = [];
  for (const cropId of cropOrder) {
    const list = byCrop.get(cropId)!;
    const name = t(`crops.${cropId}`);
    // groupId별 하위 묶음(추가 순서 유지)
    const subOrder: string[] = [];
    const byGroup = new Map<string, Memo[]>();
    for (const m of list) {
      const g = m.groupId ?? "__none__";
      if (!byGroup.has(g)) {
        byGroup.set(g, []);
        subOrder.push(g);
      }
      byGroup.get(g)!.push(m);
    }
    if (subOrder.length <= 1) {
      groups.push({ key: cropId, title: name, list });
    } else {
      subOrder.forEach((g, i) => {
        groups.push({
          key: `${cropId}-${g}`,
          title: `${name} (${i + 1})`,
          list: byGroup.get(g)!,
        });
      });
    }
  }
  if (other.length > 0) {
    groups.push({ key: "__other__", title: t("myTasks.other"), list: other });
  }

  const byDate = (a: Memo, b: Memo) =>
    toYearDay({ season: a.season, day: a.day }) -
    toYearDay({ season: b.season, day: b.day });

  const dateLabel = (m: Memo) =>
    t("addTask.dateLabel", { season: t(`seasons.${m.season}`), day: m.day });

  const renderGroup = (key: string, title: string, list: Memo[]) => (
    <div
      key={key}
      className="rounded-md border border-[var(--sv-border)] p-2"
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">
          {title}{" "}
          <span className="text-xs text-[var(--sv-ink-muted)]">
            ({list.length})
          </span>
        </span>
        <DeleteBtn
          onClick={() => deleteMemos(list.map((m) => m.id))}
          label={t("myTasks.deleteAll")}
        />
      </div>
      <ul className="flex flex-col gap-1">
        {list
          .slice()
          .sort(byDate)
          .map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-2 rounded bg-[var(--sv-bg)] px-2 py-1"
            >
              <PixelIcon src={iconSrc(m)} size={16} />
              <span className="flex-1 text-sm">{m.text}</span>
              <span className="shrink-0 text-[11px] text-[var(--sv-ink-muted)]">
                {dateLabel(m)}
              </span>
              <DeleteBtn
                onClick={() => deleteMemo(m.id)}
                label={t("myTasks.delete")}
              />
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <Modal title={t("myTasks.title")} onClose={onClose}>
      {memos.length === 0 ? (
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("myTasks.empty")}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((g) => renderGroup(g.key, g.title, g.list))}
        </div>
      )}
    </Modal>
  );
}
