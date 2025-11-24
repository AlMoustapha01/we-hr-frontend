import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Employee } from "../types/employee";
import { queryKeys } from "../query-keys";

async function getEmployee(id: string): Promise<Employee> {
  return api.get<Employee>(`/employees/${id}`);
}

export function useGetEmployee(id: string, enabled = true) {
  return useQuery({
    queryKey: [queryKeys.employees, id],
    queryFn: () => getEmployee(id),
    enabled: enabled && !!id,
  });
}
