import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import heroImage from "../../Assets/HeroAssets/heroImage.png";
import Dropdown from "./DropdownCategories";
import PriceSlider from "./PriceSlider";
import DropdownArea from "./DropdownArea";
import { useTranslation } from "next-i18next";

function HeroSection() {
  const { t } = useTranslation("frontPage");
  console.log();

  return (
    <section className="relative border-t bg-[var(--bg-1)] lg:border-t-0">
      <CalendarDaysIcon
        width={508}
        height={500}
        className="absolute right-0 top-0 hidden w-[20%]  text-slate-400  xl:block"
      />
      <Image
        priority
        className="absolute left-0 top-[70%] z-10 hidden w-[25%] lg:block"
        src={heroImage}
        width={808}
        height={642}
        alt="image"
      />

      <div className="h-full px-3 pb-16 pt-[70px] sm:pt-[100px] md:pt-[150px] xl:pt-[180px]">
        <div className="container">
          <div className="relative z-10 text-center">
            <h1 className=" text-7xl font-semibold  text-neutral-700">
              {t("Hero-main1")}{" "}
              <span className="text-purple-800"> {t("Hero-bold")} </span>
              {t("Hero-main2")}
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-xl text-gray-500 md:mt-9">
              {t("Hero-sub")}
            </p>
            <div className="relative z-30 mx-auto mt-12 flex max-w-[1060px] flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-lg lg:p-5">
              <Dropdown />
              <DropdownArea />
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
