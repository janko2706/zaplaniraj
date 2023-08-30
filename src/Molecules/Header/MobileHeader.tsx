import {
  Bars3Icon,
  BuildingOffice2Icon,
  HeartIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
const menus = [
  {
    title: "Home",
    submenu: [
      {
        title: "Real Estate",
        url: "/",
      },
      {
        title: "Property Listing",
        url: "/home-2",
      },
      {
        title: "Car Rental",
        url: "/home-3",
      },
      {
        title: "Hotel Booking",
        url: "/home-4",
      },
      {
        title: "Tour Booking",
        url: "/home-5",
      },
      {
        title: "Flight Booking",
        url: "/home-6",
      },
    ],
  },
  {
    title: "Listings",
    submenu: [
      {
        title: "property",
        submenu: [
          {
            title: "Property List",
            url: "/property-list",
          },
          {
            title: "Property Grid",
            url: "/property-grid",
          },
          {
            title: "Property Map",
            url: "/property-map",
          },
          {
            title: "Add Property",
            url: "/add-property",
          },
          {
            title: "Property Details 1",
            url: "/property-details-1",
          },
          {
            title: "Property Details 2",
            url: "/property-details-2",
          },
        ],
      },
      {
        title: "Cab",
        submenu: [
          {
            title: "Cab Listing",
            url: "/cab-listing",
          },
          {
            title: "Cab Listing Grid",
            url: "/cab-listing-grid",
          },
          {
            title: "Cab Listing Map",
            url: "/cab-listing-map",
          },
          {
            title: "Cab Listing Details",
            url: "/cab-listing-details",
          },
        ],
      },
      {
        title: "Hotel",
        submenu: [
          {
            title: "Hotel Listing",
            url: "/hotel-listing",
          },
          {
            title: "Hotel Listing Grid",
            url: "/hotel-listing-grid",
          },
          {
            title: "Hotel Listing Map",
            url: "/hotel-listing-map",
          },
          {
            title: "Hotel listing Details",
            url: "/hotel-listing-details",
          },
        ],
      },
      {
        title: "Tour",
        submenu: [
          {
            title: "Tour Listing",
            url: "/tour-listing",
          },
          {
            title: "Tour Listing Grid",
            url: "/tour-listing-grid",
          },
          {
            title: "Tour Listing Map",
            url: "/tour-listing-map",
          },
          {
            title: "Tour Listing Details",
            url: "/tour-listing-details",
          },
        ],
      },
      {
        title: "Flight",
        submenu: [
          {
            title: "Flight List",
            url: "/flight-list",
          },
          {
            title: "Flight Details",
            url: "/flight-details",
          },
        ],
      },
      {
        title: "Compare Listing",
        url: "/compare-listing",
      },
    ],
  },
  {
    title: "Pages",
    submenu: [
      {
        title: "Agent",
        submenu: [
          {
            title: "Agent",
            url: "/agent",
          },
          {
            title: "Agent Details List",
            url: "/agent-details-list",
          },
          {
            title: "Agent Details Grid",
            url: "/agent-details-grid",
          },
          {
            title: "Agent Details Review",
            url: "/agent-details-review",
          },
        ],
      },
      {
        title: "Service",
        submenu: [
          {
            title: "Service",
            url: "/service",
          },
          {
            title: "Service Details",
            url: "/service-details",
          },
        ],
      },
      {
        title: "About Us",
        url: "/about-us",
      },
      {
        title: "Payment Method",
        url: "/payment-method",
      },
      {
        title: "Pricing Plan",
        url: "/pricing-plan",
      },
    ],
  },
  {
    title: "Dashboard",
    submenu: [
      {
        title: "User Dashboard",
        url: "/personal-info",
      },
      {
        title: "Vendor Dashboard",
        url: "/vendor-dashboard",
      },
      {
        title: "Admin Dashboard",
        url: "/admin-dashboard",
      },
    ],
  },
  {
    title: <i className="las la-ellipsis-h flex items-center text-2xl "></i>,

    submenu: [
      {
        title: "Blog",
        submenu: [
          { title: "Blog", url: "/blog-grid" },
          { title: "Blog Details", url: "/blog-details" },
        ],
      },
      { title: "Faq", url: "/faq" },
      { title: "Contact Us", url: "/contact" },
      { title: "Sign in", url: "/sign-in" },
      { title: "Sign up", url: "/signup" },
      { title: "Error", url: "/error" },
    ],
  },
];
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
            href="/property-list"
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2 ${
              path == "/property-list" && "bg-primary text-white"
            }`}
          >
            <BuildingOffice2Icon className="h-5 w-5" />
            <span className="text-center text-xs">Listings</span>
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
          isOpen ? "translate-x-0" : "translate-x-full"
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
        <ul className="menus absolute left-0 flex w-full flex-col bg-white px-2 lg:static lg:top-full lg:w-auto lg:flex-row lg:bg-transparent lg:px-0">
          {menus.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default MobileMenu;

interface MenuItem {
  title: string | JSX.Element;
  submenu?: MenuItem[];
  url?: string;
}
interface MenuItemsProps {
  items: MenuItem;
  depthLevel: number;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const onMouseEnter = () => {
    window.innerWidth > 992 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 992 && setDropdown(false);
  };

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`menu-items relative cursor-pointer`}
      ref={ref}
    >
      {items.submenu ? (
        <>
          <span
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            className={`flex items-center  gap-5`}
          >
            {items.title}{" "}
            {depthLevel > 0 && (
              <FaAngleRight
                height={20}
                width={20}
                className={` ${dropdown && "rotate-90"} duration-300`}
              />
            )}
            {depthLevel == 0 && typeof items.title === "string" && (
              <FaAngleRight
                height={20}
                width={20}
                className={`${dropdown && "rotate-90"} duration-300`}
              />
            )}
          </span>
        </>
      ) : (
        <Link href={items.url ?? ""}>{items.title}</Link>
      )}
    </li>
  );
};
