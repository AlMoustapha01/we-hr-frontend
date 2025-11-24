import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
    children: ReactNode;
    variant?: "default" | "primary" | "secondary" | "accent";
    className?: string;
}

interface StatCardValueProps {
    children: ReactNode;
    className?: string;
}

interface StatCardLabelProps {
    children: ReactNode;
    className?: string;
}

interface StatCardDescriptionProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "success" | "warning" | "danger" | "info";
}

interface StatCardTrendProps {
    value: number;
    label?: string;
    className?: string;
}

interface StatCardChartProps {
    children: ReactNode;
    className?: string;
}

const variantStyles = {
    default: "bg-white border border-gray-200",
    primary: "bg-purple-50 border border-purple-100",
    secondary: "bg-blue-50 border border-blue-100",
    accent: "bg-orange-50 border border-orange-100",
};

const descriptionVariants = {
    default: "text-gray-600",
    success: "text-green-600",
    warning: "text-orange-600",
    danger: "text-red-600",
    info: "text-blue-600",
};

function StatCardRoot({ children, variant = "default", className }: StatCardProps) {
    return (
        <div
            className={cn(
                "rounded-lg p-3 px-6 transition-all hover:shadow-md",
                variantStyles[variant],
                className
            )}
        >
            {children}
        </div>
    );
}

function StatCardValue({ children, className }: StatCardValueProps) {
    return (
        <div className={cn("text-4xl font-bold text-gray-900 mb-2", className)}>
            {children}
        </div>
    );
}

function StatCardLabel({ children, className }: StatCardLabelProps) {
    return (
        <div className={cn("text-sm font-medium text-gray-700 mb-4", className)}>
            {children}
        </div>
    );
}

function StatCardDescription({
    children,
    className,
    variant = "default",
}: StatCardDescriptionProps) {
    return (
        <div
            className={cn(
                "text-sm font-medium",
                descriptionVariants[variant],
                className
            )}
        >
            {children}
        </div>
    );
}

function StatCardTrend({ value, label, className }: StatCardTrendProps) {
    const isPositive = value > 0;
    const isNegative = value < 0;

    return (
        <div className={cn("flex items-center gap-2 text-sm", className)}>
            <span
                className={cn(
                    "font-semibold",
                    isPositive && "text-green-600",
                    isNegative && "text-red-600",
                    !isPositive && !isNegative && "text-gray-600"
                )}
            >
                {isPositive && "+"}
                {value}%
            </span>
            {label && <span className="text-gray-500">{label}</span>}
        </div>
    );
}

function StatCardChart({ children, className }: StatCardChartProps) {
    return <div className={cn("mt-4", className)}>{children}</div>;
}

function StatCardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn("mt-4 pt-4 border-t border-gray-200 flex items-center justify-between", className)}>
            {children}
        </div>
    );
}

export const StatCard = Object.assign(StatCardRoot, {
    Value: StatCardValue,
    Label: StatCardLabel,
    Description: StatCardDescription,
    Trend: StatCardTrend,
    Chart: StatCardChart,
    Footer: StatCardFooter,
});
