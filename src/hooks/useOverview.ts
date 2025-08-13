import { useQuery } from "./useQuery";

export type OverviewPoint = {
  day: string;
  installs: number;
  revenue: number;
};

type OverviewResponse = {
  installs: { day: string; value: number }[];
  revenue: { day: string; value: number }[];
};

export function useOverview() {
  const { data, status, error } = useQuery<OverviewResponse>(
    "http://5c3db915a9d04f0014a98a79.mockapi.io/overview"
  );
  // Merge installs + revenue by day
  const merged: OverviewPoint[] = Array.isArray(data?.installs)
    ? data!.installs.map((install) => {
      const rev = data?.revenue?.find((r) => r.day === install.day);
      return {
        day: install.day,
        installs: install.value,
        revenue: rev ? rev.value : 0,
      };
    })
    : [];

  return { data: merged, status, error };
}
