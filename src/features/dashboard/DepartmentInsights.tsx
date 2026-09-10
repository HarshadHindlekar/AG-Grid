import { ChartNoAxesCombined } from "lucide-react";
import { employees, departments, colors } from "../../data/employees";
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
  return (
    <section className="mb-[25px] grid grid-cols-2 gap-[19px] max-[900px]:gap-3 max-[600px]:grid-cols-1 min-[1500px]:mb-7">
      <article className="rounded-[9px] border border-[#e1e7dc] bg-white p-5 transition-shadow duration-200 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[13px] font-[650] tracking-[-.1px]">
              Team distribution
            </h2>
            <p className="mt-1.5 text-[10px] text-[#929a8c]">
              A snapshot of where your people belong
            </p>
          </div>
          <span className="whitespace-nowrap rounded border border-[#e9ede3] bg-[#f5f7f1] px-1.5 py-[3px] text-[9px] font-normal text-[#8b9583]">
            {departmentCount} departments
          </span>
        </div>
        <div className="my-[23px] flex items-center justify-center gap-[34px] max-[1150px]:gap-[17px] max-[900px]:gap-3 max-[600px]:gap-[30px] min-[1500px]:gap-12">
          <div
            className="grid h-[145px] w-[145px] shrink-0 rotate-[-90deg] place-items-center rounded-full max-[1150px]:h-[120px] max-[1150px]:w-[120px] max-[900px]:h-[100px] max-[900px]:w-[100px] max-[600px]:h-[125px] max-[600px]:w-[125px]"
            role="img"
            aria-label={chartLabel}
            style={{ background: `conic-gradient(${donutStops.join(", ")})` }}
          >
            <div className="flex h-[111px] w-[111px] rotate-90 flex-col items-center justify-center rounded-full bg-white max-[1150px]:h-[92px] max-[1150px]:w-[92px] max-[900px]:h-[76px] max-[900px]:w-[76px] max-[600px]:h-[95px] max-[600px]:w-[95px]">
              <strong className="text-[29px] font-[650]">
                {employees.length}
              </strong>
              <span className="mt-[3px] text-[10px] text-[#959d8f]">
                employees
              </span>
            </div>
          </div>
          <div className="max-w-[270px] flex-1">
            {departments.map((d) => (
              <button
                key={d}
                className="flex w-full items-center gap-[9px] py-[7px] text-left text-[10px] hover:bg-[#f6f8f3]"
                onClick={() => {
                  setDepartment(department === d ? "All departments" : d);
                  document
                    .getElementById("directory")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <i
                  className="h-[7px] w-[7px] rounded-[2px]"
                  style={{ background: colors[d] }}
                />
                <span className="flex-1 text-[#7c8576]">
                  {d === "HR" ? "Human Resources" : d}
                </span>
                <strong className="text-[11px] font-medium">
                  {departmentCounts.find(({ name }) => name === d)?.count ?? 0}
                </strong>
                <small className="w-[33px] text-right text-[10px] text-[#9fa695]">
                  {Math.round(
                    ((departmentCounts.find(({ name }) => name === d)?.count ??
                      0) /
                      totalEmployees) *
                      100,
                  )}
                </small>
              </button>
            ))}
          </div>
        </div>
      </article>
      <article className="rounded-[9px] border border-[#e1e7dc] bg-white p-5 transition-shadow duration-200 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[13px] font-[650] tracking-[-.1px]">
              {activeTab === "Analytics"
                ? "Projects by department"
                : "Performance by department"}
            </h2>
            <p className="mt-1.5 text-[10px] text-[#929a8c]">
              {activeTab === "Analytics"
                ? `${stats.projects} projects completed across your workforce`
                : "Good people. Great work."}
            </p>
          </div>
          <ChartNoAxesCombined className="text-[#92a085]" size={18} />
        </div>
        <div className="mt-[23px] flex flex-col gap-[15px]">
          {departments.map((d) => {
            const team = employees.filter((e) => e.department === d);
            const v =
              activeTab === "Analytics"
                ? team.reduce((a, e) => a + e.projectsCompleted, 0)
                : team.reduce((a, e) => a + e.performanceRating, 0) /
                  team.length;
            return (
              <div
                className="flex items-center gap-3 text-[10px] text-[#89917f]"
                key={d}
              >
                <span className="w-[94px] max-[900px]:w-20 max-[900px]:text-[9px]">
                  {d === "HR" ? "Human Resources" : d}
                </span>
                <div className="h-[7px] flex-1 overflow-hidden rounded-[2px] bg-[#f3f5ee]">
                  <div
                    className="h-full rounded-[2px]"
                    style={{
                      width: `${(v / (activeTab === "Analytics" ? 100 : 5)) * 100}%`,
                      background: colors[d],
                    }}
                  />
                </div>
                <strong className="w-7 text-right text-[11px] font-medium text-[#63715c]">
                  {activeTab === "Analytics" ? v : v.toFixed(2)}
                </strong>
              </div>
            );
          })}
        </div>
        <div className="mt-[17px] flex items-center gap-1.5 text-[9px] text-[#a1a797]">
          <i className="h-1 w-1 rounded-full bg-[#b7c2ad]" />{" "}
          {activeTab === "Analytics"
            ? "Completed projects from the employee dataset"
            : "Average rating on a 5-point scale"}
        </div>
      </article>
    </section>
  );
}
