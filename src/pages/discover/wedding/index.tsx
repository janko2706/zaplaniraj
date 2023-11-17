import {
  BuildingOfficeIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  CakeIcon,
} from "@heroicons/react/20/solid";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { FaBreadSlice, FaGuitar } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { HeroDropdown } from "~/Molecules/HeroSection/HeroDropdown/HeroDropdown";
import ListCard from "~/Molecules/ListCard/ListCard";
import Pagination from "~/Molecules/Pagination/Pagination";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";
import { LuFlower } from "react-icons/lu";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCompanyPost } from "~/Organisms/CompanySpecific/useCompanyPost";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";

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
  const navigate = useRouter();
  const { getPostsByCategory } = useCompanyPost();
  const { category } = navigate.query;

  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = getPostsByCategory.useQuery({
    categoryLabel: "Vjenčanja",
    businessTypeLabel: category as string,
    skip,
  });
  useEffect(() => {
    void (async () => await refetch())();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [category, skip, refetch]);

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
