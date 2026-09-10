import type { LucideIcon } from "lucide-react";
import type { DashboardTab } from "./navigation";

export interface WorkforceStats {
  total: number;
  departmentCount: number;
  active: number;
  rating: number;
  salary: number;
  projects: number;
}
export interface WorkforceSummaryProps {
  stats: WorkforceStats;
}
export interface DepartmentInsightsProps {
  activeTab: DashboardTab;
  stats: WorkforceStats;
  department: string;
  setDepartment: (value: string) => void;
}

export interface WorkforceMetricBadge {
  variant: "active" | "stars" | "currency";
  getText: (stats: WorkforceStats) => string;
}

export interface WorkforceMetricDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
  getValue: (stats: WorkforceStats) => string;
  description: string;
  suffix?: string;
  badge?: WorkforceMetricBadge;
}
