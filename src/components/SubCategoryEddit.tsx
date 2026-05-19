import { useState } from "react";

import { useBudgetContext } from "../provide/budget";
import HeatherView from "../UI/HeatherView";
import { Layout } from "../UI/Layout";
import { allIcons } from "../UI/allIicons";
import { fliterCategoryAvailable } from "../Models/dummyData";


export interface SubCategoryEdditProps {
  id: string | null;
  title: string;
  icon: string;
  color: string;
  category: string[];

}
 




export class SubCategory implements SubCategoryEdditProps { 
  id: string;
  title: string;
  icon: string;
  color: string;
  category: string[];

  constructor(data: SubCategoryEdditProps) {
     if (typeof data.category === "string") {
      const oldValue: string = data.category;
      (data.category as string[]) = oldValue.split(",");
    }



    this.id = data.id ?? crypto.randomUUID();
    this.title = data.title;
    this.icon = data.icon;
    this.color = data.color;
    this.category = data.category;
  }

  toSheetRow(): Record<string, string | number> {
    return {
      id: this.id,
      title: this.title,
      icon: this.icon,
      color: this.color,
      category: this.category.join(",")
    }
  }
}

const SubCategoryEddit = () => {

  const { subcategoriesData ,saveSubCategories } = useBudgetContext()
  
  const keys = fliterCategoryAvailable 



  const createAnewSubCategory = ({title, icon, color, category}:{title: string;
  icon: string;
  color: string;
  category: string[];}) => {
    
    const newSubCategory = new SubCategory({id: null, title, icon, color, category: category.map((c) => c.toLocaleLowerCase())})
    saveSubCategories([...subcategoriesData, newSubCategory])
  }

 

  return(
     <Layout>
      <HeatherView title="Sub Category" />
  
    
      
      <div className="flex flex-col w-94 px-4 pt-4 mx-4  relative   h-160  overflow-y-scroll ">
  
        <div className="flex flex-col gap-2">
             {
          keys.map((e, i) => {
            if (!e) return
            return(
              <SubCategoryRow createAnewSubCategory={createAnewSubCategory} key={i} title={e} data={subcategoriesData.filter((f) => f.category.includes(e.toLocaleLowerCase()))} />
            
          )})
        }
        <div className=" h-40  w-20 relative "></div>
        </div>
   
       
      </div>
      
    </Layout>
    )
};

export default SubCategoryEddit; 


const SubCategoryRow = ({createAnewSubCategory, title , data }:{createAnewSubCategory: (data: SubCategoryEdditProps) => void, title: string, data:SubCategory[] }) => {
  const [showModal, setShowModal] = useState(false)
  const [newSubCategory, setNewSubCategory] = useState({ title: "", icon: "", color: "", category: "" })
  const [allCategories, setAllCategories] = useState([title])
  const [subCategoryToEdit, setSubCategoryToEdit] = useState<SubCategory | null>(null)

  const addValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewSubCategory((data) => ({ ...data, [name]: value  }));
  };
  const createSubCategory = () => {
    createAnewSubCategory({
      id: null,
      title: newSubCategory.title,
      icon: newSubCategory.icon,
      color: newSubCategory.color,
      category: allCategories
    })
    closeModal()
  }
  const addCategory = (category: string) => {
    console.log(allCategories)
    if (allCategories.includes(category)) {
      setAllCategories(allCategories.filter((c) => c !== category));
    } else {
       setAllCategories([...allCategories, category]);
    }
  }

  

  const closeModal = () => {
    setShowModal(false)
    setSubCategoryToEdit(null)
    setAllCategories([title])
  }

  const editSubCategory = (subCategory: SubCategory) => {
    
    setSubCategoryToEdit(subCategory)
    setAllCategories([...allCategories, ...subCategory.category])
    setTimeout(() => {
      setShowModal(true)
    },100)
  }

  return (
    <>
      {showModal &&
        <section
          onClick={closeModal}
          className="w-full h-full fixed bg-black/50 top-0 left-0 z-50 flex  ">
         <SubCategoryModal   addValue={addValue} title={title} allCategories={allCategories} addCategory={addCategory} subCategoryToEdit={subCategoryToEdit} createSubCategory={createSubCategory} />
          
        </section>
      }
      <div className="bg-white rounded-md p-2 shadow-sm min-h-16">
        <div className="flex flex-row justify-between relative">
              <p className="text-stone-800 font-semibold text-xl capitalize w-full mb-1 border-b border-gray-300">{title}</p>
          <button onClick={() => setShowModal(true)}
            className={`${showModal ? "rotate-45 bg-red-500 text-white" : "bg-blue-100"} text-stone-800 font-semibold text-xl capitalize   size-6 rounded-full flex items-center justify-center absolute right-2 transition-all duration-300 lineal shadow `}>{allIcons.plus}</button>
        </div>
        <div className="flex flex-wrap gap-1 ">
         
                {
                  data.map((sc) => (
                    <SubCategortCardForList key={sc.id} sc={sc} editSubCategory={editSubCategory} />
                  ))
                }
              </div>
      </div>
    </>
  )
}


