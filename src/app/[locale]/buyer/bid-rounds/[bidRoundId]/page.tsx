import { BuyerBidRoundItemDetail } from "@/$pages/buyers/BuyerBidRoundRequestListPage/BuyerBidRoundList/BuyerBidRoundListItem/BuyerBidRoundItemDetail";
import { cookies } from "next/headers";
import { tokenHolder } from "@/system/token_holder";
import { ErrorComponent } from "@/components/ErrorComponent";

export default async function BidRoundDetailPage({ params }: { params: { bidRoundId: string } }) {
  try {
    const { data: bidRound } = await tokenHolder.serverFetchWithCredential(cookies, async () => {
      return BidRoundsApi.get(parseInt(params.bidRoundId), { $user: true });
    });

    const { data: webtoon } = await tokenHolder.serverFetchWithCredential(cookies, async () => {
      return WebtoonsApi.get(bidRound?.webtoonId, { $numEpisode: true });
    });

    return (
      <div className="bg-[#121212] min-h-screen">
        <BuyerBidRoundItemDetail bidRound={bidRound} webtoon={webtoon} />
      </div>
    );
  } catch (e){
    console.log(e);
    return (
      <ErrorComponent />
    );
  }
}
