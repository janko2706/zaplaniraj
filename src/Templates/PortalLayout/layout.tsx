import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import avatarPlaceholder from "@assets/avatar-placeholder.png";
import MainTemplate from "~/Templates/MainTemplate";
import { useUser } from "@clerk/nextjs";
import type { Business } from "@prisma/client";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
  type: string;
  isCompany?: boolean;
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
          url?: string | undefined;
          submenu: {
            title: string;
            url: string;
          }[];
        }[];
      }
  )[];
} & (
  | { isCompany: true; business?: Business; post: boolean }
  | { isCompany: false }
);

function RootLayout(props: Props) {
  const user = useUser();
  const router = useRouter();

  return (
    <>
      <MainTemplate
        menus={props.menus}
        userCompany={props.isCompany ? props.business : undefined}
      >
        <section className="bg-white">
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
                  <h6 className="text-lg font-medium">
                    {user.user?.fullName ?? ""}
                  </h6>
                  <Link href="mailto:info@example.com">
                    {user.user?.emailAddresses[0]?.toString() ?? ""}
                  </Link>
                </div>
              </div>
              {props.isCompany ? (
                <div className="line-clamp-1 rounded-none bg-dark text-center font-mono text-4xl font-semibold tracking-normal text-white">
                  {props.business?.name.toLocaleUpperCase() ?? ""}
                </div>
              ) : (
                <div className="line-clamp-1 rounded-none bg-dark text-center font-mono text-4xl font-semibold tracking-normal text-white">
                  {user.user?.firstName}&lsquo;s Portal
                </div>
              )}
              <Link
                href={
                  props.isCompany
                    ? `/company/${router.query.id?.toString() ?? ""}/post`
                    : ""
                }
                hidden={props.isCompany && props.post}
                locale={router.locale}
                className={`btn-primary ${
                  props.isCompany && props.post ? "hidden" : ""
                }`}
              >
                <PencilIcon className="h-5 w-5" /> {props.type}
              </Link>
            </div>

            <section>{props.children}</section>
          </div>
        </section>
      </MainTemplate>
    </>
  );
}

export default RootLayout;
