import { useMemo } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { MapPin, Star } from "lucide-react";
import type { Employee } from "../../types/employee";
import { colors } from "../../data/employees";
import { money } from "../../utils/format";
import { Avatar } from "../../components/Avatar";

const departmentBadgeClass: Record<string, string> = {
  Engineering: "border-[#e5eadf] bg-[#eff5ee] text-[#6a8d6b]",
  Marketing: "border-[#eee5f5] bg-[#f5f1fa] text-[#9a83ae]",
  Sales: "border-[#e4eafa] bg-[#f0f4fc] text-[#7e93b3]",
  HR: "border-[#f0e8d8] bg-[#faf4ea] text-[#b49b6c]",
  Finance: "border-[#e1ece8] bg-[#edf5f3] text-[#6c9b93]",
};

export function useEmployeeColumns(
  hidden: string[],
  setSelected: (employee: Employee) => void,
) {
  const cols = useMemo<ColDef<Employee>[]>(() => {
    const definitions: ColDef<Employee>[] = [
      {
        colId: "employee",
        headerName: "Employee",
        valueGetter: (p) =>
          p.data ? `${p.data.firstName} ${p.data.lastName}` : "",
        minWidth: 235,
        flex: 1.4,
        pinned: "left",
        cellRenderer: (p: ICellRendererParams<Employee>) =>
          p.data && (
            <button
              className="flex h-full w-full items-center gap-2.5 p-0 text-left"
              onClick={() => setSelected(p.data!)}
            >
              <Avatar person={p.data} />
              <span>
                <strong className="block text-[11px] font-[550] leading-[19px] text-[#46543f] hover:text-[#277451] hover:underline">
                  {p.data.firstName} {p.data.lastName}
                </strong>
                <small className="block text-[9px] leading-[17px] text-[#929b88]">
                  {p.data.email}
                </small>
              </span>
            </button>
          ),
      },
      {
        field: "department",
        minWidth: 140,
        flex: 1,
        cellRenderer: (p: ICellRendererParams<Employee>) => (
          <span
            className={`inline-flex items-center gap-[5px] rounded border bg-[#f5f7f0] px-1.5 py-[3px] text-[9px] leading-[15px] text-[#7c896b] ${departmentBadgeClass[p.value] || "border-[#e5eadf]"}`}
          >
            <i
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: colors[p.value] }}
            />
            {p.value}
          </span>
        ),
      },
      { field: "position", headerName: "Role", minWidth: 165, flex: 1.1 },
      {
        field: "location",
        minWidth: 125,
        cellRenderer: (p: ICellRendererParams<Employee>) => (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#8e9783]">
            <MapPin className="text-[#abb59b]" size={12} />
            {p.value}
          </span>
        ),
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 110,
        valueFormatter: (p) => (p.value ? "Active" : "Inactive"),
        cellRenderer: (p: ICellRendererParams<Employee>) => (
          <span
            className={`inline-flex items-center gap-[5px] text-[10px] ${p.value ? "text-[#6e9467]" : "text-[#9da293]"}`}
          >
            <i
              className={`h-[5px] w-[5px] rounded-full ${p.value ? "bg-[#82a572]" : "bg-[#b5b9ad]"}`}
            />
            {p.value ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        field: "performanceRating",
        headerName: "Rating",
        width: 105,
        filter: "agNumberColumnFilter",
        cellRenderer: (p: ICellRendererParams<Employee>) => (
          <span className="inline-flex items-center gap-[5px] text-[10px] text-[#69765d]">
            <Star size={12} fill="#c4a267" color="#c4a267" />
            {p.value.toFixed(1)}
            <span className="text-[9px] text-[#b0b8a4]">/ 5</span>
          </span>
        ),
      },
      {
        field: "salary",
        headerName: "Salary",
        width: 115,
        filter: "agNumberColumnFilter",
        valueFormatter: (p) => money(p.value),
      },
      {
        field: "projectsCompleted",
        headerName: "Projects",
        width: 100,
        filter: "agNumberColumnFilter",
      },
      { field: "hireDate", headerName: "Hire date", width: 140 },
      {
        field: "manager",
        width: 170,
        valueFormatter: (p) => p.value || "No manager",
      },
      { field: "age", width: 90, filter: "agNumberColumnFilter" },
      {
        field: "skills",
        width: 300,
        valueFormatter: (p) => p.value.join(", "),
      },
    ];

    return definitions.map((c) => ({
      ...c,
      hide: hidden.includes(c.field || ""),
    }));
  }, [hidden, setSelected]);

  return cols;
}
