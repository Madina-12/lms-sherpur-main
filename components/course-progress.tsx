import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface CourseProgressProps {
    value: number,
    variant?: "default" | "success",
    size?: "default" | "sm"
}

const variantByColor = {
    success: "text-emerald-700",
    default: "text-sky-700"
}

const variantBySize = {
    default: "text-sm",
    sm: "text-xs"
}

const CourseProgress = ({
    value,
    variant,
    size
}: CourseProgressProps) => {
    return (
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}
            />
            <p className={
                cn(
                    "font-medium mt-2 text-sky-700",
                    variantBySize[size || "default"],
                    variantByColor[variant || "default"]

                )
            }>
                {Math.round(value)}% Complete
            </p>
        </div>
    )
}

export default CourseProgress