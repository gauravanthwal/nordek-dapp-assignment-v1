import type { NextPage } from "next";
import { Welcome, Navbar, Transaction } from "../components";

import { TransactionsProvider } from "../context/TransactionContext";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <TransactionsProvider>
        <div className="gradient-bg-welcome min-h-screen">
          <Navbar />
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
