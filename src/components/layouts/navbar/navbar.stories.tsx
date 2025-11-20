import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
    title: "Components/Layouts/Navbar",
    component: Navbar,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <SidebarProvider>
                <div className="w-full">
                    <Story />
                </div>
            </SidebarProvider>
        ),
    ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithCustomUser: Story = {
    args: {
        user: {
            name: "Sarah Johnson",
            email: "sarah.johnson@company.com",
            avatar: "/avatar.png",
        },
    },
};

export const WithoutSearch: Story = {
    args: {
        showSearch: false,
    },
};

export const WithoutNotifications: Story = {
    args: {
        showNotifications: false,
    },
};

export const WithoutChat: Story = {
    args: {
        showChat: false,
    },
};

export const MinimalNavbar: Story = {
    args: {
        showSearch: false,
        showNotifications: false,
        showChat: false,
    },
};

export const CustomClassName: Story = {
    args: {
        className: "bg-gray-50 border-b",
    },
};
