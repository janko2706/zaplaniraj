import React from "react";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import moment from "moment";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Spotlight from "~/Molecules/SpotlightCard/Spotlight";
import SpotlightCard from "~/Molecules/SpotlightCard/SpotlightCard";

function MyPlans() {
  const iconClasses = "h-7 w-7";
  const categories: {
    name: string;
    icon: JSX.Element;
    date: Date;
  }[] = [
    {
      name: "My wedding",
      icon: <CgRing className={`${iconClasses}`} />,
      date: new Date("2024/01/01"),
    },
    {
      name: "Rodendan Matija",
      icon: <FaBirthdayCake className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
    {
      name: "Krizma John",
      icon: <FaChurch className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
    {
      name: "Party Party!!",
      icon: <LuPartyPopper className={`${iconClasses}`} />,
      date: new Date(2024, 12, 1),
    },
  ];

  return (
    <section className="  h-full w-full  px-5 py-5 ">
      <Spotlight className="group mx-0 grid h-full grid-cols-2 gap-7 md:grid-cols-4  lg:mx-40  lg:grid-cols-4 lg:gap-0">
        {categories.map((item, idx) => {
          return (
            <SpotlightCard key={idx}>
              <Card name={item.name} icon={item.icon} date={item.date} />
            </SpotlightCard>
          );
        })}
      </Spotlight>
    </section>
  );
}

export default MyPlans;

type PropsCard = {
  name: string;
  icon: JSX.Element;
  date: Date;
};

const Card = ({ name, icon, date }: PropsCard) => {
  const endDate = moment(date),
    todayDate = moment();

  const daysDifference = moment(endDate).diff(todayDate, "days");

  return (
    <div className="flex h-[15em] w-[10em] items-center lg:h-[20em] lg:w-[18em] ">
      <div className="group relative flex h-[15rem] w-[10rem] overflow-hidden rounded-[16px]  bg-gradient-to-r from-primary via-purple-500 to-dark   lg:h-[20em] lg:w-[18em]">
        <div className=" visible absolute  -bottom-40 -top-40 left-10 right-10 animate-spin-slow bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
        <div className="relative m-auto h-[14.6rem] w-[9.6rem] rounded-[15px] bg-white p-6   lg:h-[19.7rem] lg:w-[17.7rem]">
          <div className="space-y-4">
            <div className="flex w-full justify-between">
              {icon}
              <EllipsisVerticalIcon className="h-7 w-7 cursor-pointer" />
            </div>
            <p className="text-md line-clamp-1 font-semibold lg:text-xl">
              {name}
            </p>
            <div className=" justify-between ">
              <p className="line-clamp-2 text-slate-400 lg:line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                possimus quidem in cum id ad eveniet a saepe, consectetur rerum?
              </p>
            </div>
            <p className="text-md lg:text-lg">
              {daysDifference} days remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
