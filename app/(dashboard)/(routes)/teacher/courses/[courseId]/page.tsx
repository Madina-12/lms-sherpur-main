
import Banner from "@/components/banner";
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Course } from "@prisma/client";
import { redirect } from "next/navigation";
import Actions from "./_components/actions";
import TitleForm from "./_components/title-form";
import IconBadge from "@/components/icon-badge";
import { LayoutDashboard, ListChecks } from "lucide-react";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import ChapterForm from "./_components/chapters-form";
import ChaptersForm from "./_components/chapters-form";
import CategoryForm from "./_components/category-form";
import {AttachmentForm} from "./_components/attachment-form";
import PriceForm from "./_components/price-form";



const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

  const { userId } = auth();
  if (!userId) {
    return redirect("/")

  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc"
        }
      },
      attachments: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })


  if (!course) {
    redirect("/teacher/courses")

  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished)
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <div className="flex flex-col w-full">
      <div className="w-full ">
        {!course.isPublished && (<Banner
          label="This course is unpublished. It will not be visible to students"
        />)}
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center justify-between">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Course Setup</h1>
              <span>Complete all fields {completionText}</span>
            </div>
            <Actions
              disabled={!isComplete} isPublished={course.isPublished} courseId={params.courseId}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge Icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your course</h2>
              </div>
              <TitleForm
                initialData={course}
                courseId={course.id}
              />
              <DescriptionForm
                courseId={course.id}
                initialData={course}
              />
              <ImageForm
                courseId={course.id}
                initialData={course}
              />
              <CategoryForm
                courseId={course.id}
                initialData={course}
                options={categories}
              />
            </div>
            <div className=" space-y-6">
              <div className="flex items-center gap-x-2">
                <IconBadge Icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm
                initialData={course}
                courseId={course.id}
              />
              <AttachmentForm
                courseId={course.id}
                initialData={course}
              />
              <PriceForm
                courseId={course.id}
                initialData={course}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage