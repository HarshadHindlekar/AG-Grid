import {
  Layers,
  ChevronDown,
  LayoutDashboard,
  Users,
  Building2,
  ChartNoAxesCombined,
  ArrowUpRight,
  CircleHelp,
  PanelLeftClose,
} from "lucide-react";
import type { SidebarProps } from "../../types/layout";
import type { DashboardTab } from "../../types/navigation";
import type { LucideIcon } from "lucide-react";

export function Sidebar({
  activeTab,
  collapsed,
  navigate,
  onHelp,
  onToggle,
  employeeCount,
}: SidebarProps) {
  const navigationItems: Array<{ name: DashboardTab; icon: LucideIcon }> = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Employees", icon: Users },
    { name: "Departments", icon: Building2 },
    { name: "Analytics", icon: ChartNoAxesCombined },
  ];

  return (
    <aside
      className={`${collapsed ? "w-[76px] px-2.5" : "w-[228px] px-[18px]"} fixed inset-y-0 left-0 z-20 flex flex-col border-r border-slate-200/80 bg-white pt-[29px] transition-[width] duration-200 ease-out max-[1150px]:w-[195px] max-[1150px]:px-3 max-[900px]:w-[76px] max-[900px]:px-2.5 max-[600px]:w-[55px] max-[600px]:px-1 max-[600px]:pt-[22px]`}
    >
      <button
        className={`${collapsed ? "px-2.5" : "px-3"} flex items-center gap-[9px] pb-[30px] text-[29px] font-[800] tracking-[-1.7px] text-slate-900 transition-colors duration-150 max-[900px]:px-2.5 max-[600px]:px-1 max-[600px]:pb-[25px]`}
        type="button"
        aria-label="FactWise home"
      >
        <span className="grid h-[34px] w-[31px] rotate-[-5deg] place-items-center rounded-[9px] bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-600/30 max-[600px]:h-[30px] max-[600px]:w-[30px]">
          <Layers size={20} />
        </span>
        <span>
          <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
            factwise<span className="text-emerald-500">.</span>
          </span>
        </span>
      </button>
      <div
        className={`${collapsed ? "hidden" : ""} flex items-center gap-[9px] rounded-[9px] border border-slate-200/80 bg-slate-50/80 p-3 px-[10px] shadow-sm max-[900px]:hidden`}
      >
        <span className="grid h-[33px] w-[31px] place-items-center rounded-[7px] border border-emerald-200 bg-emerald-50 font-[750] text-emerald-800">
          F
        </span>
        <span className="flex-1">
          <strong className="block text-[11px] font-bold text-slate-900">
            FactWise workspace
          </strong>
          <small className="mt-0.5 block text-[10px] font-medium text-slate-500">
            People & operations
          </small>
        </span>
        <ChevronDown size={14} className="text-slate-400" />
      </div>
      <p className="mx-3 mb-2.5 mt-[28px] text-[9px] font-bold tracking-[1.5px] text-slate-400 max-[900px]:hidden">
        WORKSPACE
      </p>
      <nav>
        {navigationItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            aria-label={name}
            className={`${activeTab === name ? "border border-emerald-200/60 bg-emerald-50 font-bold text-emerald-800 shadow-sm before:absolute before:left-0 before:h-[23px] before:w-[3.5px] before:rounded-r-[4px] before:bg-emerald-600" : "font-medium text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"} relative my-[3px] flex w-full items-center gap-3 rounded-[7px] px-[13px] py-[12px] text-left text-[12px] transition-colors max-[900px]:px-[13px] max-[600px]:px-[14px]`}
            onClick={() => navigate(name)}
          >
            <Icon size={18} />
            <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
              {name}
            </span>
            {name === "Employees" && (
              <small
                className={`${collapsed ? "hidden" : ""} ml-auto rounded-[5px] bg-emerald-100/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800 max-[900px]:hidden`}
              >
                {employeeCount}
              </small>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <div
          className={`${collapsed ? "hidden" : ""} mx-1 mb-5 mt-10 rounded-[11px] border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/50 p-[15px] shadow-sm max-[900px]:hidden`}
        >
          <span className="mb-1 block text-[24px] text-emerald-600">✧</span>
          <strong className="block text-[12px] font-bold leading-[1.65] text-slate-900">
            Great teams start with insights.
          </strong>
          <p className="my-2 text-[11px] leading-[1.6] text-slate-600">
            A clearer view of your people, all in one place.
          </p>
          <button
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
            onClick={onHelp}
          >
            Explore your dashboard <ArrowUpRight size={14} />
          </button>
        </div>
        <button
          className="relative my-[3px] flex w-full items-center gap-3 rounded-[7px] px-[13px] py-[12px] text-left text-[12px] font-medium text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 max-[900px]:justify-center max-[900px]:px-[13px] max-[600px]:px-[14px]"
          onClick={onHelp}
        >
          <CircleHelp size={18} />
          <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
            Help & getting started
          </span>
        </button>
        <div
          className={`${collapsed ? "justify-center" : ""} mt-[14px] flex items-center gap-[9px] border-t border-slate-200/80 py-[19px] max-[900px]:justify-center`}
        >
          <span className="inline-flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-emerald-600 to-teal-700 text-[10px] font-bold text-white shadow-sm">
            FW
          </span>
          <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
            <strong className="block text-[11px] font-bold text-slate-900">
              Workspace admin
            </strong>
            <small className="mt-0.5 block text-[10px] font-medium text-slate-500">
              FactWise team
            </small>
          </span>
          <button
            className={`${collapsed ? "m-0" : "ml-auto"} p-[3px] text-slate-400 hover:text-slate-700 max-[900px]:hidden`}
            aria-label="Collapse sidebar"
            onClick={onToggle}
          >
            <PanelLeftClose size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
