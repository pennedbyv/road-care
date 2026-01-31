import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success" | "info" | "destructive";
}

const variantStyles = {
  default: "text-foreground",
  warning: "text-warning",
  success: "text-success",
  info: "text-info",
  destructive: "text-destructive",
};

const iconBgStyles = {
  default: "bg-white/5",
  warning: "bg-warning/10",
  success: "bg-success/10",
  info: "bg-info/10",
  destructive: "bg-destructive/10",
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn("text-3xl font-bold tracking-tight", variantStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl transition-colors duration-300",
            iconBgStyles[variant]
          )}
        >
          <Icon className={cn("h-6 w-6", variantStyles[variant])} />
        </div>
      </div>
    </div>
  );
}
