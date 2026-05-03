import { getSubCategoryMeta, type Subcategory} from "../Models/dummyData";

export const SubCategoryCard = ({subCategory,onClick ,showIcon = true}:{subCategory:Subcategory ,onClick:()=>void , showIcon?:boolean})=>{
     const meta = getSubCategoryMeta(subCategory)
    return(
                <span 
              style={{
                backgroundColor:meta.bg + 40,
                color:meta.bg,
                border:meta.bg,
                borderStyle:"solid",
                borderWidth:1
              }}
              onClick={onClick}
            className={`   ${showIcon ? "px-4" : " text-[10px] px-2"}   rounded capitalize`}  >{showIcon ? meta.icon : ""} {meta.label}</span>
)}