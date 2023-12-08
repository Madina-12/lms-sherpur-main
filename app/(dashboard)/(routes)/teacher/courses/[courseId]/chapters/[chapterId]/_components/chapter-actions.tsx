"use client"

import ConfirmModal from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface ChapterActionsProps {
  disabled: boolean
  isPublished: boolean
  chapterId: string
  courseId: string
}


const ChapterActions = ({ chapterId, disabled, courseId, isPublished }: ChapterActionsProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    setIsLoading(true)
    try {
      if (!isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("Chapter published")
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
      }
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
    finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success("Chapter deleted")
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={isLoading || disabled} size="sm" onClick={onClick} variant="ghost">
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <div className=" bg-black p-3 rounded-md hover:bg-slate-600 transition">
          <Trash className="h-4 w-4 text-white" />
          </div>
      </ConfirmModal>
    </div>
  )
}

export default ChapterActions