"use client";

import { useRef, Fragment } from "react";
import { Tab } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

interface Tab {
  title: string;
  icon: JSX.Element;
  children?: JSX.Element;
}

export default function PortalTabs({ tabs }: { tabs: Tab[] }) {
  const tabsRef = useRef<HTMLDivElement>(null);

  return (
    <Tab.Group>
      {({ selectedIndex }) => (
        <div className={`${caveat.variable} bg-dark`}>
          {/* Buttons */}
          <div className="flex justify-center">
            <Tab.List className="mb-8 inline-flex flex-wrap justify-center rounded-[20px] bg-slate-200 p-1 sm:w-[100%] md:w-fit lg:w-fit">
              {tabs.map((tab, index) => (
                <Tab key={index} as={Fragment}>
                  <button
                    className={` flex h-8 flex-1 items-center gap-3   whitespace-nowrap rounded-2xl px-4  text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none ${
                      selectedIndex === index
                        ? "bg-white text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                    }}`}
                  >
                    {tab.icon}
                    {tab.title}
                  </button>
                </Tab>
              ))}
            </Tab.List>
          </div>

          {/* Tab panels */}
          <Tab.Panels className="w-full">
            <div className="relative w-full" ref={tabsRef}>
              {tabs.map((tab, index) => (
                <Tab.Panel key={index} as={Fragment} static={true}>
                  <Transition
                    as="article"
                    show={selectedIndex === index}
                    unmount={false}
                    className="h-full w-full items-stretch overflow-y-auto rounded-t-2xl  bg-white shadow-xl focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 min-[480px]:flex lg:h-[50vmin]"
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 transform order-first"
                    enterFrom="opacity-0 -translate-y-8"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-12"
                  >
                    <div className="flex w-full justify-center ">
                      {tab.children}
                    </div>
                  </Transition>
                </Tab.Panel>
              ))}
            </div>
          </Tab.Panels>
        </div>
      )}
    </Tab.Group>
  );
}
