import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavMenu } from './nav-menu';
import {
    CalendarIcon,
    GroupIcon,
    DepartmentIcon,
    GridIcon,
    HelpIcon,
    PersonPlusIcon,
    SettingIcon,
} from "@/components/icons";
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';

const meta = {
    title: 'Components/Layouts/NavMenu',
    component: NavMenu,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <Story />
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        ),
    ],
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainMenu: Story = {
    args: {
        menu: {
            title: "MAIN MENU",
            items: [
                {
                    icon: (active?: boolean) => <GridIcon active={active} />,
                    label: "Dashboard",
                    url: "/",
                },
                {
                    icon: (active?: boolean) => <PersonPlusIcon active={active} />,
                    label: "Recruitment",
                    url: "/recruitment",
                },
                {
                    icon: (active?: boolean) => <CalendarIcon active={active} />,
                    label: "Schedule",
                    url: "/schedule",
                },
                {
                    icon: (active?: boolean) => <GroupIcon active={active} />,
                    label: "Employee",
                    url: "/employee",
                },
                {
                    icon: (active?: boolean) => <DepartmentIcon active={active} />,
                    label: "Department",
                    url: "/department",
                },
            ],
        },
    },
};

export const OtherMenu: Story = {
    args: {
        menu: {
            title: "OTHER",
            items: [
                {
                    icon: (active?: boolean) => <HelpIcon active={active} />,
                    label: "Support",
                    url: "/support",
                },
                {
                    icon: (active?: boolean) => <SettingIcon active={active} />,
                    label: "Settings",
                    url: "/settings",
                },
            ],
        },
    },
};

export const SingleItem: Story = {
    args: {
        menu: {
            title: "NAVIGATION",
            items: [
                {
                    icon: (active?: boolean) => <GridIcon active={active} />,
                    label: "Dashboard",
                    url: "/dashboard",
                },
            ],
        },
    },
};
