import { Row } from "@/components/ui/common";
import NavigationLink from "./NavigationLink";
import { UserTypeT } from "@/resources/users/dtos/user.dto";
import { AdminLevel, TokenInfo } from "@/resources/tokens/token.types";
import { useTranslations } from "next-intl";

export type NavArrT = {
  name: string;
  path: string;
  isVisible: boolean;
}[];

export default function NavBar({ tokenInfo }: {
  tokenInfo?: TokenInfo;
}) {
  const t = useTranslations("headerNav");
  const userType = tokenInfo?.metadata.type;
  const adminLevel = tokenInfo?.metadata.adminLevel || AdminLevel.None;

  if (!userType) {
    return null;
  }

  const nav: NavArrT = [
    {
      name: `${t("home")}`,
      path: "/",
      isVisible: true
    },
    {
      name: `${t("seeAll")}`,
      path: "/webtoons",
      isVisible: userType === UserTypeT.Buyer
    },
    {
      name: `${t("manageContents")}`,
      path: "/webtoons",
      isVisible: userType === UserTypeT.Creator
    },
    {
      name: `${t("manageOffers")}`,
      path: "/offers",
      isVisible: true
    },
    {
      name: `${t("invoice")}`,
      path: "/invoices",
      isVisible: true
    },
    {
      name: `${t("myInfo")}`,
      path: "/account",
      isVisible: true
    },
    {
      name: "관리",
      path: "/admin/dashboard",
      isVisible: adminLevel >= AdminLevel.Admin
    }
  ].filter((item) => item.isVisible);

  return (
    <Row className="w-full max-w-screen-xl h-[60px]">
      {nav.map((item) => (
        <NavigationLink
          href={item.path}
          key={item.name}
        >
          {item.name}
        </NavigationLink>
      ))}
    </Row>
  );
}
