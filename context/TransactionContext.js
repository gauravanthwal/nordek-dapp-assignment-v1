import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAddress } from "../utils/constants";
import contractABI from "../utils/Transactions.json";

export const TransactionContext = React.createContext(null);

let ethereum;
if (typeof window !== "undefined") {
  ethereum = window.ethereum;
}

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    signer
  );

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    typeof window !== "undefined" && localStorage.getItem("transactionCount")
  );

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Check if Wallet is Connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransaction();
      } else {
        console.log("No Account found");
      }

      console.log(accounts);
    } catch (err) {
      console.error(err);
    }
  };

  // Check if Threre are Transactions have made
  const checkIfTransactionsExist = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const transactionsContract = createEthereumContract();
      const transactionsCount =
        await transactionsContract.getTransactionCount();

      if (typeof window !== "undefined") {
        localStorage.setItem("transactionCount", transactionsCount);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Get all Transactions
  const getAllTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const transactionsContract = createEthereumContract();
      const availableTransactions =
        await transactionsContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      setTransactions(structuredTransactions);
    } catch (err) {
      console.error(err);
    }
  };

  // Connect Wallet to metamask
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
      throw new Error("NO ETH object");
    }
  };

  // Send Transaction
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      console.log(typeof amount, amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success`);

      const transactionsCount =
        await transactionsContract.getTransactionCount();

      setTransactionCount(transactionsCount.toNumber());
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
