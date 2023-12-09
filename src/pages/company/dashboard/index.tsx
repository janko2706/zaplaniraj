import React from "react";

import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import useMenu from "~/hooks/useMenu/useMenu";
import RootLayout from "~/Templates/PortalLayout/layout";
import { useRouter } from "next/router";

function Dashboard() {
  const { t } = useTranslation("common");
  const { menus, companyDashboardMenu, userCompany, companyPost } = useMenu();
  const { query } = useRouter();

  return (
    <RootLayout
      post={companyPost}
      hasPost={userCompany?.companyPostId ? true : false}
      business={userCompany}
      menus={menus}
      isCompany={userCompany ? true : false}
    >
      <PortalTabs
        tabs={companyDashboardMenu}
        defaultIndex={query.index ? Number(query.index) : 0}
      />
    </RootLayout>
  );
}

export default Dashboard;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});
