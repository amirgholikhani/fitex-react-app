import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export type GroupType = "installs" | "revenue" | "both";
type Point = { label: string; installs?: number; revenue?: number };

export default function StackedWeeklyChart({
 data, groupBy = "both"
}: { data: Point[]; groupBy?: GroupType; }) {

  const keys = groupBy === "both" ? ["installs","revenue"] : [groupBy];

  return (
    <div className="w-full h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key)=>(
            <Bar key={key} dataKey={key} stackId="stack" fill={key === 'revenue' ? "#8884d8" : '#82ca9d'} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
