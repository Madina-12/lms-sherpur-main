"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter, Course } from "@prisma/client"
import axios from "axios"
import { Loader2, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import ChaptersList from "./chapters-list"
import { cn } from "@/lib/utils"

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] }
  courseId: string
}
const formSchema = z.object({
  title: z.string().min(1)
})
const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const toggleCreate = () => setIsCreating(current => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success("Course updated")
      toggleCreate()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const onReorder = async (updateData: { id: string, position: number }[]) => {
    try {
      setIsUpdating(true)
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData
      })
      toast.success("Chapters reordered")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsUpdating(false)
    }
  }
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }
  return (
    <div className="relative border rounded-md bg-slate-100 mt-6 p-4">
      {isUpdating && (
        <div className="flex justify-center items-center bg-slate-500/20 top-0 right-0 rounded-md absolute h-full w-full">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex justify-between items-center font-medium">
        Course Chapters
        <Button onClick={toggleCreate} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {
        isCreating && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2 mt-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Introduction to the course'"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Create
              </Button>
            </form>
          </Form>
        )
      }
      {
        !isCreating &&
        (
          <div className={cn("text-sm mt-2",
            !initialData.chapters && "italic text-slate-500"
          )}>
            {!initialData.chapters && "No chapters"}
            <ChaptersList 
              onEdit = {onEdit}
              onReorder = {onReorder}
              items = {initialData.chapters || []}
            />
          </div>
          
        )
      }
    </div>
  )
}

export default ChaptersForm