"use client"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"

export type MenuItem = {
    icon: (active?: boolean) => React.ReactNode;
    label: string;
    url: string;
}

export type MenuGroup = {
    title: string;
    items: MenuItem[];
}

export function NavMenu({
    menu,
}: {
    menu: MenuGroup
}) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-stone-400 font-medium uppercase text-xs">{menu.title}</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
                {menu.items.map((item) => (
                    <SidebarMenuItem className="group/collapsible"
                        key={item.label}>
                        <SidebarMenuButton className="hover:bg-primary/10" asChild tooltip={item.label}>
                            <a className="group/nav-item py-6 px-4" href={item.url}>
                                {item.icon(pathname?.includes(item.url))}
                                <span className={cn("text-[#B2B2B2] group-hover/nav-item:text-primary hover:text-primary", pathname?.includes(item.url) && "text-primary group-hover/nav-item:text-primary/80 hover:text-primary/80")}>{item.label}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
