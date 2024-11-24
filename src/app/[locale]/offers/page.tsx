import React from "react";
import BidRequestList from "@/app/[locale]/offers/BidRequestList";
import PageLayout from "@/components/ui/PageLayout";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/common";
import { responseHandler } from "@/handlers/responseHandler";
import { listAllBidRequests } from "@/resources/bidRequests/controllers/bidRequestWithMetadata.controller";

export default async function OffersPage() {
  const initialBidRequestListResponse = await listAllBidRequests({})
    .then(responseHandler);
  const t = await getTranslations("headerNav");
  return (
    <PageLayout>
      <Heading>
        {t("manageOffers")}
      </Heading>
      <BidRequestList initialBidRequestListResponse={initialBidRequestListResponse} />
    </PageLayout>
  );
}