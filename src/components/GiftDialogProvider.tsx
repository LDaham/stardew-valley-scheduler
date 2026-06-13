"use client";

import { createContext, useContext, useState } from "react";
import GiftDialog from "@/components/GiftDialog";

// 어디서든 생일 이벤트 클릭 시 선물 모달을 열 수 있게 하는 컨텍스트.
const GiftDialogContext = createContext<(villagerId: string) => void>(() => {});

export function useGiftDialog() {
  return useContext(GiftDialogContext);
}

export function GiftDialogProvider({ children }: { children: React.ReactNode }) {
  const [villagerId, setVillagerId] = useState<string | null>(null);

  return (
    <GiftDialogContext.Provider value={setVillagerId}>
      {children}
      {villagerId && (
        <GiftDialog
          villagerId={villagerId}
          onClose={() => setVillagerId(null)}
        />
      )}
    </GiftDialogContext.Provider>
  );
}
