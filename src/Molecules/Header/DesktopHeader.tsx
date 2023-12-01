import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Language from "~/Atoms/Dropdowns/Language";
import Profile from "~/Atoms/Dropdowns/Profile";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { env } from "~/env.mjs";

type Props = {
  user: {
    name: string | null | undefined;
    imageUrl: string | StaticImageData;
    isSingnedIn?: boolean;
  };
  bgColor?: string;
  appLogo: StaticImageData;
  menus: (
    | {
        title: string;
        url: string;
        submenu?: undefined;
      }
    | {
        title: string;
        url: string;
        submenu: {
          title: string;
          url?: string;
          submenu: {
            title: string;
            url: string;
          }[];
        }[];
      }
  )[];
};
const DesktopHeader = ({ user, appLogo, menus, bgColor }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 hidden h-[75px]  align-middle lg:block ${
        bgColor ?? "bg-white"
      }  ${
        scrolled && "z-50   border-0  bg-opacity-70 shadow-md backdrop-blur "
      } duration-300`}
    >
      <div className="container relative  flex h-full items-center justify-between  px-3 py-2 lg:px-0 lg:py-0">
        <Image
          width={100}
          height={100}
          className="w-40 cursor-pointer"
          src={appLogo}
          alt="ZAplaniraj logo"
          onClick={() => {
            void (async () => {
              await router.push("/", undefined, {
                locale: router.locale,
              });
            })();
          }}
        />
        <div className="flex items-center gap-2 lg:order-2">
          <Language />
          {!user.isSingnedIn && (
            <SignUpButton
              mode="modal"
              redirectUrl={env.NEXT_PUBLIC_WEBSITE_URL + "/onboarding"}
            >
              <button
                type="button"
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
            <ul className="menus absolute left-0 flex w-full flex-row bg-white px-2 lg:static lg:top-full lg:w-auto lg:flex-row lg:bg-transparent lg:px-0">
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
  const linkCLasses =
    "flex items-center justify-between gap-1 rounded-xl p-2 hover:bg-primaryLight transition-all duration-300";

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
            className={linkCLasses}
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
        <Link href={items.url ?? ""} className={linkCLasses}>
          {items.title}
        </Link>
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
