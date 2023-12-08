import { getProgress } from "@/actions/get-progress"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import CourseSideBar from "./_components/course-sidebar"
import CourseNavbar from "./_components/course-navbar"


const CourseLayout = async ({
    params,
    children
}: {
    params: { courseId: string },
    children: ReactNode
}) => {

    const { userId } = auth()

    if (!userId) {
        redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            isPublished: true
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    useProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    })

    if (!course) {
        return redirect("/")
    }

    const progressCount = await getProgress(userId, course.id)

    return (
        <div className="h-full w-full">
            <div className="h-[80px] w-full md:pl-80 inset-y-0 fixed z-50">
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className=" hidden md:flex w-80 h-full flex-col fixed inset-y-0 z-50 ">
                <CourseSideBar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className=" md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout