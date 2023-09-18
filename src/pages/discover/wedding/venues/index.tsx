import {
  Squares2X2Icon,
  ListBulletIcon,
  MapPinIcon,
  BuildingOfficeIcon,
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

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<
    | {
        name: string;
        icon?: JSX.Element;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(weddingCategories[0]);
  const { menus } = useMenu();
  return (
    <MainTemplate menus={menus}>
      <>
        <div className="fixed z-50  w-full bg-white lg:max-h-[20vmin]">
          <h1 className="w-full text-center font-Alex-Brush text-8xl">
            Weddings
          </h1>
          <HeroDropdown
            size={"thin"}
            options={weddingCategories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="my-2  rounded-lg bg-white px-6 lg:shadow-lg">
            <ul className="flex flex-wrap items-center justify-between gap-3 ">
              <li className="flex-grow">
                <ul className=" flex flex-wrap justify-center gap-4">
                  <li>
                    <Link
                      href="property-grid"
                      className={`link clr-neutral-500 flex items-center gap-2 hover:text-primary ${"text-primary"}`}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                      <span className="inline-block font-medium">Grid</span>
                    </Link>
                  </li>
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
                      className={`link clr-neutral-500 flex items-center gap-2 hover:text-primary `}
                    >
                      <MapPinIcon className="h-5 w-5" />
                      <span className="inline-block font-medium">Map</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="hidden items-center lg:flex">
                <p className="clr-neutral-500 mb-0 flex-grow whitespace-nowrap">
                  Sort By :
                </p>
                <select className="w-full border-0 bg-transparent px-5 py-2 focus:outline-none">
                  <option value="Popular">Popular</option>
                  <option value="Price">Price</option>
                  <option value="Latest">Latest</option>
                  <option value="Reviews">Reviews</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
        <div className="container pt-[50vmin] lg:pt-[16vmin]">
          <div className="flex w-full flex-col gap-9 pb-10">
            {featuredItems.Paris.map((item) => (
              <ListCard item={item} key={item.id} />
            ))}
          </div>
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
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: false,
      images: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
    {
      id: "iuabgdddddddsdifugb",
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: false,
      images: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
    {
      id: "iuabgsdif1335345ugb",
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",
      type: "Rent",
      priceRange: [5000, 20000],
      popular: false,
      images: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
  ],
};
