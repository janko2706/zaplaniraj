import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import USFlag from "@assets/Flags/us.svg";
import DEFlag from "@assets/Flags/de.svg";
import HRFlag from "@assets/Flags/hr.svg";
import { useRouter } from "next/router";

export default function Language() {
  const { locale, push, pathname, query, reload } = useRouter();

  const switchFlagonLocaleChange = (locale: string): string => {
    switch (locale) {
      case "en-US":
        return USFlag as string;
      case "hr":
        return HRFlag as string;
      case "de-DE":
        return DEFlag as string;

      default:
        return HRFlag as string;
    }
  };
  return (
    <div className="z-10 ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-3xl bg-slate-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-300">
            <span className="flex gap-2 ">
              <Image
                width={20}
                height={20}
                className="-mr-1 ml-2 h-5 w-5 text-gray-700 "
                aria-hidden="true"
                alt="United States Flag"
                src={switchFlagonLocaleChange(locale ?? "hr")}
              />
            </span>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-gray-700 "
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right rounded-md border bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-auto lg:right-0">
            <div className="flex gap-2 px-1 py-1">
              <Menu.Item>
                <button
                  type="button"
                  onClick={() => {
                    void (async () => {
                      await push({ pathname, query }, undefined, {
                        locale: "en-US",
                      });
                    })();
                  }}
                  className={`${
                    locale === "en-US"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } group flex w-full flex-col rounded-md px-2 py-2 text-sm`}
                >
                  <span className="text-base text-gray-800">English</span>
                  <span className="text-xs text-gray-500">US</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  type="button"
                  onClick={() => {
                    void (async () => {
                      await push({ pathname, query }, undefined, {
                        locale: "de-DE",
                      });
                    })();
                  }}
                  className={`${
                    locale === "de-DE"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } group flex w-full flex-col rounded-md px-2 py-2 text-sm`}
                >
                  <span className="text-base text-gray-800">Deutsch</span>
                  <span className="text-xs text-gray-500">Deutschland</span>
                </button>
              </Menu.Item>
            </div>
            <div className="flex gap-2 px-1 py-1">
              <Menu.Item>
                <button
                  type="button"
                  onClick={() => {
                    void (async () => {
                      await push({ pathname, query }, undefined, {
                        locale: "hr",
                      });
                    })();
                  }}
                  className={`${
                    locale === "hr"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } group flex w-full flex-col rounded-md px-2 py-2 text-sm`}
                >
                  <span className="text-base text-gray-800">Hrvatski</span>
                  <span className="text-xs text-gray-500">Hrvatska</span>
                </button>
              </Menu.Item>
            </div>
            <p className="bg-slate-100 p-1 text-center text-xs text-red-400">
              Currently only Croatian is available!
              <br />
              Thank you for your patience.
            </p>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
