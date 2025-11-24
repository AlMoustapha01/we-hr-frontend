"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

import { useGetDepartments } from "@/features/department/api/get-departments";
import { JobPosting } from "@/features/recruitment/types/recruitment";


export const jobSchema = z.object({
    title: z.string().min(1),
    departmentId: z.string().min(1),
    location: z.string().min(1),
    type: z.enum(["full-time", "part-time", "contract", "internship"]),
    experienceLevel: z.enum(["entry", "mid", "senior", "lead"]),
    salaryMin: z.string().min(1),
    salaryMax: z.string().min(1),
    currency: z.string().min(1),
    description: z.string().min(1),
    closingDate: z.date(),
    requirements: z.array(z.string().min(1)),
    responsibilities: z.array(z.string().min(1)),
    benefits: z.array(z.string().min(1)).optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface CreateJobDialogProps {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    onCreateJob?: (job: Omit<JobPosting, "id" | "applicationsCount">) => void;
}

export function CreateJobDialog({ open, onOpenChange, onCreateJob }: CreateJobDialogProps) {
    const { data } = useGetDepartments({ limit: 100 });
    const departments = data?.pages.flatMap((p) => p.data) ?? [];

    const [calendarOpen, setCalendarOpen] = useState(false);

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            departmentId: "",
            location: "",
            type: "full-time",
            experienceLevel: "mid",
            salaryMin: "",
            salaryMax: "",
            currency: "USD",
            description: "",
            closingDate: undefined,
            requirements: [""],
            responsibilities: [""],
            benefits: [""],
        },
    });

    // Field Arrays
    const requirements = useFieldArray({ name: "requirements" as never, control: form.control });
    const responsibilities = useFieldArray({ name: "responsibilities" as never, control: form.control });
    const benefits = useFieldArray({ name: "benefits" as never, control: form.control });

    const onSubmit = (values: JobFormValues) => {
        const department = departments.find((d) => d.id === values.departmentId);
        if (!department) {
            toast.error("Invalid department");
            return;
        }

        const job = {
            ...values,
            department: department.name,
            postedDate: format(new Date(), "yyyy-MM-dd"),
            closingDate: format(values.closingDate, "yyyy-MM-dd"),
            salary: {
                min: parseInt(values.salaryMin),
                max: parseInt(values.salaryMax),
                currency: values.currency,
            },
            status: "open" as const,
            benefits: values.benefits ?? [],
        };

        onCreateJob?.(job);
        toast.success("Job created");
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <DialogDescription>
                        Create a job posting to attract qualified candidates.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">

                        {/* Job Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Senior Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Department + Location */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="departmentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {departments.map((dept) => (
                                                    <SelectItem key={dept.id} value={dept.id}>
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Abidjan, CI" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Type + Level */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-time</SelectItem>
                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                <SelectItem value="contract">Contract</SelectItem>
                                                <SelectItem value="internship">Internship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="experienceLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Experience Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="entry">Entry</SelectItem>
                                                <SelectItem value="mid">Mid</SelectItem>
                                                <SelectItem value="senior">Senior</SelectItem>
                                                <SelectItem value="lead">Lead</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Closing Date */}
                        <FormField
                            control={form.control}
                            name="closingDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Deadline *</FormLabel>
                                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 size-4" />
                                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent align="start" className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(v) => {
                                                    field.onChange(v);
                                                    setCalendarOpen(false);
                                                }}
                                                disabled={(d) => d < new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Salary */}
                        <div className="grid grid-cols-3 gap-4">
                            {["salaryMin", "salaryMax", "currency"].map((fieldName, index) =>
                                fieldName !== "currency" ? (
                                    <FormField
                                        key={fieldName}
                                        control={form.control}
                                        name={fieldName as "salaryMin" | "salaryMax"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{index === 0 ? "Min Salary *" : "Max Salary *"}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        key="currency"
                                        control={form.control}
                                        name="currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                        <SelectItem value="EUR">EUR</SelectItem>
                                                        <SelectItem value="GBP">GBP</SelectItem>
                                                        <SelectItem value="CAD">CAD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                )
                            )}
                        </div>

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description *</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Requirements */}
                        <FieldArrayBlock
                            title="Requirements *"
                            fieldArray={requirements}
                            placeholder="Requirement"
                            control={form.control}
                            name="requirements"
                        />

                        {/* Responsibilities */}
                        <FieldArrayBlock
                            title="Responsibilities *"
                            fieldArray={responsibilities}
                            placeholder="Responsibility"
                            control={form.control}
                            name="responsibilities"
                        />

                        {/* Benefits */}
                        <FieldArrayBlock
                            title="Benefits (Optional)"
                            fieldArray={benefits}
                            placeholder="Benefit"
                            control={form.control}
                            name="benefits"
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.reset();
                                    onOpenChange(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button type="submit">
                                Post Job
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

/* Small helper component for repeated arrays */
interface FieldArrayBlockProps {
    title: string;
    fieldArray: {
        fields: Array<Record<"id", string>>;
        append: (value: string) => void;
        remove: (index: number) => void;
    };
    placeholder: string;
    control: ReturnType<typeof useForm<JobFormValues>>["control"];
    name: "requirements" | "responsibilities" | "benefits";
}

function FieldArrayBlock({ title, fieldArray, placeholder, control, name }: FieldArrayBlockProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">{title}</h3>
                <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => fieldArray.append("")}
                >
                    <Plus className="size-4 mr-1" /> Add
                </Button>
            </div>

            <div className="space-y-2">
                {fieldArray.fields.map((field, index) => (
                    <FormField
                        key={field.id}
                        control={control}
                        name={`${name}.${index}` as `${typeof name}.${number}`}
                        render={({ field: formField }) => (
                            <FormItem>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input
                                            placeholder={`${placeholder} ${index + 1}`}
                                            {...formField}
                                        />
                                    </FormControl>
                                    {fieldArray.fields.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            onClick={() => fieldArray.remove(index)}
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
