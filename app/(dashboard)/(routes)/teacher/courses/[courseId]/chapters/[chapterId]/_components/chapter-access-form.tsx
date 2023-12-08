"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter, Course } from "@prisma/client"

import axios from "axios"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface AccessFormProps {
    initialData: Chapter
    courseId: string
    chapterId: string
}

const formSchema = z.object({
    isFree: z.boolean().default(false)
})


const AccessForm = ({ initialData, courseId, chapterId }: AccessFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const toggleEdit = () => setIsEditing(current => !current)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData.isFree
        }
    })
    const { isSubmitting, isValid } = form.formState
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter Updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className=" bg-slate-100 border mt-6 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Chapter access
                <Button variant="ghost" onClick={toggleEdit}>
                    {
                        isEditing ? (<>Cancel</>) :
                            (<>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit title
                            </>)
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    <div className={cn("text-sm mt-2",
                        !initialData.isFree && "italic text-slate-500"
                    )}>
                        {initialData.isFree ?
                            (<p>This chapter is free for preview</p>) :
                            (<p>This chapter is not free</p>)}
                    </div>
                )
            }
            {
                isEditing && <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2 mt-4">
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />

                                    </FormControl>
                                    <div className=" leading-none space-y-1">
                                        <FormDescription>Check this if you want to make this chapter free for preview</FormDescription>
                                    </div>
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

export default AccessForm