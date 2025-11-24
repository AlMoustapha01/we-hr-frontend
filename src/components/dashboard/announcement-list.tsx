import { cn } from "@/lib/utils";
import { MoreHorizontal, Pin, Edit, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface AnnouncementListProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementListHeaderProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementListTitleProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementListDateProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementListItemsProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementItemProps {
    children: ReactNode;
    isPinned?: boolean;
    className?: string;
}

interface AnnouncementItemTitleProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementItemTimeProps {
    children: ReactNode;
    className?: string;
}

interface AnnouncementItemActionsProps {
    onPin?: () => void;
    onEdit?: () => void;
    onShare?: () => void;
    onDelete?: () => void;
    isPinned?: boolean;
    className?: string;
}

interface AnnouncementListFooterProps {
    children: ReactNode;
    className?: string;
}

function AnnouncementListRoot({ children, className }: AnnouncementListProps) {
    return (
        <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
            {children}
        </div>
    );
}

function AnnouncementListHeader({ children, className }: AnnouncementListHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-6", className)}>
            {children}
        </div>
    );
}

function AnnouncementListTitle({ children, className }: AnnouncementListTitleProps) {
    return <h3 className={cn("text-lg font-semibold text-gray-900", className)}>{children}</h3>;
}

function AnnouncementListDate({ children, className }: AnnouncementListDateProps) {
    return <span className={cn("text-sm text-gray-500", className)}>{children}</span>;
}

function AnnouncementListItems({ children, className }: AnnouncementListItemsProps) {
    return <div className={cn("space-y-4", className)}>{children}</div>;
}

function AnnouncementItem({ children, isPinned = false, className }: AnnouncementItemProps) {
    return (
        <div
            className={cn(
                "p-4 rounded-lg border transition-colors hover:bg-gray-50",
                isPinned ? "border-orange-200 bg-orange-50/50" : "border-gray-200",
                className
            )}
        >
            {children}
        </div>
    );
}

function AnnouncementItemTitle({ children, className }: AnnouncementItemTitleProps) {
    return <h4 className={cn("text-sm font-medium text-gray-900 mb-1", className)}>{children}</h4>;
}

function AnnouncementItemTime({ children, className }: AnnouncementItemTimeProps) {
    return <p className={cn("text-xs text-gray-500", className)}>{children}</p>;
}

function AnnouncementItemActions({
    onPin,
    onEdit,
    onShare,
    onDelete,
    isPinned = false,
    className,
}: AnnouncementItemActionsProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onPin}
                aria-label={isPinned ? "Unpin announcement" : "Pin announcement"}
            >
                <Pin className={cn("h-4 w-4", isPinned && "fill-current text-orange-500")} />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="More options"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function AnnouncementListFooter({ children, className }: AnnouncementListFooterProps) {
    return (
        <div className={cn("mt-2 pt-2 border-t border-gray-200 text-center", className)}>
            {children}
        </div>
    );
}

export const AnnouncementList = Object.assign(AnnouncementListRoot, {
    Header: AnnouncementListHeader,
    Title: AnnouncementListTitle,
    Date: AnnouncementListDate,
    Items: AnnouncementListItems,
    Item: AnnouncementItem,
    ItemTitle: AnnouncementItemTitle,
    ItemTime: AnnouncementItemTime,
    ItemActions: AnnouncementItemActions,
    Footer: AnnouncementListFooter,
});
