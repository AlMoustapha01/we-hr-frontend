import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, User, AlertCircle } from "lucide-react";
import { BellIcon } from "@/components/icons/bell-icon";

export function Notifications() {
  const notificationCount = 3;

  const notifications = [
    {
      id: 1,
      title: "New formation created",
      message: "Formation 'React Advanced' has been successfully created",
      time: "2 min ago",
      type: "success",
      read: false,
    },
    {
      id: 2,
      title: "Student enrolled",
      message: "John Doe enrolled in 'JavaScript Fundamentals'",
      time: "1 hour ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      title: "Payment received",
      message: "Payment of €299 received for formation enrollment",
      time: "3 hours ago",
      type: "success",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "info":
        return <User className="w-4 h-4 text-blue-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative h-[28px] w-12">
          <BellIcon />
          {notificationCount > 0 && (
            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notificationCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {notificationCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-3 cursor-pointer ${!notification.read ? "bg-muted/50" : ""
                  }`}
              >
                <div className="shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="text-center py-6 text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <Bell className="w-8 h-8 opacity-50" />
                <span>No notifications</span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
