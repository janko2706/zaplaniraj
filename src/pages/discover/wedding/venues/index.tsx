import {
  ListBulletIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  CakeIcon,
} from "@heroicons/react/20/solid";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React, { useState } from "react";
import { FaBreadSlice, FaGuitar } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { HeroDropdown } from "~/Molecules/HeroSection/HeroDropdown/HeroDropdown";
import ListCard from "~/Molecules/ListCard/ListCard";
import Pagination from "~/Molecules/Pagination/Pagination";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";
import { LuFlower } from "react-icons/lu";
import { motion } from "framer-motion";

const iconClasses = "h-5 w-5";

const weddingCategories: {
  name: string;
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}[] = [
  {
    name: "Venues",
    icon: <BuildingOfficeIcon className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Cakes",
    icon: <CakeIcon className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Flowers",
    icon: <LuFlower className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Music",
    icon: <FaGuitar className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Catering",
    icon: <FaBreadSlice className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Transportation",
    icon: <AiFillCar className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
];

const sortItems = [
  {
    name: "Popular",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Price",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Latest",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Reviews",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Oldest",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
];

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<
    | {
        name: string;
        icon?: JSX.Element;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(weddingCategories[0]);
  const [selectedSort, setSelectedSort] = useState<
    | {
        name: string;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(sortItems[0]);
  const { menus } = useMenu();
  return (
    <MainTemplate bgColorDesktop="bg-primaryLight" menus={menus}>
      <>
        <div className="fixed z-50 w-full rounded-lg bg-primaryLight shadow-md  lg:max-h-[20vmin]">
          <h1 className="w-full text-center font-Alex-Brush text-6xl lg:text-8xl">
            Weddings
          </h1>
          <div className="flex justify-center">
            <HeroDropdown
              options={weddingCategories}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>

          <div className="mx-4 flex items-center justify-between rounded-xl bg-primaryLight py-5 lg:mx-0 lg:justify-center lg:gap-52">
            <div
              className={`link clr-neutral-500 flex cursor-pointer items-center gap-2 hover:text-primary `}
            >
              <FunnelIcon className={iconClasses} />
              {/* TODO: USE ACCORDION FOR FILTER DROPDOWN */}
              {/* <Accordion
                buttonContent={(open) => (
                  <div className="flex items-center justify-between rounded-2xl">
                    <h3 className="h3">Opcenito </h3>
                    <FunnelIcon
                      className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                )}
                initialOpen={false}
              >
                <div className=" ">HELLOW WORLD</div>
              </Accordion> */}
            </div>
            <div>
              <ul className=" hidden justify-center gap-4 lg:flex">
                <li>
                  <Link
                    href="property-list"
                    className={`link clr-neutral-500 flex items-center gap-2 hover:text-primary `}
                  >
                    <ListBulletIcon className="h-5 w-5" />
                    <span className="inline-block font-medium">List</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="property-map"
                    className={`link clr-neutral-500 flex items-center gap-2 hover:text-primary`}
                  >
                    <MapPinIcon className="h-5 w-5" />
                    <span className="inline-block font-medium">Map</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-fit ">
              <HeroDropdown
                size={"small"}
                options={sortItems}
                selected={selectedSort}
                setSelected={setSelectedSort}
              />
            </div>
          </div>
        </div>

        <div className="discover-padding container">
          <motion.ul
            className="flex w-full flex-col gap-9 pb-10"
            variants={{
              hidden: {
                opacity: 1,
              },
              show: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {featuredItems.Paris.map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.25,
                      type: "spring",
                      stiffness: 150,
                    },
                  },
                }}
              >
                <ListCard item={item} key={item.id} />
              </motion.li>
            ))}
          </motion.ul>
          <Pagination />
        </div>
      </>
    </MainTemplate>
  );
}
export default Index;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});
export const featuredItems = {
  Paris: [
    {
      id: "iuabsdgsdifugb",
      title: "Restoraunt Bridgeton",
      address: "Jelenscak 6, Samobor 10430 Hrvatska",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: true,
      img: "https://picsum.photos/500/500",
    },
    {
      id: "iuabsdgsdifugb",
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: false,
      img: "https://picsum.photos/500/500",
    },
    {
      id: "iuabsdgsdifugb",
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: false,
      img: "https://picsum.photos/500/500",
    },
    {
      id: "iuabsdgsdifugb",
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: false,
      img: "https://picsum.photos/500/500",
    },
  ],
};
