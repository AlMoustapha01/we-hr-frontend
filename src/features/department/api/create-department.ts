import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CreateDepartmentDto, IdResponse } from "../types/department";
import { queryKeys } from "../query-keys";

async function createDepartment(
  data: CreateDepartmentDto
): Promise<IdResponse> {
  return api.post<IdResponse>("/departments", {
    name: data.name,
    description: data.description,
    managerId: data.managerId,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.departments],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.department],
      });
    },
  });
}
