import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import TransactionCard from "./TransactionCard";

const Transaction = () => {
  const { transactions, currentAccount }: any = useContext(TransactionContext);
  console.log(transactions);

  return (
    <div>
      {currentAccount ? (
        <h3 className="text-white text-3xl text-center my-2 ">
          Latest Transaction
        </h3>
      ) : (
        <h3 className="text-white text-3xl text-center my-2 ">
          Connect your account to see latest transaction
        </h3>
      )}

      <div className="flex flex-wrap justify-center items-center mt-10 gap-4">
        {[...transactions].reverse().map((transaction, i) => (
          <TransactionCard
            key={i}
            addressFrom={transaction.addressFrom}
            addressTo={transaction.addressTo}
            amount={transaction.amount}
            message={transaction.message}
            timestamp={transaction.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default Transaction;
