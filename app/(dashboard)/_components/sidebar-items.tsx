"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface ItemsProps {
    icon: LucideIcon,
    label: string,
    href: string
}


const SidebarItems = ({
    icon: Icon,
    href,
    label
}: ItemsProps) => {


    const router = useRouter()
    const pathname = usePathname()

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);


    const onClick = () => {
        router.push(href)
    }

    return (
        <button
            onClick={onClick}
            disabled={isActive}
            type="button"
            className={cn("flex items-center gap-x-2 text-slate-500 hover:text-slate-600 hover:bg-slate-300/20 transition-all text-sm font-[500] py-4 pl-6", isActive && "bg-sky-200/20 hover:bg-sky-200/20 text-sky-800 hover:text-sky-800 border-r-2 border-sky-800")}>
            <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
            {label}
        </button>
    )
}

export default SidebarItems