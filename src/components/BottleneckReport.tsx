import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const weeklyData = [
  { day: "Monday", traffic: 1200 },
  { day: "Tuesday", traffic: 1500 },
  { day: "Wednesday", traffic: 1800 },
  { day: "Thursday", traffic: 1400 },
  { day: "Friday", traffic: 2000 },
  { day: "Saturday", traffic: 2500 },
  { day: "Sunday", traffic: 2700 },
];

const weekdayTraffic = weeklyData
  .filter(d => !["Saturday", "Sunday"].includes(d.day))
  .reduce((sum, d) => sum + d.traffic, 0);

const weekendTraffic = weeklyData
  .filter(d => ["Saturday", "Sunday"].includes(d.day))
  .reduce((sum, d) => sum + d.traffic, 0);

const BottleneckReport = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
          Network Intelligence
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-sm text-cyan-100">
          Bottleneck Report
        </h2>
        <p className="text-sm text-slate-300">
          Weekly corridor load to surface persistent choke‑points and imbalance between weekday and weekend demand.
        </p>
      </header>

      {/* Bar Chart for Daily Traffic */}
      <Card
        className="p-6 border border-[var(--panel-border)] bg-[var(--surface)] shadow-black/20 rounded-2xl"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-cyan-100">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Last 7 days corridor volume
          </h3>
          <span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
            Peak day: Sunday
          </span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="day"
                tick={{ fill: "#e5e7eb" }}
                tickLine={{ stroke: "#4b5563" }}
              />
              <YAxis
                tick={{ fill: "#020617" }}
                tickLine={{ stroke: "#9ca3af" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.95)",
                  borderRadius: 12,
                  border: "1px solid rgba(56,189,248,0.4)",
                  color: "#e5e7eb",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="traffic"
                fill="#22d3ee"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Summary */}
      <Card
        className="p-6 border border-[var(--panel-border)] bg-[var(--surface)] rounded-2xl shadow-black/20 shadow-lg space-y-4"
      >
        <h3 className="text-lg font-semibold text-cyan-100">
          Weekday vs weekend pressure
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--panel-border)] bg-[var(--surface-2)] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] mb-1 text-slate-400">
              Weekday load
            </p>
            <p className="text-2xl font-bold text-cyan-100">
              {weekdayTraffic.toLocaleString()}
            </p>
            <p className="text-xs mt-1 text-slate-400">
              Mon–Fri aggregated vehicle count
            </p>
          </div>
          <div className="rounded-xl border border-amber-400/50 bg-amber-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] mb-1 text-amber-200">
              Weekend load
            </p>
            <p className="text-2xl font-bold text-amber-200">
              {weekendTraffic.toLocaleString()}
            </p>
            <p className="text-xs mt-1 text-amber-200/80">
              Sat–Sun aggregated vehicle count
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-100">
          {weekendTraffic > weekdayTraffic ? (
            <>
              Bottlenecks **intensify on weekends** — consider extending green waves for leisure corridors and
              reinforcing diversion plans during peak leisure hours.
            </>
          ) : (
            <>
              Bottlenecks **concentrate on weekdays** — prioritize adaptive signal plans for office corridors and
              AM/PM peak windows.
            </>
          )}
        </p>
      </Card>
    </div>
  );
};

export default BottleneckReport;