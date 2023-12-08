import IconBadge from "@/components/icon-badge"
import { LucideIcon } from "lucide-react"
import { Label } from "recharts"

interface InfoCardProps {
    variant?: "default" | "success",
    icon: LucideIcon,
    numberOfItems : number,
    label : string
}

const InfoCard = ({
    variant,
    icon: Icon,
    numberOfItems,
    label
} : InfoCardProps) => {
  return (
    <div className="border rounded-md p-3 flex items-center gap-x-2">
        <IconBadge 
            variant={variant}
            Icon={Icon}
        />
        <div>
            <p className=" font-medium">{label}</p>
            <p className=" text-gray-500 text-sm">{numberOfItems} {numberOfItems===1 ? "Course" : "Courses"}</p>
        </div>
    </div>
  )
}

export default InfoCard