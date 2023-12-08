"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { IconType } from "react-icons"
import { FcClock, FcEngineering, FcFilmReel, FcOldTimeCamera, FcSalesPerformance, FcSportsMode } from "react-icons/fc";


interface CategoryItemsProps {
    key: string
    label: string
    // icon: IconType
    value: string
}

const iconMap = {
    "Video": FcClock,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Numbering": FcSalesPerformance,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering
}

const CategoryItems = ({
    // icon: Icon,
    label,
    value
}: CategoryItemsProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const Icon = iconMap[label]
    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId === value ? value : null

    const onClick = () => {
        if (!isSelected) {
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    title: currentTitle,
                    categoryId: value
                }
            }, { skipEmptyString: true, skipNull: true })
    
            router.push(url)
        } else {
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    title: currentTitle,
                }
            }, { skipEmptyString: true, skipNull: true })
            router.push(url)
        }
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "py-2 px-3 border rounded-full border-slate-200 text-sm gap-x-1 flex items-center hover:border-sky-700 transition",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
            type="button"
        >
            {Icon && <Icon size={20} />}
                <div className="truncate">
                    {label}
                </div>
        </button>
    )
}

export default CategoryItems