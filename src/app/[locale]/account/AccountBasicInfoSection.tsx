import { getTranslations } from "next-intl/server";
import { Row } from "@/components/ui/common";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@/i18n/routing";
import AccountBasicInfoSectionDeleteButton from "@/app/[locale]/account/AccountBasicInfoSectionDeleteButton";
import { serverResponseHandler } from "@/handlers/serverResponseHandler";
import { getMyLikeCount } from "@/resources/webtoonLikes/webtoonLike.controller";
import { getTokenInfo } from "@/resources/tokens/token.service";
import { UserTypeT } from "@/resources/users/dtos/user.dto";
import LikeBadge from "@/components/ui/LikeBadge";
import AccountProfile from "@/app/[locale]/account/components/AccountProfile";

export default async function AccountBasicInfoSection() {
  const tEditProfile = await getTranslations("accountPage");
  const { metadata } = await getTokenInfo();
  const likeCountResponse = metadata.type === UserTypeT.Creator
    ? await getMyLikeCount().then(serverResponseHandler)
    : undefined;
  return <AccountProfile>
    <Row className="w-full justify-between mt-6">
      <Row className="gap-4">
        {likeCountResponse
            && <LikeBadge likeCount={likeCountResponse.likeCount}/>}
        <Button variant="secondary" asChild>
          <Link href="/account/update">
            {tEditProfile("editProfile")}
          </Link>
        </Button>
      </Row>

      <AccountBasicInfoSectionDeleteButton />
    </Row>
  </AccountProfile>;
}


