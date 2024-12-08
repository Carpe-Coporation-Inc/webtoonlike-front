"use client";
import Image from "next/image";
import { Col, Row } from "@/components/ui/common";
import { ComponentProps } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { clsx } from "clsx";

export default function AccountProfile({ allowEdit, className, children, ...props }: ComponentProps<typeof Row> & {
  allowEdit?: boolean;
}) {
  const clerk = useClerk();
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <Row className={clsx("gap-12", className)} {...props}>
    <div>
      <Image
        src={user.imageUrl}
        alt="profile_image"
        style={{ objectFit: "cover" }}
        className="rounded-full"
        width={160}
        height={160}
      />
      {allowEdit
        && <div className="text-center pt-5">
          <span className="clickable" onClick={() => {
            clerk.openUserProfile();
          }}>계정 설정</span>
        </div>}
    </div>
    <Col className="justify-center w-full">
      <p className="font-bold text-3xl">
        {user.fullName}
      </p>
      <p className="text-xl">
        {user.primaryEmailAddress?.emailAddress}
      </p>
      {children}
    </Col>
  </Row>;
}
