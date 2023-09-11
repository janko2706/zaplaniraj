import React, { useState } from "react";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

function MyPlans() {
  const [selectedCategoryPlans, setSelectedCategoryPlans] =
    useState<string>("Wedding");
  // const iconClasses = "lg:h-20 lg:w-20 h-14 w-14  self-center text-primary ";
  const iconClasses = "h-7  w-7 ";
  const categories: {
    name: string;
    color: string;
    icon: JSX.Element;
    date: Date;
  }[] = [
    {
      name: "My wedding",
      color: "bg-slate-200",
      icon: <CgRing className={`${iconClasses}`} />,
      date: new Date("2024/01/01"),
    },
    // {
    //   name: "Rodendan Matija",
    //   color: "bg-blue-200",
    //   icon: <FaBirthdayCake className={`${iconClasses}`} />,
    //   date: new Date(2024, 12, 1),
    // },
    // {
    //   name: "Krizma John",
    //   color: "bg-orange-200",
    //   icon: <FaChurch className={`${iconClasses}`} />,
    //   date: new Date(2024, 12, 1),
    // },
    // {
    //   name: "Party Party!!",
    //   color: "bg-purple-200",
    //   icon: <LuPartyPopper className={`${iconClasses}`} />,
    //   date: new Date(2024, 12, 1),
    // },
  ];

  const chooseList = (selectedCategoryPlans: string) => {
    const people = [
      {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
      },
      {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
      },
      {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
      },
    ];
    const people2 = [
      {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
      },
      {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
      },
    ];
    const people3 = [
      {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
      },
    ];

    switch (selectedCategoryPlans) {
      case "Vjencanja":
        return people;
      case "Rodendani":
        return people2;
      case "Sakramenti":
        return people3;
      case "Slavlja":
        return people2;

      default:
        return people;
    }
  };
  return (
    <section className="mx-5 my-10 h-full w-full  ">
      <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5  ">
        {categories.map((item, idx) => {
          return (
            <Card
              key={idx}
              name={item.name}
              icon={item.icon}
              color={item.color}
              setSelectedCategoryPlans={setSelectedCategoryPlans}
              date={item.date}
            />
          );
        })}
      </div>
      {/* <PlanList people={chooseList(selectedCategoryPlans)} /> */}
    </section>
  );
}

export default MyPlans;

type PropsCard = {
  name: string;
  icon: JSX.Element;
  setSelectedCategoryPlans: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  date: Date;
};

const Card = ({
  name,
  icon,
  setSelectedCategoryPlans,
  color,
  date,
}: PropsCard) => {
  const endDate = moment(date),
    todayDate = moment();

  const daysDifference = moment(endDate).diff(todayDate, "days");

  return (
    <label onChange={() => setSelectedCategoryPlans(name)}>
      <div
        className={` ${color} flex h-[15rem] w-[10rem] flex-col gap-4 rounded-xl p-6 opacity-100 shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-100 hover:shadow-2xl lg:h-[25rem]  lg:w-[18rem] `}
      >
        <div className="flex w-full justify-between">
          {icon}
          <EllipsisVerticalIcon className="h-7 w-7 " />
        </div>

        <p className="text-md font-semibold lg:text-xl">{name}</p>
        <div className=" flex h-full w-full flex-col justify-end ">
          <Image
            height={300}
            width={300}
            className="m-auto hidden rounded-md object-fill lg:block lg:w-[70%] lg:max-w-none"
            src={
              "https://images.unsplash.com/photo-1694231665185-bf22c08d9ced?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80"
            }
            alt={""}
          />
          <p className="text-md lg:text-lg">{daysDifference} days remaining</p>
        </div>
      </div>
    </label>
  );
};

type ListProps = {
  people: {
    name: string;
    email: string;
    role: string;
    imageUrl: string;
    lastSeen: string;
    lastSeenDateTime: string;
  }[];
};
function PlanList({ people }: ListProps) {
  return (
    <ul role="list" className="mx-20 w-full divide-y divide-gray-100">
      <AnimatePresence>
        {people.map((person, idx) => (
          <motion.li
            variants={{
              hidden: { opacity: 0, x: 200 },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            key={idx}
            initial="hidden"
            animate="show"
            exit={"hidden"}
            transition={{ duration: 1, type: "spring" }}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={person.lastSeenDateTime}>
                    {person.lastSeen}
                  </time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
