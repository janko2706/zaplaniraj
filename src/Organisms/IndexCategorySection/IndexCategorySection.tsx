import React from "react";
import Link from "next/link";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
const categoryData = [
  {
    title: "Vjenjcanja",
    id: 1,
    desc: "Ovo je kategorija slavlja",
    icon: (
      <CgRing className="text-7xl text-blue-500 duration-300 group-hover:text-white" />
    ),
  },
  {
    title: "Rodendani",
    id: 2,
    desc: "Ovo je kategorija slavlja",
    icon: (
      <FaBirthdayCake className="text-7xl text-purple-500 duration-300 group-hover:text-white" />
    ),
  },
  {
    title: "Sakramenti",
    id: 3,
    desc: "Ovo je kategorija slavlja",
    icon: (
      <FaChurch className="text-7xl text-blue-500 duration-300 group-hover:text-white" />
    ),
  },
  {
    title: "Slavlja",
    id: 4,
    desc: "Ovo je kategorija slavlja",
    icon: (
      <LuPartyPopper className="text-7xl text-purple-500 duration-300 group-hover:text-white" />
    ),
  },
];

function IndexCategorySection() {
  return (
    <section className="relative h-full bg-white px-3 py-[60px] lg:py-[120px]">
      <div className="container">
        <div className="mx-auto flex max-w-[570px] flex-col items-center text-center">
          <h2 className="h2 mt-1 pb-8 pt-2 text-neutral-600 lg:pb-14">
            Izaberite kategoriju
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {categoryData.map(({ id, desc, icon, title }) => (
            <div
              key={id}
              className="group max-w-[306px] cursor-pointer rounded-xl border duration-300"
            >
              <div className="rounded-t-xl bg-white p-8 duration-300 group-hover:bg-primary group-hover:text-white">
                {icon}
                <h4 className="pb-3 pt-2 text-xl font-semibold text-neutral-700 group-hover:text-white">
                  {title}
                </h4>
                <p>{desc}</p>
              </div>
              <div className="rounded-b-xl bg-[var(--bg-1)] p-8 duration-300 group-hover:bg-[#212391] group-hover:text-white">
                <Link href="#">
                  Read More <i className="las la-arrow-right"></i>
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
