import { Col, HR, Row } from "@/components/ui/common";
import OfferProposalDetails from "@/components/shared/OfferProposalDetails";
import { useEffect, useMemo, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import Profile from "@/components/shared/Profile";
import WebtoonDetails from "@/components/shared/WebtoonPageContents/WebtoonDetails";
import { OfferDetailsT } from "@/resources/offers/dtos/offerProposal.dto";
import { getOfferDetails } from "@/resources/offers/controllers/offerProposal.controller";
import useSafeAction from "@/hooks/safeAction";

export default function OfferDetailsForInvoice({ offerProposalId }: {
  offerProposalId: number;
}) {
  const [offerProposal, setOfferProposal] = useState<OfferDetailsT>();
  const boundGetOfferDetails = useMemo(() => getOfferDetails.bind(null, offerProposalId), [offerProposalId]);
  const { execute } = useSafeAction(boundGetOfferDetails, {
    onSuccess: ({ data }) => setOfferProposal(data)
  });
  useEffect(() => {
    execute();
  }, [execute]);

  if (!offerProposal) {
    return <Spinner/>;
  }

  return <Col className="bg-box p-5 rounded-[10px]">
    <WebtoonDetails webtoon={offerProposal.webtoon} context="InvoiceView"/>
    <Row className="mt-10">
      <Profile className="flex-1" creatorOrBuyer={offerProposal.creator} />
      <Profile className="flex-1" creatorOrBuyer={offerProposal.buyer} />
    </Row>
    <HR />
    <OfferProposalDetails
      forInvoice={true}
      offerProposal={offerProposal} />
  </Col>;
}
