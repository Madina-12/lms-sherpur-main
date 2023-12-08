import { getChapter } from "@/actions/get-chapter"
import Banner from "@/components/banner"
import Preview from "@/components/preview"
import { auth } from "@clerk/nextjs"
import { File } from "lucide-react"
import { redirect } from "next/navigation"
import VideoPlayer from "./_components/video-player"
import CourseProgressButton from "./_components/course-progress-button"
import CourseEnrollButton from "./_components/course-enroll-button"


const ChapterPage = async ({ params }: {
  params: {
    courseId: string,
    chapterId: string
  }
}) => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }

  const {
    chapter, course, muxData, attachments, nextChapter, purchase, userProgress
  } = await getChapter({ chapterId: params.chapterId, courseId: params.courseId, userId })

  if (!course || !chapter) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {
        userProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter"
          />
        )
      }
      {
        isLocked && (
          <Banner
            variant="warning"
            label="You need to purchase this course to watch this chapter"
          />
        )
      }

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            playbackId={muxData?.playbackId!}
            chapterId={params.chapterId}
            completeOnEnd={completeOnEnd}
            courseId={params.courseId}
            isLocked={isLocked}
            title={chapter.title!}
            nextChapterId={nextChapter?.id}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">
            {chapter.title}
          </h2>
          {
            purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                isCompleted={!!userProgress?.isCompleted}
                nextChapterId={nextChapter?.id}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )
          }
        </div>
        {/* <Separator /> */}
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            {/* <Separator /> */}
            <div className="p-4">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center p-2 w-full mb-3 bg-sky-200 border text-sky-900 rounded-md hover:underline"
                >
                  <File />
                  <div className="line-clamp-1">
                    {attachment.name}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>


    </div>
  )
}

export default ChapterPage