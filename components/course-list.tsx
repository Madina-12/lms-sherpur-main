import { Category, Course, UserProgress } from "@prisma/client"
import CourseCard from "./course-card"

type CoursesWithProgressWithCategory = Course & {
    category: Category | null
    progress: number | null
    chapters: { id: string }[]
}

interface CourseListProps {
    items: CoursesWithProgressWithCategory[]
}

const CourseList = (
    { items }: CourseListProps
) => {
    return (
        <div>
            <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                {items.map((item) => (
                    <CourseCard
                        key={item.id}
                        category={item.category?.name}
                        chaptersLength={item.chapters.length}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        price={item.price!}
                        progress={item.progress}
                    />
                ))}
            </div>
            {items.length === 0 && (
            <div className="text-center text-sm text-muted-foregroundf mt-10">
                No courses found
            </div>
            )}
        </div>
    )
}

export default CourseList