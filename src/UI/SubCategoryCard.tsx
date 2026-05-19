import { SubCategortCardForList } from "../components/SubCategoryEddit";
import { useBudgetContext } from "../provide/budget";
import { SubCategory } from "../components/SubCategoryEddit";


export  const SubCategoryCard = ({subCategory,onClick }:{subCategory:string ,onClick:()=>void })=>{
  const { subcategoriesData } = useBudgetContext()
  
  const data = subcategoriesData.find((sc) => sc.title === subCategory) || new SubCategory({id: null, title: subCategory, icon: "", color: "", category: []}) 

  return (

      <SubCategortCardForList sc={data} editSubCategory={onClick} size="S" showColor={true}  />
            )}