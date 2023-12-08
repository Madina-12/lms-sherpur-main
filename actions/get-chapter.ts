import { db } from "@/lib/db"
import { Attachment, Chapter, MuxData } from "@prisma/client"



interface getChapterProps {
    userId: string,
    chapterId: string,
    courseId: string
}

export const getChapter = async ({
    userId,
    chapterId,
    courseId
}: getChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true
            },
            select: {
                price: true
            }
        })

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            }
        })

        if (!chapter || !course) {
            throw new Error("Chapter or course not found")
        }

        let muxData = null
        let attachments: Attachment[] = []
        let nextChapter: Chapter | null = null

        if (purchase) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId
                }
            })
        }

        if (chapter.isFree || purchase) {

            muxData = await db.muxData.findUnique({
                where: {
                    chapterId
                }
            })

            nextChapter = await db.chapter.findFirst({
                where : {
                    courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position
                    }
                },
                orderBy: {
                    position: "asc"
                }
            })

        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId:{
                    userId,
                    chapterId
                }
            }
        })

        return {
            chapter,
            course,
            muxData,
            nextChapter,
            attachments,
            userProgress,
            purchase
        }
    } catch (error) {
        console.log(["GET_CHAPTERS", error]);
        
        return {
            chapter : null,
            course : null,
            muxData : null,
            nextChapter : null,
            attachments : [],
            userProgress : null,
            purchase : null
        }
    }
}