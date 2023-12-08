import { db } from "@/lib/db"


export const getProgress = async (
    userId: string,
    courseId: string 
):Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
        where: {
            courseId,
            isPublished: true
        },
        select:{
            id: true
        }
    })

    const publishedChaptersIds = (await publishedChapters).map(chapter => chapter.id)

    const validCompletedChapters = await db.userProgress.count({
        where:{
            isCompleted:true,
            userId,
            chapterId:{
                in: publishedChaptersIds
            }
        }
    })
    const progressPercentage = (validCompletedChapters / publishedChapters.length) * 100
    return progressPercentage
  } catch (error) {
    console.log("GET_PROGRESS", error);
    return 0
  }
}
