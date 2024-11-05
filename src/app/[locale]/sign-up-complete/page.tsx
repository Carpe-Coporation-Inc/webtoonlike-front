import { Col, Gap } from "@/ui/layouts";
import { KenazLogo } from "@/components/svgs/KenazLogo";
import { Heading } from "@/ui/texts";
import { getLocale, getTranslations } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import { updateTokenInfo } from "@/resources/tokens/token.service";
import { SignUpCompleteForm } from "@/app/[locale]/sign-up-complete/SignUpCompleteForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "@/i18n/routing";

export default async function SignUpComplete() {
  const { userId } = await auth();
  if (!userId) {
    // 아직 clerk에 로그인하지 않은 경우 홈으로 리다이렉트
    const locale = await getLocale();
    redirect({
      href: "/", locale: locale
    });
  }

  const t = await getTranslations("setupPage");
  const signUpStatus = await updateTokenInfo();

  return <PageLayout bgColor="light" className="items-center flex flex-col">
    <Col className="w-[400px]">
      <KenazLogo className="fill-black" />
      <Gap y={10} />
      <Heading className="text-black font-bold text-[20pt]">
        {t("setupAccount")}
      </Heading>
      <SignUpCompleteForm signUpStatus={signUpStatus} />
    </Col>
  </PageLayout>;
}

