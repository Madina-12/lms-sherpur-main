"use client"

import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Course } from "@prisma/client"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"


interface CategoryFormProps {
    courseId: string,
    initialData: Course,
    options: { name: string, id: string }[]
}
const formSchema = z.object({
    categoryId: z.string().min(1)
})
const CategoryForm = ({ courseId, initialData, options }: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const toggleEdit = () => setIsEditing(current => !current)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        }
    })
    const {isValid, isSubmitting} = form.formState
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const selectedCategory = options.find((category) =>
        category.id === initialData.categoryId
    )

    return (
        <div className="border rounded-md bg-slate-100 p-4 mt-6">
            <div className="flex justify-between items-center font-medium">
                Course category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                <p className={cn("text-sm mt-2",
                    !initialData?.categoryId && "italic text-slate-500"
                )}>{selectedCategory?.name || "No category"}</p>
            }
            {isEditing && 
                <Form {...form}>
                    <form 
                    className=" space-y-4 mt-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name = "categoryId"
                            render = {({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Combobox
                                        options={...options}
                                        {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting || !isValid}>
                                Save
                        </Button>
                    </form>
                </Form> 
            }
        </div>
    )
}

export default CategoryForm