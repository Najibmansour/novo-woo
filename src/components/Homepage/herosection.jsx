import Image from "next/image";
import React from "react";

import BACKGROUND from "../../../public/photos/homepage.jpg";

const HeroSection = () => {
  return (
    <section className="w-screen h-screen bg-image">
      {/* <Image
        src={BACKGROUND}
        width={1000}
        height={1000}
        alt="bg-image"
        className="w-full h-full"
      ></Image> */}
    </section>
  );
};

export default HeroSection;
