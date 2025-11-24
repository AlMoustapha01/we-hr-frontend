import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ScheduleListProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleListHeaderProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleListTitleProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleListDateProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleListSectionProps {
    children: ReactNode;
    title: string;
    className?: string;
}

interface ScheduleListItemsProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleItemProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleItemTitleProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleItemTimeProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleItemLabelProps {
    children: ReactNode;
    className?: string;
}

interface ScheduleItemActionsProps {
    onMore?: () => void;
    className?: string;
}

interface ScheduleListFooterProps {
    children: ReactNode;
    className?: string;
}

function ScheduleListRoot({ children, className }: ScheduleListProps) {
    return (
        <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
            {children}
        </div>
    );
}

function ScheduleListHeader({ children, className }: ScheduleListHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-6", className)}>
            {children}
        </div>
    );
}

function ScheduleListTitle({ children, className }: ScheduleListTitleProps) {
    return <h3 className={cn("text-lg font-semibold text-gray-900", className)}>{children}</h3>;
}

function ScheduleListDate({ children, className }: ScheduleListDateProps) {
    return <span className={cn("text-sm text-gray-500", className)}>{children}</span>;
}

function ScheduleListSection({ children, title, className }: ScheduleListSectionProps) {
    return (
        <div className={cn("mb-6 last:mb-0", className)}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {title}
            </h4>
            {children}
        </div>
    );
}

function ScheduleListItems({ children, className }: ScheduleListItemsProps) {
    return <div className={cn("space-y-3", className)}>{children}</div>;
}

function ScheduleItem({ children, className }: ScheduleItemProps) {
    return (
        <div
            className={cn(
                "flex items-start justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors",
                className
            )}
        >
            {children}
        </div>
    );
}

function ScheduleItemTitle({ children, className }: ScheduleItemTitleProps) {
    return <h5 className={cn("text-sm font-medium text-gray-900 mb-1", className)}>{children}</h5>;
}

function ScheduleItemTime({ children, className }: ScheduleItemTimeProps) {
    return <p className={cn("text-xs text-gray-500", className)}>{children}</p>;
}

function ScheduleItemLabel({ children, className }: ScheduleItemLabelProps) {
    return (
        <span className={cn("text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded", className)}>
            {children}
        </span>
    );
}

function ScheduleItemActions({ onMore, className }: ScheduleItemActionsProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 shrink-0", className)}
            onClick={onMore}
            aria-label="More options"
        >
            <MoreHorizontal className="h-4 w-4" />
        </Button>
    );
}

function ScheduleListFooter({ children, className }: ScheduleListFooterProps) {
    return (
        <div className={cn("mt-6 pt-4 border-t border-gray-200 text-center", className)}>
            {children}
        </div>
    );
}

export const ScheduleList = Object.assign(ScheduleListRoot, {
    Header: ScheduleListHeader,
    Title: ScheduleListTitle,
    Date: ScheduleListDate,
    Section: ScheduleListSection,
    Items: ScheduleListItems,
    Item: ScheduleItem,
    ItemTitle: ScheduleItemTitle,
    ItemTime: ScheduleItemTime,
    ItemLabel: ScheduleItemLabel,
    ItemActions: ScheduleItemActions,
    Footer: ScheduleListFooter,
});
