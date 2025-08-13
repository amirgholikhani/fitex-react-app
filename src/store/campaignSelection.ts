import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CampaignSelectionState {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const useCampaignSelection = create<CampaignSelectionState>()(
  persist(
    (set) => ({
      selectedId: null,
      setSelectedId: (id) => set({ selectedId: id }),
    }),
    {
      name: "selectedCampaignId", // localStorage key
    }
  )
);
