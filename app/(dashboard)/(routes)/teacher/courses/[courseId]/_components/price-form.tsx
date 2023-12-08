"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/format-price"
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

interface PriceFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    price: z.coerce.number()
})

const PriceForm = ({ courseId, initialData }: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing(current => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        }
    })

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course updated")
            router.refresh()
            toggleEditing()

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="border bg-slate-100 p-4 mt-6 rounded-md">
            <div className="flex justify-between items-center gap-y-4">
                <h2 className="font-medium">Course price</h2>
                <Button onClick={() => toggleEditing()} variant="ghost">
                    {
                        !isEditing ? (
                            <div className="flex">
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit price
                            </div>
                        ) : (
                            <>Cancel</>
                        )
                    }
                </Button>
            </div>
            {!isEditing &&
                (<p className={cn("text-sm mt-2",
                    !initialData.price && "text-slate-500 italic"
                )}>
                    {initialData.price? formatPrice(initialData.price) : "No price"}
                </p>)
            }
            {
                isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            disabled={isSubmitting}
                                            placeholder="Set a price for your course"
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

export default PriceForm