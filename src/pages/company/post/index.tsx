import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import CompanyPostView from "~/Organisms/CompanySpecific/CompanyPostView";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";

function Index() {
  const { t } = useTranslation("common");
  const { menus, userCompany } = useMenu();
  return (
    <RootLayout
      post={true}
      business={userCompany}
      menus={menus}
      isCompany={true}
      type={userCompany?.hasPost ? t("edit-post") : t("new-post")}
    >
      <CompanyPostView />
    </RootLayout>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});
