import React from "react";
import FooterLinks from "./components/links";

const Footer = () => {
  return (
    <footer className="z-30 rounded-t-[2.5rem] w-full h-[50svh] bg-black -mt-6">
      <FooterLinks />
    </footer>
  );
};

export default Footer;
