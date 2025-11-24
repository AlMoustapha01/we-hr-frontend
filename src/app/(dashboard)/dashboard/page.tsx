"use client";

import { useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { AnnouncementList } from "@/components/dashboard/announcement-list";
import { ScheduleList } from "@/components/dashboard/schedule-list";
import { GrowthCard } from "@/components/dashboard/growth-card";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

const announcements = [
    {
        title: "Outing schedule for every departement",
        time: "5 Minutes ago",
    },
    {
        title: "Meeting HR Department",
        time: "Yesterday, 12:30 PM",
    },
    {
        title: "IT Department need two more talents for UX/UI Designer position",
        time: "Yesterday, 09:15 AM",
    },
];
export default function DashboardPage() {
    const [announcementDate, setAnnouncementDate] = useState<Date>(new Date());
    const [scheduleDate, setScheduleDate] = useState<Date>(new Date());
    return (
        <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
                    <p className="text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
                </div>
            </div>

            {/* Main Layout - Responsive Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Left Column - Stats & Announcements (2/3 width on xl screens) */}
                <div className="xl:col-span-3 space-y-6">
                    {/* Stats Grid - Top Row (3 cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <StatCard variant="accent">
                            <StatCard.Label>Available Position</StatCard.Label>
                            <StatCard.Value>24</StatCard.Value>
                            <StatCard.Description variant="danger">
                                4 Urgently needed
                            </StatCard.Description>
                        </StatCard>

                        <StatCard variant="primary">
                            <StatCard.Label>Job Open</StatCard.Label>
                            <StatCard.Value>10</StatCard.Value>
                            <StatCard.Description variant="info">
                                4 Active hiring
                            </StatCard.Description>
                        </StatCard>

                        <StatCard variant="secondary">
                            <StatCard.Label>New Employees</StatCard.Label>
                            <StatCard.Value>24</StatCard.Value>
                            <StatCard.Description variant="info">
                                4 Department
                            </StatCard.Description>
                        </StatCard>
                    </div>

                    {/* Stats Grid - Bottom Row (2 cards with more detail) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <GrowthCard
                            title="Total Employees"
                            value={216}
                            trendPercentage={2}
                            breakdown={[
                                { value: 120, label: "Men" },
                                { value: 96, label: "Women" },
                            ]}
                        />

                        <GrowthCard
                            title="Talent Request"
                            value={16}
                            trendPercentage={5}
                            breakdown={[
                                { value: 6, label: "Men" },
                                { value: 10, label: "Women" },
                            ]}
                        />
                    </div>

                    {/* Announcements */}
                    <AnnouncementList>
                        <AnnouncementList.Header>
                            <AnnouncementList.Title>Announcement</AnnouncementList.Title>
                            <DatePicker
                                date={announcementDate}
                                onDateChange={(date) => date && setAnnouncementDate(date)}
                                className="text-sm text-gray-500"
                            />
                        </AnnouncementList.Header>

                        <AnnouncementList.Items>
                            {announcements.map((announcement) => (
                                <AnnouncementList.Item className="flex justify-between items-center" key={announcement.title}>
                                    <div className="flex-1">
                                        <AnnouncementList.ItemTitle>
                                            {announcement.title}
                                        </AnnouncementList.ItemTitle>
                                        <AnnouncementList.ItemTime>
                                            {announcement.time}
                                        </AnnouncementList.ItemTime>
                                    </div>
                                    <AnnouncementList.ItemActions />
                                </AnnouncementList.Item>
                            ))}
                        </AnnouncementList.Items>
                        <AnnouncementList.Footer>
                            <Button variant="link" className="text-red-500 hover:text-red-600">
                                See All Announcement
                            </Button>
                        </AnnouncementList.Footer>
                    </AnnouncementList>
                </div>

                {/* Right Column - Activity & Schedule (1/3 width on xl screens) */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Recent Activity */}
                    <ActivityCard>
                        <ActivityCard.Header>
                            <ActivityCard.Title>Recently Activity</ActivityCard.Title>
                        </ActivityCard.Header>
                        <ActivityCard.Content>
                            <div className="text-xs text-indigo-200">
                                10.40 AM, Fri 10 Sept 2021
                            </div>
                            <div className="mt-3">
                                <h4 className="font-semibold text-lg mb-2">
                                    You Posted a New Job
                                </h4>
                                <p className="text-sm text-indigo-100 leading-relaxed">
                                    Kindly check the requirements and terms of work and make sure everything is right.
                                </p>
                            </div>
                        </ActivityCard.Content>
                        <ActivityCard.Actions>
                            <div className="text-sm">Today you makes 12 Activity</div>
                            <Button
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                See All Activity
                            </Button>
                        </ActivityCard.Actions>
                    </ActivityCard>

                    {/* Upcoming Schedule */}
                    <ScheduleList>
                        <ScheduleList.Header>
                            <ScheduleList.Title>Upcoming Schedule</ScheduleList.Title>
                            <DatePicker
                                date={scheduleDate}
                                onDateChange={(date) => date && setScheduleDate(date)}
                                className="text-sm text-gray-500"
                            />
                        </ScheduleList.Header>

                        <ScheduleList.Section title="Priority">
                            <ScheduleList.Items>
                                <ScheduleList.Item>
                                    <div className="flex-1">
                                        <ScheduleList.ItemTitle>
                                            Review candidate applications
                                        </ScheduleList.ItemTitle>
                                        <ScheduleList.ItemTime>
                                            Today - 11:30 AM
                                        </ScheduleList.ItemTime>
                                    </div>
                                    <ScheduleList.ItemActions />
                                </ScheduleList.Item>
                            </ScheduleList.Items>
                        </ScheduleList.Section>

                        <ScheduleList.Section title="Other">
                            <ScheduleList.Items>
                                <ScheduleList.Item>
                                    <div className="flex-1">
                                        <ScheduleList.ItemTitle>
                                            Interview with candidates
                                        </ScheduleList.ItemTitle>
                                        <ScheduleList.ItemTime>
                                            Today - 10:30 AM
                                        </ScheduleList.ItemTime>
                                    </div>
                                    <ScheduleList.ItemActions />
                                </ScheduleList.Item>

                                <ScheduleList.Item>
                                    <div className="flex-1">
                                        <ScheduleList.ItemTitle>
                                            Short meeting with product designer from IT Departement
                                        </ScheduleList.ItemTitle>
                                        <ScheduleList.ItemTime>
                                            Today - 09:15 AM
                                        </ScheduleList.ItemTime>
                                    </div>
                                    <ScheduleList.ItemActions />
                                </ScheduleList.Item>
                            </ScheduleList.Items>
                        </ScheduleList.Section>

                        <ScheduleList.Footer>
                            <Button variant="link" className="text-red-500 hover:text-red-600">
                                Create a New Schedule
                            </Button>
                        </ScheduleList.Footer>
                    </ScheduleList>
                </div>
            </div>
        </div>
    );
}
