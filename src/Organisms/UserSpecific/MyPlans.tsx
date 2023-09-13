import React from "react";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import moment from "moment";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Spotlight from "~/Molecules/SpotlightCard/Spotlight";
import SpotlightCard from "~/Molecules/SpotlightCard/SpotlightCard";
import { type NextRouter, useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

function MyPlans() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const iconClasses = "h-7 w-7";
  const router = useRouter();
  const plansInProgress: {
    id: string;
    name: string;
    icon: JSX.Element;
    date: Date;
  }[] = [
    {
      id: "fiouasgodiuzbcas2344df",
      name: "My wedding",
      icon: <CgRing className={`${iconClasses}`} />,
      date: new Date("2024/01/01"),
    },
    {
      id: "fio2432354uasgodiuzbcasdf",

      name: "Rodendan Matija",
      icon: <FaBirthdayCake className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
    {
      id: "fiouasgodiuz5554325bcasdf",

      name: "Krizma John",
      icon: <FaChurch className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
    {
      id: "fiouasg2345odiuzbcasdf",

      name: "Party Party!!",
      icon: <LuPartyPopper className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
  ];
  const plansCompleted: {
    id: string;
    name: string;
    icon: JSX.Element;
    date: Date;
  }[] = [
    {
      id: "fiouasgodiuz5554325bcasdf",

      name: "Krizma John",
      icon: <FaChurch className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
    {
      id: "fiouasg2345odiuzbcasdf",

      name: "Party Party!!",
      icon: <LuPartyPopper className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
  ];

  return (
    <section className="  h-full w-full  px-5 py-5 ">
      <ul>
        <li>
          <div className=" rounded-2xl bg-white p-3 sm:p-4 lg:p-4">
            <Tab.Group>
              <Tab.List className="col-span-12 mb-4 flex flex-wrap justify-around rounded-2xl border px-4 lg:mb-6">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center gap-2 px-3 py-4 font-medium focus:outline-none",
                      selected ? "border-b border-primary text-primary" : ""
                    )
                  }
                >
                  <ChevronDoubleRightIcon className="h-5 w-5" />
                  <span className="inline-block"> In Progress (1)</span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center gap-2 px-3 py-4 font-medium focus:outline-none",
                      selected ? "border-b border-primary text-primary" : ""
                    )
                  }
                >
                  <CheckBadgeIcon className="h-5 w-5" />
                  <span className="inline-block"> Completed (4)</span>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel
                  className="tab-pane fade show active"
                  id="inprogress"
                >
                  <Spotlight className="group mx-0 flex h-full w-full flex-col gap-5 overflow-y-auto  ">
                    {plansInProgress.map((item, idx) => {
                      return (
                        <SpotlightCard key={idx}>
                          <Card
                            router={router}
                            name={item.name}
                            icon={item.icon}
                            date={item.date}
                            id={item.id}
                          />
                        </SpotlightCard>
                      );
                    })}
                  </Spotlight>
                </Tab.Panel>
                <Tab.Panel className="tab-pane fade" id="completed">
                  <Spotlight className="group mx-0 flex h-full w-full flex-col gap-5 overflow-y-auto  ">
                    {plansCompleted.map((item, idx) => {
                      return (
                        <SpotlightCard key={idx}>
                          <Card
                            router={router}
                            name={item.name}
                            icon={item.icon}
                            date={item.date}
                            id={item.id}
                          />
                        </SpotlightCard>
                      );
                    })}
                  </Spotlight>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default MyPlans;

type PropsCard = {
  router: NextRouter;
  id: string;
  name: string;
  icon: JSX.Element;
  date: Date;
};

const Card = ({ name, icon, date, id, router }: PropsCard) => {
  const endDate = moment(date),
    todayDate = moment();

  const daysDifference = moment(endDate).diff(todayDate, "days");

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={(evnt) => {
          evnt.stopPropagation();
          evnt.preventDefault();
          void (async () => await router.replace(`/plan/${id}`))();
        }}
      >
        <div className="group flex  overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-dark p-[0.17em] ">
          <div className=" visible absolute  -bottom-40 -top-40 left-10 right-10 animate-spin-slow bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
          <div className=" flex  w-full flex-wrap  items-center justify-between rounded-2xl bg-white p-8">
            <div className="z-50 flex flex-wrap items-center gap-4 space-y-4">
              <div className="grid h-12 w-12 shrink-0 place-content-center rounded-full shadow-xl">
                <div className="grid h-10 w-10 place-content-center rounded-full bg-[var(--primary-light)] text-primary">
                  {icon}
                </div>
              </div>
              <div className="flex-grow">
                <h5 className="mb-1 font-medium">{name}</h5>
                <ul className=" flex flex-wrap items-center">
                  <li>
                    <span className="inline-block text-sm">
                      <span className="inline-block text-neutral-500">
                        {daysDifference} days remaining
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              href="#"
              className="btn-outline z-50 shrink-0 font-semibold text-primary"
            >
              Manage Plan
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
