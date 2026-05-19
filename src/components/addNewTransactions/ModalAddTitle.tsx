import { useEffect, useRef } from "react";

import { allIcons } from "../../UI/allIicons";
import type { ITransaction } from "../AddNewTransactions";
import type { Category } from "../../Models/dummyData";
import { useBudgetContext } from "../../provide/budget";


import { SubCategortCardForList ,SubCategory } from "../SubCategoryEddit";

export  const ModalAddTitle = ({
  setShowModal,
  setDataTransaction,
  defaultCategory,
  dataTransaction,
  showModal
}: {
  setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  defaultCategory: Category;
  dataTransaction: ITransaction;
  showModal:boolean
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { subcategoriesData} = useBudgetContext()

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataTransaction((data) => ({ ...data, [name]: value + 1 }));
  };
  const addSubcategory = (newSubcategory: SubCategory) => {
    if (dataTransaction.subcategory.includes(newSubcategory.title)) {
      setDataTransaction((data) => ({
        ...data,
        subcategory: data.subcategory.filter(
          (sub: string) => sub !==  newSubcategory.title,
        ),
      }));
    } else {
      setDataTransaction((data) => ({
        ...data,
        subcategory: [...data.subcategory, newSubcategory.title],
      }));
    }
  };

  return (
    <>
    { showModal && <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 bg-black/50 z-50 flex px-4"
    >
      {/* FORM */}
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-4 w-100 max-w-md h-115  max-h-140 relative top-4"
        onSubmit={(e) => {
          e.preventDefault();
          buttonRef.current?.click(); // trigger done
        }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-bold">Add Note for {defaultCategory}</p>

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
          >
            {allIcons.cancel}
          </button>
        </div>

        {/* INPUTS */}
        <div className="flex flex-col gap-2">
          {/* TITLE */}
          <input
            ref={inputRef}
            className="w-full h-10 text-base bg-gray-100 rounded-lg p-3 outline-none"
            placeholder="Title"
            name="title"
            onChange={addValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                textareaRef.current?.focus(); // 👉 jump to textarea
              }
            }}
          />

          {/* TEXTAREA */}
          <textarea
            ref={textareaRef}
            className="w-full h-30 text-base bg-gray-100 rounded-lg p-3 outline-none"
            placeholder="Add a note..."
            name="description"
            onChange={addValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                buttonRef.current?.click(); // 👉 trigger Done
              }
            }}
          />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-full  flex-col gap-4     items-start   pt-2 "
        >
          <p className="text-lg font-semibold ">Other categories</p>
        </div>

        {/* BUTTON */}
        <button
          ref={buttonRef}
          onClick={() => setShowModal(false)}
          type="submit"
          className="mt-4 bg-blue-600 h-13 w-full text-white rounded-lg text-base font-semibold"
        >
          Done
        </button>
        <div className="grid grid-cols-3 h-22 gap-1 pt-3   overflow-scroll">
          

            {
              subcategoriesData.map((sub) => {
                if (!sub.category.includes(defaultCategory as Category)) return
                return (
                    
                  <SubCategortCardForList key={sub.id} sc={sub} editSubCategory={addSubcategory} showColor={dataTransaction.subcategory.includes(sub.title)} />
                )
              })
            }
        </div>
      </form>
    </div>}
    </>
  );
};
