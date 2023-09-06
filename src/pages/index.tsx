import MainTemplate from "~/Templates/MainTemplate";
import ContentMarginsTemplate from "~/Templates/ContentMarginsTemplate";
import HeroSection from "~/Molecules/HeroSection/HeroSection";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import IndexCategorySection from "~/Organisms/IndexCategorySection/IndexCategorySection";
import RecommendedIndex from "~/Organisms/RecommendedIndex/RecommendedIndex";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation(["common", "frontPage"]);

  const menus = [
    {
      title: t("menu-home"),
      url: "/",
    },
    {
      title: t("menu-discover"),
      url: "/discover",

      submenu: [
        {
          title: t("Category1"),
          submenu: [
            {
              title: "Agent",
              url: "/agent",
            },
            {
              title: "Agent Details List",
              url: "/agent-details-list",
            },
          ],
        },
        {
          title: t("Category2"),
          submenu: [
            {
              title: "Agent",
              url: "/agent",
            },
            {
              title: "Agent Details List",
              url: "/agent-details-list",
            },
          ],
        },
        {
          title: t("Category3"),
          url: "/about-us",
          submenu: [
            {
              title: "Agent",
              url: "/agent",
            },
            {
              title: "Agent Details List",
              url: "/agent-details-list",
            },
          ],
        },
        {
          title: t("Category4"),
          url: "/payment-method",
          submenu: [
            {
              title: "Agent",
              url: "/agent",
            },
            {
              title: "Agent Details List",
              url: "/agent-details-list",
            },
          ],
        },
      ],
    },
    {
      title: t("menu-dashboard"),
      url: "/company/id/dashboard",
    },
  ];

  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    // GET the in onboarding string or boolean from BE
    const isOnboarding = window.localStorage.getItem("onboarding");
    const { success } = router.query;
    if (success === "true") window.localStorage.removeItem("onboarding");
    if (isOnboarding && user.isSignedIn && !success) {
      switch (isOnboarding) {
        case "welcome":
          void (async () => {
            await router.push("/onboarding");
          })();
          break;

        default:
          break;
      }
    }
  }, [router, user]);

  return (
    <>
      <MainTemplate menus={menus}>
        <>
          {/* HERO SECTION */}
          <div className="w-full bg-slate-100">
            <HeroSection />
          </div>
          {/* CATEGORIES SECTION */}

          <IndexCategorySection />
          {/* FEATURED WEDDING VENUES */}
          <RecommendedIndex />
          {/* BUSINESS ASSOCIATES LINK */}
          <div className="w-full bg-slate-100">
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", [
      "frontPage",
      "common",
      "dashboard",
    ])),
  },
});
