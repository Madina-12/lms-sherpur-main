import { getCourses } from "@/actions/get-courses"
import CourseList from "@/components/course-list"
import SearchInput from "@/components/search-input"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Categories from "./_components/categories"

interface SearchPageProps {
    searchParams: {
        items: string
        categoryId: string
    }
}

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth()
    if (!userId) {
        return redirect("/")
    }
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })
    const courses = await getCourses({
        userId,
        ...searchParams
    })
    return (
        <>

            <div className="p-6 space-y-4 w-full">
                <div className="px-6 pt-6 md:hidden md:mb-0 block">
                    <SearchInput />
                </div>
                <Categories
                    items={categories}
                />
                <CourseList items={courses} />
            </div>
        </>
    )
}

export default SearchPage