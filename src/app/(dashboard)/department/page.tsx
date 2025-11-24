"use client";

import { useState, useMemo } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Building2, Users, Briefcase, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { AddDepartmentDialog, DepartmentCard, useGetDepartments, useDeleteDepartment, Department } from "@/features/department";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DepartmentPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

    // Fetch departments with infinite query
    const { data: departmentsData, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetDepartments({
        limit: 50,
    });

    // Delete department mutation
    const deleteDepartment = useDeleteDepartment();

    const departments = useMemo(() => {
        return departmentsData?.pages.flatMap((page) => page.data) || [];
    }, [departmentsData]);

    const totalDepartments = departments.length;

    const totalEmployees = 0; // TODO: Calculate from department employees
    const totalOpenPositions = 0; // TODO: Calculate from department data
    const avgEmployeesPerDept = totalDepartments > 0 ? Math.round(totalEmployees / totalDepartments) : 0;

    const filteredDepartments = departments.filter((dept) =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteDepartment = (department: Department) => {
        setDepartmentToDelete(department);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!departmentToDelete) return;

        deleteDepartment.mutate(departmentToDelete.id, {
            onSuccess: () => {
                toast.success("Department deleted", {
                    description: `${departmentToDelete.name} has been deleted successfully.`,
                });
                setDeleteDialogOpen(false);
                setDepartmentToDelete(null);
            },
            onError: (error) => {
                toast.error("Failed to delete department", {
                    description: error.message,
                });
            },
        });
    };

    return (
        <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Department Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage departments and track organizational structure
                    </p>
                </div>
                <AddDepartmentDialog />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard variant="primary">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Total Departments</StatCard.Label>
                            <StatCard.Value>{totalDepartments}</StatCard.Value>
                        </div>
                        <Building2 className="h-8 w-8 text-purple-600" />
                    </div>
                </StatCard>

                <StatCard variant="secondary">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Total Employees</StatCard.Label>
                            <StatCard.Value>{totalEmployees}</StatCard.Value>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                    </div>
                </StatCard>

                <StatCard variant="accent">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Open Positions</StatCard.Label>
                            <StatCard.Value>{totalOpenPositions}</StatCard.Value>
                        </div>
                        <Briefcase className="h-8 w-8 text-orange-600" />
                    </div>
                </StatCard>

                <StatCard variant="default">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Avg per Dept</StatCard.Label>
                            <StatCard.Value>{avgEmployeesPerDept}</StatCard.Value>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                </StatCard>
            </div>

            <div className="flex items-center gap-4">
                <Input
                    placeholder="Search departments by name, description, or manager..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                />
                {searchQuery && (
                    <p className="text-sm text-gray-500">
                        Found {filteredDepartments.length} department(s)
                    </p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">All Departments</h2>
                {isLoading ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                        <p className="text-sm text-gray-500">Loading departments...</p>
                    </div>
                ) : filteredDepartments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No departments found
                        </h3>
                        <p className="text-sm text-gray-500">
                            {searchQuery
                                ? "Try adjusting your search query"
                                : "Get started by creating your first department"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDepartments.map((department) => (
                                <DepartmentCard
                                    key={department.id}
                                    department={department}
                                    onDelete={handleDeleteDepartment}
                                />
                            ))}
                        </div>
                        {hasNextPage && (
                            <div className="flex justify-center mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                >
                                    {isFetchingNextPage ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading more...
                                        </>
                                    ) : (
                                        "Load More"
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Department"
                description={`Are you sure you want to delete "${departmentToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                variant="destructive"
                isLoading={deleteDepartment.isPending}
            />
        </div>
    );
}
