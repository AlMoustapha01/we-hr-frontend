export enum EmployeeStatus {
  ACTIVE = "active",
  ON_LEAVE = "on-leave",
  TERMINATED = "terminated",
}

export enum EmployeePosition {
  MANAGER = "Manager",
  SENIOR = "Senior",
  MID_LEVEL = "Mid-Level",
  JUNIOR = "Junior",
  INTERN = "Intern",
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  position: EmployeePosition;
  role: string;
  status: EmployeeStatus;
  joinDate: string;
  salary: number;
  avatar?: string;
}

export interface EmployeeCreateProps {
  name: string;
  email: string;
  phone: string;
  position: EmployeePosition;
  role: string;
  joinDate: Date;
  salary: number;
  departmentId?: string;
  avatar?: string;
}

export interface EmployeePaginatedResponse {
  count: number;
  limit: number;
  page: number;
  data: Employee[];
}
