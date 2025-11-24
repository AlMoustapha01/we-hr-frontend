import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "../query-keys";

async function deleteDepartment(departmentId: string): Promise<void> {
  return api.delete<void>(`/departments/${departmentId}`);
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      // Invalidate all department queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: [queryKeys.departments],
      });
    },
  });
}
