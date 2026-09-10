import { ChartNoAxesCombined } from "lucide-react";
import {
  employees,
  departments,
  colors,
  darkColors,
} from "../../data/employees";
import type { DepartmentInsightsProps } from "../../types/dashboard";

export function DepartmentInsights({
  activeTab,
  stats,
  department,
  setDepartment,
}: DepartmentInsightsProps) {
  const totalEmployees = employees.length || 1;

  const departmentCounts = departments.map((departmentName) => ({
    name: departmentName,
    count: employees.filter(
      (employee) => employee.department === departmentName,
    ).length,
  }));

  const departmentCount = departmentCounts.filter(
    ({ count }) => count > 0,
  ).length;
  const chartLabel = departmentCounts
    .map(
      ({ name, count }) =>
        `${name} ${Math.round((count / totalEmployees) * 100)}%`,
    )
    .join(", ");

  const donutStops = departmentCounts.reduce(
    (result, { name, count }) => {
      const start = result.cursor;
      const end = start + (count / totalEmployees) * 100;
      return {
        cursor: end,
        stops: [...result.stops, `${colors[name]} ${start}% ${end}%`],
      };
    },
    { cursor: 0, stops: [] as string[] },
  ).stops;

  const darkStops = departmentCounts.reduce(
    (result, { name, count }) => {
      const start = result.cursor;
      const end = start + (count / totalEmployees) * 100;
      return {
        cursor: end,
        stops: [
          ...result.stops,
          `${darkColors[name] || colors[name]} ${start}% ${end}%`,
        ],
      };
    },
    { cursor: 0, stops: [] as string[] },
  ).stops;

  return (
    <section className="mb-[25px] grid grid-cols-2 gap-[19px] max-[900px]:gap-3 max-[600px]:grid-cols-1 min-[1500px]:mb-7">
      <article className="rounded-[12px] border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.08)] max-[600px]:p-3.5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-[750] tracking-[-.15px] text-slate-900">
              Team distribution
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              A snapshot of where your people belong
            </p>
          </div>
          <span className="whitespace-nowrap rounded-[6px] border border-emerald-200/90 bg-emerald-50/90 px-2.5 py-[3px] text-[10px] font-semibold text-emerald-800 shadow-sm">
            {departmentCount} departments
          </span>
        </div>
        <div className="my-[20px] flex items-center justify-center gap-[34px] max-[1150px]:gap-[20px] max-[900px]:gap-3 max-[600px]:my-4 max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-5 min-[1500px]:gap-12">
          {/* 3D Donut Visualization */}
          <div
            className="group relative flex h-[175px] w-[175px] shrink-0 items-center justify-center max-[1150px]:h-[150px] max-[1150px]:w-[150px] max-[600px]:h-[160px] max-[600px]:w-[160px]"
            role="img"
            aria-label={chartLabel}
            style={{ perspective: "650px" }}
          >
            {/* Soft Ambient Contact Shadow */}
            <div
              className="pointer-events-none absolute bottom-1 h-[120px] w-[120px] rounded-full bg-slate-900/15 blur-[10px] transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-900/20"
              style={{
                transform: "rotateX(62deg) translateY(18px) scale(1.15)",
              }}
            />

            {/* 3D Tilted Donut */}
            <div
              className="relative h-[142px] w-[142px] transition-transform duration-500 ease-out max-[1150px]:h-[122px] max-[1150px]:w-[122px]"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(38deg) rotateZ(0deg)",
              }}
            >
              {/* 3D Extrusion Depth Layers */}
              {[12, 10, 8, 6, 4, 2].map((z, idx) => (
                <div
                  key={z}
                  className="absolute inset-0 rounded-full"
                  style={{
                    transform: `translateZ(-${z}px)`,
                    background: `conic-gradient(${darkStops.join(", ")})`,
                    filter: `brightness(${0.72 + idx * 0.04}) saturate(1.1)`,
                    boxShadow:
                      idx === 0 ? "0 8px 16px rgba(0,0,0,0.35)" : undefined,
                  }}
                />
              ))}

              {/* Top Surface Cap with specular gradient & rim highlight */}
              <div
                className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_-1px_3px_rgba(0,0,0,0.2)]"
                style={{
                  transform: "translateZ(0px)",
                  background: `conic-gradient(${donutStops.join(", ")})`,
                }}
              />

              {/* Inner Hole 3D Bevel & Recessed Shadow */}
              <div
                className="absolute inset-[27px] rounded-full bg-slate-100/90 shadow-[inset_0_4px_8px_rgba(0,0,0,0.35),0_1px_2px_rgba(255,255,255,0.8)]"
                style={{
                  transform: "translateZ(1px)",
                }}
              >
                {/* Floating 3D Counter Pedestal (counter-rotated to face upright) */}
                <div
                  className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-white to-slate-50 shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,1)]"
                  style={{
                    transform: "rotateX(-38deg) translateZ(6px)",
                  }}
                >
                  <strong className="text-[26px] font-[800] leading-none tracking-tight text-slate-900 max-[1150px]:text-[22px]">
                    {employees.length}
                  </strong>
                  <span className="mt-[3px] text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    employees
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[270px] flex-1 max-[600px]:w-full max-[600px]:max-w-full">
            {departments.map((d) => {
              const isSelected = department === d;
              const count =
                departmentCounts.find(({ name }) => name === d)?.count ?? 0;
              const pct = Math.round((count / totalEmployees) * 100);
              return (
                <button
                  key={d}
                  className={`group flex w-full items-center gap-[10px] rounded-[8px] px-2.5 py-[7px] text-left text-[11px] font-medium transition-all duration-150 ${
                    isSelected
                      ? "bg-slate-100 font-semibold text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => {
                    setDepartment(department === d ? "All departments" : d);
                    const directoryElement =
                      document.getElementById("directory");
                    if (directoryElement) {
                      const top =
                        directoryElement.getBoundingClientRect().top +
                        window.scrollY -
                        20;
                      window.scrollTo({
                        top: Math.max(0, top),
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <span
                    className="h-[9px] w-[9px] rounded-full shadow-sm ring-2 ring-white transition-transform group-hover:scale-125"
                    style={{ background: colors[d] }}
                  />
                  <span className="flex-1 truncate text-slate-700 group-hover:text-slate-900">
                    {d === "HR" ? "Human Resources" : d}
                  </span>
                  <strong className="text-[11px] font-bold text-slate-900">
                    {count}
                  </strong>
                  <span className="w-[33px] text-right text-[10px] font-medium text-slate-400">
                    {pct}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </article>
      <article className="rounded-[12px] border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.08)] max-[600px]:p-3.5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-[750] tracking-[-.15px] text-slate-900">
              {activeTab === "Analytics"
                ? "Projects by department"
                : "Performance by department"}
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              {activeTab === "Analytics"
                ? `${stats.projects} projects completed across your workforce`
                : "Good people. Great work."}
            </p>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <ChartNoAxesCombined size={16} />
          </div>
        </div>
        <div className="mt-[22px] flex flex-col gap-[14px]">
          {departments.map((d) => {
            const team = employees.filter((e) => e.department === d);
            const v =
              activeTab === "Analytics"
                ? team.reduce((a, e) => a + e.projectsCompleted, 0)
                : team.reduce((a, e) => a + e.performanceRating, 0) /
                  team.length;
            const pct = (v / (activeTab === "Analytics" ? 100 : 5)) * 100;
            return (
              <div
                className="group flex items-center gap-3 text-[11px] text-slate-600"
                key={d}
              >
                <span className="w-[98px] truncate font-medium text-slate-700 max-[900px]:w-20 max-[900px]:text-[10px] max-[600px]:w-[80px]">
                  {d === "HR" ? "Human Resources" : d}
                </span>
                {/* 3D Sculpted Inset Groove Track */}
                <div className="relative h-[9px] flex-1 overflow-hidden rounded-full bg-slate-100 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.12),0_1px_1px_rgba(255,255,255,0.8)]">
                  {/* 3D Cylindrical Bar with specular highlight and ambient depth shadow */}
                  <div
                    className="relative h-full rounded-full transition-all duration-500 ease-out shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:brightness-110"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(180deg, rgba(255,255,255,0.45) 0%, ${colors[d]} 40%, ${darkColors[d] || colors[d]} 100%)`,
                    }}
                  >
                    {/* Gloss specular reflection line */}
                    <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-full bg-white/30" />
                  </div>
                </div>
                <strong className="w-8 text-right text-[11px] font-bold text-slate-800 tabular-nums">
                  {activeTab === "Analytics" ? v : v.toFixed(2)}
                </strong>
              </div>
            );
          })}
        </div>
        <div className="mt-[18px] flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
          <i className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span>
            {activeTab === "Analytics"
              ? "Completed projects from the employee dataset"
              : "Average rating on a 5-point scale"}
          </span>
        </div>
      </article>
    </section>
  );
}
