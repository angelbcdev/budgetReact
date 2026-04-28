import { NavLink } from "react-router";
import { routes } from "../Routes/routes";





const Navbar = () => {

  return(
    <nav className="flex gap-4 absolute  bottom-24 left-2 w-100 justify-center">
      <div className="flex gap-8 border px-4 py-2 border-gray-800 rounded-full">
      {
        routes.map((link) => (
          <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
           `px-2 py-1 rounded-full ${
               isActive ? "text-red-500" : "text-black"
            }`
          }
        >
        {link.name}
        </NavLink>
        ))
        }
        </div>
    </nav>
    )
};

export default Navbar; 