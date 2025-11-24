import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Department } from "../types/department";
import { queryKeys } from "../query-keys";

interface UpdateDepartmentParams {
  id: string;
  data: Partial<Omit<Department, "id" | "createdAt" | "updatedAt">>;
}

async function updateDepartment({
  id,
  data,
}: UpdateDepartmentParams): Promise<Department> {
  return api.put<Department>(`/departments/${id}`, data);
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: (data) => {
      // Invalidate all department queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: [queryKeys.departments],
      });
      // Invalidate specific department query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.department, data.id],
      });
    },
  });
}
