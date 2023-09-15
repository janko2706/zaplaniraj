import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import heroImage from "../../Assets/HeroAssets/heroImage.png";
import PriceSlider from "./PriceSlider";
import { useTranslation } from "next-i18next";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { HeroDropdown } from "./HeroDropdown/HeroDropdown";
import { useParallax } from "react-scroll-parallax";

function HeroSection() {
  const { t } = useTranslation("frontPage");
  const calendar = useParallax<HTMLDivElement>({ speed: -10 });
  const celebration = useParallax<HTMLImageElement>({ speed: 40 });

  const areas = [
    {
      name: "Zagreb",
    },
    {
      name: "Okolica Zagreba",
    },
  ];
  const categories = [
    {
      name: "Vjenjcanja",
      icon: <CgRing className="   h-5 w-5 text-black " />,
    },
    {
      name: "Rodendani",
      icon: <FaBirthdayCake className="   h-5 w-5 text-black " />,
    },
    {
      name: "Sakramenti",
      icon: <FaChurch className="   h-5 w-5 text-black " />,
    },
    {
      name: "Slavlja",
      icon: <LuPartyPopper className="   h-5 w-5 text-black " />,
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedArea, setSelectedArea] = useState(areas[0]);

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
        <div className="container">
          <div className="relative z-10  text-center">
            <h1 className=" text-6xl font-semibold  text-neutral-700">
              {t("Hero-main1")}{" "}
              <span className="text-purple-800"> {t("Hero-bold")} </span>
              {t("Hero-main2")}
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-xl text-gray-500 md:mt-9">
              {t("Hero-sub")}
            </p>
            <div className="relative z-30 mx-auto mt-12 flex max-w-[1060px] flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-lg lg:p-5">
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

              <PriceSlider />
              <Link
                href="#"
                className="flex w-full justify-center rounded-full bg-primary px-6 py-[14px] text-white xl:w-auto"
              >
                <MagnifyingGlassIcon width={30} height={30} />
              </Link>
            </div>
            <div className="mx-auto mt-16">
              <button className="mb-2 rounded-full bg-primary p-4 text-white">
                <Link href="#">
                  <ChevronDownIcon width={30} height={30} />
                </Link>
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
