import { Outlet } from "react-router";
import Navbar from "../UI/Navbar";

export default function MainLayout() {
  return (
    <div className="w-107.5 h-181     fixed top-0     ">
     

   
      <div className="relative z-10">
        <Outlet />
     </div>
    
      <div className="text-6xl text-red-600 absolute bottom-2 z-10 flex justify-center  w-full">
         <Navbar />
    </div>
  
  

    </div>
  );
}