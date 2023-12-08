import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { AlertTriangle, CheckCheckIcon, CheckCircleIcon } from "lucide-react"


const bannerVariants = cva(
    "border w-full p-4 text-sm items-center flex text-center max-h-10",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary"
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)


interface bannerProps {
    label: string,
    variant? : any,
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon
}

const Banner = ({ label, variant }: bannerProps) => {
    const Icon = iconMap[variant || "warning"];
    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </div>
    )
}

export default Banner