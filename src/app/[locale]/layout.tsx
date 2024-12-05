import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { enUS, koKR } from "@clerk/localizations";
import { Footer } from "@/components/root/Footer";
import { Header } from "@/components/root/Header";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/shadcn/ui/toaster";
import Alert from "@/components/root/Alert";
import { updateTokenInfo } from "@/resources/tokens/token.service";
import SignUpComplete from "@/components/root/SignUpComplete";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kipstock",
  description: "The Place where your IP becomes stock.",
  openGraph: {
    images: ["/img/og.png"],
  }
};

// todo 썸네일용 파일 별도 저장

export default async function RootLayout({
  children, params
}: {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const passedLocale = await params.then(p => p.locale);
  const determinedLocale = await getLocale();
  const messages = await getMessages();
  const { signUpFinished, signedInToClerk } = routing.locales.includes(passedLocale as any)
    ? await updateTokenInfo() : {};
  return (
    <html lang={determinedLocale}>
      <ClerkProvider localization={determinedLocale === "en" ? enUS : koKR}>
        <NextIntlClientProvider messages={messages}>
          <body className={`${inter.className} min-h-screen flex flex-col`}>
            <Header/>
            <main className="flex-grow flex">
              {/*Clerk에 로그인되었으나 DB에 유저 정보가 없는 경우 sign up 마무리시킬 것*/}
              {(!signUpFinished && signedInToClerk)
                ? <SignUpComplete/> : children}
            </main>
            <Footer/>
            <Toaster/>
            <Alert/>
          </body>
        </NextIntlClientProvider>
      </ClerkProvider>
    </html>
  );
}
