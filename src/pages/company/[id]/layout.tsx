import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import avatarPlaceholder from "@assets/avatar-placeholder.png";
import { useState } from "react";
import MainTemplate from "~/Templates/MainTemplate";
import { useUser } from "@clerk/nextjs";

type Props = {
  children: JSX.Element;
};

function RootLayout({ children }: Props) {
  const [filterOpen, setFilterOpen] = useState(false);
  const user = useUser();
  return (
    <>
      <MainTemplate>
        <section className="bg-white">
          {/* <nav
            className={`transiton-all absolute z-20 ml-0 flex h-[10%] w-[100%] flex-col border-r bg-white p-3 shadow-lg duration-300 ease-out sm:w-[312px] md:p-10 lg:ml-0 lg:shadow-none`}
          >
            <div className="grow">
              <ul className="inline-flex py-5">
                <li>
                  <Link
                    href="/vendor-dashboard"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-dashboard" && "bg-primary text-white"
                    }`}
                  >
                    <BuildingStorefrontIcon className="h-5 w-5" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-listings"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-listings" && "bg-primary text-white"
                    }`}
                  >
                    <ClipboardDocumentListIcon className="h-5 w-5" />
                    Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-bookings"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-bookings" && "bg-primary text-white"
                    }`}
                  >
                    <TicketIcon className="h-5 w-5" />
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-activities"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-activities" && "bg-primary text-white"
                    }`}
                  >
                    <BellIcon className="h-5 w-5" />
                    Activities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-earnings"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-earnings" && "bg-primary text-white"
                    }`}
                  >
                    <CurrencyDollarIcon className="h-5 w-5" />
                    Earnings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-reviews"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-reviews" && "bg-primary text-white"
                    }`}
                  >
                    <StarIcon className="h-5 w-5" />
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-settings"
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path == "/vendor-settings" && "bg-primary text-white"
                    }`}
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <ul>
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 `}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Log out
                </Link>
              </li>
            </ul>
          </nav> */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-5 bg-[var(--dark)] px-3 py-5 md:p-[30px] lg:p-[60px]">
              <div className="flex items-center gap-2">
                <div className="relative mx-auto grid place-content-center rounded-full  border border-[var(--primary)] bg-white p-1">
                  <Image
                    width={48}
                    height={48}
                    src={user.user?.imageUrl ?? avatarPlaceholder}
                    alt="image"
                    className="rounded-full"
                  />
                  <div className="white absolute bottom-2 right-0 grid h-4 w-4 place-content-center rounded-full border-2 bg-primary text-white">
                    <CheckIcon className="h-3 w-3" />
                  </div>
                </div>
                <div className="text-white">
                  <h6 className="text-lg font-medium">Floyd Miles</h6>
                  <Link href="mailto:info@example.com">info@example.com</Link>
                </div>
              </div>
              <Link href="/add-property" className="btn-primary">
                <PlusCircleIcon className="h-5 w-5" /> Add New Listing
              </Link>
            </div>
            <button
              className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
            >
              Dropdown button
              <svg
                className="ml-2.5 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              className={`z-10 ${
                filterOpen ? "block" : "hidden"
              } w-44 divide-y  rounded-lg bg-slate-400 text-white transition-all duration-300`}
            >
              <ul
                className="py-2 text-sm "
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <section className="h-[100vh]">{children}</section>
          </div>
        </section>
      </MainTemplate>
    </>
  );
}

export default RootLayout;
