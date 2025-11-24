"use client";

import { useState } from "react";
import { JobPosting, Candidate } from "@/features/recruitment/types/recruitment";
import { StatCard } from "@/components/dashboard/stat-card";
import { JobCard } from "@/features/recruitment/components/job-card";
import { CandidateTable } from "@/features/recruitment/components/candidate-table";
import { CreateJobDialog } from "@/features/recruitment/components/create-job-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Briefcase,
    Users,
    UserCheck,
    TrendingUp,
    Plus,
    MapPin,
    DollarSign,
    Calendar,
    Mail,
    Phone,
    GraduationCap,
    Star,
} from "lucide-react";
import { format } from "date-fns";
import { mockCandidates, mockJobPostings } from "@/features/recruitment/data/recruitment";

export default function RecruitmentPage() {
    const [jobs, setJobs] = useState<JobPosting[]>(mockJobPostings);
    const [candidates] = useState<Candidate[]>(mockCandidates);
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [jobDialogOpen, setJobDialogOpen] = useState(false);
    const [candidateSheetOpen, setCandidateSheetOpen] = useState(false);
    const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false);

    // Calculate stats
    const openPositions = jobs.filter((j) => j.status === "open").length;
    const totalCandidates = candidates.length;
    const newApplications = candidates.filter(
        (c) => c.status === "applied"
    ).length;
    const interviewsScheduled = candidates.filter(
        (c) => c.status === "interview"
    ).length;

    const handleViewJob = (job: JobPosting) => {
        setSelectedJob(job);
        setJobDialogOpen(true);
    };

    const handleViewCandidate = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setCandidateSheetOpen(true);
    };

    const handleCreateJob = (newJob: Omit<JobPosting, "id" | "applicationsCount">) => {
        const jobWithId: JobPosting = {
            ...newJob,
            id: (jobs.length + 1).toString(),
            applicationsCount: 0,
        };
        setJobs([jobWithId, ...jobs]);
    };

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Recruitment
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage job postings and track candidates
                    </p>
                </div>
                <Button onClick={() => setCreateJobDialogOpen(true)}>
                    <Plus className="size-4 mr-2" />
                    Post New Job
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard variant="primary">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Open Positions</StatCard.Label>
                            <StatCard.Value>{openPositions}</StatCard.Value>
                        </div>
                        <Briefcase className="h-8 w-8 text-purple-600" />
                    </div>
                </StatCard>

                <StatCard variant="secondary">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Total Candidates</StatCard.Label>
                            <StatCard.Value>{totalCandidates}</StatCard.Value>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                    </div>
                </StatCard>

                <StatCard variant="accent">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>New Applications</StatCard.Label>
                            <StatCard.Value>{newApplications}</StatCard.Value>
                        </div>
                        <UserCheck className="h-8 w-8 text-orange-600" />
                    </div>
                </StatCard>

                <StatCard variant="default">
                    <div className="flex items-center justify-between">
                        <div>
                            <StatCard.Label>Interviews</StatCard.Label>
                            <StatCard.Value>{interviewsScheduled}</StatCard.Value>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                </StatCard>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="jobs" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="jobs">Job Postings</TabsTrigger>
                    <TabsTrigger value="candidates">Candidates</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onViewDetails={handleViewJob}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="candidates">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                All Candidates
                            </h2>
                            <p className="text-sm text-gray-500">
                                Track and manage candidate applications
                            </p>
                        </div>
                        <CandidateTable
                            candidates={candidates}
                            onViewCandidate={handleViewCandidate}
                        />
                    </div>
                </TabsContent>
            </Tabs>

            {/* Job Details Dialog */}
            <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {selectedJob && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <DialogTitle className="text-2xl">
                                            {selectedJob.title}
                                        </DialogTitle>
                                        <DialogDescription className="mt-2 text-base">
                                            {selectedJob.department}
                                        </DialogDescription>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={
                                            selectedJob.status === "open"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-gray-100 text-gray-600"
                                        }
                                    >
                                        {selectedJob.status}
                                    </Badge>
                                </div>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                                {/* Job Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="size-4 text-gray-500" />
                                        <span>{selectedJob.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Briefcase className="size-4 text-gray-500" />
                                        <span className="capitalize">{selectedJob.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="size-4 text-gray-500" />
                                        <span>
                                            {selectedJob.salary.currency}{" "}
                                            {selectedJob.salary.min.toLocaleString()} -{" "}
                                            {selectedJob.salary.max.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="size-4 text-gray-500" />
                                        <span>{selectedJob.applicationsCount} applicants</span>
                                    </div>
                                </div>

                                <Separator />

                                {/* Description */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                                    <p className="text-gray-600">{selectedJob.description}</p>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        {selectedJob.requirements.map((req, idx) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Responsibilities */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">
                                        Responsibilities
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        {selectedJob.responsibilities.map((resp, idx) => (
                                            <li key={idx}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Benefits</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        {selectedJob.benefits.map((benefit, idx) => (
                                            <li key={idx}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>

                                <Separator />

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button className="flex-1">Share Job</Button>
                                    <Button variant="outline" className="flex-1">
                                        Edit Job
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Candidate Details Sheet */}
            <Sheet open={candidateSheetOpen} onOpenChange={setCandidateSheetOpen}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    {selectedCandidate && (
                        <>
                            <SheetHeader>
                                <div className="flex items-start gap-4">
                                    <Avatar className="size-16">
                                        <AvatarImage src={selectedCandidate.avatar} />
                                        <AvatarFallback>
                                            {selectedCandidate.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <SheetTitle className="text-xl">
                                            {selectedCandidate.name}
                                        </SheetTitle>
                                        <SheetDescription className="mt-1">
                                            {selectedCandidate.position}
                                        </SheetDescription>
                                        <Badge
                                            variant="outline"
                                            className={`mt-2 ${selectedCandidate.status === "hired"
                                                ? "bg-green-100 text-green-700"
                                                : selectedCandidate.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {selectedCandidate.status}
                                        </Badge>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="mt-6 space-y-6">
                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold">Contact Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="size-4 text-gray-500" />
                                            <a
                                                href={`mailto:${selectedCandidate.email}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {selectedCandidate.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="size-4 text-gray-500" />
                                            <span>{selectedCandidate.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="size-4 text-gray-500" />
                                            <span>{selectedCandidate.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Education & Experience */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold">Background</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-start gap-2">
                                            <GraduationCap className="size-4 text-gray-500 mt-0.5" />
                                            <span>{selectedCandidate.education}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="size-4 text-gray-500" />
                                            <span>{selectedCandidate.experience} years experience</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Skills */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map((skill, idx) => (
                                            <Badge key={idx} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                {selectedCandidate.rating && (
                                    <>
                                        <Separator />
                                        <div className="space-y-3">
                                            <h3 className="font-semibold">Rating</h3>
                                            <div className="flex items-center gap-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`size-5 ${i < selectedCandidate.rating!
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Application Info */}
                                <Separator />
                                <div className="space-y-3">
                                    <h3 className="font-semibold">Application Details</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="size-4 text-gray-500" />
                                            <span>
                                                Applied on{" "}
                                                {format(
                                                    new Date(selectedCandidate.appliedDate),
                                                    "MMMM dd, yyyy"
                                                )}
                                            </span>
                                        </div>
                                        {selectedCandidate.interviewDate && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="size-4 text-gray-500" />
                                                <span>
                                                    Interview on{" "}
                                                    {format(
                                                        new Date(selectedCandidate.interviewDate),
                                                        "MMMM dd, yyyy"
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                {selectedCandidate.notes && (
                                    <>
                                        <Separator />
                                        <div className="space-y-3">
                                            <h3 className="font-semibold">Notes</h3>
                                            <p className="text-sm text-gray-600">
                                                {selectedCandidate.notes}
                                            </p>
                                        </div>
                                    </>
                                )}

                                <Separator />

                                {/* Actions */}
                                <div className="space-y-2">
                                    <Button className="w-full">
                                        <Mail className="size-4 mr-2" />
                                        Send Email
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Calendar className="size-4 mr-2" />
                                        Schedule Interview
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* Create Job Dialog */}
            <CreateJobDialog
                open={createJobDialogOpen}
                onOpenChange={setCreateJobDialogOpen}
                onCreateJob={handleCreateJob}
            />
        </div>
    );
}
