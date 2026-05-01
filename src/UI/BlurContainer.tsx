const BlurContainer =({ size , dev}: {size: number , dev?: boolean})=>{

  return (
    <>
    <div
      style={{ height: `${size}px`}}
        className={`w-98 h-30    ${dev ? "bg-gray-400" : "backdrop-blur-[3px]"}   fixed `} ></div>
      <div className="flex flex-col  mt-1"></div>
      </>
    )
};

export default BlurContainer; 