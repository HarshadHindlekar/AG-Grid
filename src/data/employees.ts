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
  Engineering: "#498e79",
  Marketing: "#90b7a8",
  Sales: "#c2d9bd",
  HR: "#d8c99e",
  Finance: "#929fae",
};
