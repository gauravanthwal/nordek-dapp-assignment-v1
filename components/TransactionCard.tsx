import React from "react";

interface IProps {
  addressFrom: string;
  addressTo: string;
  amount: string | null;
  message: string;
  timestamp: string;
}

const TransactionCard = ({
  addressFrom,
  addressTo,
  amount,
  message,
  timestamp,
}: IProps) => {
  return (
    <div className="dark:text-white text-gray-700 border border-gray-900  p-3 rounded-md shadow-md shadow-gray-900">
      {addressFrom && (
        <p className="text-gray-400">
          From:{" "}
          <span className="dark:text-white text-gray-700">
            {addressFrom.slice(0, 5)}...
            {addressFrom.slice(addressFrom.length - 4)}
          </span>
        </p>
      )}
      {addressTo && (
        <p className="text-gray-400">
          To:{" "}
          <span className="text-white">
            {" "}
            {addressTo.slice(0, 5)}...
            {addressTo.slice(addressTo.length - 4)}
          </span>
        </p>
      )}
      {amount && (
        <p className="text-gray-400">
          Amount: <span className="dark:text-white text-gray-700">{amount}</span>
        </p>
      )}
      {message && (
        <p className="text-gray-400">
          Message: <span className="dark:text-white text-gray-700">{message}</span>
        </p>
      )}
      {timestamp && (
        <p className="text-gray-400">
          Time: <span className="dark:text-white text-gray-700">{timestamp}</span>
        </p>
      )}
    </div>
  );
};

export default TransactionCard;
