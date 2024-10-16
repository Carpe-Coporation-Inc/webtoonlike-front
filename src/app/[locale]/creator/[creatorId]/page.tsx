import { cookies } from "next/headers";
import * as CreatorApi from "@/apis/creators";
import { tokenHolder } from "@/system/token_holder";
import { CreatorOtherPage } from "@/$pages/creators/CreatorOtherPage";
import type { GetCreatorOptionT } from "@backend/types/Creator";

export default async function CreatorOther({
  params,
}: {
  params: { creatorId: string };
}) {
  const creatorId = parseInt(params.creatorId, 10);

  const getOpt: GetCreatorOptionT = {
    $user: true,
    $numWebtoonLike: true,
  };
  const { data: creator, } = await tokenHolder.serverFetchWithCredential(
    cookies,
    async () => {
      return CreatorApi.get(creatorId, getOpt);
    }
  );

  return (
    <div className="bg-[#121212] min-h-screen">
      <CreatorOtherPage creator={creator} />
    </div>
  );
}
