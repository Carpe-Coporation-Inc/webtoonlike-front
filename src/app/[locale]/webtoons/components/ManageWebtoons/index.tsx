import React from "react";
import PageLayout from "@/components/ui/PageLayout";
import { getTranslations } from "next-intl/server";
import MyWebtoonsNotOnSale from "@/app/[locale]/webtoons/components/ManageWebtoons/MyWebtoonsNotOnSale";
import MyWebtoonsOnSale from "@/app/[locale]/webtoons/components/ManageWebtoons/MyWebtoonsOnSale";
import { Heading1 } from "@/components/ui/common";
import { serverResponseHandler } from "@/handlers/serverResponseHandler";
import {
  listMyWebtoonsNotOnSale,
  listMyWebtoonsOnSale
} from "@/resources/webtoons/controllers/webtoonPreview.controller";

export default async function ManageWebtoons() {
  const [
    initialWebtoonListNotOnSaleResponse,
    initialWebtoonListOnSaleResponse
  ] = await Promise.all([
    listMyWebtoonsNotOnSale({}).then(serverResponseHandler),
    listMyWebtoonsOnSale({}).then(serverResponseHandler)
  ]);

  const t = await getTranslations("manageContents");
  return (
    <PageLayout>
      <Heading1>
        {t("unregisteredSeries")}
      </Heading1>
      <MyWebtoonsNotOnSale initialWebtoonListResponse={initialWebtoonListNotOnSaleResponse} />
      <Heading1>
        {t("registeredSeries")}
      </Heading1>
      <MyWebtoonsOnSale initialWebtoonListResponse={initialWebtoonListOnSaleResponse} />
    </PageLayout>
  );
}