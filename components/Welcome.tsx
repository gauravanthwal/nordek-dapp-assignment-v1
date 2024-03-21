import React, { useContext } from "react";
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";

export interface IInput {
  placeholder: string;
  name: string;
  type: string;
  value?: any;
  handleChange(e: any, name: any): any;
}

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  }: any = useContext(TransactionContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };
  console.log(currentAccount);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Send ETH across world.
        </h1>
        {currentAccount ? (
          <h1 className="text-green-400">
            Connected to: <span className="font-bold text-gray-500">{currentAccount && currentAccount}</span>{" "}
          </h1>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-[#2952e3] py-2 px-7 rounded-full cursor-pointer hover:bg-[#2546bd] text-white my-3 w-full"
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Keyword"
          name="keyword"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Enter message"
          name="message"
          type="text"
          handleChange={handleChange}
        />

        <div className="h-[1px] w-full bg-gray-400 my-2" />
        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Send Now
          </button>
        )}
      </div>
    </div>
  );
};

const Input: React.FC<IInput> = ({
  placeholder,
  name,
  type,
  handleChange,
}: IInput) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

export default Welcome;
