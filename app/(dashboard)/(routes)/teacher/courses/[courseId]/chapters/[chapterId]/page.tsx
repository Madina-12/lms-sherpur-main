import Banner from "@/components/banner"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Chapter, MuxData } from "@prisma/client"
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react"
import { redirect } from "next/navigation"
import ChapterActions from "./_components/chapter-actions"
import Link from "next/link"
import ChapterVideoForm from "./_components/chapter-video-form"
import IconBadge from "@/components/icon-badge"
import DescriptionForm from "./_components/chapter-description-form"
import ChapterTitleForm from "./_components/chapter-title-form"
import AccessForm from "./_components/chapter-access-form"


const Page = async ({ params }: { params: { courseId: string, chapterId: string } }) => {

  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId
    },
    include: {
      muxData: true
    }
  })

  if (!chapter) {
    redirect(`/teacher/courses/${params.courseId}`)
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ]
  
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `${completedFields}/${totalFields}`
  const isComplete = requiredFields.every(Boolean)
  
  return (
    <div className="flex flex-col w-full">
      { !chapter.isPublished && <Banner
        label="This chapter is unpublished. It will not be visible in the course."
        variant="warning"
      />}
      <div className="w-full">
        <Link href={`/teacher/courses/${params.courseId}`} className="flex items-center p-6 mb-6 hover:opacity-75 transition mr-auto" >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to course setup
        </Link>
        <div className="px-6 flex justify-between items-center ">
          <div className="flex flex-col space-y-2">
            <h2 className=" text-2xl font-medium">
              Chapter creation
            </h2>
            <span className="text-slate-700 text-sm">Complete all fields {completionText}</span>
          </div>
          <ChapterActions chapterId={params.chapterId} disabled={!isComplete} courseId={params.courseId} isPublished={chapter.isPublished} />
        </div>
      </div>
      <div className="px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pb-10">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge Icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <ChapterTitleForm
            chapterId={params.chapterId}
            courseId={params.courseId}
            initialData={chapter}
          />
          <DescriptionForm
            chapterId={params.chapterId}
            courseId={params.courseId}
            initialData={chapter}
          />
          <AccessForm
            chapterId={params.chapterId}
            courseId={params.courseId}
            initialData={chapter}
          />
        </div>
        <div className=" space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge Icon={ListChecks} />
            <h2 className="text-xl">Chapter video</h2>
          </div>
          <ChapterVideoForm
            chapterId={params.chapterId}
            courseId={params.courseId}
            initialData={chapter}
          />
        </div>
      </div>
    </div>
  )
}

export default Page