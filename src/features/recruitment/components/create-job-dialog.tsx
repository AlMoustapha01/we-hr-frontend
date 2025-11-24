"use client";

import { useState } from "react";
import { JobPosting, JobType, ExperienceLevel } from "@/features/recruitment/types/recruitment";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { mockDepartments } from "@/data/departments";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface CreateJobDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreateJob?: (job: Omit<JobPosting, "id" | "applicationsCount">) => void;
}

export function CreateJobDialog({
    open,
    onOpenChange,
    onCreateJob,
}: CreateJobDialogProps) {
    const [title, setTitle] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState<JobType>("full-time");
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("mid");
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState<string[]>([""]);
    const [responsibilities, setResponsibilities] = useState<string[]>([""]);
    const [benefits, setBenefits] = useState<string[]>([""]);
    const [closingDate, setClosingDate] = useState<Date | undefined>();
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const handleAddItem = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        items: string[]
    ) => {
        setter([...items, ""]);
    };

    const handleRemoveItem = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        items: string[],
        index: number
    ) => {
        if (items.length > 1) {
            setter(items.filter((_, i) => i !== index));
        }
    };

    const handleUpdateItem = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        items: string[],
        index: number,
        value: string
    ) => {
        const updated = [...items];
        updated[index] = value;
        setter(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title || !departmentId || !location || !salaryMin || !salaryMax || !description || !closingDate) {
            toast.error("Please fill in all required fields");
            return;
        }

        const department = mockDepartments.find((d) => d.id === departmentId);
        if (!department) {
            toast.error("Invalid department selected");
            return;
        }

        // Filter out empty items
        const filteredRequirements = requirements.filter((r) => r.trim() !== "");
        const filteredResponsibilities = responsibilities.filter((r) => r.trim() !== "");
        const filteredBenefits = benefits.filter((b) => b.trim() !== "");

        if (filteredRequirements.length === 0 || filteredResponsibilities.length === 0) {
            toast.error("Please add at least one requirement and responsibility");
            return;
        }

        const newJob: Omit<JobPosting, "id" | "applicationsCount"> = {
            title,
            department: department.name,
            departmentId,
            location,
            type,
            experienceLevel,
            salary: {
                min: parseInt(salaryMin),
                max: parseInt(salaryMax),
                currency,
            },
            description,
            requirements: filteredRequirements,
            responsibilities: filteredResponsibilities,
            benefits: filteredBenefits,
            postedDate: format(new Date(), "yyyy-MM-dd"),
            closingDate: format(closingDate, "yyyy-MM-dd"),
            status: "open",
        };

        if (onCreateJob) {
            onCreateJob(newJob);
        }

        toast.success("Job posting created successfully!");
        handleReset();
        onOpenChange(false);
    };

    const handleReset = () => {
        setTitle("");
        setDepartmentId("");
        setLocation("");
        setType("full-time");
        setExperienceLevel("mid");
        setSalaryMin("");
        setSalaryMax("");
        setCurrency("USD");
        setDescription("");
        setRequirements([""]);
        setResponsibilities([""]);
        setBenefits([""]);
        setClosingDate(undefined);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <DialogDescription>
                        Create a new job posting to attract qualified candidates
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6 py-4">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Basic Information</h3>

                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Job Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Senior Full Stack Developer"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="department">Department *</Label>
                                        <Select value={departmentId} onValueChange={setDepartmentId}>
                                            <SelectTrigger id="department">
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockDepartments.map((dept) => (
                                                    <SelectItem key={dept.id} value={dept.id}>
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="location">Location *</Label>
                                        <Input
                                            id="location"
                                            placeholder="e.g., San Francisco, CA (Hybrid)"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Job Type</Label>
                                        <Select value={type} onValueChange={(v) => setType(v as JobType)}>
                                            <SelectTrigger id="type">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-time</SelectItem>
                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                <SelectItem value="contract">Contract</SelectItem>
                                                <SelectItem value="internship">Internship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="level">Experience Level</Label>
                                        <Select
                                            value={experienceLevel}
                                            onValueChange={(v) => setExperienceLevel(v as ExperienceLevel)}
                                        >
                                            <SelectTrigger id="level">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="entry">Entry Level</SelectItem>
                                                <SelectItem value="mid">Mid Level</SelectItem>
                                                <SelectItem value="senior">Senior Level</SelectItem>
                                                <SelectItem value="lead">Lead/Principal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="closingDate">Application Deadline *</Label>
                                    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "justify-start text-left font-normal",
                                                    !closingDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 size-4" />
                                                {closingDate ? format(closingDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={closingDate}
                                                onSelect={(date) => {
                                                    setClosingDate(date);
                                                    setDatePickerOpen(false);
                                                }}
                                                disabled={(date) => date < new Date()}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        {/* Compensation */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Compensation</h3>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="salaryMin">Min Salary *</Label>
                                    <Input
                                        id="salaryMin"
                                        type="number"
                                        placeholder="60000"
                                        value={salaryMin}
                                        onChange={(e) => setSalaryMin(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="salaryMax">Max Salary *</Label>
                                    <Input
                                        id="salaryMax"
                                        type="number"
                                        placeholder="80000"
                                        value={salaryMax}
                                        onChange={(e) => setSalaryMax(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select value={currency} onValueChange={setCurrency}>
                                        <SelectTrigger id="currency">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD</SelectItem>
                                            <SelectItem value="EUR">EUR</SelectItem>
                                            <SelectItem value="GBP">GBP</SelectItem>
                                            <SelectItem value="CAD">CAD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Job Description</h3>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Provide a detailed description of the role..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-sm">Requirements *</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddItem(setRequirements, requirements)}
                                >
                                    <Plus className="size-4 mr-1" />
                                    Add
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {requirements.map((req, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder={`Requirement ${index + 1}`}
                                            value={req}
                                            onChange={(e) =>
                                                handleUpdateItem(setRequirements, requirements, index, e.target.value)
                                            }
                                        />
                                        {requirements.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveItem(setRequirements, requirements, index)}
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-sm">Responsibilities *</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddItem(setResponsibilities, responsibilities)}
                                >
                                    <Plus className="size-4 mr-1" />
                                    Add
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {responsibilities.map((resp, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder={`Responsibility ${index + 1}`}
                                            value={resp}
                                            onChange={(e) =>
                                                handleUpdateItem(setResponsibilities, responsibilities, index, e.target.value)
                                            }
                                        />
                                        {responsibilities.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleRemoveItem(setResponsibilities, responsibilities, index)
                                                }
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-sm">Benefits (Optional)</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddItem(setBenefits, benefits)}
                                >
                                    <Plus className="size-4 mr-1" />
                                    Add
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder={`Benefit ${index + 1}`}
                                            value={benefit}
                                            onChange={(e) =>
                                                handleUpdateItem(setBenefits, benefits, index, e.target.value)
                                            }
                                        />
                                        {benefits.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveItem(setBenefits, benefits, index)}
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                handleReset();
                                onOpenChange(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Post Job</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
