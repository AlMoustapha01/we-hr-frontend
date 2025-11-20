import { SearchBar } from "./search-bar";
import { Notifications } from "./notifications";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavUser } from "./nav-user";
import { ChatIcon } from "@/components/icons/chat-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  showSearch?: boolean;
  showNotifications?: boolean;
  showChat?: boolean;
  className?: string;
}

export function Navbar({
  user = {
    name: "Admirra John",
    email: "admirra.john@example.com",
    avatar: "/avatar.png",
  },
  showSearch = true,
  showNotifications = true,
  showChat = true,
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "bg-transparent w-full flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
          aria-hidden="true"
        />
      </div>

      <div className="flex justify-between items-center gap-2 w-full px-4 border-b pb-4 border-stone-100">
        {showSearch && (
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>
        )}

        <nav className="flex items-center gap-3 ml-auto" aria-label="User navigation">
          {showNotifications && <Notifications />}

          {showChat && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              aria-label="Open chat"
            >
              <ChatIcon />
            </Button>
          )}

          <Separator
            orientation="vertical"
            className="h-6"
            aria-hidden="true"
          />

          <NavUser user={user} />
        </nav>
      </div>
    </header>
  );
}
