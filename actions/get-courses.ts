import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CoursesWithProgressWithCategory = Course & {
    chapter: { id: string }[]
    progress: number | null
    category: Category | null
}

interface getCoursesProps {
    userId: string
    title?: string
    categoryId?: string
}


export const getCourses = async ({
    userId,
    categoryId,
    title
}: getCoursesProps): Promise<CoursesWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                categoryId,
                title: {
                    contains: title
                }
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const CoursesWithProgress: CoursesWithProgressWithCategory[] = await Promise.all(
            courses.map(async (course) => {
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null
                    }
                }

                const courseProgress = await getProgress(userId, course.id)

                return {
                    ...course,
                    progress: courseProgress
                }
            })
        )

        return CoursesWithProgress

    } catch (error) {
        console.log("GET_COURSES", error);
        return []           
    }
}






