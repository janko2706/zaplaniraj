import {
  AdjustmentsHorizontalIcon,
  BuildingOfficeIcon,
  CakeIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import { FaBreadSlice, FaGuitar } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";
import Accordion from "~/Atoms/Accordion/Accordion";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import RangeSliderComponent from "~/Atoms/RangeSlider/RangeSlider";
import { HeroDropdown } from "~/Molecules/HeroSection/HeroDropdown/HeroDropdown";
import ListCard from "~/Molecules/ListCard/ListCard";
import Pagination from "~/Molecules/Pagination/Pagination";
import { useCompanyPost } from "~/Organisms/CompanySpecific/useCompanyPost";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";
import { getCategoryTranslationBackToEnglish } from "~/utils/translationHelpers";

const iconClasses = "h-5 w-5";

const weddingCategories: {
  name: string;
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}[] = [
  {
    name: "Prostori",
    icon: <BuildingOfficeIcon className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Torte",
    icon: <CakeIcon className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Cvijece",
    icon: <LuFlower className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Muzika",
    icon: <FaGuitar className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Katering",
    icon: <FaBreadSlice className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
  {
    name: "Transport",
    icon: <AiFillCar className={iconClasses} />,
    onClick: (e) => console.log(e),
  },
];

const sortItems = [
  {
    name: "Popularno",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Od najvise cijene",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Od najnize cijene",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Najnovije",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
  {
    name: "Najstarije",
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  },
];

function Index() {
  const navigate = useRouter();
  const { getPostsByCategory } = useCompanyPost();
  const { category } = navigate.query;
  const placesForSelect = [{ name: "Zagreb" }, { name: "Okolica Zagreba" }];
  const [filterSelectedPlace, setFilterSelectedPlace] = useState(
    placesForSelect[0]
  );
  const [filterName, setFilterName] = useState<string>("");
  const [skip, setSkip] = useState(0);
  const [filterPrice, setFilterPrice] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<
    | {
        name: string;
        icon?: JSX.Element;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(weddingCategories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  //  filterPriceMin: z.number().optional(),
  // filterPriceMax: z.number().optional(),
  // sortPrice: z.enum(sortOpts).optional(),
  // sortNew: z.enum(sortOpts).optional(),
  // sortPopular: z.enum(sortOpts).optional(),
  // filterTitle: z.string().optional(),
  const { data, refetch, isLoading } = getPostsByCategory.useQuery({
    categoryLabel: "Vjenčanja",
    businessTypeLabel:
      getCategoryTranslationBackToEnglish(selectedCategory?.name ?? "") ??
      "Venue",
    skip,
    filterPriceMax: 100000,
    filterPriceMin: 0,
    sortPrice: "asc",
    sortNew: "asc",
    sortPopular: "desc",
    filterTitle: "",
  });
  useEffect(() => {
    void (async () => await refetch())();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [category, skip, refetch]);
  useEffect(() => {
    setSelectedCategory(
      weddingCategories.find(
        (i) => i.name === ((category as string) ?? "Prostori")
      )
    );
  }, [category]);

  const [posts, setPosts] = useState<
    | {
        id: number;
        title: string;
        address: string;
        priceRange: (number | null)[];
        type: string;
        img?: string | null;
      }[]
    | undefined
  >([]);
  useEffect(() => {
    if (!data) return;
    setPosts(
      data.map((item) => {
        const imageArray =
          item.pictures !== undefined && item.pictures !== null
            ? item.pictures.split(",")
            : "";
        return {
          id: item.id,
          title: item.title,
          type: item.serviceDescription ?? "",
          address: item.location ?? "",
          priceRange: [item.priceRangeMin, item.priceRangeMax],
          img: imageArray ? imageArray[0] : "",
        };
      })
    );
  }, [data]);

  const [selectedSort, setSelectedSort] = useState<
    | {
        name: string;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(sortItems[0]);
  const { menus, userCompany } = useMenu();
  return (
    <MainTemplate
      bgColorDesktop="bg-primaryLight"
      menus={menus}
      userCompany={userCompany}
    >
      <>
        <div className="fixed z-20 w-full rounded-lg bg-primaryLight shadow-md  lg:max-h-[20vmin]">
          <h1 className="w-full text-center font-Alex-Brush text-6xl lg:text-8xl">
            Vjencanja
          </h1>
          <div className="flex justify-center">
            <HeroDropdown
              options={weddingCategories}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>

          <div className="mx-4 flex items-center justify-between rounded-xl bg-primaryLight py-5 lg:mx-0 lg:justify-center lg:gap-52">
            {/* TODO: USE ACCORDION FOR FILTER DROPDOWN */}
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
                <RangeSliderComponent
                  value={filterPrice}
                  handleChange={(e) => setFilterPrice(e)}
                  min={0}
                  max={10000}
                />
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
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

        <div className="discover-padding container">
          {!isLoading ? (
            <>
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
                {!posts ? (
                  <></>
                ) : (
                  posts.map((item, index) => (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        void (async () => {
                          await navigate.replace(`/post/${item.id}/details`);
                        })();
                      }}
                    >
                      <ListCard item={item} key={item.id} />
                    </motion.li>
                  ))
                )}
              </motion.ul>
              <Pagination
                onClickLeft={() => {
                  if (currentPage === 1) return;
                  setSkip((prev) => prev - 10);
                  setCurrentPage((prev) => prev - 1);
                }}
                onClickRight={() => {
                  setSkip((prev) => prev + 10);
                  setCurrentPage((prev) => prev + 1);
                }}
                count={posts?.length ?? 1}
                currentPage={currentPage}
                onClickPage={(p) => {
                  if (currentPage !== p) {
                    setSkip(10 * (p - 1));
                    setCurrentPage(p);
                  }
                }}
              />
            </>
          ) : (
            <div className="my-10 flex w-full justify-center">
              <LoadingSpinner spinnerHeight="h-20" spinnerWidth="w-20" />
            </div>
          )}
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
