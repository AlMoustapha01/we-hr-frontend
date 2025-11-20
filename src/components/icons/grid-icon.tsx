import { cn } from "@/lib/utils"

export const GridIcon = ({ active }: { active?: boolean }) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={cn("fill-[#B2B2B2] group-hover/nav-item:fill-primary hover:fill-primary", active && "fill-primary group-hover/nav-item:fill-primary/80 hover:fill-primary/80")} d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" />
        </svg>
    )
}
