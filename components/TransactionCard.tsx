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
    <div className="text-white border border-gray-900  p-3 rounded-md shadow-md shadow-gray-900">
      {addressFrom && (
        <p className="text-gray-400">
          From:{" "}
          <span className="text-white">
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
          Amount: <span className="text-white">{amount}</span>
        </p>
      )}
      {message && (
        <p className="text-gray-400">
          Message: <span className="text-white">{message}</span>
        </p>
      )}
      {timestamp && (
        <p className="text-gray-400">
          Time: <span className="text-white">{timestamp}</span>
        </p>
      )}
    </div>
  );
};

export default TransactionCard;
