import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrowthCard } from "./growth-card";

const meta = {
    title: "Components/Dashboard/GrowthCard",
    component: GrowthCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof GrowthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalEmployees: Story = {
    args: {
        title: "Total Employees",
        value: 216,
        trendPercentage: 2,
        breakdown: [
            { value: 120, label: "Men" },
            { value: 96, label: "Women" },
        ],
    },
    render: (args) => (
        <div className="w-[320px]">
            <GrowthCard {...args} />
        </div>
    ),
};

export const TalentRequest: Story = {
    args: {
        title: "Talent Request",
        value: 16,
        trendPercentage: 5,
        breakdown: [
            { value: 6, label: "Men" },
            { value: 10, label: "Women" },
        ],
    },
    render: (args) => (
        <div className="w-[320px]">
            <GrowthCard {...args} />
        </div>
    ),
};

export const WithoutBreakdown: Story = {
    args: {
        title: "Total Revenue",
        value: "$24,500",
        trendPercentage: 12,
    },
    render: (args) => (
        <div className="w-[320px]">
            <GrowthCard {...args} />
        </div>
    ),
};

export const NegativeTrend: Story = {
    args: {
        title: "Open Positions",
        value: 8,
        trendPercentage: -3,
        breakdown: [
            { value: 5, label: "Engineering" },
            { value: 3, label: "Marketing" },
        ],
    },
    render: (args) => (
        <div className="w-[320px]">
            <GrowthCard {...args} />
        </div>
    ),
};
