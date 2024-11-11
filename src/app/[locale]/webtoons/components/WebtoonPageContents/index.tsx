"use client";

import ContractRange from "@/app/[locale]/webtoons/components/WebtoonPageContents/ContractRange";
import WebtoonDetails from "@/app/[locale]/webtoons/components/WebtoonPageContents/WebtoonDetails";
import PageLayout from "@/components/PageLayout";
import BidRequestForm from "@/app/[locale]/webtoons/components/forms/BidRequestForm";
import { WebtoonExtendedT } from "@/resources/webtoons/webtoon.types";
import { useState } from "react";

export default function WebtoonPageContents({ webtoon }: {
  webtoon: WebtoonExtendedT;
}) {
  const [openBidRequestForm, setOpenBidRequestForm] = useState(false);
  return (
    <PageLayout>
      <WebtoonDetails
        webtoon={webtoon}
        openBidRequestForm={openBidRequestForm}
        setOpenBidRequestForm={setOpenBidRequestForm}
      />

      <hr className="border-gray-shade my-10"/>

      <ContractRange webtoon={webtoon}/>

      {openBidRequestForm
        && <>
          <hr className="border-gray-shade my-10"/>

          <BidRequestFormContainer bidRoundId={webtoon.activeBidRound?.id} />

        </>}

    </PageLayout>
  );
}

function BidRequestFormContainer({ bidRoundId }: {
  bidRoundId?: number;
}) {
  if (bidRoundId) {
    return <BidRequestForm bidRoundId={bidRoundId}/>;
  } else {
    return <div>오퍼가 가능한 작품이 아닙니다.</div>;
  }
}