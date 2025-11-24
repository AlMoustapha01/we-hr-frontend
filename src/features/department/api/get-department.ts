import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Department } from "../types/department";
import { queryKeys } from "../query-keys";

async function getDepartment(id: string): Promise<Department> {
  return api.get<Department>(`/departments/${id}`);
}

export function useGetDepartment(id: string, enabled = true) {
  return useQuery({
    queryKey: [queryKeys.department, id],
    queryFn: () => getDepartment(id),
    enabled: enabled && !!id,
  });
}
