import type { Dispatch, RefObject, SetStateAction } from "react";
import type { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import type { Employee } from "./employee";

export interface EmployeeDirectoryController {
  grid: RefObject<AgGridReact<Employee> | null>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  department: string;
  setDepartment: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  showColumns: boolean;
  setShowColumns: Dispatch<SetStateAction<boolean>>;
  hidden: string[];
  setHidden: Dispatch<SetStateAction<string[]>>;
  page: number;
  pages: number;
  count: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  selection: number;
  setSelection: Dispatch<SetStateAction<number>>;
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  rows: Employee[];
  cols: ColDef<Employee>[];
  updatePagination: () => void;
  reset: () => void;
  exportReport: () => void;
}

export interface EmployeeDirectoryProps {
  controller: EmployeeDirectoryController;
}
