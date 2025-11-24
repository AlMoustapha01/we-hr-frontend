import { DashboardData } from "@/types/dashboard";

export const dashboardData: DashboardData = {
  stats: [
    {
      label: "Available Position",
      value: 24,
      description: "4 Urgently needed",
      descriptionVariant: "danger",
      variant: "default",
    },
    {
      label: "Job Open",
      value: 10,
      description: "4 Active hiring",
      descriptionVariant: "info",
      variant: "primary",
    },
    {
      label: "New Employees",
      value: 24,
      description: "4 Department",
      descriptionVariant: "info",
      variant: "secondary",
    },
    {
      label: "Total Employees",
      value: 216,
      details: [
        { label: "Men", value: 120 },
        { label: "Women", value: 96 },
      ],
      trend: {
        value: 2,
        label: "Past month",
      },
      variant: "default",
      chartData: [20, 40, 30, 50, 45, 60, 55, 70],
      chartColor: "#ef4444",
    },
    {
      label: "Talent Request",
      value: 16,
      details: [
        { label: "Men", value: 6 },
        { label: "Women", value: 10 },
      ],
      trend: {
        value: 5,
        label: "Past month",
      },
      variant: "default",
      chartData: [15, 35, 25, 45, 40, 55, 50, 65],
      chartColor: "#ef4444",
    },
  ],
  activity: {
    timestamp: "10.40 AM, Fri 10 Sept 2021",
    title: "You Posted a New Job",
    description:
      "Kindly check the requirements and terms of work and make sure everything is right.",
    activityCount: 12,
  },
  announcements: [
    {
      id: "1",
      title: "Outing schedule for every departement",
      time: "5 Minutes ago",
      isPinned: false,
    },
    {
      id: "2",
      title: "Meeting HR Department",
      time: "Yesterday, 12:30 PM",
      isPinned: true,
    },
    {
      id: "3",
      title: "IT Department need two more talents for UX/UI Designer position",
      time: "Yesterday, 09:15 AM",
      isPinned: false,
    },
  ],
  schedule: [
    {
      title: "Priority",
      items: [
        {
          id: "1",
          title: "Review candidate applications",
          time: "Today - 11:30 AM",
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          id: "2",
          title: "Interview with candidates",
          time: "Today - 10:30 AM",
        },
        {
          id: "3",
          title: "Short meeting with product designer from IT Departement",
          time: "Today - 09:15 AM",
        },
      ],
    },
  ],
};
