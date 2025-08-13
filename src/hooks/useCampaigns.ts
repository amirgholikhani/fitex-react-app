import { useQuery } from "./useQuery";

export type Campaign = {
  id: string;
  name: string;
  installs: { day: string; value: number }[];
};

export function useCampaigns(extraCampaigns: Campaign[]) {
  const { data, status, error } = useQuery<Campaign[]>(
    "http://5c3db915a9d04f0014a98a79.mockapi.io/campaigns"
  );

  // Ensure array and correct shape
  const apiCampaigns: Campaign[] = Array.isArray(data) ? data : [];

  // Merge API campaigns with local created campaigns
  const merged = [...apiCampaigns, ...extraCampaigns].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return { data: merged, status, error };
}
