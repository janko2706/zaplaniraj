import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainTemplate from "~/Templates/MainTemplate";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
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
import isEqual from "lodash/isEqual";
import { getCategoryTranslation } from "~/utils/translationHelpers";
import { toast } from "react-toastify";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";

const colorsForBg = [
  "bg-white",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-slate-200",
  "bg-red-200",
  "bg-blue-200",
];

const Index = () => {
  const iconClasses = "h-16 w-16";
  const { query } = useRouter();
  const [background, setBackground] = useState("bg-white");
  const [selectedColor, setSelectedColor] = useState(colorsForBg);
  const [tasks, setTasks] = useState<
    {
      id: number;
      content: string;
      isCompleted: boolean;
      forWhat: string | undefined;
    }[]
  >([]);
  const { menus, userCompany } = useMenu();
  const { data: result, isLoading } = api.userPlans.getById.useQuery({
    planId: (query.id as string) ?? "",
  });
  const { data: categories } = api.businessCategoryType.getAll.useQuery();

  const [data, setData] = useImmer<typeof result>(undefined);
  const [businessPosts, setBusinessPosts] = useState<PostForUserPlan[]>([]);
  const { mutateAsync: disconnectPostFromPlan } =
    api.userPlans.disconnectPlanWithPost.useMutation();
  const { mutateAsync: addTask } = api.userPlans.createUserTask.useMutation();
  const { mutateAsync: deleteTask } =
    api.userPlans.deleteUserTask.useMutation();
  const { mutateAsync: updatePlan, isLoading: isSavingFullPlanUpdate } =
    api.userPlans.updateUserPlan.useMutation({
      onSuccess: () => {
        toast.success("Promjene premljene");
      },
    });

  const onSubmitSave = async () => {
    if (!data) return;
    await updatePlan({
      planId: data.id,
      color: data.color,
      progress: data.progress,
      name: data.name,
      budget: data.budget,
      tasks: data.tasks,
    });
  };
  const onDeleteTask = async (taskId: number) => {
    await deleteTask({
      taskId,
    });
    setData((prev) => {
      if (!prev) return;
      prev.tasks = prev.tasks.filter((e) => e.id !== taskId);
    });
  };

  const onCreateTask = async (categoryId: number) => {
    const category = categories?.filter((e) => e.id === categoryId)[0];
    if (!data) return;
    if (!category) return;

    const newTask = await addTask({
      content: "",
      forWhat: categoryId,
      planId: data.id,
    });
    setData((prev) => {
      if (!prev) return;
      const newArray = [...(prev?.tasks ?? [])];
      newArray.push({
        content: "",
        forWhat: category,
        userPlanId: data.id,
        id: newTask.id,
        status: "INPROGRESS",
        BusinessTypeCategoryId: categoryId,
      });
      prev.tasks = [...newArray];
    });
  };
  const onChangeTask = (index: number, newContent: string) => {
    setData((prev) => {
      if (!prev) return;
      prev.tasks.map((item, idx) => {
        if (item.id === index) {
          const task = prev.tasks[idx];
          if (task) {
            task.content = newContent;
          }
        }
      });
    });
  };
  useEffect(() => {
    setData(result);
  }, [result, setData]);

  useEffect(() => {
    setTasks(
      data?.tasks.map((item) => {
        return {
          id: item.id,
          content: item.content,
          isCompleted: item.status === "COMPLETED" ? true : false,
          forWhat: item.forWhat?.value,
        };
      }) ?? []
    );
    setBusinessPosts(data?.businessesInPlan ?? []);
    setBackground(data?.color ?? "bg-white");
  }, [data]);
  const statusClasses =
    "h-full  cursor-pointer shadow shadow-xl  border rounded-xl hover:bg-slate-200 transition-all duration-500 ease-in-out bg-white bg-opacity-75";

  const statusChildClasses =
    "flex h-full w-full flex-col items-center justify-center  rounded text-slate-400  ";
  const statusClassesWithItems =
    "h-full shadow shadow-xl  border rounded-xl hover:bg-slate-200 transition-all duration-500 ease-in-out bg-white bg-opacity-50 items-start overflow-auto max-h-96 p-2";

  const statusChildClassesWithItems =
    "flex h-full w-full flex-col items-center justify-center  rounded text-slate-400  ";
  const plannerGridObjectArray = [
    {
      icon: <BuildingOfficeIcon className={iconClasses} />,
      noContentText: "Dodaj prostore u projekt",
      arraySearchValue: "Venue",
      gridClasses:
        "col-start-2 row-span-3 row-start-2 lg:col-start-auto lg:row-span-3 lg:row-start-auto",
    },
    {
      icon: <CakeIcon className={iconClasses} />,
      noContentText: "Dodaj slasticarne u projekt",
      arraySearchValue: "Cakes",
      gridClasses: "row-start-4 lg:row-start-auto",
    },
    {
      icon: <LuFlower className={iconClasses} />,
      noContentText: "Dodaj cvjecarne u projekt",
      arraySearchValue: "Flowers",
      gridClasses: "col-start-1 row-start-2 lg:col-start-auto lg:row-span-2",
    },
    {
      icon: <FaGuitar className={iconClasses} />,
      noContentText: "Dodaj zabavu u projekt",
      arraySearchValue: "Music",
      gridClasses:
        "col-span-2 row-start-5 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-3",
    },
    {
      icon: <FaBreadSlice className={iconClasses} />,
      noContentText: "Dodaj katering u projekt",
      arraySearchValue: "Catering",
      gridClasses:
        "col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-2",
    },
    {
      icon: <AiFillCar className={iconClasses} />,
      noContentText: "Dodaj prijevoz u projekt",
      arraySearchValue: "Transport",
      gridClasses:
        "col-start-1 row-start-3 lg:col-start-1 lg:row-span-1 lg:row-start-4",
    },
  ];

  return (
    <>
      <Head>
        <title>Moj plan</title>
      </Head>
      <main>
        <MainTemplate menus={menus} userCompany={userCompany}>
          <div className={`${background} transition-all duration-500 ease-in`}>
            {/* TODO UPGRADE SECTION FOR THIS PAGE:*COPIED FROM WEDDING DISCOVERY* */}
            {/* <div className=" z-20 w-full rounded-lg bg-primaryLight shadow-md  lg:max-h-[20vmin]">
              <h1 className="w-full text-center font-Alex-Brush text-6xl ">
                {data?.name}
              </h1>
            </div> */}
            <div className="pt-4">
              {/* Business gallery */}
              <div className="mx-2 grid grid-cols-2 grid-rows-5 gap-4 lg:grid-cols-3 lg:grid-rows-4">
                {plannerGridObjectArray.map((item, idx) => {
                  return (
                    <div key={idx} className={item.gridClasses}>
                      {businessPosts.filter(
                        (e) =>
                          e.business?.typeOfBusiness.value ===
                          item.arraySearchValue
                      ).length ? (
                        <div role="status" className={statusClassesWithItems}>
                          <div className={statusChildClassesWithItems}>
                            {data?.businessesInPlan
                              .filter(
                                (e) =>
                                  e.business?.typeOfBusiness.value ===
                                  item.arraySearchValue
                              )
                              .map((item, index) => {
                                const newItem = {
                                  id: item.id,
                                  title: item.title,

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
                                    className=" my-1 flex w-full "
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
                            {item.icon}
                            <p>{item.noContentText}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Product info */}
              <div className="mx-auto max-w-2xl  px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="h-full lg:col-span-2 lg:row-span-3 lg:border-r lg:border-gray-200">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {data?.category[0]
                      ? data?.category[0] +
                        data?.category.slice(1).toLocaleLowerCase()
                      : ""}{" "}
                    - TODOs
                  </h1>
                  <div className="h-full overflow-y-scroll p-3 transition-shadow duration-300 ease-in-out hover:shadow-md">
                    {categories?.map((cat, idx) => {
                      return (data?.businessesInPlan ?? []).filter(
                        (e) => e.business?.typeOfBusiness.value === cat.value
                      ).length ? (
                        <Dnd
                          onChangeTask={onChangeTask}
                          key={idx}
                          onDelete={onDeleteTask}
                          onCreate={async () => await onCreateTask(cat.id)}
                          title={getCategoryTranslation(cat.value)}
                          isLoading={isLoading}
                          tasks={tasks.filter((e) => e.forWhat === cat.value)}
                        />
                      ) : (
                        void 0
                      );
                    })}
                  </div>
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

                  <form
                    className="mt-10"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await onSubmitSave();
                    }}
                  >
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
                          {colorsForBg.map((color, idx) => (
                            <RadioGroup.Option
                              key={idx}
                              value={color}
                              className={({ active, checked }) => {
                                if (checked) {
                                  setBackground(color);
                                  setData((prev) => {
                                    if (!prev) return;
                                    prev.color = color;
                                  });
                                }
                                return classNames(
                                  "ring-slate-400",
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                );
                              }}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color,
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
                      disabled={isEqual(result, data) || isSavingFullPlanUpdate}
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
                    >
                      {isSavingFullPlanUpdate ? (
                        <LoadingSpinner
                          spinnerHeight="h-7"
                          spinnerWidth="w-7"
                        />
                      ) : (
                        "Spremi promjene"
                      )}
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
