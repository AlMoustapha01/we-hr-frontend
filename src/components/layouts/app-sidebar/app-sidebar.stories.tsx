import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppSidebar } from "./";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Components/Layouts/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex h-screen">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CollapsibleIcon: Story = {
  args: {
    collapsible: "icon",
  },
};

export const CollapsibleOffcanvas: Story = {
  args: {
    collapsible: "offcanvas",
  },
};

export const CollapsibleNone: Story = {
  args: {
    collapsible: "none",
  },
};
