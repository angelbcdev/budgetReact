import { useState } from "react";
import { useBudgetContext } from "../provide/budget";
import type { TKEY_GOALS } from "../provide/interfaces";

import { Layout } from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import { VALID_ROUTES } from "../Routes/routes";
import { useNavigate } from "react-router";
import { MyInputText } from "./MultiTransactions";


const Settings = () => {
  const { changeMountToShow, curentDate, currentMonthGoals,stocksProfit ,saveStocksProfit } =
    useBudgetContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const version = "Version 1.2.0";

  const data = Object.keys(currentMonthGoals).map((key) => {
    return {
      name: key,
      value: currentMonthGoals[key as TKEY_GOALS],
      action: () => {
        
      },
    };
  });

  const settinsButtos = [
    {
      title: "Stocks",
      
    data: [{
      name: "Profit",
      value: stocksProfit,
      action: () => {
        setShowModal(true)
      }}
    ]
  },
  
    {
      title: "Change month",
      data: [
        {
          name: "Previous month",
          value: 0,
          action: () => {
            changeMountToShow("<")
          },
        },
        {
          name: "Next month",
          value: 0,
          action: () => {
            changeMountToShow(">")
          },
        },
      ]
    },
    
    {
      title: "Goals for this month",
      data: data
    },
    {
      title: "Sub Categories",
      data: [
        {
          name: "View All",
          value: 0,
          action: () => {navigate(VALID_ROUTES.subcategory )},
        },
      ]
    }
    // {
    //   title: "Storage",
    //   data: [ //udateLocalDataBase
    //     {
    //       name: "Delete all data",
    //       value: 0,
    //       action: () => {
    //         handleDelete()
    //       },
    //     },{
    //       name: "Check for updates",
    //       value: 0,
    //       action: () => {
    //         udateLocalDataBase()
    //       },
    //     }
        
        
    //     , {
    //       name: "Save Backup",
    //       value: 0,
    //       action: () => {
    //         handleBackup()
    //       },
    //     },
    //   ]
    // }
  ]

  const closeModal = () => {
    setShowModal(false)
    setAmount(0)
  }

  const saveProfit = () => {
    saveStocksProfit(amount)
   
    closeModal()
  }

  return (
    <Layout>
     <HeatherView title="Settings" />
      <div className="flex flex-col overflow-auto h-175  relative">
        {showModal && <div
          onClick={closeModal}
          className="fixed top-0 w-full h-full  z-30  bg-black/50   ">
          <div
            onClick={(e) => e.stopPropagation()}
            className=" w-80 h-28  bg-white px-4 relative top-24 left-15 flex flex-row gap-4 justify-between items-center rounded-sm ">
            <MyInputText
              name="New Amount"
              onChange={(e) => { setAmount(Number(e.target.value))}}
              defaulvalue=""
              type="number"
            />
            <button
            className="w-24 border rounded-sm  h-10 bg-blue-500 text-white "
              onClick={saveProfit} >Save</button>
          </div>
        </div>}
         <section className="flex flex-row w-full max-w-94 mx-auto justify-between  items-end mb-2 ">
        <div className="flex flex-row gap-4  pt-4  relative w-44  items-center ">
          <h3 className="text-2xl font-bold ">{curentDate.month}</h3>
          <h3 className="text-2xl font-light text-gray-600 relative  ">
            {" "}
            {curentDate.year}
          </h3>
        </div>

        </section>
        

        <div>
           {settinsButtos.map((item) => (
          <ListButtonShow key={item.title} data={item.data} title={item.title} />
           ))}
          <p className="text-center text-gray-600 ">{version}</p>
          <div className=" h-40  "></div>
        </div>
     
    
        
      
        
      </div>
    </Layout>
  );
};

export default Settings;

const ListButtonShow = ({
  data,
  title,
}: {
  title: string;
  data: {
    name: string;
    value: number;
    action: () => void;
  }[];
}) => {
  return (
    <section className="flex flex-col w-full max-w-94 mb-4  gap-4 mx-auto justify-between  items-start ">
      <p>{title}</p>

      <div className="flex flex-col     relative w-94 bg-white  rounded-xl shadow-md overflow-hidden  ">
        {data.map((item) => (
          <ButtonLine key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
};

const ButtonLine = ({
  item,
}: {
  item: { name: string; value: number; action: () => void };
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    item?.action();
    setTimeout(() => {
      setIsPressed(false);
    },200)
  }
  let title = ''
  if (item.name.startsWith("savings")) {
    title = item.name.slice(7)
  } else {
    title = item.name
  }
  
  return (
    <div
      onClick={handleClick}
      className={`  
        transition-all duration-100 ease-linear
        ${isPressed ? "bg-gray-400/50" : "bg-transparent"}`}
    >
      <div
      className={` 
              
                flex flex-row gap-4  h-10   relative  w-[94%]  mx-auto  border-b border-gray-200  justify-between px-3 items-center `}
      >
            <h3 className="text-sm font-bold ">{title}</h3>
      <h3 className="text-sm font-light text-gray-600 relative  ">
        {" "}
        {item.value > 0 && item.value}
      </h3>
  </div>
    </div>
  );
};
