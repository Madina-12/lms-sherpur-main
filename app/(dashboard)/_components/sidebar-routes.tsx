"use client"

import { BarChart, Compass, Layout, List } from "lucide-react"
import { usePathname } from "next/navigation"
import SidebarItems from "./sidebar-items"


const guestRoutes = [
    {
        href: "/",
        icon: Layout,
        label: "Dashboard"
    },
    {
        href: "/search",
        icon: Compass,
        label: "Browse"
    }
]

const teacherRoutes = [
    {
        href: "/teacher/courses",
        icon: List,
        label: "Courses"
    },
    {
        href: "/teacher/analytics",
        icon: BarChart,
        label: "Analytics"
    }
]


const SidebarRoutes = () => {

    const pathname = usePathname()
    const isTeacherPage = pathname?.includes("/teacher")
    const routes = isTeacherPage ? teacherRoutes : guestRoutes

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItems
                    key={route.href}
                    href={route.href}
                    icon={route.icon}
                    label={route.label}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes