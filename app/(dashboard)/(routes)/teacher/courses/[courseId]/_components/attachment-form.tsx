"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Attachment, Course } from "@prisma/client"
import axios from "axios"
import { File, Loader2, PlusCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

interface AttachmentFormProps {
    courseId: string
    initialData: Course & { attachments: Attachment[] }
}

const formSchema = z.object({
    url: z.string().min(1)
})

export const AttachmentForm = ({ courseId, initialData }: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()
    const toggleEdit = () => setIsEditing(current => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values)
            toast.success("Course Updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id)
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            toast.success("Course updated")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="mt-6 bg-slate-100 border rounded-md p-4">
            <div className="flex justify-between items-center font-medium">
                Course attachments
                <Button onClick={toggleEdit} variant="ghost" >
                    {
                        isEditing ?
                            (
                                <>Cancel</>
                            ) : (<>
                                <PlusCircle className=" w-4 h-4 mr-2" />
                                Add a file
                            </>)


                    }
                </Button>
            </div>
            <div>
                {
                    isEditing ?
                        (
                            <div>
                                <FileUpload
                                    endpoint="courseAttachment"
                                    onChange={(url) => {
                                        if (url) {
                                            onSubmit({ url: url })
                                        }
                                    }}

                                />
                                <div className=" text-muted-foreground text-sm mt-4">
                                    Add anything your students might need to complete this course.
                                </div>
                            </div>
                        )
                        :
                        (
                            <>
                                {initialData.attachments.length === 0 && (
                                    <p className="text-sm mt-2 italic text-slate-500">
                                        No attachments yet
                                    </p>
                                )}
                                {
                                    initialData.attachments.length > 0 && (
                                        <div className="space-y-2">
                                            {initialData.attachments.map((attachment) => (
                                                <div key={attachment.id} className="flex items-center p-3 w-full border bg-sky-100 border-sky-100 text-sky-700 rounded-md">
                                                    <File className="m-4 h-4 mr-2 flex-shrink-0" />
                                                    <p className="text-xs line-clamp-1">
                                                        {attachment.name}
                                                    </p>
                                                    {deletingId === attachment.id &&
                                                        <Loader2 className=" h-4 w-4 animate-spin " />
                                                    }
                                                    {deletingId !== attachment.id &&
                                                        <Button onClick={()=>onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </>
                        )
                }
            </div>
        </div>
    )
}
