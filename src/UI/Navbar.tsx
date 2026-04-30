
import { routes } from "../Routes/routes";




import { NavLink, useLocation } from "react-router";

const Navbar = () => {
  const allRutes = routes.map((route) => route.path);
  const location = useLocation();
  const indexPath = allRutes.indexOf(location.pathname) ;

 

  return (
    <nav className="flex gap-4 mx-auto justify-center relative rounded-full shadow-md">
      <div className="flex gap-2 py-2 backdrop-blur-2xl border-b border-white border-2 rounded-full relative">
        {routes.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`px-2 py-1 rounded-full transition-all duration-300 font-semibold w-18 z-10 flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-gray-500"
              }`}
            >
              <div className="relative z-50">{link.icon}</div>

              
            </NavLink>
          );
        })}
       {indexPath !== -1 && <div style={{ left: `${((indexPath / allRutes.length) * 100) + 2}%` }} className="w-16 h-8 bg-blue-400 rounded-full absolute bottom-2 transition-all duration-300 z-0" />}
      </div>
    </nav>
  );
};

export default Navbar; 