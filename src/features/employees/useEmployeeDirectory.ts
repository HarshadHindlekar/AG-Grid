import type { EmployeeDirectoryController } from "../../types/employeeDirectory";
import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { Employee } from "../../types/employee";
import { employees } from "../../data/employees";
import { useEmployeeColumns } from "./useEmployeeColumns";
export function useEmployeeDirectory(
  onSelect: (employee: Employee) => void,
): EmployeeDirectoryController {
  const grid = useRef<AgGridReact<Employee>>(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [status, setStatus] = useState("All employees");
  const [location, setLocation] = useState("All locations");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [hidden, setHidden] = useState<string[]>([
    "hireDate",
    "manager",
    "age",
    "skills",
  ]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(employees.length);
  const [pageSize, setPageSize] = useState(10);
  const [selection, setSelection] = useState(0);
  const employeeCounts = useMemo(
    () => ({
      totalEmployees: employees.length,
      activeEmployees: employees.filter((employee) => employee.isActive).length,
      inactiveEmployees: employees.filter((employee) => !employee.isActive)
        .length,
    }),
    [],
  );
  const rows = useMemo(
    () =>
      employees.filter(
        (e) =>
          (department === "All departments" || e.department === department) &&
          (status === "All employees" ||
            e.isActive === (status === "Active")) &&
          (location === "All locations" || e.location === location),
      ),
    [department, status, location],
  );

  const cols = useEmployeeColumns(hidden, onSelect);
  const updatePagination = useCallback(() => {
    const api = grid.current?.api;
    if (api) {
      setPage(api.paginationGetCurrentPage());
      setPages(api.paginationGetTotalPages());
      setCount(api.getDisplayedRowCount());
    }
  }, []);
  const reset = useCallback(() => {
    setSearch("");
    setDepartment("All departments");
    setStatus("All employees");
    setLocation("All locations");
    grid.current?.api.setFilterModel(null);
    grid.current?.api.applyColumnState({ defaultState: { sort: null } });
  }, []);

  const exportReport = useCallback(() => {
    grid.current?.api.exportDataAsCsv({
      fileName: "factwise-employees.csv",
      onlySelected: selection > 0,
      processCellCallback: (p) =>
        Array.isArray(p.value)
          ? p.value.join(", ")
          : typeof p.value === "string" && /^[=+@\-\t\r]/.test(p.value)
            ? `'${p.value}`
            : p.value,
    });
  }, [selection]);
  return {
    grid,
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
    location,
    setLocation,
    showFilters,
    setShowFilters,
    showColumns,
    setShowColumns,
    hidden,
    setHidden,
    page,
    pages,
    count,
    pageSize,
    setPageSize,
    selection,
    setSelection,
    ...employeeCounts,
    rows,
    cols,
    updatePagination,
    reset,
    exportReport,
  };
}
