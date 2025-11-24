"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { DatePicker } from "@/components/ui/date-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EmployeePosition } from "@/features/employee/types/employee";
import { useCreateEmployee } from "@/features/employee/api";
import { useGetDepartments } from "@/features/department/api";
import { ApiError } from "@/lib/api-client";
import { toast } from "sonner";
import { Plus, Loader2, Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface AddEmployeeDialogProps {
    onSuccess?: () => void;
}

const positions = Object.values(EmployeePosition);

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    position: z.nativeEnum(EmployeePosition),
    role: z.string().min(2, "Role must be at least 2 characters"),
    joinDate: z.date(),
    salary: z.number().min(0, "Salary must be a positive number"),
    departmentId: z.string().min(1, "Please select a department"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddEmployeeDialog({ onSuccess }: AddEmployeeDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [departmentOpen, setDepartmentOpen] = React.useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            position: EmployeePosition.MID_LEVEL,
            role: "",
            joinDate: new Date(),
            salary: 0,
            departmentId: "",
        },
    });

    // Fetch departments
    const { data: departmentsData, isLoading: isLoadingDepartments } = useGetDepartments({
        limit: 100,
    });

    const departments = React.useMemo(() => {
        return departmentsData?.pages.flatMap((page) => page.data) || [];
    }, [departmentsData]);

    const createEmployee = useCreateEmployee();
    const selectedDepartmentId = form.watch("departmentId");

    const handleSubmit = (values: FormValues) => {
        createEmployee.mutate(
            values,
            {
                onSuccess: () => {
                    toast.success("Employee created", {
                        description: "The employee has been added successfully.",
                    });
                    setOpen(false);
                    form.reset();
                    onSuccess?.();
                },
                onError: (error: Error) => {
                    if (error instanceof ApiError) {
                        switch (error.code) {
                            case "EMPLOYEE.EMAIL_ALREADY_EXISTS":
                                toast.error("Email already exists", {
                                    description: "An employee with this email already exists.",
                                });
                                form.setError("email", {
                                    type: "manual",
                                    message: "Email already exists",
                                });
                                break;
                            case "EMPLOYEE.DEPARTMENT_NOT_FOUND":
                                toast.error("Department not found", {
                                    description: "The specified department does not exist.",
                                });
                                form.setError("departmentId", {
                                    type: "manual",
                                    message: "Department not found",
                                });
                                break;
                            default:
                                toast.error("Failed to create employee", {
                                    description: error.message || "An unexpected error occurred.",
                                });
                        }
                    } else {
                        toast.error("Failed to create employee", {
                            description: error.message || "An unexpected error occurred.",
                        });
                    }
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Employee
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Add New Employee</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new employee to the system.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
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
                                    <DatePicker
                                        date={form.watch("joinDate")}
                                        onDateChange={(date) => form.setValue("joinDate", date || new Date())}
                                    />
                                    <FieldError errors={[form.formState.errors.joinDate]} />
                                </Field>
                            </div>

                            {/* Department and Position */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field data-invalid={!!form.formState.errors.departmentId} className="flex flex-col">
                                    <FieldLabel htmlFor="departmentId">Department</FieldLabel>
                                    <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={departmentOpen}
                                                className="w-full justify-between"
                                                disabled={isLoadingDepartments}
                                            >
                                                {selectedDepartmentId
                                                    ? departments.find(
                                                        (dept) => dept.id === selectedDepartmentId
                                                    )?.name
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
                                                                    form.setValue(
                                                                        "departmentId",
                                                                        department.id === selectedDepartmentId
                                                                            ? ""
                                                                            : department.id
                                                                    );
                                                                    setDepartmentOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        selectedDepartmentId === department.id
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
                                    <FieldError errors={[form.formState.errors.departmentId]} />
                                </Field>
                                <Field data-invalid={!!form.formState.errors.position}>
                                    <FieldLabel htmlFor="position">Position</FieldLabel>
                                    <Select
                                        value={form.watch("position")}
                                        onValueChange={(value) => form.setValue("position", value as EmployeePosition)}
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
                                <Input
                                    id="salary"
                                    type="number"
                                    placeholder="75000"
                                    min="0"
                                    step="1000"
                                    value={form.watch("salary")}
                                    onChange={(e) => form.setValue("salary", parseFloat(e.target.value) || 0)}
                                />
                                <FieldError errors={[form.formState.errors.salary]} />
                            </Field>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={createEmployee.isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createEmployee.isPending}>
                                {createEmployee.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Add Employee
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
