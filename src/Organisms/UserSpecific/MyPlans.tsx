import React, { useState } from "react";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

function MyPlans() {
  const [selectedCategoryPlans, setSelectedCategoryPlans] =
    useState<string>("Wedding");
  const iconClasses = "lg:h-20 lg:w-20 h-14 w-14  self-center text-primary ";
  const categories = [
    {
      name: "Vjenjcanja",
      icon: <CgRing className={`${iconClasses}`} />,
    },
    {
      name: "Rodendani",
      icon: <FaBirthdayCake className={`${iconClasses}`} />,
    },
    {
      name: "Sakramenti",
      icon: <FaChurch className={`${iconClasses}`} />,
    },
    {
      name: "Slavlja",
      icon: <LuPartyPopper className={`${iconClasses}`} />,
    },
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
    <section className="mx-52 my-10 flex h-[70vmin] w-full">
      {/* <div className="grid  grid-cols-2 grid-rows-2 gap-4  md:grid-cols-3  lg:grid-cols-4 ">
        {categories.map((item, idx) => {
          return <Card key={idx} name={item.name} icon={item.icon} />;
        })}
      </div> */}
      <div className="flex h-full  flex-col justify-start gap-4  ">
        {categories.map((item, idx) => {
          return (
            <Card
              key={idx}
              name={item.name}
              icon={item.icon}
              setSelectedCategoryPlans={setSelectedCategoryPlans}
            />
          );
        })}
      </div>
      <PlanList people={chooseList(selectedCategoryPlans)} />
    </section>
  );
}

export default MyPlans;

type Props = {
  name: string;
  icon: JSX.Element;
  setSelectedCategoryPlans: React.Dispatch<React.SetStateAction<string>>;
};

const Card = ({ name, icon, setSelectedCategoryPlans }: Props) => {
  return (
    <label onChange={() => setSelectedCategoryPlans(name)}>
      <input
        type="radio"
        name="category"
        className="peer hidden"
        value={name}
      />
      <div className="flex h-32 w-32 flex-col justify-center gap-4 rounded-lg text-center shadow-md transition-all duration-300 hover:cursor-pointer  hover:bg-gray-300 hover:shadow-2xl peer-checked:bg-gray-400 lg:h-52 lg:w-52">
        {icon}
        <p className="text-md lg:text-lg">{name}</p>
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
