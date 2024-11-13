"use client";

import Spinner from "@/components/Spinner";
import { IssuanceInvoiceSubmit } from "./IssuanceInvoiceSubmit";
import { useListData } from "@/hooks/listData";
import { Gap, Row } from "@/shadcn/ui/layouts";
import { listBidRequests } from "@/resources/bidRequests/bidRequest.service";
import Paginator from "@/components/Paginator";
import { BidRequestExtendedT } from "@/resources/bidRequests/bidRequest.types";
import { buildImgUrl } from "@/utils/media";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function IssuanceInvoice() {
  const { listResponse, filters, setFilters } = useListData(
    listBidRequests, {
      page: 1,
      isAdmin: true
    });

  if (!listResponse) {
    return <Spinner />;
  }
  if (listResponse.items.length === 0) {
    return <Row className="justify-center bg-gray p-4 rounded-sm">
      <p>현재 협상된 작품이 없습니다</p>
    </Row>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex p-2">
          <div className="w-[30%] p-2 font-bold text-gray-shade">작품명</div>
          <div className="w-[15%] p-2 flex justify-center font-bold text-gray-shade">작가명</div>
          <div className="w-[15%] p-2 flex justify-center font-bold text-gray-shade">바이어명</div>
          <div className="w-[25%] p-2 flex justify-center font-bold text-gray-shade">신청일</div>
          <div className="w-[15%] p-2 flex justify-center font-bold text-gray-shade">인보이스 발행</div>
        </div>
        {listResponse.items.map((bidRequest, i) => (
          <TableRow key={i} bidRequest={bidRequest} />
        ))}
      </div>
      <Paginator
        currentPage={filters.page}
        totalPages={listResponse.totalPages}
        setFilters={setFilters}
      />
    </>
  );
}


function TableRow({ bidRequest }: {
  bidRequest: BidRequestExtendedT;
}) {
  return (
    <Row className="flex bg-white rounded-sm p-2 my-2">
      <Row className="w-[30%] p-2 flex justify-start">
        <div className="w-[50px] h-[50px] overflow-hidden relative rounded-sm">
          <Image
            src={buildImgUrl(bidRequest.webtoon.thumbPath, { size: "xxs" } )}
            alt={`${bidRequest.webtoon.thumbPath}`}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <Gap x={2} />
        <Link
          className="text-mint underline cursor-pointer"
          href={`/webtoons/${bidRequest.webtoon.id}`}
        >
          {bidRequest.webtoon.title}
        </Link>
      </Row>
      <div className="w-[15%] p-2 flex justify-center">
        <p className="text-mint underline cursor-pointer">{bidRequest.webtoon.creatorUsername}</p>
      </div>
      <div className="w-[15%] p-2 flex justify-center">
        <p className="text-mint underline cursor-pointer">{bidRequest.username}</p>
      </div>
      <div className="w-[25%] p-2 flex justify-center">
        <p className=" cursor-pointer">{bidRequest.createdAt.toLocaleString("ko")}</p>
      </div>
      <div className="w-[15%] flex justify-center items-center">
        <IssuanceInvoiceSubmit bidRequestId={bidRequest.id} />
      </div>
    </Row>
  );
}
