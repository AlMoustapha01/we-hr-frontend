import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatCard } from "./stat-card";
import { MiniChart } from "./mini-chart";

const meta = {
    title: "Components/Dashboard/StatCard",
    component: StatCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: null,
    },
    render: () => (
        <StatCard>
            <StatCard.Label>Available Position</StatCard.Label>
            <StatCard.Value>24</StatCard.Value>
            <StatCard.Description variant="danger">
                4 Urgently needed
            </StatCard.Description>
        </StatCard>
    ),
};

export const Primary: Story = {
    args: {
        children: null,
    },
    render: () => (
        <StatCard variant="primary">
            <StatCard.Label>Job Open</StatCard.Label>
            <StatCard.Value>10</StatCard.Value>
            <StatCard.Description variant="info">
                4 Active hiring
            </StatCard.Description>
        </StatCard>
    ),
};

export const WithTrend: Story = {
    args: {
        children: null,
    },
    render: () => (
        <StatCard>
            <StatCard.Label>Total Employees</StatCard.Label>
            <StatCard.Value>216</StatCard.Value>
            <StatCard.Footer>
                <StatCard.Trend value={2} label="Past month" />
            </StatCard.Footer>
        </StatCard>
    ),
};

export const WithChart: Story = {
    args: {
        children: null,
    },
    render: () => (
        <StatCard>
            <StatCard.Label>Total Employees</StatCard.Label>
            <StatCard.Value>216</StatCard.Value>
            <div className="space-y-2">
                <div className="text-xs text-gray-600">120 Men</div>
                <div className="text-xs text-gray-600">96 Women</div>
            </div>
            <StatCard.Footer>
                <StatCard.Trend value={2} label="Past month" />
                <MiniChart color="#ef4444" />
            </StatCard.Footer>
        </StatCard>
    ),
};

export const AllVariants: Story = {
    args: {
        children: null,
    },
    render: () => (
        <div className="grid grid-cols-2 gap-4">
            <StatCard variant="default">
                <StatCard.Label>Default</StatCard.Label>
                <StatCard.Value>100</StatCard.Value>
            </StatCard>
            <StatCard variant="primary">
                <StatCard.Label>Primary</StatCard.Label>
                <StatCard.Value>200</StatCard.Value>
            </StatCard>
            <StatCard variant="secondary">
                <StatCard.Label>Secondary</StatCard.Label>
                <StatCard.Value>300</StatCard.Value>
            </StatCard>
            <StatCard variant="accent">
                <StatCard.Label>Accent</StatCard.Label>
                <StatCard.Value>400</StatCard.Value>
            </StatCard>
        </div>
    ),
};
