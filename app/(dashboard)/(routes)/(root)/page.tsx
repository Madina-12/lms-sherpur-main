import { GetDashboardCourses } from "@/actions/get-dashboard-courses"
import InfoCard from "./_components/info-card"
import { CheckCircle, Clock } from "lucide-react"
import CourseList from "@/components/course-list"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


const Dashboard = async () => {
    const {userId} = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const { 
        completedCourses,
        courseInProgress
    } = await GetDashboardCourses(userId)
    return (
        <div className="p-6 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    label="In Progress"
                    numberOfItems={courseInProgress.length}
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed"
                    numberOfItems={completedCourses.length}
                    variant="success"
                />
            </div>
            <CourseList
                items={[...courseInProgress, ...completedCourses]}
            />
        </div>
    )
}

export default Dashboard