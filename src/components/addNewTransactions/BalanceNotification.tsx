 
 import { type IBalanceNotification} from "../AddNewTransactions"
 
 export const BalanceNotification = ({balanceNotification, setBalanceNotification}:{balanceNotification: IBalanceNotification ,setBalanceNotification: React.Dispatch<React.SetStateAction<IBalanceNotification>>}
    
 )=>(
    <>
    {balanceNotification.show && (
            <div
              onClick={() => setBalanceNotification({ show: false, message: "" , color: { text: "", bg: "" }})}
              className="fixed top-0 left-0 w-screen h-screen flex z-80 justify-center items-center bg-black/50"
            >
              <div style={{ color: balanceNotification.color.text , backgroundColor: balanceNotification.color.bg  }} className={`text-md  absolute top-44 rounded-md  shadow-2xl fade-in w-90  z-20 py-2 left-10 flex justify-center uppercase `}>
                {" "}
                {balanceNotification.message}
              </div>
            </div>
          )}
    
    </>
 )