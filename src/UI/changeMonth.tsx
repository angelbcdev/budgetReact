import { useBudgetContext } from "../provide/budget";
import { allIcons } from "./allIicons";

const ChangeMonth = () => {
  const { changeMountToShow } = useBudgetContext();

  return(
     <div className="flex flex-row justify-between items-center   gap-px rounded-md">
                {
                  ["<", ">"].map((b) => (
                    <button
                      key={b}
                      onClick={() => changeMountToShow(b as "<" | ">")}
                      className="text-xl font-bold w-1/2 h-6 flex justify-center items-center text-gray-600 bg-white rounded-sm"
                    >
                      {b === "<" ? allIcons.myArrowLeft : allIcons.myArrowRight}
                    </button>
                  ))
                }
              </div>
    )
};

export default ChangeMonth; 