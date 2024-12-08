"use client";
import Image from "next/image";
import { Col, Row } from "@/components/ui/common";
import { ComponentProps } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

export default function AccountProfile({ allowEdit, className, children, ...props }: ComponentProps<typeof Row> & {
  allowEdit?: boolean;
}) {
  const tEditProfile = useTranslations("accountPage");
  const clerk = useClerk();
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <div className={clsx("flex items-start gap-12", className)} {...props}>
    <div>
      <div className="relative w-[135px] h-[135px] overflow-hidden rounded-full">
        <Image
          src={user.imageUrl}
          alt="profile_image"
          style={{ objectFit: "cover" }}
          fill={true}
        />
      </div>
      {allowEdit
        && <div className="text-center pt-5">
          <span className="clickable" onClick={() => {
            clerk.openUserProfile();
          }}>{tEditProfile("accountSettings")}</span>
        </div>}
    </div>
    <Col className="min-h-[135px] justify-center w-full">
      <p className="font-bold text-3xl">
        {user.fullName}
      </p>
      <p className="text-xl">
        {user.primaryEmailAddress?.emailAddress}
      </p>
      {children}
    </Col>
  </div>;
}
