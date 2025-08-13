import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GroupType = "installs" | "revenue" | "both";

interface OverviewSettingsState {
  groupBy: GroupType;
  setGroupBy: (group: GroupType) => void;
}

export const useOverviewSettings = create<OverviewSettingsState>()(
  persist(
    (set) => ({
      groupBy: "both",
      setGroupBy: (group) => set({ groupBy: group }),
    }),
    { name: "overviewSettings" }
  )
);
