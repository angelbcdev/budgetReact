import { useState } from "react"
import HeatherView from "../../UI/HeatherView"
import { Layout } from "../../UI/Layout"
import type { IBalanceNotification, ITransaction } from "../AddNewTransactions"
import { Keyboard } from "../addNewTransactions/Keyboard"
import { ajustDataForTransaction, emptyNotification } from "../addNewTransactions/helpers"
import type { TransactionType } from "../../Models/dummyData"
import { useBudgetContext } from "../../provide/budget"
import { BalanceNotification } from "../addNewTransactions/BalanceNotification"
import { VALID_ROUTES } from "../../Routes/routes"


export interface IKeyboardEdditable {
  amount: string
}

const initialAmount = "0.00"

export const SavaingsMovement = () => {
  const { saveNewTransaction ,validateMortgageFound ,
  validateSavingsAccountBalance } =
    useBudgetContext();
  const [defaultTypeTransaction, setDefaultTypeTransaction] = useState<TransactionType>("transaction_savings_to_mortgage")

  const [fromAccountValue, setFromAccountValue] = useState({ amount: initialAmount })
  const [animate, setAnimate] = useState(false);
  const [balanceNotification, setBalanceNotification] = useState<IBalanceNotification>({ ...emptyNotification });

  const isToMortgage = defaultTypeTransaction == "transaction_savings_to_mortgage"


  const triggerAnimation = () => {
    setAnimate(true); // reset
    const t = setTimeout(() => {
      clearTimeout(t);
      setAnimate(false)
    }, 150);
    return () => clearTimeout(t);
  };

  const changeType = () => {
    setDefaultTypeTransaction(defaultTypeTransaction == "transaction_savings_to_mortgage" ? "transaction_mortgage_to_savings" : "transaction_savings_to_mortgage")
    setFromAccountValue({ amount: initialAmount })
  }

  const showNotification = ({ msj, color }: { msj: string, color: { text: string, bg: string } }) => {
    setBalanceNotification({
      show: true,
      message: msj,
      color: color
    });
    setTimeout(() => {
      setBalanceNotification({ ...emptyNotification });
    }, 1500);
  }

  const makeTransiction = () => {
    const d: ITransaction = {
      title: isToMortgage ? "Savings to mortgage" : "Mortgage to savings",
      description: "",
      date: new Date(),
      amount: fromAccountValue.amount,
      category: "moneyTransactions",
      type: defaultTypeTransaction,
      paymentMethod: "savings_account",
      subcategory: [],
    }

    const data = ajustDataForTransaction({ dataTransaction: d })
    // console.log(data)



      if (isToMortgage) {
        if (!validateSavingsAccountBalance(Number(fromAccountValue.amount))) {
          showNotification({ msj: "Not enough balance in savings account", color: { text: "#FF0000", bg: "#FFCCCC" } })
          return;
        }
      }else {
        if (!validateMortgageFound(Number(fromAccountValue.amount))) {
          showNotification({ msj: "Not enough balance in mortgage found", color: { text: "#FF0000", bg: "#FFCCCC" } })
          return;
        }
      }

    saveNewTransaction(data, () => {
      setFromAccountValue({ amount: initialAmount })
      triggerAnimation()
      showNotification({ msj: "Transaction saved", color: { text: "#00AA00", bg: "#CCFFCC" } })
    })

  }


  const cards = [
    {
      element: fromAccountValue,


      title: {
        a: "Savings",
        b: "Mortgage"
      }
    },

    {
      element: null,


      title: {
        a: "Mortgage",
        b: "Savings",
      }
    }]

  return (
    <Layout>
       <BalanceNotification {...{ balanceNotification, setBalanceNotification }} />
      <HeatherView title="Movements" />

      <section>
        <section className="h-64 px-10 pt-4 relative flex  flex-col gap-4 ">
          <button onClick={changeType} className="absolute top-24 left-3/4  size-16 bg-blue-400 text-white font-semibold border-2 shadow border-white text-sm -translate- x-1 /2 -translate-y-1/4  rounded-md  ">Change</button>
          <p className="absolute -top-20 ">{defaultTypeTransaction}</p>
          <div className=" gap-5 flex flex-col  ">

            {
              cards.map((e, i) => (
                <div key={i} className={`w-3/4 bg-white min-h-12 border-4 p-2  rounded-md shadow  ${i == 0 ? "  border-blue-200 " : "border-transparent "}`}>
                  <p className=" text-[11px]" >{i == 0 ? "FROM :" : "TO :"} <span className="font-semibold text-xl">{isToMortgage ? e.title.a : e.title.b}</span></p>
                  {i == 0 && <p className={`font-md text-3xl text-gray-700 text-end ${animate ? "scale-103 opacity-70 pr-px " : "scale-100 opacity-100"
                    }`}>{e?.element?.amount}</p>}
                </div>))
            }

          </div>
        </section>

        <Keyboard triggerAnimation={triggerAnimation}
          createTransaction={makeTransiction}
          dataTransaction={fromAccountValue}
          setDataTransaction=
          {setFromAccountValue} 
          buttonOptions={{title:"Sell Stocks",path:VALID_ROUTES.sellassects}}
          />
      </section>
    </Layout>
  )
}