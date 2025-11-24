import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "../query-keys";

async function deleteEmployee(employeeId: string): Promise<void> {
  return api.delete<void>(`/employees/${employeeId}`);
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      // Invalidate all employee queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: [queryKeys.employees],
      });
    },
  });
}
