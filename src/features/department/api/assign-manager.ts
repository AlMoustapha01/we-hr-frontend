import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "../query-keys";

interface AssignManagerParams {
  departmentId: string;
  employeeId: string;
}

async function assignManager({
  departmentId,
  employeeId,
}: AssignManagerParams): Promise<void> {
  return api.put<void>(`/departments/${departmentId}/assign-manager`, {
    employeeId,
  });
}

export function useAssignManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignManager,
    onSuccess: (_, variables) => {
      // Invalidate department queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: [queryKeys.departments],
      });
      // Invalidate specific department query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.department, variables.departmentId],
      });
    },
  });
}
