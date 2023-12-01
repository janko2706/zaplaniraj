import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import heroImage from "../../Assets/HeroAssets/heroImage.png";
import { useTranslation } from "next-i18next";
import { CgDollar, CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { HeroDropdown } from "./HeroDropdown/HeroDropdown";
import { useParallax } from "react-scroll-parallax";

function HeroSection() {
  const { t } = useTranslation("frontPage");
  const calendar = useParallax<HTMLDivElement>({ speed: -10 });
  const celebration = useParallax<HTMLImageElement>({ speed: 40 });
  const dropdownIconClasses = "h-5 w-5 text-black";
  const dropdownIconClassesBudget = "h-4 w-4 text-black";

  // TODO OPENAI API INTEGRATION
  // const [query, setQuery] = useState("");
  // const [answer, setAnswer] = useState("");

  // const chatRes =
  //   api.openapi.getTagsFromMessages.useQuery({
  //     query,
  //   }).data ?? "";

  const areas = [
    {
      name: "Zagreb",
    },
    {
      name: "Okolica Zagreba",
    },
  ];
  const priceRange = [
    {
      name: "Mali budzet",
      icon: <CgDollar className={dropdownIconClassesBudget} />,
    },
    {
      name: "Srednji budzet",
      icon: (
        <div className="flex gap-0">
          <CgDollar className={dropdownIconClassesBudget} />
          <CgDollar className={dropdownIconClassesBudget} />
        </div>
      ),
    },
    {
      name: "Veliki budzet",
      icon: (
        <div className="flex gap-0">
          <CgDollar className={dropdownIconClassesBudget} />
          <CgDollar className={dropdownIconClassesBudget} />
          <CgDollar className={dropdownIconClassesBudget} />
        </div>
      ),
    },
  ];
  const categories = [
    {
      name: "Vjenjcanja",
      icon: <CgRing className={dropdownIconClasses} />,
    },
    {
      name: "Rodendani",
      icon: <FaBirthdayCake className={dropdownIconClasses} />,
    },
    {
      name: "Sakramenti",
      icon: <FaChurch className={dropdownIconClasses} />,
    },
    {
      name: "Slavlja",
      icon: <LuPartyPopper className={dropdownIconClasses} />,
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedArea, setSelectedArea] = useState(areas[0]);
  const [selectedBudget, setSelectedBudget] = useState(priceRange[1]);

  return (
    <section className="relative border-t bg-[var(--bg-1)] lg:border-t-0">
      <div ref={calendar.ref}>
        <CalendarDaysIcon
          width={508}
          height={500}
          className="absolute right-0 top-0 hidden w-[20%]  text-slate-400  xl:block"
        />
      </div>
      <Image
        ref={celebration.ref}
        className="absolute left-0 top-[70%] z-10 hidden w-[25%] lg:block"
        src={heroImage}
        width={808}
        height={642}
        alt="image"
      />

      <div className="h-full px-3 pb-16 pt-[70px] sm:pt-[100px] md:pt-[150px] xl:pt-[180px]">
        <div className="container ">
          <div className="relative z-10  text-center ">
            <h1 className=" text-6xl font-semibold  text-neutral-700">
              {t("Hero-main1")}{" "}
              <span className="text-purple-800"> {t("Hero-bold")} </span>
              {t("Hero-main2")}
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-xl text-gray-500 md:mt-9">
              {t("Hero-sub")}
            </p>
            <div className="relative z-30 mx-auto mt-12 flex max-w-[1060px] flex-wrap items-center justify-center gap-3 rounded-xl bg-white p-4 shadow-lg lg:p-5">
              <HeroDropdown
                options={categories}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
              <HeroDropdown
                options={areas}
                selected={selectedArea}
                setSelected={setSelectedArea}
              />
              <HeroDropdown
                options={priceRange}
                selected={selectedBudget}
                setSelected={setSelectedBudget}
              />
              <div className="w-full">
                <Link
                  href="#"
                  className="flex w-full justify-center gap-4 rounded-full bg-primary px-4 py-[14px] text-white opacity-70 transition-all duration-300 ease-in-out hover:opacity-100 xl:w-auto"
                >
                  <MagnifyingGlassIcon width={20} height={20} />
                  Pretrazi
                </Link>
              </div>
              {/* <div className="w-full py-10 text-3xl">ILI</div>
              <div className="w-full   px-2 pb-3 pt-0">
                <div className="pb-5  text-center text-lg">
                  Niste sigurni sto trazite? Pitajte Nas
                  <span className="text-2xl font-bold"> AI</span> ili stavite
                  maksimalno 3 slike te ce on pretraziti za Vas.
                </div>

                <Uploader
                  imageUrls={undefined}
                  maximumImages={0}
                  addToPictures={function (url: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  removeFromPictures={function (location: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  deleteImageInDB={function (
                    location: string
                  ): Promise<boolean> {
                    throw new Error("Function not implemented.");
                  }}
                />
                <div className="w-full">
                  <button
                    type="button"
                    className="flex w-full justify-center gap-4 rounded-full bg-primary px-4 py-[14px] text-white opacity-70 transition-all duration-300 ease-in-out hover:opacity-100 xl:w-auto"
                  >
                    <MagnifyingGlassIcon width={20} height={20} />
                    Pretrazi
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