export const SubCategortCardForList = ({sc, editSubCategory,showColor = true ,size = 32}: {sc: SubCategory, editSubCategory: (sc: SubCategory) => void, showColor?: boolean , size?: number }) => {
  return (
    <div 
                      onClick={() =>  editSubCategory(sc)}
                      style={{height:size + "px", backgroundColor:showColor? sc.color + 50 : "", color:showColor? sc.color : "" }}
                      className={`text-stone-800 cursor-pointer font-light text-[12px] border flex items-center justify-center    px-2 rounded capitalize  `}
                    ><span className="mr-1">{sc.icon}</span>  <span>{sc.title}</span></div>
  )
}


const SubCategoryModal = ({  addValue ,title, allCategories, addCategory, subCategoryToEdit ,createSubCategory }: {
  title: string, subCategoryToEdit: SubCategory | null , createSubCategory: () => void 
  addValue: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, allCategories: string[], addCategory: (category: string) => void,
}) => {
  
  

   

  return (
     <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md p-2 shadow-sm h-40 w-90 relative left-8 top-30">
              <p className="text-stone-800 font-semibold text-xl capitalize mb-1 border-b border-gray-300">{title}</p>
            <div className="flex flex-row gap-4">
              <input
                type="text"
          name="title"
                value={subCategoryToEdit?.title}
                className="border-gray-300 border rounded-sm h-6 w-34 bg-transparent px-2 py-1 outline-none focus:border-blue-500"
                placeholder="Title"
                onChange={addValue}
              />
               <input
                type="text"
          name="icon"
                value={subCategoryToEdit?.icon}
                className="border-gray-300 border rounded-sm h-6 w-14 bg-transparent px-2 py-1 outline-none focus:border-blue-500"
                placeholder="Icon"
                onChange={addValue}
              />
              <input
                type="color"
          name="color"
                value={subCategoryToEdit?.color}
                className="border-gray-300 border rounded-sm h-6 w-8 bg-transparent px-2 py-1 outline-none focus:border-blue-500"
                placeholder="color"
                onChange={addValue}
              />
              <button
                onClick={createSubCategory}
                className="bg-blue-300 text-stone-800 font-semibold  capitalize   w-20 rounded-md flex items-center justify-center transition-all duration-300 lineal shadow ">Add</button>
      </div>
      <div className="flex flex-row gap-1 pt-1 justify-between ">
      <p>Categories</p>
       {/* {subCategoryToEdit && <button
          className="bg-red-300 text-white font-semibold text-sm  capitalize   w-18 rounded-md flex items-center justify-center "
                onClick={() => deleteSubCategory(subCategoryToEdit?.id ?? "")}>Delete</button>} */}
      </div>
      
            <div className="flex flex-wrap gap-1 pt-1 ">
            { 
          fliterCategoryAvailable.filter((f) => f !== title).map((c) => {
                  // subCategoryToEdit?.category
            
                  return (<p key={c}
                    onClick={() => addCategory(c)} className={`text-stone-800 font-light text-[12px] border cursor-pointer   px-2 rounded capitalize  ${allCategories.includes(c) ? "bg-blue-300 text-white" : ""}`}>{c}</p>
                )}
          )
            }
          </div>
          </div>
  )
}