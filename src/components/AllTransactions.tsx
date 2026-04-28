import { transactionsAll } from "../Models/dummyData";
import { Layout } from "../UI/Layout";

const AllTransactions = () => {

  return(
    <Layout>
      <p>AllTransactions</p>
      <section className="flex flex-col gap-4  overflow-scroll h-150 ">
        {
          transactionsAll.map((transaction) => (
            <div key={transaction.id} className="flex flex-row gap-2  bg-amber-50">
              <p>{transaction.title}</p>
              <p>{transaction.description}</p>
              <p>{transaction.amount}</p>
              <p>{transaction.date}</p>
              <p>{transaction.type}</p>
              <p>{transaction.category}</p>
              <p>{transaction.subcategory}</p>
              <p>{transaction.paymentMethod}</p>
              
            </div>
          ))
        }
      </section>
      
    </Layout>
    )
};

export default AllTransactions; 