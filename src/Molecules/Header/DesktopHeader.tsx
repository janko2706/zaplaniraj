"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Language from "~/Atoms/Dropdowns/Language";
import Profile from "~/Atoms/Dropdowns/Profile";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { SignUpButton } from "@clerk/nextjs";
type Props = {
  user: {
    name: string | null | undefined;
    imageUrl: string | StaticImageData;
    isSingnedIn?: boolean;
  };
  appLogo: StaticImageData;
};

const DesktopHeader = ({ user, appLogo }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);
  return (
    <header
      className={`sticky top-0 z-30 hidden h-[75px] border-y align-middle lg:block  ${
        scrolled &&
        "z-50 border-0 bg-white bg-opacity-70 shadow-md backdrop-blur "
      } duration-300`}
    >
      <div className="container relative  flex h-full items-center justify-between  px-3 py-2 lg:px-0 lg:py-0">
        <Image
          width={100}
          height={100}
          className="w-40"
          src={appLogo}
          alt="ZAplaniraj logo"
        />
        <div className="flex items-center gap-2 lg:order-2">
          <Language />
          {!user.isSingnedIn && (
            <SignUpButton
              mode="modal"
              redirectUrl="http://localhost:3000/onboarding"
            >
              <button
                type="button"
                onClick={() => localStorage.setItem("onboarding", "welcome")}
                className=" rounded-3xl bg-slate-200 px-4 py-3 text-sm hover:bg-blue-300 "
              >
                Nemas racun?
              </button>
            </SignUpButton>
          )}

          <Profile user={user} />
        </div>
        <div className="lg:order-1">
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className="rounded-md border bg-slate-200 px-2 py-1 lg:hidden"
          >
            <FaBars className="las la-bars text-2xl" />
          </button>
          <div className={`lg:block ${menuOpen ? "block" : "hidden"}`}>
            <ul className="menus absolute left-0 flex w-full flex-col bg-white px-2 lg:static lg:top-full lg:w-auto lg:flex-row lg:bg-transparent lg:px-0">
              {menus.map((menu, index) => {
                const depthLevel = 0;
                return (
                  <MenuItems items={menu} key={index} depthLevel={depthLevel} />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
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
      className={`relative cursor-pointer px-3 py-2 `}
      ref={ref}
    >
      {items.submenu ? (
        <>
          <span
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            className="flex items-center justify-between gap-1"
          >
            {items.title}{" "}
            {depthLevel > 0 && <ChevronRightIcon height={20} width={20} />}
            {depthLevel == 0 && typeof items.title === "string" && (
              <ChevronDownIcon height={20} width={20} />
            )}
          </span>
          <Dropdown
            dropdown={dropdown}
            submenus={items.submenu}
            depthLevel={depthLevel}
          />
        </>
      ) : (
        <Link href={items.url ?? ""}>{items.title}</Link>
      )}
    </li>
  );
};
interface DropdownProps {
  submenus: MenuItem[];
  dropdown: boolean;
  depthLevel: number;
}
const Dropdown: React.FC<DropdownProps> = ({
  submenus,
  dropdown,
  depthLevel,
}) => {
  depthLevel = depthLevel + 1;
  const dropdownClass =
    depthLevel > 1
      ? "static lg:absolute left-full z-10 bg-white min-w-[200px] top-0"
      : "top-full static lg:absolute min-w-[200px] left-0 z-10 bg-white";
  return (
    <ul
      className={`my-dropdown static shadow-md duration-300 ${dropdownClass} ${
        dropdown ? "mt-5 block lg:mt-0" : "hidden"
      }`}
    >
      {submenus.map((submenu, index) => (
        <MenuItems depthLevel={depthLevel} items={submenu} key={index} />
      ))}
    </ul>
  );
};
