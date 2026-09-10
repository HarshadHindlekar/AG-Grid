import type { Employee } from "./employee";
import type { DashboardTab } from "./navigation";

export interface SidebarProps {
  activeTab: DashboardTab;
  collapsed: boolean;
  navigate: (tab: DashboardTab) => void;
  onHelp: () => void;
  onToggle: () => void;
  employeeCount: number;
}

export interface AvatarProps {
  person: Employee;
  large?: boolean;
}

export interface DashboardDialogProps {
  selected: Employee | null;
  onClose: () => void;
  totalEmployees: number;
}
