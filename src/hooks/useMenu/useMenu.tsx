import { UserProfile, useUser } from "@clerk/nextjs";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  HeartIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import useCompany from "~/hooks/company/useCompany";
import StatisticDashboardTab from "~/Organisms/CompanySpecific/StatisticDashboardTab";
import MyPlans from "~/Organisms/UserSpecific/MyPlans";

import FavoritesTab from "~/Organisms/UserSpecific/FavoritesTab";
import PostReview from "~/Molecules/PostReview/PostReview";

function useMenu() {
  const clerkUser = useUser();
  const { userCompany, companyPost } = useCompany({
    clerkId: clerkUser.user?.id ?? "",
  });

  const menus = [
    {
      title: "Pocetna",
      url: "/",
    },
    {
      title: "Istrazi",
      url: "/discover",

      submenu: [
        {
          title: "Vjencanja",
          submenu: [
            {
              title: "Prostori",
              url: "/discover/wedding?category=Prostori",
            },
            {
              title: "Muzika",
              url: "/discover/wedding?category=Muzika",
            },
            {
              title: "Haljine",
              url: "/discover/wedding?category=Haljine",
            },
            {
              title: "Katering",
              url: "/discover/wedding?category=Katering",
            },
            {
              title: "Transport",
              url: "/discover/wedding?category=Transport",
            },
            {
              title: "Cvijece",
              url: "/discover/wedding?category=Cvijece",
            },
            {
              title: "Torte",
              url: "/discover/wedding?category=Torte",
            },
          ],
        },
        {
          title: "Rodendani",
          submenu: [
            {
              title: "Prostori",
              url: "/discover/birthday?category=Prostori",
            },
            {
              title: "Torte",
              url: "/discover/birthday?category=Torte",
            },
            {
              title: "Katering",
              url: "/discover/birthday?category=Katering",
            },
            {
              title: "Zabava",
              url: "/discover/birthday?category=Zabava",
            },
          ],
        },
        {
          title: "Sakramenti",
          submenu: [
            {
              title: "Prostori",
              url: "/discover/sacrament?category=Prostori",
            },

            {
              title: "Muzika",
              url: "/discover/sacrament?category=Muzika",
            },
            {
              title: "Katering",
              url: "/discover/sacrament?category=Katering",
            },
          ],
        },
        {
          title: "Slavlja",
          submenu: [
            {
              title: "Prostori",
              url: "/discover/celebration?category=Prostori",
            },

            {
              title: "Muzika",
              url: "/discover/celebration?category=Muzika",
            },
            {
              title: "Katering",
              url: "/discover/celebration?category=Katering",
            },
          ],
        },
      ],
    },
    {
      title: "Moj portal",
      url: userCompany ? `/company/dashboard` : `/user/dashboard`,
    },
  ];
  const userDashboardMenu = [
    {
      title: "Moji planovi",
      icon: <PencilSquareIcon className="h-5 w-5" />,
      children: <MyPlans />,
    },
    {
      title: "Favoriti",
      icon: <HeartIcon className="h-5 w-5 text-red-500" />,
      // FAVORITES TAB
      children: <FavoritesTab />,
    },
    {
      title: "Postavke",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      children: (
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full ",
              pageScrollBox: "w-full ",
              card: "w-full",
              navbar: "hidden",
            },
          }}
        />
      ),
    },
  ];
  const companyDashboardMenu: {
    title: string;
    icon: JSX.Element;
    children: JSX.Element;
  }[] = [
    {
      title: "Statistika",
      icon: <ChartBarIcon className="h-5 w-5" />,
      children: <StatisticDashboardTab businessPost={companyPost} />,
    },
    {
      title: "Recenzije",
      icon: <StarIcon className="h-5 w-5" />,
      children: (
        <div className="mt-3 flex w-full flex-col">
          {companyPost?.reviews.map((item, idx) => {
            return (
              <PostReview
                key={idx}
                reviewerName={item.userName}
                dateOfReview={item.createdAt}
                numberOfStars={item.starts}
                reviewText={item.reviewText}
                reviewLikes={item.likes}
              />
            );
          }) ?? (
            <p className="mt-8 text-center text-base text-black">
              Trenutno nemate recenzija...
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Postavke",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      children: (
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full bg-dark overflow-hidden",
              pageScrollBox: "w-full ",
              card: "w-full",
              navbar: "hidden",
              navbarMobileMenuButton: "hidden",
            },
          }}
        />
      ),
    },
  ];
  return {
    menus,
    companyDashboardMenu,
    userDashboardMenu,
    userCompany,
    companyPost,
  };
}

export default useMenu;
