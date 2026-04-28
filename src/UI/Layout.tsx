import Navbar from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="w-107.5 h-200 bg-gray-400-200 border bg-(--color-mybgColor) fixed p-4 rounded-lg  ">
      <div onTimeUpdate={e => e.preventDefault()} className="relative z-0">
        {children}
        </div>
      <Navbar/>
    </div>
  );
}