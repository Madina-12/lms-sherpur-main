import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client"
import CourseMobileSidebar from "./course-mobile-sidebar";

type CourseNavbarProps = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  };
  progressCount: number
}

const CourseNavbar = ({
  course,
  progressCount
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm h-full">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes />
    </div>
  )
}

export default CourseNavbar