import { db } from "@/lib/db"
import { getProgress } from "./get-progress"
import { Category, Chapter, Course } from "@prisma/client"

type CoursesWithProgressWithCategory = Course & {
    category: Category,
    chapters: Chapter[],
    progress: number | null
}

export const GetDashboardCourses = async (userId: string) => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        chapters: {
                            where: {
                                isPublished: true
                            },
                        },
                        category: true
                    }
                }
            }
    
        })
    
        const courses = purchasedCourses.map((purchase) => purchase.course) as CoursesWithProgressWithCategory[]
        
        for (let course of courses) {
          const progress = await getProgress(userId, course.id);
          course["progress"] = progress;
        }
    
        const completedCourses = courses.filter(course=> course.progress === 100)
        const courseInProgress = courses.filter(course => (course.progress ?? 0) < 100)
    
        return {
            completedCourses,
            courseInProgress
        }
    } catch (error) {
        console.log("GET_DASHBOARD_COURSES", error);
        return {
            completedCourses : [],
            courseInProgress : []
        }        
    }


}
