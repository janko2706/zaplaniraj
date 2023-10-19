import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import CompanyPostView from "~/Organisms/CompanySpecific/CompanyPostView";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";

function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("common");
  const { menus, userCompany } = useMenu();

  return (
    <RootLayout
      hasPost={false}
      business={userCompany}
      menus={menus}
      isCompany={true}
      type={userCompany?.hasPost ? t("edit-post") : t("new-post")}
    >
      <CompanyPostView companyPost={props.post} />
    </RootLayout>
  );
}

export default Index;

import { getAuth } from "@clerk/nextjs/server";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { stripe } from "~/server/stripe/client";
import type { CompanyPostWihtoutDate } from "~/utils/types";

export const getServerSideProps: GetServerSideProps<{
  post: CompanyPostWihtoutDate;
}> = (async ({ locale, req }) => {
  const { userId } = getAuth(req);
  if (!userId)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      userId: userId,
      stripe: stripe,
    },
    transformer: superjson,
  });
  const business = await helpers.bussines.getById.fetch({
    clerkId: userId,
  });
  if (!business)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  const post = await helpers.businessPost.getPostByBusinessId.fetch({
    businessId: business.id,
  });
  if (!post)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "hr", [
        "common",
        "dashboard",
      ])),
      post,
    },
  };
}) satisfies GetServerSideProps<{ post: CompanyPostWihtoutDate }>;
