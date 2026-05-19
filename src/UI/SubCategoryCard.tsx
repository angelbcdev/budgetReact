import { SubCategortCardForList } from "../components/SubCategoryEddit";
import { useBudgetContext } from "../provide/budget";
import { SubCategory } from "../components/SubCategoryEddit";


export  const SubCategoryCard = ({subCategory,onClick ,showIcon = true}:{subCategory:string ,onClick:()=>void , showIcon?:boolean})=>{
  const { subcategoriesData } = useBudgetContext()
  
  const data = subcategoriesData.find((sc) => sc.title === subCategory) || new SubCategory({id: null, title: subCategory, icon: "", color: "", category: []}) 
  console.log(data)
  return (

      <SubCategortCardForList sc={data} editSubCategory={onClick} showColor={!showIcon}  />
            //     <span 
            //   style={{
            //     backgroundColor:meta.bg + 40,
            //     color:meta.bg,
            //     border:meta.bg,
            //     borderStyle:"solid",
            //     borderWidth:1
            //   }}
            //   onClick={onClick}
            // className={`   ${showIcon ? "px-4" : " text-[9px] h-4 px-2 text-nowrap "}   rounded capitalize`}  >{showIcon ? meta.icon : ""} {meta.label}</span>
)}