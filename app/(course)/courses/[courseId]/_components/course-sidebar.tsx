import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSideBarItem from "./course-sidebar-item";

type CourseSideBarProps = {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number
}

const CourseSideBar = async ({
    course,
    progressCount
}: CourseSideBarProps) => {
    const { userId } = auth()
    if ((!userId)) {
        redirect("/")
    }
    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id
            }
        }
    })
    return (
        <div className=" h-full flex flex-col overflow-y-auto shadow-sm border-r">
            <div className=" flex flex-col border-b p-7">
                <h1 className=" text-lg font-bold text-sky-900">
                    {course.title}
                </h1>
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSideBarItem
                        key={chapter.id}
                        id = {chapter.id}
                        label = {chapter.title}
                        isCompleted = {!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
    )
}

export default CourseSideBar