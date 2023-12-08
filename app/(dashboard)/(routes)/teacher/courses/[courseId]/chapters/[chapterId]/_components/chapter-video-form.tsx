"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client"
import axios from "axios"
import { Pencil, PlusCircle, Video } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

interface ChapterVideoFormProps {
    courseId: string
    initialData: Chapter & { muxData?: MuxData | null }
    chapterId: string
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
})

const ChapterVideoForm = ({ courseId, initialData, chapterId }: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const toggleEdit = () => setIsEditing(current => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Course Updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="mt-6 bg-slate-100 border rounded-md p-4">
            <div className="flex justify-between items-center font-medium">
                Chapter video
                <Button onClick={toggleEdit} variant="ghost" >
                    {
                        isEditing ?
                            (
                                <>Cancel</>
                            ) :
                            (
                                initialData.videoUrl ?
                                    (<>
                                        <Pencil className=" w-4 h-4 mr-2" />
                                        Edit video
                                    </>) : (<>
                                        <PlusCircle className=" w-4 h-4 mr-2" />
                                        Add a video
                                    </>)

                            )
                    }
                </Button>
            </div>
            <div>
                {
                    isEditing ?
                        (
                            <div>
                                <FileUpload
                                    endpoint="chapterVideo"
                                    onChange={(url) => {
                                        if (url) {
                                            onSubmit({ videoUrl: url })
                                        }
                                    }}

                                />
                                <div className=" text-muted-foreground text-sm mt-4">
                                    Upload this chapter&apos;s video
                                </div>
                            </div>
                        )
                        :
                        (
                            initialData.videoUrl ?
                                <div className="relative mt-2 aspect-video">
                                    <MuxPlayer
                                        playbackId = {initialData?.muxData?.playbackId || ""}
                                    />
                                </div> : (
                                    <div className="flex items-center justify-center bg-slate-200 border rounded-md h-60">
                                        <Video className=" h-10 w-10 text-slate-500" />
                                    </div>
                                )
                        )
                }

            </div>
            {initialData.videoUrl && !isEditing && (
                <div>
                    Video can take a few minutes to process. Refresh the page, if video does not appear.
                </div>
            )}
        </div>
    )
}

export default ChapterVideoForm