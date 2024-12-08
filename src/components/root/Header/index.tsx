import React from "react";
import HeaderContent from "@/components/root/Header/HeaderContent";
import { getTokenInfo } from "@/resources/tokens/token.service";

export async function Header() {
  // 페이지 입장 시 바로 메뉴가 보일 수 있도록 tokenInfo를 서버사이드에서 확보
  const tokenInfo = await getTokenInfo()
    .catch(() => undefined);
  return <HeaderContent tokenInfo={tokenInfo}/>;
}
