import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnnouncementList } from "./announcement-list";
import { Button } from "@/components/ui/button";

const meta = {
    title: "Components/Dashboard/AnnouncementList",
    component: AnnouncementList,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof AnnouncementList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: null,
    },
    render: () => (
        <div className="w-[600px]">
            <AnnouncementList>
                <AnnouncementList.Header>
                    <AnnouncementList.Title>Announcement</AnnouncementList.Title>
                    <AnnouncementList.Date>Today, 13 Sep 2021</AnnouncementList.Date>
                </AnnouncementList.Header>

                <AnnouncementList.Items>
                    <AnnouncementList.Item>
                        <div className="flex-1">
                            <AnnouncementList.ItemTitle>
                                Outing schedule for every departement
                            </AnnouncementList.ItemTitle>
                            <AnnouncementList.ItemTime>5 Minutes ago</AnnouncementList.ItemTime>
                        </div>
                        <AnnouncementList.ItemActions />
                    </AnnouncementList.Item>

                    <AnnouncementList.Item>
                        <div className="flex-1">
                            <AnnouncementList.ItemTitle>
                                Meeting HR Department
                            </AnnouncementList.ItemTitle>
                            <AnnouncementList.ItemTime>
                                Yesterday, 12:30 PM
                            </AnnouncementList.ItemTime>
                        </div>
                        <AnnouncementList.ItemActions isPinned />
                    </AnnouncementList.Item>

                    <AnnouncementList.Item>
                        <div className="flex-1">
                            <AnnouncementList.ItemTitle>
                                IT Department need two more talents for UX/UI Designer position
                            </AnnouncementList.ItemTitle>
                            <AnnouncementList.ItemTime>
                                Yesterday, 09:15 AM
                            </AnnouncementList.ItemTime>
                        </div>
                        <AnnouncementList.ItemActions />
                    </AnnouncementList.Item>
                </AnnouncementList.Items>

                <AnnouncementList.Footer>
                    <Button variant="link" className="text-red-500 hover:text-red-600">
                        See All Announcement
                    </Button>
                </AnnouncementList.Footer>
            </AnnouncementList>
        </div>
    ),
};
