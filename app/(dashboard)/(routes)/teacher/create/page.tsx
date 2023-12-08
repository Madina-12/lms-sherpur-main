"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
});

export default function CreatePage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const {isValid, isSubmitting} = form.formState;

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // TODO 
      const response = await axios.post("/api/courses", values)
      console.log(response.data.id);
      
      router.push(`/teacher/courses/${response.data.id}`)
      
      // Temporary 
      // router.push(`/teacher/courses/dumbCourseId`)
      
      toast.success("Course created")
      
    } catch {
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="flex m-auto p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-slate-600 text-sm">What would you like to name your course? Don&apos;t worry, you can change this later.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-6"><FormLabel>Course title</FormLabel></div>
                  <FormControl>
                    <Input placeholder="Advanced Web Development" {...field}  className="transition text-slate-600" />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={"/teacher/courses"}> 
            <Button variant="ghost" type="button">Cancel</Button>
            </Link>
            <Button className="ml-2" type="submit" disabled={!isValid || isSubmitting}>Continue</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
