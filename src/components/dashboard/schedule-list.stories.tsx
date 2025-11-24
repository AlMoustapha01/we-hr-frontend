import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScheduleList } from "./schedule-list";
import { Button } from "@/components/ui/button";

const meta = {
    title: "Components/Dashboard/ScheduleList",
    component: ScheduleList,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ScheduleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: null,
    },
    render: () => (
        <div className="w-[400px]">
            <ScheduleList>
                <ScheduleList.Header>
                    <ScheduleList.Title>Upcoming Schedule</ScheduleList.Title>
                    <ScheduleList.Date>Today, 13 Sep 2021</ScheduleList.Date>
                </ScheduleList.Header>

                <ScheduleList.Section title="Priority">
                    <ScheduleList.Items>
                        <ScheduleList.Item>
                            <div className="flex-1">
                                <ScheduleList.ItemTitle>
                                    Review candidate applications
                                </ScheduleList.ItemTitle>
                                <ScheduleList.ItemTime>Today - 11:30 AM</ScheduleList.ItemTime>
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
                                <ScheduleList.ItemTime>Today - 10:30 AM</ScheduleList.ItemTime>
                            </div>
                            <ScheduleList.ItemActions />
                        </ScheduleList.Item>

                        <ScheduleList.Item>
                            <div className="flex-1">
                                <ScheduleList.ItemTitle>
                                    Short meeting with product designer from IT Departement
                                </ScheduleList.ItemTitle>
                                <ScheduleList.ItemTime>Today - 09:15 AM</ScheduleList.ItemTime>
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
    ),
};
