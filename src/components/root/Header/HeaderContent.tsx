"use client";

import { Row } from "@/components/ui/common";
import { Link, routing } from "@/i18n/routing";
import Logo from "@/components/ui/Logo";
import TranslationDropdown from "@/components/root/Header/TranslationDropdown";
import { SelectItem } from "@/shadcn/ui/select";
import NotificationDropdown from "@/components/root/Header/NotificationDropdown";
import Account from "@/components/root/Header/Account";
import NavBar from "@/components/root/Header/NavBar";
import { useLocale, useTranslations } from "next-intl";
import { TokenInfo } from "@/resources/tokens/token.types";
import { useLayoutContext } from "@/providers/LayoutContextProvider";
import { useEffect, useRef } from "react";

export default function HeaderContent({ tokenInfo }: {
  tokenInfo?: TokenInfo;
}) {
  const { setHeaderRef } = useLayoutContext();
  const ref = useRef<HTMLElement>(null);
  useEffect(()=>{
    setHeaderRef(ref);
  }, [setHeaderRef]);
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  return (
    <header
      ref={ref}
      className="sticky top-0 w-full flex flex-col z-[49] border-b border-gray-darker items-center px-10 bg-black text-white">
      <Row className="w-full h-[60px] justify-between">
        <Row>
          <Link href="/">
            <Logo/>
          </Link>
        </Row>
        <Row className="gap-3">
          <TranslationDropdown defaultValue={locale}>
            {routing.locales.map((cur) => (
              <SelectItem key={cur} value={cur}>
                {t("locale", { locale: cur })}
              </SelectItem>
            ))}
          </TranslationDropdown>
          <NotificationDropdown />
          <Account />
        </Row>
      </Row>
      <NavBar tokenInfo={tokenInfo}/>
    </header>
  );
}