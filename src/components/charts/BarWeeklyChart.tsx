import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { Campaign } from "@/hooks/useCampaigns.ts";

export default function BarWeeklyChart({ data }: { data: Campaign }) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart
          data={data.installs.map((item) => ({
            day: item.day,
            installs: item.value,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="installs"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}