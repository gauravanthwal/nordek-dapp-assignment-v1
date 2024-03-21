import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

export interface INavbarItem {
  title: string;
  classProps: string;
}

const Navbar = () => {
  return (
    <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-white">ETH<span className="text-cyan-500">PAY</span></h1>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Wallets", "Market"].map((item, index) => (
          <NavbarItem key={index} title={item} classProps={""} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
    </nav>
  );
};

const NavbarItem = (props: INavbarItem) => {
  return (
    <li className={`mx-4 cursor-pointer ${props.classProps}`}>{props.title}</li>
  );
};

export default Navbar;
