import React from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import AppLogo from "../Assets/Company/LogoBig.png";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import useLandingPageTemplate from "./useMainTemplate";

type Props = {
  children: JSX.Element;
};

function MainTemplate(props: Props) {
  const userInfo = useUser();
  const { navigation, userNavigation, user, classNames } =
    useLandingPageTemplate();
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-lightBlue">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-28 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 cursor-pointer">
                      <Image
                        width={100}
                        height={100}
                        className="w-40"
                        src={AppLogo}
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="flex items-baseline  px-10 ">
                        <div
                          className="absolute  h-28 w-28 rounded-md bg-primaryBlue opacity-0 transition-all"
                          id="overlayForMenu"
                        ></div>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onMouseOver={(e) => {
                              const overlayById =
                                document.getElementById("overlayForMenu");
                              const position =
                                e.currentTarget.getBoundingClientRect();
                              const width = e.currentTarget.clientWidth;
                              const height = e.currentTarget.clientHeight;
                              if (overlayById) {
                                overlayById.style.opacity = "1";
                                overlayById.style.left = position.x + "px";
                                overlayById.style.top = position.y + "px";
                                overlayById.style.height = height + "px";
                                overlayById.style.width = width + "px";
                              }
                            }}
                            onMouseLeave={() => {
                              const overlayById =
                                document.getElementById("overlayForMenu");
                              if (overlayById) {
                                overlayById.style.opacity = "0";
                              }
                            }}
                            className={classNames(
                              item.current
                                ? "bg-primaryBlue text-white"
                                : "text-white transition-all ",
                              "z-10 rounded-md px-5 py-2 text-lg font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {userInfo.isSignedIn ? (
                        <SignOutButton>
                          <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 rounded-full px-4 py-1 text-white transition-all hover:bg-primaryBlue"
                          >
                            Odjava
                          </button>
                        </SignOutButton>
                      ) : (
                        <SignInButton mode="modal">
                          <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 rounded-full px-4 py-1 text-white transition-all hover:bg-primaryBlue"
                          >
                            Prijava
                          </button>
                        </SignInButton>
                      )}
                      {/* TODO Profile dropdown */}
                      <Menu as="div" className="relative ml-3 ">
                        <div>
                          <Image
                            width={100}
                            height={100}
                            className="h-14 w-14 rounded-full shadow-black transition-all hover:cursor-pointer hover:shadow-2xl"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="transition-all md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-primaryBlue text-white"
                          : "text-white hover:bg-primaryBlue ",
                        "block rounded-md px-3 py-2 text-base "
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4 ">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        width={100}
                        height={100}
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-primaryBlue"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                    <div className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-primaryBlue">
                      {userInfo.isSignedIn ? (
                        <SignOutButton />
                      ) : (
                        <SignInButton />
                      )}
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>{props.children}</main>
      </div>
    </>
  );
}

export default MainTemplate;
