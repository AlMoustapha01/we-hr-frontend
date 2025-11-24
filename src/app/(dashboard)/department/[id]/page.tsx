"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    useGetDepartment,
    useUpdateDepartment,
    useAssignManager,
    useDeleteDepartment,
} from "@/features/department";
import { useGetDepartmentEmployees, AddEmployeeDialog } from "@/features/employee";
import { toast } from "sonner";
import {
    ArrowLeft,
    Users,
    Building2,
    Loader2,
    Crown,
    UserCircle,
    Trash2,
} from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const updateDepartmentSchema = z.object({
    name: z.string().min(2, "Department name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

type UpdateDepartmentFormValues = z.infer<typeof updateDepartmentSchema>;

export default function DepartmentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const departmentId = params.id as string;

    const [assignManagerOpen, setAssignManagerOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Fetch department details
    const { data: department, isLoading: isDepartmentLoading } = useGetDepartment(departmentId);

    // Fetch department employees
    const { data: employees, isLoading: isEmployeesLoading } = useGetDepartmentEmployees(departmentId);

    // Fetch current manager details
    const { data: currentManager } = useGetDepartment(
        department?.managerId || "",
        !!department?.managerId
    );

    // Update department mutation
    const updateDepartment = useUpdateDepartment();

    // Assign manager mutation
    const assignManager = useAssignManager();

    // Delete department mutation
    const deleteDepartment = useDeleteDepartment();

    // Form for updating department
    const form = useForm<UpdateDepartmentFormValues>({
        resolver: zodResolver(updateDepartmentSchema),
        values: {
            name: department?.name || "",
            description: department?.description || "",
        },
    });

    const handleUpdateDepartment = (values: UpdateDepartmentFormValues) => {
        updateDepartment.mutate(
            {
                id: departmentId,
                data: {
                    name: values.name,
                    description: values.description,
                },
            },
            {
                onSuccess: () => {
                    toast.success("Department updated", {
                        description: "Department information has been updated successfully.",
                    });
                    form.reset(values);
                },
                onError: (error) => {
                    toast.error("Failed to update department", {
                        description: error.message,
                    });
                },
            }
        );
    };

    const handleAssignManager = () => {
        if (!selectedEmployeeId) {
            toast.error("Please select an employee");
            return;
        }

        assignManager.mutate(
            {
                departmentId,
                employeeId: selectedEmployeeId,
            },
            {
                onSuccess: () => {
                    toast.success("Manager assigned successfully");
                    setAssignManagerOpen(false);
                    setSelectedEmployeeId("");
                },
                onError: (error) => {
                    toast.error("Failed to assign manager", {
                        description: error.message,
                    });
                },
            }
        );
    };

    if (isDepartmentLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!department) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Building2 className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Department not found
                </h2>
                <Button onClick={() => router.push("/department")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Departments
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/department")}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {department.name}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {department.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                        {employees?.length || 0} Employees
                    </Badge>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Department Info & Update Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Department Details */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Department Information</CardTitle>
                        <CardDescription>
                            Update department name and description
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(handleUpdateDepartment)}
                            className="space-y-4"
                        >
                            <Field data-invalid={!!form.formState.errors.name}>
                                <FieldLabel htmlFor="name">Department Name</FieldLabel>
                                <Input
                                    id="name"
                                    placeholder="Engineering"
                                    {...form.register("name")}
                                />
                                <FieldError errors={[form.formState.errors.name]} />
                            </Field>

                            <Field data-invalid={!!form.formState.errors.description}>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Department description..."
                                    rows={4}
                                    {...form.register("description")}
                                />
                                <FieldError errors={[form.formState.errors.description]} />
                            </Field>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty || updateDepartment.isPending}
                                >
                                    {updateDepartment.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Manager Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Crown className="h-5 w-5 text-yellow-600" />
                            Department Manager
                        </CardTitle>
                        <CardDescription>
                            Current manager of this department
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {currentManager ? (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-purple-100 text-purple-700">
                                        {currentManager.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {currentManager.name}
                                    </p>
                                    <p className="text-sm text-gray-500">Manager</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-lg">
                                <UserCircle className="h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">No manager assigned</p>
                            </div>
                        )}

                        <Button
                            onClick={() => setAssignManagerOpen(true)}
                            variant="outline"
                            className="w-full"
                        >
                            {currentManager ? "Change Manager" : "Assign Manager"}
                        </Button>

                        <div className="pt-4 border-t text-xs text-gray-500 space-y-1">
                            <p>Created: {new Date(department.createdAt).toLocaleDateString()}</p>
                            <p>Updated: {new Date(department.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Employees List */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Department Employees
                            </CardTitle>
                            <CardDescription>
                                All employees in this department
                            </CardDescription>
                        </div>
                        <AddEmployeeDialog />
                    </div>
                </CardHeader>
                <CardContent>
                    {isEmployeesLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : employees && employees.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {employee.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{employee.name}</p>
                                                    {employee.id === department.managerId && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs mt-1"
                                                        >
                                                            <Crown className="h-3 w-3 mr-1" />
                                                            Manager
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {employee.email}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{employee.position}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {employee.role}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    employee.status === "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {employee.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Users className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-600">No employees in this department</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Assign Manager Dialog */}
            <Dialog open={assignManagerOpen} onOpenChange={setAssignManagerOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Assign Department Manager</DialogTitle>
                        <DialogDescription>
                            Select an employee from this department to assign as manager
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-4">
                        {employees && employees.length > 0 ? (
                            employees.map((employee) => (
                                <div
                                    key={employee.id}
                                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedEmployeeId === employee.id
                                        ? "border-purple-600 bg-purple-50"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => setSelectedEmployeeId(employee.id)}
                                >
                                    <Avatar>
                                        <AvatarFallback>
                                            {employee.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">{employee.name}</p>
                                            {employee.id === department.managerId && (
                                                <Badge variant="secondary" className="text-xs">
                                                    <Crown className="h-3 w-3 mr-1" />
                                                    Current Manager
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">{employee.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline" className="text-xs">
                                                {employee.position}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                {employee.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No employees available
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setAssignManagerOpen(false);
                                setSelectedEmployeeId("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAssignManager}
                            disabled={!selectedEmployeeId || assignManager.isPending}
                        >
                            {assignManager.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                "Assign Manager"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Department Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Department</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{department.name}</strong>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-red-900 mb-1">
                                        Warning
                                    </p>
                                    <p className="text-sm text-red-700">
                                        Deleting this department will affect {employees?.length || 0} employee(s).
                                        Make sure to reassign employees before deletion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                deleteDepartment.mutate(departmentId, {
                                    onSuccess: () => {
                                        toast.success("Department deleted", {
                                            description: "The department has been deleted successfully.",
                                        });
                                        setDeleteDialogOpen(false);
                                        router.push("/department");
                                    },
                                    onError: (error) => {
                                        toast.error("Failed to delete department", {
                                            description: error.message,
                                        });
                                    },
                                });
                            }}
                            disabled={deleteDepartment.isPending}
                        >
                            {deleteDepartment.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Department
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
