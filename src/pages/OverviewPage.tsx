import { useOverview } from "@/hooks/useOverview";
import StackedWeeklyChart, { type GroupType } from "@/components/charts/StackedWeeklyChart";
import { useOverviewSettings } from "@/store/useOverviewSettings";

export default function OverviewPage() {
  const { data, status, error } = useOverview();
  const groupBy = useOverviewSettings((s) => s.groupBy);
  const setGroupBy = useOverviewSettings((s) => s.setGroupBy);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error") return <p className="text-red-600">Error: {String(error)}</p>;

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <select
          className="ml-auto border rounded px-2 py-1"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as GroupType)}
        >
          <option value="installs">Installs</option>
          <option value="revenue">Revenue</option>
          <option value="both">Both</option>
        </select>
      </header>

      <StackedWeeklyChart
        data={data.map((item) => ({
          label: item.day,
          installs: item.installs,
          revenue: item.revenue,
        }))}
        groupBy={groupBy}
      />
    </section>
  );
}
