import {
  Bars3Icon,
  BuildingOffice2Icon,
  HeartIcon,
  HomeIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  StarIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";
type Props = {
  appLogo: StaticImageData;

};

const MobileMenu = ({ appLogo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const toggleOffCanvas = () => {

      setIsOpen((prevState) => !prevState);

  };
  useEffect(() => {

    setIsOpen(false);
  }, [path]);
  return (
    <header className="fixed bottom-0 left-0 right-0 z-[52] bg-white p-2 shadow lg:hidden">
      <ul className=" flex items-center justify-around">
        <li>
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2 ${
              path == "/" && "bg-primary text-white"
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            <span className="text-center text-xs">Home</span>
          </Link>
        </li>{" "}
        <li>
          <Link
            href="/company/id/dashboard"
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2 ${
              path == "/property-list" && "bg-primary text-white"
            }`}
          >
            <BuildingOffice2Icon className="h-5 w-5" />
            <span className="text-center text-xs">Pracenje</span>
          </Link>
        </li>
        <li>
          <Link
            href="/favorites"
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2 ${
              path == "/favorites" && "bg-primary text-white"
            }`}
          >
            <HeartIcon className="h-5 w-5" />
            <span className="text-center text-xs">Favoriti</span>
          </Link>
        </li>
        <li>
          <button
            onClick={toggleOffCanvas}
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2`}
          >
            <Bars3Icon className="h-5 w-5" />
            <span className="text-center text-xs">Menu</span>
          </button>
        </li>
      </ul>
      <div
        className={`fixed left-0 top-0 z-20 h-screen w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen
              ? "translate-x-0"
              : "translate-x-full"
        }`}
      >
        <Image
          width={100}
          height={100}
          className="w-40 py-2 pl-2"
          src={appLogo}
          alt="ZAplaniraj logo"
        />
        <button
          onClick={toggleOffCanvas}
          className="absolute right-1 top-1 z-30 rounded-full p-3"
        >
          <XMarkIcon width={30} height={30} className="h-6 w-6 text-red-950" />
        </button>
        <div className="my-2 border-b"></div>
        <nav className="menus absolute left-0 flex w-full flex-col bg-white px-2 lg:static lg:top-full lg:w-auto lg:flex-row lg:bg-transparent lg:px-0">
          <div className="grow">
            <ul className="py-5">
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
        </nav>
      </div>
    </header>
  );
};

export default MobileMenu;


