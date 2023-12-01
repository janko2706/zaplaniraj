import { FunnelIcon } from "@heroicons/react/20/solid";
import React, {
  type MouseEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react";
import { CgSearch } from "react-icons/cg";
import Accordion from "~/Atoms/Accordion/Accordion";
import { HeroDropdown } from "~/Molecules/HeroSection/HeroDropdown/HeroDropdown";

type Props = {
  categories: {
    name: string;
    icon?: JSX.Element | undefined;
    onClick?: MouseEventHandler<HTMLLIElement> | undefined;
  }[];
  selectedCategory:
    | {
        name: string;
        icon?: JSX.Element | undefined;
        onClick?: MouseEventHandler<HTMLLIElement> | undefined;
      }
    | undefined;
  setSelectedCategory: Dispatch<
    SetStateAction<
      | {
          name: string;
          icon?: JSX.Element | undefined;
          onClick?: MouseEventHandler<HTMLLIElement> | undefined;
        }
      | undefined
    >
  >;
  filterName: string;
  setFilterName: (value: SetStateAction<string>) => void;
  placesForSelect: {
    name: string;
  }[];
  filterSelectedPlace:
    | {
        name: string;
      }
    | undefined;
  setFilterSelectedPlace: Dispatch<
    SetStateAction<
      | {
          name: string;
        }
      | undefined
    >
  >;
  filterPriceMin: number;
  setFilterPriceMin: (value: SetStateAction<number>) => void;
  filterPriceMax: number;
  setFilterPriceMax: (value: SetStateAction<number>) => void;
  OnFilterSearch: () => void;
  iconClasses: string;
  sortItems: {
    name: string;
    icon: JSX.Element;
    onClick: () => void;
  }[];
  selectedSort:
    | {
        name: string;
        onClick?: MouseEventHandler<HTMLLIElement> | undefined;
      }
    | undefined;
  setSelectedSort: Dispatch<
    SetStateAction<
      | {
          name: string;
          onClick?: MouseEventHandler<HTMLLIElement> | undefined;
        }
      | undefined
    >
  >;
  headerColor: string;
  headerTitle: string;
  headerFont: string;
};

const DiscoverHeader = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  filterName,
  setFilterName,
  placesForSelect,
  filterSelectedPlace,
  setFilterSelectedPlace,
  filterPriceMin,
  setFilterPriceMin,
  filterPriceMax,
  setFilterPriceMax,
  OnFilterSearch,
  iconClasses,
  sortItems,
  selectedSort,
  setSelectedSort,
  headerColor,
  headerFont,
  headerTitle,
}: Props) => {
  return (
    <div
      className={`fixed z-20 w-full rounded-b-lg ${headerColor} shadow-md  lg:max-h-[20vmin]`}
    >
      <h1
        className={`${headerFont} w-full pt-3 text-center text-6xl lg:pt-0 lg:text-8xl`}
      >
        {headerTitle}
      </h1>
      <div className="flex justify-center">
        <HeroDropdown
          options={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>

      <div
        className={`${headerColor} mx-4 flex flex-col items-center justify-between gap-5 rounded-xl py-5 md:flex-row lg:mx-0 lg:flex-row lg:justify-center lg:gap-52`}
      >
        <Accordion
          buttonContent={(open) => (
            <div>
              <FunnelIcon
                className={`h-5 w-full  transition-all duration-300 ease-in-out hover:text-primary ${
                  open ? "rotate-180" : ""
                }`}
              />
              Filteri
            </div>
          )}
          initialOpen={false}
        >
          <div className="flex flex-col justify-center gap-10 ">
            <input
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="mt-6 rounded-md bg-slate-200 px-2 py-1"
              placeholder="Pretrazi po nazivu..."
            />
            <div className="flex w-full justify-center">
              <HeroDropdown
                className="m-0"
                size={"full"}
                options={placesForSelect}
                selected={filterSelectedPlace}
                setSelected={setFilterSelectedPlace}
              />
            </div>
            <div className="flex items-center gap-2">
              <p>od</p>
              <input
                className=" rounded-md bg-slate-200 px-2 py-1"
                type="number"
                value={filterPriceMin}
                min={0}
                onChange={(e) =>
                  setFilterPriceMin(Number(e.target.value as unknown as number))
                }
              />
              <p>do</p>
              <input
                className=" rounded-md bg-slate-200 px-2 py-1"
                type="number"
                value={filterPriceMax}
                max={10000}
                onChange={(e) =>
                  setFilterPriceMax(Number(e.target.value as unknown as number))
                }
              />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
              onClick={OnFilterSearch}
            >
              <CgSearch className={iconClasses} />
              Pretrazi
            </button>
          </div>
        </Accordion>

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
  );
};

export default DiscoverHeader;
