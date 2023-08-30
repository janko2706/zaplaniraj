import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";

function Dropdown() {
  const categories = [
    {
      name: "Vjenjcanja",
      icon: <CgRing className="   h-5 w-5 text-black " />,
    },
    {
      name: "Rodendani",
      icon: <FaBirthdayCake className="   h-5 w-5 text-black " />,
    },
    {
      name: "Sakramenti",
      icon: <FaChurch className="   h-5 w-5 text-black " />,
    },
    {
      name: "Slavlja",
      icon: <LuPartyPopper className="   h-5 w-5 text-black " />,
    },
  ];

  const [selected, setSelected] = useState(categories[0]);

  return (
    <div className="w-full cursor-pointer text-left md:w-[48%] xl:w-[50%]">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative flex w-full cursor-default items-center gap-3 rounded-3xl border bg-[var(--bg-1)] px-8 py-3 focus:shadow-xl sm:text-sm">
            {selected ? selected.icon : ""}
            <span className="block truncate">
              {selected ? selected.name : ""}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-8 flex items-center pr-2">
              <ChevronDownIcon width={30} height={30} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-gray-200 text-gray-700" : "text-gray-700"
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`flex items-center gap-3 truncate text-base ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.icon}
                        {category.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default Dropdown;
