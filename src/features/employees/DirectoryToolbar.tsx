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
      <div className="flex items-center justify-between gap-[15px] p-4 px-5 max-[900px]:flex-wrap max-[900px]:gap-[5px] max-[600px]:p-4">
        <label className="flex w-[290px] items-center gap-2 rounded-[6px] border border-[#e2e7dc] px-2.5 py-2 text-[#9aa48e] max-[1150px]:w-[235px] max-[900px]:min-w-[220px] max-[900px]:flex-1">
          <Search size={16} />
          <input
            className="w-full border-0 bg-transparent text-[10px] text-[#3e5139] outline-0 placeholder:text-[#a0a793]"
            aria-label="Search employees"
            placeholder="Search by name, email, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="flex p-0"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>
        <div className="flex gap-2 max-[900px]:flex-1 max-[900px]:justify-end max-[600px]:flex-wrap max-[600px]:justify-start">
          <select
            className="rounded-[6px] border border-[#e2e7dc] bg-white px-3 py-2 text-[10px] text-[#78836c]"
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
            className={`inline-flex min-h-[34px] items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#e0e6dd] px-3 py-[9px] text-[11px] hover:bg-[#f1f6ef] ${showFilters ? "bg-[#eef4e9]" : "bg-white"}`}
            onClick={() => setShowFilters((value) => !value)}
          >
            <SlidersHorizontal size={14} />
            Filters
            {location !== "All locations" && (
              <i className="h-[5px] w-[5px] rounded-full bg-[#307754]" />
            )}
          </button>
          <div className="relative" ref={columnsRef}>
            <button
              className="inline-flex min-h-[34px] items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#e0e6dd] bg-white px-3 py-[9px] text-[11px] hover:bg-[#f1f6ef]"
              onClick={() => setShowColumns((value) => !value)}
            >
              <PanelLeftClose size={14} />
              Columns
            </button>
            {showColumns && (
              <div className="absolute right-0 top-[41px] z-30 w-[180px] rounded-[7px] border border-[#e3e8dd] bg-white p-[15px] text-[11px] shadow-[0_10px_30px_#23392024]">
                <strong className="mb-2.5 block">Visible columns</strong>
                {cols
                  .filter((c) => c.field)
                  .map((c) => (
                    <label
                      className="flex items-center gap-2 py-1"
                      key={c.field}
                    >
                      <input
                        type="checkbox"
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
        <div className="flex items-center gap-5 px-5 pb-[15px] text-[11px] max-[900px]:flex-wrap">
          <label className="flex items-center gap-2.5">
            Location{" "}
            <select
              className="rounded-[6px] border border-[#e2e7dc] bg-white px-3 py-2 text-[10px] text-[#78836c]"
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
            className="flex items-center gap-1.5 text-[10px] text-[#417a55]"
            onClick={reset}
          >
            <RotateCcw size={13} />
            Reset all filters & sorting
          </button>
          <small className="text-[9px] text-[#939d86]">
            Use column menus for text and number filters.
          </small>
        </div>
      )}
    </>
  );
}
