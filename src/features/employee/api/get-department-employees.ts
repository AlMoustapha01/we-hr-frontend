import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Employee } from "../types/employee";
import { queryKeys } from "../query-keys";

async function getDepartmentEmployees(
  departmentId: string
): Promise<Employee[]> {
  return api.get<Employee[]>(`/employees/department/${departmentId}`);
}

export function useGetDepartmentEmployees(
  departmentId: string,
  enabled = true
) {
  return useQuery({
    queryKey: [queryKeys.employees, "department", departmentId],
    queryFn: () => getDepartmentEmployees(departmentId),
    enabled: enabled && !!departmentId,
  });
}
