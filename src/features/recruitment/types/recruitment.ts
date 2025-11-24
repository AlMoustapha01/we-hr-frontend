export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export type JobType = "full-time" | "part-time" | "contract" | "internship";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  departmentId: string;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  closingDate: string;
  status: "open" | "closed" | "draft";
  applicationsCount: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  jobId: string;
  department: string;
  status: ApplicationStatus;
  appliedDate: string;
  experience: number; // years
  education: string;
  location: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  notes?: string;
  interviewDate?: string;
  rating?: number; // 1-5
}

export interface RecruitmentStats {
  totalJobs: number;
  openPositions: number;
  totalCandidates: number;
  newApplications: number;
  interviewsScheduled: number;
  offersExtended: number;
  hiredThisMonth: number;
}
