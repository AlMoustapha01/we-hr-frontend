import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActivityCardProps {
    children: ReactNode;
    className?: string;
}

interface ActivityCardHeaderProps {
    children: ReactNode;
    className?: string;
}

interface ActivityCardTitleProps {
    children: ReactNode;
    className?: string;
}

interface ActivityCardTimestampProps {
    children: ReactNode;
    className?: string;
}

interface ActivityCardContentProps {
    children: ReactNode;
    className?: string;
}

interface ActivityCardActionsProps {
    children: ReactNode;
    className?: string;
}

function ActivityCardRoot({ children, className }: ActivityCardProps) {
    return (
        <div
            className={cn(
                "bg-[#161E54] rounded-lg text-white",
                className
            )}
        >
            {children}
        </div>
    );
}

function ActivityCardHeader({ children, className }: ActivityCardHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between px-6 py-4 bg-[#1B204A] rounded-tr-lg rounded-tl-lg", className)}>
            {children}
        </div>
    );
}

function ActivityCardTitle({ children, className }: ActivityCardTitleProps) {
    return (
        <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
    );
}

function ActivityCardTimestamp({ children, className }: ActivityCardTimestampProps) {
    return (
        <span className={cn("text-sm text-indigo-200", className)}>{children}</span>
    );
}

function ActivityCardContent({ children, className }: ActivityCardContentProps) {
    return <div className={cn("space-y-3 px-6 py-4", className)}>{children}</div>;
}

function ActivityCardActions({ children, className }: ActivityCardActionsProps) {
    return (
        <div className={cn("mt-4 flex items-center justify-between px-6 py-4", className)}>
            {children}
        </div>
    );
}

export const ActivityCard = Object.assign(ActivityCardRoot, {
    Header: ActivityCardHeader,
    Title: ActivityCardTitle,
    Timestamp: ActivityCardTimestamp,
    Content: ActivityCardContent,
    Actions: ActivityCardActions,
});
