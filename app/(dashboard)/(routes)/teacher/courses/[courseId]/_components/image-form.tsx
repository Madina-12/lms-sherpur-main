"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Course } from "@prisma/client"
import axios from "axios"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface ImageFormProps {
    courseId: string
    initialData: Course
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    })
})

const ImageForm = ({ courseId, initialData }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const toggleEdit = () => setIsEditing(current => !current)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ""
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
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
                Course image
                <Button onClick={toggleEdit} variant="ghost" >
                    {
                        isEditing ?
                            (
                                <>Cancel</>
                            ) :
                            (
                                initialData.imageUrl ?
                                    (<>
                                        <Pencil className=" w-4 h-4 mr-2" />
                                        Edit image
                                    </>) : (<>
                                        <PlusCircle className=" w-4 h-4 mr-2" />
                                        Add an image
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
                                endpoint="courseImage"
                                onChange={(url)=>{
                                    if (url) {
                                        onSubmit({imageUrl: url})
                                    }
                                }} 
                                
                                />
                                <div className=" text-muted-foreground text-sm mt-4">
                                    16:9 aspect ratio recommended
                                </div>
                            </div>
                        )
                        :
                        (
                            initialData.imageUrl ?
                                <div className="relative mt-2 aspect-video">
                                    <Image
                                        alt="course image"
                                        fill
                                        src={initialData.imageUrl}
                                        className="rounded-md object-cover"
                                    />
                                </div> : (
                                    <div className="flex items-center justify-center bg-slate-200 border rounded-md h-60">
                                        <ImageIcon className=" h-10 w-10 text-slate-500" />
                                    </div>
                                )
                        )
                }
            </div>
        </div>
    )
}

export default ImageForm