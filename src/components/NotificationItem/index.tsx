import React from "react";
import { Col, Gap } from "@/ui/layouts";
import { Text } from "@/ui/texts";
import { convertTimeAbsolute } from "@/utils/time";
import type { NotificationT } from "@backend/types/Notification";

type NotificationItemProps = {
  item: NotificationT
}

export function NotificationItem({ item }: NotificationItemProps): JSX.Element {
  return (
    <Col key={item.id} className="rounded-none cursor-pointer px-[20px] py-[12px] hover:bg-gray-light transition-all">
      <Text className="text-black text-[15px]">{item.message}</Text>
      <Gap y={1} />
      <Text className="text-gray-shade text-[12px]">{convertTimeAbsolute(item.createdAt)}</Text>
    </Col>
  );
}