"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldDescription,
} from "@/components/ui/field";
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
import { useCreateDepartment } from "@/features/department/api";
import { useGetEmployees } from "@/features/employee/api";
import { ApiError } from "@/lib/api-client";
import { toast } from "sonner";
import { Plus, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmployeePosition, EmployeeStatus } from "@/features/employee/types/employee";

interface AddDepartmentDialogProps {
    onSuccess?: () => void;
}

const formSchema = z.object({
    name: z.string().min(2, "Department name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    managerId: z.string().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddDepartmentDialog({ onSuccess }: AddDepartmentDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [managerOpen, setManagerOpen] = React.useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            managerId: null,
        },
    });

    const { data: employeesData, isLoading: isLoadingEmployees } = useGetEmployees({
        limit: 100,
        filters: {
            position: {
                $in: [EmployeePosition.MANAGER, EmployeePosition.SENIOR],
            },
            status: {
                $eq: EmployeeStatus.ACTIVE,
            },
        },
    });

    const eligibleEmployees = employeesData?.pages.flatMap((page) => page.data) || [];

    console.log(eligibleEmployees);

    const createDepartment = useCreateDepartment();
    const selectedManagerId = useWatch({
        control: form.control,
        name: "managerId",
    });

    const handleSubmit = (values: FormValues) => {
        createDepartment.mutate(values, {
            onSuccess: () => {
                toast.success("Department created", {
                    description: "The department has been created successfully.",
                });
                setOpen(false);
                form.reset();
                onSuccess?.();
            },
            onError: (error: Error) => {
                if (error instanceof ApiError) {
                    switch (error.code) {
                        case "DEPARTMENT.ALREADY_EXISTS":
                            toast.error("Department already exists", {
                                description: "A department with this name already exists.",
                            });
                            form.setError("name", {
                                type: "manual",
                                message: "Department already exists",
                            });
                            break;
                        case "DEPARTMENT.MANAGER_NOT_FOUND":
                            toast.error("Manager not found", {
                                description: "The specified manager does not exist.",
                            });
                            form.setError("managerId", {
                                type: "manual",
                                message: "Manager not found",
                            });
                            break;
                        case "DEPARTMENT.EMPLOYEE_NOT_ELIGIBLE_FOR_MANAGER":
                            toast.error("Employee not eligible", {
                                description: "Employee must be at least Senior level to be a manager.",
                            });
                            form.setError("managerId", {
                                type: "manual",
                                message: "Must be Senior level or above",
                            });
                            break;
                        default:
                            toast.error("Failed to create department", {
                                description: error.message || "An unexpected error occurred.",
                            });
                    }
                } else {
                    toast.error("Failed to create department", {
                        description: error.message || "An unexpected error occurred.",
                    });
                }
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Department
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Add New Department</DialogTitle>
                            <DialogDescription>
                                Create a new department in your organization.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Field data-invalid={!!form.formState.errors.name}>
                                <FieldLabel htmlFor="name">Department Name</FieldLabel>
                                <Input
                                    id="name"
                                    placeholder="e.g., Engineering"
                                    {...form.register("name")}
                                />
                                <FieldError errors={[form.formState.errors.name]} />
                            </Field>

                            <Field data-invalid={!!form.formState.errors.description}>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the department's role and responsibilities"
                                    className="resize-none"
                                    rows={3}
                                    {...form.register("description")}
                                />
                                <FieldError errors={[form.formState.errors.description]} />
                            </Field>

                            <Field data-invalid={!!form.formState.errors.managerId}>
                                <FieldLabel htmlFor="managerId">Department Manager (Optional)</FieldLabel>
                                <FieldDescription>
                                    Select a Senior or Manager level employee
                                </FieldDescription>
                                <Popover open={managerOpen} onOpenChange={setManagerOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={managerOpen}
                                            className="w-full justify-between"
                                            disabled={isLoadingEmployees}
                                        >
                                            {selectedManagerId
                                                ? eligibleEmployees.find(
                                                    (emp) => emp.id === selectedManagerId
                                                )?.name
                                                : "Select manager..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search employees..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    {isLoadingEmployees
                                                        ? "Loading employees..."
                                                        : "No eligible employees found."}
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {eligibleEmployees.map((employee) => (
                                                        <CommandItem
                                                            key={employee.id}
                                                            value={employee.name}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "managerId",
                                                                    employee.id === selectedManagerId
                                                                        ? null
                                                                        : employee.id
                                                                );
                                                                setManagerOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selectedManagerId === employee.id
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            <div className="flex flex-col">
                                                                <span>{employee.name}</span>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {employee.position} • {employee.departmentId}
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FieldError errors={[form.formState.errors.managerId]} />
                            </Field>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={createDepartment.isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createDepartment.isPending}>
                                {createDepartment.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create Department
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
