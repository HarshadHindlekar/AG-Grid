import { useCallback, useRef, useState } from "react";
import { ChevronRight, Download } from "lucide-react";
import type { Employee } from "./types/employee";
import type { DashboardTab } from "./types/navigation";
import { Sidebar } from "./components/layout/Sidebar";
import { DashboardDialog } from "./components/DashboardDialog";
import { WorkforceSummary } from "./features/dashboard/WorkforceSummary";
import { DepartmentInsights } from "./features/dashboard/DepartmentInsights";
import { useWorkforceStats } from "./features/dashboard/useWorkforceStats";
import { EmployeeDirectory } from "./features/employees/EmployeeDirectory";
import { useEmployeeDirectory } from "./features/employees/useEmployeeDirectory";

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Overview");
  const [collapsed, setCollapsed] = useState(false);
  const [help, setHelp] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const returnFocusRef = useRef<HTMLElement | null>(null);

  const rememberFocus = useCallback(() => {
    const activeElement = document.activeElement;
    returnFocusRef.current =
      activeElement instanceof HTMLElement ? activeElement : null;
  }, []);

  const openEmployee = useCallback(
    (employee: Employee) => {
      rememberFocus();
      setSelected(employee);
    },
    [rememberFocus],
  );

  const openHelp = useCallback(() => {
    rememberFocus();
    setHelp(true);
  }, [rememberFocus]);

  const closeDialog = useCallback(() => {
    setSelected(null);
    setHelp(false);
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const directory = useEmployeeDirectory(openEmployee);
  const stats = useWorkforceStats();

  function navigate(tab: DashboardTab) {
    setActiveTab(tab);
    if (tab === "Employees") {
      requestAnimationFrame(() => {
        const directoryElement = document.getElementById("directory");
        if (directoryElement) {
          const top =
            directoryElement.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      });
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f6f8f5] font-sans text-[#293c32] antialiased">
      <Sidebar
        activeTab={activeTab}
        collapsed={collapsed}
        navigate={navigate}
        onHelp={openHelp}
        onToggle={() => setCollapsed((value) => !value)}
        employeeCount={stats.total}
      />
      <div
        className={`${collapsed ? "ml-[76px] w-[calc(100%-76px)]" : "ml-[228px] w-[calc(100%-228px)]"} max-[1150px]:ml-[195px] max-[1150px]:w-[calc(100%-195px)] max-[900px]:ml-[76px] max-[900px]:w-[calc(100%-76px)] max-[600px]:ml-[55px] max-[600px]:w-[calc(100%-55px)]`}
      >
        <header className="flex h-[66px] items-center justify-between border-b border-[#e5e9e2] bg-white px-[34px] text-[11px] text-[#949a91] max-[600px]:h-[53px] max-[600px]:px-[17px]">
          <div className="flex items-center gap-[15px]">
            <span>Workspace</span>
            <ChevronRight size={13} />
            <strong className="font-medium text-[#4d594e]">{activeTab}</strong>
          </div>
          <span className="flex items-center gap-[7px] text-[10px] max-[600px]:hidden">
            <i className="h-[5px] w-[5px] rounded-full bg-[#72a685]" />
            Workspace overview
          </span>
        </header>
        <main className="mx-auto max-w-[1680px] px-[34px] pb-[18px] pt-[31px] max-[1150px]:px-[22px] max-[1150px]:py-[25px] max-[600px]:px-[14px] max-[600px]:py-[22px] min-[1500px]:pt-[38px]">
          <div className="mb-[27px] flex items-center justify-between gap-5 max-[600px]:flex-wrap max-[600px]:items-start max-[600px]:gap-2.5">
            <div>
              <div className="mb-[9px] text-[9px] font-[650] tracking-[1.8px] text-[#819279]">
                YOUR PEOPLE, AT A GLANCE
              </div>
              <h1 className="font-display text-[29px] font-[750] leading-[1.4] tracking-[-1.15px] max-[600px]:text-[26px]">
                {activeTab === "Overview"
                  ? "People overview"
                  : activeTab === "Employees"
                    ? "Employee directory"
                    : activeTab === "Departments"
                      ? "Your departments"
                      : "Workforce analytics"}
              </h1>
              <p className="mt-1.5 text-[12px] text-[#8a9487]">
                A little clarity. A stronger team. Get to know your workforce.
              </p>
            </div>
            <button
              className="inline-flex min-h-[34px] items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#28664f] bg-[#28664f] px-[15px] py-[11px] text-[11px] font-medium text-white shadow-[0_2px_3px_#28563a15] transition-colors hover:bg-[#1b513c]"
              onClick={() => directory.exportReport()}
            >
              <Download size={15} />
              {directory.selection
                ? `Export ${directory.selection} selected`
                : "Export report"}
            </button>
          </div>
          <WorkforceSummary stats={stats} />
          {activeTab !== "Employees" && (
            <DepartmentInsights
              activeTab={activeTab}
              stats={stats}
              department={directory.department}
              setDepartment={directory.setDepartment}
            />
          )}
          <EmployeeDirectory controller={directory} />
          <footer className="flex items-center justify-between pt-5 text-[9px] text-[#a4ac99]">
            <span>
              <span className="mr-1 align-middle text-[18px]">✧</span> Built
              around your people.
            </span>
            <span className="max-[600px]:hidden">
              FactWise · People workspace
            </span>
          </footer>
        </main>
      </div>
      {(selected || help) && (
        <DashboardDialog
          selected={selected}
          onClose={closeDialog}
          totalEmployees={stats.total}
        />
      )}
    </div>
  );
}
