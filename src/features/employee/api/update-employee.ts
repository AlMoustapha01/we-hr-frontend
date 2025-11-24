import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Employee } from "../types/employee";
import { queryKeys } from "../query-keys";

interface UpdateEmployeeParams {
  id: string;
  data: Partial<Omit<Employee, "id" | "createdAt" | "updatedAt" | "status">>;
}

async function updateEmployee({
  id,
  data,
}: UpdateEmployeeParams): Promise<Employee> {
  return api.put<Employee>(`/employees/${id}`, data);
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: (data) => {
      // Invalidate all employee queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: [queryKeys.employees],
      });
      // Invalidate specific employee query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.employees, data.id],
      });
    },
  });
}
