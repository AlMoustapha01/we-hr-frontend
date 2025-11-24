"use client";

import { useState } from "react";
import { Candidate, ApplicationStatus } from "@/features/recruitment/types/recruitment";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreVertical,
    Eye,
    Mail,
    Calendar,
    Star
} from "lucide-react";
import { format } from "date-fns";

interface CandidateTableProps {
    candidates: Candidate[];
    onViewCandidate: (candidate: Candidate) => void;
}

const statusColors: Record<ApplicationStatus, string> = {
    applied: "bg-blue-100 text-blue-700 border-blue-200",
    screening: "bg-yellow-100 text-yellow-700 border-yellow-200",
    interview: "bg-purple-100 text-purple-700 border-purple-200",
    offer: "bg-green-100 text-green-700 border-green-200",
    hired: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
};

export function CandidateTable({ candidates, onViewCandidate }: CandidateTableProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCandidates = candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applied Date</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCandidates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No candidates found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCandidates.map((candidate) => (
                                <TableRow key={candidate.id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-10">
                                                <AvatarImage src={candidate.avatar} />
                                                <AvatarFallback>
                                                    {candidate.name.split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-gray-900">{candidate.name}</p>
                                                <p className="text-sm text-gray-500">{candidate.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-sm">{candidate.position}</p>
                                            <p className="text-xs text-gray-500">{candidate.department}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={statusColors[candidate.status]}>
                                            {candidate.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {format(new Date(candidate.appliedDate), "MMM dd, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {candidate.experience} years
                                    </TableCell>
                                    <TableCell>
                                        {candidate.rating ? (
                                            <div className="flex items-center gap-1">
                                                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{candidate.rating}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-8">
                                                    <MoreVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onViewCandidate(candidate)}>
                                                    <Eye className="size-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Mail className="size-4 mr-2" />
                                                    Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Calendar className="size-4 mr-2" />
                                                    Schedule Interview
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
