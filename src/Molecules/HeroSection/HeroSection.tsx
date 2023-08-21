import React from "react";
import Button from "~/Atoms/Button/Button";
import Image from "next/image";
import heroImage from "../../Assets/heroImage.png";

function HeroSection() {
  return (
    <div
      style={{ alignItems: "center" }}
      className="container flex w-full justify-center  align-middle sm:py-12 lg:flex-row  lg:py-6"
    >
      <div className="flex flex-col justify-center rounded-sm  text-center  lg:max-w-lg lg:text-left">
        <h1 className=" text-5xl font-bold sm:text-6xl">
          Organiziraj svoj
          <span className="text-purple-800"> nezaboravan </span>
          provod
        </h1>
        <p className="mb-8 mt-6 text-lg sm:mb-12">
          Odabir lokacije, prilagodba detalja i pozivnice gostima nikada nisu
          bili lakši.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
          <Button
            text="Registracija"
            className="rounded-md bg-primaryBlue px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-200 hover:text-primaryBlue"
          />
          <a
            href="#istraziPocetna"
            className="rounded-md bg-slate-300 px-8 py-3 text-lg font-semibold text-primaryBlue transition-all duration-300 hover:bg-slate-200"
          >
            Istrazi
          </a>
        </div>
      </div>
      <div className="ml-20 mt-10 hidden h-64  items-center  rounded-lg  shadow-md shadow-customBrown lg:inline-flex ">
        <Image
          className="block h-full  object-contain lg:h-96"
          src={heroImage}
          alt="Confetti for intro to the platform"
        />
      </div>
    </div>
  );
}

export default HeroSection;
