import Image from "next/image"
import Link from "next/link"
import IconBadge from "./icon-badge"
import { BookOpen } from "lucide-react"
import CourseProgress from "./course-progress"
import { formatPrice } from "@/lib/format-price"

interface CourseCardProps {
    id: string,
    title: string,
    imageUrl: string,
    chaptersLength: number,
    progress: number | null,
    price: number,
    category: string
}

const CourseCard = (
    {   id,
        title,
        imageUrl,
        chaptersLength,
        progress,
        price,
        category
    }: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative aspect-video overflow-hidden w-full rounded-md">
                    <Image
                        fill
                        src={imageUrl}
                        alt = {title}
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {category}
                    </div>
                    <div className="flex my-3 items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex gap-x-1 items-center text-slate-500">
                            <IconBadge size="small" Icon={BookOpen}  />
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ):(
                        <p className=" text-base md:text-sm font-medium text-slate-700">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default CourseCard