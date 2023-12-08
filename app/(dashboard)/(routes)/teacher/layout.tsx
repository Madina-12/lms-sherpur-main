import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import React from "react"
//Todo
// import isTeacher from "@/lib/Teacher";

const Layout = ({children}: {children: React.ReactNode}) => {
    // Todo
    const {userId} = auth()
    // if (!isTeacher(userId)) {
    //   redirect("/")  
    // }
    if (!userId) {
      redirect("/")  
    }
  return (
    <>
        {children}
    </>
  )
}

export default Layout