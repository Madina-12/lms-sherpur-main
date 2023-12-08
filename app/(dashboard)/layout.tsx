import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (<div className="h-full">
        <div className="h-[80px] fixed inset-y-0  w-full z-50 md:pl-56">
            <Navbar />
        </div>
        <div className="h-full w-56 hidden md:flex flex-col fixed inset-y-0 z-50">
            <Sidebar />
        </div>
        <div className="md:pl-56 pt-[80px] min-h-screen flex">
            {children}
        </div>
    </div>);
}

export default DashboardLayout;

