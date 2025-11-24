import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { buildQueryParams, Filter } from "@/lib/query-builder";
import { DepartmentPaginatedResponse } from "../types/department";
import { queryKeys } from "../query-keys";

export const getAllDepartments = async ({
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
}): Promise<DepartmentPaginatedResponse> => {
  const params = buildQueryParams({
    page,
    limit,
    orderBy,
    orderDirection,
    filters,
  });

  const response = await api.get<DepartmentPaginatedResponse>("/departments", {
    params: params as Record<string, string | number | boolean | undefined>,
  });

  return response;
};

export const getInfiniteDepartmentsQueryOptions = (
  limit = 10,
  options?: {
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
    filters?: Filter;
  }
) => {
  return infiniteQueryOptions({
    queryKey: [queryKeys.departments, options],
    queryFn: ({ pageParam }) => {
      return getAllDepartments({
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

type UseInfiniteDepartmentsOptions = {
  limit?: number;
  enabled?: boolean;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  filters?: Filter;
};

export const useGetDepartments = (
  options: UseInfiniteDepartmentsOptions = {}
) => {
  const { limit = 10, enabled, orderBy, orderDirection, filters } = options;

  return useInfiniteQuery({
    ...getInfiniteDepartmentsQueryOptions(limit, {
      orderBy,
      orderDirection,
      filters,
    }),
    enabled,
  });
};
