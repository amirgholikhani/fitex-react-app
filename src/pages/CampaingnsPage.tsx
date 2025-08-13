import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useCreatedCampaigns } from "@/store/createdCampaign";
import { useCampaignSelection } from "@/store/campaignSelection";
import BarWeeklyChart from "@/components/charts/BarWeeklyChart.tsx";

export default function CampaignsPage() {
  const [params, setParams] = useSearchParams();

  const created = useCreatedCampaigns((state) => state.created);
  const { data, status, error } = useCampaigns(created);

  const selectedCampaignId = useCampaignSelection((state) => state.selectedId);
  const setSelectedCampaignId = useCampaignSelection((state) => state.setSelectedId);

  const selectedId =
    params.get("campaign") ?? selectedCampaignId ?? data?.[0]?.id ?? null;

  const selected = useMemo(
    () => (data ?? []).find((campaign) => campaign.id === selectedId) ?? null,
    [data, selectedId]
  );

  function onSelect(id: string) {
    setParams((param) => {
      param.set("campaign", id);
      return param;
    });
    setSelectedCampaignId(id);
  }

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error")
    return <p className="text-red-600">Failed: {String(error)}</p>;

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <select
          className="ml-auto border rounded px-2 py-1"
          value={selected?.id ?? ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          {(data ?? []).map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
      </header>

      {selected ? (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-medium mb-4">{selected.name}</h2>
          <BarWeeklyChart data={selected} />
        </div>
      ) : (
        <p>No campaign selected.</p>
      )}
    </section>
  );
}
