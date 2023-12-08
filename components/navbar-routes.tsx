"use client"

import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import SearchInput from "./search-input";


const NavbarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursesPage = pathname?.includes("/courses")
    const isSearchPage = pathname?.includes("/search")

    return (
        <div className="w-full flex">
            <div className=" hidden md:block">
                {isSearchPage && <SearchInput />}
            </div>
                {!isCoursesPage && !isTeacherPage && <div className="w-full flex justify-end text-sky-900 text-sm gap-x-2">
                    <Link href={"/teacher/courses"}>
                        <Button size="sm" variant="ghost">
                            Teacher mode
                        </Button>
                    </Link>
                </div>}
                <div className=" ml-auto text-sky-900 text-sm flex gap-x-2">
                    {isTeacherPage || isCoursesPage ?
                        (<Link href={"/"}>
                            <Button size="sm" variant="ghost">
                                <LogOut className="mr-2 h-4 w-4" />
                                Exit
                            </Button>
                        </Link>) : <div></div>
                    }
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
    )

}

export default NavbarRoutes