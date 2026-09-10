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
      className={`${collapsed ? "w-[76px] px-2.5" : "w-[228px] px-[18px]"} fixed inset-y-0 left-0 z-20 flex flex-col border-r border-[#e4e9e2] bg-white pt-[29px] transition-[width] duration-200 ease-out max-[1150px]:w-[195px] max-[1150px]:px-3 max-[900px]:w-[76px] max-[900px]:px-2.5 max-[600px]:w-[55px] max-[600px]:px-1 max-[600px]:pt-[22px]`}
    >
      <button
        className={`${collapsed ? "px-2.5" : "px-3"} flex items-center gap-[9px] pb-[30px] text-[29px] font-[750] tracking-[-1.7px] transition-colors duration-150 max-[900px]:px-2.5 max-[600px]:px-1 max-[600px]:pb-[25px]`}
        type="button"
        aria-label="FactWise home"
      >
        <span className="grid h-[34px] w-[31px] rotate-[-5deg] place-items-center rounded-[9px] bg-[#1e6652] text-white max-[600px]:h-[30px] max-[600px]:w-[30px]">
          <Layers size={22} />
        </span>
        <span>
          <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
            factwise<span className="text-[#5a9278]">.</span>
          </span>
        </span>
      </button>
      <div
        className={`${collapsed ? "hidden" : ""} flex items-center gap-[9px] rounded-[7px] border border-[#e6eae3] p-3 px-[9px] max-[900px]:hidden`}
      >
        <span className="grid h-[33px] w-[31px] place-items-center rounded-[6px] border border-[#e1e6d9] bg-[#f0f3eb] font-[650]">
          F
        </span>
        <span>
          <strong className="block text-[11px] font-semibold">
            FactWise workspace
          </strong>
          <small className="mt-1 block text-[10px] text-[#92998f]">
            People & operations
          </small>
        </span>
        <ChevronDown size={14} />
      </div>
      <p className="mx-3 mb-3 mt-[29px] text-[9px] font-semibold tracking-[1.5px] text-[#9aa198] max-[900px]:hidden">
        WORKSPACE
      </p>
      <nav>
        {navigationItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            aria-label={name}
            className={`${activeTab === name ? "bg-[#eaf1e7] font-[650] text-[#25634d] before:absolute before:left-0 before:h-[23px] before:w-[3px] before:rounded-r-[4px] before:bg-[#44866a]" : "text-[#788176]"} relative my-[3px] flex w-full items-center gap-3 rounded-[6px] px-[13px] py-[13px] text-left text-[12px] hover:bg-[#f2f5ef] max-[900px]:px-[13px] max-[600px]:px-[14px]`}
            onClick={() => navigate(name)}
          >
            <Icon size={18} />
            <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
              {name}
            </span>
            {name === "Employees" && (
              <small
                className={`${collapsed ? "hidden" : ""} ml-auto rounded bg-[#edf0e9] px-1.5 py-0.5 text-[10px] max-[900px]:hidden`}
              >
                {employeeCount}
              </small>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <div
          className={`${collapsed ? "hidden" : ""} mx-1 mb-5 mt-10 rounded-[9px] border border-[#e7ecdf] bg-[linear-gradient(125deg,#edf3e8,#f6f7ee)] p-[15px] max-[900px]:hidden`}
        >
          <span className="mb-2 block text-[27px] text-[#527d56]">✧</span>
          <strong className="block text-[12px] leading-[1.65]">
            Great teams start with insights.
          </strong>
          <p className="my-2 text-[11px] leading-[1.7] text-[#87917f]">
            A clearer view of your people, all in one place.
          </p>
          <button
            className="flex items-center gap-1 text-[10px] font-[650] text-[#4b7456]"
            onClick={onHelp}
          >
            Explore your dashboard <ArrowUpRight size={14} />
          </button>
        </div>
        <button
          className="relative my-[3px] flex w-full items-center gap-3 rounded-[6px] px-[13px] py-[13px] text-left text-[12px] text-[#788176] hover:bg-[#f2f5ef] max-[900px]:justify-center max-[900px]:px-[13px] max-[600px]:px-[14px]"
          onClick={onHelp}
        >
          <CircleHelp size={18} />
          <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
            Help & getting started
          </span>
        </button>
        <div
          className={`${collapsed ? "justify-center" : ""} mt-[14px] flex items-center gap-[9px] border-t border-[#e8ece5] py-[19px] max-[900px]:justify-center`}
        >
          <span className="inline-flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#f5f7f0] bg-[#e8ede0] text-[10px] font-[650] tracking-[.2px] text-[#526343]">
            FW
          </span>
          <span className={`${collapsed ? "hidden" : ""} max-[900px]:hidden`}>
            <strong className="block text-[11px] font-semibold">
              Workspace admin
            </strong>
            <small className="mt-1 block text-[10px] text-[#92998f]">
              FactWise team
            </small>
          </span>
          <button
            className={`${collapsed ? "m-0" : "ml-auto"} p-[3px] text-[#88927f] max-[900px]:hidden`}
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
