import { AppSidebar } from "@/components/layouts/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/layouts/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <main className="flex-1">
                    <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
                    <Toaster toastOptions={{
                        classNames: {
                            description: "!text-stone-700"
                        }
                    }} />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
