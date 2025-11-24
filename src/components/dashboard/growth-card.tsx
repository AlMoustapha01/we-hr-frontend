import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GrowthCardProps {
    title: string;
    value: string | number;
    trendPercentage: number;
    trendLabel?: string;
    breakdown?: {
        label: string;
        value: string | number;
    }[];
    className?: string;
}

export function GrowthCard({
    title,
    value,
    trendPercentage,
    trendLabel = "Past month",
    breakdown,
    className,
}: GrowthCardProps) {
    const isPositive = trendPercentage > 0;
    const trendSign = isPositive ? "+" : "";
    const gradientId = `paint0_linear_growth_${title.replace(/\s+/g, "_")}`;

    return (
        <div
            className={cn(
                "bg-white rounded-2xl p-3 px-5 border border-gray-200 hover:shadow-lg transition-shadow",
                className
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                        {title}
                    </h3>
                    <div className="text-5xl font-bold text-gray-900 mb-6">{value}</div>
                </div>

                {/* Right side with trend indicator and chart */}
                <div className="flex flex-col items-end gap-2 relative">
                    {/* Trend badge */}
                    <span className="text-xs font-semibold text-[#FF5151] absolute -top-1 right-7 inset-0 translate-x-1/2">
                        {trendSign}{trendPercentage}%
                    </span>

                    {/* Mini trend chart from Figma */}
                    <svg
                        width="117"
                        height="78"
                        viewBox="0 0 117 78"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-28 h-auto"
                    >
                        <path
                            d="M1 51C1 51 16.2821 32.7086 30 30C40.431 27.9403 46.4876 35.0924 57 33.5C73.2778 31.0342 76.3958 13.4209 92.5 10C101.477 8.09307 115.5 9.99995 115.5 9.99995"
                            stroke="#FF5151"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M30.5 29.8475C16.7821 32.5562 1.5 50.8475 1.5 50.8475V78H116V9.84749C116 9.84749 101.977 7.9406 93 9.84754C76.8958 13.2685 73.7778 30.8817 57.5 33.3475C46.9875 34.9399 40.931 27.7878 30.5 29.8475Z"
                            fill={`url(#${gradientId})`}
                        />
                        <path
                            d="M52.5 17L54.5 15M54.5 15L56.5 17M54.5 15V22"
                            stroke="#FF5151"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient
                                id={gradientId}
                                x1="59"
                                y1="-16"
                                x2="81"
                                y2="43.5"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#FF5151" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mb-2">
                {breakdown && breakdown.length > 0 ? (
                    <div className="space-y-1">
                        {breakdown.map((item, index) => (
                            <div key={index} className="text-sm text-gray-600">
                                {item.value} {item.label}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div />
                )}
                <Badge className="text-xs bg-red-100 text-black rounded-sm hover:bg-red-100">
                    {trendSign}{trendPercentage}% {trendLabel}
                </Badge>
            </div>
        </div>
    );
}
