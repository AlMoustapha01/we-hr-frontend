import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivityCard } from "./activity-card";
import { Button } from "@/components/ui/button";

const meta = {
    title: "Components/Dashboard/ActivityCard",
    component: ActivityCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ActivityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: null,
    },
    render: () => (
        <div className="w-[600px]">
            <ActivityCard>
                <ActivityCard.Header>
                    <ActivityCard.Title>Recently Activity</ActivityCard.Title>
                </ActivityCard.Header>
                <ActivityCard.Content>
                    <div className="text-xs text-indigo-200">
                        10.40 AM, Fri 10 Sept 2021
                    </div>
                    <div className="mt-2">
                        <h4 className="font-semibold text-lg mb-2">
                            You Posted a New Job
                        </h4>
                        <p className="text-sm text-indigo-100">
                            Kindly check the requirements and terms of work and make sure everything is right.
                        </p>
                    </div>
                </ActivityCard.Content>
                <ActivityCard.Actions>
                    <div className="text-sm">Today you makes 12 Activity</div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        See All Activity
                    </Button>
                </ActivityCard.Actions>
            </ActivityCard>
        </div>
    ),
};
