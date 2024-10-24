import Link from "next/link";

type BuyerBidRoundListItemPropsT = {
  // webtoon: WebtoonT;
  // bidRound: BidRoundT;
};

export function BuyerBidRoundListItem({}: BuyerBidRoundListItemPropsT) {
  return (
    <Link href={`/buyer/bid-rounds/${1}/request`}>
      This is BuyerBidRoundListItem Component
    </Link>
  );
}
