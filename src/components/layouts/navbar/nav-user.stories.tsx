import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavUser } from "./nav-user";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
    title: "Components/Layouts/Navbar/NavUser",
    component: NavUser,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <SidebarProvider>
                <Story />
            </SidebarProvider>
        ),
    ],
} satisfies Meta<typeof NavUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        user: {
            name: "Reuxie",
            email: "m@example.com",
            avatar: "/avatar.png",
        },
    },
};

export const WithLongName: Story = {
    args: {
        user: {
            name: "Jean-Baptiste Poquelin",
            email: "jean.baptiste.poquelin@example.com",
            avatar: "/avatar.png",
        },
    },
};

export const WithoutAvatar: Story = {
    args: {
        user: {
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "",
        },
    },
};
