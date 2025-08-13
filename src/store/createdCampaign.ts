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
      add: (newCampaign) => {
        const exists = get().created.some(
          (campaign) => campaign.name.trim().toLowerCase() === newCampaign.name.trim().toLowerCase()
        );
        if (exists) return;
        set((state) => ({ created: [...state.created, newCampaign] }));
      },
    }),
    { name: "createdCampaigns" }
  )
);
