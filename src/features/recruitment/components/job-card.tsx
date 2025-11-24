"use client";

import { JobPosting } from "@/features/recruitment/types/recruitment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    MapPin,
    DollarSign,
    Users,
    Briefcase,
    Clock
} from "lucide-react";

interface JobCardProps {
    job: JobPosting;
    onViewDetails: (job: JobPosting) => void;
}

const typeColors = {
    "full-time": "bg-blue-100 text-blue-700 border-blue-200",
    "part-time": "bg-purple-100 text-purple-700 border-purple-200",
    "contract": "bg-orange-100 text-orange-700 border-orange-200",
    "internship": "bg-green-100 text-green-700 border-green-200",
};

const levelColors = {
    "entry": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "mid": "bg-cyan-100 text-cyan-700 border-cyan-200",
    "senior": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "lead": "bg-violet-100 text-violet-700 border-violet-200",
};

export function JobCard({ job, onViewDetails }: JobCardProps) {
    const daysOpen = Math.floor(
        (new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                            {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.department}</p>
                    </div>
                    <Badge
                        variant="outline"
                        className={job.status === "open" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-600"}
                    >
                        {job.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-3">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={typeColors[job.type]}>
                        <Briefcase className="size-3 mr-1" />
                        {job.type}
                    </Badge>
                    <Badge variant="outline" className={levelColors[job.experienceLevel]}>
                        {job.experienceLevel}
                    </Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0" />
                        <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="size-4 shrink-0" />
                        <span>
                            {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="size-4 shrink-0" />
                        <span>{job.applicationsCount} applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="size-4 shrink-0" />
                        <span>Posted {daysOpen} days ago</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {job.description}
                </p>
            </CardContent>

            <CardFooter className="pt-3 border-t">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewDetails(job)}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
