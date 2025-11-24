import { Department } from "../types/department";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, MoreVertical, Edit, Trash2, UserCircle } from "lucide-react";
import { useGetDepartmentEmployees, useGetEmployee } from "@/features/employee";
import { useRouter } from "next/navigation";

interface DepartmentCardProps {
    department: Department;
    onDelete?: (department: Department) => void;
    className?: string;
}

export function DepartmentCard({
    department,
    onDelete,
    className,
}: DepartmentCardProps) {
    const router = useRouter();

    // Fetch employees for this department
    const { data: employees } = useGetDepartmentEmployees(department.id);
    const employeeCount = employees?.length || 0;

    // Fetch manager details if managerId exists
    const { data: manager } = useGetEmployee(department.managerId || "", !!department.managerId);

    return (
        <div
            className={cn(
                "bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {department.name}
                    </h3>
                    <p className="text-sm text-gray-500">{department.description}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/department/${department.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onDelete?.(department)}
                            className="text-red-600 focus:text-red-600"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Manager */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <UserCircle className="h-4 w-4" />
                <span>{manager?.name || "No manager"}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        {employeeCount}
                    </p>
                    <p className="text-xs text-gray-600">Employees</p>
                </div>
            </div>


        </div>
    );
}
