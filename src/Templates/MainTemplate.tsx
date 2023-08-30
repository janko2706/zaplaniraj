import React from "react";
import useLandingPageTemplate from "./useMainTemplate";
import DesktopHeader from "~/Molecules/Header/DesktopHeader";
import MobileMenu from "~/Molecules/Header/MobileHeader";

type Props = {
  children: JSX.Element;
};

function MainTemplate(props: Props) {
  const { user, AppLogo } = useLandingPageTemplate();
  return (
    <>
      <div className="min-h-full">
        <DesktopHeader user={user} appLogo={AppLogo} />
        <MobileMenu appLogo={AppLogo} />

        <main>{props.children}</main>
      </div>
    </>
  );
}

export default MainTemplate;
