export interface StatCardData {
  label: string;
  value: number | string;
  description?: string;
  descriptionVariant?: "default" | "success" | "warning" | "danger" | "info";
  trend?: {
    value: number;
    label?: string;
  };
  details?: {
    label: string;
    value: string | number;
  }[];
  variant?: "default" | "primary" | "secondary" | "accent";
  chartData?: number[];
  chartColor?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  time: string;
  isPinned?: boolean;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  label?: string;
}

export interface ScheduleSection {
  title: string;
  items: ScheduleItem[];
}

export interface ActivityData {
  timestamp: string;
  title: string;
  description: string;
  activityCount?: number;
}

export interface DashboardData {
  stats: StatCardData[];
  activity: ActivityData;
  announcements: AnnouncementItem[];
  schedule: ScheduleSection[];
}
