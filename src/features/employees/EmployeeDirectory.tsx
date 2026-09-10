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
      className="overflow-hidden rounded-[9px] border border-[#e1e6dc] bg-white"
    >
      <div className="flex items-center justify-between px-[21px] pb-[19px] pt-[21px] max-[600px]:px-[14px] max-[600px]:py-[18px]">
        <div>
          <h2 className="flex items-center gap-[9px] text-[13px] font-[650] tracking-[-.1px]">
            Employee directory{" "}
            <span className="rounded-xl bg-[#f0f4eb] px-[7px] py-[3px] text-[9px] font-normal text-[#7d9070]">
              {totalEmployees} members
            </span>
          </h2>
          <p className="mt-1.5 text-[10px] text-[#929a8c]">
            The people behind the progress.
          </p>
        </div>
        <span className="flex items-center gap-1 text-[9px] text-[#9ba590] max-[600px]:hidden">
          Click a name to explore their profile <ArrowUpRight size={13} />
        </span>
      </div>
      <div className="flex gap-[22px] border-b border-[#e7ece1] px-5 max-[600px]:gap-4 max-[600px]:px-[14px]">
        {["All employees", "Active", "Inactive"].map((s) => (
          <button
            key={s}
            className={`relative flex items-center gap-[7px] px-px pb-3 text-[11px] ${status === s ? "font-semibold text-[#376b48] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-[#527c46]" : "text-[#919a88]"}`}
            onClick={() => setStatus(s)}
          >
            {s}
            <span className="rounded border border-[#edf0e8] bg-[#f4f6ef] px-[5px] py-px text-[9px]">
              {s === "All employees"
                ? totalEmployees
                : s === "Active"
                  ? activeEmployees
                  : inactiveEmployees}
            </span>
          </button>
        ))}
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
