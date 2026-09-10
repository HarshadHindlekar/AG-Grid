import { Users, Building2, Star, BriefcaseBusiness } from "lucide-react";
import type { WorkforceMetricDefinition } from "../types/dashboard";
import { money } from "../utils/format";

export const workforceMetrics: WorkforceMetricDefinition[] = [
  {
    id: "employees",
    label: "Total employees",
    icon: Users,
    getValue: (stats) => String(stats.total),
    description: "across your organization",
    badge: { variant: "active", getText: (stats) => `${stats.active} active` },
  },
  {
    id: "departments",
    label: "Departments",
    icon: Building2,
    getValue: (stats) => String(stats.departmentCount).padStart(2, "0"),
    description: "Connected teams, shared goals",
  },
  {
    id: "performance",
    label: "Average performance",
    icon: Star,
    getValue: (stats) => stats.rating.toFixed(2),
    suffix: "/ 5",
    description: "Team-wide average",
    badge: { variant: "stars", getText: () => "★★★★★" },
  },
  {
    id: "salary",
    label: "Average salary",
    icon: BriefcaseBusiness,
    getValue: (stats) => money(stats.salary),
    description: "Annual base compensation",
    badge: { variant: "currency", getText: () => "USD" },
  },
];
