import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-3">
                <Logo />
            </div>
            <div>
                <SidebarRoutes />
            </div>
        </div>
     );
}
 
export default Sidebar;