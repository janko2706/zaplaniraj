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
      className={`fixed z-20 w-screen rounded-b-lg ${headerColor} shadow-md  lg:max-h-[100%]`}
    >
      <h1
        className={`${headerFont} hidden w-full pt-3 text-center text-5xl  md:block md:text-8xl lg:block lg:pb-3 lg:pt-1 lg:text-8xl`}
      >
        {headerTitle}
      </h1>
      <div className="mx-10 flex justify-center pt-5 lg:mx-0 lg:pt-0">
        <HeroDropdown
          options={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>

      <div
        className={`${headerColor} mx-4 flex flex-col items-center justify-between gap-4 rounded-xl py-5 lg:mx-0 lg:flex-row lg:justify-center lg:gap-52`}
      >
        <div className="hidden w-fit lg:block">
          <HeroDropdown
            size={"small"}
            options={sortItems}
            selected={selectedSort}
            setSelected={setSelectedSort}
          />
        </div>
        <Accordion
          buttonContent={(open) => (
            <div className="text-base">
              <FunnelIcon
                className={`h-4 w-full transition-all  duration-300 ease-in-out hover:text-primary lg:h-5 ${
                  open ? "rotate-180" : ""
                }`}
              />
              Filteri
            </div>
          )}
          initialOpen={false}
        >
          <div className="flex max-w-xs flex-col items-center justify-center gap-10 lg:max-w-lg">
            <div className="flex w-full justify-center lg:hidden">
              <HeroDropdown
                size={"small"}
                options={sortItems}
                selected={selectedSort}
                setSelected={setSelectedSort}
              />
            </div>
            <input
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="mt-6 w-full rounded-md bg-slate-200 px-2 py-1 placeholder:text-slate-600"
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
            <div className="flex max-w-xs items-center gap-2">
              <p>od</p>
              <input
                className="w-full rounded-md bg-slate-200 px-2 py-1"
                type="number"
                value={filterPriceMin}
                min={0}
                onChange={(e) =>
                  setFilterPriceMin(Number(e.target.value as unknown as number))
                }
              />
              <p>do</p>
              <input
                className="w-full rounded-md bg-slate-200 px-2 py-1"
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
      </div>
    </div>
  );
};

export default DiscoverHeader;
