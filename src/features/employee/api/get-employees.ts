import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { buildQueryParams, Filter } from "@/lib/query-builder";
import { EmployeePaginatedResponse } from "../types/employee";
import { queryKeys } from "../query-keys";

export const getAllEmployees = async ({
  page = 1,
  limit = 10,
  orderBy,
  orderDirection,
  filters,
}: {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  filters?: Filter;
}): Promise<EmployeePaginatedResponse> => {
  const params = buildQueryParams({
    page,
    limit,
    orderBy,
    orderDirection,
    filters,
  });

  const response = await api.get<EmployeePaginatedResponse>("/employees", {
    params: params as Record<string, string | number | boolean | undefined>,
  });

  return response;
};

export const getInfiniteEmployeesQueryOptions = (
  limit = 10,
  options?: {
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
    filters?: Filter;
  }
) => {
  return infiniteQueryOptions({
    queryKey: [queryKeys.employees, options],
    queryFn: ({ pageParam }) => {
      return getAllEmployees({
        page: pageParam,
        limit,
        orderBy: options?.orderBy,
        orderDirection: options?.orderDirection,
        filters: options?.filters,
      });
    },
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.count / lastPage.limit);
      if (lastPage.page < totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

type UseInfiniteEmployeesOptions = {
  limit?: number;
  enabled?: boolean;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  filters?: Filter;
};

export const useGetEmployees = (options: UseInfiniteEmployeesOptions = {}) => {
  const { limit = 10, enabled, orderBy, orderDirection, filters } = options;

  return useInfiniteQuery({
    ...getInfiniteEmployeesQueryOptions(limit, {
      orderBy,
      orderDirection,
      filters,
    }),
    enabled,
  });
};
