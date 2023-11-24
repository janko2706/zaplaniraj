import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainTemplate from "~/Templates/MainTemplate";
import React, { useEffect, useState } from "react";
import {
  BuildingOfficeIcon,
  CakeIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import classNames from "~/utils/classNames";
import useMenu from "~/hooks/useMenu/useMenu";
import Head from "next/head";
import Dnd from "~/Organisms/DnD/Dnd";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { AiFillCar } from "react-icons/ai";
import { FaGuitar, FaBreadSlice } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";
import ListCardSimple from "~/Molecules/ListCardSimple/ListCardSimple";
import type { PostForUserPlan } from "~/utils/types";

const ColorsForPlans = [
  { name: "White", className: "bg-white", selectedClass: "ring-slate-500" },
  {
    name: "Yellow",
    className: "bg-yellow-100",
    selectedClass: "ring-slate-500",
  },
  {
    name: "Orange",
    className: "bg-orange-100",
    selectedClass: "ring-slate-500",
  },
  { name: "Slate", className: "bg-slate-200", selectedClass: "ring-slate-500" },
  { name: "Red", className: "bg-red-200", selectedClass: "ring-slate-500" },
  { name: "Blue", className: "bg-blue-200", selectedClass: "ring-slate-500" },
];

const product = {
  name: "My wedding",
  price: "$192",
  href: "#",

  colors: [
    { name: "White", className: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", className: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", className: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
};

const Index = () => {
  const iconClasses = "h-16 w-16";

  const { query } = useRouter();
  const [background, setBackground] = useState("bg-white");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [tasks, setTasks] = useState<
    { id: number; content: string; isCompleted: boolean }[]
  >([]);
  const { menus, userCompany } = useMenu();
  const { data, isLoading } = api.userPlans.getById.useQuery({
    planId: (query.id as string) ?? "",
  });
  const [businessPosts, setBusinessPosts] = useState<PostForUserPlan[]>([]);
  const { mutateAsync: disconnectPostFromPlan } =
    api.userPlans.disconnectPlanWithPost.useMutation();

  useEffect(() => {
    setTasks(
      data?.tasks.map((item) => {
        return {
          id: item.id,
          content: item.content,
          isCompleted: item.status === "COMPLETED" ? true : false,
        };
      }) ?? []
    );
    setBusinessPosts(data?.businessesInPlan ?? []);
    console.log(data?.businessesInPlan);
  }, [data]);
  const statusClasses =
    "h-full  cursor-pointer shadow shadow-xl  border rounded-xl hover:bg-slate-200 transition-all duration-500 ease-in-out bg-white bg-opacity-75";

  const statusChildClasses =
    "flex h-full w-full flex-col items-center justify-center  rounded text-slate-400  ";
  const statusClassesWithItems =
    "h-full shadow shadow-xl  border rounded-xl hover:bg-slate-200 transition-all duration-500 ease-in-out bg-white bg-opacity-50 items-start overflow-scroll max-h-96";

  const statusChildClassesWithItems =
    "flex h-full w-full flex-col items-center justify-center  rounded text-slate-400  ";

  return (
    <>
      <Head>
        <title>Moj plan</title>
      </Head>
      <main>
        <MainTemplate menus={menus} userCompany={userCompany}>
          <div className={`${background} transition-all duration-500 ease-in`}>
            {/* TODO UPGRADE SECTION FOR THIS PAGE:*UPDATED FROM WEDDING DISCOVERY* */}
            {/* <div className="fixed z-20 w-full rounded-lg bg-primaryLight shadow-md  lg:max-h-[20vmin]">
              <h1 className="w-full text-center font-Alex-Brush text-6xl lg:text-8xl">
                Vase {data?.category.toLocaleLowerCase()}
              </h1>
            </div> */}
            <div className="pt-6">
              {/* Business gallery */}
              <div className="mx-2 grid grid-cols-2 grid-rows-5 gap-4 lg:grid-cols-3 lg:grid-rows-4">
                <div className="col-start-2 row-span-3 row-start-2 lg:col-start-auto lg:row-span-3 lg:row-start-auto">
                  {businessPosts.filter(
                    (e) => e.business?.typeOfBusiness.value === "Venue"
                  ).length ? (
                    <div role="status" className={statusClassesWithItems}>
                      <div className={statusChildClassesWithItems}>
                        {data?.businessesInPlan
                          .filter(
                            (e) => e.business?.typeOfBusiness.value === "Venue"
                          )
                          .map((item, index) => {
                            const newItem = {
                              id: item.id,
                              title: item.title,
                              icon: (
                                <BuildingOfficeIcon
                                  className={"hidden h-7 w-7 lg:block"}
                                />
                              ),

                              handleDelete: async () => {
                                await disconnectPostFromPlan({
                                  planId: query.id as string,
                                  companyPostId: item.id,
                                });
                              },
                            };
                            return (
                              <div
                                key={index}
                                className=" my-1 flex w-full items-center"
                              >
                                <ListCardSimple item={newItem} />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div role="status" className={statusClasses}>
                      <div className={statusChildClasses}>
                        <BuildingOfficeIcon className={iconClasses} />
                        <p>Dodaj prostore u projekt</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="row-start-4 lg:row-start-auto">
                  <div role="status" className={statusClasses}>
                    <div className={statusChildClasses}>
                      <CakeIcon className={iconClasses} />
                      <p>Dodaj prostore u projekt</p>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 row-start-2 lg:col-start-auto lg:row-span-2">
                  <div role="status" className={statusClasses}>
                    <div className={statusChildClasses}>
                      <LuFlower className={iconClasses} />
                      <p>Dodaj prostore u projekt</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 row-start-5 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-3">
                  <div role="status" className={statusClasses}>
                    <div className={statusChildClasses}>
                      <FaGuitar className={iconClasses} />
                      <p>Dodaj prostore u projekt</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-2">
                  {businessPosts.filter(
                    (e) => e.business?.typeOfBusiness.value === "Catering"
                  ).length ? (
                    <div role="status" className={statusClassesWithItems}>
                      <div className={statusChildClassesWithItems}>
                        {data?.businessesInPlan
                          .filter(
                            (e) =>
                              e.business?.typeOfBusiness.value === "Catering"
                          )
                          .map((item, index) => {
                            const newItem = {
                              id: item.id,
                              title: item.title,
                              icon: (
                                <FaBreadSlice
                                  className={"hidden h-7 w-7 lg:block"}
                                />
                              ),

                              handleDelete: async () => {
                                await disconnectPostFromPlan({
                                  planId: query.id as string,
                                  companyPostId: item.id,
                                });
                              },
                            };
                            return (
                              <div
                                key={index}
                                className=" my-1 flex w-full items-center"
                              >
                                <ListCardSimple item={newItem} />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div role="status" className={statusClasses}>
                      <div className={statusChildClasses}>
                        <FaBreadSlice className={iconClasses} />
                        <p>Dodaj katering u projekt</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-start-1 row-start-3 lg:col-start-1 lg:row-span-1 lg:row-start-4">
                  <div role="status" className={statusClasses}>
                    <div className={statusChildClasses}>
                      <AiFillCar className={iconClasses} />
                      <p>Dodaj prostore u projekt</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {data?.name}
                  </h1>

                  <Dnd isLoading={isLoading} tasks={tasks} />
                </div>

                {/* Details */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Plan information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {data?.budget} €
                  </p>

                  {/* Date */}
                  <div className="mt-6">
                    <h3 className="sr-only">Dates</h3>
                    <h3 className="text-sm font-medium text-gray-900">
                      Datumi
                    </h3>
                    <hr />
                    <div className="mt-4 flex items-center ">
                      {data?.eventDate ? (
                        <p>IS HERE</p>
                      ) : (
                        <div>
                          <button
                            type="button"
                            className=" btn-outline-gray-small"
                          >
                            <PlusIcon className="h-4 w-4" /> Novi datum
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Boja
                      </h3>
                      <hr />
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a color
                        </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {ColorsForPlans.map((color) => (
                            <RadioGroup.Option
                              key={color.name}
                              value={color}
                              className={({ active, checked }) => {
                                if (checked) {
                                  setBackground(color.className);
                                  console.log(background);
                                }
                                return classNames(
                                  color.selectedClass,
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                );
                              }}
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.className,
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Spremi promjene
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </MainTemplate>
      </main>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common"])),
  },
});

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          id: "id",
        },
        locale: "hr",
      },
      {
        params: {
          id: "id",
        },
        locale: "en-US",
      },
      {
        params: {
          id: "id",
        },
        locale: "de-DE",
      },
    ],
    fallback: true,
  };
};
