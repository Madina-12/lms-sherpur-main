"use client"

import ConfirmModal from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import {  useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface actionProps {
  disabled: boolean,
  isPublished: boolean,
  courseId: string,
}
const Actions = ({
  courseId,
  disabled,
  isPublished
}: actionProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()

  const onClick = async () => {
    setIsLoading(true)
    try {
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Course unpublished successfully")
      }
      else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Couse published successfully")
        confetti.onOpen()
      }
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  const onDelete = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/courses/${courseId}`)
      toast.success("Course deleted successfully")
      router.refresh()
      router.push("/teacher/courses")
    } catch (error) {

      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick} size="sm" disabled={disabled || isLoading} variant="ghost">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <div className=" bg-black p-3 mt-2 rounded-md hover:bg-slate-600 transition">
          <Trash className=" h-4 w-4 text-white " />
        </div>
      </ConfirmModal>
    </div>
  )
}

export default Actions