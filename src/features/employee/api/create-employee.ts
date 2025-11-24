import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Employee, EmployeeCreateProps } from "../types/employee";
import { queryKeys } from "../query-keys";

async function createEmployee(data: EmployeeCreateProps): Promise<Employee> {
  return api.post<Employee>("/employees", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    departmentId: data.departmentId,
    position: data.position,
    role: data.role,
    joinDate: data.joinDate.toISOString(),
    salary: data.salary,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.employees],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.employee],
      });
    },
  });
}
