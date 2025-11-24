import { cn } from "@/lib/utils";

interface MiniChartProps {
    data?: number[];
    color?: string;
    className?: string;
}

export function MiniChart({
    data = [20, 40, 30, 50, 45, 60, 55, 70],
    color = "#ef4444",
    className
}: MiniChartProps) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data
        .map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - min) / range) * 100;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg
            viewBox="0 0 100 40"
            className={cn("w-full h-12", className)}
            preserveAspectRatio="none"
        >
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
