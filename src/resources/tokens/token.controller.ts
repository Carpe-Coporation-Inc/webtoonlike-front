"use server";
import { action } from "@/handlers/safeAction";
import { getTokenInfo } from "@/resources/tokens/token.service";

// 서버 컴포넌트에서 직접 신분 확인이 필요한 경우, 에러 사유를 명확히 표현하기 위함
export const assertAdmin = action
  .metadata({ actionName: "assertAdmin" })
  .action(async () => {
    await getTokenInfo({
      admin: true,
    });
  });
