export interface Department {
  id: string;
  name: string;
  description: string;
  managerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentPaginatedQuery {
  limit?: number;
  page?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  name?: string;
  managerId?: string;
}

export interface DepartmentPaginatedResponse {
  count: number;
  limit: number;
  page: number;
  data: Department[];
}

export interface CreateDepartmentDto {
  name: string;
  description: string;
  managerId: string | null;
}

export interface IdResponse {
  id: string;
}
