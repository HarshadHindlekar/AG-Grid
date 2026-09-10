import { useEffect, useRef } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  PanelLeftClose,
  RotateCcw,
} from "lucide-react";
import { employees, departments } from "../../data/employees";
import type { EmployeeDirectoryProps } from "../../types/employeeDirectory";

export function DirectoryToolbar({ controller }: EmployeeDirectoryProps) {
  const {
    search,
    setSearch,
    department,
    setDepartment,
    showFilters,
    setShowFilters,
    location,
    setLocation,
    showColumns,
    setShowColumns,
    cols,
    hidden,
    setHidden,
    reset,
  } = controller;

  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showColumns) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        columnsRef.current &&
        !columnsRef.current.contains(event.target as Node)
      ) {
        setShowColumns(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowColumns(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showColumns, setShowColumns]);

  return (
    <>
      <div className="flex items-center justify-between gap-[15px] p-4 px-5 max-[900px]:flex-wrap max-[900px]:gap-[8px] max-[600px]:p-4">
        <label className="flex w-[290px] items-center gap-2 rounded-[8px] border border-slate-200 bg-slate-50/70 px-3 py-2 text-slate-400 transition-colors focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 max-[1150px]:w-[235px] max-[900px]:min-w-[220px] max-[900px]:flex-1">
          <Search size={15} />
          <input
            className="w-full border-0 bg-transparent text-[11px] text-slate-800 outline-0 placeholder:text-slate-400"
            aria-label="Search employees"
            placeholder="Search by name, email, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="flex p-0 text-slate-400 hover:text-slate-600"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>
        <div className="flex gap-2 max-[900px]:flex-1 max-[900px]:justify-end max-[600px]:flex-wrap max-[600px]:justify-start">
          <select
            className="rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            aria-label="Filter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>All departments</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <button
            className={`inline-flex min-h-[34px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border px-3.5 py-[8px] text-[11px] font-medium shadow-sm transition-colors ${showFilters ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"}`}
            onClick={() => setShowFilters((value) => !value)}
          >
            <SlidersHorizontal size={14} />
            Filters
            {location !== "All locations" && (
              <i className="h-[6px] w-[6px] rounded-full bg-emerald-600 shadow-sm shadow-emerald-600/50" />
            )}
          </button>
          <div className="relative" ref={columnsRef}>
            <button
              className="inline-flex min-h-[34px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-slate-200 bg-white px-3.5 py-[8px] text-[11px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setShowColumns((value) => !value)}
            >
              <PanelLeftClose size={14} />
              Columns
            </button>
            {showColumns && (
              <div className="absolute right-0 top-[42px] z-30 w-[190px] rounded-[10px] border border-slate-200 bg-white p-4 text-[11px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
                <strong className="mb-2.5 block font-bold text-slate-900">
                  Visible columns
                </strong>
                {cols
                  .filter((c) => c.field)
                  .map((c) => (
                    <label
                      className="flex cursor-pointer items-center gap-2 py-1 text-slate-700 hover:text-slate-900"
                      key={c.field}
                    >
                      <input
                        type="checkbox"
                        className="accent-emerald-600"
                        checked={!hidden.includes(c.field!)}
                        onChange={() =>
                          setHidden((h) =>
                            h.includes(c.field!)
                              ? h.filter((f) => f !== c.field)
                              : [...h, c.field!],
                          )
                        }
                      />
                      {c.headerName ||
                        c.field!.replace(/^[a-z]/, (s) => s.toUpperCase())}
                    </label>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showFilters && (
        <div className="flex items-center gap-5 px-5 pb-[16px] text-[11px] max-[900px]:flex-wrap">
          <label className="flex items-center gap-2.5 font-medium text-slate-600">
            Location{" "}
            <select
              className="rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Filter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All locations</option>
              {[...new Set(employees.map((e) => e.location))]
                .sort()
                .map((l) => (
                  <option key={l}>{l}</option>
                ))}
            </select>
          </label>
          <button
            className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            onClick={reset}
          >
            <RotateCcw size={13} />
            Reset all filters & sorting
          </button>
          <small className="text-[10px] text-slate-400">
            Use column menus for text and number filters.
          </small>
        </div>
      )}
    </>
  );
}
