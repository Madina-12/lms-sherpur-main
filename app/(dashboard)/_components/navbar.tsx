import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";


const Navbar = () => {
    
    
    return ( 
        <div className="bg-white h-full flex p-4 shadow-sm border-b items-center">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
     );
}
 
export default Navbar;