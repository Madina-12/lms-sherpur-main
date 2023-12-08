"use client"

import { Editor } from "@/components/editor"
import Preview from "@/components/preview"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter } from "@prisma/client"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface DescriptionFormProps {
    initialData: Chapter
    chapterId : string
    courseId: string
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required"
    })
})

const DescriptionForm = ({ courseId, initialData, chapterId }: DescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing(current => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        }
    })

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter updated")
            router.refresh()
            toggleEditing()

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="border bg-slate-100 p-4 mt-6 rounded-md">
            <div className="flex justify-between items-center gap-y-4">
                <h2 className=" font-medium">Chapter description</h2>
                <Button onClick={() => toggleEditing()} variant="ghost">
                    {
                        !isEditing ? (
                            <div className="flex">
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit description
                            </div>
                        ) : (
                            <>Cancel</>
                        )
                    }
                </Button>
            </div>
            {!isEditing &&
                (<div className={cn("text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    <Preview value={initialData.description || "No description"} />
                </div>)
            }
            {
                isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            }

        </div>
    )
}

export default DescriptionForm