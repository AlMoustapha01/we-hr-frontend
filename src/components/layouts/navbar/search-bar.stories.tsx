import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchBar } from "./search-bar";

const meta = {
    title: "Components/Layouts/Navbar/SearchBar",
    component: SearchBar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
