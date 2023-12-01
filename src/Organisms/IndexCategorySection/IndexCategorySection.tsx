import React from "react";
import Link from "next/link";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
const categoryData = [
  {
    title: "Vjenjcanja",
    id: 1,
    icon: (
      <CgRing className="h-20 w-20 text-blue-500 duration-300 group-hover:text-white" />
    ),
  },
  {
    title: "Rodendani",
    id: 2,
    icon: (
      <FaBirthdayCake className="h-20 w-20 text-purple-500 duration-300 group-hover:text-white" />
    ),
  },
  {
    title: "Sakramenti",
    id: 3,
    icon: (
      <FaChurch className="h-20 w-20 text-blue-500 duration-300 group-hover:text-white" />
    ),
  },
  {
    title: "Slavlja",
    id: 4,
    icon: (
      <LuPartyPopper className="h-20 w-20 text-purple-500 duration-300 group-hover:text-white" />
    ),
  },
];

function IndexCategorySection() {
  return (
    <section className="relative h-fit bg-white px-3 py-[40px] lg:py-[90px]">
      <div className="container flex h-fit flex-col">
        <div className="mx-auto flex max-w-[570px] flex-col items-center text-center">
          <h2 className="h2 mt-1 pb-8 pt-2 text-neutral-600 lg:pb-14">
            Izaberite kategoriju
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {categoryData.map(({ id, icon, title }) => (
            <div
              key={id}
              className="group cursor-pointer  rounded-xl border duration-300 lg:w-[12rem]"
            >
              <div className="flex flex-col items-center justify-center rounded-t-xl bg-white p-8 duration-300 group-hover:bg-primary group-hover:text-white">
                {icon}
                <h4 className="pb-3 pt-2 text-xl font-semibold text-neutral-700 group-hover:text-white">
                  {title}
                </h4>
              </div>
              <div className="rounded-b-xl bg-[var(--bg-1)] p-8 text-center duration-300 group-hover:bg-[#212391] group-hover:text-white">
                <Link href="#">
                  Istrazi <i className="las la-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndexCategorySection;
