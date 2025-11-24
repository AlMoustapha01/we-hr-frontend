"use client";

import { useMemo, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { GrowthCard } from "@/components/dashboard/growth-card";
import { Users, UserPlus, UserMinus, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useGetEmployees, useDeleteEmployee, AddEmployeeDialog, EmployeeTable, Employee, EmployeeStatus } from "@/features/employee";
import { useGetDepartments } from "@/features/department";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function EmployeePage() {
    const router = useRouter();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    const { data: employeesData, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetEmployees({
        limit: 50,
    });

    const { data: departmentsData } = useGetDepartments({
        limit: 100,
    });

    const deleteEmployee = useDeleteEmployee();

    const employees = useMemo(() => {
        return employeesData?.pages.flatMap((page) => page.data) || [];
    }, [employeesData]);

    const departments = useMemo(() => {
        return departmentsData?.pages.flatMap((page) => page.data) || [];
    }, [departmentsData]);

    const departmentMap = useMemo(() => {
        return departments.reduce((acc, dept) => {
            acc[dept.id] = dept.name;
            return acc;
        }, {} as Record<string, string>);
    }, [departments]);

    const totalEmployees = employees.length;
    const activeEmployees = employees.filter((e) => e.status === EmployeeStatus.ACTIVE).length;
    const onLeaveEmployees = employees.filter((e) => e.status === EmployeeStatus.ON_LEAVE).length;

    const departmentCounts = employees.reduce(
        (acc, emp) => {
            if (emp.status === EmployeeStatus.ACTIVE) {
                acc[emp.departmentId] = (acc[emp.departmentId] || 0) + 1;
            }
            return acc;
        },
        {} as Record<string, number>
    );

    const topDepartments = Object.entries(departmentCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([deptId, count]) => ({
            label: departmentMap[deptId] || "Unknown Department",
            value: count
        }));

    const growthPercentage = 8;

    const handleEditEmployee = (employee: Employee) => {
        router.push(`/employee/${employee.id}`);
    };

    const handleDeleteEmployee = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!employeeToDelete) return;

        deleteEmployee.mutate(employeeToDelete.id, {
            onSuccess: () => {
                toast.success("Employee deleted", {
                    description: `${employeeToDelete.name} has been deleted successfully.`,
                });
                setDeleteDialogOpen(false);
                setEmployeeToDelete(null);
            },
            onError: (error) => {
                toast.error("Failed to delete employee", {
                    description: error.message,
                });
            },
        });
    };

    return (
        <div className="space-y-6 p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Employee Management</h1>
                    <p className="text-sm text-gray-500">
                        Manage your workforce and track employee metrics
                    </p>
                </div>
                <AddEmployeeDialog />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard variant="primary">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Total Employees</StatCard.Label>
                            <StatCard.Value>{totalEmployees}</StatCard.Value>
                        </div>
                        <Users className="h-8 w-8 text-purple-600" />
                    </div>
                </StatCard>

                <StatCard variant="secondary">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Active</StatCard.Label>
                            <StatCard.Value>{activeEmployees}</StatCard.Value>
                        </div>
                        <UserPlus className="h-8 w-8 text-blue-600" />
                    </div>
                </StatCard>

                <StatCard variant="accent">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>On Leave</StatCard.Label>
                            <StatCard.Value>{onLeaveEmployees}</StatCard.Value>
                        </div>
                        <UserMinus className="h-8 w-8 text-orange-600" />
                    </div>
                </StatCard>

                <StatCard variant="default">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Growth Rate</StatCard.Label>
                            <StatCard.Value>+{growthPercentage}%</StatCard.Value>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                </StatCard>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GrowthCard
                    title="Active Employees"
                    value={activeEmployees}
                    trendPercentage={growthPercentage}
                    breakdown={topDepartments}
                />
                <GrowthCard
                    title="Department Distribution"
                    value={Object.keys(departmentCounts).length}
                    trendPercentage={2}
                    trendLabel="Departments"
                    breakdown={[
                        { value: activeEmployees, label: "Active" },
                        { value: onLeaveEmployees, label: "On Leave" },
                    ]}
                />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">All Employees</h2>
                    <p className="text-sm text-gray-500">
                        A comprehensive list of all employees in the organization
                    </p>
                </div>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-gray-500">Loading employees...</div>
                    </div>
                ) : (
                    <>
                        <EmployeeTable
                            data={employees}
                            onEdit={handleEditEmployee}
                            onDelete={handleDeleteEmployee}
                        />
                        {hasNextPage && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="text-sm text-purple-600 hover:text-purple-700 disabled:opacity-50"
                                >
                                    {isFetchingNextPage ? "Loading more..." : "Load more employees"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Employee"
                description={`Are you sure you want to delete "${employeeToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                variant="destructive"
                isLoading={deleteEmployee.isPending}
            />
        </div>
    );
}
