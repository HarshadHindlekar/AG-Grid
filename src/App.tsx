import { useCallback, useRef, useState } from "react";
import { ChevronRight, Download, LoaderCircle } from "lucide-react";
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
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased">
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
        <header className="flex h-[66px] items-center justify-between border-b border-slate-200/80 bg-white px-[34px] text-[11px] text-slate-500 max-[600px]:h-[53px] max-[600px]:px-[17px]">
          <div className="flex items-center gap-[15px]">
            <span>Workspace</span>
            <ChevronRight size={13} className="text-slate-400" />
            <strong className="font-semibold text-slate-800">
              {activeTab}
            </strong>
          </div>
          <span className="flex items-center gap-[7px] text-[10px] font-medium text-slate-500 max-[600px]:hidden">
            <i className="h-[6px] w-[6px] rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            Workspace overview
          </span>
        </header>
        <main className="mx-auto max-w-[1680px] px-[34px] pb-[24px] pt-[31px] max-[1150px]:px-[22px] max-[1150px]:py-[25px] max-[600px]:px-[14px] max-[600px]:py-[22px] min-[1500px]:pt-[38px]">
          <div className="mb-[27px] flex items-center justify-between gap-5 max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-3">
            <div className="max-[600px]:w-full">
              <div className="mb-[8px] text-[10px] font-[750] tracking-[1.8px] text-emerald-700">
                YOUR PEOPLE, AT A GLANCE
              </div>
              <h1 className="font-display text-[30px] font-[800] leading-[1.35] tracking-[-1.15px] text-slate-900 max-[600px]:text-[26px]">
                {activeTab === "Overview"
                  ? "People overview"
                  : activeTab === "Employees"
                    ? "Employee directory"
                    : activeTab === "Departments"
                      ? "Your departments"
                      : "Workforce analytics"}
              </h1>
              <p className="mt-1 text-[11px] leading-[1.6] text-slate-500">
                A little clarity. A stronger team. Get to know your workforce.
              </p>
            </div>
            <div className="max-[600px]:flex max-[600px]:w-full max-[600px]:justify-center">
              <button
                className={`inline-flex min-h-[36px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-gradient-to-r from-emerald-600 to-teal-700 px-[16px] py-[10px] text-[11px] font-semibold text-white shadow-md shadow-emerald-700/20 transition-all duration-200 hover:from-emerald-500 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-700/25 active:translate-y-0.5 ${directory.exporting ? "cursor-not-allowed opacity-90" : ""}`}
                onClick={() => directory.exportReport()}
                disabled={directory.exporting}
                aria-label={
                  directory.exporting
                    ? "Exporting report..."
                    : directory.selection
                      ? `Export ${directory.selection} selected`
                      : "Export report"
                }
              >
                {directory.exporting ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>
                      {directory.selection
                        ? `Export ${directory.selection} selected`
                        : "Export report"}
                    </span>
                  </>
                )}
              </button>
            </div>
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
