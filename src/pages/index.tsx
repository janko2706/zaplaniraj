import { useUser } from "@clerk/nextjs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeroSection from "~/Molecules/HeroSection/HeroSection";
import IndexCategorySection from "~/Organisms/IndexCategorySection/IndexCategorySection";
import RecommendedIndex from "~/Organisms/RecommendedIndex/RecommendedIndex";
import ContentMarginsTemplate from "~/Templates/ContentMarginsTemplate";
import MainTemplate from "~/Templates/MainTemplate";
import { useHome } from "~/hooks/home/useHome";
import useMenu from "~/hooks/useMenu/useMenu";
import { Parallax } from "react-scroll-parallax";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  const { getUserOnboarding, doesUserExists } = useHome();
  const { menus, userCompany } = useMenu();
  const featuresArray = [
    {
      text: "Moderan te lako razumljiv dizajn.",
      icon: <MdDesignServices className="text-5xl text-purple-900" />,
      parallaxValuesAndGrid: {
        classNames: "col-span-3 row-span-2 h-full  rounded-2xl bg-[#b9c8dc]",
      },
    },
    {
      text: "Sve za planiranje na jednom mjestu!",
      icon: <MdNextPlan className="text-5xl text-purple-900" />,

      parallaxValuesAndGrid: {
        classNames:
          "col-span-2 col-start-4 row-span-3 rounded-2xl bg-[#a088b891]",
      },
    },
    {
      text: "Zauvijek besplatno!",
      icon: <FaFreeCodeCamp className="text-5xl text-purple-900" />,

      parallaxValuesAndGrid: {
        classNames:
          "col-span-2 row-span-3 row-start-3 rounded-2xl bg-[#a088b891]",
      },
    },
    {
      text: "Budite spremni za Vase sljedeci slavlje!",
      icon: <MdCelebration className="text-5xl text-purple-900" />,

      parallaxValuesAndGrid: {
        classNames:
          "col-span-3 col-start-3 row-span-2 row-start-4 rounded-2xl bg-[#99abc49f]",
      },
    },
  ];

  useEffect(() => {
    if (user.isSignedIn) {
      if (doesUserExists.data === 300) {
        void (async () => {
          await router.replace(`/onboarding`);
        })();
      }
      if (getUserOnboarding.data) {
        switch (getUserOnboarding.data) {
          case "done":
            break;
          case "401":
            break;
          case "welcome":
            void (async () => {
              await router.replace(`/onboarding`);
            })();
            break;
          case "businessDetails":
            void (async () => {
              await router.replace(`/onboarding/company`);
            })();
            break;
          case "payment":
            void (async () => {
              await router.replace(`/onboarding/company/payment`);
            })();
            break;

          default:
            break;
        }
      }
    }
  }, [getUserOnboarding.data, user.isSignedIn, router, doesUserExists.data]);

  return (
    <>
      <MainTemplate menus={menus} userCompany={userCompany}>
        <>
          {/* HERO SECTION */}
          <div className="  w-full bg-slate-100">
            <HeroSection />
            <section className="z-50 mb-10 mt-10 overflow-visible lg:mt-20">
              <div className="mb-5 flex justify-center lg:mt-28">
                <p className="rounded-full bg-purple-400 bg-opacity-50 px-4 py-2">
                  znacajke
                </p>
              </div>
              <h2 className="h2 mt-1 pb-8 pt-2 text-center text-neutral-600 lg:pb-14">
                Sto nas cini posebnima?
              </h2>
              {/* DESKOP VERSION */}
              <div className="z-50  hidden h-full max-h-[1000px] min-h-[700px] w-full justify-center overflow-visible lg:flex">
                <div className="z-50  mx-5 grid min-h-[700px] w-full  max-w-7xl grid-cols-5 grid-rows-5 gap-10 overflow-visible text-white">
                  {featuresArray.map((item, idx) => {
                    return (
                      <Parallax
                        key={idx}
                        className={item.parallaxValuesAndGrid.classNames}
                        easing={"easeIn"}
                        opacity={[1.5, 0]}
                        translateY={[30, 0]}
                        // speed={item.parallaxValuesAndGrid.speed}
                      >
                        <div className=" flex h-full flex-col items-center justify-center text-center font-Trochut text-3xl italic text-slate-600">
                          {item.icon}
                          <p>{item.text}</p>
                        </div>
                      </Parallax>
                    );
                  })}
                </div>
              </div>
              {/* MOBILE VERSION OF FEATURES */}
              <div className="mx-3 flex flex-col gap-5 lg:hidden">
                {featuresArray.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`min-h-52 rounded-2xl ${
                        idx % 2 === 0 ? "bg-[#99abc4]" : "bg-[#a088b891]"
                      }`}
                    >
                      <p className=" p-2 py-7 text-center text-2xl text-white">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* CATEGORIES SECTION */}
            <IndexCategorySection />
          </div>
          {/* FEATURED WEDDING VENUES */}
          <RecommendedIndex />
          {/* BUSINESS ASSOCIATES LINK */}

          <div className=" w-full bg-white">
            <ContentMarginsTemplate>
              <div
                style={{ alignItems: "center" }}
                className="container flex w-full justify-center  px-5 align-middle sm:py-12 lg:flex-row  lg:py-6"
              >
                <div className="flex flex-col justify-center rounded-sm  text-center  ">
                  <h1 className=" text-5xl font-bold sm:text-6xl">
                    Posjedujete poslovanje za koje mislite da bi trebalo biti
                    tu?
                  </h1>
                  <p className="mb-8 mt-6 text-center text-lg sm:mb-12">
                    Postani dio ove uzbudljive platforme vec danas.
                  </p>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-center">
                    <Link
                      href={"/pricing"}
                      className="text-primaryBlue mb-5 rounded-md bg-slate-300 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-purple-800 hover:text-white"
                    >
                      Pogledaj sto te ocekuje!
                    </Link>
                  </div>
                </div>
              </div>
            </ContentMarginsTemplate>
          </div>
        </>
      </MainTemplate>
    </>
  );
}

import { createServerSideHelpers } from "@trpc/react-query/server";
import Stripe from "stripe";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import Link from "next/link";
import ListCard from "~/Molecules/ListCard/ListCard";
import { MdCelebration, MdDesignServices, MdNextPlan } from "react-icons/md";
import { FaFreeCodeCamp } from "react-icons/fa";
import { GiCelebrationFire } from "react-icons/gi";

export const getStaticProps: GetStaticProps = async ({}) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      stripe: new Stripe("", { apiVersion: "2023-08-16" }),
      userId: null,
    },
    transformer: superjson,
  });

  await ssg.user.getUserOnboarding.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
