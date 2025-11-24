import { CalendarHeader } from "@/features/schedule/components/calendar-header";
import { CalendarControls } from "@/features/schedule/components/calendar-controls";
import { CalendarView } from "@/features/schedule/components/calendar-view";

export default function SchedulePage() {
    return (
        <div className="h-svh overflow-hidden lg:p-2 max-w-6xl mx-auto">
            <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
                <div className="w-full">
                    <CalendarHeader />
                    <CalendarControls />
                </div>
                <div className="flex-1 overflow-hidden w-full">
                    <CalendarView />
                </div>
            </div>
        </div>
    );
}