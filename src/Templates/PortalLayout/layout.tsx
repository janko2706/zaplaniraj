import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BuildingOfficeIcon,
  CakeIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import avatarPlaceholder from "@assets/avatar-placeholder.png";
import MainTemplate from "~/Templates/MainTemplate";
import { useUser } from "@clerk/nextjs";
import type { BussinesForPlan, WholePostType } from "~/utils/types";
import { FaBreadSlice, FaCircle, FaGuitar } from "react-icons/fa";
import Modal from "~/Atoms/Modal/Modal";
import { useCompanyPost } from "~/Organisms/CompanySpecific/useCompanyPost";
import { toast } from "react-toastify";
import { AiFillCar } from "react-icons/ai";
import { GiClown, GiAmpleDress } from "react-icons/gi";
import { LuFlower } from "react-icons/lu";

type Props = {
  children: JSX.Element;
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
      business?: BussinesForPlan;
      hasPost: boolean;
      post?: WholePostType;
    }
  | { isCompany: false }
);

function RootLayout(props: Props) {
  const user = useUser();
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [post, setPost] = useState<WholePostType>();
  const [isLive, setIsLive] = useState<boolean>(false);
  const { updatePost } = useCompanyPost();
  const isPostLiveText = (isLive: boolean): string => {
    if (props.isCompany && props.hasPost) {
      if (isLive === true) {
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
      setIsLive(props.post?.isLive ?? false);
    }
  }, [props.isCompany, props.isCompany && props.post]);

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
  const getCategoryIcon = (categoryValue: string) => {
    switch (categoryValue) {
      case "Transport":
        return <AiFillCar className="h-10 w-10" />;
      case "Venue":
        return <BuildingOfficeIcon className="h-10 w-10" />;
      case "Flowers":
        return <LuFlower className="h-10 w-10" />;
      case "Cakes":
        return <CakeIcon className="h-10 w-10" />;
      case "Music":
        return <FaGuitar className="h-10 w-10" />;
      case "Catering":
        return <FaBreadSlice className="h-10 w-10" />;
      case "Entertainment":
        return <GiClown className="h-10 w-10" />;
      case "Dresses":
        return <GiAmpleDress className="h-10 w-10" />;

      default:
        return <BuildingOfficeIcon className="h-10 w-10" />;
    }
  };

  return (
    <>
      <MainTemplate
        menus={props.menus}
        userCompany={props.isCompany ? props.business : undefined}
      >
        <section className="w-screen bg-white ">
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
                <div className="line-clamp-1 flex items-center gap-5 rounded-none bg-dark text-center font-mono text-4xl font-semibold tracking-normal text-white">
                  {getCategoryIcon(props.business?.typeOfBusiness.value ?? "")}
                  {props.business?.name.toLocaleUpperCase() ?? ""}
                </div>
              ) : (
                <div className="line-clamp-1 rounded-none bg-dark text-center font-mono text-4xl font-semibold tracking-normal text-white">
                  {user.user?.firstName}&lsquo;s Portal
                </div>
              )}

              <div
                className={`flex gap-4 ${
                  props.isCompany && props.hasPost ? "" : "hidden"
                } `}
              >
                <button
                  type="button"
                  className={`btn btn-primary`}
                  onClick={(e) => {
                    e.preventDefault();
                    setLiveModalOpen((prev) => !prev);
                  }}
                >
                  <FaCircle className={`h-3 w-3 ${isPostLiveColor()}`} />
                  {isPostLiveText(isLive)}
                </button>

                <Link href={`/company/post`} className="btn-primary">
                  <PencilIcon className="h-5 w-5" /> Uredi oglas
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
