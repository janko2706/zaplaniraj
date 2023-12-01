import { useUser } from "@clerk/nextjs";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeroSection from "~/Molecules/HeroSection/HeroSection";
import IndexCategorySection from "~/Organisms/IndexCategorySection/IndexCategorySection";
import RecommendedIndex from "~/Organisms/RecommendedIndex/RecommendedIndex";
import ContentMarginsTemplate from "~/Templates/ContentMarginsTemplate";
import MainTemplate from "~/Templates/MainTemplate";
import { useHome } from "~/hooks/home/useHome";
import useMenu from "~/hooks/useMenu/useMenu";
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
          case getUserOnboarding.data:
            void (async () => {
              await router.replace(
                `/onboarding/company/${getUserOnboarding.data}`
              );
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

            {/* CATEGORIES SECTION */}
            <IndexCategorySection />
          </div>
          {/* FEATURED WEDDING VENUES */}
          <RecommendedIndex />
          {/* BUSINESS ASSOCIATES LINK */}
          <div className=" w-full bg-slate-100">
            <ContentMarginsTemplate>
              <div
                style={{ alignItems: "center" }}
                className="container flex w-full justify-center  px-5 align-middle sm:py-12 lg:flex-row  lg:py-6"
              >
                <div className="flex flex-col justify-center rounded-sm  text-center  ">
                  <h1 className=" text-5xl font-bold sm:text-6xl">
                    Posjedujes poslovanje za koje mislis da bi trebalo biti tu?
                  </h1>
                  <p className="mb-8 mt-6 text-center text-lg sm:mb-12">
                    Postani dio ove uzbudljive platforme vec danas.
                  </p>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-center">
                    <a
                      href="#istraziPocetna"
                      className="text-primaryBlue mb-5 rounded-md bg-slate-300 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-purple-800 hover:text-white"
                    >
                      Pridruzi nam se
                    </a>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
      ...(await serverSideTranslations(locale ?? "hr", [
        "frontPage",
        "common",
        "dashboard",
      ])),
      trpcState: ssg.dehydrate(),
    },
  };
};
