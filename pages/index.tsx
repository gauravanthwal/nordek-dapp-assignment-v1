import type { NextPage } from "next";
import { Welcome, Navbar, Transaction } from "../components";

import { TransactionsProvider } from "../context/TransactionContext";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  const [isDarkMode, setIsDartMode] = useState(true);

  return (
    <div className={`${isDarkMode && "dark"} min-h-screen`}>
      <ToastContainer theme="dark" position="top-right"/>
      <TransactionsProvider>
          <div
            className={`${isDarkMode && "gradient-bg-welcome"} min-h-screen`}
          >
            <Navbar setIsDartMode={setIsDartMode} isDarkMode={isDarkMode} />
            <div className="max-w-5xl mx-auto py-8">
              <Welcome />
            </div>
            <Transaction />
          </div>
      </TransactionsProvider>
    </div>
  );
};

export default Home;
