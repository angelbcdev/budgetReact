import { NavLink } from "react-router";
import { routes } from "../Routes/routes";
import { useState } from "react";





const Navbar = () => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const calculateLeft = () => {
    if (currentPathIndex === 0) {
      return "2%";
    }else if (currentPathIndex === 1) {
      return "27%";
    }else if (currentPathIndex === 2) {
      return "53%";
    }else if (currentPathIndex === 3) {
      return "78%";
    }

    return `${currentPathIndex * 2}%`;
  }
  return(
    <nav className="flex gap-4    left-2  mx-auto justify-center  relative  rounded-full shadow-md">
      <div className="flex gap-2  py-2   backdrop-blur-2xl border-b border-white border-2 rounded-full ">
      {
        routes.map((link) => (
          <NavLink
          key={link.path}
            to={link.path}
            onClick={() => setCurrentPathIndex(routes.indexOf(link))}
          className={({ isActive }) =>
           `px-2 py-1 rounded-full transition-all ease-in duration-300 font-semibold w-18 z-50 flex flex-col items-center justify-center ${
               isActive ? "text-white" : "text-gray-500"
            }`
          }
          >
        {link.icon}
        {/* <span className="flex items-center justify-center text-sm ">{link.name}</span> */}
        </NavLink>
        ))
        }
      <div style={{ left: `${calculateLeft()}` }} className="w-16 bg-blue-500 h-8  z-0 rounded-full absolute bottom-2 transition-all ease-in-out duration-300"></div>
      </div>
    </nav>
    )
};

export default Navbar; 