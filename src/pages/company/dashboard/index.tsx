import React from "react";

import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import useMenu from "~/hooks/useMenu/useMenu";
import RootLayout from "~/Templates/PortalLayout/layout";

function Dashboard() {
  const { t } = useTranslation("common");
  const { menus, companyDashboardMenu, userCompany, companyPost } = useMenu();

  return (
    <RootLayout
      post={companyPost}
      hasPost={userCompany?.companyPostId ? true : false}
      business={userCompany}
      menus={menus}
      isCompany={userCompany?.companyPostId ? true : false}
      type={userCompany?.hasPost ? t("edit-post") : t("new-post")}
    >
      <PortalTabs tabs={companyDashboardMenu} />
    </RootLayout>
  );
}

export default Dashboard;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});
