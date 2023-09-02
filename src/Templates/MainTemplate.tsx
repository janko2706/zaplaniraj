import React from "react";
import useLandingPageTemplate from "./useMainTemplate";
import DesktopHeader from "~/Molecules/Header/DesktopHeader";
import MobileMenu from "~/Molecules/Header/MobileHeader";
import Footer from "~/Atoms/Footer/Footer";

type Props = {
  children: JSX.Element;
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
          url?: string;
          submenu: {
            title: string;
            url: string;
          }[];
        }[];
      }
  )[];
};

function MainTemplate(props: Props) {
  const { user, AppLogo } = useLandingPageTemplate();
  return (
    <>
      <div className="min-h-full">
        <DesktopHeader menus={props.menus} user={user} appLogo={AppLogo} />
        <MobileMenu appLogo={AppLogo} />

        <main>{props.children}</main>
        <Footer />
      </div>
    </>
  );
}

export default MainTemplate;
