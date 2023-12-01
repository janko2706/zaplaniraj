import { RadioGroup } from "@headlessui/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import isEqual from "lodash/isEqual";
import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import ListCardSimple from "~/Molecules/ListCardSimple/ListCardSimple";
import Dnd from "~/Organisms/DnD/Dnd";
import MainTemplate from "~/Templates/MainTemplate";
import classNames from "~/utils/classNames";
import {
  getCategoryTranslation,
  getEventTypeTranslation,
} from "~/utils/translationHelpers";
import { format } from "date-fns";
import usePlan from "./usePlan";

const colorsForBg = [
  "bg-white",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-slate-200",
  "bg-red-200",
  "bg-blue-200",
];

const Index = () => {
  const { query, events, replace } = useRouter();
  const {
    background,
    selectedColor,
    setSelectedColor,
    tasks,
    menus,
    userCompany,
    isLoading,
    businessPosts,
    isDisconnectPostLoading,
    isSavingFullPlanUpdate,
    onSubmitSave,
    onDeleteTask,
    onDeleteBudgetItem,
    onCreateBudgetItem,
    onDisconnectBusiness,
    onCreateTask,
    onChangeTask,
    statusClasses,
    statusChildClasses,
    statusClassesWithItems,
    statusChildClassesWithItems,
    plannerGridObjectArray,
    setBackground,
    setTasks,
    setBusinessPosts,
    data,
    setData,
    result,
    categories,
    onDeleteDateItem,
    onCreateDateItem,
    onChangeBudgetItemPrice,
    onChangeBudgetItemTitle,
    onChangeDateItemDate,
    onChangeDateItemTitle,
    onChangeTaskCompleted,
    calcBudget,
    setCalcBudget,
    newResult,
    setNewResult,
  } = usePlan({ planId: query.id as string });
  useEffect(() => {
    setData(result);
    setNewResult(result);
  }, [result, setData, setNewResult]);
  const warningText = "Sve nespremljene promjene ce biti odbacene!";
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isEqual(newResult, data)) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (isEqual(newResult, data)) return;
      if (window.confirm(warningText)) return;
      events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      events.off("routeChangeStart", handleBrowseAway);
    };
  }, [data, events, newResult]);

  useEffect(() => {
    setTasks(
      data?.tasks.map((item) => {
        return {
          id: item.id,
          content: item.content,
          status: item.status,
          forWhat: item.forWhat?.value,
        };
      }) ?? []
    );
    let budget = 0;
    data?.budgetItem.forEach((item) => (budget = budget + item.price));
    setCalcBudget(budget);
    setBusinessPosts(data?.businessesInPlan ?? []);
    setBackground(data?.color ?? "bg-white");
  }, [data, setTasks, setBackground, setBusinessPosts, setCalcBudget]);

  return (
    <>
      <Head>
        <title>Moj plan</title>
      </Head>
      <main>
        <MainTemplate menus={menus} userCompany={userCompany}>
          <div className={`${background} transition-all duration-500 ease-in`}>
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
                          <h3 className="text-slate-500">
                            {getCategoryTranslation(item.arraySearchValue)}
                          </h3>

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
                                    await onDisconnectBusiness(item.id);
                                  },
                                };
                                return (
                                  <div
                                    key={index}
                                    className=" my-1 flex w-full justify-center"
                                  >
                                    {!isDisconnectPostLoading ? (
                                      <ListCardSimple item={newItem} />
                                    ) : (
                                      <LoadingSpinner
                                        spinnerHeight="h-5"
                                        spinnerWidth="w-5"
                                      />
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      ) : (
                        <div
                          role="status"
                          className={statusClasses}
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          onClick={async () => {
                            await replace(
                              `/discover/${getEventTypeTranslation(
                                data?.category
                              )}?category=${getCategoryTranslation(
                                item.arraySearchValue
                              )}`
                            );
                          }}
                        >
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
              {/* TODOS */}
              <div className="mx-auto max-w-2xl  px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="h-full lg:col-span-2 lg:row-span-3 lg:border-r lg:border-gray-200">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {data?.name ?? ""} - TODOs
                  </h1>
                  <div className="h-full overflow-y-scroll p-3 transition-shadow duration-300 ease-in-out hover:shadow-md">
                    {categories?.map((cat, idx) => {
                      return (data?.businessesInPlan ?? []).filter(
                        (e) => e.business?.typeOfBusiness.value === cat.value
                      ).length ? (
                        <Dnd
                          onChangeTask={onChangeTask}
                          onChangeTaskCompleted={onChangeTaskCompleted}
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
                  <div className="flex w-full items-center gap-4  text-xl tracking-tight text-gray-900">
                    <p>
                      Potrebno:{" "}
                      <span className="text-2xl">
                        {calcBudget.toLocaleString("en-US")}
                      </span>{" "}
                      €{" "}
                    </p>
                    <p>od{"  "}</p>
                    <div className="w-fit ">
                      <input
                        className="max-w-[5em] rounded-md bg-black bg-opacity-10 px-2 text-2xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        defaultValue={data?.budget}
                        onChange={(e) =>
                          setData((prev) => {
                            if (!prev) return;
                            prev.budget = Number(
                              e.target.value as unknown as number
                            );
                          })
                        }
                      />
                      €
                    </div>
                  </div>

                  {/* Budgets */}
                  <div className="mt-6">
                    <h3 className="sr-only">Budgets</h3>
                    <h3 className="text-sm font-medium text-gray-900">
                      Potrebna placanja
                    </h3>
                    <hr />
                    <div className="mt-4 flex items-center ">
                      <div className="flex flex-col gap-2">
                        {data?.budgetItem.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex w-fit items-center justify-center gap-2"
                            >
                              <input
                                className="w-full rounded-md bg-black bg-opacity-10 px-2"
                                value={item.title}
                                type="text"
                                onChange={(e) =>
                                  onChangeBudgetItemTitle(
                                    item.id,
                                    e.target.value
                                  )
                                }
                                placeholder="Naziv..."
                              />
                              -
                              <input
                                className="w-full rounded-md bg-black bg-opacity-10 px-2"
                                value={item.price}
                                type="number"
                                onChange={(e) =>
                                  onChangeBudgetItemPrice(
                                    item.id,
                                    Number(e.target.value as unknown as number)
                                  )
                                }
                              />
                              <button
                                type="button"
                                className="w-full text-slate-400 transition-all duration-300 ease-in-out hover:text-red-400"
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={async () =>
                                  await onDeleteBudgetItem(item.id)
                                }
                              >
                                <TrashIcon className="h-5 w-5 " />
                              </button>
                            </div>
                          );
                        })}
                        <>
                          <button
                            type="button"
                            className="btn-outline-gray-small mt-3 w-fit"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async () => {
                              await onCreateBudgetItem();
                            }}
                          >
                            <PlusIcon className="h-4 w-4" /> Novo placanje
                          </button>
                        </>
                      </div>
                    </div>
                  </div>
                  {/* Date */}
                  <div className="mt-6">
                    <h3 className="sr-only">Dates</h3>
                    <h3 className="text-sm font-medium text-gray-900">
                      Datumi
                    </h3>
                    <hr />
                    <div className="mt-4 flex items-center ">
                      <div className="flex flex-col gap-2">
                        {data?.dateItem.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex w-fit items-center justify-center gap-2"
                            >
                              <input
                                className="w-full rounded-md bg-black bg-opacity-10 px-2"
                                value={item.title}
                                onChange={(e) =>
                                  onChangeDateItemTitle(item.id, e.target.value)
                                }
                                type="text"
                                placeholder="Naziv..."
                              />
                              -
                              <input
                                className="w-full rounded-md bg-black bg-opacity-10 px-2"
                                value={item.date}
                                onChange={(e) => {
                                  if (e.target.value !== "") {
                                    onChangeDateItemDate(
                                      item.id,
                                      format(
                                        new Date(e.target.value),
                                        "yyyy-MM-dd"
                                      )
                                    );
                                  }
                                }}
                                type="date"
                              />
                              <button
                                type="button"
                                className="w-full text-slate-400 transition-all duration-300 ease-in-out hover:text-red-400"
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={async () =>
                                  await onDeleteDateItem(item.id)
                                }
                              >
                                <TrashIcon className="h-5 w-5 " />
                              </button>
                            </div>
                          );
                        })}
                        <>
                          <button
                            type="button"
                            className="btn-outline-gray-small mt-3 w-fit"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async () => {
                              await onCreateDateItem();
                            }}
                          >
                            <PlusIcon className="h-4 w-4" /> Novi datum
                          </button>
                        </>
                      </div>
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
                      disabled={
                        isEqual(newResult, data) || isSavingFullPlanUpdate
                      }
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
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
                    <button
                      type="button"
                      onClick={() =>
                        setData((prev) => {
                          if (!prev) return;
                          prev.progress =
                            prev.progress === "COMPLETED"
                              ? "INPROGRESS"
                              : "COMPLETED";
                        })
                      }
                      className="mt-10 flex w-full items-center justify-center rounded-md  bg-red-500 px-6 py-2 text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                    >
                      {data?.progress === "COMPLETED"
                        ? "Plan je jos u tijeku"
                        : "Premjesti plan u zavrseno"}
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
