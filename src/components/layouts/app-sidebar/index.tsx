"use client";

import {
  CalendarIcon,
  GroupIcon,
  DepartmentIcon,
  GridIcon,
  HelpIcon,
  PersonPlusIcon,
  SettingIcon,
} from "@/components/icons";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { MenuGroup, NavMenu } from "./nav-menu";
import { useEffect } from "react";

export const data: MenuGroup[] = [
  {
    title: "MAIN MENU",
    items: [
      {
        icon: (active?: boolean) => <GridIcon active={active} />,
        label: "Dashboard",
        url: "/dashboard",
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

  {
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
];


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { state, setOpen } = useSidebar()

  useEffect(() => {
    const handleResize = () => {
      const isTabletOrSmaller = window.matchMedia("(max-width: 1024px)").matches;

      if (isTabletOrSmaller && state === "expanded") {
        setOpen(false);
      }
      if (!isTabletOrSmaller && state === "collapsed") {
        setOpen(true);
      }
    };

    // Check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state, setOpen]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <p className="text-4xl font-bold group-data-[collapsible=icon]:text-xl">WeHR</p>
      </SidebarHeader>
      <SidebarContent className="p-5">
        {data.map((menu) => (
          <NavMenu key={menu.title} menu={menu} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar >
  )
}