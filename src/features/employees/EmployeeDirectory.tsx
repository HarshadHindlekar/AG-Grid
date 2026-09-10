import { useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ArrowUpRight, Search } from "lucide-react";
import type { Employee } from "../../types/employee";
import { gridTheme } from "../../config/grid";
import { DirectoryToolbar } from "./DirectoryToolbar";
import { DirectoryPagination } from "./DirectoryPagination";
import type { EmployeeDirectoryProps } from "../../types/employeeDirectory";

interface NoEmployeesOverlayProps {
  reset?: () => void;
  params?: {
    reset?: () => void;
  };
  api?: {
    setFilterModel: (model: null) => void;
    applyColumnState: (params: { defaultState: { sort: null } }) => void;
  };
}

function NoEmployeesOverlay(props: NoEmployeesOverlayProps) {
  const onReset = () => {
    props.reset?.();
    props.params?.reset?.();
    props.api?.setFilterModel(null);
    props.api?.applyColumnState({ defaultState: { sort: null } });
  };

  return (
    <div className="pointer-events-auto flex flex-col items-center justify-center gap-[15px] bg-white text-[12px] text-[#8d9c7c]">
      <Search size={25} />
      <strong className="font-medium">No employees match your filters.</strong>
      <button
        type="button"
        className="cursor-pointer flex items-center gap-1.5 text-[10px] text-[#417a55] hover:underline"
        onClick={onReset}
      >
        Clear all filters
      </button>
    </div>
  );
}

export function EmployeeDirectory({ controller }: EmployeeDirectoryProps) {
  const {
    grid,
    status,
    setStatus,
    reset,
    rows,
    cols,
    search,
    pageSize,
    updatePagination,
    setSelection,
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
  } = controller;

  const overlayComponentSelector = useCallback(
    () => ({
      component: NoEmployeesOverlay,
      params: { reset },
    }),
    [reset],
  );

  return (
    <section
      id="directory"
      className="overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-between px-[21px] pb-[19px] pt-[21px] max-[600px]:px-[14px] max-[600px]:py-[18px]">
        <div>
          <h2 className="flex items-center gap-[9px] text-[14px] font-[750] tracking-[-.15px] text-slate-900">
            Employee directory{" "}
            <span className="rounded-full border border-emerald-200/90 bg-emerald-50/90 px-2.5 py-[2px] text-[10px] font-bold text-emerald-800">
              {totalEmployees} members
            </span>
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            The people behind the progress.
          </p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 max-[600px]:hidden">
          Click a name to explore their profile <ArrowUpRight size={13} />
        </span>
      </div>
      <div className="flex gap-[22px] border-b border-slate-200 px-5 max-[600px]:gap-4 max-[600px]:px-[14px]">
        {["All employees", "Active", "Inactive"].map((s) => {
          const isActive = status === s;
          const count =
            s === "All employees"
              ? totalEmployees
              : s === "Active"
                ? activeEmployees
                : inactiveEmployees;
          return (
            <button
              key={s}
              className={`relative flex items-center gap-[7px] px-px pb-3 text-[12px] transition-colors ${
                isActive
                  ? "font-bold text-emerald-800 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2.5px] after:rounded-t-full after:bg-emerald-600"
                  : "font-medium text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => setStatus(s)}
            >
              {s}
              <span
                className={`rounded-full px-2 py-0.5 text-[9.5px] ${
                  isActive
                    ? "bg-emerald-100 font-bold text-emerald-800"
                    : "bg-slate-100 font-medium text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <DirectoryToolbar controller={controller} />
      <div className="relative h-[694px] w-full">
        <AgGridReact<Employee>
          ref={grid}
          theme={gridTheme}
          rowData={rows}
          columnDefs={cols}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          getRowId={(p) => String(p.data.id)}
          quickFilterText={search}
          includeHiddenColumnsInQuickFilter
          cacheQuickFilter
          rowHeight={65}
          headerHeight={42}
          pagination
          paginationPageSize={pageSize}
          suppressPaginationPanel
          rowSelection={{
            mode: "multiRow",
            selectAll: "filtered",
            enableClickSelection: false,
          }}
          selectionColumnDef={{ width: 46, pinned: "left" }}
          onPaginationChanged={updatePagination}
          onFilterChanged={updatePagination}
          onSelectionChanged={() =>
            setSelection(grid.current?.api.getSelectedRows().length || 0)
          }
          overlayComponentSelector={overlayComponentSelector}
        />
      </div>
      <DirectoryPagination controller={controller} />
    </section>
  );
}
