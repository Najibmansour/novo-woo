"use client";
import React, { useState } from "react";
import Link from "next/link";
import NovoNavigation from "./components/navmenu";
import Search from "./components/search";
import CartButton from "./components/cartbutton";
import { LOGOIMG, MINILOGOIMG } from "../logoImg";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const handleColorScroll = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", handleColorScroll);

  return (
    <main
      className={`sticky top-0 z-30 flex h-16  w-full flex-row items-center px-3 pt-3 transition-colors ${color && "bg-neutral-950"}`}
    >
      <LOGOIMG className="ml-2 hidden md:block" />
      <MINILOGOIMG className="absolute left-[50%]  -translate-x-[50%] transform md:hidden" />
      <div className="flex-1 ">
        <NovoNavigation />
      </div>
      <Search />
      <CartButton />
    </main>
  );
};

export default Navbar;
