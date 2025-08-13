import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useCreatedCampaigns } from "@/store/createdCampaign";
import { useCampaignSelection } from "@/store/campaignSelection";
import BarWeeklyChart from "@/components/charts/BarWeeklyChart.tsx";

export default function CampaignsPage() {
  const [params, setParams] = useSearchParams();

  const created = useCreatedCampaigns((s) => s.created);
  const { data, status, error } = useCampaigns(created);

  const selectedCampaignId = useCampaignSelection((s) => s.selectedId);
  const setSelectedCampaignId = useCampaignSelection((s) => s.setSelectedId);

  const selectedId =
    params.get("campaign") ?? selectedCampaignId ?? data?.[0]?.id ?? null;

  const selected = useMemo(
    () => (data ?? []).find((c) => c.id === selectedId) ?? null,
    [data, selectedId]
  );

  function onSelect(id: string) {
    setParams((p) => {
      p.set("campaign", id);
      return p;
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
          {(data ?? []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
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
