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
            <section className="mb-10 mt-10 lg:mt-20 ">
              <div className="mb-5 flex justify-center lg:mt-28">
                <p className="rounded-full bg-purple-400 bg-opacity-50 px-4 py-2">
                  znacajke
                </p>
              </div>
              <h2 className="h2 mt-1 pb-8 pt-2 text-center text-neutral-600 lg:pb-14">
                Sto nas cini posebnima?
              </h2>
              <div className="hidden h-full max-h-[1000px] min-h-[700px] w-full justify-center lg:flex">
                <div className="  mx-5 grid min-h-[700px] w-full  max-w-7xl grid-cols-5 grid-rows-5 gap-10 text-white">
                  <Parallax
                    className="col-span-3 row-span-2 h-full  rounded-2xl bg-[#99abc4]"
                    opacity={[0.5, 1.2]}
                    speed={10}
                  >
                    <div className="m-6 mb-2 h-3/4 rounded-2xl bg-white"></div>
                    <p className=" text-center text-lg font-normal">
                      Moderan te lako razumljiv dizajn
                    </p>
                  </Parallax>
                  <Parallax
                    className="col-span-2 col-start-4 row-span-3 rounded-2xl bg-[#233756]"
                    opacity={[0.5, 1.2]}
                    speed={20}
                  >
                    <div className="m-6 mb-2 h-3/4 rounded-2xl bg-white"></div>
                    <p className=" text-center text-lg font-normal">
                      Moderan te lako razumljiv dizajn
                    </p>
                  </Parallax>
                  <Parallax
                    className="col-span-2 row-span-3 row-start-3 rounded-2xl bg-[#233756]"
                    opacity={[0.5, 1.2]}
                    speed={3}
                  >
                    <div className="m-6 mb-2 h-3/4 rounded-2xl bg-white"></div>
                    <p className=" text-center text-lg font-normal">
                      Moderan te lako razumljiv dizajn
                    </p>
                  </Parallax>
                  <Parallax
                    className="col-span-3 col-start-3 row-span-2 row-start-4 rounded-2xl bg-[#99abc4]"
                    opacity={[0.5, 1.2]}
                    speed={0}
                  >
                    <div className="m-6 mb-2 h-3/4 rounded-2xl bg-white"></div>
                    <p className=" text-center text-lg font-normal">
                      Moderan te lako razumljiv dizajn
                    </p>
                  </Parallax>
                </div>
              </div>
              <div className="mx-3 flex flex-col gap-5 lg:hidden">
                {[1, 2, 3, 4].map((item, idx) => {
                  return (
                    <div key={idx} className="min-h-52 rounded-2xl bg-black">
                      <div className="m-3 h-40 rounded-2xl bg-white"></div>

                      <p className=" p-2 text-center text-white">
                        {" "}
                        Moderan te lako razumljiv dizajn Moderan te lako
                        razumljiv dizajn Moderan te lako razumljiv dizajn
                        Moderan te lako razumljiv dizajn
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
