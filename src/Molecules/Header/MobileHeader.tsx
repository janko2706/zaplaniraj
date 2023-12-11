import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { CakeIcon, ChevronDownIcon, UserIcon } from "@heroicons/react/20/solid";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { Business } from "@prisma/client";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgRing } from "react-icons/cg";
import { FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import Accordion from "~/Atoms/Accordion/Accordion";
type Props = {
  appLogo: StaticImageData;
  userCompany: Business | undefined;
};

const MobileMenu = ({ appLogo, userCompany }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname: path } = useRouter();
  const toggleOffCanvas = () => {
    setIsOpen((prevState) => !prevState);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [path]);
  const user = useUser();
  return (
    <header className="fixed bottom-0 left-0 right-0 z-[52] bg-transparent p-2 shadow backdrop-blur-2xl  lg:hidden">
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
        </li>
        <li>
          <Link
            href={userCompany ? `/company/dashboard` : `/user/dashboard`}
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2 ${
              path ==
                `${userCompany ? `/company/dashboard` : `/user/dashboard`}` &&
              "bg-primary text-white"
            }`}
          >
            <UserIcon className="h-5 w-5" />
            <span className="text-center text-xs">Moj Portal</span>
          </Link>
        </li>
        <li>
          <button
            onClick={toggleOffCanvas}
            className={`flex flex-col items-center gap-1 rounded-md px-3 py-2`}
          >
            <Bars3Icon className="h-5 w-5" />
            <span className="text-center text-xs">Meni</span>
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
        <nav className="menus absolute left-0 flex w-full flex-col bg-white px-2 lg:static lg:top-full lg:w-auto lg:flex-row lg:bg-transparent lg:px-0">
          <div className="grow">
            <ul className="py-5">
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/" && "bg-primary text-white"
                  }`}
                >
                  <BuildingStorefrontIcon className="h-5 w-5" />
                  Pocetna
                </Link>
              </li>
              <li>
                {user.isSignedIn ? (
                  <Link
                    href={`${
                      userCompany ? `/company/dashboard` : `/user/dashboard`
                    }`}
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path ==
                        `${
                          userCompany ? `/company/dashboard` : `/user/dashboard`
                        }` && "bg-primary text-white"
                    }`}
                  >
                    {" "}
                    <ClipboardDocumentListIcon className="h-5 w-5" />
                    Moj Portal
                  </Link>
                ) : (
                  <SignInButton>
                    <div className="flex items-center gap-2 rounded-md px-6 py-3 duration-300">
                      <ClipboardDocumentListIcon className="h-5 w-5" />
                      Moj Portal
                    </div>
                  </SignInButton>
                )}
              </li>
              <Accordion
                buttonContent={(open) => (
                  <div
                    className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                      path.indexOf("discover") !== -1 && "bg-primary text-white"
                    }`}
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                    <p>Istrazi </p>
                  </div>
                )}
                initialOpen={false}
              >
                <ul className="pl-4">
                  <li>
                    <Link
                      href="/discover/wedding"
                      className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 `}
                    >
                      <CgRing className="h-5 w-5" />
                      Vjenjcanja
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/discover/birthday"
                      className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300`}
                    >
                      <CakeIcon className="h-5 w-5" />
                      Rodendani
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/discover/sacrament"
                      className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300`}
                    >
                      <FaChurch className="h-5 w-5" />
                      Sakramenti
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/discover/celebration"
                      className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300`}
                    >
                      <LuPartyPopper className="h-5 w-5" />
                      Slavlja
                    </Link>
                  </li>
                </ul>
              </Accordion>

              <li>
                <Link
                  href={
                    userCompany
                      ? `/company/dashboard?index=2`
                      : `/user/dashboard?index=2`
                  }
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300`}
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  Postavke
                </Link>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              {!user.isSignedIn ? (
                <SignInButton>
                  <div className="flex cursor-pointer items-center gap-2 rounded-md px-6 py-3">
                    <UserIcon className="h-5 w-5" />
                    Prijava
                  </div>
                </SignInButton>
              ) : (
                <SignOutButton>
                  <div className="flex cursor-pointer items-center gap-2 rounded-md px-6 py-3">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Odjava
                  </div>
                </SignOutButton>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MobileMenu;
