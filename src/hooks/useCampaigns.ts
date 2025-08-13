import { useQuery } from "./useQuery";

export type Campaign = {
  id: string;
  name: string;
  installs: { day: string; value: number }[];
};

export function useCampaigns(extraCampaigns: Campaign[]) {
  const { data, status, error } = useQuery<Campaign[]>(
    `${import.meta.env.VITE_API_URL}/campaigns`
  );

  // Ensure array and correct shape
  const apiCampaigns: Campaign[] = Array.isArray(data) ? data : [];

  // Merge API campaigns with local created campaigns
  const merged = [...apiCampaigns, ...extraCampaigns].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return { data: merged, status, error };
}
