import dataset from "./employees.json";
import type { Employee } from "../types/employee";

export const employees: Employee[] = dataset.employees;

export const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

export const colors: Record<string, string> = {
  Engineering: "#10b981",
  Marketing: "#6366f1",
  Sales: "#f59e0b",
  HR: "#ec4899",
  Finance: "#06b6d4",
};

export const darkColors: Record<string, string> = {
  Engineering: "#047857",
  Marketing: "#4338ca",
  Sales: "#b45309",
  HR: "#be185d",
  Finance: "#0e7490",
};
