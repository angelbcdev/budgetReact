const SelectorMultipleUI = ({
  data,
  selectCurrentType,
  defaultTypeTransaction,
  year
}: {
  year: string
  data: string[];
  selectCurrentType: (type: any) => void;
  defaultTypeTransaction: any;
  }) => {
  const monthSoported = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  
 
  return (
    <div className=" grid grid-cols-6  w-93 sm:w-160 mx-auto bg-gray-400 rounded-md shadow-inner-md p-px">
      {monthSoported.map((type) => {

       const ajustDate = `${year}-${type}`
     
        const isSelected = defaultTypeTransaction === ajustDate;
        

        if (data.includes(ajustDate)) {
          return (
          <button
            key={type}
            onClick={() => selectCurrentType(ajustDate)}
            className={`px-2 py-1 w-flex text-sm rounded-md ${isSelected ? "bg-white text-red-600" : "text-gray-700  bg-gray-500"}    transition-all ease-in duration-100 capitalize `}
          >
            {type}
          </button>
        )
          
        } else {
          return <span key={type} className="px-2 capitalize  text-center py-1 w-flex text-sm rounded-md text-gray-500  ">{type }</span>
        }
        

        ;
      })}
    </div>
  );
};

export default SelectorMultipleUI; 