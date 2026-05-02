import { typeTransactionAvailable, type TransactionType } from "../../Models/dummyData";

export const TypeSelectorButtons = ({
  selectCurrentType,
  defaultTypeTransaction,
}: {
  selectCurrentType: (type: TransactionType) => void;
  defaultTypeTransaction: TransactionType;
}) => {
  return (
    <div className="flex flex-row  justify-between bg-gray-200 rounded-md shadow-inner-md p-px">
      {typeTransactionAvailable.map((type) => {
        let title = "";
        if (type === "credit_card_payment") {
          title = "Payment";
        } else {
          title = type;
        }
        const isSelected = defaultTypeTransaction === type;

        return (
          <button
            key={type}
            onClick={() => selectCurrentType(type)}
            className={`px-2 py-1 w-22 rounded-md ${isSelected ? "bg-white text-red-600" : "text-gray-700"}    transition-all ease-in duration-100 capitalize `}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}