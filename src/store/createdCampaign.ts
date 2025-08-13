import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Campaign } from "@/hooks/useCampaigns";

interface CreatedCampaignsState {
  created: Campaign[];
  add: (c: Campaign) => void;
}

export const useCreatedCampaigns = create<CreatedCampaignsState>()(
  persist(
    (set, get) => ({
      created: [],
      add: (c) => {
        const exists = get().created.some(
          (x) => x.name.trim().toLowerCase() === c.name.trim().toLowerCase()
        );
        if (exists) return;
        set((state) => ({ created: [...state.created, c] }));
      },
    }),
    { name: "createdCampaigns" }
  )
);
