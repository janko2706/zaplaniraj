import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import avatarPlaceholder from "@assets/avatar-placeholder.png";
import MainTemplate from "~/Templates/MainTemplate";
import { useUser } from "@clerk/nextjs";
import type { Business } from "@prisma/client";
import { useRouter } from "next/router";
import type { WholePostType } from "~/utils/types";
import { FaCircle } from "react-icons/fa";
import Modal from "~/Atoms/Modal/Modal";
import { useCompanyPost } from "~/Organisms/CompanySpecific/useCompanyPost";
import { toast } from "react-toastify";

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
  | {
      isCompany: true;
      business?: Business;
      hasPost: boolean;
      post?: WholePostType;
    }
  | { isCompany: false }
);

function RootLayout(props: Props) {
  const user = useUser();
  const router = useRouter();
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [post, setPost] = useState<WholePostType>();
  const { updatePost } = useCompanyPost();

  const shouldHidePostLink = (): boolean => {
    if (props.isCompany) {
      if (props.hasPost === true) {
        return false;
      }
      return true;
    }
    return true;
  };
  const isPostLiveText = (): string => {
    if (props.isCompany && props.hasPost) {
      if (post?.isLive === true) {
        return "Oglas je objavljen";
      } else {
        return "Oglas nije objavljen!";
      }
    }
    return "";
  };
  const isPostLiveColor = (): string => {
    if (props.isCompany && props.hasPost) {
      if (post?.isLive === true) {
        return "text-green-400";
      } else {
        return "text-red-400";
      }
    }
    return "";
  };
  useEffect(() => {
    if (props.isCompany) {
      setPost(props.post);
    }
  }, []);

  const updatePostIsLive = async () => {
    if (props.isCompany) {
      try {
        const result = await updatePost({
          id: props.post?.id ?? 0,
          isPostLive: !props.post?.isLive,
        });
        if (result) {
          toast.success(
            result.isLive ? "Oglas je objavljen." : "Oglas je stagniran."
          );
          setPost(result);
        } else {
          toast.error("Doslo je do pogreske, pokusajte ponovo kasnije.");
        }
      } catch (_error) {
        toast.error("Doslo je do pogreske, pokusajte ponovo kasnije.");
      }
    }
  };

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
              <div
                className={`flex gap-4 ${
                  shouldHidePostLink() ? "hidden" : ""
                } `}
              >
                <button
                  type="button"
                  className={"btn-primary-lg"}
                  onClick={(e) => {
                    e.preventDefault();
                    setLiveModalOpen((prev) => !prev);
                  }}
                >
                  <FaCircle className={`h-3 w-3 ${isPostLiveColor()}`} />
                  {isPostLiveText()}
                </button>

                <Link
                  href={props.isCompany ? `/company/post` : ""}
                  locale={router.locale}
                  className="btn-primary"
                >
                  <PencilIcon className="h-5 w-5" /> {props.type}
                </Link>
              </div>
            </div>

            <section>{props.children}</section>
          </div>
          <Modal
            buttonAction={async () => await updatePostIsLive()}
            open={liveModalOpen}
            setOpen={setLiveModalOpen}
            isPostLive={isPostLiveColor() === "text-green-400"}
          />
        </section>
      </MainTemplate>
    </>
  );
}

export default RootLayout;
