import { cn } from "@/lib/utils";
import { SVGAttributes } from "react";

export function SearchIcon({ className }: Pick<SVGAttributes<SVGSVGElement>, "className">) {
    return (
        <svg className={cn("w-4 h-4", className)} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.3393 3.85619C14.6278 6.25268 14.5403 10.0507 12.1439 12.3392C9.74737 14.6278 5.94939 14.5403 3.66082 12.1438C1.37226 9.74734 1.45974 5.94936 3.85623 3.66079C6.25271 1.37223 10.0507 1.45971 12.3393 3.85619ZM14.2056 13.0502C16.7197 9.96888 16.6032 5.42531 13.7857 2.47492C10.7342 -0.720388 5.67026 -0.837034 2.47495 2.21439C-0.720357 5.26581 -0.837004 10.3298 2.21442 13.5251C5.03195 16.4755 9.56533 16.8011 12.7592 14.4315L14.8738 16.6459C15.2553 17.0453 15.8883 17.0599 16.2877 16.6784C16.6871 16.297 16.7017 15.664 16.3202 15.2646L14.2056 13.0502Z" fill="#B2B2B2" />
        </svg>
    );
}