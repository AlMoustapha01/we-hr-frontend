import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Notifications } from "./notifications";

const meta = {
    title: "Components/Layouts/Navbar/Notifications",
    component: Notifications,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
