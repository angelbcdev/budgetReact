import { Transaction } from "../../Models/DataTransactions";
import type {
  Category,
  PaymentMethod,
  TransactionType,
} from "../../Models/dummyData";
import type { ITransaction } from "../AddNewTransactions";

export const emptyNotification = {
  show: false,
  message: "",
  color: {
    text: "",
    bg: "",
  },
};

export const emptyNewTransactions = ({
  defaultCategory,
  defaultTypeTransaction,
}: {
  defaultCategory: Category;
  defaultTypeTransaction: TransactionType;
}): ITransaction => ({
  title: defaultCategory,
  description: "",
  date: new Date(),
  amount: "0",
  category: defaultCategory,
  type: defaultTypeTransaction,
  paymentMethod: "credit_card_red",
  subcategory: [],
});

export const validateEnoughBalance = ({
  dataTransaction,
  validateBalance,
  validateSavingsAccountBalance,
}: {
  dataTransaction: ITransaction;
  validateBalance: (n: number) => boolean;
  validateSavingsAccountBalance: (n: number) => boolean;
}): boolean => {
  const { paymentMethod, type, category, amount } = dataTransaction;

  const numericAmount = Number(amount);

  const isChecking = paymentMethod === "checking";
  const isCard =
    paymentMethod === "credit_card_blue" || paymentMethod === "credit_card_red";

  // Credit cards always allowed
  if (isCard) return true;
  //using savings account
  if (paymentMethod === "savings_account" && type === "spending") {
    return validateSavingsAccountBalance(numericAmount);
  }

  // Adding funds to checking
  if (category === "checking" && type === "credit_card_payment") return true;

  // Actions that require balance validation
  if (isChecking && (type === "spending" || type === "credit_card_payment")) {
    return validateBalance(numericAmount);
  }

  //  validation needed
  if (isChecking && (type === "saving" || category === "mortgage")) {
    return validateBalance(numericAmount);
  }

  return false;
};

export const validateEnoughPayCreditCart = ({
  dataTransaction,
  validatePaymentCard,
  adjustCreditCardTotalDeb,
}: {
  dataTransaction: ITransaction;
  adjustCreditCardTotalDeb: (n: string) => void;
  validatePaymentCard: (
    card: string,
    cuantity: number,
    acction: (newAmount: string) => void,
  ) => boolean;
}): boolean =>
  dataTransaction.paymentMethod == "checking" &&
  dataTransaction.type == "credit_card_payment" &&
  (dataTransaction.category == "credit_card_blue" ||
    dataTransaction.category == "credit_card_red") &&
  !validatePaymentCard(
    dataTransaction.category,
    Number(dataTransaction.amount),
    adjustCreditCardTotalDeb,
  );

export const validateEnoughPayMortgage = ({
  dataTransaction,
  validateMortgageFound,
}: {
  dataTransaction: ITransaction;
  validateMortgageFound: (amount?: number | undefined) => boolean;
}): boolean =>
  dataTransaction.category == "mortgage" &&
  dataTransaction.type == "credit_card_payment" &&
  !validateMortgageFound(Number(dataTransaction.amount));

export const ajustDataForTransaction = ({
  dataTransaction,
}: {
  dataTransaction: ITransaction;
}): Transaction => {
  const validatePayMortgage =
    dataTransaction.type == "credit_card_payment" &&
    dataTransaction.category == "mortgage";

  const validateIsPayCheck =
    dataTransaction.category == "checking" &&
    dataTransaction.type == "credit_card_payment";
  const validatePayCreditCard =
    dataTransaction.type == "credit_card_payment" &&
    (dataTransaction.category == "credit_card_blue" ||
      dataTransaction.category == "credit_card_red");

  console.log(dataTransaction)

   const validateMoveSavings = dataTransaction.type ==  "transaction_savings_to_mortgage"

  const checkValidationsPayment = (): PaymentMethod => {
    if (validatePayMortgage) {
      return "mortgage";
    }
    if (validateIsPayCheck) {
      return "paycheck";
    }
    if (validatePayCreditCard) {
      return "cards_payment";
    }
    if (validateMoveSavings) {
      return "savings_account";
    }
    return dataTransaction.paymentMethod;
  };

  const checkValidationTitle = (): string => {
    if (validatePayCreditCard) {
      return dataTransaction.category == "credit_card_blue"
        ? "Payment Blue Card "
        : "Payment Red Card ";
    }
    return dataTransaction.title || dataTransaction.category;
  };

  const validateSubcategory = (): string[] => {
    if (validatePayCreditCard) {
      return [""];
    }
    return dataTransaction.subcategory;
  };

  const checkValidationsCategory = (): Category => {
    if (validatePayMortgage) {
      return "mortgage_Payment";
    }
    return dataTransaction.category;
  };
  const clearDiscription = () => {
    const has1 =
      dataTransaction.description[dataTransaction.description.length - 1] ==
      "1";
    if (has1) {
      return dataTransaction.description.slice(0, -1);
    }
    return dataTransaction.description;
  };

  return new Transaction({
    id: crypto.randomUUID(),
    title: checkValidationTitle(),
    description: clearDiscription(),
    amount: Number(dataTransaction.amount),
    date: dataTransaction.date,
    type: dataTransaction.type,
    category: checkValidationsCategory(),
    subcategory: validateSubcategory(),
    paymentMethod: checkValidationsPayment(),
    porcentage: dataTransaction.porcentage || 0,
  });
};
