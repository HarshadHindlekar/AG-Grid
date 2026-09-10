import type { WorkforceStats } from "../../types/dashboard";
import { useMemo } from "react";
import { employees } from "../../data/employees";

export function useWorkforceStats(): WorkforceStats {
  const stats = useMemo(
    () => ({
      total: employees.length,
      departmentCount: new Set(employees.map((employee) => employee.department))
        .size,
      active: employees.filter((e) => e.isActive).length,
      rating:
        employees.reduce((a, e) => a + e.performanceRating, 0) /
        (employees.length || 1),
      salary:
        employees.reduce((a, e) => a + e.salary, 0) / (employees.length || 1),
      projects: employees.reduce((a, e) => a + e.projectsCompleted, 0),
    }),
    [],
  );

  return stats;
}
