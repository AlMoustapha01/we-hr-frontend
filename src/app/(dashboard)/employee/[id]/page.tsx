"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetEmployee, useUpdateEmployee, useDeleteEmployee, EmployeePosition, EmployeeStatus } from "@/features/employee";
import { useGetDepartments, useGetDepartment } from "@/features/department";
import { toast } from "sonner";
import {
    ArrowLeft,
    User,
    Loader2,
    Trash2,
    Mail,
    Phone,
    Calendar,
    Building2,
    Briefcase,
    DollarSign,
} from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DatePicker } from "@/components/ui/date-picker";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const positions = Object.values(EmployeePosition);

const updateEmployeeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    position: z.enum(EmployeePosition),
    role: z.string().min(2, "Role must be at least 2 characters"),
    joinDate: z.date(),
    salary: z.number().min(0, "Salary must be a positive number"),
    departmentId: z.string().min(1, "Please select a department"),
});

type UpdateEmployeeFormValues = z.infer<typeof updateEmployeeSchema>;

export default function EmployeeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const employeeId = params.id as string;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [departmentOpen, setDepartmentOpen] = useState(false);

    // Fetch employee details
    const { data: employee, isLoading: isEmployeeLoading } = useGetEmployee(employeeId);

    // Fetch departments for dropdown
    const { data: departmentsData, isLoading: isLoadingDepartments } = useGetDepartments({
        limit: 100,
    });

    const departments = departmentsData?.pages.flatMap((page) => page.data) || [];

    // Fetch current department details
    const { data: currentDepartment } = useGetDepartment(
        employee?.departmentId || "",
        !!employee?.departmentId
    );

    // Update employee mutation
    const updateEmployee = useUpdateEmployee();

    // Delete employee mutation
    const deleteEmployee = useDeleteEmployee();

    // Form for updating employee
    const form = useForm<UpdateEmployeeFormValues>({
        resolver: zodResolver(updateEmployeeSchema),
        values: employee ? {
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            position: employee.position,
            role: employee.role,
            joinDate: new Date(employee.joinDate),
            salary: employee.salary,
            departmentId: employee.departmentId,
        } : undefined,
    });


    const handleUpdateEmployee = (values: UpdateEmployeeFormValues) => {
        updateEmployee.mutate(
            {
                id: employeeId,
                data: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    position: values.position,
                    role: values.role,
                    joinDate: values.joinDate.toISOString(),
                    salary: values.salary,
                    departmentId: values.departmentId,
                },
            },
            {
                onSuccess: () => {
                    toast.success("Employee updated", {
                        description: "Employee information has been updated successfully.",
                    });
                    form.reset(values);
                },
                onError: (error) => {
                    toast.error("Failed to update employee", {
                        description: error.message,
                    });
                },
            }
        );
    };

    const handleDeleteEmployee = () => {
        deleteEmployee.mutate(employeeId, {
            onSuccess: () => {
                toast.success("Employee deleted", {
                    description: "The employee has been deleted successfully.",
                });
                setDeleteDialogOpen(false);
                router.push("/employee");
            },
            onError: (error) => {
                toast.error("Failed to delete employee", {
                    description: error.message,
                });
            },
        });
    };

    if (isEmployeeLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <User className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Employee not found
                </h2>
                <Button onClick={() => router.push("/employee")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Employees
                </Button>
            </div>
        );
    }

    const statusColors = {
        [EmployeeStatus.ACTIVE]: "bg-green-100 text-green-800",
        [EmployeeStatus.ON_LEAVE]: "bg-yellow-100 text-yellow-800",
        [EmployeeStatus.TERMINATED]: "bg-red-100 text-red-800",
    };

    return (
        <div className="space-y-6 p-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/employee")}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg bg-purple-100 text-purple-700">
                            {employee.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {employee.name}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {employee.role} • {currentDepartment?.name || "No Department"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className={statusColors[employee.status as keyof typeof statusColors]}>
                        {employee.status}
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

            {/* Employee Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Employee Information</CardTitle>
                        <CardDescription>
                            Update employee details and information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(handleUpdateEmployee)}
                            className="space-y-4"
                        >
                            {/* Name and Email */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field data-invalid={!!form.formState.errors.name}>
                                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        {...form.register("name")}
                                    />
                                    <FieldError errors={[form.formState.errors.name]} />
                                </Field>
                                <Field data-invalid={!!form.formState.errors.email}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@company.com"
                                        {...form.register("email")}
                                    />
                                    <FieldError errors={[form.formState.errors.email]} />
                                </Field>
                            </div>

                            {/* Phone and Join Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field data-invalid={!!form.formState.errors.phone}>
                                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 234 567 8900"
                                        {...form.register("phone")}
                                    />
                                    <FieldError errors={[form.formState.errors.phone]} />
                                </Field>
                                <Field data-invalid={!!form.formState.errors.joinDate}>
                                    <FieldLabel htmlFor="joinDate">Join Date</FieldLabel>
                                    <Controller
                                        name="joinDate"
                                        control={form.control}
                                        render={({ field }) => (
                                            <DatePicker
                                                date={field.value}
                                                onDateChange={(date) => field.onChange(date || new Date())}
                                            />
                                        )}
                                    />
                                    <FieldError errors={[form.formState.errors.joinDate]} />
                                </Field>
                            </div>

                            {/* Department */}
                            <Field data-invalid={!!form.formState.errors.departmentId} className="flex flex-col">
                                <FieldLabel htmlFor="departmentId">Department</FieldLabel>
                                <Controller
                                    name="departmentId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={departmentOpen}
                                                    className="w-full justify-between"
                                                    disabled={isLoadingDepartments}
                                                >
                                                    {field.value
                                                        ? departments.find((dept) => dept.id === field.value)?.name
                                                        : "Select department..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search departments..." />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            {isLoadingDepartments
                                                                ? "Loading departments..."
                                                                : "No departments found."}
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {departments.map((department) => (
                                                                <CommandItem
                                                                    key={department.id}
                                                                    value={department.name}
                                                                    onSelect={() => {
                                                                        field.onChange(
                                                                            department.id === field.value
                                                                                ? ""
                                                                                : department.id
                                                                        );
                                                                        setDepartmentOpen(false);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value === department.id
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {department.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                <FieldError errors={[form.formState.errors.departmentId]} />
                            </Field>

                            {/* Position and Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field data-invalid={!!form.formState.errors.position}>
                                    <FieldLabel htmlFor="position">Position</FieldLabel>
                                    <Controller
                                        name="position"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select position" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {positions.map((pos) => (
                                                        <SelectItem key={pos} value={pos}>
                                                            {pos}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FieldError errors={[form.formState.errors.position]} />
                                </Field>

                            </div>

                            {/* Role */}
                            <Field data-invalid={!!form.formState.errors.role}>
                                <FieldLabel htmlFor="role">Role</FieldLabel>
                                <Input
                                    id="role"
                                    placeholder="e.g., Full Stack Developer"
                                    {...form.register("role")}
                                />
                                <FieldError errors={[form.formState.errors.role]} />
                            </Field>

                            {/* Salary */}
                            <Field data-invalid={!!form.formState.errors.salary}>
                                <FieldLabel htmlFor="salary">Annual Salary (USD)</FieldLabel>
                                <Controller
                                    name="salary"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            id="salary"
                                            type="number"
                                            placeholder="75000"
                                            min="0"
                                            step="1000"
                                            value={field.value}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        />
                                    )}
                                />
                                <FieldError errors={[form.formState.errors.salary]} />
                            </Field>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={!form.formState.isDirty || updateEmployee.isPending}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty || updateEmployee.isPending}
                                >
                                    {updateEmployee.isPending ? (
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

                {/* Quick Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Information</CardTitle>
                        <CardDescription>
                            Employee overview and details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-600" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm font-medium truncate">{employee.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Phone className="h-5 w-5 text-gray-600" />
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm font-medium">{employee.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Building2 className="h-5 w-5 text-gray-600" />
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Department</p>
                                <p className="text-sm font-medium">
                                    {currentDepartment?.name || "No Department"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Briefcase className="h-5 w-5 text-gray-600" />
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Position</p>
                                <p className="text-sm font-medium">{employee.position}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-600" />
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Join Date</p>
                                <p className="text-sm font-medium">
                                    {new Date(employee.joinDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <DollarSign className="h-5 w-5 text-gray-600" />
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Annual Salary</p>
                                <p className="text-sm font-medium">
                                    ${employee.salary.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Employee Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Employee</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{employee.name}</strong>?
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
                                        This will permanently remove {employee.name} from the system.
                                        All associated data will be deleted.
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
                            onClick={handleDeleteEmployee}
                            disabled={deleteEmployee.isPending}
                        >
                            {deleteEmployee.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Employee
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
