import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { UserIcon, HeartIcon, InfoIcon, LogOutIcon } from "../Icons/Icons";
import { CgLogIn } from "react-icons/cg";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { env } from "~/env.mjs";
import { useRouter } from "next/router";
import {
  Cog6ToothIcon,
  PencilSquareIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  user: {
    name: string | null | undefined;
    imageUrl: string | StaticImageData;
    isSingnedIn?: boolean;
  };
  userCompany:
    | {
        id: string;
        typeOfBusinessId: number;
        name: string;
        stripeId: string | null;
        hasPost: boolean | null;
        postIsLive: boolean | null;
        freeTrial: boolean;
        companyPostId: number | null;
      }
    | undefined;
};

export default function Profile({ user, userCompany }: Props) {
  const { replace } = useRouter();
  return (
    <div className="z-20 text-left">
      <Menu as="div" className="relative top-1 inline-block md:top-[2px]">
        <Menu.Button className="flex items-center justify-center rounded-full focus:outline-none">
          <Image
            className="rounded-full"
            src={user.imageUrl}
            width={45}
            height={45}
            alt="profile"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-[-80px] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-auto lg:right-0">
            <div className="px-1 py-1 ">
              {user.isSingnedIn && (
                <Menu.Item>
                  <div className="flex items-center gap-3 border-b border-dashed pb-3">
                    <Image
                      className="rounded-full"
                      src={user.imageUrl}
                      width={55}
                      height={55}
                      alt="profile"
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold text-gray-800">
                        {user.name}
                      </span>
                    </div>
                  </div>
                </Menu.Item>
              )}
              {user.isSingnedIn && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-200 text-gray-800" : ""
                      } group mt-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      href={
                        userCompany ? "/company/dashboard" : "/user/dashboard"
                      }
                    >
                      <UserIcon />
                      Moj Portal
                    </Link>
                  )}
                </Menu.Item>
              )}
              {user.isSingnedIn &&
                (!userCompany ? (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={
                          userCompany ? "/company/dashboard" : "/user/dashboard"
                        }
                        className={`${
                          active ? "bg-gray-200 text-gray-800" : ""
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                        Moji planovi
                      </Link>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={
                          userCompany ? "/company/dashboard" : "/user/dashboard"
                        }
                        className={`${
                          active ? "bg-gray-200 text-gray-800" : ""
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <ChartBarIcon className="h-5 w-5" />
                        Statistika
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              {user.isSingnedIn && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={
                        userCompany
                          ? "/company/dashboard?index=1"
                          : "/user/dashboard?index=1"
                      }
                      className={`${
                        active ? "bg-gray-200 text-gray-800" : ""
                      } group flex w-full items-center gap-2 rounded-md  px-2 py-2 text-sm`}
                    >
                      {userCompany ? (
                        <>
                          <StarIcon className="h-5 w-5" />
                          Recenzije
                        </>
                      ) : (
                        <>
                          <HeartIcon />
                          Favoriti
                        </>
                      )}
                    </Link>
                  )}
                </Menu.Item>
              )}
              {user.isSingnedIn && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={
                        userCompany
                          ? "/company/dashboard?index=2"
                          : "/user/dashboard?index=2"
                      }
                      className={`${
                        active ? "bg-gray-200 text-gray-800" : ""
                      } group mb-2 flex w-full items-center gap-2 rounded-md border-b border-dashed px-2 py-2 text-sm`}
                    >
                      <Cog6ToothIcon className="h-5 w-5" />
                      Postavke
                    </Link>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/faq"}
                    className={`${
                      active ? "bg-gray-200 text-gray-800" : ""
                    } group mt-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                  >
                    <InfoIcon />
                    Pomoc
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) =>
                  !user.isSingnedIn ? (
                    <SignInButton
                      mode="modal"
                      redirectUrl={env.NEXT_PUBLIC_WEBSITE_URL + "/"}
                    >
                      <button
                        type="button"
                        className={`${
                          active ? "bg-gray-200 text-gray-800" : ""
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <CgLogIn />
                        Prijava
                      </button>
                    </SignInButton>
                  ) : (
                    <SignOutButton>
                      <button
                        type="button"
                        onClick={() => {
                          void (async () => {
                            await replace("/");
                          })();
                        }}
                        className={`${
                          active ? "bg-gray-200 text-gray-800" : ""
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <LogOutIcon />
                        Odjava
                      </button>
                    </SignOutButton>
                  )
                }
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
