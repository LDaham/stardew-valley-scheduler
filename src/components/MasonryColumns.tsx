"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// 실제 렌더 높이를 측정해 "지금 가장 짧은(= 먼저 끝난) 열"에 다음 박스를 넣는 메이슨리.
// 추정(아이템 수)이 아니라 측정값을 쓰므로 칩 줄바꿈 등으로 높이가 달라져도 빈 공간이 최소화된다.
// 측정은 최종 열 너비와 동일한 폭에서 해야 정확하므로, 미배치 상태에서는 같은 폭의 flex-wrap로
// 한 번 렌더해 높이를 잰 뒤 열로 재배치한다(useLayoutEffect라 페인트 전에 처리 → 깜빡임 없음).
export default function MasonryColumns<T>({
  items,
  getKey,
  render,
  columns = 2,
  gap = 8,
}: {
  items: T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
  columns?: number;
  gap?: number;
}) {
  const measureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [state, setState] = useState<{ sig: string; cols: number[] } | null>(
    null,
  );
  // 리사이즈마다 증가 → 모바일에서 데스크톱으로 넘어와(숨김→표시) 높이가 생겼을 때도 재측정 보장
  const [nonce, setNonce] = useState(0);

  // 콘텐츠 시그니처: 같은 시그니처의 배치만 유효(필터로 항목이 바뀌면 재측정)
  const sig = items.map(getKey).join("|");
  const valid = state && state.sig === sig ? state.cols : null;

  useLayoutEffect(() => {
    if (valid) return;
    const heights = items.map((_, i) => measureRefs.current[i]?.offsetHeight ?? 0);
    // 아직 보이지 않아(모바일에서 hidden 등) 높이가 0이면 배치하지 않고 대기
    if (items.length > 0 && heights.every((h) => h === 0)) return;
    const colH = new Array(columns).fill(0);
    const next = heights.map((h) => {
      let c = 0;
      for (let k = 1; k < columns; k++) if (colH[k] < colH[c]) c = k;
      colH[c] += h;
      return c;
    });
    setState({ sig, cols: next });
  }, [valid, sig, items, columns, nonce]);

  // 뷰포트 변화(반응형 폭 변경)로 박스 높이가 달라지면 재측정(무효화 + 강제 재렌더)
  useLayoutEffect(() => {
    const onResize = () => {
      setState(null);
      setNonce((n) => n + 1);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 미배치: 최종 열 너비와 동일한 폭으로 한 번 렌더(측정용)
  if (!valid) {
    const w = `calc((100% - ${(columns - 1) * gap}px) / ${columns})`;
    return (
      <div className="flex flex-wrap items-start" style={{ gap }}>
        {items.map((it, i) => (
          <div
            key={getKey(it)}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            style={{ width: w }}
          >
            {render(it)}
          </div>
        ))}
      </div>
    );
  }

  // 배치 완료: 열별로 나눠 렌더
  const cols: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((it, i) => cols[valid[i]].push(it));
  return (
    <div className="flex items-start" style={{ gap }}>
      {cols.map((col, c) => (
        <div key={c} className="flex flex-1 flex-col" style={{ gap }}>
          {col.map((it) => (
            <div key={getKey(it)}>{render(it)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
