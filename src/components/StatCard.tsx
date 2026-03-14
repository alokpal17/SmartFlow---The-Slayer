import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "online" | "warning" | "critical" | "offline";
}

const statusToken = {
  online: {
    label: "Online",
    color: "bg-emerald-400/15 text-emerald-900 dark:text-emerald-100",
    dot: "bg-emerald-500",
  },
  warning: {
    label: "Warning",
    color: "bg-amber-400/15 text-amber-900 dark:text-amber-100",
    dot: "bg-amber-500",
  },
  critical: {
    label: "Critical",
    color: "bg-rose-400/15 text-rose-900 dark:text-rose-100",
    dot: "bg-rose-500",
  },
  offline: {
    label: "Offline",
    color: "bg-slate-500/15 text-slate-900 dark:text-slate-200",
    dot: "bg-slate-500",
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, status = "online" }: StatCardProps) {
  const statusEntry = statusToken[status];

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-200">
            <Icon className="h-5 w-5 text-cyan-200" />
            <p className="text-sm font-medium uppercase tracking-wide">{title}</p>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-white">{value}</p>
          {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}

          {trend && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className={trend.isPositive ? "text-emerald-300" : "text-rose-300"}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-slate-400">vs last hour</span>
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span className={`h-3 w-3 rounded-full ${statusEntry.dot}`} />
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusEntry.color}`}>{statusEntry.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}