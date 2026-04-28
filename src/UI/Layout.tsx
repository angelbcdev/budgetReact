import Navbar from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-107.5 h-200 bg-blue-200 border border-gray-200 fixed   ">
      <div onTimeUpdate={e => e.preventDefault()} className="relative z-0">
        {children}
        </div>
      <Navbar/>
    </div>
  );
}