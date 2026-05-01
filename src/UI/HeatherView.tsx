const HeatherView =({title}: {title: string})=>{

  return(
     <div className="sticky top-0  bg-white p-4 ">
        <div className="flex flex-row gap-4 pl-2 pt-4  relative  items-center  ">
          <h3 className="text-3xl font-bold ">{title}</h3>
          <h6 className="text-3xl font-light text-gray-600 "> </h6>
        </div>
      </div>
    )
};

export default HeatherView; 