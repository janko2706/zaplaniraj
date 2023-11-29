import { BuildingOfficeIcon, CakeIcon } from "@heroicons/react/20/solid";
import type { PlanProgress } from "@prisma/client";
import { format } from "date-fns";
import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { FaGuitar, FaBreadSlice } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import useMenu from "~/hooks/useMenu/useMenu";
import { api } from "~/utils/api";
import type { PostForUserPlan } from "~/utils/types";

type Props = {
  planId?: string;
};

function usePlan({ planId }: Props) {
  const colorsForBg = [
    "bg-white",
    "bg-yellow-100",
    "bg-orange-100",
    "bg-slate-200",
    "bg-red-200",
    "bg-blue-200",
  ];
  const iconClasses = "h-16 w-16";
  const [background, setBackground] = useState("bg-white");
  const [selectedColor, setSelectedColor] = useState(colorsForBg);
  const [calcBudget, setCalcBudget] = useState<number>(0);
  const [tasks, setTasks] = useState<
    {
      id: number;
      content: string;
      status: "COMPLETED" | "INPROGRESS";
      forWhat: string | undefined;
    }[]
  >([]);
  const { menus, userCompany } = useMenu();
  const { data: result, isLoading } = api.userPlans.getById.useQuery({
    planId: planId ?? "",
  });
  const { data: categories } = api.businessCategoryType.getAll.useQuery();

  const [data, setData] = useImmer<typeof result>(undefined);
  const [newResult, setNewResult] = useState<typeof result>(undefined);
  const [businessPosts, setBusinessPosts] = useState<PostForUserPlan[]>([]);
  const {
    mutateAsync: disconnectPostFromPlan,
    isLoading: isDisconnectPostLoading,
  } = api.userPlans.disconnectPlanWithPost.useMutation();
  const { mutateAsync: addTask } = api.userPlans.createUserTask.useMutation();
  const { mutateAsync: deleteTask } =
    api.userPlans.deleteUserTask.useMutation();
  const { mutateAsync: addBudgetItem } =
    api.userPlans.createUserBudgetItem.useMutation();
  const { mutateAsync: deleteBudgetItem } =
    api.userPlans.deleteUserBudgetItem.useMutation();
  const { mutateAsync: addDateItem } =
    api.userPlans.createUserDateItem.useMutation();
  const { mutateAsync: deleteDateItem } =
    api.userPlans.deleteUserDateItem.useMutation();

  const { mutateAsync: updatePlan, isLoading: isSavingFullPlanUpdate } =
    api.userPlans.updateUserPlan.useMutation({
      onSettled: () => {
        toast.success("Promjene spremljene");
      },
    });
  const onSubmitSave = async () => {
    if (!data) return;
    const newData = await updatePlan({
      planId: data.id,
      color: data.color,
      progress: data.progress,
      name: data.name,
      budget: data.budget,
      tasks: data.tasks.map((item) => {
        return {
          id: item.id,
          content: item.content as PlanProgress,
          status: item.status,
          forWhat: item.forWhat ?? { value: "string", id: 1, label: "string" },
          userPlanId: planId ?? "",
          BusinessTypeCategoryId: item.BusinessTypeCategoryId,
        };
      }),
      budgets: data.budgetItem,
      dates: data.dateItem,
    });
    setData(newData);
    setNewResult(newData);
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
  const onDeleteBudgetItem = async (planBudgetId: number) => {
    await deleteBudgetItem({
      planBudgetId,
    });
    setData((prev) => {
      if (!prev) return;
      prev.budgetItem = prev.budgetItem.filter((e) => e.id !== planBudgetId);
    });
  };
  const onCreateBudgetItem = async () => {
    if (!data) return;
    const newBudget = await addBudgetItem({
      planId: data?.id,
      budget: 0,
      title: "",
    });
    setData((prev) => {
      prev?.budgetItem.push(newBudget);
    });
  };
  const onDeleteDateItem = async (dateItemId: number) => {
    await deleteDateItem({
      dateItemId,
    });
    setData((prev) => {
      if (!prev) return;
      prev.dateItem = prev.dateItem.filter((e) => e.id !== dateItemId);
    });
  };
  const onCreateDateItem = async () => {
    if (!data) return;
    const newDate = await addDateItem({
      planId: data?.id,
      date: format(new Date(), "yyyy-MM-dd"),
      title: "",
    });
    setData((prev) => {
      prev?.dateItem.push(newDate);
    });
  };
  const onDisconnectBusiness = async (companyPostId: number) => {
    await disconnectPostFromPlan({
      planId: planId ?? "",
      companyPostId,
    });
    setData((prev) => {
      if (!prev) return;
      prev.businessesInPlan = prev.businessesInPlan.filter(
        (e) => e.id !== companyPostId
      );
    });
    toast.success("Plan promijenjen.");
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
  const onChangeTaskCompleted = (
    index: number,
    isCompleted: "COMPLETED" | "INPROGRESS"
  ) => {
    setData((prev) => {
      if (!prev) return;
      prev.tasks.map((item, idx) => {
        if (item.id === index) {
          const task = prev.tasks[idx];
          if (task) {
            task.status = isCompleted;
          }
        }
      });
    });
  };
  const onChangeBudgetItemPrice = (index: number, NewPrice: number) => {
    setData((prev) => {
      if (!prev) return;
      prev.budgetItem.map((item, idx) => {
        if (item.id === index) {
          const budgetItem = prev.budgetItem[idx];
          if (budgetItem) {
            budgetItem.price = NewPrice;
          }
        }
      });
    });
  };
  const onChangeBudgetItemTitle = (index: number, newTitle: string) => {
    setData((prev) => {
      if (!prev) return;
      prev.budgetItem.map((item, idx) => {
        if (item.id === index) {
          const budgetItem = prev.budgetItem[idx];
          if (budgetItem) {
            budgetItem.title = newTitle;
          }
        }
      });
    });
  };
  const onChangeDateItemDate = (index: number, newDate: string) => {
    setData((prev) => {
      if (!prev) return;
      prev.dateItem.map((item, idx) => {
        if (item.id === index) {
          const dateItem = prev.dateItem[idx];
          if (dateItem) {
            dateItem.date = newDate;
          }
        }
      });
    });
  };
  const onChangeDateItemTitle = (index: number, newTitle: string) => {
    setData((prev) => {
      if (!prev) return;
      prev.dateItem.map((item, idx) => {
        if (item.id === index) {
          const dateItem = prev.dateItem[idx];
          if (dateItem) {
            dateItem.title = newTitle;
          }
        }
      });
    });
  };
  const statusClasses =
    "h-full  cursor-pointer shadow shadow-xl  border rounded-xl hover:bg-slate-200 transition-all duration-500 ease-in-out bg-white bg-opacity-75";

  const statusChildClasses =
    "flex h-full w-full flex-col items-center justify-center  rounded text-slate-400  ";
  const statusClassesWithItems =
    "h-full shadow shadow-xl  border rounded-xl hover:bg-slate-200 transition-all duration-500 ease-in-out bg-white bg-opacity-50 items-start overflow-auto max-h-96 p-2";

  const statusChildClassesWithItems =
    "flex h-fit w-full flex-col items-center justify-start gap-2 pt-2  rounded text-slate-400";
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
  return {
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
  };
}

export default usePlan;
